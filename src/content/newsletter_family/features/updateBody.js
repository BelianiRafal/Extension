const updateBody = {
  body: null,

  init(ui) {
    this.body = document.querySelector("textarea[name=body]");
    if (!this.body) {
      return;
    }
    const updateBody = ui.createTh({
      title: "Update body",
      description: "Copy body content from current campaign.",
    });
    ui.header.append(updateBody);
    const rows = ui.tbody.querySelectorAll("tr");
    rows.forEach((row) => {
      const hrefs = row.querySelectorAll("a");

      const id = row.querySelector("a");
      if (!id) {
        new Notification("Newsletter Id page not found.");
        return;
      }
      const _id = id.textContent.trim();
      const href_lp = (hrefs && [...hrefs]).filter((item) => {
        return item.href.includes("/shop_content.php?id");
      });

      const button = ui.createButton({
        title: "Copy body",
        onClick: () => {
          let LP_ID = null;
          if (href_lp.length) {
            LP_ID = new URL(location.origin + href_lp[0].href).searchParams.get(
              "id",
            );
          }
          if (this.body.value.trim().length <= 10) {
            new Notification("Body content too small.");
            return;
          }
          const payload = {
            campaign_id: _id,
            body: this.body.value,
            shop_content: LP_ID,
          };
          handleButtonBodyUpdate(payload);
        },
      });
      row.append(ui.createColumn([button]));
    });
  },
};
