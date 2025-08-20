const secondBtn = document.createElement("button");
secondBtn.className = "secondBtn";
secondBtn.textContent = "SECOND BTN";

document.body.append(secondBtn);

const thirtyBtn = document.createElement("button");
thirtyBtn.className = "thirtyBtn";
thirtyBtn.textContent = "THIRTY BTN";

document.body.append(thirtyBtn);

secondBtn.addEventListener("click", () => {
  const blockWithId = document.querySelectorAll('[id^="undefined--undefined-"]');
  const blockDiv = blockWithId[26];
  const nextDiv = blockDiv.querySelectorAll("div");
  nextDiv[0].children[1].click();

  const spanItem = document.querySelectorAll('span[role="menuitem"]');

  // spanItem.forEach((item) => {
  //   console.log(item.textContent.split(" ")[0]);
  // });

  const found = Array.from(spanItem).find((elem) => {
    return elem.textContent.trim().split(" ")[0] === "34587:";
  });
  const muiButton = document.querySelector("button[type='button'][label='Transfer to batch file']");

  if (found && muiButton) {
    found.click();

    setTimeout(() => {
      muiButton.click();
    }, 1000);

    // const spinner = document.querySelector('[name="blockOverlay"] span');
    // console.log(spinner);

    const observer = new MutationObserver(() => {
      const overlay = document.querySelector('div[name="blockOverlay"]');

      if (!overlay) {
        console.log("Спиннер удалён из DOM");
        return;
      }

      const spinnerContainer = overlay.querySelector("span");

      setTimeout(() => {
        if (spinnerContainer && spinnerContainer.children.length > 0) {
          console.log("Спиннер виден!");
        } else {
          console.log("SPinner end");
          // window.location.href = redirectUrl;
          thirtyBtn.click();
        }
      }, 1000);
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  console.log(found);
});

thirtyBtn.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "nextTab" });
});
