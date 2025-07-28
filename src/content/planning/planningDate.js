//Добавить кнопку, которая просто будет подсвечивать строки
//Стилизовать блок с инпутом и кнопкой
//Разбить на более мелкие функции
//Функция клика по кнопке через каждые 0.5 секунду

const user = {
  OleHrytsa: "Oleksander Hrytsaienko",
  RKobus: "Rafał Kobus",
  JurgowiakM: "Michał Jurgowiak",
  KaKazaniecki: "Kamil Kazaniecki",
  Orlinski: "Kamil Orliński",
};

const target = document.body.getAttribute("data-user");
let targetName = "";

if (target in user) {
  targetName = user[target];
  console.log(targetName);
} else {
  console.log("sorry");
}

datebtn.addEventListener("click", () => {
  alertSpan.classList.remove("show");
  // const myTime = getTime();

  const myTime = "2025-05-30";
  const childNodesArray = [];
  let newDateValue;
  let newTimeValue;

  if (inputForDate.value === "" && inputForTime.value === "") {
      alertSpan.classList.add('show');
    return false;
  } else {
    console.log(inputForDate.value);
    newDateValue = inputForDate.value;
    newTimeValue = inputForTime.value;
  }

  const table = document.querySelectorAll('[aria-live="polite"] tr');

  table.forEach((row) => {
    const tablerRow = row.querySelectorAll("td");

    const targetUser = Array.from(tablerRow).some((elem, index) => {
      if (elem.textContent.includes(targetName)) {
        const dateId = tablerRow[index + 1];
        const dateText = dateId?.textContent.trim();

        const targetUserTime = dateText.split(" ")[0] === myTime;

        if (targetUserTime) {
          row.classList.add("active");


          const planDateInput = row.querySelectorAll("input[type='text'][name='plan_date']");
          const planTimeInput = row.querySelectorAll("input[type='text'][name='plan_time']");

          changeDateTimeValue(planDateInput, newDateValue);
          changeDateTimeValue(planTimeInput, newTimeValue);

        }
      }
    });
  });
  // alert("Page will been reload");
  // setTimeout(() => {
  //   location.reload();
  // }, 7000);
});

function getTime() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const cutoff = new Date(now);
  const yyyy = cutoff.getFullYear();
  const mm = String(cutoff.getMonth() + 1).padStart(2, "0");
  const dd = String(cutoff.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function changeDateTimeValue(elem, newValue) {
  return elem.forEach((item) => {
    item.value = newValue;
    item.setAttribute("value", newValue);
    item.dispatchEvent(new Event("input", { bubbles: true }));
    item.dispatchEvent(new Event("change", { bubbles: true }));
  });
}
