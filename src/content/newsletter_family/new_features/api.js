const sendToBackend = async (type) => {
  if (!type) return alert(`Type (landing-page/newsletter) is unset!`);
  if (!nsltTableData)
    return alert(`Newsletter table data incorrectly scraped!`);
  if (!dataFromCSV) return alert(`Empty dataFromCSV object! Read CSV first!`);
  if (!mergedTables)
    return alert(
      `You probably forgot to upload CSV file!\nMerged tables not found, check console for errors!`
    );

  const rowsArray = Array.from(results_table.rows);

  for (const row of mergedTables) {
    const slug = row.slug;
    const targetRow = rowsArray.find((row) => {
      const slugCell = row.getElementsByTagName("td")[1];
      return slugCell && slugCell.textContent.trim() === slug;
    });

    const formData = prepareData(
      type === "newsletter" ? "newsletter" : "landing-page",
      row
    );

    logger.debug(`Sending request for row:`, slug);

    if (targetRow) targetRow.style.background = "#6af7ff91";
    const result = await sendRequest(formData);

    if (targetRow) {
      targetRow.style.background = result.success ? "#00ff006b" : "#ff000091";
    }

    if (result.success) {
      logger.debug(
        `Request successful for row "${slug}". Status: ${result.status}`
      );
    } else {
      logger.error(`Request failed for row "${slug}". Error: ${result.error}`);
    }
  }
  logger.debug(`All requests processed.`);

  setTimeout(() => {
    rowsArray.forEach((row) => {
      row.style.background = "inherit";
    });
  }, 1500);
};

const getNewsletterId = (shop, language, newsID) => {
  logger.debug(`${shop} ${language} ${newsID}`);
  if (
    (shop === "Beliani" || shop === "Beliani BE") &&
    !(language === "german" || language === "dutch")
  ) {
    return newsID - 1;
  }
  return newsID;
};

const appendNewsletterData = (formData, data) => {
  const newsletterFields = {
    seller: data.shop,
    shop_content_id: data.contentId,
    lang: data.language,
    subject: data.SL,
    id: data.newsID,
  };

  Object.entries(newsletterFields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const smtp_servers =
    data.shop.trim() !== "Beliani NL" ? DEFAULT_SERVERS : NL_SERVERS;
  smtp_servers.forEach((server) => {
    formData.append("smtp_id[]", server);
  });
};

const appendLandingPageData = (formData, data) => {
  formData.append("name", data.name);
  formData.append(
    "newsletter_template_id",
    getNewsletterId(data.shop, data.language, data.newsID)
  );
  formData.append("id", data.contentId ?? null);
  formData.append("shop_id", data.contentShopId ?? null);

  const fieldsWithLanguage = {
    title_menu: data.name,
    alias: data.name,
    description: data.name,
    title: data.PT,
  };

  Object.entries(fieldsWithLanguage).forEach(([key, value]) => {
    formData.append(`${key}[${data.language}]`, value);
  });
};

const prepareData = (type, data) => {
  const formData = new FormData();

  formData.append("activate_from_date", data.activate_from_date);
  formData.append("activate_from_time", data.activate_from_time);
  formData.append("deactivate_from_date", data.deactivate_from_date);
  formData.append("deactivate_from_time", data.deactivate_from_time);
  formData.append("update", "Update");

  if (type === "newsletter") {
    appendNewsletterData(formData, data);
  } else {
    if (!data.contentId || !data.contentShopId)
      return logger.error(
        "Missing contentId or contentShopId for landing page data"
      );
    appendLandingPageData(formData, data);
  }

  return formData;
};

const sendRequest = async (formData) => {
  if (!formData) {
    logger.error("FormData is empty or undefined.");
    return { success: false, error: "FormData is empty or undefined." };
  }

  logger.debug(`FormData: `, { table: Array.from(formData) });

  try {
    const endpoint = formData.has("seller")
      ? NEWSLETTER_ENDPOINT
      : SHOP_ENDPOINT;
    const response = await axios.post(endpoint, formData, {
      withCredentials: true,
    });
    return { success: true, status: response.status };
  } catch (error) {
    logger.error("Error sending request:", error.message);
    if (error.response) {
      logger.error("Error Data:", error.response.data);
      logger.error("Error Status:", error.response.status);
      logger.error("Error Headers:", error.response.headers);
    } else if (error.request) {
      logger.error("No response received for request:", error.request);
    }
    return { success: false, error: error.message };
  }
};
