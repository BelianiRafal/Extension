import { log } from "./utils/log.js";
import { getCurrentTab } from "./utils/getCurrentTab.js";

function handleNewsletter({ id, html }) {
  function fetchNewsletter(id, cb) {
    return fetch("https://www.prologistics.info/news_email.php?id=" + id)
      .then((data) => data.text())
      .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const textarea = doc.querySelector("textarea[name=body]");
        return cb(textarea?.value || "");
      });
  }
  return fetchNewsletter(id, (value) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    doc.querySelector("#newsletter").setAttribute("srcdoc", value);
    return doc.body.innerHTML;
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // spreadSheetStrategies(request.type, { sendResponse, request });

  if (request.type === "newsletter_preview") {
    let fullURL = chrome.runtime.getURL("pages/newsletter_preview.html");
    fetch(fullURL)
      .then((r) => r.text())
      .then(async (html) => {
        const tab = await getCurrentTab();
        chrome.scripting
          .executeScript({
            target: { tabId: tab.id },
            func: handleNewsletter,
            args: [{ id: request.id, html: html }],
          })
          .then((data) => {
            const html = data[0]?.result || "Result not found.";
            sendResponse({
              html: html,
            });
          });
      });
    return true;
  }

  if (request.type === "save_csv") {
    log({ request, sender, sendResponse });
  }

  return true;
});

function getAuthToken({ request, sendResponse }) {
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    let init = {
      method: "GET",
      async: true,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      contentType: "json",
    };

    fetch("https://www.googleapis.com/drive/v3/files?mimeType='application/vnd.google-apps.spreadsheet'", init)
      .then((response) => response.json())
      .then(function (data) {
        sendResponse({ data: data });
      });
  });
}

function getSheetStrategy({ request, sendResponse }) {
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    let init = {
      method: "GET",
      async: true,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      contentType: "json",
    };

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${request.spreadSheetId}`, init)
      .then((response) => response.json())
      .then(function (data) {
        sendResponse({ data: data });
      });
  });
}

function getSheetDataStrategy({ request, sendResponse }) {
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    let init = {
      method: "GET",
      async: true,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      contentType: "json",
    };

    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${request.spreadSheetId}/values/${request.name}`, init)
      .then((response) => response.json())
      .then(function (data) {
        sendResponse({ data: data });
      });
  });
}

function spreadSheetStrategies(strategy, options) {
  if (strategy === "getAuthToken") {
    getAuthToken(options);
  }

  if (strategy === "getSheet") {
    getSheetStrategy(options);
  }

  if (strategy === "getSheetData") {
    getSheetDataStrategy(options);
  }
}

/* ---------- background.js ---------- */

// List of filter IDs in your sequence (duplicates cause same template ID)
// const FILTER_IDS = [
//   11607, 11606, // CH-DE, CH-DE RICARDO
//   11606, 11605, // CH-FR, CH-FR RICARDO
//   46175,       // AT
//   1309711,     // BENL
//   1309715,     // BEFR
//   11619,       // CZ
//   11608, 11609,// DE, DE AVANDEO
//   11618,       // DK
//   11616,       // FI
//   11612,       // FR
//   11615,       // HU
//   11610,       // IT
//   11614,       // NL
//   79358,       // NO
//   11620,       // PL
//   11617,       // PT
//   1323241,     // RO
//   11603,       // SE
//   165840,      // SK
//   11613,       // ES
//   11621        // UK
// ];

// // Compute template IDs sequence from startId: duplicates inherit
// function buildTemplateIds(startId) {
//   const tpl = [];
//   let current = startId;
//   FILTER_IDS.forEach((fid,i) => {
//     if (i>0 && FILTER_IDS[i] === FILTER_IDS[i-1]) {
//       tpl.push(tpl[i-1]);
//     } else {
//       tpl.push(current);
//       current++;
//     }
//   });
//   return tpl;
// }

// chrome.runtime.onMessage.addListener((msg, sender) => {
//   if (msg.action === 'startBatch') {
//     const startId = parseInt(msg.startId, 10);
//     const templateIds = buildTemplateIds(startId);
//     FILTER_IDS.forEach((fid, idx) => {
//       const url = `https://www.prologistics.info/react/reports_page/customers_newsletter/?filter_id=${fid}`;
//       chrome.tabs.create({url, active: false}, tab => {
//         // when the tab finishes loading, send the templateId to content-script
//         chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
//           if (tabId === tab.id && info.status === 'complete') {
//             chrome.tabs.sendMessage(tabId, {action: 'applyTemplate', templateId: templateIds[idx]});
//             chrome.tabs.onUpdated.removeListener(listener);
//           }
//         });
//       });
//     });
//   }
// });

chrome.runtime.onMessage.addListener(async (message, sender) => {
  // handle purge requests
  if (message.action === "openPurgeAndSubmit") {
    const requestURL = "https://www.prologistics.info/purge.php";
    const tab = await chrome.tabs.create({ url: requestURL, active: false });

    // wait for the tab to complete loading
    await new Promise((resolve) => {
      const listener = (tabId, changeInfo) => {
        if (tabId === tab.id && changeInfo.status === "complete") {
          chrome.tabs.onUpdated.removeListener(listener);
          resolve();
        }
      };
      chrome.tabs.onUpdated.addListener(listener);
    });

    try {
      // normalize domain (remove leading www.)
      let domain = message.domain || "";
      if (domain.startsWith("www.")) domain = domain.slice(4);

      // prepare urls path: only pathname, always ending with '/'
      let urlsPath = message.urlsValue;
      try {
        const u = new URL(message.urlsValue);
        urlsPath = u.pathname || "/";
        if (!urlsPath.endsWith("/")) urlsPath += "/";
      } catch (e) {
        // fallback: ensure trailing slash
        if (!urlsPath.endsWith("/")) urlsPath += "/";
      }

      // execute script in the purge tab to perform the POST with FormData
      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: async (args) => {
          const { domain, urlsPath } = args;
          try {
            const formData = new FormData();
            formData.append("domain", domain);
            formData.append("prio", "1");
            formData.append("urls", urlsPath);
            formData.append("purge", "Purge");

            const entries = Array.from(formData.entries());

            const resp = await fetch(window.location.origin + "/purge.php", {
              method: "POST",
              body: formData,
              credentials: "include",
              referrer: "https://prologistics.info/purge.php",
            });

            const text = await resp.text();
            return { ok: resp.ok, status: resp.status, text, formEntries: entries };
          } catch (err) {
            return { ok: false, error: err?.toString() || String(err) };
          }
        },
        args: [{ domain: domain, urlsPath }],
      });

      const result = results[0]?.result;

      chrome.tabs.remove(tab.id).catch(() => {});

      if (sender && sender.tab && sender.tab.id) {
        chrome.tabs.sendMessage(sender.tab.id, { action: "openPurgeAndSubmitResult", result });
      } else if (message.replyId) {
        chrome.runtime.sendMessage({ action: "openPurgeAndSubmitResult", result, replyId: message.replyId });
      }
    } catch (err) {
      chrome.tabs.remove(tab.id).catch(() => {});
      if (sender && sender.tab && sender.tab.id) {
        chrome.tabs.sendMessage(sender.tab.id, { action: "openPurgeAndSubmitResult", result: { ok: false, error: err?.toString() } });
      }
    }
    return;
  }
  if (message.action === "nextTab") {
    let [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!currentTab) return;

    let url = new URL(currentTab.url);
    let domain = url.hostname;

    let allTabs = await chrome.tabs.query({ currentWindow: true });
    let sameDomainTabs = allTabs.filter((t) => {
      try {
        return new URL(t.url).hostname === domain;
      } catch {
        return false;
      }
    });

    if (sameDomainTabs.length <= 1) return;

    let currentIndex = sameDomainTabs.findIndex((t) => t.id === currentTab.id);

    if (currentIndex === sameDomainTabs.length - 1) {
      chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        func: () => alert("End for function!"),
      });
      return;
    }

    let nextIndex = currentIndex + 1;
    let nextTab = sameDomainTabs[nextIndex];

    chrome.tabs.update(nextTab.id, { active: true });
  }
});

let firstTabId = null;
let lastTabId = null;

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "setFirstTab") {
    firstTabId = sender.tab.id;
  }

  if (message.action === "setLastTab") {
    lastTabId = sender.tab.id;
  }

  if (message.action === "goToFirstTab" && firstTabId) {
    chrome.tabs.update(firstTabId, { active: true });
  }

  if (message.action === "goToLastTab" && lastTabId) {
    chrome.tabs.update(lastTabId, { active: true });
  }
});
