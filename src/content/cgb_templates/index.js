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

  getTemplates(fn) {
    return fn(TEMPLATES);
  },

  initDesktop() {
    this.showMobile = getButton(
      "input[class=mobile-show]",
      "input[value='Show Mobile Banners']",
      "block",
      ui
    );
    this.hideMobile = getButton(
      "input[class=mobile-hide]",
      "input[value='Hide mobile Banners']",
      "none",
      ui
    );

    this.textareas = document.querySelectorAll("textarea[name^=html]");
    this.bannerText = document.querySelectorAll("textarea[name^=banner_text]");

    if (!this.textareas && !this.bannerText) {
      new Notification("Desktop textareas not found.");
      return;
    }

    // this.checkVideoMp4();
    this.initUI(ui);
    this.createOpenButton();
    this.addListeners();
    createContextBtn();

    hideImage();

    this.createPasteAllBtn();
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

  createClearAllBtn(_nodes, banner_text, deviceType) {
    return this.ui.createButton({
      classname: "block-btns clear",
      title: "Clear All " + deviceType,
      onClick: (ev) => {
        const loader = new Loader(ev.currentTarget);

        if (
          confirm(
            `Are you sure you want to clear the textarea for ${deviceType}?`
          )
        ) {
          loader.showLoader();
          for (let i = 0; i < _nodes.length; i++) {
            const item = _nodes[i];
            if (item.value.trim().length === 0) {
              new Notification(
                `The textarea value for ${deviceType} is empty!`
              );
              return loader.hideLoader();
            }
          }
          _nodes.forEach((item) => {
            item.value = "";
          });

          banner_text.forEach((item) => {
            item.value = "";
          });

          loader.hideLoader();
        } else {
          return loader.hideLoader();
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

      // console.log(template);
      // console.log(name);
      // console.log(context);

      if (name in context && context[name] in state.context) {
        const _template = Mustache.render(
          template,
          state.context[context[name]]
        );
        return _template;
      } else {
        new Notification("Value: " + name + ". Not found in context.");
        return "";
      }
    } catch (error) {
      console.log(error);
      // new Notification("Template render error");w
      return "";
    }
  },

  createPasteAllBtn(_nodes, banner_text, deviceType) {
    return this.ui.createButton({
      classname: "block-btns paste",
      title: "Set template " + deviceType,
      onClick: (ev) => {

        // if (!state.context) {
        //   new Notification("Pls provide context.");
        //   return;
        // }

        const loader = new Loader(ev.currentTarget);
        loader.showLoader();
        let checkTemplate = "";
        let checkDesktop = document.querySelectorAll(
          'tr[id^="trcheckrow"] video[name="media"]'
        );
        if (checkDesktop.length === 0) {
          checkDesktop = document.querySelectorAll('tr[id^="trcheckrow"] img');
        }
        if (!checkDesktop.length) return loader.hideLoader();

        checkDesktop.forEach((elem) => {
          elem.nodeName === "IMG"
            ? (checkTemplate = "x1")
            : (checkTemplate = "x3");
        });

        let checkMobiles = document.querySelector("tr.mobile_banners");

        if (checkMobiles) {
          checkMobiles = getMediaMobile(checkMobiles);
        }

        if (!checkMobiles.length) return loader.hideLoader();

        console.log(checkMobiles);

        const htmlSelect = this.getTemplates((temp) => {
          return temp.filter(
            (item) => item.is_active && item[checkTemplate + deviceType]
          );
        });

        this.checkVideoMp4(
          _nodes,
          banner_text,
          htmlSelect,
          deviceType,
          loader,
          checkDesktop,
          checkMobiles
        );
      },
    });
  },

  //Вынести в отдельный файл inputFile
  //Проверить как реагирует если 1 мп4 или имг нет

  checkVideoMp4(
    _nodes,
    banner_text,
    elem,
    deviceType,
    loader,
    checkDesktop,
    checkMobiles
  ) {
    this.desktopVideosOrImgArray = [];
    this.mobileVideosOrImgArray = [];

    const deviceTypeLowercase = deviceType.toLowerCase();

    const slugName = this.languageAttributeToSlugDesktop;
    const slugNameValues = Object.values(slugName).map((v) => v.toLowerCase());

    const inputFile = document.querySelectorAll(
      `input[type="hidden"][id^="trnewvalue"]`
    );

    inputFile.forEach((input) => {
      if (!input.value.endsWith(`_${deviceTypeLowercase}.mp4`)) {
        return input.value.replace(/\.\w+$/, ".png");
      }
    });

    iterationElementFn(
      checkDesktop,
      this.desktopVideosOrImgArray,
      inputFile,
      deviceTypeLowercase,
      slugNameValues,
      _nodes,
      loader,
      banner_text,
      elem
    );

    iterationElementFn(
      checkMobiles,
      this.mobileVideosOrImgArray,
      inputFile,
      deviceTypeLowercase,
      slugNameValues,
      _nodes,
      loader,
      banner_text,
      elem
    );
  },

  createFulfillAllNodes(_nodes, context, deviceType) {
    return this.ui.createButton({
      title: "Fulfill all " + deviceType,
      classname: "block-btns",
      onClick: (ev) => {
        if (!state.context) {
          new Notification("Pls provide context.");
          return;
        }

        const loader = new Loader(ev.currentTarget);

        loader.showLoader();
        setTimeout(() => {
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

  attachPasteAllFill({ parent }, node) {
    this.ui.AddButtonToContainer(node, "blockItem2");
  },

  attachClearAll(node) {
    this.ui.AddButtonToContainer(node, "blockItem2");
  },

  initUI(ui) {
    this.ui = ui.init();
    // this.selectNodes = this.createSelectNodes(this.textareas);
    this.fulfillNodes = this.createFulfillNodes(
      this.textareas,
      this.languageAttributeToSlugDesktop
    );

    this.pasteAllBtn = this.createPasteAllBtn(
      this.fulfillNodes,
      this.bannerText,
      "Desktop"
    );

    this.fulfillAllNodeDesktop = this.createFulfillAllNodes(
      this.fulfillNodes,
      this.languageAttributeToSlugDesktop,
      "Desktop"
    );

    this.clearAllNodes = this.createClearAllBtn(
      this.textareas,
      this.bannerText,
      "Desktop"
    );
    // this.attachClearAll(this.clearAllNodes);

    if (this.fulfillNodes.length > 0) {
      this.attachPasteAllFill(this.fulfillNodes[0], this.pasteAllBtn);
      this.attachFulfillAllNode(
        this.fulfillNodes[0],
        this.fulfillAllNodeDesktop
      );
      this.attachClearAll(this.clearAllNodes);
    }
  },

  initMobileUI(ui) {
    this.pasteAllBtnMobile.forEach(({ node }) => node.remove?.());
    this.fulfillMobileNodes.forEach(({ node }) => node.remove?.());

    // this.selectMobileNodes = this.createSelectNodes(this.textareas_mobile);
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
      this.bannerText,
      "Mobile"
    );

    this.pasteAllBtnMobile = this.createPasteAllBtn(
      this.fulfillMobileNodes,
      this.bannerText,
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
