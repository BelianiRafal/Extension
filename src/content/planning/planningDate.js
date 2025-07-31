//Если у кого-то есть Sunday, проверять ИД или по первому значению CHDE

//Разбить на более мелкие функции

//В конце рабочей логики добавить mytime из функции

const table = document.querySelectorAll('[aria-live="polite"] tr');
let targetName = "";

if (target in user) {
  targetName = user[target];
  console.log(targetName);
} else {
  console.log("sorry");
}

datebtn.addEventListener("click", (ev) => {
  const loader = new Loader(ev.currentTarget, 1000);

  loader.showLoader();
  showCurrentStop.disabled = true;
  startClick.disabled = true;

  alertSpan.classList.remove("show");

  let newDateValue;
  let newTimeValue;

  if (inputForDate.value === "" && inputForTime.value === "") {
    alertSpan.classList.add("show");
    loader.hideLoader();
    return false;
  } else {
    newDateValue = inputForDate.value;
    newTimeValue = inputForTime.value;
  }

  sortedTableToCurrent((apply = true), newDateValue, newTimeValue, loader);
});

showCurrentStop.addEventListener("click", () => {
  stopLengthText.classList.remove("active");
  const stopBtn = document.querySelectorAll("input[type='button'][value='STOP']");

  stopBtn.forEach((item) => {
    item.style.background = "yellow";
  });

  typographyText(`STOP: ${stopBtn.length} buttons`, stopLengthText);
});

colorTargetRow.addEventListener("click", () => {
  const currentColorTarget = sortedTableToCurrent((apply = false));
  let arrInputForColor = [];

  currentColorTarget.forEach((item) => {
    item.classList.remove("active");
    // item.classList.toggle("bracketsRow");

    return arrInputForColor.push(
      ...item.querySelectorAll("input[type='text'][name='plan_date']"),
      ...item.querySelectorAll("input[type='text'][name='plan_time']")
    );
  });

  typographyText(`Row: ${currentColorTarget.length}`, currentNumberText);

  filteredInput(arrInputForColor);
});

startClick.addEventListener("click", async () => {
  const getStarted = sortedTableToCurrent((apply = false));

  const originalConfirm = window.confirm;
  const originalChangeSpamPlan = window.changeSpamPlan;

  try {
    window.confirm = () => true;

    window.changeSpamPlan = function () {
      console.log("changeSpamPlan called with:", arguments);
      return originalChangeSpamPlan.apply(this, arguments);
    };

    for (let i = 0; i < getStarted.length; i++) {
      const item = getStarted[i];
      const currentButton = item.querySelector("input[type='button'][id^='finished']");

      if (!currentButton) {
        console.warn(`Button not found in item ${i}`);
        continue;
      }

      console.log(`Processing button ${currentButton.id} (Current value: ${currentButton.value})`);

      try {
        currentButton.dispatchEvent(new MouseEvent("mouseover"));
        currentButton.dispatchEvent(new MouseEvent("mousedown"));
        currentButton.focus();

        currentButton.click();

        item.classList.add("clicked-color");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Проверяем изменилось ли значение
        console.log(`Button ${currentButton.id} new value: ${currentButton.value}`);
      } catch (error) {
        console.error(`Error clicking button ${currentButton.id}:`, error);
      }
    }
  } catch (error) {
    console.error("Global error:", error);
  } finally {
    window.confirm = originalConfirm;
    window.changeSpamPlan = originalChangeSpamPlan;

    Swal.fire({
      title: "Good job!",
      text: "Planning is ready! Page will be reload",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) return location.reload();
    });

    item.classList.remove("clicked-color");
  }
});

function sortedTableToCurrent(apply = false, newDateValue, newTimeValue, loader) {
  const myTime = "2025-05-30";
  const matchedRow = [];

  let found = false;

  table.forEach((row) => {
    const tablerRow = row.querySelectorAll("td");

    const targetUser = Array.from(tablerRow).some((elem, index) => {
      if (elem.textContent.includes(targetName)) {
        const dateId = tablerRow[index + 1];
        const dateText = dateId?.textContent.trim();

        const targetUserTime = dateText.split(" ")[0] === myTime;
        if (targetUserTime) {
          matchedRow.push(row);

          if (apply) {
            row.classList.remove("bracketsRow");
            row.classList.add("active");

            const planDateInput = row.querySelectorAll("input[type='text'][name='plan_date']");
            const planTimeInput = row.querySelectorAll("input[type='text'][name='plan_time']");

            changeDateTimeValue(planDateInput, newDateValue);
            changeDateTimeValue(planTimeInput, newTimeValue);

            setTimeout(() => {
              loader.hideLoader();
              showCurrentStop.disabled = false;
              startClick.disabled = false;
              row.classList.remove("active");
            }, 6000);

            found = true;
          }
          return true;
        }
      }
      return false;
    });
  });

  return apply ? found : matchedRow;
}

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

function filteredInput(elem) {
  return elem.forEach((item) => {
    return item.classList.toggle("bracketsRow");
  });
}

openPlaningTool.addEventListener('click', () => {
  mainBlock.classList.add('active');
})

closeButton.addEventListener("click", () => {
  mainBlock.classList.remove("active");
})


