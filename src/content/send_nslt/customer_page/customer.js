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

  console.log(blockDiv);
  // const nextDiv = blockDiv.querySelectorAll("div");
  // nextDiv[0].children[1].click();

  const spanItem = document.querySelectorAll('span[role="menuitem"]');

  const found = Array.from(spanItem).find((elem) => {
    return elem.textContent.trim().split(" ")[0] === "34587:";
  });
  const muiButton = document.querySelector("button[type='button'][label='Transfer to batch file']");

  // if (found && muiButton) {
  //   found.click();

  //   setTimeout(() => {
  //     muiButton.click();
  //   }, 1000);

  //   let spinnerVisible = false;

  //   const observer = new MutationObserver((mutations, obs) => {
  //     const overlay = document.querySelector('div[name="blockOverlay"]');
  //     const spinnerContainer = overlay ? overlay.querySelector("span") : null;
  //     const hasSpinner = spinnerContainer && spinnerContainer.children.length > 0;

  //     if (hasSpinner && !spinnerVisible) {
  //       spinnerVisible = true;
  //       console.log("Спиннер виден!");
  //     }

  //     if (!hasSpinner && spinnerVisible) {
  //       spinnerVisible = false;
  //       console.log("SPinner end");
  //       obs.disconnect();
  //       thirtyBtn.click();
  //     }
  //   });

  //   observer.observe(document.body, { childList: true, subtree: true });
  // }

  console.log(found);
});

thirtyBtn.addEventListener("click", () => {
  

  const useSaved = Array.from(document.querySelectorAll('[id^="undefined--undefined-"]'));
  console.log(useSaved[23].children[0].children[1].outerText);

  // if (useSaved) {
  //   let nameSaveSettings = useSaved[23].children[0].outerText;
  //   saveNameText.innerHTML += nameSaveSettings;
  // }

  
});
