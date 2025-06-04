function handleSelectBannerTemplate(html) {
  const source_btn = document.querySelector("#cke_19");
  if (!source_btn) {
    new Notification("Source button not found.");
    return;
  }
  if (!source_btn.classList.contains("cke_button_on")) {
    source_btn.click();
  }
  const update_btn = document.querySelector("input[name=update_body]");
  const source_content = document.querySelector("#cke_1_contents");
  if (!source_content) {
    new Notification("Node id='#cke_1_contents' not found.");
    return;
  }
  source_content.click();
  const textarea = source_content.querySelector("textarea");
  if (textarea) {
    textarea.value = html;
    textarea.dispatchEvent(new Event("change"));
    update_btn?.click();
  } else {
    new Notification("Textarea not found.");
  }
  this.dialogNode.node.close();
}
