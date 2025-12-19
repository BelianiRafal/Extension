const app = {
  selectNodes: [],
  selectMobileNodes: [],

  clearAllNodes: [],
  clearAllNodesMobile: [],

  desktopVideosOrImgArray: [],
  mobileVideosOrImgArray: [],

  pasteAllBtn: [],
  pasteAllBtnMobile: [] || null,

  fulfillNodes: [],
  fulfillMobileNodes: [],

  bannerText: null,

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
    //For mp4 or png format, please dont touch ^_^
    dach: "dach",
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

  langAttributeSlugBannerText: {
    "banner_text[czech]": "cz",
    "banner_text[danish]": "dk",
    "banner_text[dutch]": "nl",
    "banner_text[english]": "uk",
    "banner_text[finnish]": "fi",
    "banner_text[french]": "fr",
    "banner_text[german]": "de",
    dach: "dach",
    "banner_text[germanDE]": "chde",
    "banner_text[Hungarian]": "hu",
    "banner_text[italian]": "it",
    "banner_text[norsk]": "no",
    "banner_text[polish]": "pl",
    "banner_text[portugal]": "pt",
    "banner_text[romanian]": "ro",
    "banner_text[slovak]": "sk",
    "banner_text[spanish]": "es",
    "banner_text[swedish]": "se",
  },

  init() {
    this.initDesktop();
  },

  initDesktop() {
    this.showMobile = getButton("input[class=mobile-show]", "input[value='Show Mobile Banners']", "block", ui);
    this.hideMobile = getButton("input[class=mobile-hide]", "input[value='Hide mobile Banners']", "none", ui);

    this.textareas = document.querySelectorAll("textarea[name^=html]");
    this.bannerText = document.querySelectorAll("textarea[name^=banner_text]");
    this.textareas_mobile = document.querySelectorAll("textarea[name^=mobile_html]");

    if (!this.textareas && !this.bannerText && !this.textareas_mobile) {
      new Notification("Desktop textareas not found.");
      return;
    }

    this.initUI(ui);
    this.addListeners();
    this.setTemplateBtn();
    createContextBtn();
    createOpenButton();
    hideImage();
  },

  initMobile() {
    // this.textareas_mobile = document.querySelectorAll("textarea[name^=mobile_html]");
    // if (!this.textareas_mobile) {
    //   new Notification("Mobile textareas not found.");
    //   return;
    // }
    // this.initMobileUI();
  },

  addListeners() {
    if (this.showMobile) {
      this.showMobile.addEventListener("click", () => this.initMobile());
    }
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
              new Notification("Pls select template. Minimum length 10 symbols.");
              return;
            }
            if (!state.context) {
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

  createClearAllBtn(_nodes, banner_text) {
    return this.ui.createButton({
      classname: "block-btns clear",
      title: "Clear All",
      onClick: (ev) => {
        const loader = new Loader(ev.currentTarget);

        //Modal after click Clear All button
        swalFireModal("Wow!", "Are you sure you want to clear all textarea?", "warning", "Clear", "#d9534f", true).then(
          (result) => {
            if (result.isConfirmed) {
              loader.showLoader();
              for (let i = 0; i < _nodes.length; i++) {
                const item = _nodes[i];
                if (item.value.trim().length === 0) {
                  swalFireModal("", `The textarea value is empty!`, "warning", false);
                  return loader.hideLoader();
                }
              }
              _nodes.forEach((item) => {
                item.value = "";
              });

              banner_text.forEach((item) => {
                item.value = "";
              });
              swalFireModal("Clear!", "", "success", false);
              return loader.hideLoader();
            } else {
              swalFireModal("Textarea are not clear!", "", "error", false);
              return loader.hideLoader();
            }
          }
        );
      },
    });
  },

  handleFullFillTemplate(textarea, context) {
    try {
      const template = textarea.value;
      const name = textarea.name;

      if (name in context && context[name] in state.context) {
        const _template = Mustache.render(template, state.context[context[name]]);
        return _template;
      } else {
        new Notification("Value: " + name + ". Not found in context.");
        return "";
      }
    } catch (error) {
      console.log(error);
      // new Notification("Template render error");
      return "";
    }
  },

  //Set template button
  setTemplateBtn(_nodes, banner_text) {
    return this.ui.createButton({
      classname: "block-btns paste",
      title: "Set template ",
      onClick: (ev) => {
        if (!state.context) {
          swalFireModal("Pls provide context!", "", "warning", false);
          return;
        }

        const loader = new Loader(ev.currentTarget);
        loader.showLoader();

        //Usage for message in Swal
        let checkNodename = "";

        //Find banners desktop
        let checkDesktop = document.querySelectorAll('tr[id^="trcheckrow"] video[name="media"]');
        if (checkDesktop.length === 0) {
          checkDesktop = document.querySelectorAll('tr[id^="trcheckrow"] img');
        }
        if (!checkDesktop.length) return loader.hideLoader();

        //Find banners mobile
        let checkMobiles = document.querySelector("tr.mobile_banners");
        if (checkMobiles) {
          checkMobiles = getMediaMobile(checkMobiles);
        }
        if (!checkMobiles.length) return loader.hideLoader();

        const checkAll = [...checkDesktop, ...checkMobiles];

        checkAll.forEach((elem) => {
          elem.nodeName === "IMG" ? (checkNodename = "IMG") : (checkNodename = "MP4");
        });

        this.checkVideoMp4(_nodes, banner_text, loader, checkDesktop, checkMobiles, checkNodename);
      },
    });
  },

  async checkVideoMp4(_nodes, banner_text, loader, checkDesktop, checkMobiles, checkNodename) {
    this.desktopVideosOrImgArray = [];
    this.mobileVideosOrImgArray = [];

    console.log(checkMobiles);

    //Check width of video or img
    //if condition is not met, then swal modal is show
    const promptArrDesktop = await getStateArray(checkDesktop, "desktop", this.desktopVideosOrImgArray);
    const desktopLengthMismatch = this.textareas.length !== promptArrDesktop.length;

    const promptArrMobile = await getStateArray(checkMobiles, "mobile", this.mobileVideosOrImgArray);
    const mobileLengthMismatch = this.textareas_mobile.length !== promptArrMobile.length;

    console.log('promptMobile:', promptArrMobile);

    let agreeToProceed = true;
    if (desktopLengthMismatch || mobileLengthMismatch) {
      let message = "";
      if (desktopLengthMismatch) {
        message += `Desktop ${checkNodename}: ${promptArrDesktop.length} need ${this.textareas.length}.\n`;
      }
      if (mobileLengthMismatch) {
        message += `Mobile ${checkNodename}: ${promptArrMobile.length} need ${this.textareas_mobile.length}.\n`;
      }
      message += `Paste code?`;
      const result = await swalFireModal("Oops...!", message, "warning", "Pasted code", "", true);
      agreeToProceed = result.isConfirmed;
    }

    try {
      if (!agreeToProceed) {
        loader.hideLoader();
        return false;
      }

      //Function check nodes length and if agree updated true, then fill textareas and banner textareas
      const conclusionDesktop = await iterationElementFn(promptArrDesktop, this.textareas, banner_text,  agreeToProceed, "Desktop");
      const conclusionMobile = await iterationElementFn(promptArrMobile, this.textareas_mobile, banner_text, agreeToProceed, "Mobile");
      if (!conclusionMobile && !conclusionDesktop) {
        loader.hideLoader();
        return false;
      }

      return true;
    } finally {
      loader.hideLoader();
    }
  },

  //Fullfill template button
  createFulfillAllNodes(_nodes) {
    return this.ui.createButton({
      title: "Fulfill all",
      classname: "block-btns",
      onClick: (ev) => {
        if (!state.context) {
          swalFireModal("Pls provide context!", "", "warning", false);
          return;
        }

        const loader = new Loader(ev.currentTarget);
        loader.showLoader();

        setTimeout(() => {
          this.createFillBannerText();
          loader.hideLoader();
        }, 1000);
      },
    });
  },

  createFillBannerText() {
    const bannerContext = this.langAttributeSlugBannerText;

    this.bannerText.forEach((item) => {
      item.value = this.handleFullFillTemplate(item, bannerContext);
    });
  },

  attachFulfillNodes(nodes) {
    for (const { node, parent } of nodes) {
      parent.insertAdjacentElement("afterend", node);
    }
  },

  attachFulfillAllNode({ parent }, node) {
    this.ui.AddButtonToContainer(node, "blockItem2");
  },

  attachSetTemplateBtn({ parent }, node) {
    this.ui.AddButtonToContainer(node, "blockItem2");
  },

  attachClearAll(node) {
    this.ui.AddButtonToContainer(node, "blockItem2");
  },

  initUI(ui) {
    this.ui = ui.init();
    const allTextareas = [...this.textareas, ...this.textareas_mobile];

    this.fulfillNodes = this.createFulfillNodes(allTextareas, this.languageAttributeToSlugDesktop);

    this.pasteAllBtn = this.setTemplateBtn(this.fulfillNodes, this.bannerText);

    this.fulfillAllNodeDesktop = this.createFulfillAllNodes(
      this.fulfillNodes,
    );

    this.clearAllNodes = this.createClearAllBtn(allTextareas, this.bannerText);

    if (this.fulfillNodes.length > 0) {
      this.attachSetTemplateBtn(this.fulfillNodes[0], this.pasteAllBtn);
      this.attachFulfillAllNode(this.fulfillNodes[0], this.fulfillAllNodeDesktop);
      this.attachClearAll(this.clearAllNodes);
    }
  },

  initMobileUI(ui) {
    this.pasteAllBtnMobile.forEach(({ node }) => node.remove?.());
    this.fulfillMobileNodes.forEach(({ node }) => node.remove?.());

    // this.selectMobileNodes = this.createSelectNodes(this.textareas_mobile);
    this.fulfillMobileNodes = this.createFulfillNodes(this.textareas_mobile, this.languageAttributeToSlugMobile);
    // this.attachFulfillNodes(this.fulfillMobileNodes);
    this.fulfillAllNodeMobile = this.createFulfillAllNodes(
      this.fulfillMobileNodes,
      this.languageAttributeToSlugMobile,
      "Mobile"
    );

    this.clearAllNodesMobile = this.createClearAllBtn(this.textareas_mobile, this.bannerText, "Mobile");

    this.pasteAllBtnMobile = this.createPasteAllBtn(this.fulfillMobileNodes, this.bannerText, "Mobile");

    if (this.fulfillMobileNodes.length > 0) {
      this.attachPasteAllFill(this.fulfillMobileNodes[0], this.pasteAllBtnMobile);
      this.attachFulfillAllNode(this.fulfillMobileNodes[0], this.fulfillAllNodeMobile);

      this.attachClearAll(this.clearAllNodesMobile);
    }
  },
};

app.init();