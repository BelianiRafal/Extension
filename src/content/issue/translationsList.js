function getTranslationsList() {
  const panelGroups = document.querySelectorAll(".panel-group");

  let translationsList = {};
  let translationsListElement;

  panelGroups.forEach((panelGroup) => {
    let panelHeading = panelGroup.querySelector(".panel-heading");
    if (!panelHeading) return;

    panelHeading = panelHeading.textContent;
    if (!String(panelHeading).toLowerCase().includes("translations")) return;

    const itemsList = panelGroup.querySelectorAll("ul li");

    itemsList.forEach((item) => {
      let isTranslationDone = item.querySelector("input").checked;
      let language = item.textContent.split("     ")[0].trim();
      //   console.log(isTranslationDone, language);
      translationsList[language] = isTranslationDone;
    });

    translationsListElement = panelGroup;
  });

  if (!translationsListElement) return;

  translationsListElement.style.display = "none";

  const prev = document.getElementById("translations-wrapper");
  if (prev) prev.remove();

  const wrapper = document.createElement("div");
  wrapper.id = "translations-wrapper";
  wrapper.className = "translations-wrapper";

  const toggleBtn = document.createElement("button");
  toggleBtn.type = "button";
  toggleBtn.setAttribute("aria-expanded", "true");
  toggleBtn.title = "Translations";
  toggleBtn.className = "toggleBtn";

  const arrowUp = `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 8l-6 6h12l-6-6z" fill="#333"/></svg>`;
  const arrowDown = `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 16l6-6H6l6 6z" fill="#333"/></svg>`;

  toggleBtn.innerHTML = arrowDown;

  const listContainer = document.createElement("div");

  listContainer.className = "listContainer expanded";

  const entries = Object.entries(translationsList);
  if (entries.length === 0) {
    const empty = document.createElement("span");
    empty.textContent = "No translations found";
    empty.className = "emptyMessage";
    listContainer.appendChild(empty);
  } else {
    entries.forEach(([language, done]) => {
      const item = document.createElement("div");
      item.className = "listItem";

      // normalize language label
      const langText = String(language || "").replace(/\s+/g, " ").trim();
      const lang = document.createElement("span");
      lang.textContent = langText;
      lang.className = "langName";

      const status = document.createElement("span");
      if (done) {
        status.textContent = "✓";
        status.className = "done";
      } else {
        status.textContent = "✕";
        status.className = "disabled";
      }

      item.appendChild(lang);
      item.appendChild(status);
      listContainer.appendChild(item);
    });
  }

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
    if (expanded) {
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.innerHTML = arrowUp;
      listContainer.classList.remove("expanded");
    } else {
      toggleBtn.setAttribute("aria-expanded", "true");
      toggleBtn.innerHTML = arrowDown;
      listContainer.classList.add("expanded");
    }
  });

  wrapper.appendChild(toggleBtn);
  // add a title for the bar
  const title = document.createElement('div');
  title.className = 'shortlist-title';
  title.textContent = 'Translations';
  wrapper.appendChild(title);
  wrapper.appendChild(listContainer);
  // ensure shared container for short lists exists and append wrapper into it
  const containerId = "shortlists-container";
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    container.className = "shortlists-container";
    document.body.appendChild(container);
  }
  wrapper.className = wrapper.className + " shortlist-wrapper";
  container.appendChild(wrapper);

  const toggleChecklistVisibility = document.createElement("button");
  toggleChecklistVisibility.type = "button";
  toggleChecklistVisibility.className = "toggleOriginalBtn";
  toggleChecklistVisibility.textContent = "Show Checklist";

  toggleChecklistVisibility.addEventListener("click", (ev) => {
    ev.stopPropagation();
    const isHidden = translationsListElement.style.display === "none";
    if (isHidden) {
      translationsListElement.style.display = "";
      translationsListElement.scrollIntoView();
      toggleChecklistVisibility.textContent = "Hide Checklist";
    } else {
      translationsListElement.style.display = "none";
      toggleChecklistVisibility.textContent = "Show Checklist";
    }
  });

  listContainer.insertAdjacentElement("afterend", toggleChecklistVisibility);
}

function wait(ms = 100) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function init() {
  await wait(2000);
  getTranslationsList();
  // Also initialize a similar UI for "Newsletter Testing approved"
  getTestingApprovedList();
}

init();

// Creates a checklist-like widget for panels whose heading contains both
// "testing" and "approved" (case-insensitive). Assumes the panel markup
// is similar to the translations panel: a `.panel-group` containing a
// `.panel-heading` and a `ul li` list with an <input> checkbox in each li.
function getTestingApprovedList() {
  const panelGroups = document.querySelectorAll(".panel-group");

  let testingList = {};
  let testingListElement;

  panelGroups.forEach((panelGroup) => {
    let panelHeading = panelGroup.querySelector(".panel-heading");
    if (!panelHeading) return;

    panelHeading = panelHeading.textContent;
    const headingLower = String(panelHeading).toLowerCase();
    // require both words so we match headings like "Newsletter Testing approved"
    if (!(headingLower.includes("testing") && headingLower.includes("approved"))) return;

    const itemsList = panelGroup.querySelectorAll("ul li");

    itemsList.forEach((item) => {
  const input = item.querySelector("input");
  const isDone = input ? input.checked : false;
  // normalize label: collapse whitespace and trim
  const rawText = item.textContent || "";
  const normalized = rawText.replace(/\s+/g, " ").trim();
  // keep only first token (e.g. "IT https://... by ..." => "IT")
  const label = normalized.split(' ')[0];
  // capture first link (if present) to render as an anchor icon
  const linkEl = item.querySelector("a");
  const href = linkEl ? linkEl.href : null;
  testingList[label] = { done: isDone, href };
    });

    testingListElement = panelGroup;
  });

  if (!testingListElement) return;

  // Hide original panel to avoid duplicate UI
  testingListElement.style.display = "none";

  const prev = document.getElementById("testing-approved-wrapper");
  if (prev) prev.remove();

  const wrapper = document.createElement("div");
  wrapper.id = "testing-approved-wrapper";
  wrapper.className = "testing-approved-wrapper";

  const toggleBtn = document.createElement("button");
  toggleBtn.type = "button";
  toggleBtn.setAttribute("aria-expanded", "true");
  toggleBtn.title = "Testing approved";
  toggleBtn.className = "toggleBtn";

  const arrowUp = `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 8l-6 6h12l-6-6z" fill="#333"/></svg>`;
  const arrowDown = `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 16l6-6H6l6 6z" fill="#333"/></svg>`;

  toggleBtn.innerHTML = arrowDown;

  const listContainer = document.createElement("div");
  listContainer.className = "listContainer expanded";

  const entries = Object.entries(testingList);
  if (entries.length === 0) {
    const empty = document.createElement("span");
    empty.textContent = "No testing items found";
    empty.className = "emptyMessage";
    listContainer.appendChild(empty);
  } else {
    entries.forEach(([label, done]) => {
      const item = document.createElement("div");
      item.className = "listItem";

      const name = document.createElement("span");
      name.textContent = label;
      name.className = "langName";

      const status = document.createElement("span");
      const doneVal = done && typeof done === 'object' ? done.done : done;
      const hrefVal = done && typeof done === 'object' ? done.href : null;
      if (doneVal) {
        status.textContent = "✓";
        status.className = "done";
      } else {
        status.textContent = "✕";
        status.className = "disabled";
      }

      item.appendChild(name);
      item.appendChild(status);

      // if there's a link, render a small anchor icon under the text that opens in a new tab
      const linkHref = hrefVal || (typeof done === 'object' ? done.href : null);
      if (linkHref) {
        const anchor = document.createElement('a');
        anchor.href = linkHref;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        anchor.className = 'list-link-icon';
        // simple external link SVG icon
        anchor.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z" fill="#333"/></svg>`;
        item.appendChild(anchor);
      }

      listContainer.appendChild(item);
    });
  }

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
    if (expanded) {
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.innerHTML = arrowUp;
      listContainer.classList.remove("expanded");
    } else {
      toggleBtn.setAttribute("aria-expanded", "true");
      toggleBtn.innerHTML = arrowDown;
      listContainer.classList.add("expanded");
    }
  });

  wrapper.appendChild(toggleBtn);
  // add a title for the bar
  const title = document.createElement('div');
  title.className = 'shortlist-title';
  title.textContent = 'Testing approved';
  wrapper.appendChild(title);
  wrapper.appendChild(listContainer);
  // ensure shared container for short lists exists and append wrapper into it
  const containerId = "shortlists-container";
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    container.className = "shortlists-container";
    document.body.appendChild(container);
  }
  wrapper.className = wrapper.className + " shortlist-wrapper";
  container.appendChild(wrapper);

  const toggleChecklistVisibility = document.createElement("button");
  toggleChecklistVisibility.type = "button";
  toggleChecklistVisibility.className = "toggleOriginalBtn";
  toggleChecklistVisibility.textContent = "Show Checklist";

  toggleChecklistVisibility.addEventListener("click", (ev) => {
    ev.stopPropagation();
    const isHidden = testingListElement.style.display === "none";
    if (isHidden) {
      testingListElement.style.display = "";
      testingListElement.scrollIntoView();
      toggleChecklistVisibility.textContent = "Hide Checklist";
    } else {
      testingListElement.style.display = "none";
      toggleChecklistVisibility.textContent = "Show Checklist";
    }
  });

  listContainer.insertAdjacentElement("afterend", toggleChecklistVisibility);
}
