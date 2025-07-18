setTimeout(() => {
  const input_elements = [];

  const container = [...document.querySelectorAll("center")].find((item) => {
    if (item.innerText.includes("Newsmail history")) {
      return true;
    }
    return false;
  });
  if (container) {
    function createTh({ title }) {
      const th = document.createElement("th");
      th.style.textAlign = "center";
      const b = document.createElement("b");
      b.textContent = title;
      th.append(b);
      return th;
    }

    function createElement(tag) {
      return document.createElement(tag);
    }

    function createLabel() {
      const label = createElement("label");
      label.textContent = "Upload CSV";
      label.style = "cursor: pointer;";
      return label;
    }

    function createCSVInput() {
      const input = createElement("input");
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

          reader.onload = () => {
            const parsedCSV = CSVToArray(reader.result);
            const arraysToObjects = parseCSV(parsedCSV);
            console.log(arraysToObjects);

            for (const slug in arraysToObjects) {
              const value = arraysToObjects[slug];
              if (slug in input_elements) {
                const input = input_elements[slug];
                const event = new Event("change");
                input.value = value["subject"] || "";
                input.dispatchEvent(event);
              }
            }
          };

          reader.readAsText(CSV_FILE);
        },
      };

      const handleChangeContext = ChangeContextStrategies();
      handleChangeContext.setStrategy(handleFiles);
      input.addEventListener("change", handleChangeContext.execute);
      return input;
    }

    const newsletter_family = [...container.querySelectorAll("h3")].find(
      (item) => {
        if (item.textContent.includes("Newsletter family")) {
          return true;
        }
        return false;
      },
    );
    if (!newsletter_family) {
      return new Notification("Newsletter family table not found.");
    }
    const table = newsletter_family.nextElementSibling;
    if (!table) {
      return new Notification("Table not found.");
    }
    const header = table.querySelector(".tablesorter-headerRow");
    const copy = createTh({ title: "Copy campaign id" });

    const label = createLabel();
    label.style =
      "padding: 0.2rem; background: #ffffff; border-radius: 0.2rem; margin-left: 0.2rem; cursor: pointer;";
    const input = createCSVInput();
    label.append(input);

    header?.append(copy);

    const tbody = table.querySelectorAll("tbody")[0];
    if (!tbody) {
      return new Notification("Table body not found.");
    }
    const rows = tbody.querySelectorAll("tr");

    function createCopyButton(id) {
      const button = document.createElement("button");
      button.style =
        "display: flex; align-items: center; gap: 2px; font-size: 11px";
      button.innerHTML = svg_copy() + " " + id;
      button.addEventListener("click", () => {
        navigator.clipboard.writeText(id);
        button.remove();
      });
      return button;
    }

    function createColumn(children) {
      const td = document.createElement("td");
      td.append(...children);
      return td;
    }

    function createInput(cb) {
      const input = document.createElement("input");
      input.addEventListener("change", cb);
      return input;
    }

    rows.forEach((row) => {
      const id = row.querySelector("a");
      if (id) {
        const _id = id.textContent.trim();

        const copyCampaign = createColumn([createCopyButton(_id)]);

        row.append(copyCampaign);
      }
    });
  }
}, 1000);
