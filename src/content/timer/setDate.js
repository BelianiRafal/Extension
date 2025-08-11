// setDate.js — panel daty (niedziela 23:59) + sesyjna pamięć (IIFE)
(() => {
  'use strict';
  console.log('[AutoTZ] setDate.js loaded');

  const STORE_KEY = 'AutoTZ:dateISO'; // YYYY-MM-DD
  const qs = (s) => document.querySelector(s);
  const sleep = (ms) => new Promise(r=>setTimeout(r,ms));
  const z2 = (n) => String(n).padStart(2,'0');

  const getSiteDT = () => qs('#datetime');

  // ——— niedziele / zakres 30 dni ———
  function nextSundayOnOrAfter(date){
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const add = (7 - d.getDay()) % 7; // 0..6
    d.setDate(d.getDate() + add);
    d.setHours(0,0,0,0);
    return d;
  }
  function lastSundayWithin30Days(){
    const end = new Date(); end.setDate(end.getDate()+30);
    const cand = nextSundayOnOrAfter(end);
    if (cand > end) cand.setDate(cand.getDate()-7);
    return cand;
  }

  function isoFromDate(d){ return `${d.getFullYear()}-${z2(d.getMonth()+1)}-${z2(d.getDate())}`; }
  function dateFromISO(iso){ const [y,m,dd]=iso.split('-').map(Number); return new Date(y, m-1, dd, 0,0,0,0); }

  // MM/DD/YYYY 11:59 PM
  function siteStringFromISO(iso){
    const d = dateFromISO(iso);
    const mm = z2(d.getMonth()+1);
    const dd = z2(d.getDate());
    const yyyy = d.getFullYear();
    return `${mm}/${dd}/${yyyy} 11:59 PM`;
  }

  // parsowanie pola strony → YYYY-MM-DD (ignorujemy czas)
  function parseFromSite(str){
    const m = (str||'').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!m) return '';
    const [, mm, dd, yyyy] = m;
    return `${yyyy}-${z2(mm)}-${z2(dd)}`;
  }

  // ——— UI okienka ———
  function ensurePanel(){
    if (qs('#autotz-panel')) return qs('#autotz-date');

    const style = document.createElement('style');
    style.textContent = `
      #autotz-panel {
        position: fixed; right: 16px; bottom: 16px; z-index: 2147483647;
        background: #eaffea; border: 2px solid #21ba45; color: #1a6f35;
        padding: 10px 12px; border-radius: 10px; box-shadow: 0 6px 18px rgba(0,0,0,.15);
        font-family: inherit; min-width: 240px;
      }
      #autotz-panel h4 { margin: 0 0 6px 0; font-size: 14px; }
      #autotz-panel small { display:block; opacity:.8; margin-top:4px; }
      #autotz-date { width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #21ba45; background:#fff; }
    `;
    document.head.appendChild(style);

    const panel = document.createElement('div');
    panel.id = 'autotz-panel';
    panel.innerHTML = `
      <h4>Timer Sunday @ 23:59</h4>
      <input id="autotz-date" type="date">
      <small>Only Sundays, within 30 days</small>
    `;
    document.body.appendChild(panel);

    const input = panel.querySelector('#autotz-date');
    const min = nextSundayOnOrAfter(new Date());
    const max = lastSundayWithin30Days();
    input.min = isoFromDate(min);
    input.max = isoFromDate(max);
    input.step = '7';

    return input;
  }

  // ——— synchronizacja ———
  let syncing = false;

  function applyToSite(iso, reason='user') {
    const site = getSiteDT(); if (!site || !iso) return;
    const str = siteStringFromISO(iso);
    syncing = true;
    site.value = str;
    site.dispatchEvent(new Event('input',{bubbles:true}));
    site.dispatchEvent(new Event('change',{bubbles:true}));
    syncing = false;
    console.log(`[AutoTZ] site #datetime = "${str}" (${reason})`);
  }

  function initValue() {
    const input = ensurePanel();
    const stored = sessionStorage.getItem(STORE_KEY);
    const defIso = isoFromDate(nextSundayOnOrAfter(new Date()));
    input.value = stored || defIso;
    applyToSite(input.value, stored ? 'init-restore' : 'init-default');
  }

  function wire() {
    const input = ensurePanel();

    const onUserChange = () => {
      const iso = input.value;
      sessionStorage.setItem(STORE_KEY, iso);
      applyToSite(iso, 'user');
    };
    input.addEventListener('change', onUserChange);
    input.addEventListener('input', onUserChange);

    // jeżeli strona podmieni #datetime → przywracamy z panelu
    getSiteDT()?.addEventListener('change', () => {
      if (syncing) return;
      const isoSite = parseFromSite(getSiteDT().value);
      const isoWant = input.value;
      if (isoSite !== isoWant) {
        console.log('[AutoTZ] page changed #datetime → restoring from panel');
        applyToSite(isoWant, 'restore');
      }
    }, true);

    // reaguj na zmianę TZ (event z content.js)
    window.addEventListener('AutoTZ:tzApplied', () => {
      const iso = input.value || sessionStorage.getItem(STORE_KEY);
      if (iso) {
        setTimeout(()=>applyToSite(iso, 'tz-restore'), 80);
        setTimeout(()=>applyToSite(iso, 'tz-restore'), 300);
      }
    });

    // watchdog: trzymaj stronę zgodną z panelem
    setInterval(()=>{
      const site = getSiteDT(); if (!site) return;
      const want = input.value; const cur = parseFromSite(site.value);
      if (want && want !== cur) applyToSite(want, 'watchdog');
    }, 1000);
  }

  function boot(){
    ensurePanel();
    initValue();
    wire();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, {once:true});
  } else {
    boot();
  }
})();
