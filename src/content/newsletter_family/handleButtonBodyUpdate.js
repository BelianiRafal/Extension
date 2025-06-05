async function handleButtonBodyUpdate({ campaign_id, body, shop_content }) {
  if (!shop_content) {
    new Notification("Shop content not found for " + campaign_id);
  }
  const formDataValues = {
    update_body: "Update body",
    body: body || "",
    id: campaign_id,
    deleted_doc: 0,
    shop_content_id: shop_content || "",
  };
  const formData = createFormData(formDataValues);
  if (formData) {
    await updateContent(formData, campaign_id);
    new Notification("Body content updated for " + campaign_id);
    if (campaign_id === window.location.href.slice(-5)) {
      setTimeout(() => {
        location.reload();
      }, 100);
    }
  }

  function createFormData(formDataValues) {
    const formData = new FormData();
    let isUndefinedValue = false;
    for (let [key, value] of Object.entries(formDataValues)) {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        if (value === undefined || value === null) {
          isUndefinedValue = true;
        }
        formData.append(key, value);
      }
    }
    return isUndefinedValue ? null : formData;
  }

  async function updateContent(formData, campaign_id) {
    await fetch("https://www.prologistics.info/news_email.php", {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9,ru;q=0.8",
        "cache-control": "no-cache",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
      referrer:
        "https://www.prologistics.info/news_email.php?id=" + campaign_id,
      referrerPolicy: "strict-origin-when-cross-origin",
      body: formData,
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
  }
}
