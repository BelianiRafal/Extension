const inputs = document.body.querySelectorAll("input[name='subject']");

for (const iterator of inputs) {
  addButtonForEveryNode(iterator);
}

function addButtonForEveryNode(node) {
  fetchSheets(generateSpreadSheets);

  const select = document.createElement("select");
  const option = document.createElement("option");
  option.textContent = "Select spreadsheet";
  select.appendChild(option);

  select.addEventListener("change", (ev) => {
    fetchSheet((sheets) => generateSheets(sheets, ev.target.value), {
      spreadSheetId: ev.target.value,
    });
  });
  select.style = "font-size: 11px; margin-left: 0.2rem; width: 160px;";

  function generateSpreadSheets(sheets) {
    const options = [];
    for (const sheet of sheets) {
      const option = document.createElement("option");
      option.value = sheet.id;
      option.textContent = sheet.name;
      options.push(option);
    }

    select.append(...options);
  }

  //   2
  const selectSheet = document.createElement("select");
  const optionSheet = document.createElement("option");
  optionSheet.textContent = "Select sheet";
  selectSheet.appendChild(optionSheet);

  selectSheet.style = "font-size: 11px; margin-left: 0.2rem; width: 160px;";
  selectSheet.addEventListener("change", (ev) => {
    const [id, name] = ev.target.value.split("#");
    fetchSheetData(generateColumns, { name, spreadSheetId: id });
  });

  function generateSheets(sheets, main_id) {
    const options = [];
    for (const sheet of sheets) {
      const option = document.createElement("option");
      option.value = main_id + "#" + sheet.properties.title;
      option.textContent = sheet.properties.title;
      options.push(option);
    }
    selectSheet.append(...options);
  }

  function generateColumns(columns) {
    const [keys, ...content] = columns.values;
    const CSV = [];
    for (let idx = 0; idx < content.length; idx++) {
      let parsed = {};
      for (let j = 0; j < content[idx].length; j++) {
        if (!keys[j]) continue;
        parsed[keys[j].toLowerCase()] = content[idx][j];
      }
      CSV.push(parsed);
    }
    generateSlugSelect(CSV);
  }

  const selectSlug = document.createElement("select");
  selectSlug.style = "font-size: 11px; margin-left: 0.2rem; width: 160px;";
  const optionSlug = document.createElement("option");
  optionSlug.textContent = "Select slug";
  selectSlug.appendChild(optionSlug);

  function generateSlugSelect(slugs) {
    selectSlug.addEventListener("change", (ev) => {
      const value = slugs.find((item) => ev.target.value === item.slug);
      node.value = value?.subject ?? "Column 'subject' not found";
    });
    const options = [];
    for (const slug of slugs) {
      const option = document.createElement("option");
      option.value = slug.slug;
      option.textContent = slug.slug;
      options.push(option);
    }
    selectSlug.append(...options);
  }

  node.after(selectSlug);
  node.after(selectSheet);
  node.after(select);
}

function fetchSheetData(cb, { spreadSheetId, name }) {
  chrome.runtime.sendMessage(
    { type: "getSheetData", spreadSheetId, name },
    function ({ data }) {
      if ("error" in data) {
        alert("Something went wrong. Check console.");
        console.error(data.error);
        return;
      }
      cb(data);
    }
  );
}

function fetchSheet(cb, { spreadSheetId }) {
  chrome.runtime.sendMessage(
    { type: "getSheet", spreadSheetId },
    function ({ data }) {
      if ("error" in data) {
        alert("Something went wrong. Check console.");
        console.error(data.error);
        return;
      }
      cb(data.sheets);
    }
  );
}

function fetchSheets(cb) {
  chrome.runtime.sendMessage({ type: "getAuthToken" }, function ({ data }) {
    if ("error" in data) {
      alert("Something went wrong. Check console.");
      console.error(data.error);
      return;
    }
    cb(data.files);
  });
}
