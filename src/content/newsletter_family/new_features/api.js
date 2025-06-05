const sendToBackend = async (type) => {
  if (!type) return alert(`Type (landing-page/newsletter) is unset!`);
  if (!nsltTableData)
    return alert(`Newsletter table data incorrectly scraped!`);
  if (!dataFromCSV) return alert(`Empty dataFromCSV object! Read CSV first!`);
  if (!mergedTables)
    return alert(`Merged tables not found, check console for errors!`);

  for (const row of mergedTables) {
    // prettier-ignore
    let formData = prepareData(type === `newsletter` ? `newsletter` : `landing-page`, row);

    console.log(`Sending request for row:`, row.slug);

    // Wait for the sendRequest to complete before the next iteration
    const result = await sendRequest(formData);

    if (result.success) {
      console.log(
        `Request successful for row "${row.slug}". Status: ${result.status}`,
      );
    } else {
      console.error(
        `Request failed for row "${row.slug}". Error: ${result.error}`,
      );
    }
    console.log(`--------------------`);
  }
  console.log(`All requests processed.`);
};

const prepareData = (type, data) => {
  const formData = new FormData();

  switch (type) {
    case `newsletter`:
      formData.append(`seller`, data.shop);
      formData.append(`shop_content_id`, data.contentId);
      formData.append(`lang`, data.language);
      formData.append(`subject`, data.SL);
      formData.append(`id`, data.newsID);
      if (data.shop.trim() === `Beliani NL`) {
        formData.append(`smtp_id[]`, 66);
      } else {
        formData.append(`smtp_id[]`, 60);
        formData.append(`smtp_id[]`, 64);
        formData.append(`smtp_id[]`, 65);
        formData.append(`smtp_id[]`, 67);
      }
      break;
    case `landing-page`:
      console.log(data.shop);
      formData.append(`name`, data.name);
      formData.append(`title_menu[${data.language}]`, data.name);
      if (data.shop === "Beliani BE") {
        formData.append(`newsletter_template_id`, null);
      } else if (data.shop === "Beliani") {
        if (data.language === "german") {
          formData.append(`newsletter_template_id`, data.newsID);
        } else {
          formData.append(`newsletter_template_id`, data.newsID - 1);
        }
      } else {
        formData.append(`newsletter_template_id`, data.newsID);
      }
      formData.append(`alias[${data.language}]`, data.name);
      formData.append(`description[${data.language}]`, data.name);
      formData.append(`title[${data.language}]`, data.PT);
      formData.append(`id`, data.contentId);
      formData.append(`shop_id`, data.contentShopId);
      break;
  }

  formData.append(`activate_from_date`, data.activate_from_date);
  formData.append(`activate_from_time`, data.activate_from_time);
  formData.append(`deactivate_from_date`, data.deactivate_from_date);
  formData.append(`deactivate_from_time`, data.deactivate_from_time);
  formData.append(`update`, `Update`);

  return formData;
};

const sendRequest = async (formData) => {
  try {
    const endpoint = formData.has("seller")
      ? NEWSLETTER_ENDPOINT
      : SHOP_ENDPOINT;
    const response = await axios.post(endpoint, formData, {
      withCredentials: true,
    });

    return { success: true, status: response.status };
  } catch (error) {
    console.error("Error sending request:", error.message);
    if (error.response) {
      console.error("Error Data:", error.response.data);
      console.error("Error Status:", error.response.status);
      console.error("Error Headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received for request:", error.request);
    }
    return {
      success: false,
      error: error.message,
    };
  }
};
