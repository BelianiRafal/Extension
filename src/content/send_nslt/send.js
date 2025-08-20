//TODO

//  Логика для правильного указания ид в поле выбора и шопа.
//   Может брать из Гжешика и сравнивать с обьекта idForOpen ???

//  После загрузки на одной странице, переходить к другой, когда будет последняя - редирект на спам
//  Первая кнопка будет на стартовом экране, вторая уже на самой странице с фильтром
//  Автоматический клик или ручной, подумать что оставляем и протестировать
//  Посмотреть какой-то интересный дизайн блока, добавить алерты как всегда.

// const button = document.createElement("button");
// button.className = "newBtn";
// button.textContent = "NEW BTN";
// document.body.append(button);

const overlay = document.createElement('div');
overlay.className = 'overlay';

const closeCard = document.createElement('button');
closeCard.textContent = 'x';
closeCard.className = 'closeBtn';

const idForInput = document.createElement('input');
idForInput.type = 'text';
idForInput.className = 'mainInput';
idForInput.placeholder = 'Id for CHDE campaign';

const closeBtn = document.createElement

const mainCard = document.createElement('div');
mainCard.className = 'mainCard'

const mainCardContainer = document.createElement('div');
mainCardContainer.className = 'mainCard-container';


const button = document.createElement("button");
button.className = "Btn";
button.innerHTML = `<div class="sign">
<svg viewBox="0 0 512 512">
<path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z">
</path></svg></div>
<div class="text">Customers</div>`;

const startBtn = document.createElement('button');
startBtn.className = 'startBtn';
startBtn.innerHTML = `<span data-text="Send">Send</span>`;

mainCardContainer.append(idForInput);
mainCardContainer.append(startBtn);
mainCardContainer.append(closeCard);
mainCard.append(mainCardContainer);
document.body.append(mainCard);
document.body.append(button);
document.body.append(overlay);

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

closeCard.addEventListener('click', () => {
  mainCard.classList.add("implode-animation");
  setTimeout(() => {
    mainCard.classList.remove('implode-animation');
    mainCard.classList.remove('explode-animation');
    overlay.classList.remove('active');
  }, 800);
})

button.addEventListener("click", () => {
  overlay.classList.add('active');
  mainCard.classList.add('explode-animation');
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
