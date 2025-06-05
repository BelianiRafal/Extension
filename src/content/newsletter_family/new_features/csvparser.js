let dataFromCSV = [];

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
        console.error("Papa Parse individual row error:", error);
      },
    });

    if (parsedResult.errors.length > 0) {
      return console.error("Papa Parse overall errors:", parsedResult.errors);
    }

    const parsedData = parsedResult.data.filter((row, rowIndex) => {
      // Added rowIndex
      let rowIsValid = true; // Assume valid until proven otherwise
      const emptyColumns = []; // Array to store names of empty columns

      // Iterate over the keys (column names) in the row object
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          const value = row[key];
          // Check if the value is null, undefined, or an empty string (after trimming)
          // prettier-ignore
          if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
            rowIsValid = false; // Mark row as invalid
            emptyColumns.push(key); // Add the column name to the list of empty columns
          }
        }
      }

      if (!rowIsValid) {
        // Log the row index (starting from 0, or adjust for CSV line number)
        // and the names of the empty columns
        // prettier-ignore
        console.warn(`Skipped row ${rowIndex + 1} due to missing data in columns: ${emptyColumns.join(', ')}. Original row data:`, row);
      }

      return rowIsValid; // Only return true for valid rows
    });

    dataFromCSV = parsedData;
    logger.info("Data from CSV: ");
    console.table(parsedData);

    mergeTables();
  } catch (error) {
    return console.error("Error during Papa Parse or table generation:", error);
  }
};

const resultsTable = () => {
  if (document.getElementById("RESULTS_CONTAINER")) {
    return console.warn("Table exists!");
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
    results.appendChild(tableHeader);
    results.appendChild(table);
    newsletterFamilyTableTbody.parentElement.after(results);
  }

  // Nice-looking merged data table
  // @wiki: https://datatables.net/
  new DataTable("#results_table", {
    data: mergedTables,
    paging: false, // one giant table! let's go!!!!!! we love tables <3
    // scrollY: 400,
    columns: [
      { data: "shop", title: "Shop" },
      { data: "slug", title: "Slug" },
      { data: "newsID", title: "Newsletter ID" },
      { data: "SL", title: "Subject Line" },
      { data: "contentId", title: "Content ID" },
      { data: "contentShopId", title: "Content Shop ID" },
      { data: "PT", title: "Page Title" },
      { data: "activate_from_date", title: "From (Date)" },
      { data: "activate_from_time", title: "From (Time)" },
      { data: "deactivate_from_date", title: "To (Date)" },
      { data: "deactivate_from_time", title: "To (Time)" },
      { data: "name", title: "Path" },
    ],
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

  resultsTable();
};
