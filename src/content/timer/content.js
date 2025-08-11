// Mapowanie po etykiecie języka (tekście opcji) -> IANA TZ...
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

console.log("[AutoTZ v1.5] loaded…");

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function q(sel){ return document.querySelector(sel); }

// Zawsze pobieraj świeże węzły z DOM…
function getLangSelect(){ return q("#language"); }
function getTzSelect(){ return q("#timezone"); }

function readLangLabel() {
  const lang = getLangSelect();
  if (!lang) return {val:null, label:null};
  const val = (lang.value||"").toLowerCase();
  const opt = lang.selectedOptions && lang.selectedOptions[0];
  const label = (opt?.textContent||"").trim().toLowerCase();
  console.log(`[AutoTZ] readLangLabel → value="${val}" label="${label}"…`);
  return {val, label};
}

function findTzOption(select, targetTz){
  if (!select) return null;
  const byVal = select.querySelector(`option[value="${CSS.escape(targetTz)}"]`);
  if (byVal) return byVal;
  const opts = Array.from(select.options);
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
  if (!tzSel) { console.warn("[AutoTZ] #timezone not found…"); return false; }
  const opt = findTzOption(tzSel, targetTz);
  if (!opt) { console.warn("[AutoTZ] no option for", targetTz, "…"); return false; }

  // ustawienie „twarde” + eventy…
  Array.from(tzSel.options).forEach(o => o.selected = (o === opt));
  tzSel.selectedIndex = Array.from(tzSel.options).indexOf(opt);
  const before = tzSel.value;
  tzSel.value = opt.value;
  fireAll(tzSel);
  try { if (typeof window.setDateTimeValue === "function") setTimeout(()=>window.setDateTimeValue(),0); } catch {}
  console.log(`[AutoTZ] TZ set "${before}" → "${tzSel.value}" (${opt.textContent.trim()})…`);
  return true;
}

let lastApplied = {label:null, tz:null};

// Główna logika ustawiania…
async function applyForCurrentLanguage(reason="manual"){
  const {label} = readLangLabel();
  if (!label) return;
  const targetTz = LABEL_TO_TZ[label] || (()=>{ try{
    const lt = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.warn("[AutoTZ] fallback to local tz:", lt, "…"); return lt;
  }catch{return null;}})();
  if (!targetTz) return;

  const tzSel = getTzSelect();
  const opt = tzSel && findTzOption(tzSel, targetTz);
  if (!tzSel || !opt) { console.warn("[AutoTZ] missing tz select/option…"); return; }

  // jeżeli już ustawione i zgadza się z mapą — nic nie rób…
  if (tzSel.value === opt.value && lastApplied.label === label) {
    console.log(`[AutoTZ] already correct for "${label}" → ${targetTz}…`);
    return;
  }

  console.log(`[AutoTZ] apply (reason=${reason}) → label="${label}" → ${targetTz}…`);
  setTimezoneHard(targetTz);
  lastApplied = {label, tz:targetTz};
}

// Delegacja zdarzeń: łapiemy zmiany gdziekolwiek, także po podmianie węzłów…
document.addEventListener("change", (e)=>{
  if (e && e.target && e.target.id === "language") {
    console.log("[AutoTZ] document change from #language → will apply in 500ms…");
    setTimeout(()=>applyForCurrentLanguage("change"), 500);
  }
}, true);

document.addEventListener("input", (e)=>{
  if (e && e.target && e.target.id === "language") {
    console.log("[AutoTZ] document input from #language → will apply in 500ms…");
    setTimeout(()=>applyForCurrentLanguage("input"), 500);
  }
}, true);

// Watchdog co 750 ms — jeśli language ≠ lastApplied.label albo TZ nie pasuje do mapy, popraw…
setInterval(()=>{
  const langSel = getLangSelect();
  const tzSel   = getTzSelect();
  if (!langSel || !tzSel) return;

  const {label} = readLangLabel();
  const shouldTz = label ? (LABEL_TO_TZ[label] || null) : null;
  const opt = shouldTz ? findTzOption(tzSel, shouldTz) : null;

  if (!label) return;
  if (!opt) return;

  const mismatch = tzSel.value !== opt.value || lastApplied.label !== label;
  if (mismatch) {
    console.log("[AutoTZ] watchdog correcting →", {label, shouldTz, current: tzSel.value}, "…");
    setTimezoneHard(shouldTz);
    lastApplied = {label, tz:shouldTz};
  }
}, 750);

// Start: lekki delay, żeby ich init się domknął…
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ()=>setTimeout(()=>applyForCurrentLanguage("init"), 100), {once:true});
} else {
  setTimeout(()=>applyForCurrentLanguage("init"), 100);
}
