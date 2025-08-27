//TODO
//Проверка если кампания создана больше чем 8 дней
//  После загрузки на одной странице, переходить к другой, когда будет последняя - редирект на спам

const url = "https://www.prologistics.info/react/reports_page/customers_newsletter/?filter_id=";

const customerUrl = "https://www.prologistics.info/react/reports_page/customers_newsletter/";

// const customerUrl = "https://prolodev.prologistics.info/react/reports_page/customers_newsletter/";

// const planingUrl = "https://prolodev.prologistics.info/spam_plan.php";
const planingUrl = "https://www.prologistics.info/spam_plan.php";

// const newsEmailUrl = "https://prolodev.prologistics.info/news_email.php?id=";
const newsEmailUrl = "https://www.prologistics.info/news_email.php?id=";

const id = "11607";

const shopId = {
  CHDE: 11607,
  "CHDE-RICARDO": 11606,
  CHFR: 11604,
  "CHFR-RICARDO": 11605,
  AT: 46175,
  CZ: 11619,
  DE: 11608,
  "DE-AVANDEO": 11609,
  DK: 11618,
  FI: 11616,
  FR: 11612,
  HU: 11615,
  IT: 11610,
  NL: 11614,
  NO: 79358,
  PL: 11620,
  PT: 11617,
  RO: 1323241,
  SE: 11603,
  SK: 165840,
  ES: 11613,
  UK: 11621,
};

const idForOpen = [
  11607, 11606, 11604, 11605, 46175, 11619, 11608, 11609, 11618, 11616, 11612, 11615, 11610, 11614, 79358, 11620, 11617,
  1323241, 11603, 165840, 11613, 11621,
];

const filterBtn = Array.from(document.querySelectorAll("div button span")).find(
  (span) => span.textContent.trim() === "Filter"
);
const filterDiv = filterBtn?.closest("div");

closeCard.addEventListener("click", () => {
  spanText.classList.remove("show");
  mainCard.classList.add("implode-animation");
  setTimeout(() => {
    mainCard.classList.remove("implode-animation");
    mainCard.classList.remove("explode-animation");
    overlay.classList.remove("active");
  }, 800);
});

button.addEventListener("click", async () => {
  overlay.classList.add("active");
  mainCard.classList.add("explode-animation");
});

startBtn.addEventListener("click", async () => {
  spanText.classList.remove("show");
  const value = idForInput.value;

  if (value === "") {
    spanText.classList.add("show");
    return;
  }

  const result = await swalFireModal(`Campaing id "${value}" is correct?`, ``, "question", "", "", true);
  if (result.isConfirmed) {
    openMailTable(value);
    chrome.runtime.sendMessage({ action: "setFirstTab" });
  } else {
    return false;
  }
});

//34616
//prod id = 36664

function openMailTable(valueId) {
  const ids = [];
  // const idsDev = [34626, 34627, 34628, 34629];
  const newsMailWindow = window.open(`${newsEmailUrl + valueId}`, "_blank");

  const waitForMail = setInterval(() => {
    try {
      const doc = newsMailWindow.document;
      if (!doc || doc.readyState !== "complete") return;

      const tableMain = doc.querySelectorAll("center table.tablesorter tbody tr td form div a");

      if (tableMain.length > 0) {
        tableMain.forEach((item, index) => {
          const url = item.href;
          const valueInLink = url.match(/id=(\d+)/);
          const id = valueInLink[1];

          if (index === 0 || index === 1 || index === 6) {
            ids.push(id, id);
          } else {
            ids.push(id);
          }
          return ids;
        });

        //Remove id for BEFR/BENL
        ids.splice(5, 2);
        console.log(ids);

        clearInterval(waitForMail);
        newsMailWindow.close();

        openCustomerFilter(ids, 0);
      }
    } catch (e) {
      console.log(e);
    }
  }, 500);
}

function openCustomerFilter(ids, index = 0) {
  if (index >= ids.length) {
    // window.open(planingUrl, "_blank");
    swalFireModal(`Woooow`, `Your id is already!`, "success", "", "", false);
    console.log("END");
    return;
  }

  // const customerOpenId = [11618, 11616, 11612, 11615];
  chrome.runtime.sendMessage({ action: "goToFirstTab" });

  const newWindow = window.open(`${customerUrl}?filter_id=${idForOpen[index]}`, "_blank");
  const waitForFilter = setInterval(() => {
    try {
      const doc = newWindow.document;
      if (!doc && doc.readyState !== "complete") return;

      const useSaved = Array.from(doc.querySelectorAll('[id^="undefined--undefined-"]'));
      console.log(useSaved[23].children[0].children[1].outerText);

      //Находим имя для сохранения

      if (useSaved) {
        let nameSaveSettings = useSaved[23].children[0].outerText;
        saveNameText.innerHTML += nameSaveSettings;
      }

      const filterBtn = Array.from(doc.querySelectorAll("div button span")).find(
        (span) => span.textContent.trim() === "Filter"
      );

      if (filterBtn && useSaved) {
        clearInterval(waitForFilter);

        const filterDiv = filterBtn.closest("div");
        console.log("Нашли Filter:", filterDiv);
        setTimeout(() => {
          filterDiv.click();

          // setTimeout(() => {
          //    clickToTransferButton(doc, index, ids);
          // }, 1000)
        }, 1000);
      }
    } catch (e) {
      console.warn("Not access", e);
    }
  }, 500);
}

async function clickToTransferButton(windowPage, index, ids) {
  // Code from Second button
  const blockWithId = await waitTransferElement(windowPage, '[id^="undefined--undefined-"]', 27);
  const blockDiv = blockWithId[26];
  const nextDiv = blockDiv.querySelectorAll("div");

  if (nextDiv.length && nextDiv[0].children[1]) {
    nextDiv[0].children[1].click();
  }

  const spanItem = await windowPage.querySelectorAll('span[role="menuitem"]');

  console.log(ids[index]);

  const found = Array.from(spanItem).find((elem) => {
    return elem.textContent.trim().startsWith(`${ids[index]}:`);
  });

  const muiButton = windowPage.querySelector("button[type='button'][label='Transfer to batch file']");

  if (found && muiButton) {
    found.click();

    setTimeout(() => {
      muiButton.click();
    }, 500);

    let spinnerVisible = false;
    watchToLoader(windowPage, index, spinnerVisible, ids);
  }

  console.log("final found:", found);
}

function watchToLoader(windowPage, index, spinnerVisible, ids) {
  const observer = new MutationObserver((mutations, obs) => {
    const overlay = windowPage.querySelector('div[name="blockOverlay"]');
    const spinnerContainer = overlay ? overlay.querySelector("span") : null;
    const hasSpinner = spinnerContainer && spinnerContainer.children.length > 0;

    if (hasSpinner && !spinnerVisible) {
      spinnerVisible = true;
      console.log("Спиннер виден!");
      // openCustomerFilter(ids, index + 1);
    }

    if (!hasSpinner && spinnerVisible) {
      spinnerVisible = false;

      console.log("SHop id =>", objVal);

      console.log("SPinner end");
      // openCustomerFilter(ids, index + 1);
      // chrome.runtime.sendMessage({ action: "nextTab" });

      obs.disconnect();
    }
  });

  observer.observe(windowPage.body, { childList: true, subtree: true });
}

function waitTransferElement(page, selector, count, wait = 5000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    const timer = setInterval(() => {
      const element = page.querySelectorAll(selector);

      if (element.length >= count) {
        console.log("Element is find");
        clearInterval(timer);
        resolve(element);
      } else {
        console.log("Wait...");
      }
    }, 200);
  });
}
