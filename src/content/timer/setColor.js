// setColor.js — domyślne kolory + niebieski panel do Background z polem HEX (IIFE)
(() => {
  'use strict';
  // console.log('[AutoTZ] setColor.js v2 loaded');
  let langToSelectValue = {
    CHDE:  "de",
    CHFR:  "fr",
    FR:    "fr",
    DE:    "de",
    UK:    "en",
    AT:    "de",
    ES:    "es",
    PL:    "pl",
    NL:    "nl",
    PT:    "pt",
    IT:    "it",
    SE:    "sv",
    HU:    "hu",
    DK:    "da",
    CZ:    "cs",
    FI:    "fi",
    NO:    "no",
    SK:    "sk",
    BENL:  "nl",
    BEFR:  "fr",
    RO:    "ro",
  };

  let generatedTimers = {
    CHDE:  null,
    CHFR:  null,
    FR:    null,
    DE:    null,
    UK:    null,
    AT:    null,
    ES:    null,
    PL:    null,
    NL:    null,
    PT:    null,
    IT:    null,
    SE:    null,
    HU:    null,
    DK:    null,
    CZ:    null,
    FI:    null,
    NO:    null,
    SK:    null,
    BENL:  null,
    BEFR:  null,
    RO:    null,
  }

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
      #autotz-bg-wrap button { font-size: 12px; border: none; box-shadow: none; display: inline-block; background: #6565ff; color: white; padding: 6px 12px; border-radius: 6px; }
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
      <div class="autotz-bg-row">
        <button id="autotz-gen-all">Generate All</button>
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

      const autoTzLangSelector = document.querySelector("#autotz-language-selector");
      const autoTzGenerateButton = document.querySelector("button#autotz-generate")
      const autoTzGenerateALLButton = document.querySelector("button#autotz-gen-all")

      autoTzLangSelector.addEventListener('change', (e) => {
        document.querySelector("select#language").value = e.target.value
      })

      autoTzGenerateButton.addEventListener("click", () => {
        const generateButton = document.querySelector("button#sendtric-button");
        if (generateButton.getAttribute("disabled")) generateButton.removeAttribute("disabled");
        generateButton.click();
      })

      function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

      autoTzGenerateALLButton.addEventListener("click", tryToGenerateAllAtOnce);

      let lastSaved, isRunning;

      const timeZone = document.querySelector("#timezone")
      const slugToTimeZone = { 
        bg: "Europe/Sofia",
        cs: "Europe/Prague",
        da: "Europe/Copenhagen",
        nl: "Europe/Amsterdam",
        en: "Europe/London",
        et: "Europe/Tallinn",
        fi: "Europe/Helsinki",
        fr: "Europe/Paris",
        de: "Europe/Berlin",
        el: "Europe/Athens",
        he: "Asia/Jerusalem",
        hu: "Europe/Budapest",
        is: "Atlantic/Reykjavik",
        it: "Europe/Rome",
        ja: "Asia/Tokyo",
        ko: "Asia/Seoul",
        lv: "Europe/Riga",
        lt: "Europe/Vilnius",
        no: "Europe/Oslo",
        pl: "Europe/Warsaw",
        pt: "Europe/Lisbon",
        ro: "Europe/Bucharest",
        ru: "Europe/Moscow",
        "csl": "Asia/Shanghai",
        sr: "Europe/Belgrade",
        sk: "Europe/Bratislava",
        es: "Europe/Madrid",
        sv: "Europe/Stockholm",
        tr: "Europe/Istanbul",
      }

      const DOMAINS = ["outlook.com", "hotmail.com", "gmail.com", "wp.pl", "protonmail.com"];

      const randomAlphaNum = (CHARS, len) => {
        const arr = new Uint8Array(len);
        
        crypto.getRandomValues(arr);

        return Array.from(arr, n => CHARS[n % CHARS.length]).join('');
      };

      const randomGuestEmail = () => {
        const local = randomAlphaNum('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 512);
        const domain = DOMAINS[Math.floor(Math.random() * DOMAINS.length)];

        return `${local}@${domain}`;
      };

      function tryToGenerateAllAtOnce() {
        if (isRunning) return;

        const keys = Object.keys(langToSelectValue);
        const entries = Object.entries(langToSelectValue);

        (async () => {
          if (isRunning) return;
          isRunning = true;
          try {
            for (const slug of keys) {
              const language = langToSelectValue[slug];
              console.log(`--- STARTED GENERATING TIMER FOR: ${slug} [${language}]`);

              let saved = false;
              const maxAttempts = 15;
              for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                console.log(`  → Attempt ${attempt}. for ${slug}:`);
                
                let email = randomGuestEmail();
                let fullName = randomAlphaNum('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 50);

                document.querySelector("input#guest-email").value = email;
                document.querySelector("input#full-name").value = fullName;
              
                console.debug('    → using email: ', email);
                console.debug('    → using fullName: ', fullName);

                if (autoTzLangSelector) {
                  autoTzLangSelector.value = language;
                  autoTzLangSelector.dispatchEvent(new Event('change', { bubbles: true }));
                }

                await sleep(2500);
                
                if (timeZone.value !== slugToTimeZone[langToSelectValue[slug]]) {
                  // console.log(slug, slugToTimeZone)
                  console.log(`Sendtric TZ: ${timeZone.value}, Needed TZ: ${slugToTimeZone[langToSelectValue[slug]]}`)
                  saved = false;
                  console.warn("   × Wrong timezone is set! --- waiting 3s");
                  await sleep(3000);
                  continue;
                }
                
                autoTzGenerateButton.click();

                await sleep(700);

                const img = document.querySelector("img[alt='Email Live Countdown Timer']");
                if (!img) {
                  saved = false;
                  console.warn("   × Error reading image source --- waiting 5s");
                  await sleep(5000)
                  continue;
                }
                
                let newSrc = img.src;

                if (String(newSrc).includes("placeholder") || String(newSrc) === "https://www.sendtric.com/") {
                  saved = false;
                  console.warn("   × Placeholder src found --- waiting 5s");
                  await sleep(5000);
                  continue;
                }

                if (lastSaved === newSrc) {
                  saved = false;
                  console.warn("   × Duplicate src found --- waiting 3s (might be captcha)");
                  await sleep(3000)
                  continue;
                }

                generatedTimers[slug] = newSrc;
                lastSaved = newSrc;
                console.log(`   ⩗ Saved new unique src for ${slug}: ${newSrc}`);
                saved = true;
                break;
              }

              if (!saved) console.warn(`   × Could not generate valid unique src for ${slug}`);

              await sleep(1000);
            }

            console.log('-'.repeat(80));
            console.log("💨 Wygenerowane timery:")
            console.log(generatedTimers);

            const container = document.querySelector('.result-div-for-code') || document.body;
            const existing = document.getElementById('results_table');
            if (existing) existing.remove();

            const table = document.createElement('table');
            table.id = 'results_table';
            table.className = 'stripe';

            const thead = document.createElement('thead');
            thead.innerHTML = '<tr><th>SLUG</th><th>Timer SRC</th></tr>';
            table.appendChild(thead);

            const prevId = 'autotz-timer-preview';
            let preview = document.getElementById(prevId);
            if (preview) preview.remove();

            const styleTag = document.getElementById('autotz-timer-preview-style') || document.createElement('style');
            styleTag.id = 'autotz-timer-preview-style';
            styleTag.textContent = `
              #${prevId} { position: absolute; z-index: 99999; display: none; pointer-events: none; background: #fff; border: 1px solid rgba(0,0,0,0.12); padding: 6px; box-shadow: 0 6px 18px rgba(0,0,0,0.12); border-radius: 6px; }
              #${prevId} img { max-width: 320px; max-height: 240px; display:block; }
            `;
            document.head.appendChild(styleTag);

            preview = document.createElement('div');
            preview.id = prevId;
            document.body.appendChild(preview);

            const tbody = document.createElement('tbody');
            for (const slug of Object.keys(generatedTimers)) {
              const src = generatedTimers[slug];

              const tr = document.createElement('tr');
              const tdSlug = document.createElement('td'); tdSlug.textContent = slug;
              const tdSrc = document.createElement('td');

              if (src) {
                const a = document.createElement('a');
                a.href = src; a.target = '_blank'; a.rel = 'noopener noreferrer';
                a.textContent = src;
                a.style.wordBreak = 'break-all';

                a.addEventListener('mouseenter', (ev) => {
                  preview.innerHTML = '';
                  const img = document.createElement('img');
                  img.src = src; img.alt = slug;
                  preview.appendChild(img);
                  preview.style.display = 'block';
                  const rect = a.getBoundingClientRect();
                  const top = window.scrollY + rect.bottom + 8;
                  const left = window.scrollX + rect.left;
                  preview.style.top = top + 'px';
                  preview.style.left = left + 'px';
                });
                
                a.addEventListener('mousemove', (ev) => {
                  const left = window.scrollX + ev.clientX + 12;
                  const top = window.scrollY + ev.clientY + 12;
                  preview.style.top = top + 'px';
                  preview.style.left = left + 'px';
                });

                a.addEventListener('mouseleave', () => {
                  preview.style.display = 'none';
                });

                tdSrc.appendChild(a);
              } else {
                tdSrc.textContent = '';
              }

              tr.appendChild(tdSlug);
              tr.appendChild(tdSrc);
              tbody.appendChild(tr);
            }

            table.appendChild(tbody);
            container.appendChild(table);

            function createTextArea(name, value, label) {
              const existingTa = document.getElementById(name);
              if (existingTa) existingTa.remove();

              const textAreaWrapper = document.createElement('div');
              textAreaWrapper.style.marginTop = '12px';
              
              const labelElement = document.createElement('label');
              labelElement.textContent = label;
              labelElement.htmlFor = name;
              labelElement.style.display = 'block';
              labelElement.style.fontWeight = '600';
              labelElement.style.marginBottom = '6px';

              const textArea = document.createElement('textarea');
              textArea.id = name;
              textArea.rows = 10;
              textArea.style.width = '100%';
              textArea.style.boxSizing = 'border-box';

              textArea.value = value;

              textAreaWrapper.appendChild(labelElement);
              textAreaWrapper.appendChild(textArea);

              return textAreaWrapper;
            }

            const jsonTA = createTextArea("autotz-generated-json", JSON.stringify(generatedTimers, null, 2), "Generated timers (JSON):");

            const timersOrderedByCSVSlugs = {
              uk: generatedTimers.UK,
              pl: generatedTimers.PL,
              de: generatedTimers.DE,
              at: generatedTimers.AT,
              chde: generatedTimers.CHDE,
              nl: generatedTimers.NL,
              fr: generatedTimers.FR,
              chfr: generatedTimers.CHFR,
              es: generatedTimers.ES,
              pt: generatedTimers.PT,
              it: generatedTimers.IT,
              dk: generatedTimers.DK,
              no: generatedTimers.NO,
              fi: generatedTimers.FI,
              se: generatedTimers.SE,
              cz: generatedTimers.CZ,
              sk: generatedTimers.SK,
              hu: generatedTimers.HU,
              ro: generatedTimers.RO
            }
            const csvTA = createTextArea("autotz-generated-csv", Object.entries(timersOrderedByCSVSlugs).map(([slug, timer]) => {
              return `${timer}`
            }).join("\n"), "Generated timers (CSV):");



            container.appendChild(jsonTA);
            container.appendChild(csvTA);

            if (typeof DataTable === 'function') {
              try {
                new DataTable('#results_table', { paging: false });
              } catch (err) {
                console.warn('DataTable init failed:', err);
              }
            }
          } finally {
            isRunning = false;
          }

        })();
      }

      pageBgInput?.addEventListener('change', () => {
        const val = pageBgInput.value;
        const norm = normalizeHex(val);
        if (norm) applyBg(norm, 'page');
      }, true);

      setInterval(() => {
        const want = (sessionStorage.getItem(BG_KEY) || blue.value || '#000000').toLowerCase();
        const have = (pageBgInput?.value || '#000000').toLowerCase();
        if (want !== have) {
          // console.log('[AutoTZ] color watchdog → sync bg');
          applyBg(want, 'watchdog');
        }
        document.querySelector("header")?.remove()
        // they changed the layout
        // document.querySelector(".laptop-and-phone-placeholder-div").style.display = "none"
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
