// AutoTZ v1.7 — delegacja + watchdog + pamięć #datetime (sessionStorage) + domyślna niedziela 23:59

const LABEL_TO_TZ = {
  bulgarian:"Europe/Sofia", czech:"Europe/Prague", danish:"Europe/Copenhagen", dutch:"Europe/Amsterdam",
  english:"Europe/London", estonian:"Europe/Tallinn", finnish:"Europe/Helsinki", french:"Europe/Paris",
  german:"Europe/Berlin", greek:"Europe/Athens", hebrew:"Asia/Jerusalem", hungarian:"Europe/Budapest",
  icelandic:"Atlantic/Reykjavik", italian:"Europe/Rome", japanese:"Asia/Tokyo", korean:"Asia/Seoul",
  latvian:"Europe/Riga", lithuanian:"Europe/Vilnius", norwegian:"Europe/Oslo", polish:"Europe/Warsaw",
  portuguese:"Europe/Lisbon", romanian:"Europe/Bucharest", russian:"Europe/Moscow",
  "simplified chinese":"Asia/Shanghai", serbian:"Europe/Belgrade", slovak:"Europe/Bratislava",
  spanish:"Europe/Madrid", swedish:"Europe/Stockholm", turkish:"Europe/Istanbul"
};

console.log("[AutoTZ v1.7] loaded…");

const DT_KEY = "AutoTZ:datetime";
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const q = (sel) => document.querySelector(sel);
const getLangSelect = () => q("#language");
const getTzSelect   = () => q("#timezone");
const getDatetime   = () => q("#datetime");

// ---------- format i domyślna data ----------
const z2 = n => String(n).padStart(2, "0");
function fmtMMDDYYYY_hhmmAM(date){
  const mm = z2(date.getMonth()+1);
  const dd = z2(date.getDate());
  const yyyy = date.getFullYear();
  let h = date.getHours();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12; if (h === 0) h = 12;
  const hh = z2(h);
  const mi = z2(date.getMinutes());
  return `${mm}/${dd}/${yyyy} ${hh}:${mi} ${ampm}`;
}
function endOfThisWeekSunday2359(){
  const now = new Date();
  const day = now.getDay();            // 0=Sunday … 6=Saturday
  const add = (7 - day) % 7;           // ile dni do niedzieli „tego” tygodnia
  const d = new Date(now);
  d.setDate(now.getDate() + add);
  d.setHours(23, 59, 0, 0);
  return d;
}

// ---------- pamięć #datetime ----------
let isRestoringDt = false;

function rememberDatetime() {
  if (isRestoringDt) return;           // nie zapisuj, gdy my przywracamy
  const dt = getDatetime();
  if (!dt) return;
  const v = (dt.value || "").trim();
  if (v) {
    sessionStorage.setItem(DT_KEY, v);
    console.log(`[AutoTZ] remember #datetime = "${v}"`);
  }
}
function readRememberedDatetime() {
  return sessionStorage.getItem(DT_KEY) || "";
}
async function restoreDatetime(saved) {
  const dt = getDatetime();
  if (!dt) return;
  const value = (saved ?? readRememberedDatetime()).trim();
  if (!value) return;

  isRestoringDt = true;
  for (let i = 1; i <= 5; i++) {
    dt.value = value;
    dt.dispatchEvent(new Event("input", {bubbles:true}));
    dt.dispatchEvent(new Event("change", {bubbles:true}));
    console.log(`[AutoTZ] restore #datetime try ${i} → "${value}"`);
    await sleep(120);
    if ((dt.value || "").trim() === value) break;
  }
  isRestoringDt = false;
}

function ensureDefaultDatetime() {
  const dt = getDatetime();
  if (!dt) return;

  const mem = readRememberedDatetime();
  if (mem) {
    console.log("[AutoTZ] session has datetime → restore");
    restoreDatetime(mem);
    return;
  }
  // brak pamięci → ustaw domyślnie niedziela 23:59 (bieżący tydzień)
  const defStr = fmtMMDDYYYY_hhmmAM(endOfThisWeekSunday2359());
  console.log(`[AutoTZ] setting default #datetime = "${defStr}"`);
  dt.value = defStr;
  // normalne eventy (traktujemy jak ustawione), zapisze się przez listener
  dt.dispatchEvent(new Event("input", {bubbles:true}));
  dt.dispatchEvent(new Event("change", {bubbles:true}));
}

// ---------- pomocnicze TZ ----------
function readLangLabel() {
  const lang = getLangSelect();
  if (!lang) return { label:null };
  const label = (lang.selectedOptions?.[0]?.textContent || "").trim().toLowerCase();
  console.log(`[AutoTZ] language label = "${label}"`);
  return { label };
}
function findTzOption(sel, targetTz){
  if (!sel) return null;
  const byVal = sel.querySelector(`option[value="${CSS.escape(targetTz)}"]`);
  if (byVal) return byVal;
  const opts = Array.from(sel.options);
  return opts.find(o => (o.textContent||"").trim().startsWith(targetTz))
      || opts.find(o => (o.textContent||"").includes(targetTz))
      || null;
}
function fireAll(select){
  select.dispatchEvent(new Event("input",{bubbles:true}));
  select.dispatchEvent(new Event("change",{bubbles:true}));
}
function setTimezoneHard(targetTz){
  const tzSel = getTzSelect();
  if (!tzSel) return false;
  const opt = findTzOption(tzSel, targetTz);
  if (!opt) { console.warn("[AutoTZ] no tz option for", targetTz); return false; }

  Array.from(tzSel.options).forEach(o => o.selected = (o === opt));
  tzSel.selectedIndex = Array.from(tzSel.options).indexOf(opt);
  const before = tzSel.value;
  tzSel.value = opt.value;
  fireAll(tzSel);
  try { if (typeof window.setDateTimeValue === "function") setTimeout(()=>window.setDateTimeValue(),0); } catch {}
  console.log(`[AutoTZ] TZ set "${before}" → "${tzSel.value}" (${opt.textContent.trim()})`);
  return true;
}

let lastApplied = {label:null, tz:null};

async function applyForCurrentLanguage(reason="manual"){
  // zapamiętaj aktualny datetime (jeśli użytkownik już ustawił)
  rememberDatetime();

  const {label} = readLangLabel();
  if (!label) return;
  let targetTz = LABEL_TO_TZ[label];
  if (!targetTz) {
    try { targetTz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch {}
  }
  if (!targetTz) return;

  const tzSel = getTzSelect();
  const opt = tzSel && findTzOption(tzSel, targetTz);
  if (!tzSel || !opt) return;

  if (tzSel.value === opt.value && lastApplied.label === label) {
    console.log("[AutoTZ] timezone already correct");
    // jeśli strona wyczyściła #datetime, przywróć z pamięci
    const mem = readRememberedDatetime();
    if (mem) setTimeout(()=>restoreDatetime(mem), 60);
    return;
  }

  console.log(`[AutoTZ] apply (reason=${reason}) → ${targetTz}`);
  const changed = setTimezoneHard(targetTz);
  lastApplied = {label, tz:targetTz};

  if (changed) {
    // Po zmianie TZ przywróć zapamiętaną wartość (jeśli była)
    const mem = readRememberedDatetime();
    if (mem) {
      setTimeout(()=>restoreDatetime(mem), 60);
      setTimeout(()=>restoreDatetime(mem), 260);
      setTimeout(()=>restoreDatetime(mem), 600);
    }
  }
}

// ---------- listenery ----------
document.addEventListener("change", (e)=>{
  if (e?.target?.id === "language") {
    console.log("[AutoTZ] language change → apply in 500ms");
    setTimeout(()=>applyForCurrentLanguage("change"), 500);
  } else if (e?.target?.id === "datetime") {
    rememberDatetime(); // zapisz po ustawieniu przez użytkownika
  }
}, true);

document.addEventListener("input", (e)=>{
  if (e?.target?.id === "language") {
    console.log("[AutoTZ] language input → apply in 500ms");
    setTimeout(()=>applyForCurrentLanguage("input"), 500);
  } else if (e?.target?.id === "datetime") {
    rememberDatetime(); // zapisz po ustawieniu przez użytkownika
  }
}, true);

// watchdog — pilnuje TZ i #datetime
setInterval(()=>{
  const langSel = getLangSelect();
  const tzSel   = getTzSelect();
  if (!langSel || !tzSel) return;

  const label = (langSel.selectedOptions?.[0]?.textContent || "").trim().toLowerCase();
  if (!label) return;

  const shouldTz = LABEL_TO_TZ[label];
  if (shouldTz) {
    const opt = findTzOption(tzSel, shouldTz);
    if (opt && (tzSel.value !== opt.value || lastApplied.label !== label)) {
      console.log("[AutoTZ] watchdog fixes TZ");
      setTimezoneHard(shouldTz);
      lastApplied = {label, tz:shouldTz};
    }
  }

  // jeżeli #datetime różni się od zapamiętanego (np. strona skasowała) → odtwórz
  const mem = readRememberedDatetime();
  const dt  = getDatetime();
  if (mem && dt && (dt.value||"").trim() !== mem) {
    console.log("[AutoTZ] watchdog restore #datetime from session");
    restoreDatetime(mem);
  }
}, 750);

// init: ustaw domyślną datę (lub z sesji), potem TZ
function init() {
  ensureDefaultDatetime();             // jeśli brak pamięci → niedziela 23:59
  setTimeout(()=>applyForCurrentLanguage("init"), 100);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, {once:true});
} else {
  init();
}
