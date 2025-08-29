// == Newsletter Translations — snapshot & diff watcher ==
// Działa na: start.php (API) + react/logs/issue_logs/* (DOM)
// Wymaga zalogowania; fetch z credentials: 'include'

(() => {
  const POLL_MS = 15000;                    // co ile robić snapshot z API (na testy 15s)
  const BOARD_ID = '13';                    // ID boardu
  const NAME_MATCH = (s='') => /newsletter/i.test(s) && /translation/i.test(s); // dopasowanie checklisty
  const LS_STATE = 'nltr_map_state_v1';     // mapa stanu
  const LS_QUEUE = 'nltr_map_queue_v1';     // kolejka zdarzeń
  const DEBUG = false;

  // Kto ja jestem (login z <body data-user="...">)
  const ME = document.body?.dataset?.user || '';

  // --- UI (queue + toast) ---
  function ensureUI(){
    if (document.getElementById('nltr-queue')) return;
    const css = `
      #nltr-queue{position:fixed;right:16px;bottom:16px;z-index:2147483647;font-family:system-ui,Arial}
      .nltr-card{background:#111;color:#fff;border:1px solid #333;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.35);padding:12px;min-width:320px;margin-top:12px}
      .nltr-title{font-weight:700;font-size:14px;margin-bottom:8px}
      .nltr-meta{font-size:12px;opacity:.85;margin-bottom:8px}
      .nltr-row{display:flex;gap:8px;margin-top:8px}
      .nltr-btn{cursor:pointer;border:1px solid #444;background:#1b1b1b;color:#fff;border-radius:8px;padding:6px 10px;font-size:12px}
      .nltr-btn:hover{background:#222}
      .nltr-badge{display:inline-block;background:#2b6fff;color:#fff;border-radius:999px;padding:2px 8px;font-size:11px;margin-left:6px}
      .nltr-toast{position:fixed;right:16px;bottom:240px;background:#111;color:#fff;border:1px solid #333;border-radius:10px;padding:10px 12px;z-index:2147483647;opacity:0;transform:translateY(10px);transition:all .2s}
      .nltr-toast.show{opacity:1;transform:translateY(0)}
    `;
    const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    const wrap = document.createElement('div'); wrap.id = 'nltr-queue'; document.body.appendChild(wrap);
    renderQueue();
  }
  function toast(msg){
    const t = document.createElement('div'); t.className='nltr-toast'; t.textContent=msg; document.body.appendChild(t);
    requestAnimationFrame(()=>t.classList.add('show'));
    setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(),250); }, 3000);
  }
  const esc = s => String(s||'').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
  function qGet(){ return JSON.parse(localStorage.getItem(LS_QUEUE) || '[]'); }
  function qSet(v){ localStorage.setItem(LS_QUEUE, JSON.stringify(v)); }
  function renderQueue(){
    ensureUI();
    const wrap = document.getElementById('nltr-queue');
    const q = qGet();
    wrap.innerHTML = '';
    q.forEach((it, i) => {
      const el = document.createElement('div');
      el.className = 'nltr-card';
      el.innerHTML = `
        <div class="nltr-title">Newsletter Translations ${it.change==='checked'?'completed':'updated'}
          <span class="nltr-badge">#${it.issueId}</span>
        </div>
        <div class="nltr-meta">
          <div><strong>Issue:</strong> ${esc(it.issueTitle||'')}</div>
          <div><strong>Item:</strong> ${esc(it.itemText||'')}</div>
          <div><strong>Who:</strong> ${esc(it.who||'unknown')} • <strong>When:</strong> ${new Date(it.ts).toLocaleString()}</div>
        </div>
        <div class="nltr-row">
          <button class="nltr-btn" data-a="open">Open issue</button>
          <button class="nltr-btn" data-a="snooze">Snooze 15m</button>
          <button class="nltr-btn" data-a="dismiss">Dismiss</button>
        </div>`;
      el.querySelectorAll('.nltr-btn').forEach(b=>{
        b.onclick = () => {
          const a = b.dataset.a;
          const qq = qGet();
          if (a==='open') window.open(`https://www.prologistics.info/react/logs/issue_logs/${it.issueId}`,'_blank');
          if (a==='snooze') { qq[i].snoozeUntil = Date.now()+15*60*1000; qSet(qq); toast('Snoozed 15m…'); }
          if (a==='dismiss') { qq.splice(i,1); qSet(qq); }
          renderQueue();
        };
      });
      wrap.appendChild(el);
    });
  }

  // --- Storage map ---
  function loadState(){ return JSON.parse(localStorage.getItem(LS_STATE) || '{"items":{}, "meta":{}}'); }
  function saveState(s){ localStorage.setItem(LS_STATE, JSON.stringify(s)); }

  // Struktura stanu:
  // state.items[key] = { issueId, issueTitle, itemId, itemText, checked, checklistName, solver, ts }
  // gdzie key = `${issueId}:${itemId}` (API) lub `${issueId}:tableid-${tableId}` (DOM)

  // --- API helpers ---
  const API = {
    list: (page=1) => `https://www.prologistics.info/api/issueLog/list/?status=open&setting_view=1&issue_board=${BOARD_ID}&page=${page}`,
    checklist: (id) => `https://www.prologistics.info/api/issueLog/checklist/?issue_id=${id}`,
  };
  async function jget(u){
    const r = await fetch(u, { credentials:'include' });
    if (!r.ok) throw new Error(`${u} -> ${r.status}`);
    return r.json();
  }
  function isMineIssue(it){
    const login = it.solving_resp_username || it.solving_resp_login || it.solving_user || it.solving || '';
    if (DEBUG && login !== ME) console.log('[NLTR] skip not mine:', it.id, login, '!=', ME);
    return login === ME;
  }
  function isCheckedAPI(item){
    return !!(item?.done === true ||
              item?.is_checked === 1 || item?.is_checked === true ||
              String(item?.status||'').toLowerCase() === 'done' ||
              item?.checked === true || item?.checked_at || item?.done_at);
  }

  async function fetchMyIssues(){
    let page=1, total=Infinity, acc=[];
    while(acc.length < total && page < 50){
      const d = await jget(API.list(page));
      total = Number(d?.issue_pagination?.total ?? d?.issue_list?.length ?? 0);
      acc = acc.concat(d?.issue_list || []);
      page++;
    }
    return acc.filter(isMineIssue);
  }

  async function snapshotFromAPI(){
    const state = { items:{}, meta:{ source:'api', at:Date.now() } };
    const issues = await fetchMyIssues();
    for (const it of issues){
      const chk = await jget(API.checklist(it.id));
      const lists = chk?.checklists || [];
      const nl = lists.find(c => NAME_MATCH(c?.name || ''));
      if (!nl || !Array.isArray(nl.items)) continue;

      for (const ci of nl.items){
        const key = `${it.id}:${ci.id}`;
        state.items[key] = {
          issueId: it.id,
          issueTitle: it.issue_title || it.title || '',
          itemId: ci.id,
          itemText: ci.text || ci.title || '',
          checked: isCheckedAPI(ci),
          checklistName: nl.name,
          solver: it.solving_resp_username || it.solving_resp_login || '',
          ts: Date.now(),
        };
      }
      if (DEBUG) console.log('[NLTR] snap issue', it.id, 'items in NL:', nl.items?.length || 0);
    }
    return state;
  }

  // --- Diff & notify ---
  function diffAndNotify(prev, next){
    const prevItems = prev?.items || {};
    const nextItems = next?.items || {};
    let changes = 0;

    Object.keys(nextItems).forEach(k => {
      const p = prevItems[k];
      const n = nextItems[k];
      if (!p) return; // nowy item — nie alarmuj (baseline + później zmiana)
      if (p.checked !== n.checked){
        changes++;
        // tylko info przy przejściu na checked (możesz zmienić wg potrzeb)
        const changeType = n.checked ? 'checked' : 'unchecked';
        notifyChange({ ...n, change: changeType });
      }
    });

    if (DEBUG) console.log('[NLTR] diff changes:', changes);
  }

  function notifyChange(ev){
    const q = qGet();
    // de-dupe
    if (!q.find(x => x.issueId===ev.issueId && x.itemId===ev.itemId && x.change===ev.change)){
      q.unshift({
        issueId: ev.issueId,
        issueTitle: ev.issueTitle,
        itemId: ev.itemId,
        itemText: ev.itemText,
        who: ev.solver || ME,
        change: ev.change, // 'checked' | 'unchecked'
        ts: Date.now(),
      });
      qSet(q);
      renderQueue();
      toast(`✓ NL Translations on #${ev.issueId}: ${ev.itemText}`);
    }
  }

  // --- Scan loop (API) ---
  async function scan(){
    try{
      ensureUI();
      const prev = loadState();
      const next = await snapshotFromAPI();
      if (Object.keys(prev.items).length){
        diffAndNotify(prev, next);
      } else if (DEBUG){
        console.log('[NLTR] baseline set (no previous state)');
      }
      saveState(next);
      // odkurz snooze
      const q = qGet().map(x => {
        if (x.snoozeUntil && Date.now() > x.snoozeUntil) delete x.snoozeUntil;
        return x;
      });
      qSet(q);
      renderQueue();
    }catch(e){
      if (DEBUG) console.warn('[NLTR] scan error', e);
    }
  }

  // --- DOM watcher na stronie szczegółu (natychmiast po kliknięciu) ---
  function bindDomOnIssuePage(){
    if (!/\/react\/logs\/issue_logs\/\d+/.test(location.pathname)) return;
    const issueId = Number(location.pathname.match(/issue_logs\/(\d+)/)?.[1] || '0') || 0;

    // Znajdź panel z „Newsletter Translations”
    const getPanel = () => [...document.querySelectorAll('.panel.panel-default')]
      .find(p => NAME_MATCH(p.textContent || ''));

    const getItemTableId = (li) => {
      const a = li.querySelector('a[href*="table_name=issue_checkpoint"]');
      if (!a) return undefined;
      try {
        const u = new URL(a.href, location.origin);
        return u.searchParams.get('tableid');
      } catch { return undefined; }
    };

    const bindOnce = () => {
      const panel = getPanel();
      if (!panel) return;

      const lis = panel.querySelectorAll('li');
      lis.forEach(li => {
        const cb = li.querySelector('input[type="checkbox"]');
        if (!cb || cb._nltrBound) return;
        cb._nltrBound = true;

        cb.addEventListener('change', () => {
          const tableId = getItemTableId(li) || ('dom-' + Math.random().toString(36).slice(2));
          const key = `${issueId}:tableid-${tableId}`;
          const itemText = (li.innerText || '').trim().split('\n')[0].slice(0,140);
          const checked = cb.checked;

          // wczytaj mapę, zaktualizuj item i wyzwól diff lokalny
          const st = loadState();
          const prev = st.items[key];
          st.items[key] = {
            issueId,
            issueTitle: document.title.replace(/\s+\|\s+.*/,''),
            itemId: `tableid-${tableId}`,
            itemText,
            checked,
            checklistName: 'Newsletter Translations',
            solver: ME,
            ts: Date.now()
          };
          saveState(st);

          if (!prev || prev.checked !== checked){
            notifyChange({ ...st.items[key], change: checked ? 'checked' : 'unchecked' });
          }
        });
      });
    };

    // pobinduj od razu i przy dynamicznych zmianach
    bindOnce();
    const mo = new MutationObserver(() => bindOnce());
    mo.observe(document.body, { childList:true, subtree:true });
  }

  // --- publiczne narzędzia diagnostyczne ---
  window.__nltr = {
    scanNow: scan,
    baseline: async () => { const s = await snapshotFromAPI(); saveState(s); console.log('[NLTR] baseline saved with', Object.keys(s.items).length, 'items'); },
    clear: () => { localStorage.removeItem(LS_STATE); localStorage.removeItem(LS_QUEUE); console.log('[NLTR] cleared'); },
    print: () => console.log(loadState()),
    dumpIssue: (id) => {
      const s = loadState();
      const rows = Object.values(s.items).filter(x => x.issueId == id)
        .map(x => ({ key:`${x.issueId}:${x.itemId}`, checked:x.checked, text:x.itemText }));
      console.table(rows);
    }
  };

  // start
  ensureUI();
  bindDomOnIssuePage();
  scan();
  setInterval(scan, POLL_MS);
})();
// ---- Console bridge: sterowanie z konsoli strony przez window.postMessage ----
(function setupNltrConsoleBridge(){
  window.addEventListener('message', (e) => {
    if (e.source !== window || !e.data || !e.data.__nltrCmd) return;
    const cmd = e.data.__nltrCmd;

    if (cmd === 'scanNow') {
      scan();
    } else if (cmd === 'baseline') {
      snapshotFromAPI().then(s => {
        saveState(s);
        console.log('[NLTR] baseline saved with', Object.keys(s.items).length, 'items');
      });
    } else if (cmd === 'clear') {
      localStorage.removeItem(LS_STATE);
      localStorage.removeItem(LS_QUEUE);
      console.log('[NLTR] cleared');
    } else if (cmd === 'print') {
      window.postMessage({ __nltrResp: 'print', payload: loadState() }, '*');
    } else if (cmd === 'dumpIssue') {
      const id = e.data.issueId;
      const s = loadState();
      const rows = Object.values(s.items)
        .filter(x => String(x.issueId) === String(id))
        .map(x => ({ key: `${x.issueId}:${x.itemId}`, checked: !!x.checked, text: x.itemText }));
      window.postMessage({ __nltrResp: 'dumpIssue', payload: rows }, '*');
    }
  });
})();
window.addEventListener('message', e => {
  if (e.data?.__nltrResp === 'print') console.log('NLTR state:', e.data.payload);
  if (e.data?.__nltrResp === 'dumpIssue') console.table(e.data.payload);
});
