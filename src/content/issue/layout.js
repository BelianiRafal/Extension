// layout.js — non-module, attach to window
(function() {
  const DEFAULT_KEY = `__grid_layout__${location.pathname}`;

  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  function debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }
  function isOverlap(a, b) {
    return !(a.x + a.w <= b.x ||
             b.x + b.w <= a.x ||
             a.y + a.h <= b.y ||
             b.y + b.h <= a.y);
  }
  function resolveCollisions(items, moved) {
    let queue = [moved];
    while (queue.length) {
      const cur = queue.shift();
      for (const other of items) {
        if (other === cur) continue;
        if (isOverlap(cur, other)) {
          const oldY = other.y;
          other.y = cur.y + cur.h;
          if (other.y !== oldY) queue.push(other);
        }
      }
    }
  }
  function saveLayout(items, key = DEFAULT_KEY) {
    const data = items.map(i => ({
      id: i.el.dataset.gsId,
      x: i.x,
      y: i.y,
      w: i.w,
      h: i.h
    }));
    localStorage.setItem(key, JSON.stringify(data));
  }
  function loadLayout(items, key = DEFAULT_KEY) {
    try {
      const stored = JSON.parse(localStorage.getItem(key));
      if (!Array.isArray(stored)) return;
      const map = new Map(stored.map(o => [o.id, o]));
      for (const it of items) {
        const saved = map.get(it.el.dataset.gsId);
        if (saved) {
          it.x = saved.x;
          it.y = saved.y;
          it.w = saved.w;
          it.h = saved.h;
        }
      }
    } catch (e) {
      console.warn("Nie udało się wczytać layoutu:", e);
    }
  }

  function initGrid(containerSelector, opts = {}) {
    const container = typeof containerSelector === 'string'
      ? document.querySelector(containerSelector)
      : containerSelector;
    if (!container) throw new Error("Nie znaleziono kontenera gridu");

    container.classList.add('gs-grid');
    const items = Array.from(container.querySelectorAll('.gs-item')).map((el, idx) => {
      if (!el.dataset.gsId) el.dataset.gsId = `gsitem_${idx}_${Math.random().toString(36).slice(2)}`;
      const w = parseInt(el.dataset.w, 10) || 1;
      const h = parseInt(el.dataset.h, 10) || 1;
      const x = parseInt(el.dataset.x, 10);
      const y = parseInt(el.dataset.y, 10);
      return {
        el,
        x: isNaN(x) ? 0 : x,
        y: isNaN(y) ? 0 : y,
        w,
        h,
        dragging: false,
        resizing: false
      };
    });

    loadLayout(items, opts.storageKey || DEFAULT_KEY);

    function applyPosition(it) {
      it.el.style.order = it.y * 100 + it.x;
      it.el.style.flexBasis = `calc(${(it.w / (opts.columns || 4)) * 100}% - var(--gs-gap,8px))`;
      it.el.style.minHeight = `${it.h * 80}px`;
      it.el.dataset.x = it.x;
      it.el.dataset.y = it.y;
      it.el.dataset.w = it.w;
      it.el.dataset.h = it.h;
    }

    (function normalizeStart() {
      const occupied = [];
      for (const it of items) {
        if (isNaN(it.x) || isNaN(it.y)) {
          let tryY = 0;
          let tryX = 0;
          while (true) {
            const candidate = { x: tryX, y: tryY, w: it.w, h: it.h };
            if (!occupied.some(o => isOverlap(o, candidate))) {
              it.x = candidate.x;
              it.y = candidate.y;
              occupied.push({ ...candidate });
              break;
            }
            tryX += 1;
            if (tryX >= (opts.columns || 4)) {
              tryX = 0;
              tryY += 1;
            }
          }
        } else {
          occupied.push({ x: it.x, y: it.y, w: it.w, h: it.h });
        }
      }
    })();

    function renderAll() {
      for (const item of items) applyPosition(item);
    }
    renderAll();

    const scheduleSave = debounce(() => saveLayout(items, opts.storageKey || DEFAULT_KEY), 150);

    let active = null;
    let start = null;
    let original = null;

    function pointerDown(e, item) {
      e.preventDefault();
      item.dragging = true;
      active = item;
      start = { x: e.clientX, y: e.clientY };
      original = { x: item.x, y: item.y };
      item.el.classList.add('dragging');
      document.body.style.cursor = 'grabbing';
    }

    function pointerMove(e) {
      if (!active) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      const gridStepX = Math.round(dx / 120);
      const gridStepY = Math.round(dy / 100);
      active.x = clamp(original.x + gridStepX, 0, 100);
      active.y = clamp(original.y + gridStepY, 0, 100);
      resolveCollisions(items, active);
      renderAll();
    }

    function pointerUp() {
      if (active) {
        active.el.classList.remove('dragging');
        active.dragging = false;
        scheduleSave();
      }
      active = null;
      start = null;
      original = null;
      document.body.style.cursor = '';
    }

    function initResizer(item) {
      const handle = document.createElement('div');
      handle.className = 'gs-resize-handle';
      handle.style.position = 'absolute';
      handle.style.width = '14px';
      handle.style.height = '14px';
      handle.style.right = '4px';
      handle.style.bottom = '4px';
      handle.style.cursor = 'se-resize';
      handle.style.userSelect = 'none';
      handle.style.zIndex = '5';
      item.el.appendChild(handle);

      let resizing = false;
      let startWh = null;
      let startPos = null;

      handle.addEventListener('pointerdown', e => {
        e.stopPropagation();
        e.preventDefault();
        resizing = true;
        item.resizing = true;
        startWh = { w: item.w, h: item.h };
        startPos = { x: e.clientX, y: e.clientY };
        item.el.classList.add('resizing');
        document.body.style.cursor = 'se-resize';
        window.addEventListener('pointermove', resizingMove);
        window.addEventListener('pointerup', resizingEnd);
      });

      function resizingMove(e) {
        if (!resizing) return;
        const dx = e.clientX - startPos.x;
        const dy = e.clientY - startPos.y;
        const deltaW = Math.round(dx / 120);
        const deltaH = Math.round(dy / 100);
        item.w = clamp(startWh.w + deltaW, 1, opts.maxCols || 6);
        item.h = clamp(startWh.h + deltaH, 1, 10);
        resolveCollisions(items, item);
        renderAll();
      }

      function resizingEnd() {
        if (!resizing) return;
        resizing = false;
        item.resizing = false;
        item.el.classList.remove('resizing');
        document.body.style.cursor = '';
        window.removeEventListener('pointermove', resizingMove);
        window.removeEventListener('pointerup', resizingEnd);
        scheduleSave();
      }
    }

    for (const it of items) {
      it.el.style.position = 'relative';
      it.el.style.flex = `0 0 auto`;
      it.el.style.boxSizing = 'border-box';
      it.el.addEventListener('pointerdown', e => pointerDown(e, it));
      document.addEventListener('pointermove', pointerMove);
      document.addEventListener('pointerup', pointerUp);
      initResizer(it);
      applyPosition(it);
    }
    window.addEventListener('pointerup', pointerUp);

    function resetLayout() {
      localStorage.removeItem(opts.storageKey || DEFAULT_KEY);
      items.forEach(i => {
        i.x = 0;
        i.y = 0;
        i.w = parseInt(i.el.dataset.w, 10) || 1;
        i.h = parseInt(i.el.dataset.h, 10) || 1;
      });
      // prosty reflow
      const occupied = [];
      for (const it of items) {
        let targetX = it.x;
        let targetY = it.y;
        while (true) {
          const candidate = { x: targetX, y: targetY, w: it.w, h: it.h };
          if (!occupied.some(o => isOverlap(o, candidate))) {
            it.x = candidate.x;
            it.y = candidate.y;
            occupied.push({ ...candidate });
            break;
          }
          targetY += 1;
        }
      }
      renderAll();
      scheduleSave();
    }

    const api = {
      save: () => saveLayout(items, opts.storageKey || DEFAULT_KEY),
      reset: () => resetLayout(),
      getLayout: () => items.map(i => ({ id: i.el.dataset.gsId, x: i.x, y: i.y, w: i.w, h: i.h })),
      addItem: el => {
        el.classList.add('gs-item');
        const newItem = {
          el,
          x: 0,
          y: 0,
          w: parseInt(el.dataset.w, 10) || 1,
          h: parseInt(el.dataset.h, 10) || 1,
          dragging: false,
          resizing: false
        };
        if (!el.dataset.gsId) el.dataset.gsId = `gsitem_${Math.random().toString(36).slice(2)}`;
        items.push(newItem);
        initResizer(newItem);
        applyPosition(newItem);
        scheduleSave();
      }
    };

    if (opts.injectResetButton) {
      const btn = document.createElement('button');
      btn.className = 'gs-reset';
      btn.textContent = 'Reset layout';
      btn.style.position = 'fixed';
      btn.style.bottom = '12px';
      btn.style.right = '12px';
      btn.style.zIndex = '999';
      btn.addEventListener('click', () => api.reset());
      document.body.appendChild(btn);
    }

    container.__gridApi = api;
    return api;
  }

  window.GridLayout = { initGrid };
})();
