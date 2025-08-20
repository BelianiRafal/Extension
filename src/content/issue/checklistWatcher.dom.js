// content/checklistWatcher.dom.js
(() => {
  const DEBUG = false;
  const STORAGE_KEY = 'nltr_dom_watcher_state_v1';
  const QUEUE_KEY   = 'nltr_dom_watcher_queue_v1';
  const CHECKLIST_NAME = 'newsletter translations'; // porównujemy lowercased
  const BOARD_ISSUE_URL = (id) => `https://www.prologistics.info/react/logs/issue_logs/${id}`;

  // === kto ja jestem ===
  const ME = (document.body && document.body.dataset && document.body.dataset.user) || '';

  // aliasy login -> pełne imię/nazwisko (dopisz swoich)
  const USER_MAP = {
    RKobus: ['Rafał Kobus','Rafal Kobus','RKobus'],
    MJurgowiak: ['Michał Jurgowiak','Michal Jurgowiak','MJurgowiak'],
  };
  const isMeByFullname = (full) => {
    const list = USER_MAP[ME] || [ME];
    return list.some(x => (x||'').toLowerCase() === (full||'').toLowerCase());
  };

  const LS = {
    get: (k, d) => JSON.parse(localStorage.getItem(k) || JSON.stringify(d)),
    set: (k, v) => localStorage.setItem(k, JSON.stringify(v))
  };

  // === mini UI (kolejka + toast) ===
  function ensureUI() {
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
    const t = document.createElement('div'); t.className = 'nltr-toast'; t.textContent = msg; document.body.appendChild(t);
    requestAnimationFrame(()=>t.classList.add('show'));
    setTimeout(()=>{t.classList.remove('show'); setTimeout(()=>t.remove(), 250);}, 3000);
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
        <div class="nltr-title">Newsletter Translations completed <span class="nltr-badge">#${it.issueId || '?'}</span></div>
        <div class="nltr-meta">
          <div><strong>Issue:</strong> ${esc(it.issueTitle || '')}</div>
          <div><strong>Checklist item:</strong> ${esc(it.itemText || '')}</div>
          <div><strong>By:</strong> ${esc(it.doneBy || 'unknown')} • <strong>When:</strong> ${new Date(it.ts).toLocaleString()}</div>
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
          if (a==='open' && it.issueId) window.open(BOARD_ISSUE_URL(it.issueId), '_blank');
          if (a==='snooze') { q2[i].snoozeUntil = Date.now()+15*60*1000; LS.set(QUEUE_KEY,q2); toast('Snoozed 15m…'); }
          if (a==='dismiss') { q2.splice(i,1); LS.set(QUEUE_KEY,q2); }
          renderQueue();
        };
      });
      wrap.appendChild(card);
    });
  }

  // === pomocnicze: znajdowanie checklisty i pól ===
  const getSolvingUserFullname = () => {
    // 1) MUI Autocomplete input (jak pokazywałeś)
    const inp = document.querySelector('input.MuiAutocomplete-input');
    if (inp && inp.value) return inp.value.trim();
    // 2) fallback: szukaj tekstu "Solving user:" i pobierz tekst po nim (z Twojego screena działa to w kafelku)
    const t = Array.from(document.querySelectorAll('div, span, p')).find(n => /Solving user:/i.test(n.textContent||''));
    if (t && t.nextSibling && t.nextSibling.nodeType === 3) return (t.nextSibling.nodeValue||'').trim();
    return '';
  };

  const getIssueIdGuess = (root) => {
    // spróbuj czy w okolicy jest link do react/logs/issue_logs/ID
    const a = root && root.closest('div')?.querySelector('a[href*="react/logs/issue_logs/"]');
    const m = a && a.getAttribute('href').match(/issue_logs\/(\d+)/);
    if (m) return Number(m[1]);
    // fallback: szukamy globalnie
    const g = document.querySelector('a[href*="react/logs/issue_logs/"]');
    const m2 = g && g.getAttribute('href').match(/issue_logs\/(\d+)/);
    return m2 ? Number(m2[1]) : undefined;
  };

  // parsowanie tableid z `.../change_log.php?table_name=issue_checkpoint&tableid=843461`
  const getItemTableId = (li) => {
    const a = li.querySelector('a[href*="table_name=issue_checkpoint"]');
    if (!a) return undefined;
    const u = new URL(a.href, location.origin);
    return u.searchParams.get('tableid') || undefined;
  };

  // czy to „Newsletter Translations”
  const isNewsletterChecklistPanel = (panel) => {
    const headerText = (panel.querySelector('.panel-title') || panel).textContent.toLowerCase();
    return headerText.includes('newsletter') && headerText.includes('translation');
  };

  // === główna logika obserwacji DOM ===
  function bindPanel(panel) {
    if (!isNewsletterChecklistPanel(panel)) return;

    const solvingFull = getSolvingUserFullname();
    const isMine = isMeByFullname(solvingFull) || solvingFull === ME;
    if (!isMine) {
      if (DEBUG) console.log('[NLTR][DOM] checklist found but solving user ≠ me:', solvingFull, 'vs', ME);
      return;
    }

    const ul = panel.querySelector('ul');
    if (!ul) return;

    // nasłuchuj zmian 'change' na checkboxach
    ul.querySelectorAll('li').forEach(li => {
      const cb = li.querySelector('input[type="checkbox"]');
      if (!cb || cb._nltrBound) return;
      cb._nltrBound = true;

      cb.addEventListener('change', () => {
        const nowChecked = cb.checked;
        const itemId = getItemTableId(li) || ('dom-' + Math.random().toString(36).slice(2));
        const issueId = getIssueIdGuess(panel);
        const itemText = (li.querySelector('.jss135, label, div')?.textContent || '').trim();

        const key = `${issueId || 'unknown'}:${itemId}`;
        const state = LS.get(STORAGE_KEY, {});
        const was = !!state[key]?.done;

        if (!was && nowChecked) {
          const q = LS.get(QUEUE_KEY, []);
          if (!q.find(x => x.itemId === itemId && x.issueId === issueId)) {
            q.unshift({
              issueId,
              issueTitle: document.title.replace(/\s+\|\s+.*/,''),
              itemId,
              itemText,
              doneBy: solvingFull || ME,
              ts: Date.now(),
              action: 'done'
            });
            LS.set(QUEUE_KEY, q);
            renderQueue();
            toast(`✓ Newsletter Translations on #${issueId || '?'}: ${itemText}`);
          }
        }
        state[key] = { done: nowChecked, at: Date.now() };
        LS.set(STORAGE_KEY, state);
        if (DEBUG) console.log('[NLTR][DOM] change', {key, nowChecked, itemText});
      });
    });
  }

  // pierwszy bind na już-renderowanych panelach
  function bindExisting() {
    document.querySelectorAll('.panel.panel-default').forEach(bindPanel);
  }

  // observer: kiedy checklisty pojawiają się/zmieniają
  const mo = new MutationObserver((muts) => {
    muts.forEach(m => {
      m.addedNodes && m.addedNodes.forEach(n => {
        if (!(n instanceof HTMLElement)) return;
        // dodano cały panel lub nowe li
        if (n.matches?.('.panel.panel-default')) bindPanel(n);
        n.querySelectorAll?.('.panel.panel-default').forEach(bindPanel);
        if (n.matches?.('li.jss125') || n.querySelector?.('li.jss125')) {
          const panel = n.closest?.('.panel.panel-default');
          if (panel) bindPanel(panel);
        }
      });
    });
  });

  // start
  ensureUI();
  bindExisting();
  mo.observe(document.body, { childList: true, subtree: true });

  // pomoc w testach
  window.__nltrDomClear = () => { localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(QUEUE_KEY); console.log('NLTR DOM state cleared'); };
})();
