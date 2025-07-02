const app_fulfill = {
  textareas: null,
  updateBtn: null,
  seller: null,
  shopIdToSlug: {
    1: "ch",
    3: "de",
    2: "uk",
    7: "fr",
    8: "at",
    10: "es",
    12: "pl",
    17: "nl",
    19: "be",
    21: "it",
    22: "pt",
    23: "se",
    24: "hu",
    25: "dk",
    26: "cz",
    27: "fi",
    28: "no",
    29: "sk",
    30: "ro",
  },
  languageToSlug: {
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
  },
  slugsToOrigin: {
    chde: "https://www.beliani.ch",
    chit: "https://www.beliani.ch",
    chfr: "https://www.beliani.ch",
    ukuk: "https://www.beliani.co.uk",
    dede: "https://www.beliani.de",
    frfr: "https://www.beliani.fr",
    atde: "https://www.beliani.at",
    eses: "https://www.beliani.es",
    plpl: "https://www.beliani.pl",
    nlnl: "https://www.beliani.nl",
    ptpt: "https://www.beliani.pt",
    itit: "https://www.beliani.it",
    sese: "https://www.beliani.se",
    huhu: "https://www.beliani.hu",
    dkdk: "https://www.beliani.dk",
    czcz: "https://www.beliani.cz",
    fifi: "https://www.beliani.fi",
    nono: "https://www.beliani.no",
    sksk: "https://www.beliani.sk",
    befr: "https://www.beliani.be",
    benl: "https://www.beliani.be",
    roro: "https://www.beliani.ro",
  },
  sellerToSlug: {
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
  },

  init() {
    const textareas = document.querySelectorAll(SELECTORS);
    this.updateBtn = document.querySelector("input[class~='update-btn']");
    this.seller = new URLSearchParams(window.location.search).get("shop_id");

    if (!textareas.length) {
      new Notification("Selector " + SELECTORS + " not found.");
      return;
    }
    this.textareas = [...textareas];

    if (!this.seller) {
      new Notification("Shop id not found.");
      return;
    }

    if (!(this.seller in this.shopIdToSlug)) {
      new Notification("Shop id not found in shopIdToSlug");
      console.log(
        `${this.seller} not found in ${JSON.stringify(this.shopIdToSlug)}`,
      );
      return;
    }

    if (!this.updateBtn) {
      new Notification("Update button not found.");
      return;
    }

    this.createFulfillTemplateButton();
  },

  createFulfillTemplateButton() {
    for (const textarea of this.textareas) {
      const btn = document.createElement("button");
      btn.style.fontSize = "11px";
      btn.type = "button";
      btn.textContent = "Fulfill template";
      btn.addEventListener("click", () => {
        const language = textarea
          .getAttribute("name")
          .split("[")[1]
          .replace("]", "");

        if (!(language in this.languageToSlug)) {
          new Notification("Language not found in languageToSlug");
          console.log(
            `${language} not found in ${JSON.stringify(this.languageToSlug)}`,
          );
          return;
        }
        this.render(textarea, language);
      });
      textarea.insertAdjacentElement("afterend", btn);
    }
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
        this.notify("Component data or html not found.");
      }
    }
    return parsedComponents;
  },

  render(textarea, language) {
    chrome.storage.local.get(
      ["context", "components", "selectedContext"],
      ({ context, components, selectedContext }) => {
        if (!context) {
          this.notify("Context not found.");
          return;
        }
        if (!selectedContext) {
          this.notify("Please select context.");
          return;
        }

        if (!(selectedContext in context)) {
          this.notify(
            `Selected context ${selectedContext} not found in context.`,
          );
          console.log(
            `Selected context ${selectedContext} not found in ${context}.`,
          );
          return;
        }

        const selectedContextValue = context[selectedContext];
        if (language in this.languageToSlug) {
          const languageSlug = this.languageToSlug[language];
          const sellerSlug = this.shopIdToSlug[this.seller];
          const combinedSlug = sellerSlug + languageSlug;
          const origin = this.slugsToOrigin[combinedSlug];

          if (combinedSlug in selectedContextValue) {
            const strings = {};
            for (const key in selectedContextValue) {
              const value = selectedContextValue[key];
              if (typeof value === "string") {
                strings[key] = value;
              }
            }

            const slug_components = this.getSlugComponents(
              components,
              combinedSlug,
            );

            const payload = {
              ...strings,
              ...slug_components,
              ...selectedContextValue[combinedSlug],
              ...DEFAULT_VARIABLES,
              // Overwrite slug and origin for DEFAULT_VARIABLES from selecte_template/index.js
              slug: languageSlug,
              origin,
            };
            localStorage.setItem(
              "payload",
              JSON.stringify({
                payload,
                time: new Date(),
              }),
            );

            const html = Mustache.render(textarea.value, payload);
            textarea.value = html;
            // UNCOMMENT LINE BELOW IF YOU WANT UPDATE BUTTOTN TO BE CLICKED ON FULFILL.
            // this.updateBtn.click();
          } else {
            const message = "Slug " + combinedSlug + " not found in context.";
            console.error(message);
            new Notification(message);
            localStorage.setItem("error", message);
            return;
          }
        } else {
          const message = language + " language not found in languageToSlug.";
          console.error(message);
          new Notification(message);
          localStorage.setItem("error", message);

          return;
        }
      },
    );
  },

  notify(message) {
    new Notification(message);
  },
};

app_fulfill.init();
