function handleSelectTemplate(html, textarea, updateBtn) {
  const payload_campaign = {
    campaign_id: DEFAULT_VARIABLES.id,
    body: html,
  };
  textarea.value = html;
  updateBtn.click();
}
