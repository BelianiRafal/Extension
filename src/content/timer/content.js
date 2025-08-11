// content.js — Time Zone by Language (bez logiki daty)
console.log("[AutoTZ] content.js loaded");

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

const q = s => document.querySelector(s);
const getLang = () => q("#language");
const getTZ   = () => q("#timezone");

function findTzOption(select, targetTz){
  if (!select) return null;
  const byVal = select.querySelector(`option[value="${CSS.escape(targetTz)}"]`);
  if (byVal) return byVal;
  const opts = Array.from(select.options);
  return opts.find(o => (o.textContent||"").trim().startsWith(targetTz))
      || opts.find(o => (o.textContent||"").includes(targetTz))
      || null;
}

function fireAll(el){
  el.dispatchEvent(new Event("input",{bubbles:true}));
  el.dispatchEvent(new Event("change",{bubbles:true}));
}

function applyTZForLabel(label) {
  const tzSel = getTZ(); if (!tzSel) return false;
  const targetTz = LABEL_TO_TZ[label] || (()=>{try{return Intl.DateTimeFormat().resolvedOptions().timeZone;}catch{return null;}})();
  if (!targetTz) return false;

  const opt = findTzOption(tzSel, targetTz);
  if (!opt) { console.warn("[AutoTZ] no tz option for", targetTz); return false; }

  if (tzSel.value !== opt.value) {
    const before = tzSel.value;
    Array.from(tzSel.options).forEach(o=>o.selected=(o===opt));
    tzSel.selectedIndex = Array.from(tzSel.options).indexOf(opt);
    tzSel.value = opt.value;
    fireAll(tzSel);
    try { if (typeof window.setDateTimeValue === "function") setTimeout(()=>window.setDateTimeValue(),0); } catch {}
    console.log(`[AutoTZ] TZ "${before}" → "${tzSel.value}"`);
  } else {
    console.log("[AutoTZ] TZ already correct:", tzSel.value);
  }

  // powiadom setDate.js
  window.dispatchEvent(new CustomEvent("AutoTZ:tzApplied", {
    detail: { tz: tzSel.value, label }
  }));
  return true;
}

function readLabel() {
  return (getLang()?.selectedOptions?.[0]?.textContent || "").trim().toLowerCase() || null;
}

function initTZ() {
  // init
  const lab = readLabel(); if (lab) setTimeout(()=>applyTZForLabel(lab), 100);

  // reaguj na zmianę języka (delegacja)
  document.addEventListener("change", (e)=>{
    if (e?.target?.id === "language") {
      const label = readLabel(); if (!label) return;
      console.log("[AutoTZ] language change → apply TZ in 500ms");
      setTimeout(()=>applyTZForLabel(label), 500);
    }
  }, true);
  document.addEventListener("input", (e)=>{
    if (e?.target?.id === "language") {
      const label = readLabel(); if (!label) return;
      console.log("[AutoTZ] language input → apply TZ in 500ms");
      setTimeout(()=>applyTZForLabel(label), 500);
    }
  }, true);

  // prosty watchdog
  setInterval(()=>{
    const label = readLabel(); const tzSel = getTZ(); if (!label || !tzSel) return;
    const should = LABEL_TO_TZ[label]; if (!should) return;
    const opt = findTzOption(tzSel, should);
    if (opt && tzSel.value !== opt.value) {
      console.log("[AutoTZ] watchdog: fix TZ");
      applyTZForLabel(label);
    }
  }, 1000);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTZ, {once:true});
} else {
  initTZ();
}
