const sort = {
  active: (templates) => templates.filter((item) => item.is_active),
};
// SELECT TEMPLATE RESPONSIBLE FOR LP AND NS RENDERING.

const DEFAULT_VARIABLES = {
  slug: "uk",
  origin: "https://www.beliani.co.uk",
  id: new URLSearchParams(window.location.search).get("id"),
  utm: "?utm_source=newsletter&utm_medium=email&utm_campaign=",
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
      node: dialog,
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
  },

  createSelect({ title, options, onChange, parent, position }) {
    const _options = [];
    const select = document.createElement("select");
    select.style = "margin-top: 0.4rem;";
    select.textContent = title;
    select.addEventListener("change", onChange);

    const unmountCB = () => select.remove();
    this.addToUnsubUnmount({
      unsubscribeCb: () => {
        select.removeEventListener("change", onChange);
      },
      unmountCb: unmountCB,
      mountCb: () => {
        this.addToUnsubUnmount({
          unmountCb: unmountCB,
        });
        return {
          parent,
          position,
          node: select,
        };
      },
    });
    for (const option of options) {
      _options.push(this.createOption(option));
    }
    const defaultOption = this.createOption({ title, value: "default" });
    defaultOption.defaultSelected = true;
    select.appendChild(defaultOption);
    select.append(..._options);
  },

  createOption({ title, html, parent, position }) {
    const option = document.createElement("option");
    option.textContent = title;
    option.value = html;
    this.addToUnsubUnmount({
      mountCb: () => {
        return {
          parent,
          position,
          node: option,
        };
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
// SELECT TEMPLATE RESPONSIBLE FOR LP AND NS RENDERING.

const app = {
  textareas: null,
  dialog: null,
  ui: null,
  components: null,

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
              ...(app.components &&
                app.getSlugComponents(app.components, "ukuk")),
              ...DEFAULT_VARIABLES,
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

      container.addEventListener("click", () => {
        // SELECT TEMPLATE RESPONSIBLE FOR LP AND NS RENDERING.
        onSelect(template.html);
        app.dialog.node.close();
        document.body.style.overflow = "auto";
      });

      container.append(container_header);
      container.append(description);
      return container;
    },
  },

  getSlugComponents(components, slug) {
    const parsedComponents = {};
    for (const key in components) {
      const component = components[key];
      if ("data" in component && "html" in component) {
        if (slug in component.data) {
          parsedComponents[key] = Mustache.render(component.html, {
            ...component.data[slug],
            ...DEFAULT_VARIABLES,
          });
        } else {
          parsedComponents[key] = "";
        }
      } else {
        new Notification("Component data or html not found.");
      }
    }
    return parsedComponents;
  },

  init() {
    this.ui = ui.init();
    const textareas = document.querySelectorAll(SELECTORS);
    if (!textareas.length) {
      new Notification("Selector " + SELECTORS + " not found.");
      return;
    }
    this.textareas = [...textareas];
    this.initUI();
    chrome.storage.local.get(
      ["context", "components"],
      ({ context, components }) => {
        this.components = components;
      },
    );
  },

  initUI() {
    for (const textarea of this.textareas) {
      const dialog = this.createDialogNode({
        parent: document.body,
        position: "beforeend",
        onSelect: (html) => {
          textarea.value = html;
        },
      });
      this.dialog = dialog;
      this.createButtonSelectNode({
        parent: textarea,
        onClick: dialog.showModal,
      });
    }
    this.mount();
  },

  mount() {
    // this.ui.unmount.forEach((fn) => {
    //   fn();
    // });
    // this.ui.unmount = [];
    this.ui.mount.forEach((fn) => {
      const node = fn();
      this.attachNode(node);
    });
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

  createButtonSelectNode({ parent, position, onClick }) {
    this.ui.createButton({
      style: "margin-left: 6px;",
      title: "Select template",
      onClick: onClick,
      parent,
      position,
    });
  },

  createDialogNode({ parent, position, onSelect }) {
    return this.ui.createDialog({
      title: "Select template",
      children: this.getTemplateCard(
        this.getTemplates(sort.active),
        "default",
        { onSelect },
      ),
      parent,
      position,
    });
  },

  getTemplateCard(templates, type = "defalut", { onSelect }) {
    const validCard =
      type in this.templateCards
        ? this.templateCards[type]
        : this.templateCards["defalut"];
    const cards = templates.map((template) =>
      validCard(template, { onSelect }),
    );
    return cards;
  },

  attachNodes(nodes) {
    for (const node of nodes) {
      this.attachNode(node);
    }
  },

  attachNode({ parent, node, position }) {
    parent.insertAdjacentElement(position || "afterend", node);
  },
};

app.init();
