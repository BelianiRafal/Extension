//========================== Powered by Alex (๑˘︶˘๑)

const table = document.querySelectorAll('[aria-live="polite"] tr');
let targetName = "";
let canceledState;
let checkState = JSON.parse(localStorage.getItem("checked") || false);
const checkBtn = document.getElementById("cbx-46");
checkBtn.checked = checkState;
let forSundayRow = [];

if (target in user) {
  targetName = user[target];
} else {
  swalFireModal("┐(￣ヘ￣;)┌", "User not found", "error", "", "", false);
}

sundayCheck.addEventListener("change", (ev) => {
  checkState = ev.target.checked;
  localStorage.setItem("checked", checkBtn.checked);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    canceledState = true;
  }
});

setDateBtn.addEventListener("click", async (ev) => {
  ev.preventDefault();

  alertSpan.classList.remove("show");
  const loader = new Loader(ev.currentTarget, 1000);
  loader.showLoader();

  startClick.disabled = true;

  let newDateValue;
  let newTimeValue;

  if (inputForDate.value === "") {
    alertSpan.classList.add("show");
    loader.hideLoader();
    return false;
  }

  const result = await swalFireModal("", `Are the date is correct?`, "question", "", "", true);

  if (!result.isConfirmed) {
    loader.hideLoader();
    return false;
  }

  newDateValue = inputForDate.value;
  newTimeValue = "07:00";

  const currentRows = sortedTableToCurrent((apply = true), newDateValue, newTimeValue, loader);

  if (!currentRows) {
    loader.hideLoader();
    swalFireModal("┐(￣ヘ￣;)┌", "Your packs is not defined", "error", "", "", false);
    startClick.disabled = true;
    return false;
  }

  if (checkBtn.checked) {
    const sundayRows = currentRows.filter((row) => {
      const subjectText = findSubjectText(row);
      return subjectLines.some((item) => item.subject === subjectText);
    });

    if (sundayRows.length === 0) {
      loader.hideLoader();
      swalFireModal("┐(￣ヘ￣;)┌", "Sunday packs is not defined", "error", "", "", false);
      startClick.disabled = true;
      return false;
    }
  }
});

showCurrentStop.addEventListener("click", () => {
  stopLengthText.classList.remove("active");
  const stopBtn = document.querySelectorAll("input[type='button'][value='STOP']");

  stopBtn.forEach((item) => {
    item.style.background = "yellow";
  });

  typographyText(`STOP: ${stopBtn.length} buttons`, stopLengthText);
});

startClick.addEventListener("click", async (ev) => {
  canceledState = false;
  const loader = new Loader(ev.currentTarget, 1000);
  const getStarted = sortedTableToCurrent((apply = false));

  const originalConfirm = window.confirm;
  const originalChangeSpamPlan = window.changeSpamPlan;

  const filteredRows = getStarted.filter((row) => {
    const subjectText = findSubjectText(row);
    return !subjectLines.some((item) => item.subject === subjectText);
  });

  const proceesRows = checkState ? getStarted : filteredRows;

  try {
    window.confirm = () => true;
    window.changeSpamPlan = function () {
      console.log("changeSpamPlan called with:", arguments);
      return originalChangeSpamPlan.apply(this, arguments);
    };

    await rowToStart(proceesRows);
  } catch (error) {
    console.error("Global error:", error);
  } finally {
    checkState && localStorage.clear();
    window.confirm = originalConfirm;
    window.changeSpamPlan = originalChangeSpamPlan;

    if (!canceledState) {
      swalFireWithTimer("(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", "Planning is ready! Page will be reload", 2500);
    }
  }
});

colorTargetRow.addEventListener("click", (ev) => {
  const loader = new Loader(ev.currentTarget, 1000);
  const currentColorTarget = sortedTableToCurrent((apply = false), null, null, loader);



  if (checkBtn.checked) {
    const sundayRows = currentColorTarget.filter((row) => {
      const subjectText = findSubjectText(row);
      return subjectLines.some((item) => item.subject === subjectText);
    });

    if (sundayRows.length > 0) {
      addedInputToArray(currentColorTarget, "sundayRow", (sunday = true));
    } else {
      swalFireModal("┐(￣ヘ￣;)┌", "Sunday packs is not defined", "error", "", "", false);
    }
  } else {
    const filteredRows = currentColorTarget.filter((row) => {
      const subjectText = findSubjectText(row);
      return !subjectLines.some((item) => item.subject === subjectText);
    });
    addedInputToArray(filteredRows, "bracketsRow", (sunday = false));
  }
});

function sortedTableToCurrent(apply = false, newDateValue, newTimeValue, loader) {
  const myTime = getTime();
  const resultRows = [];
  let found = false;

  table.forEach((row) => {
    const tablerRow = row.querySelectorAll("td");

    Array.from(tablerRow).some((elem, index) => {
      if (elem.textContent.includes(targetName)) {
        const targetUserTime = checkTargetUserTime(tablerRow, index, myTime);

        if (targetUserTime) {
          const subjectText = findSubjectText(row);
          const isSunday = subjectLines.some((text) => text.subject === subjectText);

          if ((checkBtn.checked && isSunday) || (!checkBtn.checked && !isSunday)) {
            resultRows.push(row);

            if (apply) {
              filteredCurrentRow(row, newDateValue, newTimeValue);
              found = true;
            }
          }
          return true;
        }
      }
      return false;
    });
  });

  if (resultRows.length === 0) {
    swalFireModal("┐(￣ヘ￣;)┌", "Your packs were not found", "error", "", "", false);
    loader?.hideLoader();
    return false;
  }

  if (found) {
    setTimeout(() => {
      loader?.hideLoader();
      startClick.disabled = false;
      swalFireWithTimer("Date and time set!", "The page will be reloaded.", 2500);
    }, 5000);
  }

  return apply ? found : resultRows;
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

function checkTargetUserTime(tablerRow, index, myTime) {
  const dateId = tablerRow[index + 1];
  const dateText = dateId?.textContent.trim();
  return dateText.split(" ")[0] === myTime;
}

function changeDateTimeValue(elem, newValue) {
  return elem.forEach((item) => {
    item.value = newValue;
    item.setAttribute("value", newValue);
    item.dispatchEvent(new Event("input", { bubbles: true }));
    item.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

function addInputClass(elem, cssSelector) {
  return elem.forEach((item) => {
    return item.classList.toggle(cssSelector);
  });
}

function addedInputToArray(arr, cssClass, sunday) {
  let arrInputForColor = [];

  arr.forEach((item) => {
    arrInputForColor.push(
      ...item.querySelectorAll("input[type='text'][name='plan_date']"),
      ...item.querySelectorAll("input[type='text'][name='plan_time']")
    );
  });

  typographyText(`${sunday ? "Sunday row:" : "Row:"}` + " " + `${arr.length} packages`, currentNumberText);
  addInputClass(arrInputForColor, cssClass);
}

function findSubjectText(row) {
  const findSubject = row.querySelectorAll("td a");
  return findSubject[2]?.textContent.trim();
}

async function rowToStart(row) {
  for (let i = 0; i < row.length; i++) {
    if (canceledState) {
      swalFireModal("Action canceled", "", "error", "", "", false);
      break;
    }

    const item = row[i];
    const currentButton = item.querySelector("input[type='button'][id^='finished']");

    try {
      currentButton.dispatchEvent(new MouseEvent("mouseover"));
      currentButton.dispatchEvent(new MouseEvent("mousedown"));
      currentButton.focus();
      currentButton.click();

      item.classList.add("clicked-color");
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(error);
    }
  }
}

function filteredCurrentRow(item, newDateValue, newTimeValue) {
  item.classList.remove("bracketsRow");
  item.classList.add("active");

  const planDateInput = item.querySelectorAll("input[type='text'][name='plan_date']");
  const planTimeInput = item.querySelectorAll("input[type='text'][name='plan_time']");

  changeDateTimeValue(planDateInput, newDateValue);
  changeDateTimeValue(planTimeInput, newTimeValue);
}
