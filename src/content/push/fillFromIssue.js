// content/push/fillFromIssue.js
(() => {
    /******************************************************************
     * PUSH Fill From Issue
     * - działa na push_notifications.php
     * - czyta localStorage["push.issue.last"] (domyślnie)
     * - opcjonalnie czyta localStorage["push.issue.<issueId>.<tag>"]
     * - wypełnia formularz polami wygenerowanymi na issue
     ******************************************************************/
  
    const LS_LAST = "push.issue.last";
    const $ = (sel, root=document) => root.querySelector(sel);
  
    function safeParse(raw) {
      try { return JSON.parse(raw); } catch { return null; }
    }
  
    function trigger(el, type) {
      if (!el) return;
      try { el.dispatchEvent(new Event(type, { bubbles: true })); } catch {}
    }
  
    function setValue(el, value) {
      if (!el) return false;
      el.value = value ?? "";
      trigger(el, "input");
      trigger(el, "change");
      return true;
    }
  
    function pickFirst(selectors) {
      for (const sel of selectors) {
        const el = $(sel);
        if (el) return el;
      }
      return null;
    }
  
    // ====== Mapowanie danych -> pola formularza (z fallbackami selektorów) ======
    function fillForm(data) {
      const missing = [];
  
      const fields = [
        {
          key: "shop",
          value: data.shop,
          selectors: ["select[name='shop']", "#shop", "select#shop"]
        },
        {
          key: "newsletterTemplateId",
          value: data.newsletterTemplateId != null ? String(data.newsletterTemplateId) : "",
          selectors: [
            "select[name='template']",
            "#template",
            "select#template",
            "select[name='newsletter_template']",
            "#newsletter_template"
          ]
        },
        {
          key: "languages",
          value: data.languages,
          selectors: ["input[name='languages']", "#languages", "input#languages"]
        },
        {
          key: "notificationTitle",
          value: data.notificationTitle,
          selectors: ["input[name='notification_title']", "#notification_title", "input#notification_title"]
        },
        {
          key: "notificationMessage",
          value: data.notificationMessage,
          selectors: ["textarea[name='notification_message']", "#notification_message", "textarea#notification_message"]
        },
        {
          key: "urlToNotificationIcon",
          value: data.urlToNotificationIcon,
          selectors: ["input[name='icon_url']", "#icon_url", "input#icon_url", "input[name='notification_icon_url']"]
        },
        {
          key: "urlToBigImage",
          value: data.urlToBigImage,
          selectors: ["input[name='big_image_url']", "#big_image_url", "input#big_image_url", "input[name='big_image']"]
        },
        {
          key: "targetUrlForClickAction",
          value: data.targetUrlForClickAction,
          selectors: ["input[name='target_url']", "#target_url", "input#target_url", "input[name='click_url']"]
        },
        {
          key: "ctaLanguage",
          value: data.ctaLanguage,
          selectors: ["select[name='cta_language']", "#cta_language", "select#cta_language", "input[name='cta_language']"]
        }
      ];
  
      for (const f of fields) {
        const el = pickFirst(f.selectors);
  
        // select vs input
        const ok = el ? setValue(el, f.value) : false;
  
        if (!ok) missing.push(f.key);
      }
  
      return missing;
    }
  
    // ====== UI panel ======
    function injectPanel() {
      if ($("#push-fill-panel")) return;
  
      const panel = document.createElement("div");
      panel.id = "push-fill-panel";
      panel.style.cssText = `
        position:fixed; right:20px; bottom:20px; z-index:99999;
        width:420px; background:#fff; border:1px solid #ddd; border-radius:12px;
        box-shadow:0 10px 30px rgba(0,0,0,.12); padding:12px;
        font-family: Arial, sans-serif; color:#111;
      `;
  
      panel.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
          <div style="font-weight:700;">Fill PUSH from Issue</div>
          <button id="push-fill-close" title="Close"
            style="border:none; background:transparent; font-size:18px; cursor:pointer; line-height:1;">×</button>
        </div>
  
        <div style="margin-top:10px; font-size:12px; opacity:0.85;">
          Source key:
        </div>
  
        <div style="margin-top:6px; display:flex; gap:8px;">
          <input id="push-fill-key" style="flex:1; padding:8px;"
            placeholder="push.issue.last"
            value="push.issue.last" />
          <button id="push-fill-load" style="padding:8px 10px; cursor:pointer;">Load</button>
        </div>
  
        <div style="margin-top:10px; display:flex; gap:8px;">
          <button id="push-fill-apply" style="flex:1; padding:10px; cursor:pointer;">Fill Form</button>
          <button id="push-fill-show" style="flex:1; padding:10px; cursor:pointer;">Show JSON</button>
        </div>
  
        <div id="push-fill-status" style="margin-top:10px; font-size:12px; white-space:pre-wrap;"></div>
      `;
  
      document.body.appendChild(panel);
  
      const setStatus = (msg) => { $("#push-fill-status").textContent = msg; };
  
      $("#push-fill-close").onclick = () => panel.remove();
  
      function loadData() {
        const key = $("#push-fill-key").value.trim() || LS_LAST;
        const raw = localStorage.getItem(key);
        if (!raw) {
          setStatus(`No data under localStorage["${key}"]\nGenerate & Save first on issue.`);
          return null;
        }
  
        const data = safeParse(raw);
        if (!data) {
          setStatus(`Invalid JSON under localStorage["${key}"].`);
          return null;
        }
  
        // minimalna walidacja struktury
        const required = ["shop","newsletterTemplateId","languages","notificationTitle","notificationMessage","urlToNotificationIcon","urlToBigImage","targetUrlForClickAction","ctaLanguage"];
        const missingReq = required.filter(k => data[k] == null);
        if (missingReq.length) {
          setStatus(`Loaded, but missing keys: ${missingReq.join(", ")}`);
        } else {
          setStatus(`Loaded OK: TAG=${data.tag || "?"}, Shop=${data.shop}, Template=${data.newsletterTemplateId}`);
        }
  
        return data;
      }
  
      $("#push-fill-load").onclick = () => loadData();
  
      $("#push-fill-show").onclick = () => {
        const data = loadData();
        if (!data) return;
        const pretty = JSON.stringify(data, null, 2);
  
        // Jeśli SweetAlert2 jest dostępny (w manifeście jest), używamy go:
        if (window.Swal?.fire) {
          window.Swal.fire({
            title: "Loaded JSON",
            html: `<pre style="text-align:left; white-space:pre-wrap; font-size:12px; max-height:60vh; overflow:auto;">${escapeHtml(pretty)}</pre>`,
            width: 800
          });
        } else {
          alert(pretty);
        }
      };
  
      $("#push-fill-apply").onclick = () => {
        const data = loadData();
        if (!data) return;
  
        const missing = fillForm(data);
  
        if (missing.length === 0) {
          setStatus(`Filled OK.\nTAG=${data.tag}\nSource=${$("#push-fill-key").value.trim()}`);
          if (window.Swal?.fire) {
            window.Swal.fire({ title: "Done", text: "Form filled from Issue data.", icon: "success" });
          }
        } else {
          const msg = `Filled partially.\nMissing fields (selectors not found):\n- ${missing.join("\n- ")}`;
          setStatus(msg);
          if (window.Swal?.fire) {
            window.Swal.fire({ title: "Partial fill", text: "Some fields were not found in DOM. Check selectors.", icon: "warning" });
          }
        }
      };
  
      // domyślnie: od razu pokaż status dla push.issue.last
      loadData();
    }
  
    function escapeHtml(s) {
      return String(s)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }
  
    // init
    window.addEventListener("load", () => setTimeout(injectPanel, 900));
  })();
  