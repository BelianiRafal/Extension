const fulfillBody = {
  body: null,
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

  init(ui) {
    this.body = document.querySelector("textarea[name=body]");
    if (!this.body) {
      return;
    }
    const fulfillBody = ui.createTh({
      title: "Fulfill body",
      description: "Fullfill body content from current campaign.",
    });
    ui.header.append(fulfillBody);
    const rows = ui.tbody.querySelectorAll("tr");
    rows.forEach((row) => {
      const hrefs = row.querySelectorAll("a");

      const content = this.body.innerText;
      const id = row.querySelector("a");
      if (!id) {
        new Notification("Newsletter Id page not found.");
        return;
      }
      const _id = id.textContent.trim();
      const seller = row.children[1].innerText;
      const lang = row.children[2].innerText;

      const href_lp = (hrefs && [...hrefs]).filter((item) => {
        return item.href.includes("/shop_content.php?id");
      });

      const button = ui.createButton({
        title: "Fulfill body",
        onClick: () => {
          let LP_ID = null;
          if (href_lp.length) {
            LP_ID = new URL(location.origin + href_lp[0].href).searchParams.get(
              "id",
            );
          }

          if (content.length <= 10) {
            new Notification("Body content too small.");
            return;
          }
          this.render({
            id: _id,
            seller,
            lang,
            body: content,
            contentId: LP_ID,
          });
        },
      });
      row.append(ui.createColumn([button]));
    });
  },

  getSlugComponents(components, slug, payload) {
    const parsedComponents = {};
    for (const key in components) {
      const component = components[key];
      if ("data" in component && "html" in component) {
        if (slug in component.data) {
          parsedComponents[key] = Mustache.render(component.html, {
            ...component.data[slug],
            ...DEFAULT_VARIABLES,
            ...payload,
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

  render({ id, seller, lang, body, contentId }) {
    chrome.storage.local.get(
      ["context", "components", "selectedContext"],
      async ({ context, components, selectedContext }) => {
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
        if (lang in this.languageToSlug) {
          const languageSlug = this.languageToSlug[lang];
          const sellerSlug = this.sellerToSlug[seller];
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
              // Overwrite slug, id, origin for DEFAULT_VARIABLES from selecte_template/index.js
              {
                slug: languageSlug,
                origin,
                id,
              },
            );

						// prevent slug to become "plpl" or "ukuk" etc.
						// should be "pl" or "uk" ...
						// @fixes chde, befr, benl, chit etc. behavior
						const slugForUrls = languageSlug !== sellerSlug ? combinedSlug : languageSlug;

            const payload = {
              ...strings,
              ...slug_components,
              ...selectedContextValue[combinedSlug],
              ...DEFAULT_VARIABLES,
              // Overwrite slug and origin for DEFAULT_VARIABLES from selecte_template/index.js
              slug: slugForUrls,
              origin,
              id,
            };

            localStorage.setItem(
              "fill-body-payload",
              JSON.stringify({
                payload,
                time: new Date(),
              }),
            );
            try {
              const parsedTemplate = Mustache.parse(body);
              if (parsedTemplate.length < 2) {
                throw new Error("Firstly select template to");
              }
              const html = Mustache.render(body, payload);
              const payload_campaign = {
                campaign_id: id,
                body: html,
                shop_content: contentId,
              };
              localStorage.setItem(
                "fill-campaign-payload",
                JSON.stringify({
                  payload_campaign,
                  time: new Date(),
                }),
              );
              await handleButtonBodyUpdate(payload_campaign);
            } catch (error) {
              new Notification(error.message);
              return;
            }
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
};
