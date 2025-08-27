// setColor.js — domyślne kolory + niebieski panel do Background z polem HEX (IIFE)
(() => {
  'use strict';
  // console.log('[AutoTZ] setColor.js v2 loaded');

  const BG_KEY = 'AutoTZ:bgColor';
  const qs = (s) => document.querySelector(s);

  const toRGB = (hex) => {
    let h = (hex || '#000000').replace('#', '');
    if (h.length === 3) h = h.split('').map(x => x + x).join('');
    const n = parseInt(h, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  };

  function dispatchAll(el) {
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function setPickerColor(id, hex) {
    const input = qs(`#${id}`);
    const btn   = qs(`#${id}-div`);
    if (!input) return false;
    input.value = hex;
    dispatchAll(input);
    if (btn) {
      const { r, g, b } = toRGB(hex);
      btn.style.setProperty('--tw-color', `rgb(${r}, ${g}, ${b})`);
    }
    // console.log(`[AutoTZ] set ${id} = ${hex}`);
    return true;
  }

  // ---- walidacja/normalizacja HEX ----
  function normalizeHex(s) {
    if (!s) return null;
    let t = s.trim();
    if (t[0] === '#') t = t.slice(1);
    if (!/^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(t)) return null;
    if (t.length === 3) t = t.split('').map(c => c + c).join('');
    return ('#' + t.toUpperCase());
  }

  // ——— niebieski panel (color + HEX) pod zielonym panelem setDate.js ———
  function ensureBlueBgInputs() {
    if (qs('#autotz-bgcolor')) return { color: qs('#autotz-bgcolor'), hex: qs('#autotz-bghex') };

    const style = document.createElement('style');
    style.textContent = `
      #autotz-bg-wrap { margin-top: 8px; }
      #autotz-bg-wrap label { display:block; font-size:12px; color:#1640ff; margin-bottom:4px; font-weight:600; }
      .autotz-bg-row { display:block; grid-template-columns: 1fr 1fr; gap:8px; }
      #autotz-bgcolor {
        width: 100%; height: 40px; padding: 0;
        border: 2px solid #1f6fff; background: #eef4ff;
        border-radius: 8px; box-sizing: border-box; cursor: pointer;
      }
      #autotz-bghex {
        width: 100%; height: 40px; padding: 8px 10px;
        border: 2px solid #1f6fff; background: #ffffff;
        border-radius: 8px; box-sizing: border-box; font-family: monospace;
      }
      #autotz-bghex.invalid { border-color: #d32f2f; background: #ffecec; }
    `;
    document.head.appendChild(style);

    const panel = qs('#autotz-panel') || document.body;
    const wrap = document.createElement('div');
    wrap.id = 'autotz-bg-wrap';
    wrap.innerHTML = `
      <label for="autotz-bgcolor">Background color:</label>
      <div class="autotz-bg-row">
        <input id="autotz-bgcolor" type="color" />
        <input id="autotz-bghex" type="text" placeholder="#RRGGBB" maxlength="7" spellcheck="false" />
      </div>
      <label for="autotz-language-selector">Language:</label>
      <select id="autotz-language-selector">
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
        <option value="kn">Korean</option>
        <option value="lv">Latvian</option>
        <option value="lt">Lithuanian</option>
        <option value="no">Norwegian</option>
        <option value="pl">Polish</option>
        <option value="pt">Portuguese</option>
        <option value="ro">Romanian</option>
        <option value="ru">Russian</option>
        <option value="csl">Simplified Chinese</option>
        <option value="sr">Serbian</option>
        <option value="sk">Slovak</option>
        <option value="es">Spanish</option>
        <option value="sv">Swedish</option>
        <option value="tr">Turkish</option>
      </select>
      <button id="autotz-generate" style="margin: 0 4px;">Generate</button>
    `;
    panel.appendChild(wrap);
    return { color: wrap.querySelector('#autotz-bgcolor'), hex: wrap.querySelector('#autotz-bghex') };
  }

  // util: czekanie na elementy strony
  function waitFor(sel, timeout = 15000) {
    return new Promise((resolve, reject) => {
      const elNow = qs(sel);
      if (elNow) return resolve(elNow);
      const mo = new MutationObserver(() => {
        const el = qs(sel);
        if (el) { mo.disconnect(); resolve(el); }
      });
      mo.observe(document.documentElement, { childList: true, subtree: true });
      setTimeout(() => { mo.disconnect(); reject(new Error('timeout ' + sel)); }, timeout);
    });
  }

  // spójna aktualizacja wszystkiego z jednego HEX
  function applyBg(hex, reason = 'user') {
    const blue = qs('#autotz-bgcolor');
    const hexInput = qs('#autotz-bghex');
    if (blue && blue.value.toLowerCase() !== hex.toLowerCase()) blue.value = hex;
    if (hexInput && hexInput.value.toUpperCase() !== hex.toUpperCase()) {
      hexInput.classList.remove('invalid');
      hexInput.value = hex.toUpperCase();
    }
    sessionStorage.setItem(BG_KEY, hex);
    setPickerColor('bg-color-id', hex);
    // console.log(`[AutoTZ] BG -> ${hex} (${reason})`);
  }

  async function init() {
    try {
      await Promise.all([
        waitFor('#label-color-id'),
        waitFor('#digit-color-id'),
        waitFor('#bg-color-id')
      ]);

      // Domyślne: Labels & Digits = #000000
      setPickerColor('label-color-id', '#000000');
      setPickerColor('digit-color-id',  '#000000');

      const { color: blue, hex: hexInput } = ensureBlueBgInputs();
      const pageBgInput = qs('#bg-color-id');

      // startowa: sesja → strona → #000000
      const start = sessionStorage.getItem(BG_KEY) || (pageBgInput?.value || '#000000');
      blue.value = start;
      hexInput.value = start.toUpperCase();
      applyBg(start, 'init');

      // zmiana w color-pickerze (nasz niebieski)
      blue.addEventListener('input', () => {
        const hex = blue.value || '#000000';
        hexInput.value = hex.toUpperCase();
        applyBg(hex, 'panel-color');
      });

      // wpisywanie HEX (live) – walidacja i sync
      const onHexInput = () => {
        const normalized = normalizeHex(hexInput.value);
        if (normalized) {
          hexInput.classList.remove('invalid');
          if (blue.value.toLowerCase() !== normalized.toLowerCase())
            blue.value = normalized;
          applyBg(normalized, 'panel-hex');
        } else {
          // pozwól pisać, ale zaznacz niepoprawne
          hexInput.classList.add('invalid');
        }
      };
      hexInput.addEventListener('input', onHexInput);
      hexInput.addEventListener('change', onHexInput);
      hexInput.addEventListener('blur', () => {
        // na blur — jeśli wciąż niepoprawne, przywróć ostatnią zapisaną
        if (hexInput.classList.contains('invalid')) {
          const saved = sessionStorage.getItem(BG_KEY) || '#000000';
          hexInput.classList.remove('invalid');
          hexInput.value = saved.toUpperCase();
          if (blue.value.toLowerCase() !== saved.toLowerCase()) blue.value = saved;
          applyBg(saved, 'hex-blur-restore');
        }
      });

      document.querySelector("#autotz-language-selector").addEventListener('change', (e) => {
        document.querySelector("select#language").value = e.target.value
      })

      document.querySelector("button#autotz-generate").addEventListener("click", () => {
        const generateButton = document.querySelector("button#sendtric-button");
        if (generateButton.getAttribute("disabled")) generateButton.removeAttribute("disabled");
        generateButton.click();
      })

      // jeśli user zmieni kolor „po stronie” → zmirroruj panel
      pageBgInput?.addEventListener('change', () => {
        const val = pageBgInput.value;
        const norm = normalizeHex(val);
        if (norm) applyBg(norm, 'page');
      }, true);

      // watchdog — trzymaj zgodność (panel ↔ strona)
      setInterval(() => {
        const want = (sessionStorage.getItem(BG_KEY) || blue.value || '#000000').toLowerCase();
        const have = (pageBgInput?.value || '#000000').toLowerCase();
        if (want !== have) {
          // console.log('[AutoTZ] color watchdog → sync bg');
          applyBg(want, 'watchdog');
        }
        document.querySelector("header")?.remove()
        document.querySelector(".laptop-and-phone-placeholder-div").style.display = "none"
      }, 1200);

    } catch (e) {
      // console.warn('[AutoTZ] setColor init error:', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
