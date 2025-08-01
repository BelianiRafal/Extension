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

    fetch(
      "https://www.googleapis.com/drive/v3/files?mimeType='application/vnd.google-apps.spreadsheet'",
      init,
    )
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

    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${request.spreadSheetId}`,
      init,
    )
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

    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${request.spreadSheetId}/values/${request.name}`,
      init,
    )
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
const FILTER_IDS = [
  11607, 11606, // CH-DE, CH-DE RICARDO
  11606, 11605, // CH-FR, CH-FR RICARDO
  46175,       // AT
  1309711,     // BENL
  1309715,     // BEFR
  11619,       // CZ
  11608, 11609,// DE, DE AVANDEO
  11618,       // DK
  11616,       // FI
  11612,       // FR
  11615,       // HU
  11610,       // IT
  11614,       // NL
  79358,       // NO
  11620,       // PL
  11617,       // PT
  1323241,     // RO
  11603,       // SE
  165840,      // SK
  11613,       // ES
  11621        // UK
];

// Compute template IDs sequence from startId: duplicates inherit
function buildTemplateIds(startId) {
  const tpl = [];
  let current = startId;
  FILTER_IDS.forEach((fid,i) => {
    if (i>0 && FILTER_IDS[i] === FILTER_IDS[i-1]) {
      tpl.push(tpl[i-1]);
    } else {
      tpl.push(current);
      current++;
    }
  });
  return tpl;
}

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.action === 'startBatch') {
    const startId = parseInt(msg.startId, 10);
    const templateIds = buildTemplateIds(startId);
    FILTER_IDS.forEach((fid, idx) => {
      const url = `https://www.prologistics.info/react/reports_page/customers_newsletter/?filter_id=${fid}`;
      chrome.tabs.create({url, active: false}, tab => {
        // when the tab finishes loading, send the templateId to content-script
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (tabId === tab.id && info.status === 'complete') {
            chrome.tabs.sendMessage(tabId, {action: 'applyTemplate', templateId: templateIds[idx]});
            chrome.tabs.onUpdated.removeListener(listener);
          }
        });
      });
    });
  }
});