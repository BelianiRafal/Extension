function getButton(selector1, selector2, display) {
  const button = document.querySelector(selector1) || document.querySelector(selector2);

  if (button) {
    button.style.cssText = `
        display: ${display};
      `;
    if (ui && typeof ui.AddButtonToContainer === "function") {
      ui.AddButtonToContainer(button, "blockItem1");
    }
  }
  return button;
}

function createContextBtn() {
  const button = document.createElement("button");
  button.textContent = "Add context";
  button.className = "contextBtn";
  //Find the button on the page
  const checkUpdateBtn = document.querySelector(`table tr center form input[type="submit"][name="update"]`);

  //Create new button update and add styles
  const newUpdateBtn = document.createElement("button");
  newUpdateBtn.textContent = "Update";
  newUpdateBtn.className = "newUpdateBtn";

  const loader = new Loader(newUpdateBtn);

  newUpdateBtn.addEventListener("click", () => {
    loader.showLoader();

    //Check if there is a button on the page
    if (checkUpdateBtn) {
      setTimeout(() => {
        checkUpdateBtn.click();
        setTimeout(() => {
          newUpdateBtn.disabled = false;
          newUpdateBtn.textContent = "Update";

          loader.hideLoader();
        }, 1000);
      }, 2000);
    } else {
      alert("Update button was not found");
      return;
    }
  });

  const dialog = document.createElement("dialog");
  dialog.style = "border: none; border-radius: .4rem; max-width: 640px; width: 100%; display: none;";
  const dialog_container = document.createElement("div");
  dialog_container.style = "padding: 0.4rem; width: 70%;";

  const dialog_sidebar = document.createElement("div");
  dialog_sidebar.style = "padding: 0.4rem; width: 30%; display: flex; flex-direction: column; gap: 0.4rem;";

  const dialog_sidebar_title = document.createElement("h3");
  dialog_sidebar_title.textContent = "Import options";

  const dialog_sidebar_import_slug = document.createElement("button");
  dialog_sidebar_import_slug.textContent = "Import slug context";
  dialog_sidebar_import_slug.style = "text-align: left; font-size: 12px;";
  const dialog_sidebar_import_default = document.createElement("button");
  dialog_sidebar_import_default.textContent = "Import context";
  dialog_sidebar_import_default.style = "text-align: left; font-size: 12px;";

  dialog_sidebar.append(dialog_sidebar_title);
  dialog_sidebar.append(dialog_sidebar_import_slug);
  // dialog_sidebar.append(dialog_sidebar_import_default);

  const container_title_slug = document.createElement("div");
  container_title_slug.style = "display: flex; align-items: center; justify-content: space-between;";

  const container_title = document.createElement("div");
  container_title.style = "display: flex; align-items: center; justify-content: space-between;";

  const dialog_title = document.createElement("h2");
  dialog_title.textContent = "Add context";

  const dialog_title_slug = document.createElement("h2");
  dialog_title_slug.textContent = "Add slug context";

  const dialog_close = document.createElement("button");
  dialog_close.textContent = "x";
  dialog_close.addEventListener("click", () => {
    dialog.style.display = "none";
    dialog.close();
  });

  const container_body_slug = document.createElement("div");
  container_body_slug.style = "display: flex; flex-direction: column;";

  const container_body = document.createElement("div");
  container_body.style = "display: flex; flex-direction: column;";

  dialog_sidebar_import_default.addEventListener("click", () => {
    dialog_container.innerHTML = "";
    container_title.append(dialog_title);
    container_title.append(dialog_close);
    dialog_container.appendChild(container_title);
    dialog_container.appendChild(container_body);
  });

  dialog_sidebar_import_slug.addEventListener("click", () => {
    dialog_container.innerHTML = "";
    //   clear prev initialization
    container_title_slug.innerHTML = "";
    container_title_slug.append(dialog_title_slug);
    container_title_slug.append(dialog_close);
    dialog_container.appendChild(container_title_slug);
    dialog_container.appendChild(container_body_slug);
  });

  const label_slug = document.createElement("label");
  label_slug.style =
    "display: flex; align-items: center; justify-content: center; height: 160px; border-radius: 0.4rem; border: 2px dashed #7364df57; cursor: pointer;";
  const input_slug = document.createElement("input");
  input_slug.style = "display: none;";
  input_slug.accept = ".csv";
  input_slug.type = "file";
  input_slug.multiple = true;
  input_slug.addEventListener("change", () => {
    if (input_slug.files.length == 1) {
      const file = input_slug.files[0];
      Papa.parse(file, {
        complete: (results) => {
          const data = convertToObject(results.data);
          console.log(data);
          state.context = data;
          new Notification("File: " + file.name + " has been added to context.");
          input.value = null;
          dialog.style.display = "none";
          dialog.close();
          return;
          if (!state.context) {
            state.context = data;
            new Notification("File: " + file.name + " has been added to context.");
            input_slug.value = null;
            dialog.close();
          } else {
            const new_context = {};
            for (const key of Object.keys(state.context)) {
              if (key in data) {
                if (typeof data[key] === "object") {
                  new_context[key] = {
                    ...state.context[key],
                    ...data[key],
                  };
                } else {
                  new_context[key] = data[key];
                }
              } else {
                if (typeof state.context[key] === "object") {
                  new_context[key] = {
                    ...state.context[key],
                  };
                } else {
                  new_context[key] = state.context[key];
                }
              }
            }
            // Unpack old context in order to save not SLUG context data
            state.context = {
              ...state.context,
              ...new_context,
            };
            new Notification("File: " + file.name + " has been added to context.");
            input.value = null;
            dialog.close();
          }
        },
        header: true,
      });
    }
  });
  label_slug.textContent = "Upload slug context";
  label_slug.append(input_slug);

  container_body_slug.append(label_slug);

  const label = document.createElement("label");
  label.style =
    "display: flex; align-items: center; justify-content: center; height: 160px; border-radius: 0.4rem; border: 2px dashed #7364df57; cursor: pointer;";
  const input = document.createElement("input");
  input.style = "display: none;";
  input.accept = ".csv";
  input.type = "file";
  input.multiple = true;
  input.addEventListener("change", () => {
    if (input.files.length == 1) {
      const file = input.files[0];
      Papa.parse(file, {
        complete: (results) => {
          const data = results.data;
          if (data.length >= 1) {
            if (!state.context) {
              state.context = data[0];
              new Notification("File: " + file.name + " has been added to context.");
              input_slug.value = null;
              dialog.close();
              dialog.style.display = "none";
            } else {
              state.context = {
                ...state.context,
                ...data[0],
              };
              new Notification("File: " + file.name + " has been added to context.");
              input.value = null;
              dialog.close();
              dialog.style.display = "none";
            }
          }
        },
        header: true,
      });
    }
  });
  label.textContent = "Upload context";
  label.append(input);
  container_body.append(label);

  container_title_slug.append(dialog_title);
  container_title_slug.append(dialog_close);
  dialog_container.appendChild(container_title_slug);
  dialog_container.appendChild(container_body_slug);
  dialog.append(dialog_sidebar);
  dialog.append(dialog_container);

  button.addEventListener("click", () => {
    dialog.style.display = "flex";
    dialog.showModal();
  });

  ui.AddButtonToContainer(button, "blockItem1");
  ui.AddButtonToContainer(newUpdateBtn, "blockItem1");
  ui.AddButtonToContainer(dialog, "blockItem1");
}

// Function for Hide show Image CGB
function hideImage() {
  let findImage = document.querySelectorAll('tr[id^="trcheckrow"] video[name="media"]');

  if (findImage.length === 0) {
    findImage = document.querySelectorAll('tr[id^="trcheckrow"] img');
  }

  const showImageBtn = document.createElement("button");
  showImageBtn.className = "showImageBtn";
  showImageBtn.textContent = "Hide image";

  document.body.append(showImageBtn);

  showImageBtn.addEventListener("click", () => {
    let btnTextHidden = false;

    findImage.forEach((item) => {
      const hideItem = item.closest("td");
      const newItem = hideItem.previousElementSibling;

      [newItem, hideItem].forEach((el) => {
        if (el.classList.contains("hiddenImage")) {
          el.style.display = "";
          el.classList.remove("hiddenImage");
          requestAnimationFrame(() => {
            el.classList.add("animatedImage");
          });
        } else {
          showImageBtn.textContent = "Show image";

          el.classList.remove("animatedImage");
          el.classList.add("hiddenImage");

          setTimeout(() => {
            el.style.display = "none";
          }, 400);

          btnTextHidden = true;
        }
      });
    });

    showImageBtn.textContent = btnTextHidden ? "Show image" : "Hide image";
  });
}

//Open button CGB
function createOpenButton() {
  const openButton = document.createElement("button");
  openButton.className = "openButton";
  openButton.textContent = "Open Button CGB";

  document.body.append(openButton);

  openButton.addEventListener("click", () => {
    const block = document.querySelector(".block-btns-main");
    block.classList.add("active");
    openButton.style.display = "none";
  });
}

//Find mobile selector video or img and return need type
async function iterationElementFn(stateArr, nodes, banner_text, elem, agreeUpdated) {
  const localArr = [];
  localArr.length = 0;
  localArr.push(...stateArr);

  if (nodes.length === localArr.length || agreeUpdated) {
    nodes.forEach((item) => {
      item.parent.value = elem[0].html;
    });
    banner_text.forEach((item) => {
      item.value = elem[0].banner_text;
    });
    return true;
  }
  return false;
}

//Sort media for width and return needed value in stateArr
async function getStateArray(iterArr, deviceTypeLowercase, stateArr) {
  const items = [...(iterArr || [])];

  await Promise.all(
    items.map((video) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const width = video.offsetWidth;
          let isValid = false;
          if (deviceTypeLowercase === "desktop") {
            isValid = width > 950;
          } else if (deviceTypeLowercase === "mobile") {
            isValid = width < 800;
          }

          if (isValid) {
            stateArr.push(video);
          }
          resolve();
        }, 300);
      });
    })
  );

  return stateArr;
}

//Find and return all mobile banners for selector mobile_banners
//and find all banners from tr tag which are outside
function getMediaMobile(trElement, selector = "video[name='media']") {
  if (!(trElement instanceof HTMLElement)) return [];

  const nextTr = trElement.nextElementSibling;

  // Find mp4
  let media = [
    ...trElement.querySelectorAll(selector),
    ...(nextTr?.tagName === "TR" ? nextTr.querySelectorAll(selector) : []),
  ];

  // If mp4 not found find img
  if (media.length === 0) {
    media = [...trElement.querySelectorAll("img"), ...(nextTr?.tagName === "TR" ? nextTr.querySelectorAll("img") : [])];
  }

  return media;
}


//Modal 
function swalFireModal(title, message, iconStyle, confirmText, btnColor, needCancel) {
  return Swal.fire({
    title: title,
    text: message,
    icon: iconStyle,
    confirmButtonText: confirmText || "Ok",
    confirmButtonColor: btnColor || "#328a35",
    showCancelButton: needCancel,
  });
}
