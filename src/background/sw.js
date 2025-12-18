import { log } from "./utils/log.js";
import { getCurrentTab } from "./utils/getCurrentTab.js";
import { openNewTabWithUrl, openNewTabWithUrlAndWait } from "./utils/openNewTabWithUrl.js";

chrome.runtime.onInstalled.addListener(() => {
  log("SW installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "newsletter_preview") {
    const { html, url, openInNewTab } = request;

    if (openInNewTab) {
      openNewTabWithUrl(url);
      sendResponse({ status: "ok" });
      return true;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting
        .executeScript({
          target: { tabId: tabs[0].id },
          func: (html) => {
            const w = window.open("about:blank", "_blank");
            w.document.open();
            w.document.write(html);
            w.document.close();
          },
          args: [html],
        })
        .then(() => {
          sendResponse({ status: "ok" });
        })
        .catch((error) => {
          console.error("Error in newsletter_preview:", error);
          sendResponse({ status: "error", error: String(error) });
        });
    });

    return true;
  }

  if (request.type === "save_csv") {
    const { url, id, prefix, csv } = request;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, prefix, csv }),
    })
      .then((response) => response.json())
      .then(function (data) {
        sendResponse({
          status: "ok",
          data,
        });
      })
      .catch((error) => {
        console.error("Error in save_csv:", error);
        sendResponse({ status: "error", error: String(error) });
      });

    return true;
  }

  // ================= PUSH Issue Helper – CSV fetch =================
  if (request.type === "FETCH_SHEET_CSV") {
    (async () => {
      try {
        const res = await fetch(request.url, {
          credentials: "include",
        });

        const text = await res.text();

        sendResponse({
          ok: true,
          text,
        });
      } catch (err) {
        sendResponse({
          ok: false,
          error: err?.toString() || String(err),
        });
      }
    })();

    return true; // IMPORTANT: keep the message channel open for async sendResponse
  }

  if (request.type === "open_new_tab") {
    const { url } = request;
    openNewTabWithUrl(url);
    sendResponse({ status: "ok" });
    return true;
  }

  if (request.type === "open_new_tab_and_wait") {
    const { url } = request;
    openNewTabWithUrlAndWait(url).then(() => {
      sendResponse({ status: "ok" });
    });
    return true;
  }

  if (request.type === "get_current_tab") {
    getCurrentTab().then((tab) => {
      sendResponse({ status: "ok", tab });
    });
    return true;
  }

  if (request.type === "fetch_data") {
    const { url } = request;

    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        sendResponse({ status: "ok", data });
      })
      .catch((error) => {
        console.error("Error in fetch_data:", error);
        sendResponse({ status: "error", error: String(error) });
      });

    return true;
  }

  if (request.type === "remove_tab") {
    const { tabId } = request;
    chrome.tabs.remove(tabId, () => {
      sendResponse({ status: "ok" });
    });
    return true;
  }

  if (request.type === "remove_current_tab") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.remove(tabs[0].id, () => {
        sendResponse({ status: "ok" });
      });
    });
    return true;
  }

  if (request.type === "remove_all_other_tabs") {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      const currentTabId = sender.tab?.id;
      const idsToRemove = tabs
        .filter((t) => t.id !== currentTabId)
        .map((t) => t.id);

      chrome.tabs.remove(idsToRemove, () => {
        sendResponse({ status: "ok" });
      });
    });
    return true;
  }

  if (request.type === "reload_current_tab") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.reload(tabs[0].id, () => {
        sendResponse({ status: "ok" });
      });
    });
    return true;
  }

  if (request.type === "focus_tab") {
    const { tabId } = request;
    chrome.tabs.update(tabId, { active: true }, () => {
      sendResponse({ status: "ok" });
    });
    return true;
  }

  // Default
  sendResponse({ status: "ignored" });
  return true;
});
