async function handleLandingUpdate({
  activate_from_date,
  activate_from_time,
  deactivate_from_date,
  deactivate_from_time,
  newsletter_template_id,
  shop_id,
  id,
}) {
  const formDataValues = {
    activate_from_date: activate_from_date,
    activate_from_time: activate_from_time,
    deactivate_from_date: deactivate_from_date,
    deactivate_from_time: deactivate_from_time,
    newsletter_template_id: newsletter_template_id,
    ordering: 0,
    update: "Update",
    id: id,
    shop_id: shop_id,
  };
  const formData = createFormData(formDataValues);
  if (formData) {
    await updateLanding({ formData, shop_id, id });
    new Notification("Landing page date updated.");
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

  async function updateLanding({ shop_id, id, formData }) {
    await fetch("https://www.prologistics.info/shop_content.php", {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9,ru;q=0.8",
        "cache-control": "no-cache",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
      referrer: `https://www.prologistics.info/shop_content.php?id=${id}&shop_id=${shop_id}`,
      referrerPolicy: "strict-origin-when-cross-origin",
      body: formData,
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
  }
}

// fetch("https://www.prologistics.info/js_backend.php", {
//     "headers": {
//       "accept": "*/*",
//       "accept-language": "en-US,en;q=0.9,ru;q=0.8",
//       "cache-control": "no-cache",
//       "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//       "pragma": "no-cache",
//       "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
//       "sec-ch-ua-mobile": "?0",
//       "sec-ch-ua-platform": "\"Windows\"",
//       "sec-fetch-dest": "empty",
//       "sec-fetch-mode": "cors",
//       "sec-fetch-site": "same-origin",
//       "x-requested-with": "XMLHttpRequest"
//     },
//     "referrer": "https://www.prologistics.info/shop_content.php?id=13256&shop_id=29",
//     "referrerPolicy": "strict-origin-when-cross-origin",
//     "body": "fn=check_alias_shop_content&shop_id=29&id=13256&alias%5B%5D=12&inactive=0",
//     "method": "POST",
//     "mode": "cors",
//     "credentials": "include"
//   });
