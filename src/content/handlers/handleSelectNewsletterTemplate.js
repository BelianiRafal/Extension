function handleSelectTemplate(html) {
  const shop_content = document.querySelector(
    "select[name='shop_content_id']"
  )?.value;
  const payload_campaign = {
    campaign_id: DEFAULT_VARIABLES.id,
    body: html,
    shop_content: shop_content
  };
  handleButtonBodyUpdate(payload_campaign);
}
