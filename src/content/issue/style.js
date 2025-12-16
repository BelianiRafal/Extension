/* =========================================================
   SMART STICKY BAR + NAWIGACJA + COMMENTS + CHECKLIST + BUTTONS
   ========================================================= */

/* ===== utilsy ===== */
const $  = (s, r=document)=> r.querySelector(s);
const $$ = (s, r=document)=> Array.from(r.querySelectorAll(s));
const txt = (el)=> (el ? (el.value || el.textContent || '').trim() : '');
const clamp = (v,min,max)=> Math.max(min, Math.min(max, v));

/* gładkie przewijanie z easingiem i kompensacją sticky bara */
function easeInOutCubic(t){ return t<.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2; }
function smoothScrollTo(target, opts={}) {
  const header = document.getElementById('issue-sticky');
  const offset = (opts.offset ?? ((header?.offsetHeight||56)+12));
  const y = (typeof target === 'number' ? target : target.getBoundingClientRect().top + window.pageYOffset) - offset;

  const start = window.pageYOffset;
  const dist  = y - start;
  const dur   = clamp(Math.abs(dist)/2, 300, 900); // zależne od dystansu
  const t0 = performance.now();

  document.body.classList.add('rk-scrolling');
  function step(t){
    const p = clamp((t - t0)/dur, 0, 1);
    const e = easeInOutCubic(p);
    window.scrollTo(0, start + dist*e);
    if(p < 1) requestAnimationFrame(step);
    else setTimeout(()=>document.body.classList.remove('rk-scrolling'), 120);
  }
  requestAnimationFrame(step);
}

/* znajdź panel/sekcję po nagłówku */
function findPanel(title){
  const xpath = `//div[contains(@class,'panel-heading') or contains(@class,'section')][contains(translate(normalize-space(.),'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ'),'${title.toUpperCase()}')]`;
  const res = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  console.log('findPanel', res)
  return res ? (res.closest('.panel') || res.parentElement) : null;
}

/* liczniki – Comments */
function countComments(panel){
  if(!panel) return 0;
  const rows = panel.querySelectorAll('tbody tr, .row, .comment, li');
  return rows.length || 0;
}

/* progres checklisty – z width% lub z checkboxów */
function checklistProgress(panel){
  if(!panel) return {pct:0, done:0, all:0};
  const bar = panel.querySelector('[style*="width"]');
  const m = bar?.getAttribute('style')?.match(/width:\s*([\d.]+)%/i);
  if(m) return {pct: Math.round(+m[1]), done:0, all:0};

  const checks = panel.querySelectorAll('input[type="checkbox"]');
  const all = checks.length, done = [...checks].filter(c=>c.checked).length;
  const pct = all ? Math.round(done/all*100) : 0;
  return {pct, done, all};
}

/* ile linków w Additional fields */
function countLinks(panel){
  if(!panel) return 0;
  return panel.querySelectorAll('a[href]').length;
}

/* =========================
   1) BUDOWA STICKY BARA v2
   ========================= */
function buildStickyV2(){
  // Subject
  let subject = '';
  const subjectPanel = findPanel('Subject');
  if(subjectPanel){
    const field = subjectPanel.querySelector('textarea, input[type="text"], .panel-body, p, div');
    subject = txt(field);
  }
  if(!subject) subject = txt($('h3.text-center')); // fallback

  // Details / meta
  const detailsPanel = findPanel('Issue details') || findPanel('Details');
  const boardPanel   = findPanel('Selected board');
  const columnPanel  = findPanel('Selected column');
  const tagsPanel    = findPanel('Selected issue tag');

  const status   = txt($('#react-select-2--value-item', detailsPanel)) || 'Open';
  const prRaw    = txt($('#react-select-3--value-item', detailsPanel));
  const priority = /high/i.test(prRaw)?'High':/low/i.test(prRaw)?'Low':/medium/i.test(prRaw)?'Medium':(prRaw||'—');
  const due      = txt($('.due-field-module__root__lojS0 input.form-control.text', detailsPanel));
  const owner    = txt($('select[name="user"], .solving-user, [name="solving_user"]', detailsPanel)) || txt($('#react-select-1--value-item', detailsPanel));
  const board    = txt($('select, .panel-body', boardPanel));
  const column   = txt($('select, .panel-body', columnPanel));
  const tags     = $$('.panel-body .tag, .MuiChip-root, .panel-body .label', tagsPanel).map(el=>txt(el)).filter(Boolean).slice(0,3);

  // Comments / Checklist / Additional fields
  const commentsPanel  = findPanel('Comments');
  const checklistPanel = findPanel('Checklist') || findPanel('Translations');
  const addFieldsPanel = findPanel('Additional fields');

  const commentsCount  = countComments(commentsPanel);
  const checklist      = checklistProgress(checklistPanel);
  const linksCount     = countLinks(addFieldsPanel);

  // utwórz pasek jeśli nie istnieje
  let bar = document.getElementById('issue-sticky');
  if(!bar){
    bar = document.createElement('div');
    bar.id = 'issue-sticky';
    document.body.insertBefore(bar, document.body.firstChild);
  }

  bar.innerHTML = `
    <div class="row1">
      <div class="subject" title="${subject}">${subject || '—'}</div>
    </div>
    <div class="tags">
      <div class="tag status-${status.toLowerCase()}"><span class="dot"></span><span>${status}</span></div>
      <div class="tag priority-${priority.toLowerCase()}"><span class="dot"></span><span>Priority: ${priority}</span></div>
      <div class="tag"><span class="dot"></span><span>Due: ${due || '—'}</span></div>
      <div class="tag" data-hide-on-narrow="1"><span class="dot"></span><span>Owner: ${owner || '—'}</span></div>
      <div class="tag" data-hide-on-narrow="1"><span class="dot"></span><span>${board || 'Board —'}</span></div>
      <div class="tag" data-hide-on-narrow="1"><span class="dot"></span><span>${column || 'Column —'}</span></div>
      ${tags.length ? `<div class="tag" data-hide-on-narrow="1"><span class="dot"></span><span>${tags.join(' • ')}</span></div>`:''}
      <div class="stat-badge" title="Comments"><strong>💬</strong> ${commentsCount}</div>
      <div class="stat-badge" title="Checklist progress"><strong>✅</strong> ${checklist.pct}%</div>
      <div class="stat-badge" title="Useful links in Additional fields"><strong>🔗</strong> ${linksCount}</div>
    </div>
    <div class="nav">
      <button class="rk-navbtn" data-goto="Subject">Subject</button>
      <button class="rk-navbtn" data-goto="Issue details">Details</button>
      <button class="rk-navbtn" data-goto="Additional fields">Additional fields</button>
      <button class="rk-navbtn" data-goto="Comments">Comments <span class="count">${commentsCount}</span></button>
      <button class="rk-navbtn" data-goto="Checklist">Checklist <span class="count">${checklist.pct}%</span></button>
      <button class="rk-navbtn" data-goto="Timer">Timer</button>
      <button class="rk-navbtn" id="rk-back-top">Top ↑</button>
    </div>
  `;

  // kotwice
  ['Subject','Issue details','Additional fields','Comments','Checklist','Translations','Timer','Selected issue tag','Selected board','Selected column']
    .forEach(name=>{
      const p = findPanel(name);
      if(p) p.classList.add('rk-anchor');
    });

  // obsługa przycisków nawigacji
  bar.querySelectorAll('.rk-navbtn[data-goto]').forEach(btn=>{
    btn.onclick = () => {
      const panel = findPanel(btn.dataset.goto) || findPanel(btn.dataset.goto.replace('Checklist','Translations'));
      if(panel) smoothScrollTo(panel);
    };
  });
  $('#rk-back-top')?.addEventListener('click', ()=> smoothScrollTo(0));
}

/* =========================
   2) COMMENTS – toolbar + fullscreen
   ========================= */
function enhanceComments(){
  const commentsPanel = findPanel('Comments');
  if (!commentsPanel) return;

  commentsPanel.classList.add('comments-section');
  const header = commentsPanel.querySelector('.panel-heading') || commentsPanel.firstElementChild;
  if (!header) return;

  // toolbar
  const toolbar = document.createElement('div');
  toolbar.className = 'comments-toolbar';
  toolbar.innerHTML = `
    <div style="display:flex;gap:8px;align-items:center;">
      <strong>Comments</strong>
      <span style="color:#64748b;font-size:12px;">improved view</span>
    </div>
    <div style="display:flex;gap:8px;">
      <button id="comments-fullscreen-btn" class="btn-outline">Full screen</button>
      <button class="btn-success" id="comments-scroll-latest">Scroll to latest</button>
    </div>
  `;
  header.replaceWith(toolbar);

  $('#comments-fullscreen-btn').addEventListener('click', () => {
    const on = document.body.classList.toggle('comments-fullscreen');
    $('#comments-fullscreen-btn').textContent = on ? 'Exit full screen' : 'Full screen';
  });

  $('#comments-scroll-latest').addEventListener('click', () => {
    const rows = commentsPanel.querySelectorAll('tr, .row, li, .comment');
    if (rows.length) smoothScrollTo(rows[rows.length - 1], {offset: 70});
  });

  const table = commentsPanel.querySelector('table');
  if (table) table.classList.add('comments-table');
  commentsPanel.classList.add('comments-wrap');
}

/* =========================
   3) CHECKLIST
   ========================= */
function polishChecklist(){
  const checklistPanel = findPanel('Checklist') || findPanel('Translations');
  if (!checklistPanel) return;
  checklistPanel.classList.add('checklist');
  const rows = checklistPanel.querySelectorAll('li, .row, tr');
  rows.forEach(r => r.classList.add('item'));
}

/* =========================
   4) BUTTONS
   ========================= */
function restyleButtons(){
  document.querySelectorAll('.def_btn, .action_buttons').forEach(b=>{
    b.classList.add('btn-neutral');
  });
}

/* =========================
   INIT – z auto-odświeżaniem
   ========================= */
function initEnhancementsOnce() {
  if (!document.getElementById('issue-sticky')) {
    buildStickyV2();
    enhanceComments();
    polishChecklist();
    restyleButtons();
  }
}

const waitForPanels = new MutationObserver(() => {
  if (findPanel('Issue details') || findPanel('Subject')) {
    initEnhancementsOnce();
  }
});
waitForPanels.observe(document.body, {childList: true, subtree: true});

setInterval(() => {
  if (!document.getElementById('issue-sticky')) {
    initEnhancementsOnce();
  }
}, 3000);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEnhancementsOnce);
} else {
  initEnhancementsOnce();
}
