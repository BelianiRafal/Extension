
const table = document.querySelectorAll('[aria-live="polite"] tr');
let targetName = "";

let canceledState = false;

if (target in user) {
  targetName = user[target];
} else {
  swalFireModal('┐(￣ヘ￣;)┌', "User not found", "error", "", "", false);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    canceledState = true;
  }
});

datebtn.addEventListener("click", async (ev) => {
  ev.preventDefault();

  alertSpan.classList.remove("show");
  const loader = new Loader(ev.currentTarget, 1000);
  loader.showLoader();

  showCurrentStop.disabled = true;
  startClick.disabled = true;

  let newDateValue;
  let newTimeValue;
  const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

  if (inputForDate.value === "" || inputForTime.value === "" || !timeRegex.test(inputForTime.value)) {
    alertSpan.classList.add("show");
    loader.hideLoader();
    return false;
  } else {
    const result = await swalFireModal("", "Are the date and time correct?", "question", "", "", true);
    if (result.isConfirmed) {
      newDateValue = inputForDate.value;
      newTimeValue = inputForTime.value;
    } else {
      loader.hideLoader();
      return false;
    }
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

startClick.addEventListener("click", async () => {
  canceledState = false;
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
      if (canceledState) {
        swalFireModal("Action canceled", "", "error", "", "", false);
        break;
      }

      const item = getStarted[i];
      const currentButton = item.querySelector("input[type='button'][id^='finished']");

      try {
        currentButton.dispatchEvent(new MouseEvent("mouseover"));
        currentButton.dispatchEvent(new MouseEvent("mousedown"));
        currentButton.focus();
        currentButton.click();

        item.classList.add("clicked-color");
        await new Promise((resolve) => setTimeout(resolve, 1500));
      } catch (error) {
        console.error(`Error clicking button ${currentButton.id}:`, error);
      }
    }
  } catch (error) {
    console.error("Global error:", error);
  } finally {
    window.confirm = originalConfirm;
    window.changeSpamPlan = originalChangeSpamPlan;

    if (!canceledState) {
      const result = await swalFireModal(
        "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
        "Planning is ready! Page will be reload",
        "success",
        "",
        false
      );
      if (result.isConfirmed) return location.reload();

      item.classList.remove("clicked-color");
    }
  }
});

colorTargetRow.addEventListener("click", (ev) => {
  const loader = new Loader(ev.currentTarget, 1000);
  const currentColorTarget = sortedTableToCurrent((apply = false), null, null, loader);

  let arrInputForColor = [];

  currentColorTarget.forEach((item) => {
    item.classList.remove("active");

    return arrInputForColor.push(
      ...item.querySelectorAll("input[type='text'][name='plan_date']"),
      ...item.querySelectorAll("input[type='text'][name='plan_time']")
    );
  });

  typographyText(`Row: ${currentColorTarget.length} packages`, currentNumberText);

  filteredInput(arrInputForColor);
});

function sortedTableToCurrent(apply = false, newDateValue, newTimeValue, loader) {
  const myTime = getTime();
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

            found = true;

          }
          return true;
        }else {
          swalFireModal('┐(￣ヘ￣;)┌', "Your packs were not found", "error", "", "", false);
          loader.hideLoader();
          return false;
        }
      }
      return false;
    });
  });

  if (found && matchedRow) {
    setTimeout(() => {
      loader.hideLoader();
      showCurrentStop.disabled = false;
      startClick.disabled = false;

      Swal.fire({
        title: "Date and time set!",
        text: "The page will be reloaded.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        return location.reload();
      });

    }, 7000);
  }

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
