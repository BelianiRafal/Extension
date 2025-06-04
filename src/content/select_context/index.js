const select_context = {
  textarea: null,

  init() {
    this.textarea = document.querySelector(SELECTOR);
    if (!this.textarea) {
      new Notification("Selector " + SELECTOR + " not found.");
      return;
    }
    chrome.storage.local.get(
      ["context", "components", "selectedContext"],
      (props) => {
        this.selectContext(props);
      }
    );
  },

  selectContext(props) {
    const { context, selectedContext } = props || {};

    const select_context = document.createElement("select");
    select_context.style =
      "text-transform: capitalize; height: 18px; margin-left: 4px; border-radius: 2px;";
    const options = [];
    for (const key of Object.keys(context || {})) {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = key;
      option.style = "text-transform: capitalize;";
      if (key === selectedContext) {
        option.selected = true;
      }
      options.push(option);
    }
    const option = document.createElement("option");
    option.value = "default";
    if (!selectedContext) {
      option.defaultSelected = true;
    }
    option.textContent = "Select context to fulfill";
    options.push(option);
    select_context.append(...options);
    select_context.addEventListener("change", (ev) => {
      const value = ev.target.value;
      if (value === "default") {
        return;
      }
      if (!(value in context)) {
        new Notification(value + " not found in context.");
      } else {
        chrome.storage.local.set({
          selectedContext: value,
        });
        new Notification("Context succesfully saved.");
        location.reload()
      }
    });
    this.textarea.insertAdjacentElement("afterend", select_context);
  },
};

select_context.init(SELECTOR);
