//TODO

//  Логика для правильного указания ид в поле выбора и шопа.
//   Может брать из Гжешика и сравнивать с обьекта idForOpen ???

//  После загрузки на одной странице, переходить к другой, когда будет последняя - редирект на спам
//  Первая кнопка будет на стартовом экране, вторая уже на самой странице с фильтром
//  Автоматический клик или ручной, подумать что оставляем и протестировать
//  Посмотреть какой-то интересный дизайн блока, добавить алерты как всегда.

const url = "https://www.prologistics.info/react/reports_page/customers_newsletter/?filter_id=";
const redirectUrl = "https://prolodev.prologistics.info/spam_plan.php";
const id = "11607";

const idForOpen = {
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

button.addEventListener("click", () => {
  overlay.classList.add("active");
  mainCard.classList.add("explode-animation");
  // const newWindow = window.open(
  //   "https://prolodev.prologistics.info/react/reports_page/customers_newsletter/",
  //   "_blank"
  // );

  // const waitForFilter = setInterval(() => {
  //   try {
  //     const doc = newWindow.document;
  //     if (!doc) return;

  //     // Ищем кнопку Filter
  //     const filterBtn = Array.from(doc.querySelectorAll("div button span")).find(
  //       (span) => span.textContent.trim() === "Filter"
  //     );

  //     if (filterBtn) {
  //       clearInterval(waitForFilter);

  //       const filterDiv = filterBtn.closest("div");
  //       console.log("Нашли Filter:", filterDiv);
  //       filterDiv.click();
  //     }
  //   } catch (e) {
  //     console.warn("Пока нет доступа:", e);
  //   }
  // }, 500);
});

startBtn.addEventListener("click", () => {
  spanText.classList.remove("show");

  if (idForInput.value === "") {
    spanText.classList.add("show");

    return;
  }

  // const newWindow = window.open(
  //   "https://prolodev.prologistics.info/react/reports_page/customers_newsletter/",
  //   "_blank"
  // );

  openMailTable(idForInput.value);
});

//34616

function openMailTable(valueId) {
  const ids = [];
  const newsMailWindow = window.open(`https://prolodev.prologistics.info/news_email.php?id=${valueId}`, "_blank");

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

        ids.splice(5, 2);
        console.log(ids);
        clearInterval(waitForMail);
        newsMailWindow.close();

        openCustomerFilter();
      }
    } catch (e) {
      console.log(e);
    }
  }, 500);
}

function openCustomerFilter() {
  const newWindow = window.open(
    "https://prolodev.prologistics.info/react/reports_page/customers_newsletter/",
    "_blank"
  );

  const waitForFilter = setInterval(() => {
    try {
      const doc = newWindow.document;
      if (!doc) return;

      // Ищем кнопку Filter
      const filterBtn = Array.from(doc.querySelectorAll("div button span")).find(
        (span) => span.textContent.trim() === "Filter"
      );

      if (filterBtn) {
        clearInterval(waitForFilter);

        const filterDiv = filterBtn.closest("div");
        console.log("Нашли Filter:", filterDiv);
        filterDiv.click();

        setTimeout(() => {
          clickToTransferButton(doc);
          console.log('click');
        }, 2000);
      }


    } catch (e) {
      console.warn("Пока нет доступа:", e);
    }
  }, 500);
}

function clickToTransferButton(windowPage) {
  //Code from Second button
    const blockWithId = windowPage.querySelectorAll('[id^="undefined--undefined-"]');
    const blockDiv = blockWithId[26];
    const nextDiv = blockDiv.querySelectorAll("div");
    nextDiv[0].children[1].click();

    const spanItem = windowPage.querySelectorAll('span[role="menuitem"]');

    const found = Array.from(spanItem).find((elem) => {
      return elem.textContent.trim().split(" ")[0] === "34589:";
    });
    const muiButton = windowPage.querySelector("button[type='button'][label='Transfer to batch file']");

    if (found && muiButton) {
      found.click();

      setTimeout(() => {
        muiButton.click();
      }, 1000);

      let spinnerVisible = false;

      const observer = new MutationObserver((mutations, obs) => {
        const overlay = windowPage.querySelector('div[name="blockOverlay"]');
        const spinnerContainer = overlay ? overlay.querySelector("span") : null;
        const hasSpinner = spinnerContainer && spinnerContainer.children.length > 0;

        if (hasSpinner && !spinnerVisible) {
          spinnerVisible = true;
          console.log("Спиннер виден!");
        }

        if (!hasSpinner && spinnerVisible) {
          spinnerVisible = false;
          console.log("SPinner end");
          obs.disconnect();
          // thirtyBtn.click();
        }
      });

      observer.observe(windowPage.body, { childList: true, subtree: true });
    }

    console.log(found);
  
}
