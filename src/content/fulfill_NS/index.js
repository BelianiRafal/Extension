const app_fulfill = {
  textarea: null,
  updateBtn: null,
  language: null,
  seller: null,
  source_btn: null,
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
    this.language = document.querySelector("select[name='lang']")?.value;
    this.textarea = document.querySelector("textarea[name=body]");
    this.updateBtn = document.querySelector("[name=update_body");
    this.seller = document.querySelector("select[name='seller']")?.value;
    this.source_btn = document.querySelector("#cke_19");

    if (
      !this.textarea ||
      !this.updateBtn ||
      !this.language ||
      !this.source_btn ||
      !this.seller
    ) {
      new Notification(
        "Language, Textarea, Update, Source or Seller not found.",
      );
      return;
    }
    this.createFulfillTemplateButton();
  },

  createFulfillTemplateButton() {
    const btn = document.createElement("button");
    btn.style.fontSize = "11px";
    btn.type = "button";
    btn.textContent = "Fulfill template";
    btn.addEventListener("click", () => {
      this.render();
    });
    this.updateBtn.parentNode.append(btn);
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

  render() {
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

				// console.log(`Selected context value: ${JSON.stringify(selectedContextValue)}`);

				console.log(`Wybrany jezyk: ${this.language}`)
				console.log(`lang to slug: ${JSON.stringify(this.languageToSlug)}`);

        if (this.language in this.languageToSlug) {
          const languageSlug = this.languageToSlug[this.language];
          const sellerSlug = this.sellerToSlug[this.seller];

          const combinedSlug = sellerSlug + languageSlug;
          
					const origin = this.slugsToOrigin[combinedSlug];

					console.log(`Language slug: ${languageSlug}`);
					console.log(`Seller slug: ${sellerSlug}`);
					console.log(`Origin: ${origin}`);

					console.log(`Combined slug: ${combinedSlug}`);

          if (combinedSlug in selectedContextValue) {

						// console.log(`Combined slug found in selected context value: ${JSON.stringify(selectedContextValue[combinedSlug])}`);

            const strings = {};
            for (const key in selectedContextValue) {
              const value = selectedContextValue[key];
              if (typeof value === "string") {
								console.log(`Adding string: ${key} = ${value}`);
                strings[key] = value;
              }
            }

            const slug_components = this.getSlugComponents(
              components,
              combinedSlug,
            );

						// prevent slug to become "plpl" or "ukuk" etc.
						// should be "pl" or "uk" ...
						// @fixes chde, befr, benl, chit etc. behavior
            let slugForUrls;

            if (sellerSlug === "at" && languageSlug === "de") {
              slugForUrls = "at";
            } else {
              slugForUrls =
                languageSlug !== sellerSlug ? combinedSlug : languageSlug;
            }

            const payload = {
              ...strings,
              ...slug_components,
              ...selectedContextValue[combinedSlug],
              ...DEFAULT_VARIABLES,
              // Overwrite slug and origin for DEFAULT_VARIABLES from selecte_template/index.js
              slug: slugForUrls,
              origin,
            };
            localStorage.setItem(
              "payload",
              JSON.stringify({
                payload,
                time: new Date(),
              }),
            );

            const html = Mustache.render(this.textarea.innerText, payload);
            const shop_content = document.querySelector(
              "select[name='shop_content_id']",
            )?.value;
            const payload_campaign = {
              campaign_id: DEFAULT_VARIABLES.id,
              body: html,
              shop_content: shop_content,
            };
            handleButtonBodyUpdate(payload_campaign);
            // if (!this.source_btn.classList.contains("cke_button_on")) {
            //   this.source_btn.click();
            // }
            // this.source_content = document.querySelector("#cke_1_contents");
            // this.source_content.click();
            // const textarea = this.source_content.querySelector("textarea");
            // if (textarea) {
            //   textarea.value = html;
            //   textarea.dispatchEvent(new Event("change"));
            //   this.updateBtn.click();
            // } else {
            //   const message = "Textarea not found.";
            //   console.error(message);
            //   new Notification(message);
            //   localStorage.setItem("error", message);

            //   return;
            // }
          } else {
            const message = "Slug " + combinedSlug + " not found in context.";
            console.error(message);
            new Notification(message);
            localStorage.setItem("error", message);
            return;
          }
        } else {
          const message = this.language + " language not found in slug.";
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

setTimeout(() => {
  if (!window.location.href.includes("validate_message=")) {
    app_fulfill.init();
  }
}, 2000);
