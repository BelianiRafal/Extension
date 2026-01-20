// content/issue/push/pushIssueHelper.js
(() => {
    /******************************************************************
     * PUSH Issue Helper (GVIZ + CTA-based column detection)
     * - GVIZ nie zwraca nagłówków TAG, więc kolumny wykrywamy po wierszu CTA:
     *   Shop now / Kup teraz / Jetzt shoppen / Shop nu / Acheter maintenant / ...
     ******************************************************************/
  
    // ===================== Konfiguracja mapowań =====================
    const TAGS = [
      "AT","BEFR","BENL","CHDE","CHFR","CZ","DE","DK","ES","FI","FR","HU","IT","NL","NO","PL","PT","RO","SE","SK","UK","ES"
    ];
  
    const TAG_TO_SHOP = {
      AT:"beliani.at",
      BEFR:"beliani.be",
      BENL:"beliani.be",
      CHDE:"beliani.ch",
      CHFR:"beliani.ch",
      CZ:"beliani.cz",
      DE:"beliani.de",
      DK:"beliani.dk",
      ES:"beliani.es",
      FI:"beliani.fi",
      FR:"beliani.fr",
      HU:"beliani.hu",
      IT:"beliani.it",
      NL:"beliani.nl",
      NO:"beliani.no",
      PL:"beliani.pl",
      PT:"beliani.pt",
      RO:"beliani.ro",
      SE:"beliani.se",
      SK:"beliani.sk",
      UK:"beliani.co.uk",
      ES:"beliani.es"
    };
  
    const TAG_TO_LANG = {
      AT:"Deutsch",
      BEFR:"Francais",
      BENL:"Nederlands",
      CHDE:"Deutsch",
      CHFR:"Francais",
      CZ:"Cestina",
      DE:"Deutsch",
      DK:"Dansk",
      ES:"Espanol",
      FI:"Suomi",
      FR:"Francais",
      HU:"Magyar",
      IT:"Italiano",
      NL:"Nederlands",
      NO:"Norsk",
      PL:"Polski",
      PT:"Portugues",
      RO:"Romana",
      SE:"Svenska",
      SK:"Slovecina",
      UK:"English",
      ES:"Espanol"
    };
  
    // CHDE = x, CHFR = x+1, AT = x+2, ...
    const OFFSET_FROM_CHDE = {
      CHDE:0,
      CHFR:1,
      AT:2,
      BENL:3,
      BEFR:4,
      CZ:5,
      DE:6,
      DK:7,
      FI:8,
      FR:9,
      HU:10,
      IT:11,
      NL:12,
      NO:13,
      PL:14,
      PT:15,
      RO:16,
      SE:17,
      SK:18,
      ES:19,
      UK:20,
      ES:19 // jeśli u Was ES ma osobny offset, ustaw właściwie
    };
  
    const DOMAIN_ICON_URL = "https://pictureserver.net/static/2025/domainIcon_transparent.png";
  
    // Storage keys
    const LS_LAST = "push.issue.last";
    const lsKeyPerIssueTag = (issueId, tag) => `push.issue.${issueId}.${tag}`;
  
    // ===================== DOM helpers =====================
    const $ = (sel, root=document) => root.querySelector(sel);
    const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  
    function safeText(el) {
      return (el?.textContent || "").trim();
    }
  
    function getIssueIdFromUrl() {
      const m = location.href.match(/issue_logs\/(\d+)/);
      return m ? m[1] : "unknown";
    }
  
    // ===================== 1) Data z Subject =====================
    function parseDateFromIssue() {
        // 1) Najpewniejsze: znajdź dokładnie linię tytułu newslettera,
        // która zawiera nazwę dnia + datę, np. "Wednesday 2025.12.10"
        const dayRe = /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/i;
        const dateRe = /(\d{4})[.\-\/](\d{1,2})[.\-\/](\d{1,2})/;
      
        // Szukamy w elementach, które realnie renderują tekst (div/span/strong/h*)
        const candidates = $$("h1,h2,h3,h4,strong,b,div,span,p,td,th")
          .map(el => ({
            el,
            text: (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim()
          }))
          .filter(x => x.text && x.text.length < 400);
      
        // Preferuj elementy, które mają jednocześnie "Newsletter" i dzień tygodnia
        const prioritized = candidates.filter(x => /newsletter/i.test(x.text) && dayRe.test(x.text));
      
        const pool = prioritized.length ? prioritized : candidates.filter(x => dayRe.test(x.text));
      
        for (const x of pool) {
          const t = x.text;
          if (!dayRe.test(t)) continue;
      
          // np. "... Wednesday 2025.12.10"
          const m = t.match(dayRe);
          if (!m) continue;
      
          // wytnij fragment od dnia tygodnia do końca, żeby nie złapać innych dat z boku
          const idx = t.toLowerCase().indexOf(m[0].toLowerCase());
          const tail = idx >= 0 ? t.slice(idx) : t;
      
          const dm = tail.match(dateRe) || t.match(dateRe);
          if (!dm) continue;
      
          const yyyy = dm[1];
          const mm = String(dm[2]).padStart(2, "0");
          const dd = String(dm[3]).padStart(2, "0");
      
          return {
            yyyy,
            mm,
            dd,
            yyyymmdd: `${yyyy}${mm}${dd}`,
            yy_mm_dd: `${yyyy.slice(2)}-${mm}-${dd}`,
          };
        }
      
        // 2) Fallback: jeśli UI jest dziwne, spróbuj w całym dokumencie,
        // ale nadal preferuj wzorzec "Day YYYY.MM.DD"
        const docText = (document.body?.innerText || "").replace(/\s+/g, " ");
      
        const anchored = docText.match(
          /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b[^0-9]{0,60}(\d{4})[.\-\/](\d{1,2})[.\-\/](\d{1,2})/i
        );
        if (anchored) {
          const yyyy = anchored[2];
          const mm = String(anchored[3]).padStart(2, "0");
          const dd = String(anchored[4]).padStart(2, "0");
          return {
            yyyy,
            mm,
            dd,
            yyyymmdd: `${yyyy}${mm}${dd}`,
            yy_mm_dd: `${yyyy.slice(2)}-${mm}-${dd}`,
          };
        }
      
        // 3) Ostateczny fallback: pierwsza data w dokumencie (nieidealne, ale coś zwraca)
        const any = docText.match(dateRe);
        if (any) {
          const yyyy = any[1];
          const mm = String(any[2]).padStart(2, "0");
          const dd = String(any[3]).padStart(2, "0");
          return {
            yyyy,
            mm,
            dd,
            yyyymmdd: `${yyyy}${mm}${dd}`,
            yy_mm_dd: `${yyyy.slice(2)}-${mm}-${dd}`,
          };
        }
      
        return null;
      }

      function parseCampaignNameFromSubject() {
        // Szukamy linii: "Newsletter <name> - Wednesday 2025.12.10"
        const dayRe = /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/i;
      
        const candidates = $$("h1,h2,h3,h4,strong,b,div,span,p,td,th")
          .map(el => (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim())
          .filter(t => t && t.length < 400);
      
        const subjectLine =
          candidates.find(t => /^newsletter\s+/i.test(t) && dayRe.test(t)) ||
          candidates.find(t => /^newsletter\s+/i.test(t));
      
        if (!subjectLine) return null;
      
        // Wytnij "Newsletter "
        let s = subjectLine.replace(/^newsletter\s+/i, "").trim();
      
        // Jeśli jest " - Wednesday ..." to utnij po pierwszym " - "
        // (to jest dokładnie Twój przypadek)
        if (s.includes(" - ")) {
          s = s.split(" - ")[0].trim();
        }
      
        // awaryjnie: usuń końcówkę zaczynającą się od dnia tygodnia (gdyby separatorów nie było)
        s = s.replace(new RegExp(`\\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\\b.*$`, "i"), "").trim();
      
        return s || null;
      }
  
    // ===================== 2) Link do arkusza =====================
    function parseTranslationSheetUrl() {
      const LABEL_RE = /translation\s+spreadsheet\s+newsletter/i;
  
      const labelEl = $$("*").find(el => LABEL_RE.test((el.textContent || "").replace(/\s+/g, " ").trim()));
      if (labelEl) {
        const container =
          labelEl.closest("tr,li,div,section,table") ||
          labelEl.parentElement;
  
        const localLink = container?.querySelector("a[href*='docs.google.com/spreadsheets']");
        if (localLink) return localLink.href;
  
        const parent = container?.parentElement;
        const nearLink =
          container?.nextElementSibling?.querySelector?.("a[href*='docs.google.com/spreadsheets']") ||
          parent?.querySelector?.("a[href*='docs.google.com/spreadsheets']");
        if (nearLink) return nearLink.href;
      }
  
      const any = $$("a[href*='docs.google.com/spreadsheets/d/']").find(a => a.href.includes("/spreadsheets/d/"));
      return any ? any.href : null;
    }
  
    function parseSpreadsheetIdAndGid(sheetUrl) {
      const idMatch = sheetUrl.match(/\/spreadsheets\/d\/([^/]+)/);
      const gidMatch = sheetUrl.match(/[?#&]gid=(\d+)/);
      if (!idMatch) return null;
      return {
        spreadsheetId: idMatch[1],
        gid: gidMatch ? gidMatch[1] : "0"
      };
    }
  
    // ===================== 3) CHDE newsletter ID =====================
    function parseChdeNewsletterId() {
      const links = $$("a[href*='news_email.php?id=']");
      if (!links.length) return null;
  
      const chdeLink =
        links.find(a => {
          const row = a.closest("tr,li,div");
          const t = (row?.innerText || "");
          return t.includes("CHDE") && t.includes("news_email.php?id=");
        }) ||
        links.find(a => {
          const row = a.closest("tr,li,div");
          const t = (row?.innerText || "").trim();
          return t.startsWith("CHDE");
        });
  
      if (!chdeLink) return null;
  
      const m = chdeLink.href.match(/id=(\d+)/);
      return m ? Number(m[1]) : null;
    }
  
    // ===================== GVIZ + range (best-effort) =====================
    function colToA1(n) {
      let s = "";
      while (n > 0) {
        const m = (n - 1) % 26;
        s = String.fromCharCode(65 + m) + s;
        n = Math.floor((n - 1) / 26);
      }
      return s;
    }
  
    async function fetchGvizRangeTable(spreadsheetId, gid, rangeA1) {
      const url =
        `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq` +
        `?tqx=out:json&gid=${encodeURIComponent(gid || "0")}` +
        `&range=${encodeURIComponent(rangeA1)}`;
  
      const res = await fetch(url, { credentials: "omit", cache: "no-store" });
      if (!res.ok) throw new Error(`GVIZ fetch failed: ${res.status} ${res.statusText}`);
  
      const text = await res.text();
      const json = JSON.parse(text.substring(47).slice(0, -2));
  
      return json.table.rows.map(r => (r.c || []).map(cell => cell?.v ?? ""));
    }
  
    // ===================== Wykrywanie kolumn TEXT po wierszu CTA =====================
    function norm(v) {
      return String(v ?? "").trim().toLowerCase().replace(/\s+/g, " ");
    }
  
    function findRowByKey(table, key) {
      const needle = String(key).trim().toLowerCase();
      for (let i = 0; i < table.length; i++) {
        const row = table[i] || [];
        // w Twoich danych: kolumna 1 to "Key" (np. First Line / CTA / Subject Line)
        if (String(row[1] ?? "").trim().toLowerCase() === needle) return i;
      }
      return -1;
    }
  
    function extractTextColumnsFromRow(row) {
      // układ z GVIZ w Twoich logach:
      // [0]=Section, [1]=Key, [2]=MaxLen lub pusty, [3]=Original, [4]=OrigLen,
      // potem pary: [Text, Len, Text, Len, ...]
      const cols = [];
      for (let c = 5; c < row.length; c += 2) cols.push(c);
      return cols;
    }
  
    // Frazy CTA w wierszu CTA (kolejność w grupie rozwiązuje duplikaty)
    const CTA_GROUPS = [
      { phrase: "shop now", tags: ["UK"] },
      { phrase: "kup teraz", tags: ["PL"] },
      { phrase: "jetzt shoppen", tags: ["DE","CHDE","AT"] },         // 3 niemieckie
      { phrase: "shop nu", tags: ["NL","BENL"] },                    // 2 niderlandzkie
      { phrase: "acheter maintenant", tags: ["FR","BEFR","CHFR"] },  // 3 francuskie
      { phrase: "compra ahora", tags: ["ES","SP"] },                 // 2 hiszpańskie
      { phrase: "compre já", tags: ["PT"] },
      { phrase: "acquista ora", tags: ["IT"] },
      { phrase: "køb nu", tags: ["DK"] },
      { phrase: "kjøp nå", tags: ["NO"] },
      { phrase: "tilaa nyt", tags: ["FI"] },
      { phrase: "köp nu", tags: ["SE"] },
      { phrase: "do obchodu", tags: ["CZ","SK"] },                   // 2 razy często identyczne
      { phrase: "rendelj most", tags: ["HU"] },
      { phrase: "comandă acum", tags: ["RO"] },
    ];
  
    function buildTagToTextColMap(table) {
      const ctaRowIdx = findRowByKey(table, "CTA");
      if (ctaRowIdx < 0) return null;
  
      const ctaRow = table[ctaRowIdx] || [];
      const textCols = extractTextColumnsFromRow(ctaRow);
  
      // przygotuj kolejki do obsługi duplikatów
      const queues = CTA_GROUPS.map(g => ({
        phrase: g.phrase,
        remaining: [...g.tags],
      }));
  
      const map = {}; // TAG -> textColIndex
  
      for (const col of textCols) {
        const v = norm(ctaRow[col]);
  
        for (const q of queues) {
          if (q.remaining.length === 0) continue;
          if (v === q.phrase) {
            const tag = q.remaining.shift();
            map[tag] = col;
            break;
          }
        }
      }
  
      return map;
    }
  
    function findRowIndexByLabel(table, label) {
      const needle = String(label).trim().toLowerCase();
      for (let i = 0; i < table.length; i++) {
        const row = table[i] || [];
        for (let j = 0; j < row.length; j++) {
          if (String(row[j] ?? "").trim().toLowerCase() === needle) return i;
        }
      }
      return -1;
    }
  
    // ===================== Target URL generation =====================
    function toCampaignParam(sheetTabName) {
      if (!sheetTabName) return "";
      const cleaned =
        sheetTabName.includes(" - ")
          ? sheetTabName.split(" - ").slice(1).join(" - ").trim()
          : sheetTabName.trim();
      return encodeURIComponent(cleaned.toLowerCase().replace(/\s+/g, "+"));
    }
  
    function buildTargetUrl(shop, yy_mm_dd, campaignParam) {
      const base = `https://${shop}/content/lp${yy_mm_dd}/`;
      const utm = `utm_source=PUSH&utm_medium=lp${yy_mm_dd}&utm_campaign=${campaignParam || ""}`;
      return `${base}?${utm}`;
    }
  
    // Best-effort: nazwa zakładki (nie krytyczne)
    async function tryDetectSheetTabName(spreadsheetId, gid) {
      if (!gid) return null;
      try {
        const html = await (await fetch(`https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`, { credentials: "include" })).text();
        const patterns = [
          new RegExp(`"sheetId":${gid}[^}]*?"title":"([^"]+)"`),
          new RegExp(`"gid":${gid}[^}]*?"title":"([^"]+)"`)
        ];
        for (const re of patterns) {
          const m = html.match(re);
          if (m?.[1]) return m[1];
        }
        return null;
      } catch {
        return null;
      }
    }
  
    // ===================== Budowa finalnego obiektu =====================
    function buildPushData({ tag, date, chdeId, pushTitle, pushMessage, sheetTabName }) {
      const shop = TAG_TO_SHOP[tag];
      const lang = TAG_TO_LANG[tag];
  
      if (!shop) throw new Error(`Brak mapowania shop dla TAG=${tag}`);
      if (!lang) throw new Error(`Brak mapowania language dla TAG=${tag}`);
  
      const offset = OFFSET_FROM_CHDE[tag] ?? 0;
      const newsletterTemplateId = chdeId + offset;
  
      const urlToBigImage = `https://pictureserver.net/static/2025/${date.yyyymmdd}push.png`;
      const campaignParam = toCampaignParam((sheetTabName || "").trim() || `newsletter-${tag}`);
      const targetUrl = buildTargetUrl(shop, date.yy_mm_dd, campaignParam);
  
      return {
        tag,
        shop,
        newsletterTemplateId,
        languages: lang,
  
        notificationTitle: pushTitle || "",
        notificationMessage: pushMessage || "",
  
        urlToNotificationIcon: DOMAIN_ICON_URL,
        urlToBigImage,
  
        targetUrlForClickAction: targetUrl,
        ctaLanguage: lang,
  
        meta: {
          issueId: getIssueIdFromUrl(),
          generatedAt: new Date().toISOString(),
          chdeId,
          subjectDate: date,
          sheetTabName: sheetTabName || null,
          campaignName: campaignName || null,
          sheetTabName: sheetTabName || null,
        }
      };
    }
  
    function savePushData(issueId, tag, obj) {
      localStorage.setItem(lsKeyPerIssueTag(issueId, tag), JSON.stringify(obj));
      localStorage.setItem(LS_LAST, JSON.stringify(obj));
    }
  
    // ===================== UI (panel) =====================
    function setStatus(msg) {
      const el = $("#push-helper-status");
      if (el) el.textContent = msg;
    }
  
    function toast(title, text, type="info") {
      try {
        if (window.Swal?.fire) {
          window.Swal.fire({ title, text, icon: type });
        } else {
          console.log(`[PUSH helper] ${title}: ${text}`);
        }
      } catch {}
    }
  
    function injectPanel() {
      if ($("#push-helper-panel")) return;
  
      const panel = document.createElement("div");
      panel.id = "push-helper-panel";
      panel.style.cssText = `
       display:none; position:fixed; right:20px; bottom:20px; z-index:99999;
        width:380px; background:#fff; border:1px solid #ddd; border-radius:12px;
        box-shadow:0 10px 30px rgba(0,0,0,.12); padding:12px;
        font-family: Arial, sans-serif; color:#111;
      `;
  
      panel.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
          <div style="font-weight:700;">PUSH helper (Issue)</div>
          <button id="push-helper-close" title="Close"
            style="border:none; background:transparent; font-size:18px; cursor:pointer; line-height:1;">×</button>
        </div>
  
        <div style="margin-top:10px; display:flex; gap:8px; align-items:center;">
          <label style="min-width:52px;">TAG</label>
          <select id="push-helper-tag" style="flex:1; padding:6px;">
            ${TAGS.map(t => `<option value="${t}">${t}</option>`).join("")}
          </select>
        </div>
  
        <div style="margin-top:10px; display:flex; gap:8px;">
            <button id="push-helper-generate" style="flex:1; padding:10px; cursor:pointer;">Generate & Save</button>
            <button id="push-helper-generate-all" style="flex:1; padding:10px; cursor:pointer;">Generate ALL</button>
        </div>
      
        <div style="margin-top:10px; display:flex; gap:8px;">
            <button id="push-helper-copy" style="flex:1; padding:10px; cursor:pointer;">Copy JSON</button>
        </div>
  
        <div style="margin-top:10px; font-size:12px; opacity:0.9;">
          Saves to <code>push.issue.last</code> and <code>push.issue.&lt;issueId&gt;.&lt;TAG&gt;</code>
        </div>
  
        <div id="push-helper-status" style="margin-top:10px; font-size:12px; white-space:pre-wrap;"></div>
      `;
  
      document.body.appendChild(panel);
  
      $("#push-helper-close").onclick = () => panel.remove();
  
      $("#push-helper-copy").onclick = async () => {
        const raw = localStorage.getItem(LS_LAST);
        if (!raw) {
          setStatus("No data saved yet.");
          return;
        }
        await navigator.clipboard.writeText(raw);
        setStatus("Copied localStorage['push.issue.last'] to clipboard.");
        toast("Copied", "push.issue.last copied to clipboard.", "success");
      };
  
      $("#push-helper-generate").onclick = async () => {
        try {
          setStatus("Working...");
  
          const issueId = getIssueIdFromUrl();
          const tag = $("#push-helper-tag").value;
  
          const date = parseDateFromIssue();
          if (!date) throw new Error("Nie znaleziono daty (YYYY.MM.DD / YYYY-MM-DD / YYYY/MM/DD) w okolicy Subject.");

          const campaignName = parseCampaignNameFromSubject();
  
          const chdeId = parseChdeNewsletterId();
          if (!chdeId) throw new Error("Nie znaleziono CHDE newsletter ID (link news_email.php?id=...) w checklist.");
  
          const sheetUrl = parseTranslationSheetUrl();
          if (!sheetUrl) throw new Error("Nie znaleziono linku do arkusza w polu 'Translation spreadsheet newsletter'.");
  
          const sheet = parseSpreadsheetIdAndGid(sheetUrl);
          if (!sheet) throw new Error("Nie udało się sparsować spreadsheetId z linku arkusza.");
  
          // GVIZ – duży zapas (nagłówków i tak nie dostaniemy, ale dostaniemy CTA oraz PUSH title/message)
          const range = `A1:${colToA1(140)}500`;
          const table = await fetchGvizRangeTable(sheet.spreadsheetId, sheet.gid, range);
  
          console.log("[PUSH helper] GVIZ(range) preview rows[0..7]:", table.slice(0, 8));
  
          const colMap = buildTagToTextColMap(table);
          if (!colMap) throw new Error("Nie znaleziono wiersza CTA w sheet (w danych z GVIZ).");
  
          const textColIdx = colMap[tag];
          if (textColIdx == null) {
            const known = Object.keys(colMap).sort().join(", ");
            throw new Error(
              `Nie udało się przypisać kolumny dla TAG=${tag} na podstawie wiersza CTA. ` +
              `Wykryte tagi: ${known || "(brak)"}.`
            );
          }
  
          const titleRowIdx = findRowIndexByLabel(table, "PUSH title");
          const msgRowIdx = findRowIndexByLabel(table, "PUSH message");
          if (titleRowIdx < 0) throw new Error("Nie znaleziono wiersza 'PUSH title' w sheet.");
          if (msgRowIdx < 0) throw new Error("Nie znaleziono wiersza 'PUSH message' w sheet.");
  
          const pushTitle = String(table[titleRowIdx][textColIdx] ?? "").trim();
          const pushMessage = String(table[msgRowIdx][textColIdx] ?? "").trim();
  
          const sheetTabName = await tryDetectSheetTabName(sheet.spreadsheetId, sheet.gid);
  
          const obj = buildPushData({
            tag,
            date,
            chdeId,
            pushTitle,
            pushMessage,
            sheetTabName,
            campaignName
          });
  
          savePushData(issueId, tag, obj);
  
          setStatus([
            `Saved: ${lsKeyPerIssueTag(issueId, tag)} + push.issue.last`,
            `Date: ${date.yyyy}.${date.mm}.${date.dd}`,
            `CHDE ID: ${chdeId}`,
            `Shop: ${obj.shop}`,
            `Template ID: ${obj.newsletterTemplateId}`,
            `Detected TEXT col index: ${textColIdx}`,
            `Title: ${obj.notificationTitle}`,
            `Message: ${obj.notificationMessage}`,
            `Big image: ${obj.urlToBigImage}`,
            `Target URL: ${obj.targetUrlForClickAction}`,
            `Sheet tab: ${obj.meta.sheetTabName || "(not detected)"}`
          ].join("\n"));
  
          toast("Saved", `Generated data for ${tag} saved to localStorage.`, "success");
        } catch (e) {
          const msg = `ERROR: ${e.message || e}`;
          setStatus(msg);
          toast("Error", msg, "error");
        }
      };

      $("#push-helper-generate-all").onclick = async () => {
        try {
          setStatus("Working (ALL TAGS)...");
      
          const issueId = getIssueIdFromUrl();
      
          const date = parseDateFromIssue();
          if (!date) throw new Error("Nie znaleziono daty w tytule newslettera.");

          const campaignName = parseCampaignNameFromSubject();
      
          const chdeId = parseChdeNewsletterId();
          if (!chdeId) throw new Error("Nie znaleziono CHDE newsletter ID (news_email.php?id=...) w checklist.");
      
          const sheetUrl = parseTranslationSheetUrl();
          if (!sheetUrl) throw new Error("Nie znaleziono linku do arkusza w polu 'Translation spreadsheet newsletter'.");
      
          const sheet = parseSpreadsheetIdAndGid(sheetUrl);
          if (!sheet) throw new Error("Nie udało się sparsować spreadsheetId z linku arkusza.");
      
          const range = `A1:${colToA1(140)}500`;
          const table = await fetchGvizRangeTable(sheet.spreadsheetId, sheet.gid, range);
      
          console.log("[PUSH helper] GVIZ(range) preview rows[0..7]:", table.slice(0, 8));
      
          const colMap = buildTagToTextColMap(table);
          if (!colMap) throw new Error("Nie znaleziono wiersza CTA w danych z GVIZ.");
      
          const titleRowIdx = findRowIndexByLabel(table, "PUSH title");
          const msgRowIdx = findRowIndexByLabel(table, "PUSH message");
          if (titleRowIdx < 0) throw new Error("Nie znaleziono wiersza 'PUSH title' w sheet.");
          if (msgRowIdx < 0) throw new Error("Nie znaleziono wiersza 'PUSH message' w sheet.");
      
          const sheetTabName = await tryDetectSheetTabName(sheet.spreadsheetId, sheet.gid);
      
          // Bierzemy TAG-i, które faktycznie zostały wykryte z CTA
          // (i tylko te, które znamy w mapowaniach Shop/Lang/Offset)
          const detectedTags = Object.keys(colMap).sort();
          const saved = [];
          const skipped = [];
      
          for (const tag of detectedTags) {
            const textColIdx = colMap[tag];
      
            // jeśli masz SP->ES, a nie chcesz SP, to tu masz twardą normalizację:
            const normalizedTag = (tag === "SP") ? "ES" : tag;
      
            try {
              if (!TAG_TO_SHOP[normalizedTag]) throw new Error(`Brak TAG_TO_SHOP dla ${normalizedTag}`);
              if (!TAG_TO_LANG[normalizedTag]) throw new Error(`Brak TAG_TO_LANG dla ${normalizedTag}`);
              if (OFFSET_FROM_CHDE[normalizedTag] == null) throw new Error(`Brak OFFSET_FROM_CHDE dla ${normalizedTag}`);
      
              const pushTitle = String(table[titleRowIdx][textColIdx] ?? "").trim();
              const pushMessage = String(table[msgRowIdx][textColIdx] ?? "").trim();
      
              const obj = buildPushData({
                tag: normalizedTag,
                date,
                chdeId,
                pushTitle,
                pushMessage,
                sheetTabName,
                campaignName
              });
      
              // zapis per TAG
              localStorage.setItem(lsKeyPerIssueTag(issueId, normalizedTag), JSON.stringify(obj));
              saved.push(normalizedTag);
            } catch (e) {
              skipped.push(`${normalizedTag}: ${e.message || e}`);
            }
          }
      
          // Ustaw LAST jako aktualnie wybrany TAG (żeby zachować dotychczasowy UX reminder)
          const selectedTag = $("#push-helper-tag").value;
          const lastKey = lsKeyPerIssueTag(issueId, selectedTag);
          const lastRaw = localStorage.getItem(lastKey);
          if (lastRaw) localStorage.setItem(LS_LAST, lastRaw);
      
          setStatus([
            `Generate ALL finished.`,
            `Saved (${saved.length}): ${saved.join(", ") || "(none)"}`,
            skipped.length ? `Skipped (${skipped.length}):\n- ${skipped.join("\n- ")}` : `Skipped (0).`,
            `LAST set from selected TAG: ${selectedTag}`
          ].join("\n"));
      
          toast("Saved", `Saved ${saved.length} TAG(s) to localStorage for this issue.`, "success");
        } catch (e) {
          const msg = `ERROR: ${e.message || e}`;
          setStatus(msg);
          toast("Error", msg, "error");
        }
      };
    }
  
    // ===================== init =====================
    window.addEventListener("load", () => {
      setTimeout(injectPanel, 1200);
    });
  })();
  