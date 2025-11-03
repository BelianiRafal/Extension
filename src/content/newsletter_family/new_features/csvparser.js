let dataFromCSV = [];
let nonEmptyColumns = new Set();
let mergedNonEmptyColumns = new Set();

const handleCSVUpload = (event) => {
  const file = event.target.files[0];

  const reader = new FileReader();

  reader.onload = (e) => {
    const csvText = e.target.result;
    loadCSV(csvText);
  };

  reader.readAsText(file);
};

let mergedTables = null;

const loadCSV = async (result) => {
  try {
    const parsedResult = Papa.parse(result, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      error: (error) => {
        logger.error("Papa Parse individual row error:", error);
      },
    });

    if (parsedResult.errors.length > 0) {
      return logger.error("Papa Parse overall errors:", parsedResult.errors);
    }

    const parsedData = parsedResult.data.filter((row, rowIndex) => {
      let rowIsValid = true;
      const emptyColumns = [];

      // Iterate over the keys (column names) in the row object
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          const value = row[key];
          // Check if the value is null, undefined, or an empty string (after trimming)
          // prettier-ignore
          if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
            rowIsValid = false; 
            emptyColumns.push(key);
          }
        }
      }

      if (!rowIsValid) {
        // Log the row index (starting from 0, or adjust for CSV line number)
        // and the names of the empty columns
        // prettier-ignore
        logger.warn(`Skipped row ${rowIndex + 1} due to missing data in columns: ${emptyColumns.join(', ')}. Original row data:`, row);
      }

      return rowIsValid;
    });

    // Determine non-empty columns
    nonEmptyColumns = new Set();
    parsedData.forEach(row => {
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          const value = row[key];
          if (value !== null && value !== undefined && (typeof value !== 'string' || value.trim() !== '')) {
            nonEmptyColumns.add(key);
          }
        }
      }
    });

    dataFromCSV = parsedData;
    logger.info("Data from CSV: ", { table: dataFromCSV });
    logger.info("Non-empty columns: ", Array.from(nonEmptyColumns));

    mergeTables();
  } catch (error) {
    return logger.error("Error during Papa Parse or table generation:", error);
  }
};

const resultsTable = () => {
  if (document.getElementById("RESULTS_CONTAINER")) {
    return logger.warn("Table exists!");
  } else {
    const results = document.createElement("div");
    results.classList.add("ext-container");
    results.style.flexDirection = "column";
    results.id = "RESULTS_CONTAINER";

    const tableHeader = document.createElement("p");
    tableHeader.innerHTML =
      "Data shown below is uneditable intentionally.<br/>If something is wrong edit your CSV file and process it again.";

    const table = document.createElement("table");
    table.id = "results_table";
    table.classList += "stripe";
    results.appendChild(tableHeader);
    results.appendChild(table);
    newsletterFamilyTableTbody.parentElement.after(results);
  }

  // Nice-looking merged data table
  // @wiki: https://datatables.net/
  const columns = [
    { data: "shop", title: "Shop" },
    { data: "slug", title: "Slug" },
    { data: "newsID", title: "NSLT ID", visible: false },
  ];

  if (mergedNonEmptyColumns.has('SL')) {
    columns.push({
      data: "SL", 
      title: "Subject Line",
      render: function (data, type, row) {
        if (type === 'display' && data === 'TRANSLATION_NOT_FOUND') {
          return `<span class="translation-not-found">${data}</span>`;
        }
        return data;
      }
    });
    columns.push({
      data: null,
      title: "Set Subject Line",
      orderable: false,
      render: function (data, type, row) {
        return `<button class="action-btn set-subject-btn" data-action="newsletter" data-slug="${row.slug}" data-row-id="${row.newsID}">Set ${row.slug} SL</button>`;
      }
    });
  }

  columns.push({ data: "contentId", title: "LP ID", visible: false });
  columns.push({ data: "contentShopId", title: "LP SHOP ID", visible: false });

  if (mergedNonEmptyColumns.has('PT')) {
    columns.push({ 
      data: "PT", 
      title: "Page Title",
      render: function (data, type, row) {
        if (type === 'display' && data === 'TRANSLATION_NOT_FOUND') {
          return `<span class="translation-not-found">${data}</span>`;
        }
        return data;
      }
    });
    columns.push({
      data: null,
      title: "Set Page Title",
      orderable: false,
      render: function (data, type, row) {
        if (row.PT && row.activate_from_date && row.deactivate_from_date && row.name) {
          return `<button class="action-btn set-title-btn" data-action="landing-page" data-slug="${row.slug}" data-row-id="${row.contentId}">Set ${row.slug} PT</button>`;
        } else {
          return '';
        }
      }
    });
  }

  if (mergedNonEmptyColumns.has('activate_from_date')) {
    columns.push({ data: "activate_from_date", title: "From (Date)" });
  }
  if (mergedNonEmptyColumns.has('activate_from_time')) {
    columns.push({ data: "activate_from_time", title: "From (Time)", visible: false });
  }
  if (mergedNonEmptyColumns.has('deactivate_from_date')) {
    columns.push({ data: "deactivate_from_date", title: "To (Date)" });
  }
  if (mergedNonEmptyColumns.has('deactivate_from_time')) {
    columns.push({ data: "deactivate_from_time", title: "To (Time)", visible: false });
  }
  if (mergedNonEmptyColumns.has('name')) {
    columns.push({ data: "name", title: "Path" });
  }

  const dataTable = new DataTable("#results_table", {
    data: mergedTables,
    paging: false, // one giant table! let's go!!!!!! we love tables <3
    // scrollY: 400,
    columns: columns,
  });

  // Add event delegation for action buttons
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('action-btn')) {
      const action = event.target.getAttribute('data-action');
      const slug = event.target.getAttribute('data-slug');
      
      if (action && slug) {
        // Check if sendToBackend is available
        if (typeof window.sendToBackend === 'function') {
          window.sendToBackend(action, slug);
        } else {
          console.error('sendToBackend function not available, retrying in 100ms...');
          // Retry after a short delay
          setTimeout(() => {
            if (typeof window.sendToBackend === 'function') {
              window.sendToBackend(action, slug);
            } else {
              alert('sendToBackend function not available. Please reload the page.');
            }
          }, 100);
        }
      }
    }
  });
};

const mergeTables = () => {
  // Create a map of data from csv slugs
  const table2Map = new Map();
  dataFromCSV.forEach((row) => {
    table2Map.set(row.Slug.toLowerCase(), row);
  });
  mergedTables = [];

  // Iterate through newsletter family table data and merge with matching rows from table2
  nsltTableData.forEach((row1) => {
    const matchingRow2 = table2Map.get(row1.slug.toLowerCase());
    if (matchingRow2) {
      const mergedRow = { ...row1, ...matchingRow2 };

      // w google sheets jest 2x slug, usuwamy bo go nie potrzebujemy
      delete mergedRow.Slug;
      mergedTables.push(mergedRow);
    }
  });

  // Determine non-empty columns in merged data
  mergedNonEmptyColumns = new Set();
  mergedTables.forEach(row => {
    for (const key in row) {
      if (row.hasOwnProperty(key)) {
        const value = row[key];
        if (value !== null && value !== undefined && (typeof value !== 'string' || value.trim() !== '')) {
          mergedNonEmptyColumns.add(key);
        }
      }
    }
  });

  logger.info("Merged non-empty columns: ", Array.from(mergedNonEmptyColumns));

  resultsTable();
};
