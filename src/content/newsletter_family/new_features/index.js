let newsletterFamilyTableTbody;

const initializeNewsEmailPage = () => {
  newsletterFamilyTableTbody = findNewsletterFamilyTableTbody();

  if (!newsletterFamilyTableTbody) {
    console.error(
      "Newsletter family table not found on news_email page. Aborting extension initialization.",
    );
    return;
  }

  processNewsletterTableData();
};

let nsltTableData = [];

const processNewsletterTableData = () => {
  const rows = newsletterFamilyTableTbody.querySelectorAll("tr");

  if (rows.length < 3) {
    console.warn(
      "Less than 3 rows in the newsletter family table, processing might be incomplete.",
    );
  }

  rows.forEach((row) => {
    const tableDataCells = row.querySelectorAll("td");
    const rowData = {
      shop: null,
      language: null,
      slug: null,
      newsID: null,
      contentId: null,
      contentShopId: null,
    };

    tableDataCells.forEach((td) => {
      const tdText = td.innerText.trim();
      const form = td.querySelector("form");

      // getting newsletter id
      if (form) {
        if (!form.getAttribute("id")) {
          console.warn(
            "Skipping form processing due to missing ID in row:",
            row,
          );
          return;
        }

        if (form.action === location.origin + "/news_email.php") {
          const newsletterId = form.querySelector("a")?.innerText;
          if (newsletterId) {
            rowData.newsID = newsletterId;
          }
          return;
        }
      }

      // getting shop name & language
      if (tdText.includes("Beliani")) {
        rowData.shop = tdText;
      } else if (!Number(tdText) && tdText.length > 0) {
        rowData.language = tdText;
      }

      // getting contentId and contentShopId
      const aElement = td.querySelector("a");
      if (aElement && aElement.href) {
        try {
          const urlSearch = new URL(aElement.href).search;
          const searchParams = new URLSearchParams(urlSearch);

          rowData.contentId = searchParams.get("id");
          rowData.contentShopId = searchParams.get("shop_id");
        } catch (error) {
          console.error(
            "Error parsing URL from <a> element:",
            aElement.href,
            error,
          );
        }
      }

      // getting shop to slug
      if (rowData.shop && rowData.language) {
        const currentShopKey = [rowData.shop, rowData.language].join(" ");
        rowData.slug = SELLER_LANG_TO_SLUG[currentShopKey];
      }
    });
    if (!rowData.shop) return console.warn("Missing shop");
    if (!rowData.language) return console.warn("Missing language");
    if (!rowData.slug) return console.warn("Missing slug");
    if (!rowData.newsID) return console.warn("Missing newsID");
    if (!rowData.contentId) return console.warn("Missing contentId");
    if (!rowData.contentShopId) return console.warn("Missing contentShopId");

    // pushing data to object
    nsltTableData.push(rowData);
  });

  // debug console log using table function
  // logger.debug("Data from Newsletter Family Table: ", {table: nsltTableData});
  console.table(nsltTableData);

  setupNewsEmailUIElements();
};

// setup buttons below newsletter family table
const setupNewsEmailUIElements = () => {
  const updateSubjectsButton = createButton(
    "NSLT | Update SL & Servers",
    handleSLAndServersUpdate,
  );
  const updatePageTitlesButton = createButton(
    "LP | Update Page Titles",
    handlePageTitlesUpdate,
  );

  const uploadCSVInput = document.createElement("input");
  uploadCSVInput.id = "newsEmailUploadCsvFile";
  uploadCSVInput.className = "largerButton";
  uploadCSVInput.type = "file";
  uploadCSVInput.accept = ".csv";
  uploadCSVInput.name = "upload-csv";
  uploadCSVInput.addEventListener("change", handleCSVUpload);

  const buttonsToAdd = [
    uploadCSVInput,
    updateSubjectsButton,
    updatePageTitlesButton,
  ];

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("ext-container");

  buttonsToAdd.forEach((button) => {
    buttonsContainer.append(button);
  });

  newsletterFamilyTableTbody.parentElement.after(buttonsContainer);

  const uploadCSVLabel = document.createElement("label");
  uploadCSVLabel.htmlFor = "newsEmailUploadCsvFile";
  uploadCSVLabel.innerText = "Upload CSV here:";

  uploadCSVInput.before(uploadCSVLabel);
};

const handleSLAndServersUpdate = () => {
  sendToBackend("newsletter");
};
const handlePageTitlesUpdate = () => {
  sendToBackend("landing-page");
};

initializeNewsEmailPage();
