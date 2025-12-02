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

  typographyText(text, element) {
    let index = 0;
    const currentText = text;

    const typeInterval = setInterval(() => {
      element.textContent = currentText.slice(0, index + 1);
      index++;

      if (index === currentText.length) return clearInterval(typeInterval);
    }, 100);
  },

  setCurrentName() {
    const currentUserName = document.body.getAttribute("data-user");

    const user = {
      OleHrytsa: "Oleksander Hrytsaienko",
      RKobus: "Rafał Kobus",
      JurgowiakM: "Michał Jurgowiak",
      KaKazaniecki: "Kamil Kazaniecki",
      DmyKrapyvianskyi: "Dmytro Krapyvianskyi",
      Orlinski: "Kamil Orliński",
    };

    const splitTarget = user[currentUserName].split(" ")[0];

    return splitTarget;
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

    this.blockImg = document.createElement("div");
    this.blockImg.className = "block-logo";
    this.blockImg.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 515.9" width="150" height="40">
        <rect x="895.9" y="22.6" width="72.2" height="480.9" style="fill:#FF2F00;" />
        <path d="M1050.1,35.6c-27.8,0-47.3,19.2-47.3,46.7c0,27.8,19.5,47.3,47.3,47.3c27.7,0,47.9-19.8,47.9-47.3
          C1098,55.2,1077.9,35.6,1050.1,35.6z" style="fill:#FF2F00;" />
        <rect x="1014.4" y="165.3" width="72.2" height="338.4" style="fill:#FF2F00;" />
        <path d="M1649.2,152.8c-45.5,0-82.7,13.9-111.1,41.5l-2.7-29h-66.8v338.4h72.2V314.3c0-56.1,39.2-95.4,95.4-95.4
          c42.4,0,68.7,28.7,68.7,75v209.8h72.8V288.9C1777.7,204.9,1728.4,152.8,1649.2,152.8z" style="fill:#FF2F00;" />
        <rect x="1817.3" y="165.3" width="72.2" height="338.4" style="fill:#FF2F00;" />
        <path d="M1853.9,129.5c27.7,0,47.9-19.8,47.9-47.3c0-27.1-20.2-46.7-47.9-46.7c-27.8,0-47.3,19.2-47.3,46.7
          C1806.7,110.1,1826.1,129.5,1853.9,129.5z" style="fill:#FF2F00;" />
        <path d="M804.6,401.2c-17.7,28.3-54.3,46.9-93.5,46.9c-56,0-98.7-33.7-109.9-85.4h260.2l1.1-11.2
          c0.7-6.8,0.7-14,0.7-20.1c-1.3-105.2-69.5-178.6-165.8-178.6c-100,0-172.6,75-172.6,178.1c0,107.1,78,185,185.6,185
          c66.1,0,125.2-30.4,153-77L804.6,401.2z M696.9,221.4c48,0,79.9,27.1,89.1,74.9H602.3C614.4,250.2,650.2,221.4,696.9,221.4z"
          style="fill:#FF2F00;" />
        <path d="M1280.7,152.8c-74.3,0-138.2,38.9-155.8,91.7l64.2,29.1c12.2-30.7,51.8-53,89.7-53c48.1,0,79.2,20.4,79.2,52
          c0,6.7-4.8,10.6-14.4,11.7l-77.5,9.3c-126,15.4-152.5,71.2-152.5,115.4c0,62.9,54.9,106.8,133.5,106.8c46,0,85.5-15.8,112.7-44.1
          l3,31.8h66.8V280.2C1429.7,204,1369.8,152.8,1280.7,152.8z M1356.9,357.1c0,53.6-41.7,91.1-101.6,91.1c-40.9,0-69.3-16.3-69.3-39.5
          c0-9.6,0-38.7,88.3-49.6l82.7-10v8.1H1356.9z" style="fill:#FF2F00;" />
        <path d="M471.4,503.4c16.9-45.5,26.4-91.5,26.4-137.7c0-90.9-68.3-148.9-133.1-153.6c-25.3-1.8-43.5,0.4-69.2,9.2
          c11.2-27.1,14-53.5,12.8-79.8c-3.9-84.5-86.5-131.1-150.7-131.1c-34.9,0-64.3,1.8-139.4,35.6l0,0v457.4h74.5l0,0L471.4,503.4
          L471.4,503.4z M92.8,93c22.6-8.3,45.5-12.5,67-12.5c42.9,0,81.6,32.2,81.6,81.3c0,41.4-13.8,72.8-73.8,132.7l52.7,52.7
          c42.6-41.4,76.5-67.7,124.6-67.7c52.7,0,83.3,41.7,83.3,91.4c0,22.6-3.7,42.1-10.5,61.4h-0.2H92.8V93z" style="fill:#FF2F00;" />
      </svg>`;

    this.blockLink = document.createElement("a");
    this.blockLink.href = "https://www.beliani.co.uk/";
    this.blockLink.title = "Click to go the shop";
    this.blockLink.append(this.blockImg);

    this.blockItem3.append(this.blockLink);

    this.userName = this.setCurrentName();

    this.blockText.textContent = `Hi, ${this.userName} ` + "(⌐■_■)";
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

function getTemplates(fn) {
  return fn(TEMPLATES);
}
