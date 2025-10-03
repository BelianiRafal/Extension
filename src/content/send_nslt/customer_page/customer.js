const secondBtn = document.createElement("button");
secondBtn.className = "secondBtn";
secondBtn.textContent = "SECOND BTN";

document.body.append(secondBtn);

const thirtyBtn = document.createElement("button");
thirtyBtn.className = "thirtyBtn";
thirtyBtn.textContent = "THIRTY BTN";

document.body.append(thirtyBtn);

secondBtn.addEventListener("click", () => {
  const allDivs = document.querySelectorAll('div[style*="margin-right: 10px;"]');
  const targetDiv = Array.from(allDivs).find((div) => div.textContent.trim() === "use saved settings");

  if (!targetDiv) {
    return;
  }

  console.log(targetDiv.nextElementSibling.children[1].children[0].children[1].textContent);
});

thirtyBtn.addEventListener("click", () => {
  const labels = document.querySelectorAll("label.MuiFormControlLabel-root");

  labels.forEach((label) => {
    if (label.textContent.includes("make test A/B")) {
      const checkbox = label.querySelector('input[type="checkbox"]');

      if (checkbox) {
        setTimeout(() => {
          checkbox.click();

          const secondSearch = document.querySelectorAll('[id^="undefined--undefined-"]');
          const firstInput = secondSearch[26];
          const secondInput = secondSearch[27];

          const firstDiv = firstInput.querySelectorAll("div");
          const secondDiv = secondInput.querySelectorAll("div");
          
          //! Первый див
          firstDiv[0].children[1].click()

          setTimeout(() => {
            secondDiv[0].children[1].click()
          }, 4000);

        }, 300);
      }
    }
  });
});
