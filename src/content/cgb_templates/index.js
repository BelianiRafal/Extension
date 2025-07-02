const ui = {
  unmount: [],
  unsubscribe: [],

  stateButtons: null,

  createButton({ title, onClick, classname }) {
    const btn = document.createElement("button");
    btn.type = "button";
    (btn.className = classname), (btn.textContent = title);
    btn.addEventListener("click", onClick);
    this.addToUnsubUnmount({
      unsubscribeCb: () => {
        btn.removeEventListener("click", onClick);
      },
      unmountCb: () => {
        btn.remove();
      },
    });
    return btn;
  },

  createBlockForButton() {
    this.buttonsBlock = document.createElement("div");
    this.buttonsBlockContainer = document.createElement("div");
    this.blockItem1 = document.createElement("div");
    this.blockItem2 = document.createElement("div");
    this.blockItem3 = document.createElement("div");
    this.closeBtn = document.createElement("button");
    this.blockText = document.createElement("h2");

    this.buttonsBlock.className = "block-btns-main";

    this.buttonsBlockContainer.className = "block-btns-container";

    this.blockItem1.className = "block-item1";
    this.blockItem2.className = "block-item2";
    this.blockItem3.className = "block-item3";

    this.blockText.textContent = "Banners buttons";
    this.blockText.className = "block-btns-text";

    this.closeBtn.textContent = "X";
    this.closeBtn.className = "closeBtn";

    this.buttonsBlockContainer.append(this.blockText);
    this.buttonsBlockContainer.append(this.closeBtn);
    this.buttonsBlockContainer.append(this.blockItem1);
    this.buttonsBlockContainer.append(this.blockItem2);
    this.buttonsBlockContainer.append(this.blockItem3);
    this.buttonsBlock.append(this.buttonsBlockContainer);
    document.body.append(this.buttonsBlock);

    this.closeBtn.addEventListener("click", () => {
      this.buttonsBlock.classList.remove("active");

      setTimeout(() => {
        document.querySelector(".openButton").style.display = "block";
      }, 400);
    });
  },

  AddButtonToContainer(btn, item = "blockItem1") {
    if (!this[item]) {
      this.createBlockForButton();
    }
    this[item].append(btn);
  },

  createSelect({ title, options, classname, onChange }) {
    const _options = [];
    const select = document.createElement("select");
    select.textContent = title;
    select.className = classname;
    select.addEventListener("change", onChange);
    this.addToUnsubUnmount({
      unsubscribeCb: () => {
        select.removeEventListener("change", onChange);
      },
      unmountCb: () => {
        select.remove();
      },
    });
    for (const option of options) {
      _options.push(this.createOption(option));
    }
    const defaultOption = this.createOption({ title, value: "default" });
    defaultOption.defaultSelected = true;
    select.appendChild(defaultOption);
    select.append(..._options);
    return select;
  },

  createOption({ title, html }) {
    const option = document.createElement("option");
    option.textContent = title;
    option.value = html;
    this.addToUnsubUnmount({
      unmountCb: () => {
        option.remove();
      },
    });
    return option;
  },

  addToUnsubUnmount({ unsubscribeCb, unmountCb }) {
    if (unsubscribeCb) {
      this.unsubscribe.push(unsubscribeCb);
    }
    if (unmountCb) {
      this.unmount.push(unmountCb);
    }
  },

  init() {
    return ui;
  },
};

function getButton(selector1, selector2, display) {
  const button =
    document.querySelector(selector1) || document.querySelector(selector2);

  if (button) {
    button.style.cssText = `
        display: ${display};
      `;
    if (ui && typeof ui.AddButtonToContainer === "function") {
      ui.AddButtonToContainer(button, "blockItem1");
    }
  }
  return button;
}

const app = {
  selectNodes: [],
  selectMobileNodes: [],

  clearAllNodes: [],
  clearAllNodesMobile: [],

  pasteAllBtn: [],
  pasteAllBtnMobile: [] || null,

  fulfillNodes: [],
  fulfillMobileNodes: [],

  textareas: null,
  textareas_mobile: null,

  selectedTemplateValue: null,

  fulfillAllNodeDesktop: null,
  fulfillAllNodeMobile: null,

  ui: null,
  languageAttributeToSlugDesktop: {
    "html[czech]": "cz",
    "html[danish]": "dk",
    "html[dutch]": "nl",
    "html[english]": "uk",
    "html[finnish]": "fi",
    "html[french]": "fr",
    "html[german]": "de",
    "html[germanDE]": "chde",
    "html[Hungarian]": "hu",
    "html[italian]": "it",
    "html[norsk]": "no",
    "html[polish]": "pl",
    "html[portugal]": "pt",
    "html[romanian]": "ro",
    "html[slovak]": "sk",
    "html[spanish]": "es",
    "html[swedish]": "se",
  },
  languageAttributeToSlugMobile: {
    "mobile_html[czech]": "cz",
    "mobile_html[danish]": "dk",
    "mobile_html[dutch]": "nl",
    "mobile_html[english]": "uk",
    "mobile_html[finnish]": "fi",
    "mobile_html[french]": "fr",
    "mobile_html[german]": "de",
    "mobile_html[germanDE]": "chde",
    "mobile_html[Hungarian]": "hu",
    "mobile_html[italian]": "it",
    "mobile_html[norsk]": "no",
    "mobile_html[polish]": "pl",
    "mobile_html[portugal]": "pt",
    "mobile_html[romanian]": "ro",
    "mobile_html[slovak]": "sk",
    "mobile_html[spanish]": "es",
    "mobile_html[swedish]": "se",
  },
  state: {
    context: null,
  },

  init() {
    this.initDesktop();
  },

  getTemplates(fn) {
    return fn(TEMPLATES);
  },

  initDesktop() {
    this.showMobile = getButton(
      "input[class=mobile-show]",
      "input[value='Show Mobile Banners']",
      "block",
      this.ui
    );
    this.hideMobile = getButton(
      "input[class=mobile-hide]",
      "input[value='Hide mobile Banners']",
      "none",
      this.ui
    );

    this.textareas = document.querySelectorAll("textarea[name^=html]");

    if (!this.textareas) {
      new Notification("Desktop textareas not found.");
      return;
    }
    this.initUI(ui);
    this.createOpenButton();
    this.addListeners();
    this.createContextBtn();
  },

  initMobile() {
    this.textareas_mobile = document.querySelectorAll(
      "textarea[name^=mobile_html]"
    );
    if (!this.textareas_mobile) {
      new Notification("Mobile textareas not found.");
      return;
    }
    this.initMobileUI();
  },

  addListeners() {
    if (this.showMobile) {
      this.showMobile.addEventListener("click", () => this.initMobile());
    }
  },

  convertToObject(CSV) {
    const object_data = {};
    for (const element of CSV) {
      if (!("slug" in element)) {
        new Notification("slug required");
        return;
      }
      for (const key of Object.keys(element)) {
        if (element["slug"] in object_data) {
          if (typeof object_data[element["slug"]] === "object") {
            object_data[element["slug"]] = {
              ...object_data[element["slug"]],
              [key]: element[key],
            };
          } else {
            object_data[element["slug"]] = element[key];
          }
        } else {
          object_data[element["slug"]] = {
            [key]: element[key],
          };
        }
      }
    }
    return object_data;
  },

  createOpenButton() {
    const openButton = document.createElement("button");
    openButton.className = "openButton";
    openButton.textContent = "Open Button CGB";

    document.body.append(openButton);

    openButton.addEventListener("click", () => {
      const block = document.querySelector(".block-btns-main");
      block.classList.add("active");
      openButton.style.display = "none";
    });
  },

  createContextBtn() {
    const button = document.createElement("button");
    button.textContent = "Add context";
    button.className = "contextBtn";
    //Find the button on the page
    const checkUpdateBtn = document.querySelector(
      `table tr center form input[type="submit"][name="update"]`
    );

    //Create new button update and add styles
    const newUpdateBtn = document.createElement("button");
    newUpdateBtn.textContent = "Update";
    newUpdateBtn.className = "newUpdateBtn";

    newUpdateBtn.addEventListener("click", () => {
      newUpdateBtn.disabled = true;
      newUpdateBtn.textContent = "Wait...";

      //Check if there is a button on the page
      if (typeof checkUpdateBtn !== "undefined" && checkUpdateBtn !== null) {
        setTimeout(() => {
          checkUpdateBtn.click();
          setTimeout(() => {
            newUpdateBtn.disabled = false;
            newUpdateBtn.textContent = "Update";
          }, 500);
        }, 2000);
      } else {
        alert("Update button was not found");
        return;
      }
    });

    const dialog = document.createElement("dialog");
    dialog.style =
      "border: none; border-radius: .4rem; max-width: 640px; width: 100%; display: none;";
    const dialog_container = document.createElement("div");
    dialog_container.style = "padding: 0.4rem; width: 70%;";

    const dialog_sidebar = document.createElement("div");
    dialog_sidebar.style =
      "padding: 0.4rem; width: 30%; display: flex; flex-direction: column; gap: 0.4rem;";

    const dialog_sidebar_title = document.createElement("h3");
    dialog_sidebar_title.textContent = "Import options";

    const dialog_sidebar_import_slug = document.createElement("button");
    dialog_sidebar_import_slug.textContent = "Import slug context";
    dialog_sidebar_import_slug.style = "text-align: left; font-size: 12px;";
    const dialog_sidebar_import_default = document.createElement("button");
    dialog_sidebar_import_default.textContent = "Import context";
    dialog_sidebar_import_default.style = "text-align: left; font-size: 12px;";

    dialog_sidebar.append(dialog_sidebar_title);
    dialog_sidebar.append(dialog_sidebar_import_slug);
    // dialog_sidebar.append(dialog_sidebar_import_default);

    const container_title_slug = document.createElement("div");
    container_title_slug.style =
      "display: flex; align-items: center; justify-content: space-between;";

    const container_title = document.createElement("div");
    container_title.style =
      "display: flex; align-items: center; justify-content: space-between;";

    const dialog_title = document.createElement("h2");
    dialog_title.textContent = "Add context";

    const dialog_title_slug = document.createElement("h2");
    dialog_title_slug.textContent = "Add slug context";

    const dialog_close = document.createElement("button");
    dialog_close.textContent = "x";
    dialog_close.addEventListener("click", () => {
      dialog.style.display = "none";
      dialog.close();
    });

    const container_body_slug = document.createElement("div");
    container_body_slug.style = "display: flex; flex-direction: column;";

    const container_body = document.createElement("div");
    container_body.style = "display: flex; flex-direction: column;";

    dialog_sidebar_import_default.addEventListener("click", () => {
      dialog_container.innerHTML = "";
      container_title.append(dialog_title);
      container_title.append(dialog_close);
      dialog_container.appendChild(container_title);
      dialog_container.appendChild(container_body);
    });

    dialog_sidebar_import_slug.addEventListener("click", () => {
      dialog_container.innerHTML = "";
      //   clear prev initialization
      container_title_slug.innerHTML = "";
      container_title_slug.append(dialog_title_slug);
      container_title_slug.append(dialog_close);
      dialog_container.appendChild(container_title_slug);
      dialog_container.appendChild(container_body_slug);
    });

    const label_slug = document.createElement("label");
    label_slug.style =
      "display: flex; align-items: center; justify-content: center; height: 160px; border-radius: 0.4rem; border: 2px dashed #7364df57; cursor: pointer;";
    const input_slug = document.createElement("input");
    input_slug.style = "display: none;";
    input_slug.accept = ".csv";
    input_slug.type = "file";
    input_slug.multiple = true;
    input_slug.addEventListener("change", () => {
      if (input_slug.files.length == 1) {
        const file = input_slug.files[0];
        Papa.parse(file, {
          complete: (results) => {
            const data = this.convertToObject(results.data);
            app.state.context = data;
            new Notification(
              "File: " + file.name + " has been added to context."
            );
            input.value = null;
            dialog.style.display = "none";
            dialog.close();
            return;
            if (!app.state.context) {
              app.state.context = data;
              new Notification(
                "File: " + file.name + " has been added to context."
              );
              input_slug.value = null;
              dialog.close();
            } else {
              const new_context = {};
              for (const key of Object.keys(app.state.context)) {
                if (key in data) {
                  if (typeof data[key] === "object") {
                    new_context[key] = {
                      ...app.state.context[key],
                      ...data[key],
                    };
                  } else {
                    new_context[key] = data[key];
                  }
                } else {
                  if (typeof app.state.context[key] === "object") {
                    new_context[key] = {
                      ...app.state.context[key],
                    };
                  } else {
                    new_context[key] = app.state.context[key];
                  }
                }
              }
              // Unpack old context in order to save not SLUG context data
              app.state.context = {
                ...app.state.context,
                ...new_context,
              };
              new Notification(
                "File: " + file.name + " has been added to context."
              );
              input.value = null;
              dialog.close();
            }
          },
          header: true,
        });
      }
    });
    label_slug.textContent = "Upload slug context";
    label_slug.append(input_slug);

    container_body_slug.append(label_slug);

    const label = document.createElement("label");
    label.style =
      "display: flex; align-items: center; justify-content: center; height: 160px; border-radius: 0.4rem; border: 2px dashed #7364df57; cursor: pointer;";
    const input = document.createElement("input");
    input.style = "display: none;";
    input.accept = ".csv";
    input.type = "file";
    input.multiple = true;
    input.addEventListener("change", () => {
      if (input.files.length == 1) {
        const file = input.files[0];
        Papa.parse(file, {
          complete: (results) => {
            const data = results.data;
            if (data.length >= 1) {
              if (!app.state.context) {
                app.state.context = data[0];
                new Notification(
                  "File: " + file.name + " has been added to context."
                );
                input_slug.value = null;
                dialog.close();
                dialog.style.display = "none";
              } else {
                app.state.context = {
                  ...app.state.context,
                  ...data[0],
                };
                new Notification(
                  "File: " + file.name + " has been added to context."
                );
                input.value = null;
                dialog.close();
                dialog.style.display = "none";
              }
            }
          },
          header: true,
        });
      }
    });
    label.textContent = "Upload context";
    label.append(input);
    container_body.append(label);

    container_title_slug.append(dialog_title);
    container_title_slug.append(dialog_close);
    dialog_container.appendChild(container_title_slug);
    dialog_container.appendChild(container_body_slug);
    dialog.append(dialog_sidebar);
    dialog.append(dialog_container);

    button.addEventListener("click", () => {
      dialog.style.display = "flex";
      dialog.showModal();
    });

    this.ui.AddButtonToContainer(button, "blockItem1");
    this.ui.AddButtonToContainer(newUpdateBtn, "blockItem1");
    this.ui.AddButtonToContainer(dialog, "blockItem1");
  },

  createFulfillNodes(nodes, context) {
    const _nodes = [];
    for (const textarea of nodes) {
      const fulfillNode = {
        node: this.ui.createButton({
          style: "margin-right: 6px;",
          title: "Fulfill",
          onClick: (ev) => {
            if (textarea.value.trim().length <= 10) {
              new Notification(
                "Pls select template. Minimum length 10 symbols."
              );
              return;
            }
            if (!this.state.context) {
              new Notification("Pls provide context.");
              return;
            }
            textarea.value = "";
            textarea.dispatchEvent(new Event("change"));
          },
        }),
        parent: textarea,
      };
      _nodes.push(fulfillNode);
    }
    return _nodes;
  },

  createClearAllBtn(_nodes, deviceType) {
    return this.ui.createButton({
      classname: "clearAllBtn",
      title: "Clear All " + deviceType,
      onClick: (ev) => {
        if (
          confirm(
            `Are you sure you want to clear the textarea for ${deviceType}?`
          )
        ) {
          for (let i = 0; i < _nodes.length; i++) {
            const item = _nodes[i];
            if (item.value.trim().length === 0) {
              new Notification(
                `The textarea value for ${deviceType} is empty!`
              );
              return;
            }
          }
          _nodes.forEach((item) => {
            item.value = "";
          });
        } else {
          return;
        }
      },
    });
  },

  handleTemplateSelect(ev) {
    const value = ev.target.value;
    this.selectedTemplateValue = value;

    if (value === "default") {
      return "";
    } else {
      return value;
    }
  },
  handleFullFillTemplate(textarea, context) {
    try {
      const template = textarea.value;
      const name = textarea.name;

      if (name in context && context[name] in this.state.context) {
        const _template = Mustache.render(
          template,
          this.state.context[context[name]]
        );
        return _template;
      } else {
        new Notification("Value: " + name + ". Not found in context.");
        return "";
      }
    } catch (error) {
      console.log(error);
      new Notification("Template render error");
      return "";
    }
  },

  createPasteAllBtn(_nodes, deviceType) {
    return this.ui.createButton({
      classname: "block-btns paste",
      title: "Paste all " + deviceType,
      onClick: (ev) => {
        if (!this.state.context) {
          new Notification("Pls provide context.");
          return;
        }

        const valueCheck = this.selectedTemplateValue;
        for (const { parent } of _nodes) {
          parent.value = valueCheck;
        }
      },
    });
  },

  createFulfillAllNodes(_nodes, context, deviceType) {
    return this.ui.createButton({
      title: "Fulfill all " + deviceType,
      classname: "block-btns",
      onClick: (ev) => {
        if (!this.state.context) {
          new Notification("Pls provide context.");
          return;
        }
        for (const { parent } of _nodes) {
          if (parent.value.trim().length <= 10) {
            new Notification(
              "Pls select template for" +
                parent.name +
                ". Minimum length 10 symbols."
            );
            continue;
          }
          parent.value = this.handleFullFillTemplate(parent, context);
          parent.dispatchEvent(new Event("change"));
        }
      },
    });
  },

  createSelectNodes(nodes) {
    const _nodes = [];

    const firstTextArea = nodes[0];

    const selectNode = {
      node: this.ui.createSelect({
        title: "Select template",
        classname: "block-select",
        options: this.getTemplates((templates) =>
          templates.filter((item) => item.is_active)
        ),
        onChange: (ev) => {
          firstTextArea.value = this.handleTemplateSelect(ev);
          firstTextArea.dispatchEvent(new Event("change"));
        },
      }),
      parent: firstTextArea,
    };

    _nodes.push(selectNode);

    this.attachSelectNodes(_nodes);
  },

  attachSelectNodes(nodes) {
    this.ui.AddButtonToContainer(nodes[0].node, "blockItem2");
  },

  attachFulfillNodes(nodes) {
    for (const { node, parent } of nodes) {
      parent.insertAdjacentElement("afterend", node);
    }
  },

  attachFulfillAllNode({ parent }, node) {
    this.ui.AddButtonToContainer(node, "blockItem2");
  },

  attachPasteAllFill({ parent }, node) {
    this.ui.AddButtonToContainer(node, "blockItem2");
  },

  attachClearAll(node) {
    this.ui.AddButtonToContainer(node, "blockItem3");
  },

  initUI(ui) {
    this.ui = ui.init();
    this.selectNodes = this.createSelectNodes(this.textareas);
    this.fulfillNodes = this.createFulfillNodes(
      this.textareas,
      this.languageAttributeToSlugDesktop
    );

    this.clearAllNodes = this.createClearAllBtn(this.textareas, "Desktop");
    this.attachClearAll(this.clearAllNodes);

    // this.attachFulfillNodes(this.fulfillNodes);

    this.pasteAllBtn = this.createPasteAllBtn(this.fulfillNodes, "Desktop");

    this.fulfillAllNodeDesktop = this.createFulfillAllNodes(
      this.fulfillNodes,
      this.languageAttributeToSlugDesktop,
      "Desktop"
    );

    if (this.fulfillNodes.length > 0) {
      this.attachPasteAllFill(this.fulfillNodes[0], this.pasteAllBtn);
      this.attachFulfillAllNode(
        this.fulfillNodes[0],
        this.fulfillAllNodeDesktop
      );
    }
  },

  initMobileUI(ui) {
    this.pasteAllBtnMobile.forEach(({ node }) => node.remove?.());
    this.fulfillMobileNodes.forEach(({ node }) => node.remove?.());

    this.selectMobileNodes = this.createSelectNodes(this.textareas_mobile);
    this.fulfillMobileNodes = this.createFulfillNodes(
      this.textareas_mobile,
      this.languageAttributeToSlugMobile
    );
    // this.attachFulfillNodes(this.fulfillMobileNodes);
    this.fulfillAllNodeMobile = this.createFulfillAllNodes(
      this.fulfillMobileNodes,
      this.languageAttributeToSlugMobile,
      "Mobile"
    );

    this.clearAllNodesMobile = this.createClearAllBtn(
      this.textareas_mobile,
      "Mobile"
    );

    this.pasteAllBtnMobile = this.createPasteAllBtn(
      this.fulfillMobileNodes,
      "Mobile"
    );

    if (this.fulfillMobileNodes.length > 0) {
      this.attachPasteAllFill(
        this.fulfillMobileNodes[0],
        this.pasteAllBtnMobile
      );
      this.attachFulfillAllNode(
        this.fulfillMobileNodes[0],
        this.fulfillAllNodeMobile
      );

      this.attachClearAll(this.clearAllNodesMobile);
    }
  },
};

app.init();
