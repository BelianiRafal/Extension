const host = location.hostname.toLowerCase();

// match all beliani domains and subdomains
// (^|\.) = start or dot before label; (\.|$) = dot after label or end-of-host
const regexString = /(^|\.)beliani(\.|$)/i;

const createPurgeDateElement = (dateString) => {
  const purgeDateElement = document.createElement("div");
  purgeDateElement.className = "beliani__purgeDate";
  purgeDateElement.innerText = `Purge Date: ${dateString}`;

  const closeButton = document.createElement("div");
  closeButton.className = "beliani__purgeDate__closeButton";
  closeButton.innerText = "x";

  closeButton.onclick = () => purgeDateElement.remove();

  purgeDateElement.appendChild(closeButton);

  const controls = document.createElement("div");
  controls.className = "beliani__purgeDate__controls";

  const sendToPurgeBtn = document.createElement("button");
  sendToPurgeBtn.className =
    "beliani__purgeDate__btn beliani__purgeDate__btn--primary";
  sendToPurgeBtn.type = "button";
  sendToPurgeBtn.textContent = "Send to Purge";

  sendToPurgeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let domain = location.hostname;
    if (domain.startsWith("www.")) domain = domain.slice(4);
    const urlsValue = location.href;

    chrome.runtime.sendMessage({
      action: "openPurgeAndSubmit",
      domain,
      urlsValue,
    });
  });

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.action === "openPurgeAndSubmitResult") {
      const result = msg.result || {};

      if (result.ok) {
        console.info("Purge successful:", result.status);
        alert("Purge request completed successfully.");
      } else {
        console.error("Purge failed, unknown result:", result);
        alert("Purge failed. See console for details.");
      }
    }
  });

  controls.appendChild(sendToPurgeBtn);
  purgeDateElement.appendChild(controls);

  return purgeDateElement;
};

const extractPurgeDate = () => {
  return document.body.getAttribute("data-current_date");
};

if (regexString.test(host)) {
  const purgeDate = extractPurgeDate();
  if (purgeDate) {
    const purgeDateElement = createPurgeDateElement(purgeDate);
    document.body.appendChild(purgeDateElement);
  }
}
