// TODO
// Columns
// 1. Copy Campaign
// 2. Update subject | Upload CSV

const NewsletterFamilyTable = {
  container: null,
  newsletter_family: null,
  table: null,
  features: [],

  init({ features }) {
    this.features = features;
    this.container = [...document.querySelectorAll("center")].find((item) => {
      if (item.innerText.includes("Newsmail history")) {
        return true;
      }
      return false;
    });
    if (!this.container) {
      new Notification("Container not found.");
      return;
    }
    this.newsletter_family = [...this.container.querySelectorAll("h3")].find(
      (item) => {
        if (item.textContent.includes("Newsletter family")) {
          return true;
        }
        return false;
      },
    );
    if (!this.newsletter_family) {
      return new Notification("Newsletter family table not found.");
    }
    this.table = this.newsletter_family.nextElementSibling;
    if (!this.table) {
      return new Notification("Table not found.");
    }
    this.ui.header = this.table.querySelector(".tablesorter-headerRow");
    if (!this.ui.header) {
      return new Notification("Header not found.");
    }
    this.ui.tbody = this.table.querySelectorAll("tbody")[0];
    if (!this.ui.tbody) {
      return new Notification("Table body not found.");
    }
    this.initFeatures();
  },

  initFeatures() {
    for (const feature of this.features) {
      if ("init" in feature) {
        feature.init(this.ui);
      }
    }
  },

  ui: {
    tbody: null,
    header: null,
    createTh({ title, description }) {
      const th = document.createElement("th");
      th.title = description || "";
      th.style.textAlign = "center";
      const b = document.createElement("b");
      b.textContent = title;
      th.append(b);
      return th;
    },
    createColumn(children) {
      const td = document.createElement("td");
      td.append(...children);
      return td;
    },
    createButton({ title, onClick }) {
      const button = document.createElement("button");
      button.style =
        "display: flex; align-items: center; gap: 2px; font-size: 11px; white-space: nowrap;";
      button.textContent = title;
      button.addEventListener("click", onClick);
      return button;
    },
  },
};

setTimeout(() => {
  NewsletterFamilyTable.init({
    features: [updateBody, fulfillBody],
  });
}, 1000);
