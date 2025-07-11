window.ui = {
  unmount: [],
  unsubscribe: [],

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
    return this;
  },
};

const state = {
  context: null,
};

function convertToObject(CSV) {
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
}

