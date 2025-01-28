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
      init
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
      init
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
      init
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
