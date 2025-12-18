const sort = {
  active: (templates) => templates.filter((item) => item.is_active),
};

const ui = {
  mount: [],
  unmount: [],
  unsubscribe: [],

  createDialog({ title, children, parent, position }) {
    const dialog = document.createElement("dialog");
    dialog.style =
      "border: none; border-radius: .4rem; max-width: 440px; width: 100%; display: none; flex-direction: column; gap: 0.8rem;";
    const dialog_container = document.createElement("div");
    dialog_container.style =
      "display: flex; flex-direction: column; gap: .4rem";

    const container_title = document.createElement("div");
    container_title.style =
      "display: flex; align-items: center; justify-content: space-between;";

    const dialog_title = document.createElement("h3");
    dialog_title.style = "margin: 0;";
    dialog_title.textContent = title;

    const dialog_close = document.createElement("button");
    dialog_close.textContent = "x";
    dialog_close.addEventListener("click", () => {
      dialog.style.display = "none";
      dialog.close();
      document.body.style.overflow = "auto";
    });

    const container_body = document.createElement("div");

    const dialog_scroll = document.createElement("div");
    dialog_scroll.style =
      "height: 260px; overflow-y: auto; padding: 0.4rem; border-radius: 0.2rem; background: #ececec; display: flex; flex-direction: column; gap: 0.4rem";

    dialog_scroll.append(...children);
    container_body.append(dialog_scroll);

    container_title.append(dialog_title);
    container_title.append(dialog_close);

    dialog_container.append(container_title);
    dialog_container.append(container_body);
    dialog.append(dialog_container);

    const unmountCB = () => {
      dialog.remove();
    };
    this.addToUnsubUnmount({
      unsubscribeCb: () => {
        dialog_container.removeEventListener("click", onClick);
      },
      unmountCb: unmountCB,
      mountCb: () => {
        this.addToUnsubUnmount({
          unmountCb: unmountCB,
        });
        return {
          parent,
          position,
          node: dialog,
        };
      },
    });
    return {
      showModal() {
        dialog.showModal();
        dialog.style.display = "flex";
        document.body.style.overflow = "hidden";
      },
      closeModal() {
        dialog.close();
        dialog.style.display = "none";
      },
    };
  },

  createButton({ title, onClick, style, parent, position }) {
    const btn = document.createElement("button");
    btn.style = "font-size: 11px; " + style || "";
    btn.type = "button";
    btn.textContent = title;
    btn.addEventListener("click", onClick);
    const unmountCB = () => btn.remove();
    this.addToUnsubUnmount({
      unsubscribeCb: () => {
        btn.removeEventListener("click", onClick);
      },
      unmountCb: unmountCB,
      mountCb: () => {
        this.addToUnsubUnmount({
          unmountCb: unmountCB,
        });
        return {
          parent,
          position,
          node: btn,
        };
      },
    });
    return btn;
  },

  createSelect({ title, options, onChange }) {
    const _options = [];
    const select = document.createElement("select");
    select.textContent = title;
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

  addToUnsubUnmount({ unsubscribeCb, unmountCb, mountCb }) {
    if (unsubscribeCb) {
      this.unsubscribe.push(unsubscribeCb);
    }
    if (unmountCb) {
      this.unmount.push(unmountCb);
    }
    if (mountCb) {
      this.mount.push(mountCb);
    }
  },

  init() {
    return ui;
  },
};

const app = {
  selectedTemplate: null,
  selectNodes: [],
  selectMobileNodes: [],

  fulfillNodes: [],
  fulfillMobileNodes: [],

  textareas: null,
  textareas_mobile: null,

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
    "html[german]": "chde",
    "html[germanDE]": "de",
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
    "mobile_html[german]": "chde",
    "mobile_html[germanDE]": "de",
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

  initDesktop() {
    this.showMobile =
      document.querySelector("input[class=mobile-show]") ||
      document.querySelector("input[value='Show Mobile Banners']");
    this.textareas = document.querySelectorAll("textarea[name^=html]");
    if (!this.textareas) {
      new Notification("Desktop textareas not found.");
      return;
    }
    this.initUI(ui);
    this.addListeners();
    this.createContextBtn();
  },

  initMobile() {
    this.textareas_mobile = document.querySelectorAll(
      "textarea[name^=mobile_html]",
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

  handleTemplateSelect(ev) {
    const value = ev.target.value;
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
          this.state.context[context[name]],
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

  createContextBtn() {
    const button = document.createElement("button");
    button.textContent = "Add context";
    button.style = "position: fixed; top: 1rem; right: 1rem;";

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
              "File: " + file.name + " has been added to context.",
            );
            input.value = null;
            dialog.close();
            return;
            if (!app.state.context) {
              app.state.context = data;
              new Notification(
                "File: " + file.name + " has been added to context.",
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
                "File: " + file.name + " has been added to context.",
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
                  "File: " + file.name + " has been added to context.",
                );
                input_slug.value = null;
                dialog.close();
              } else {
                app.state.context = {
                  ...app.state.context,
                  ...data[0],
                };
                new Notification(
                  "File: " + file.name + " has been added to context.",
                );
                input.value = null;
                dialog.close();
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
    document.body.append(button);
    document.body.append(dialog);
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
                "Pls select template. Minimum length 10 symbols.",
              );
              return;
            }
            if (!this.state.context) {
              new Notification("Pls provide context.");
              return;
            }
            textarea.value = this.handleFullFillTemplate(textarea, context);
            textarea.dispatchEvent(new Event("change"));
          },
        }),
        parent: textarea,
      };
      _nodes.push(fulfillNode);
    }
    return _nodes;
  },

  createFulfillAllNodes(_nodes, context) {
    return this.ui.createButton({
      style: "margin-right: 6px;",
      title: "Fulfill all",
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
                ". Minimum length 10 symbols.",
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
    for (const textarea of nodes) {
      const selectNode = {
        node: this.ui.createSelect({
          title: "Select template",
          options: this.getTemplates((templates) =>
            templates.filter((item) => item.is_active),
          ),
          onChange: (ev) => {
            textarea.value = this.handleTemplateSelect(ev);
            textarea.dispatchEvent(new Event("change"));
          },
        }),
        parent: textarea,
      };
      _nodes.push(selectNode);
    }
    this.attachSelectNodes(_nodes);
  },

  attachSelectNodes(nodes) {
    for (const { node, parent } of nodes) {
      parent.insertAdjacentElement("afterend", node);
    }
  },

  attachFulfillNodes(nodes) {
    for (const { node, parent } of nodes) {
      parent.insertAdjacentElement("afterend", node);
    }
  },

  attachFulfillAllNode({ parent }, node) {
    parent.insertAdjacentElement("afterend", node);
  },

  getTemplateCard(templates, type = "defalut", props) {
    const validCard =
      type in this.templateCards
        ? this.templateCards[type]
        : this.templateCards["defalut"];
    const cards = templates.map((template) => validCard(template, props));
    return cards;
  },

  getTemplates(fn) {
    const VALID_TEMPLATES = TEMPLATES.filter((template) => {
      if ("fallback" in template) {
        return true;
      } else {
        return false;
      }
    });
    return fn(VALID_TEMPLATES);
  },

  createDialogNode({ parent, position, onSelect }) {
    return this.ui.createDialog({
      title: "Select template",
      children: this.getTemplateCard(this.getTemplates(sort.active), null, {
        onSelect,
      }),
      parent,
      position,
    });
  },

  createButtonSelectNode({ parent, position, onClick }) {
    this.ui.createButton({
      style: "margin-left: 2px;",
      title: "Select template",
      onClick: onClick,
      parent,
      position,
    });
  },

  templateCards: {
    defalut: (template, { onSelect }) => {
      const container = document.createElement("div");
      container.style =
        "padding: .4rem; display: flex; flex-direction: column; gap: 0.4rem; background: #fff; border-radius: 0.2rem; cursor: pointer;";

      const container_header = document.createElement("div");
      container_header.style =
        "display: flex; align-items: center; justify-content: space-between";

      const container_header_actions = document.createElement("div");
      container_header.style =
        "display: flex; align-items: center; justify-content: space-between; gap: 4px;";

      const title = document.createElement("h3");
      title.textContent = template?.title || "Untitled";
      title.style = "margin: 0";

      const preview_btn = document.createElement("button");
      preview_btn.title = "Preview template";
      preview_btn.style = "background: none; border: none; cursor: pointer;";
      preview_btn.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>';
      preview_btn.addEventListener(
        "click",
        (ev) => {
          ev.stopPropagation();
          if ("fallback" in template && "html" in template) {
            const win = window.open("", "_blank");

            win.document.body.innerHTML = Mustache.render(template.html, {
              ...template.fallback,
            });
            win.document.title = template.title;
          } else {
            new Notification("Fallback not found in template.");
          }
        },
        {},
      );

      const get_template_context = document.createElement("button");
      get_template_context.title = "Copy template placeholders";
      get_template_context.style =
        "border: none; background: transparent; cursor: pointer;";
      get_template_context.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>';
      get_template_context.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const placeholders = [];
        for (const [key, value] of Object.entries(template.fallback)) {
          placeholders.push(key);
        }
        navigator.clipboard.writeText(placeholders.join(","));
      });

      container_header_actions.append(preview_btn);
      container_header_actions.append(get_template_context);

      container_header.append(title);
      container_header.append(container_header_actions);

      const description = document.createElement("p");
      description.innerText = template.description || "";
      description.style = "margin: 0; height: 60px; overflow-y: auto;";

      container.addEventListener("click", () => onSelect(template.html));

      container.append(container_header);
      container.append(description);
      return container;
    },
  },

  mount() {
    this.ui.mount.forEach((fn) => {
      const node = fn();
      this.attachNode(node);
    });
  },

  attachNode({ parent, node, position }) {
    parent.insertAdjacentElement(position || "afterend", node);
  },

  initUI(ui) {
    this.ui = ui.init();
    for (const textarea of this.textareas) {
      const dialog = this.createDialogNode({
        parent: document.body,
        position: "beforeend",
        onSelect: (template) => {
          textarea.value = template;
          dialog.closeModal();
        },
      });
      this.createButtonSelectNode({
        parent: textarea,
        onClick: dialog.showModal,
      });
    }
    this.mount();

    // this.selectNodes = this.createSelectNodes(this.textareas);
    this.fulfillNodes = this.createFulfillNodes(
      this.textareas,
      this.languageAttributeToSlugDesktop,
    );
    this.attachFulfillNodes(this.fulfillNodes);
    this.fulfillAllNodeDesktop = this.createFulfillAllNodes(
      this.fulfillNodes,
      this.languageAttributeToSlugDesktop,
    );
    if (this.fulfillNodes.length > 0) {
      this.attachFulfillAllNode(
        this.fulfillNodes[0],
        this.fulfillAllNodeDesktop,
      );
    }
  },

  initMobileUI(ui) {
    this.selectMobileNodes = this.createSelectNodes(this.textareas_mobile);
    this.fulfillMobileNodes = this.createFulfillNodes(
      this.textareas_mobile,
      this.languageAttributeToSlugMobile,
    );
    this.attachFulfillNodes(this.fulfillMobileNodes);
    this.fulfillAllNodeMobile = this.createFulfillAllNodes(
      this.fulfillMobileNodes,
      this.languageAttributeToSlugMobile,
    );
    if (this.fulfillMobileNodes.length > 0) {
      this.attachFulfillAllNode(
        this.fulfillMobileNodes[0],
        this.fulfillAllNodeMobile,
      );
    }
  },
};

app.init();
