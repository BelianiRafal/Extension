// TODO
// Create newsletter family table with fixed position depends from provided main_id
// Update Subject line and Body of selected campaign.
// Make campaigns dropdown. details tag.
// Create button to wrap all campaigns

class IssueCampaignId {
  id;
  issue_id;
  main_id;
  constructor({ id, issue_id, main_id }) {
    this.id = id;
    this.issue_id = issue_id;
    this.main_id = main_id;
  }
}

class UpdateSubjectPayload {
  seller;
  lang;
  servers;
  subject;
  id;
  constructor({ id, lang, seller, servers, subject }) {
    this.id = id;
    this.lang = lang;
    this.seller = seller;
    this.servers = servers;
    this.subject = subject;
  }
}

const app = {
  ids: {},
  issue_id: window.location.pathname.match(/\d+/),
  main_id: null,
  setup_btn: null,
  details: [],
  countries: [
    "CHDE",
    "CHFR",
    "AT",
    "CZ",
    "DE",
    "DK",
    "FI",
    "FR",
    "HU",
    "IT",
    "NL",
    "NO",
    "PL",
    "PT",
    "SE",
    "SK",
    "ES",
    "UK",
  ],
  sellers: {
    CHDE: [60, 64, 65, 67],
    ES: [60, 64, 65, 67],
    AT: [60, 64, 65, 67],
    IT: [60, 64, 65, 67],
    UK: [60, 64, 65, 67],
    FR: [60, 64, 65, 67],
    DE: [60, 64, 65, 67],
    HU: [60, 64, 65, 67],
    PT: [60, 64, 65, 67],
    PT: [60, 64, 65, 67],
    SE: [60, 64, 65, 67],
    NL: [66],
    DK: [60, 64, 65, 67],
    CZ: [60, 64, 65, 67],
    FI: [60, 64, 65, 67],
    NO: [60, 64, 65, 67],
    SK: [60, 64, 65, 67],
  },

  init() {
    // chrome.storage.local.clear()
    // chrome.storage.local.remove()
    try {
      chrome.storage.local.get(["data"], ({ data }) => {
        if (data && "issue_campaign" in data) {
          const campaign = data.issue_campaign.find(
            (item) => Number(item.issue_id) === Number(this.issue_id)
          );
          if (!campaign) {
            this.addSetupCampaignButton();
            return;
          }
          const _campaign = new IssueCampaignId(campaign);
          this.main_id = _campaign.main_id;
          this.createUI();
        } else {
          this.addSetupCampaignButton();
        }
      });
    } catch (error) {
      console.error(error);
      new Notification("Please, reload page.");
    }
  },

  addSetupCampaignButton() {
    const button = document.createElement("button");
    button.textContent = "Setup campaign";
    button.style =
      "position: fixed; top: 2rem; z-index: 1000; right: 2rem; font-size: 11px;";
    button.addEventListener("click", () => this.setCampaign(this.issue_id[0]));
    document.body.append(button);
    this.setup_btn = button;
  },

  generateIds() {
    let id = this.main_id;
    const relativeIdToCountires = {};

    this.countries.forEach((country) => {
      relativeIdToCountires[country] = Number(id);
      id++;
    });

    this.ids = relativeIdToCountires;
  },

  createCampaigns() {
    for (const country of this.countries) {
      const state = {
        title: "",
      };
      const details = document.createElement("details");
      const summary = document.createElement("summary");
      const a = document.createElement("a");
      details.style =
        "background: #ffffff; border-radius: 0.2rem; padding: 0.4rem; cursor: pointer;";

      const button_updateSubject = document.createElement("button");
      button_updateSubject.textContent = "Set subject";

      const button_updateBody = document.createElement("button");
      button_updateBody.textContent = "Set body";

      const container = document.createElement("div");
      container.style =
        "display: flex; flex-direction: column; gap: 6px; padding-top: 4px;";
      const subject = this.createField({
        title: "Subject line",
        placeholder: "Update subject line",
        input_tag: "input",
        cb: (ev) => {
          state.title = ev.target.value;
        },
      });
      const body = this.createField({
        title: "Body",
        placeholder: "Update body",
        input_tag: "textarea",
      });
      container.append(subject.label);
      container.append(button_updateSubject);
      container.append(body.label);
      container.append(button_updateBody);

      button_updateSubject.addEventListener("click", () => {
        if (state.title.trim().length <= 4) {
          new Notification("Subject line too short. 4 symbols required.");
        } else {
          console.log(
            new UpdateSubjectPayload({
              id: this.ids[country],
              servers: this.sellers[country],
              subject: state.title,
              seller: "Beliani PL",
              lang: "polish",
            })
          );
          subject.text_input.value = "";
        }
      });

      button_updateBody.addEventListener("click", () => {
        return new Notification("Under development");
        if (state.title.trim().length <= 4) {
          new Notification("Subject line too short. 4 symbols required.");
        } else {
          handleButtonSubjectUpdate({ campaign_id: id, state, seller });
          subject.text_input.value = "";
        }
      });

      a.textContent = country;
      a.target = "_blank";
      a.href =
        "https://www.prologistics.info/news_email.php?id=" + this.ids[country];
      summary.append(a);
      details.append(summary);
      details.append(container);
      this.details.push(details);
    }
  },

  renderCampaigns() {
    try {
      const familyContainer = document.createElement("div");
      familyContainer.style =
        "position: fixed; top: 2rem; right: 2rem; display: flex; width: 20vw; gap: 6px; flex-direction: column;";
      familyContainer.append(...this.details);
      document.body.append(familyContainer);
    } catch (error) {
      console.error(error);
      new Notification("Please, reload page.");
    }
  },

  createField({ title, placeholder, input_tag, cb }) {
    const label = document.createElement("label");
    const text_input = document.createElement(input_tag);

    text_input.placeholder = placeholder;
    text_input.addEventListener("change", cb);

    if (input_tag === "textarea") {
      text_input.style = "resize: none; width: 100%; height: 400px;";
    }

    label.style = "display: flex; flex-direction: column; gap: 2px;";
    label.textContent = title;
    label.append(text_input);

    return { label, text_input };
  },

  setCampaign(issue_id) {
    const id = prompt("Please provide main_id: ");
    if (!id) {
      return new Notification("Id is not valid.");
    }

    if (id.trim().length === 0) {
      return new Notification("Id is not valid.");
    }

    if (isNaN(Number(id))) {
      return new Notification("Id is not valid.");
    }

    this.main_id = id;
    try {
      chrome.storage.local.get(["data"], ({ data }) => {
        if (issue_id.length !== 6) {
          return new Notification("Issue id is not correct.");
        }
        const campaign = new IssueCampaignId({
          id: Date.now(),
          issue_id,
          main_id: id,
        });
        if ("issue_campaign" in (data || {})) {
          chrome.storage.local.set(
            {
              data: {
                issue_campaign: [...data.issue_campaign, campaign],
              },
            },
            () => {
              this.createUI();
            }
          );
        } else {
          chrome.storage.local.set(
            { data: { issue_campaign: [campaign] } },
            () => {
              this.createUI();
            }
          );
        }
      });
    } catch (error) {
      console.error(error);
      new Notification("Please, reload page.");
    }
  },

  createUI() {
    this.generateIds();
    this.createCampaigns();
    this.renderCampaigns();
    if (this.setup_btn) {
      this.setup_btn.remove();
    }
  },
};

app.init();
