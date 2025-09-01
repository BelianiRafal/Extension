// setColor.js — panel BG w Shadow DOM (bez kolizji) + wyniki (tabela/JSON/CSV/Links) w light-DOM
(() => {
  'use strict';

  // --- mapy języków i kolekcja timerów ---
  const langToSelectValue = {
    CHDE:"de", CHFR:"fr", FR:"fr", DE:"de", UK:"en", AT:"de", ES:"es",
    PL:"pl", NL:"nl", PT:"pt", IT:"it", SE:"sv", HU:"hu", DK:"da",
    CZ:"cs", FI:"fi", NO:"no", SK:"sk", BENL:"nl", BEFR:"fr", RO:"ro",
  };

  const generatedTimers = {
    CHDE:null, CHFR:null, FR:null, DE:null, UK:null, AT:null, ES:null, PL:null, NL:null,
    PT:null, IT:null, SE:null, HU:null, DK:null, CZ:null, FI:null, NO:null, SK:null,
    BENL:null, BEFR:null, RO:null,
  };

  const BG_KEY = 'AutoTZ:bgColor';
  const qs = (s, root=document) => root.querySelector(s);

  // --- narzędzia ---
  const toRGB = (hex) => {
    let h = (hex || '#000000').replace('#','');
    if (h.length===3) h = h.split('').map(x=>x+x).join('');
    const n = parseInt(h,16);
    return { r:(n>>16)&255, g:(n>>8)&255, b:n&255 };
  };

  function dispatchAll(el){
    el.dispatchEvent(new Event('input', {bubbles:true}));
    el.dispatchEvent(new Event('change', {bubbles:true}));
  }

  function setPickerColor(id, hex){
    const input = document.getElementById(id);
    const btn = document.getElementById(`${id}-div`);
    if(!input) return false;
    input.value = hex;
    dispatchAll(input);
    if(btn){
      const {r,g,b} = toRGB(hex);
      btn.style.setProperty('--tw-color', `rgb(${r}, ${g}, ${b})`);
    }
    return true;
  }

  function normalizeHex(s){
    if(!s) return null;
    let t = s.trim();
    if(t[0]==='#') t = t.slice(1);
    if(!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(t)) return null;
    if(t.length===3) t = t.split('').map(c=>c+c).join('');
    return '#'+t.toUpperCase();
  }

  function waitFor(sel, timeout=15000){
    return new Promise((resolve, reject)=>{
      const now = qs(sel);
      if(now) return resolve(now);
      const mo = new MutationObserver(()=>{
        const el = qs(sel);
        if(el){ mo.disconnect(); resolve(el); }
      });
      mo.observe(document.documentElement, {childList:true, subtree:true});
      setTimeout(()=>{ mo.disconnect(); reject(new Error('timeout '+sel)); }, timeout);
    });
  }

  // --- Shadow DOM panel (tylko sterowanie; zero wpływu na UI strony) ---
  let $shadow, $blue, $hex, $langSelect, $btnGenOne, $btnGenAll;

  function ensureShadowPanel(){
    let host = document.getElementById('autotz-shadow-host');
    if(host?.shadowRoot){ $shadow = host.shadowRoot; return; }

    host = document.createElement('div');
    host.id = 'autotz-shadow-host';
    (document.getElementById('autotz-panel') || document.body).appendChild(host);

    const shadow = host.attachShadow({mode:'open'});
    $shadow = shadow;

    const style = document.createElement('style');
    style.textContent = `
      :host { all: initial; }
      .wrap { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; }
      .label { display:block; font-size:12px; color:#1640ff; margin:8px 0 4px; font-weight:600; }
      .row { display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
      .col { flex:1 1 180px; }
      .input-color { width:100%; height:40px; padding:0; border:2px solid #1f6fff; background:#eef4ff; border-radius:8px; box-sizing:border-box; cursor:pointer; }
      .input-text { width:100%; height:40px; padding:8px 10px; border:2px solid #1f6fff; background:#fff; border-radius:8px; box-sizing:border-box; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
      .input-text.invalid { border-color:#d32f2f; background:#ffecec; }
      .btn { padding:8px 12px; border:1px solid #1f6fff; border-radius:6px; background:#e6f0ff; font-size:12px; cursor:pointer; user-select:none; }
      .btn:hover { filter:brightness(0.97); }
      .select { min-width:180px; height:36px; border:1px solid #c7d6ff; border-radius:6px; background:#fff; }
      .cluster { display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
      .block { margin-top:12px; }
    `;

    const wrap = document.createElement('div');
    wrap.className = 'wrap';
    wrap.innerHTML = `
      <label class="label">Background color:</label>
      <div class="row">
        <div class="col"><input id="bgcolor" class="input-color" type="color"></div>
        <div class="col"><input id="bghex" class="input-text" type="text" placeholder="#RRGGBB" maxlength="7" spellcheck="false"></div>
      </div>

      <div class="block">
        <button id="gen-all" class="btn">Generate All</button>
      </div>

      <label class="label">Language:</label>
      <div class="cluster">
        <select id="lang" class="select">
          <option value="bg">Bulgarian</option>
          <option value="cs">Czech</option>
          <option value="da">Danish</option>
          <option value="nl">Dutch</option>
          <option value="en" selected>English</option>
          <option value="et">Estonian</option>
          <option value="fi">Finnish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="el">Greek</option>
          <option value="he">Hebrew</option>
          <option value="hu">Hungarian</option>
          <option value="is">Icelandic</option>
          <option value="it">Italian</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          <option value="lv">Latvian</option>
          <option value="lt">Lithuanian</option>
          <option value="no">Norwegian</option>
          <option value="pl">Polish</option>
          <option value="pt">Portuguese</option>
          <option value="ro">Romanian</option>
          <option value="ru">Russian</option>
          <option value="zh-CN">Simplified Chinese</option>
          <option value="sr">Serbian</option>
          <option value="sk">Slovak</option>
          <option value="es">Spanish</option>
          <option value="sv">Swedish</option>
          <option value="tr">Turkish</option>
        </select>
        <button id="gen-one" class="btn">Generate</button>
      </div>
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrap);

    $blue = qs('#bgcolor', shadow);
    $hex = qs('#bghex', shadow);
    $langSelect = qs('#lang', shadow);
    $btnGenOne = qs('#gen-one', shadow);
    $btnGenAll = qs('#gen-all', shadow);
  }

  // --- light-DOM: kontener wyników + style prefiksowane ---
  function ensureResultsContainer(){
    // styles tylko dla naszych wyników, z prefiksem #autotz-results
    if(!document.getElementById('autotz-results-style')){
      const st = document.createElement('style');
      st.id = 'autotz-results-style';
      st.textContent = `
        #autotz-results-wrap { margin-top:12px; font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; }
        #autotz-results { width:100%; border-collapse:collapse; margin-top:12px; font-size:12px; }
        #autotz-results th, #autotz-results td { border:1px solid #e5e7eb; padding:6px 8px; vertical-align:top; }
        #autotz-results th { background:#f8fafc; text-align:left; }
        #autotz-json, #autotz-csv, #autotz-links { width:100%; box-sizing:border-box; min-height: 160px; }
        .autotz-block { margin-top:12px; }
        .autotz-small { font-size:12px; font-weight:600; margin-bottom:6px; display:block; }
        .autotz-btn { padding:6px 10px; border:1px solid #1f6fff; border-radius:6px; background:#e6f0ff; cursor:pointer; font-size:12px; color:#000; }
        .autotz-btn + .autotz-btn { margin-left:8px; }
        #autotz-preview { position:absolute; z-index:99999; display:none; pointer-events:none; background:#fff; border:1px solid rgba(0,0,0,0.12); padding:6px; box-shadow:0 6px 18px rgba(0,0,0,0.12); border-radius:6px; }
        #autotz-preview img { max-width:320px; max-height:240px; display:block; }
      `;
      document.head.appendChild(st);
    }

    const container = document.querySelector('.result-div-for-code') || document.body;

    // główny wrap wyników
    let wrap = document.getElementById('autotz-results-wrap');
    if(!wrap){
      wrap = document.createElement('div');
      wrap.id = 'autotz-results-wrap';
      container.appendChild(wrap);
    }

    // podgląd hover dla linków
    if(!document.getElementById('autotz-preview')){
      const prev = document.createElement('div');
      prev.id = 'autotz-preview';
      document.body.appendChild(prev);
    }

    return wrap;
  }

  function applyBg(hex, reason='user'){
    if($blue && $blue.value.toLowerCase() !== hex.toLowerCase()) $blue.value = hex;
    if($hex && $hex.value.toUpperCase() !== hex.toUpperCase()){
      $hex.classList.remove('invalid');
      $hex.value = hex.toUpperCase();
    }
    sessionStorage.setItem(BG_KEY, hex);
    setPickerColor('bg-color-id', hex);
  }

  // --- render wyników (LIGHT DOM!) ---
  function buildResultsUI(){
    const wrap = ensureResultsContainer();
    wrap.innerHTML = '';

    // tabela
    const table = document.createElement('table');
    table.id = 'autotz-results';
    table.innerHTML = `<thead><tr><th>SLUG</th><th>Timer SRC</th></tr></thead>`;
    const tbody = document.createElement('tbody');

    const preview = document.getElementById('autotz-preview');

    for(const slug of Object.keys(generatedTimers)){
      const src = generatedTimers[slug];
      const tr = document.createElement('tr');
      const tdSlug = document.createElement('td'); tdSlug.textContent = slug;
      const tdSrc = document.createElement('td');

      if(src){
        const a = document.createElement('a');
        a.href = src; a.target = '_blank'; a.rel = 'noopener noreferrer';
        a.textContent = src;
        a.style.wordBreak = 'break-all';

        a.addEventListener('mouseenter', () => {
          preview.innerHTML = '';
          const img = document.createElement('img');
          img.src = src; img.alt = slug;
          preview.appendChild(img);
          preview.style.display = 'block';
          const rect = a.getBoundingClientRect();
          preview.style.top = (window.scrollY + rect.bottom + 8) + 'px';
          preview.style.left = (window.scrollX + rect.left) + 'px';
        });
        a.addEventListener('mousemove', (ev) => {
          preview.style.top = (window.scrollY + ev.clientY + 12) + 'px';
          preview.style.left = (window.scrollX + ev.clientX + 12) + 'px';
        });
        a.addEventListener('mouseleave', () => { preview.style.display = 'none'; });

        tdSrc.appendChild(a);
      } else {
        tdSrc.textContent = '';
      }

      tr.appendChild(tdSlug); tr.appendChild(tdSrc);
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    wrap.appendChild(table);

    // JSON
    const jsonBlock = document.createElement('div');
    jsonBlock.className = 'autotz-block';
    jsonBlock.innerHTML = `<span class="autotz-small">Generated timers (JSON):</span>`;
    const jsonTA = document.createElement('textarea');
    jsonTA.id = 'autotz-json';
    jsonTA.value = JSON.stringify(generatedTimers, null, 2);
    jsonBlock.appendChild(jsonTA);
    wrap.appendChild(jsonBlock);

    // CSV / Links-only (kolejność wymagana)
    const csvOrder = [
      ['UK','ukuk'], ['CZ','czcz'], ['DK','dkdk'], ['NL','nlnl'], ['FI','fifi'],
      ['FR','frfr'], ['CHFR','chfr'], ['CHDE','chde'], ['DE','dede'], ['AT','atde'],
      ['HU','huhu'], ['IT','itit'], ['NO','nono'], ['PL','plpl'], ['PT','ptpt'],
      ['SK','sksk'], ['ES','eses'], ['SE','sese'], ['BENL','benl'], ['BEFR','befr'], ['RO','roro'],
    ];

    const toCSV = (rows)=>rows.map(r=>r.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(',')).join('\n');

    async function copy(text){
      try{ await navigator.clipboard.writeText(text); }
      catch{
        const t = document.createElement('textarea');
        t.value = text; t.style.position='fixed'; t.style.top='-9999px';
        document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove();
      }
    }

    const rows = [['CODE','LINK']];
    const linksOnly = [];
    for(const [slug, code] of csvOrder){
      const link = generatedTimers[slug] || '';
      rows.push([code, link]);
      linksOnly.push(link);
    }
    const csvText = toCSV(rows);
    const linksText = linksOnly.join('\n');

    // CSV block
    const csvBlock = document.createElement('div');
    csvBlock.className = 'autotz-block';
    csvBlock.innerHTML = `<span class="autotz-small">Generated timers (CSV – CODE,LINK):</span>`;
    const csvTA = document.createElement('textarea');
    csvTA.id = 'autotz-csv';
    csvTA.value = csvText;
    const csvBtns = document.createElement('div');
    const btnCopyCSV = document.createElement('button');
    btnCopyCSV.className = 'autotz-btn'; btnCopyCSV.textContent = 'Copy CSV';
    btnCopyCSV.addEventListener('click', ()=>copy(csvTA.value));
    const btnDownloadCSV = document.createElement('button');
    btnDownloadCSV.className = 'autotz-btn'; btnDownloadCSV.textContent = 'Download CSV';
    btnDownloadCSV.addEventListener('click', ()=>{
      const blob = new Blob([csvTA.value], {type:'text/csv;charset=utf-8'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'generated_timers.csv';
      document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    });
    csvBtns.appendChild(btnCopyCSV); csvBtns.appendChild(btnDownloadCSV);
    csvBlock.appendChild(csvTA); csvBlock.appendChild(csvBtns);
    wrap.appendChild(csvBlock);

    // Links-only block
    const linksBlock = document.createElement('div');
    linksBlock.className = 'autotz-block';
    linksBlock.innerHTML = `<span class="autotz-small">Links only (one per line, in required order):</span>`;
    const linksTA = document.createElement('textarea');
    linksTA.id = 'autotz-links';
    linksTA.value = linksText;
    const btnCopyLinks = document.createElement('button');
    btnCopyLinks.className = 'autotz-btn'; btnCopyLinks.textContent = 'Copy Links Column';
    btnCopyLinks.style.marginTop = '6px';
    btnCopyLinks.addEventListener('click', ()=>copy(linksTA.value));
    linksBlock.appendChild(linksTA); linksBlock.appendChild(btnCopyLinks);
    wrap.appendChild(linksBlock);

    // DataTable (jeśli globalnie dostępny)
    if(typeof DataTable === 'function'){
      try { new DataTable('#autotz-results', { paging:false }); }
      catch(err){ console.warn('DataTable init failed:', err); }
    }
  }

  function wirePanelHandlers(){
    // sync języka do głównego selecta strony (jeśli jest)
    $langSelect?.addEventListener('change', (e)=>{
      const main = document.querySelector('select#language');
      if(main) main.value = e.target.value;
    });

    // pojedyncze Generate
    $btnGenOne?.addEventListener('click', ()=>{
      const btn = document.querySelector('button#sendtric-button');
      if(!btn){ console.warn('[AutoTZ] sendtric-button not found'); return; }
      if(btn.getAttribute('disabled')) btn.removeAttribute('disabled');
      btn.click();
    });

    // kolor
    $blue?.addEventListener('input', ()=>{
      const hex = $blue.value || '#000000';
      $hex.value = hex.toUpperCase();
      applyBg(hex, 'panel-color');
    });

    // HEX
    const onHexInput = ()=>{
      const n = normalizeHex($hex.value);
      if(n){
        $hex.classList.remove('invalid');
        if($blue.value.toLowerCase() !== n.toLowerCase()) $blue.value = n;
        applyBg(n, 'panel-hex');
      } else {
        $hex.classList.add('invalid');
      }
    };
    $hex?.addEventListener('input', onHexInput);
    $hex?.addEventListener('change', onHexInput);
    $hex?.addEventListener('blur', ()=>{
      if($hex.classList.contains('invalid')){
        const saved = sessionStorage.getItem(BG_KEY) || '#000000';
        $hex.classList.remove('invalid');
        $hex.value = saved.toUpperCase();
        if($blue.value.toLowerCase() !== saved.toLowerCase()) $blue.value = saved;
        applyBg(saved, 'hex-blur-restore');
      }
    });

    // Generate All
    $btnGenAll?.addEventListener('click', tryToGenerateAllAtOnce);
  }

  function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }
  let isRunning=false, lastSaved;

  function isPlaceholderSrc(src){
    return !src || /placeholder/i.test(src) || src.endsWith('placeholder.gif');
  }

  function keysInNaturalOrder(){
    // zachowujemy kolejność Object.keys(langToSelectValue) — jak wcześniej
    return Object.keys(langToSelectValue);
  }

  function tryToGenerateAllAtOnce(){
    if(isRunning) return;
    const keys = keysInNaturalOrder();

    (async ()=>{
      if(isRunning) return;
      isRunning = true;
      try{
        const autoTzLangSelector = $langSelect;
        for(const slug of keys){
          const language = langToSelectValue[slug];
          console.log(`--- STARTED GENERATING TIMER FOR: ${slug} [${language}]`);

          let saved=false;
          const maxAttempts=15;
          for(let attempt=1; attempt<=maxAttempts; attempt++){
            console.log(`  → Attempt ${attempt}. for ${slug}:`);

            if(autoTzLangSelector){
              autoTzLangSelector.value = language;
              autoTzLangSelector.dispatchEvent(new Event('change', {bubbles:true}));
            }

            $btnGenOne?.click();
            await sleep(700);

            const img = document.querySelector("img[alt='Email Live Countdown Timer']");
            if(!img){
              console.warn("   × Error reading image source --- waiting 5s");
              await sleep(5000); continue;
            }

            const newSrc = img.src;
            if(isPlaceholderSrc(newSrc)){
              console.warn("   × Placeholder src found --- waiting 5s");
              await sleep(5000); continue;
            }

            if(lastSaved === newSrc){
              console.warn("   × Duplicate src found --- waiting 3s (might be captcha)");
              await sleep(3000); continue;
            }

            generatedTimers[slug] = newSrc;
            lastSaved = newSrc;
            console.log(`   ⩗ Saved new unique src for ${slug}: ${newSrc}`);
            saved = true; break;
          }

          if(!saved) console.warn(`   × Could not generate valid unique src for ${slug}`);
          await sleep(1000);
        }

        // render w LIGHT DOM (jak dawniej)
        buildResultsUI();

      } finally {
        isRunning=false;
      }
    })();
  }

  // --- init ---
  async function init(){
    try{
      await Promise.all([
        waitFor('#label-color-id'),
        waitFor('#digit-color-id'),
        waitFor('#bg-color-id'),
      ]);

      setPickerColor('label-color-id', '#000000');
      setPickerColor('digit-color-id',  '#000000');

      ensureShadowPanel();
      wirePanelHandlers();
      ensureResultsContainer(); // zapewnij kontener od razu (nic nie zmienia layoutu reszty)

      const pageBgInput = document.getElementById('bg-color-id');

      const rawStart = sessionStorage.getItem(BG_KEY) || (pageBgInput?.value || '#000000');
      const start = normalizeHex(rawStart) || '#000000';
      $blue.value = start;
      $hex.value = start.toUpperCase();
      applyBg(start, 'init');

      // watchdog koloru
      setInterval(()=>{
        const want = (sessionStorage.getItem(BG_KEY) || $blue.value || '#000000').toLowerCase();
        const have = (pageBgInput?.value || '#000000').toLowerCase();
        if(want !== have) applyBg(want, 'watchdog');

        // opcjonalne porządki (bez psucia layoutu)
        // document.querySelector('header')?.remove(); // jeśli to przeszkadza — usuń ten wiersz
        const ph = document.querySelector('.laptop-and-phone-placeholder-div'); if(ph) ph.style.display='none';
      }, 1200);

    } catch(e){
      // cicho
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init, {once:true});
  } else {
    init();
  }
})();
