(() => {
  const DEBUG = true;                  // na czas testów…
  const POLL_MS = 5000;                // 5s…
  const CHECKLIST_KEYWORDS = [
    'newsletter translations',         // główna
    'translations – newsletter',
    'translations newsletter'
  ];
  const BOARD_ID = '13';

  const STORAGE_KEY = 'nltr_api_watcher_state_v2';
  const QUEUE_KEY   = 'nltr_api_watcher_queue_v2';

  // --- who am I ---
  function getME() {
    try {
      const s = [...document.body.querySelectorAll('script')]
        .find(x => x.textContent.includes('pushHost'));
      if (s) {
        const me = JSON.parse(s.textContent.split(';')[3].split('=')[1]);
        if (DEBUG) console.log('[NLTR] ME (script)=', me);
        return me;
      }
    } catch(_) {}
    try {
      const me = document.cookie.split(';').map(x=>x.trim()).find(x=>x.startsWith('user='))?.split('=')[1]
        || document.cookie.split(';')[2]?.split('=')[1];
      if (DEBUG) console.log('[NLTR] ME (cookie)=', me);
      return me || '';
    } catch(_) { return ''; }
  }
  const ME = getME();

  // --- storage ---
  const LS = {
    get: (k, d) => JSON.parse(localStorage.getItem(k) || JSON.stringify(d)),
    set: (k, v) => localStorage.setItem(k, JSON.stringify(v))
  };

  // --- UI minimal ---
  function ensureUI() {
    if (document.getElementById('nltr-queue')) return;
    const style = document.createElement('style');
    style.textContent = `
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
    document.head.appendChild(style);
    const wrap = document.createElement('div');
    wrap.id = 'nltr-queue';
    document.body.appendChild(wrap);
    renderQueue();
  }
  function toast(msg){
    const t = document.createElement('div');
    t.className = 'nltr-toast';
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(()=>t.classList.add('show'));
    setTimeout(()=>{t.classList.remove('show'); setTimeout(()=>t.remove(),250);}, 3000);
  }
  const esc = s => String(s||'').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));

  function renderQueue(){
    ensureUI();
    const q = LS.get(QUEUE_KEY, []);
    const wrap = document.getElementById('nltr-queue');
    wrap.innerHTML = '';
    q.forEach((it, i) => {
      const card = document.createElement('div');
      card.className = 'nltr-card';
      card.innerHTML = `
        <div class="nltr-title">Newsletter Translations completed <span class="nltr-badge">#${it.issueId}</span></div>
        <div class="nltr-meta">
          <div><strong>Issue:</strong> ${esc(it.issueTitle)}</div>
          <div><strong>Checklist item:</strong> ${esc(it.itemText)}</div>
          <div><strong>By:</strong> ${esc(it.doneBy||'unknown')} • <strong>When:</strong> ${new Date(it.ts).toLocaleString()}</div>
        </div>
        <div class="nltr-row">
          <button class="nltr-btn" data-a="open">Open issue</button>
          <button class="nltr-btn" data-a="snooze">Snooze 15m</button>
          <button class="nltr-btn" data-a="dismiss">Dismiss</button>
        </div>`;
      card.querySelectorAll('.nltr-btn').forEach(b=>{
        b.onclick = () => {
          const a = b.dataset.a;
          const q2 = LS.get(QUEUE_KEY, []);
          if (a==='open') window.open(`https://www.prologistics.info/react/logs/issue_logs/${it.issueId}`, '_blank');
          if (a==='snooze') { q2[i].snoozeUntil = Date.now()+15*60*1000; LS.set(QUEUE_KEY,q2); toast('Snoozed 15m…'); }
          if (a==='dismiss') { q2.splice(i,1); LS.set(QUEUE_KEY,q2); }
          renderQueue();
        };
      });
      wrap.appendChild(card);
    });
  }

  // --- API ---
  const API = {
    list: (page=1) => `${window.location.origin}/api/issueLog/list/?status=open&setting_view=1&issue_board=${BOARD_ID}&page=${page}`,
    checklist: (id) => `${window.location.origin}/api/issueLog/checklist/?issue_id=${id}`,
  };
  const jget = async (u) => {
    const r = await fetch(u, {credentials:'include'});
    if (!r.ok) throw new Error(`${u} -> ${r.status}`);
    return r.json();
  };
  async function getAllIssues(){
    let page=1,total=Infinity,acc=[];
    while (acc.length<total && page<50){
      const d = await jget(API.list(page));
      total = Number(d?.issue_pagination?.total ?? d?.issue_list?.length ?? 0);
      acc = acc.concat(d?.issue_list||[]);
      page++;
    }
    if (DEBUG) console.log('[NLTR] fetched issues:', acc.length);
    return acc;
  }

  // --- helpers ---
  const isMine = (it) => {
    const cand = it.solving_resp_username || it.solving_resp_login || it.solving_user || it.solving || '';
    const ok = cand === ME;
    if (DEBUG && !ok) console.log('[NLTR] skip not mine:', it.id, cand, '!=', ME);
    return ok;
  };
  const matchesChecklistName = (name='') => {
    const n = name.trim().toLowerCase();
    return CHECKLIST_KEYWORDS.some(k => n.includes(k));
  };
  const isChecked = (item) => {
    // tolerancyjnie wykryj „done”
    return !!(item?.done === true ||
              item?.is_checked === 1 || item?.is_checked === true ||
              String(item?.status||'').toLowerCase() === 'done' ||
              item?.checked_at || item?.done_at);
  };

  // --- core ---
  async function scan(){
    try{
      ensureUI();
      const state = LS.get(STORAGE_KEY, {});
      const queue = LS.get(QUEUE_KEY, []);

      const issues = (await getAllIssues()).filter(isMine);
      if (DEBUG) console.log('[NLTR] mine:', issues.map(x=>x.id));

      for (const it of issues){
        const cld = await jget(API.checklist(it.id));
        const lists = cld?.checklists || [];
        const nl = lists.find(c => matchesChecklistName(c?.name||''));
        if (!nl || !Array.isArray(nl.items)) continue;

        if (DEBUG) console.log('[NLTR] checklist found on', it.id, nl.name, 'items:', nl.items.length);

        for (const ci of nl.items){
          const key = `${it.id}:${ci.id}`;
          const was = !!state[key]?.done;
          const now = isChecked(ci);

          if (DEBUG) console.log('[NLTR] item', key, 'was=',was,'now=',now);

          if (!was && now){
            const entry = {
              issueId: it.id,
              issueTitle: it.issue_title || it.title || '',
              itemId: ci.id,
              itemText: ci.text || ci.title || '',
              doneBy: ci.updated_by || ci.done_by || it.solving_resp_username,
              ts: Date.now(),
              action: 'done'
            };
            if (!queue.find(q=>q.issueId===entry.issueId && q.itemId===entry.itemId)){
              queue.unshift(entry);
              LS.set(QUEUE_KEY, queue);
              renderQueue();
              toast(`✓ Newsletter Translations on #${it.id}`);
            }
          }
          state[key] = {done: now, at: Date.now()};
        }
      }

      // unsnooze
      const q2 = LS.get(QUEUE_KEY, []).map(x => {
        if (x.snoozeUntil && Date.now()>x.snoozeUntil) delete x.snoozeUntil;
        return x;
      });
      LS.set(QUEUE_KEY, q2);
      renderQueue();
      LS.set(STORAGE_KEY, state);
    }catch(e){
      if (DEBUG) console.warn('[NLTR] scan error', e);
    }
  }

  // expose for manual testing
  window.__nltrScan = scan;
  window.__nltrClear = () => { localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(QUEUE_KEY); console.log('NLTR cleared…'); };

  scan();
  setInterval(scan, POLL_MS);
})();
