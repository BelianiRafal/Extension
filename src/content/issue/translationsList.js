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

      const lang = document.createElement("span");
      lang.textContent = language;
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
  wrapper.appendChild(listContainer);
  document.body.appendChild(wrapper);

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
}

init();
