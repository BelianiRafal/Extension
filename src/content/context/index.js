const languageToSlug = {
  polish: "pl",
  portugal: "pt",
  spanish: "es",
  german: "de",
  germanDE: "de",
  Hungarian: "hu",
  finnish: "fi",
  french: "fr",
  czech: "cz",
  slovak: "sk",
  danish: "dk",
  italian: "it",
  swedish: "se",
  english: "uk",
  norsk: "no",
  dutch: "nl",
  romanian: "ro",
};

const sellerToOrigin = {
  Beliani: "https://www.beliani.ch",
  "Beliani UK": "https://www.beliani.co.uk",
  "Beliani DE": "https://www.beliani.de",
  "Beliani FR": "https://www.beliani.fr",
  "Beliani AT": "https://www.beliani.at",
  "Beliani SP": "https://www.beliani.es",
  "Beliani PL": "https://www.beliani.pl",
  "Beliani NL": "https://www.beliani.nl",
  "Beliani PT": "https://www.beliani.pt",
  "Beliani IT": "https://www.beliani.it",
  "Beliani SE": "https://www.beliani.se",
  "Beliani HU": "https://www.beliani.hu",
  "Beliani DK": "https://www.beliani.dk",
  "Beliani CZ": "https://www.beliani.cz",
  "Beliani FI": "https://www.beliani.fi",
  "Beliani NO": "https://www.beliani.no",
  "Beliani SK": "https://www.beliani.sk",
  "Beliani BE": "https://www.beliani.be",
  "Beliani RO": "https://www.beliani.ro",
};

const sellerToSlug = {
  Beliani: "ch",
  "Beliani UK": "uk",
  "Beliani DE": "de",
  "Beliani FR": "fr",
  "Beliani AT": "at",
  "Beliani SP": "es",
  "Beliani PL": "pl",
  "Beliani NL": "nl",
  "Beliani PT": "pt",
  "Beliani IT": "it",
  "Beliani SE": "se",
  "Beliani HU": "hu",
  "Beliani DK": "dk",
  "Beliani CZ": "cz",
  "Beliani FI": "fi",
  "Beliani NO": "no",
  "Beliani SK": "sk",
  "Beliani BE": "be",
  "Beliani RO": "ro",
};

const app_context = {
  init() {
    this.createContextBtn();
    this.clearContextBtn();
    this.previewContextBtn();
  },

  previewContextBtn() {
    chrome.storage.local.get(
      ["context", "components", "selectedContext"],
      ({ context, components, selectedContext }) => {
        let payload = {
          sellerSlug:
            sellerToSlug[
              document.querySelector("select[name='seller']")?.value ||
                "Beliani UK"
            ],
          languageSlug:
            languageToSlug[
              document.querySelector("select[name='lang']")?.value || "english"
            ],
          origin:
            sellerToOrigin[
              document.querySelector("select[name='seller']")?.value ||
                "Beliani UK"
            ],
          id: new URLSearchParams(window.location.search).get("id"),
          utm: "?utm_source=newsletter&utm_medium=email&utm_campaign=",
          picture_server_url: "https://pictureserver.net/static/2025/",
        };
        payload.slug = payload.sellerSlug + payload.languageSlug;

        const button = document.createElement("button");
        button.textContent = "Preview context";
        button.style =
          "position: fixed; top: 3.8rem; right: 1rem; font-size: 11px;";
        button.addEventListener("click", () => {
          const sidebar = document.createElement("div");
          sidebar.style =
            "position: fixed; height: 100vh; right: 0; top: 0; width: 360px; background: white; padding: 0.4rem; display: flex; flex-direction: column; gap: .6rem;";

          const sidebar_header = document.createElement("div");
          sidebar_header.style =
            "display: flex; justify-content: space-between; align-items: center;";

          const sidebar_title = document.createElement("h3");
          sidebar_title.style = "margin: 0;";
          sidebar_title.textContent = "Context";

          const sidebar_context_actions = document.createElement("div");
          sidebar_context_actions.style =
            "display: flex; gap: 2px; align-items: center;";

          const close_sidebar = document.createElement("button");
          close_sidebar.title = "Close sidebar";
          close_sidebar.style =
            "border: none; background: transparent; cursor: pointer;";
          close_sidebar.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
          close_sidebar.addEventListener("click", () => {
            sidebar.remove();
          });

          const sidebar_body = document.createElement("div");
          sidebar_body.style =
            "display: flex; flex-direction: column; gap: 6px;";

          const removeContextButton = document.createElement("button");
          removeContextButton.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>';
          removeContextButton.style =
            "border: none; background: transparent; cursor: pointer;";

          const select_context = document.createElement("select");
          select_context.style =
            "text-transform: capitalize; height: 22px; border-radius: 2px;";
          const options = [];
          const contextKeys = Object.keys(context || {})
          for (const key of contextKeys) {
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
          option.textContent = "Select context to preview";
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
              const selectedContext = context[value];
              // Take from context only string values.
              const stringContext = {};
              for (const [key, value] of Object.entries(selectedContext)) {
                if (typeof value !== "string") continue;
                stringContext[key] = value;
              }

              // Take from context slug value.
              if (!(payload.slug in selectedContext)) {
                new Notification(
                  payload.slug + " not found in selected context."
                );
                console.log(payload.slug + " not found in: ", selectedContext);
              } else {
                const contextSlug = selectedContext[payload.slug];
                payload = {
                  ...stringContext,
                  ...contextSlug,
                };
              }
            }
            const nodes = [];
            for (const key in payload) {
              let value = payload[key];
              if (typeof value !== "string") {
                value = JSON.stringify(value);
              }
              const label = document.createElement("label");
              label.style =
                "display: flex; flex-direction: column; gap: 2px; cursor: copy;";
              label.addEventListener("click", () => {
                navigator.clipboard.writeText("{{" + value + "}}");
              });

              const title = document.createElement("span");
              title.textContent = key;
              title.style = "text-transform: capitalize;";

              const input = document.createElement("input");
              input.style = "height: 16px;";
              input.disabled = true;
              input.value = value;
              input.title = value;

              label.append(title);
              label.append(input);
              nodes.push(label);
            }
            sidebar_body.innerHTML = "";
            sidebar_body.append(...nodes);
            removeContextButton.onclick = () => {
              if (
                confirm(
                  `Are you sure? Context data for ${value} will be removed.`
                )
              ) {
                this.handleRemoveContext({
                  context,
                  selectedContext,
                  sidebar,
                  value,
                });
              }
            };
          });

          if (selectedContext) {
            const lowerCaseContextTitle = selectedContext.toLowerCase();
            if (!(lowerCaseContextTitle in context)) {
              new Notification(selectedContext + " not found in context.");
            } else {
              const _selectedContext = context[lowerCaseContextTitle];
              // Take from context only string values.
              const stringContext = {};
              for (const [key, value] of Object.entries(_selectedContext)) {
                if (typeof value !== "string") continue;
                stringContext[key] = value;
              }

              // Take from context slug value.
              if (!(payload.slug in _selectedContext)) {
                new Notification(
                  payload.slug + " not found in selected context."
                );
                console.log(payload.slug + " not found in: ", _selectedContext);
              } else {
                const contextSlug = _selectedContext[payload.slug];
                payload = {
                  ...stringContext,
                  ...contextSlug,
                };
              }
            }

            const nodes = [];
            for (const key in payload) {
              let value = payload[key];
              if (typeof value !== "string") {
                value = JSON.stringify(value);
              }
              const label = document.createElement("label");
              label.style =
                "display: flex; flex-direction: column; gap: 2px; cursor: copy;";
              label.addEventListener("click", () => {
                navigator.clipboard.writeText("{{" + value + "}}");
              });

              const title = document.createElement("span");
              title.textContent = key;
              title.style = "text-transform: capitalize;";

              const input = document.createElement("input");
              input.style = "height: 16px;";
              input.disabled = true;
              input.value = value;
              input.title = value;

              label.append(title);
              label.append(input);
              nodes.push(label);
            }
            sidebar_body.append(...nodes);
            removeContextButton.onclick = () => {
              if (
                confirm(
                  `Are you sure? Context data for ${selectedContext} will be removed.`
                )
              ) {
                this.handleRemoveContext({
                  context,
                  selectedContext,
                  sidebar,
                  value: selectedContext,
                });
              }
            };
          }

          sidebar_context_actions.appendChild(select_context);
          if (contextKeys.length) {
            sidebar_context_actions.appendChild(removeContextButton);
          }
          sidebar_context_actions.appendChild(close_sidebar);
          sidebar_header.appendChild(sidebar_title);
          sidebar_header.appendChild(sidebar_context_actions);

          sidebar.appendChild(sidebar_header);
          sidebar.appendChild(sidebar_body);
          document.body.append(sidebar);
        });

        document.body.append(button);
      }
    );
  },

  handleRemoveContext({ context, sidebar, selectedContext, value }) {
    delete context[value];
    chrome.storage.local.set(
      {
        ...(selectedContext === value && { selectedContext: null }),
        context: {
          ...context,
        },
      },
      () => {
        new Notification(`Context data for ${value} removed.`);
        sidebar.remove();
      }
    );
  },

  clearContextBtn() {
    const button = document.createElement("button");
    button.textContent = "Clear context";
    button.style =
      "position: fixed; top: 2.4rem; right: 1rem; font-size: 11px;";
    button.addEventListener("click", () => {
      if (confirm("Are you sure? All context data will be removed.")) {
        chrome.storage.local.clear();
      }
    });
    document.body.append(button);
  },

  contextDialog({ sidebarTitle, dialogTitle, options }) {
    const dialog = document.createElement("dialog");
    dialog.style =
      "border: none; border-radius: .4rem; max-width: 640px; width: 100%; display: none; gap: .4rem;";
    const dialog_container = document.createElement("div");
    dialog_container.style =
      "width: 70%; display: flex; flex-direction: column; gap: 0.4rem;";

    const dialog_sidebar = document.createElement("div");
    dialog_sidebar.style =
      "width: 30%; display: flex; flex-direction: column; gap: 0.4rem;";

    const dialog_sidebar_title = document.createElement("h3");
    dialog_sidebar_title.style = "margin: 0;";
    dialog_sidebar_title.textContent = sidebarTitle;

    const dialog_sidebar_container = document.createElement("div");
    dialog_sidebar_container.style =
      "display: flex; flex-direction: column; gap: .2rem; height: 280px; overflow-y: auto; padding: 0.2rem; background: #ececec; border-radius: 0.2rem;";

    const container_body = document.createElement("div");
    container_body.style =
      "display: flex; flex-direction: column; gap: 0.4rem; height: 100%";
    const container_body_content = document.createElement("div");
    container_body_content.style =
      "height: 100%; display: flex; flex-direction: column; gap: 4px;";

    const sidebar_options = [];
    for (const element of options) {
      const state = {
        title: "",
      };
      const import_option = document.createElement("button");
      import_option.style =
        "border: none; background: white; text-align: left; font-size: 12px; padding: 0.4rem; border-radius: 0.2rem; cursor: pointer;";
      import_option.textContent = element.title;
      import_option.addEventListener("click", () => {
        container_body_content.innerHTML = "";
        const label_slug = document.createElement("label");
        label_slug.style =
          "display: flex; align-items: center; justify-content: center; height: 100%; border-radius: 0.4rem; border: 2px dashed #7364df57; cursor: pointer;";
        const input_slug = document.createElement("input");
        input_slug.style = "display: none;";
        input_slug.accept = ".csv";
        input_slug.type = "file";
        input_slug.multiple = false;

        label_slug.textContent = element.labelTitle;
        label_slug.append(input_slug);

        const container_body_context_title = document.createElement("div");
        container_body_context_title.style =
          "display: flex; flex-direction: column; gap: 2px";

        const label = document.createElement("label");
        label.textContent = "Context name";
        label.htmlFor = "context title";
        const input = document.createElement("input");
        input.style =
          "height: 26px; width: 100%; border-radius: 4px; box-sizing: border-box; border: 2px solid #ececec;";
        input.id = "context title";
        input.addEventListener("input", (e) => {
          state.title = e.target.value;
        });

        input_slug.addEventListener("change", () => {
          if (state.title.trim().length < 4) {
            new Notification("Context title too small.");
          } else {
            element.onSelect({
              files: input_slug.files,
              title: state.title,
            });
          }
          input_slug.value = null;
        });

        container_body_context_title.append(label);
        container_body_context_title.append(input);

        container_body_content.append(container_body_context_title);
        container_body_content.append(label_slug);
      });
      sidebar_options.push(import_option);
    }
    dialog_sidebar_container.append(...sidebar_options);

    dialog_sidebar.append(dialog_sidebar_title);
    dialog_sidebar.append(dialog_sidebar_container);

    const container_header = document.createElement("div");
    container_header.style =
      "display: flex; align-items: center; justify-content: space-between;";

    const dialog_title = document.createElement("h3");
    dialog_title.style = "margin: 0;";
    dialog_title.textContent = dialogTitle;

    const dialog_close = document.createElement("button");
    dialog_close.textContent = "x";
    dialog_close.addEventListener("click", () => {
      dialog.close();
      dialog.style.display = "none";
    });

    container_header.append(dialog_title);
    container_header.append(dialog_close);

    container_body.append(container_header);
    container_body.append(container_body_content);

    dialog_container.appendChild(dialog_sidebar);
    dialog_container.appendChild(container_body);
    dialog.append(dialog_sidebar, dialog_container);
    return dialog;
  },

  createContextBtn() {
    const button = document.createElement("button");
    button.textContent = "Add context";
    button.style = "position: fixed; top: 1rem; right: 1rem; font-size: 11px;";

    const dialog = this.contextDialog({
      dialogTitle: "Add context",
      sidebarTitle: "Import options",
      options: [
        {
          title: "Import slug content",
          labelTitle: "Upload slug content",
          onSelect: ({ files, title }) => {
            const lowerCaseTitle = title.toLowerCase();
            if (files.length == 1) {
              const file = files[0];
              Papa.parse(file, {
                complete: (results) => {
                  const data = this.convertToObject(results.data);
                  chrome.storage.local.get(["context"], ({ context }) => {
                    if (lowerCaseTitle in (context || {})) {
                      chrome.storage.local.set(
                        {
                          context: {
                            ...context,
                            [lowerCaseTitle]: {
                              ...context[lowerCaseTitle],
                              ...data,
                            },
                          },
                        },
                        () => {
                          new Notification(
                            "File: " + file.name + " has been added to context."
                          );
                          dialog.close();
                          location.reload()
                        }
                      );
                    } else {
                      chrome.storage.local.set(
                        {
                          context: {
                            ...(context || {}),
                            [lowerCaseTitle]: data,
                          },
                        },
                        () => {
                          new Notification(
                            "File: " + file.name + " has been added to context."
                          );
                          dialog.close();
                          location.reload()
                        }
                      );
                    }
                  });
                },
                header: true,
              });
            }
          },
        },
        {
          title: "Import content",
          labelTitle: "Upload content",
          onSelect: ({ files, title }) => {
            const lowerCaseTitle = title.toLowerCase();
            if (files.length == 1) {
              const file = files[0];
              Papa.parse(file, {
                complete: (results) => {
                  const data = results.data[0];
                  chrome.storage.local.get(["context"], ({ context }) => {
                    if (lowerCaseTitle in (context || {})) {
                      chrome.storage.local.set(
                        {
                          context: {
                            ...context,
                            [lowerCaseTitle]: {
                              ...context[lowerCaseTitle],
                              ...data,
                            },
                          },
                        },
                        () => {
                          new Notification(
                            "File: " + file.name + " has been added to context."
                          );
                          dialog.close();
                          location.reload()
                        }
                      );
                    } else {
                      chrome.storage.local.set(
                        {
                          context: {
                            ...(context || {}),
                            [lowerCaseTitle]: data,
                          },
                        },
                        () => {
                          new Notification(
                            "File: " + file.name + " has been added to context."
                          );
                          dialog.close();
                          location.reload()
                        }
                      );
                    }
                  });
                },
                header: true,
              });
            }
          },
        },
      ],
    });

    button.addEventListener("click", () => {
      dialog.showModal();
      dialog.style.display = "flex";
    });
    document.body.append(dialog);
    document.body.append(button);
  },

  convertToObject(CSV) {
    const object_data = {};
    for (const element of CSV) {
      if (!("slug" in element)) {
        new Notification("slug required");
        return;
      }
      for (const key of Object.keys(element)) {
        // CHeck if SLUG UK already exist in object_data OBJECT
        // If so, unwrap content and add new content
        if (element["slug"] in object_data) {
          // if (typeof object_data[element["slug"]] === "object") {
          object_data[element["slug"]] = {
            ...object_data[element["slug"]],
            [key]: this.handleKey(key, element),
          };
          // } else {
          //   object_data[element["slug"]] = this.handleKey(key, element)
          // }
        } else {
          // SET UK slug to object_data OBJECT
          // 1
          object_data[element["slug"]] = {
            [key]: this.handleKey(key, element),
          };
        }
      }
    }
    return object_data;
  },

  handleKey(key, data) {
    if (key.startsWith("JSON")) {
      try {
        const value = JSON.parse(data[key]);
        return value;
      } catch (error) {
        new Notification("JSON field is not valid.");
      }
    } else {
      return data[key];
    }
  },
};

app_context.init();
