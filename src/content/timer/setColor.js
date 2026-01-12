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

  const __dispatching = new WeakSet();
  let __isProgrammaticBgUpdate = false;

  const toRGB = (hex) => {
    let h = (hex || '#000000').replace('#', '');
    if (h.length === 3) h = h.split('').map(x => x + x).join('');
    const n = parseInt(h, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  };

  function dispatchAll(el) {
    if (!el) return;
    // Prevent re-entrant event loops (e.g. change handler calling applyBg -> dispatchAll again)
    if (__dispatching.has(el)) return;
    __dispatching.add(el);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    __dispatching.delete(el);
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
    // Avoid infinite recursion: our own dispatch triggers pageBgInput change listener.
    __isProgrammaticBgUpdate = true;
    try {
      setPickerColor('bg-color-id', hex);
    } finally {
      __isProgrammaticBgUpdate = false;
    }
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
      const sendtricLangSelector = document.querySelector("select#language");
      const autoTzGenerateButton = document.querySelector("button#autotz-generate")
      const autoTzGenerateALLButton = document.querySelector("button#autotz-gen-all")

      window.AutoTZ = window.AutoTZ || {};

      function setSendtricLanguage(language) {
        if (autoTzLangSelector && autoTzLangSelector.value !== language) {
          autoTzLangSelector.value = language;
        }
        if (sendtricLangSelector && sendtricLangSelector.value !== language) {
          sendtricLangSelector.value = language;
          dispatchAll(sendtricLangSelector);
        }
      }

      autoTzLangSelector?.addEventListener('change', (e) => {
        setSendtricLanguage(e.target.value);
      })

      autoTzGenerateButton.addEventListener("click", () => {
        const generateButton = document.querySelector("button#sendtric-button");
        if (generateButton.getAttribute("disabled")) generateButton.removeAttribute("disabled");
        generateButton.click();
      })

      function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

      function setValueWithEvents(el, value) {
        if (!el) return;
        if (el.value !== value) el.value = value;
        dispatchAll(el);
      }

      async function waitUntil(predicate, timeoutMs = 15000, intervalMs = 250) {
        const start = Date.now();
        while (Date.now() - start < timeoutMs) {
          try {
            if (predicate()) return true;
          } catch (e) {
            // ignore
          }
          await sleep(intervalMs);
        }
        return false;
      }

      function isCaptchaPresent() {
        // Detect only *blocking* captcha challenges.
        // Many sites keep recaptcha widgets/badges/hidden iframes in DOM at all times.
        // We consider captcha present only if a big challenge/dialog is visible.
        const isVisible = (el) => {
          if (!el) return false;
          const style = window.getComputedStyle(el);
          if (style.display === 'none' || style.visibility === 'hidden') return false;
          if (Number(style.opacity || '1') < 0.05) return false;
          const rect = el.getBoundingClientRect();
          if (rect.width < 20 || rect.height < 20) return false;
          const vw = window.innerWidth || document.documentElement.clientWidth;
          const vh = window.innerHeight || document.documentElement.clientHeight;
          if (rect.bottom < 0 || rect.right < 0 || rect.top > vh || rect.left > vw) return false;
          return true;
        };

        const overlapsCenter = (rect) => {
          const vw = window.innerWidth || document.documentElement.clientWidth;
          const vh = window.innerHeight || document.documentElement.clientHeight;
          const cx = vw / 2;
          const cy = vh / 2;
          return rect.left <= cx && rect.right >= cx && rect.top <= cy && rect.bottom >= cy;
        };

        const isBlockingSize = (rect) => (rect.width * rect.height) >= 40000; // ~200x200

        // Challenge frames (more specific than generic "recaptcha" which exists always)
        const selectors = [
          // reCAPTCHA challenge frame
          'iframe[src*="api2/bframe" i]',
          'iframe[title*="challenge" i]',
          'iframe[title*="recaptcha" i][title*="challenge" i]',
          // hCaptcha challenge
          'iframe[src*="hcaptcha.com" i]',
          'iframe[title*="hcaptcha" i]',
          // common dialog containers
          '[role="dialog"] iframe[src*="api2/bframe" i]',
          '[role="dialog"] iframe[src*="hcaptcha" i]',
        ].join(',');

        const candidates = Array.from(document.querySelectorAll(selectors));
        for (const el of candidates) {
          if (!isVisible(el)) continue;
          const rect = el.getBoundingClientRect();
          if (!isBlockingSize(rect)) continue;
          if (!overlapsCenter(rect)) continue;
          return true;
        }
        return false;
      }

      async function waitForCaptchaToClear() {
        if (!isCaptchaPresent()) return true;
        console.warn('   ⚠ Captcha detected (visible). Solve it in the page to continue...');
        const ok = await waitUntil(() => !isCaptchaPresent(), 10 * 60 * 1000, 500);
        if (!ok) console.warn('   × Captcha still present after 10 minutes; continuing retries.');
        return ok;
      }

      autoTzGenerateALLButton.addEventListener("click", tryToGenerateAllAtOnce);

      let lastSaved, isRunning;

      const timeZone = document.querySelector("#timezone")
      // timezone must be per SLUG/market (not per language)
      const slugToTimeZone = {
        CHDE: 'Europe/Zurich',
        CHFR: 'Europe/Zurich',
        FR: 'Europe/Paris',
        DE: 'Europe/Berlin',
        UK: 'Europe/London',
        AT: 'Europe/Vienna',
        ES: 'Europe/Madrid',
        PL: 'Europe/Warsaw',
        NL: 'Europe/Amsterdam',
        PT: 'Europe/Lisbon',
        IT: 'Europe/Rome',
        SE: 'Europe/Stockholm',
        HU: 'Europe/Budapest',
        DK: 'Europe/Copenhagen',
        CZ: 'Europe/Prague',
        FI: 'Europe/Helsinki',
        NO: 'Europe/Oslo',
        SK: 'Europe/Bratislava',
        BENL: 'Europe/Brussels',
        BEFR: 'Europe/Brussels',
        RO: 'Europe/Bucharest',
      };

      const DOMAINS = ["outlook.com", "hotmail.com", "gmail.com", "wp.pl", "protonmail.com"];

      const randomAlphaNum = (CHARS, len) => {
        const arr = new Uint8Array(len);
        
        crypto.getRandomValues(arr);

        return Array.from(arr, n => CHARS[n % CHARS.length]).join('');
      };

      const randomGuestEmail = () => {
        const local = randomAlphaNum('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 16);
        const domain = DOMAINS[Math.floor(Math.random() * DOMAINS.length)];

        return `${local}@${domain}`;
      };

      function tryToGenerateAllAtOnce() {
        if (isRunning) return;

        const keys = Object.keys(langToSelectValue);

        (async () => {
          if (isRunning) return;
          isRunning = true;
          window.AutoTZ.pauseTZ = true;
          try {
            for (const slug of keys) {
              const language = langToSelectValue[slug];
              setSendtricLanguage(language);
              console.log(
                `--- STARTED GENERATING TIMER FOR: ${slug} [desired=${language}] [panel=${autoTzLangSelector?.value}] [selected=${sendtricLangSelector?.value}]`
              );

              let saved = false;
              const maxAttempts = 15;
              for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                console.log(`  → Attempt ${attempt}. for ${slug}:`);

                await waitForCaptchaToClear();
                
                let email = randomGuestEmail();
                let fullName = randomAlphaNum('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 50);

                const guestEmailInput = document.querySelector("input#guest-email");
                const fullNameInput = document.querySelector("input#full-name");
                setValueWithEvents(guestEmailInput, email);
                setValueWithEvents(fullNameInput, fullName);
              
                console.debug('    → using email: ', email);
                console.debug('    → using fullName: ', fullName);

                // Apply settings: language + timezone (and let page react)
                setSendtricLanguage(language);
                const expectedTz = slugToTimeZone[slug];
                if (expectedTz && timeZone) {
                  setValueWithEvents(timeZone, expectedTz);
                  // notify setDate.js to re-apply chosen date after TZ change
                  window.dispatchEvent(new CustomEvent('AutoTZ:tzApplied', {
                    detail: { tz: expectedTz, label: language }
                  }));
                }

                // Keep colors stable (Sendtric sometimes resets on language/TZ changes)
                setPickerColor('label-color-id', '#000000');
                setPickerColor('digit-color-id',  '#000000');
                const bg = sessionStorage.getItem(BG_KEY) || '#000000';
                applyBg(bg, 'bulk-ensure');
                console.log(
                  `    → LANG: slug=${slug} desired=${language} panel=${autoTzLangSelector?.value} selected=${sendtricLangSelector?.value}`
                );

                // Wait until UI reflects desired values (reduces stale-language saves)
                const settingsOk = await waitUntil(() => {
                  const langOk = !sendtricLangSelector || sendtricLangSelector.value === language;
                  const tzOk = !expectedTz || !timeZone || timeZone.value === expectedTz;
                  return langOk && tzOk;
                }, 12000, 250);

                if (!settingsOk) {
                  console.warn(
                    `   × Settings not applied yet (desired lang=${language}, selected=${sendtricLangSelector?.value}, desired tz=${expectedTz}, tz=${timeZone?.value})`
                  );
                  await sleep(2000);
                  continue;
                }

                await waitForCaptchaToClear();

                const imgBefore = document.querySelector("img[alt='Email Live Countdown Timer']");
                const prevSrc = imgBefore?.src;
                
                autoTzGenerateButton.click();

                // Wait for captcha or for image src to really change
                await waitForCaptchaToClear();

                const gotNew = await waitUntil(() => {
                  const img = document.querySelector("img[alt='Email Live Countdown Timer']");
                  if (!img) return false;
                  const src = img.src;
                  if (!src) return false;
                  if (["https://www.sendtric.com/wp-content/uploads/2023/01/example_timer.gif", "https://www.sendtric.com/"].includes(src)) return false;
                  if (String(src).includes('placeholder')) return false;
                  if (prevSrc && src === prevSrc) return false;
                  return true;
                }, 30000, 300);

                if (!gotNew) {
                  saved = false;
                  console.warn('   × Timer image did not update in time --- waiting 5s');
                  await sleep(5000);
                  continue;
                }

                const img = document.querySelector("img[alt='Email Live Countdown Timer']");
                if (!img) {
                  saved = false;
                  console.warn("   × Error reading image source --- waiting 5s");
                  await sleep(5000)
                  continue;
                }

                // Validate settings still match right after generation
                if (sendtricLangSelector && sendtricLangSelector.value !== language) {
                  saved = false;
                  console.warn(
                    `   × Language changed unexpectedly after generate (desired=${language}, selected=${sendtricLangSelector.value}) --- retrying`
                  );
                  await sleep(2500);
                  continue;
                }

                if (expectedTz && timeZone && timeZone.value !== expectedTz) {
                  saved = false;
                  console.warn(
                    `   × Timezone changed unexpectedly after generate (desired=${expectedTz}, tz=${timeZone.value}) --- retrying`
                  );
                  await sleep(2500);
                  continue;
                }

                let newSrc = img.src;

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

            const inlineStyleId = 'autotz-timers-inline-style';
            if (!document.getElementById(inlineStyleId)) {
              const styleTag = document.createElement('style');
              styleTag.id = inlineStyleId;
              styleTag.textContent = `
                .autotz-timer-cell { display:flex; align-items:center; gap:10px; }
                .autotz-timer-cell img { max-width: 220px; max-height: 120px; display:block; border: 1px solid rgba(0,0,0,0.12); border-radius: 4px; background: #fff; }
                .autotz-timer-cell a { word-break: break-all; }
              `;
              document.head.appendChild(styleTag);
            }

            const tbody = document.createElement('tbody');
            for (const slug of Object.keys(generatedTimers)) {
              const src = generatedTimers[slug];

              const tr = document.createElement('tr');
              const tdSlug = document.createElement('td'); tdSlug.textContent = slug;
              const tdSrc = document.createElement('td');

              if (src) {
                const wrap = document.createElement('div');
                wrap.className = 'autotz-timer-cell';

                const img = document.createElement('img');
                img.src = src;
                img.alt = slug;
                img.loading = 'lazy';

                const a = document.createElement('a');
                a.href = src;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = src;

                wrap.appendChild(img);
                wrap.appendChild(a);
                tdSrc.appendChild(wrap);
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
              ro: generatedTimers.RO,
              benl: generatedTimers.BENL,
              befr: generatedTimers.BEFR,
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
            window.AutoTZ.pauseTZ = false;
          }

        })();
      }

      pageBgInput?.addEventListener('change', (e) => {
        if (__isProgrammaticBgUpdate) return;
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
