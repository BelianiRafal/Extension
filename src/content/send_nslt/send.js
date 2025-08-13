//TODO

// 1. Сделать блок где будут указывать ИД кампаний
// 2. Логика для правильного указания ид в поле выбора и шопа. 
//    Может брать из Гжешика и сравнивать с обьекта idForOpen ???

// 3. После загрузки на одной странице, переходить к другой, когда будет последняя - редирект на спам
// 4. Первая кнопка будет на стартовом экране, вторая уже на самой странице с фильтром
// 5. Автоматический клик или ручной, подумать что оставляем и протестировать
// 6. Посмотреть какой-то интересный дизайн блока, добавить алерты как всегда.

const button = document.createElement("button");
button.className = "newBtn";
button.textContent = "NEW BTN";
document.body.append(button);

const secondBtn = document.createElement("button");
secondBtn.className = "secondBtn";
secondBtn.textContent = "SECOND BTN";

document.body.append(secondBtn);

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

button.addEventListener("click", () => {
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
      }
    } catch (e) {
      console.warn("Пока нет доступа:", e);
    }
  }, 500);
});

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
    return elem.textContent.trim().split(" ")[0] === "34589:";
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
          window.location.href = redirectUrl;
        }
      }, 1000);
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  console.log(found);
});
