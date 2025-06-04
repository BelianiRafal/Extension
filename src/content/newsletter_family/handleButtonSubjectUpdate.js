function handleButtonSubjectUpdate(button_element, {
  campaign_id,
  title,
  seller,
  sellerServers,
  lang,
}) {

  // Fix: usuwanie shop content page id
  // pobieramy wartość "Shop content page" i przesyłamy ją w request body
  const row = button_element.closest('tr[role="row"]');
  if (!row) {
    new Notification("Się zesrało.")
    return
  }

  const shopContentTd = row.querySelectorAll("td")[3];
  const a = shopContentTd.querySelector('a');
  const shopContentId = a.textContent.trim();

  // payload
  const formDataValues = {
    seller: seller,
    lang: lang,
    subject: title,
    update: "Update",
    "smtp_id[]": sellerServers,
    id: campaign_id,
    deleted_doc: 0,
    shop_content_id: shopContentId,
  };

  const formData = createFormData(formDataValues);
  if (formData) {
    updateContent(formData);
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

  function updateContent(formData) {
    fetch("https://www.prologistics.info/news_email.php", {
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
      referrer: "https://www.prologistics.info/news_email.php?id=11761",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: formData,
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
  }
}