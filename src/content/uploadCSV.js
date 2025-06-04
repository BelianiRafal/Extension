class PushCampaign {
  data;
  id;
  title;
  constructor({ id, title, data }) {
    this.data = data;
    this.title = title;
    this.id = id;
  }
}

// Builder pattern
const app = {
  // ordering matter
  optionsKeys: [
    "[name='shop']",
    "[name='template']",
    "[name='language[]']",
    "[name='cta_lang']",
  ],
  inputsKeys: [
    "[name='title']",
    "[name='body']",
    "[name='click_action']",
    "[name='icon']",
    "[name='image']",
  ],
  unsubscribe: [],
  form: document.querySelector("[action='/push_notifications.php']"),
  selectToUppend: null,

  appendUI() {
    if (!this.form) {
      new Notification("Form not found.");
      return;
    }
    const label = this.createLabel();
    const input = this.createInput();

    const table = this.createTable();
    const tr = this.createRow();
    const td1 = this.createColumn("td");
    const td2 = this.createColumn("td");
    this.selectToUppend = td2;

    const formTitle = this.getFormTitle();
    const formTitleParent = formTitle.parentNode;

    label.append(input);
    td2.setAttribute("align", "right");

    td1.append(formTitle);
    td2.append(label);
    tr.append(td1, td2);
    table.append(tr);
    formTitleParent.append(table);

    chrome.storage.local.get(["push_campaign"], ({ push_campaign }) => {
      if (push_campaign) {
        this.createSelect().then((select) => {
          this.selectToUppend.append(select);
        });
      }
    });
  },

  createElement(tag) {
    return document.createElement(tag);
  },

  getFormTitle() {
    const formTitle = this.form.querySelector("h2");
    return formTitle;
  },

  createTable() {
    const table = this.createElement("table");
    table.style = "width: 100%;";
    return table;
  },

  createColumn() {
    const td = this.createElement("td");
    return td;
  },

  createRow() {
    const tr = this.createElement("tr");
    return tr;
  },

  createLabel() {
    const label = this.createElement("label");
    label.textContent = "Upload CSV";
    label.style = "cursor: pointer;";
    return label;
  },

  async createSelect() {
    this.unsubscribe.forEach((item) => item());
    const { push_campaign } = await chrome.storage.local.get(["push_campaign"]);
    const data = new PushCampaign(push_campaign);
    const keys = Object.keys(data.data);

    const select = document.createElement("select");
    select.style.marginLeft = "0.6rem";

    const selectCB = (ev) => {
      const optionsData = {};
      const inputsData = [];
      const selectedSlug = ev.target.value;
      const selectedSlugData = data.data[selectedSlug];
      console.info({ selectedSlugData, selectedSlug, push_campaign });

      for (let key in selectedSlugData) {
        if (this.optionsKeys.includes(key)) {
          optionsData[key] = selectedSlugData[key];
        }
        if (this.inputsKeys.includes(key)) {
          inputsData.push({ selector: key, value: selectedSlugData[key] });
        }
      }

      return [optionsData, inputsData];
    };

    select.addEventListener("change", async (ev) => {
      const [optionsData, inputsData] = selectCB(ev);
      console.log(optionsData, inputsData);

      // Sprawdzenie, czy title lub body zawiera "XX"
      const titleValue = inputsData.find(item => item.selector === "[name='title']")?.value || "";
      const bodyValue = inputsData.find(item => item.selector === "[name='body']")?.value || "";

      if (titleValue.includes("XX") || bodyValue.includes("XX")) {
          alert("W Twoim tekście jest XX zamiast wartości, sprawdź przed wysyłką.");
          return; // Przerywa dalszą akcję, jeśli znaleziono "XX"
      }

      // Keep ordering of name attributes (cta_lang should be selected after shop)
      for (const nameAttr of this.optionsKeys) {
          setTimeout(() => {
              this.setOptionValue({
                  selector: nameAttr,
                  value: optionsData[nameAttr],
              });
          }, 500);
      }

      inputsData.forEach(this.setInputValue);
  });

    const options = keys.map((item) => {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item.toUpperCase();
      return option;
    });
    select.append(...options);
    this.unsubscribe.push(() => select.remove());
    return select;
  },

  setOptionValue({ selector, value }) {
    const node = document.querySelector(selector);
    if (!node) {
      new Notification("Selector " + selector + ". Not found.");
      return;
    }
    [...(node.querySelectorAll("option") || [])].forEach((option) =>
      option.value === value
        ? (option.selected = true)
        : (option.selected = false)
    );
    node.dispatchEvent(new Event("change"));
  },

  setInputValue({ selector, value }) {
    const node = document.querySelector(selector);
    if (!node) {
      new Notification("Selector " + selector + ". Not found.");
      return;
    }
    node.value = value;
    node.dispatchEvent(new Event("change"));
  },

  createInput() {
    const input = this.createElement("input");
    input.accept = "text/csv";
    input.type = "file";
    input.style = "display: none; font-size: 11px;";

    function ChangeContextStrategies() {
      let Strategy = null;

      return {
        setStrategy: (strategy) => {
          Strategy = strategy;
        },
        execute: (value) => {
          Strategy.execute(value);
        },
      };
    }

    // Strategy pattern
    const handleFiles = {
      execute: (ev) => {
        const CSV_FILE =
          ev.target.files[0]; /* now you can work with the file list */
        const reader = new FileReader();

        reader.onload = async () => {
          const parsedCSV = CSVToArray(reader.result);
          const arraysToObjects = parseCSV(parsedCSV);
          await chrome.storage.local.set({
            push_campaign: {
              id: Date.now(),
              title: "Title",
              data: arraysToObjects,
            },
          });
          this.createSelect().then((select) => {
            this.selectToUppend.append(select);
          });
        };

        reader.readAsText(CSV_FILE);
      },
    };

    const handleChangeContext = ChangeContextStrategies();
    handleChangeContext.setStrategy(handleFiles);
    input.addEventListener("change", handleChangeContext.execute);
    return input;
  },
};

app.appendUI();
