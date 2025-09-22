const url = "https://www.prologistics.info/react/reports_page/customers_newsletter/?filter_id=";
const customerUrl = "https://www.prologistics.info/react/reports_page/customers_newsletter/";
const planingUrl = "https://www.prologistics.info/spam_plan.php";
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

closeCard.addEventListener("click", () => {
  spanText.classList.remove("show");
  mainCard.classList.add("implode-animation");
  setTimeout(() => {
    mainCard.classList.remove("implode-animation");
    mainCard.classList.remove("explode-animation");
    overlay.classList.remove("active");
    document.body.classList.remove("noScroll");
  }, 800);
});

mainButtonStart.addEventListener("click", async () => {
  const campaignLink = getIdForLink();
  if (!campaignLink) {
    swalFireModal("¯\\_(ツ)_/¯", `Newsletter checklist is not found`, "error", "", "", false);
    return false;
  }

  overlay.classList.add("active");
  mainCard.classList.add("explode-animation");
  document.body.classList.add("noScroll");

  const mainInformation = document.querySelectorAll('[id="virtualize-demo"]');
  const subjectInformation = document.querySelectorAll('[id="Subject"]');
  const subjectSplitText = subjectInformation[0].nextSibling.textContent.split("SL:")[0].trim();
  const solvingUser = mainInformation[0].defaultValue;

  const anotherSolving = document.querySelectorAll(".panel-body .row");
  const anotherResult = anotherSolving[0].children[1].children[1].textContent.split("Solving user")[1];

  solvingUserText.textContent = solvingUser ? solvingUser : anotherResult;
  subjectText.textContent = subjectSplitText;
  campaignIdText.textContent = `CHDE ID: ${campaignLink}`;
});

getCampaignIdBtn.addEventListener("click", async () => {
  const chdeLinkId = await getIdForLink();

  if (!chdeLinkId) {
    swalFireModal("¯\\_(ツ)_/¯", `Newsletter checklist is not found`, "error", "", "", false);
    return false;
  }

  const result = await swalFireModal(`Campaing id "${chdeLinkId}" is correct?`, ``, "question", "", "", true);

  if (result.isConfirmed) {
    //Open page with Mailing templates
    openMailTable(chdeLinkId, "duplicateId");

    //Return to main page
    chrome.runtime.sendMessage({ action: "setFirstTab" });
    startOrStopLoader(true);
    informationBlock.style.display = "none";
  } else {
    return false;
  }
});

function openMailTable(valueId, variable) {
  return new Promise((resolve, reject) => {
    const ids = [];
    const newsMailWindow = window.open(`${newsEmailUrl + valueId}`, "_blank");

    const waitForMail = setInterval(() => {
      try {
        const doc = newsMailWindow.document;
        if (!doc || doc.readyState !== "complete") return;
        const tableMain = doc.querySelectorAll("center table.tablesorter tbody tr td form div a");

        getIdsForNewsMail(tableMain, waitForMail, ids, newsMailWindow, resolve, variable);
      } catch (e) {
        reject(new Error("Ooops, something get wrong..."));
      }
    }, 500);
  });
}

function openCustomerFilter(ids, index = 0) {
  if (index >= ids.length) {
    startOrStopLoader(false);
    swalFireModal(`Done`, `Your id is already!`, "success", "", "", false);
    customerCopyWrapper.style.display = "flex";
    getCampaignIdBtn.style.display = "none";
    return;
  }

  const valuesForOpen = Object.values(shopId);

  chrome.runtime.sendMessage({ action: "goToFirstTab" });
  const newWindow = window.open(`${customerUrl}?filter_id=${valuesForOpen[index]}`, "_blank");
  const objectKey = Object.keys(shopId).find((key) => shopId[key] === valuesForOpen[index]);

  const waitForFilter = setInterval(() => {
    try {
      const doc = newWindow.document;
      if (!doc && doc.readyState !== "complete") return;

      const registeredSeller = doc.querySelectorAll(".panel-body");
      const nextElement = registeredSeller[0].children[1].children[3];
      const findArea = Array.from(nextElement.querySelectorAll('[id^="undefined--undefined-"]'));
      const clickArea = findArea[0].children[0].children[1];

      const filterBtn = Array.from(doc.querySelectorAll("div button span")).find(
        (span) => span.textContent.trim() === "Filter"
      );

      if (filterBtn && objectKey && clickArea) {
        clearInterval(waitForFilter);
        updateStatus(objectKey, "&#10060;");

        clickArea.click();
        setTimeout(() => {
          clickArea.click();
        }, 200);

        const filterDiv = filterBtn.closest("div");
        setTimeout(() => {
          filterDiv.click();

          setTimeout(() => {
            clickToTransferButton(doc, index, ids, objectKey);
          }, 1000);
        }, 1500);
      }
    } catch (e) {
      console.warn("Not access", e);
    }
  }, 500);
}

async function clickToTransferButton(windowPage, index, ids, objectKey) {
  // Code from Second button
  const blockWithId = await waitTransferElement(windowPage, '[id^="undefined--undefined-"]', 27);
  const blockDiv = blockWithId[26];
  const nextDiv = blockDiv.querySelectorAll("div");

  if (nextDiv.length && nextDiv[0].children[1]) {
    nextDiv[0].children[1].click();
  }

  console.log(ids);

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
    watchToLoader(windowPage, index, spinnerVisible, ids, objectKey);
  }
}

function watchToLoader(windowPage, index, spinnerVisible, ids, objectKey) {
  const observer = new MutationObserver((mutations, obs) => {
    const overlay = windowPage.querySelector('div[name="blockOverlay"]');
    const spinnerContainer = overlay ? overlay.querySelector("span") : null;
    const hasSpinner = spinnerContainer && spinnerContainer.children.length > 0;

    if (hasSpinner && !spinnerVisible) {
      spinnerVisible = true;

      setTimeout(() => {
        openCustomerFilter(ids, index + 1);
      }, 2000);
    }

    if (!hasSpinner && spinnerVisible) {
      spinnerVisible = false;
      updateStatus(objectKey, "&#9989;");
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
      } else if (Date.now - start > wait) {
        console.log("Big time for wait");
        reject(element);
        clearInterval(timer);
      }

      console.log("wait...");
    }, 200);
  });
}

function updateStatus(key, status) {
  let line = document.querySelector(`[data-key="${key}"]`);

  if (!line) {
    line = document.createElement("div");
    line.dataset.key = key;
    line.className = "saveNameData";

    const keySpan = document.createElement("span");
    keySpan.textContent = key;
    keySpan.style.display = "inline-block";
    keySpan.className = "saveNameText";

    const statusSpan = document.createElement("span");
    statusSpan.classList.add("status-cell");
    statusSpan.innerHTML = status;

    line.appendChild(keySpan);
    line.appendChild(statusSpan);

    saveNameBlock.appendChild(line);
  } else {
    line.querySelector(".status-cell").innerHTML = status;
  }
}

function startOrStopLoader(status = false) {
  if (status) {
    mainCardContainer.style.display = "none";
    loaderBlock.style.display = "flex";
    saveNameBlock.style.display = "flex";
  } else {
    mainCardContainer.style.display = "flex";
    loaderBlock.style.display = "none";
    saveNameBlock.style.display = "flex";
  }
}

function getIdForLink() {
  const findChecklistText = document.querySelectorAll('[class="panel-heading"][id="collapseHeading"]');
  const getText = Array.from(findChecklistText).find((text) => {
    return text.textContent.toLowerCase().trim().includes("newsletter testing");
  });

  if (!getText) {
    swalFireModal("", "Checklist for CHDE is not found -____-", "error", "", "", false);
    return;
  }

  const ulList = getText.nextSibling;
  const ulItem = ulList.querySelectorAll('ul div li div [class^="jss"] a');
  const hasCHDE = Array.from(ulItem).find((item) => {
    return item.previousSibling.textContent.includes("CHDE");
  });

  if (!hasCHDE) {
    swalFireModal("", "Checklist for CHDE is not found -____-", "error", "", "", false);
    return;
  }

  const chdeLinkId = hasCHDE?.href?.split("id=")[1];

  return chdeLinkId;
}

function getIdsForNewsMail(table, intervalName, arrayId, window, resolve, variable) {
  const startTimer = Date.now();
  if (table.length > 0) {
    table.forEach((item, index) => {
      const url = item.href;
      const valueInLink = url.match(/id=(\d+)/);
      const id = valueInLink[1];

      pushIdFromArray(variable, index, arrayId, id);
    });

    //Remove id for BEFR/BENL
    variable === "duplicateId" ? arrayId.splice(5, 2) : arrayId.splice(3, 2);

    clearInterval(intervalName);
    window.close();
    resolve(arrayId);

    //Для запуска дальше
    variable === "duplicateId" ? openCustomerFilter(arrayId, 0) : console.log("Функция считывания!");
  } else if (Date.now() - startTimer > 10000) {
    clearInterval(intervalName);
    window.close();
    swalFireModal("┐(￣ヘ￣;)┌", "Timeout: no response for your campaign, repeat again", "error", "", "", false);
    startOrStopLoader(false);
  }
}

function pushIdFromArray(variable, index, arrayId, mailsId) {
  if (variable === "duplicateId") {
    if (index === 0 || index === 1 || index === 6) {
      arrayId.push(mailsId, mailsId);
    } else {
      arrayId.push(mailsId);
    }
    return arrayId;
  } else {
    arrayId.push(mailsId);
    return arrayId;
  }
}

//! Для логиги АБ теста
function getidForAB() {
  //   const AB = Array.from(findChecklistText).filter((item) => {
  //   return item.textContent.toLowerCase().trim().includes("newsletter testing");
  // });
  // const ABlist = AB.forEach((item) => {
  //   const itemList = item.nextSibling;
  //   const ulItem = itemList.querySelectorAll('ul div li div [class^="jss"] a');
  //   const itemHasCHDE = Array.from(ulItem).find((item) => {
  //     return item.previousSibling.textContent.includes("CHDE");
  //   });
  //   const chdeLinkId = itemHasCHDE.href.split("id=")[1];
  //   //Назначаем кнопке значение с ид и кликаем по нужным, дальше нужно передать это значение
  //   const abBtn = document.createElement("button");
  //   abBtn.textContent = chdeLinkId;
  //   abBtn.value = chdeLinkId;
  //   abBtn.className = "abBtn";
  //   ABbtnContainer.append(abBtn);
  //   console.log("AB length", AB.length);
  //   abBtn.addEventListener("click", async (e) => {
  //     console.log(e.currentTarget.value);
  //     // const result = await swalFireModal(`Campaing id "${chdeLinkId}" is correct?`, ``, "question", "", "", true);
  //     // if (result.isConfirmed) {
  //     //   openMailTable(chdeLinkId);
  //     //   chrome.runtime.sendMessage({ action: "setFirstTab" });
  //     //   startOrStopLoader(true);
  //     // } else {
  //     //   getCampaignIdBtn.disabled = false;
  //     //   return false;
  //     // }
  //   });
  //   getCampaignIdBtn.disabled = true;
  // });
}

//! Logic for Fetch customer button and copy button

customerTableBtn.addEventListener("click", async () => {
  chrome.runtime.sendMessage({ action: "setFirstTab" });
  showButtonLoader(customerTableBtn, customerLoaderWrapper);

  const arrayForSpreadsheet = [];
  const chdeId = await getIdForLink();
  const idsArr = await openMailTable(chdeId, "not duplicate");

  openTableForCustomer(idsArr, arrayForSpreadsheet, (index = 0));
});

function openTableForCustomer(openId, stateArr, index) {
  if (index >= openId.length) {
    stateArr.splice(5, 0, null);
    stateArr.splice(6, 0, null);
    copyArrayToClipboard(stateArr, modal = true);
    hideButtonLoader(customerTableBtn, customerLoaderWrapper);
    copyBtn.style.display = "block";
    copyBtnClick(stateArr);
    return;
  }

  const arrayRow = [];

  chrome.runtime.sendMessage({ action: "goToFirstTab" });
  const openWindow = window.open(`${newsEmailUrl + openId[index]}`, "_blank");

  const waitResponse = setInterval(() => {
    try {
      const doc = openWindow.document;
      if (!doc || doc.readyState !== "complete") return;

      const customerContTable = doc.querySelectorAll("center h3");

      const sortedTable = Array.from(customerContTable).find((text) => {
        return text.textContent.trim().toLowerCase().includes("newsmail history");
      });
      if (!sortedTable) {
        console.log("Wait for render title...");
        return;
      }

      const findTable = sortedTable.nextElementSibling;

      if (!findTable) {
        console.log("Wait for render table...");
        return;
      }
      const tableBody = findTable.querySelectorAll('tbody [role="row"]');

      sortedFIlteredRow(tableBody, arrayRow);

      const incrementTotal = arrayRow[1]?.children[3].textContent;
      const sumFooter = arrayRow.reduce((accum, item) => {
        return accum + Number(item?.children[3].textContent);
      }, 0);

      if (arrayRow.length > 0) {
        const resultEndForIncrement = sumFooter - incrementTotal;
        if (index === 0 || index === 1 || index === 4) {
          stateArr.push(resultEndForIncrement, Number(incrementTotal));
        } else {
          stateArr.push(Number(sumFooter));
        }

        clearInterval(waitResponse);
        openWindow.close();
      }

      setTimeout(() => {
        openTableForCustomer(openId, stateArr, index + 1);
      }, 500);
    } catch (e) {
      swalFireModal(`Dude`, `Something get wrong...`, "error", "", "", false);
      console.log(e);
      clearInterval(waitResponse);
      hideButtonLoader(customerTableBtn, customerLoaderWrapper);
    }
  }, 500);
}

async function copyArrayToClipboard(arr, modal) {
  try {
    const text = arr.join("\n");
    await navigator.clipboard.writeText(text);

    modal
      ? swalFireModal(
          `Great!`,
          `Customer count is copy to clipboard. Only paste in spreadsheet!`,
          "success",
          "",
          "",
          false
        )
      : "";
  } catch (err) {
    swalFireModal(`Dude`, `Something get wrong...`, "error", "", "", false);
  }
}

function showButtonLoader(button, loaderElement) {
  button.dataset.originalContent = button.innerHTML;

  button.innerHTML = "";
  button.appendChild(loaderElement);
  button.disabled = true;
}

function hideButtonLoader(button, loaderElement) {
  if (button.contains(loaderElement)) {
    button.removeChild(loaderElement);
  }
  if (button.dataset.originalContent) {
    button.innerHTML = button.dataset.originalContent;
    delete button.dataset.originalContent;
  }
  button.disabled = false;
}

function sortedFIlteredRow(tableBody, arr) {
  const [originalDate, originalTime] = tableBody[tableBody.length - 2].children[0].textContent.split(" ");
  const splitOriginalTIme = originalTime.split(":")[1];

  tableBody.forEach((item) => {
    const text = item.children[0].textContent.trim();

    // может быть "16.09.2025 14:35:29" или "14:35:29"

    let myDate, myTime;

    if (text.includes(" ")) {
      [myDate, myTime] = text.split(" ");
    } else {
      myTime = text;
    }

    const [hh, mm, ss] = myTime.split(":").map(Number);
    // console.log(mytimeeeeeee.split(" "));

    // console.log(splitOriginalTIme > splitOriginalTIme - myTime.split(":")[1]);

    //! Допроверять функцию

    if (Number(splitOriginalTIme) === mm || Number(splitOriginalTIme) === mm + 1) {
      return arr.push(item);
    }
  });
}

function copyBtnClick(arr) {
  copyBtn.addEventListener("click", () => {
    copyArrayToClipboard(arr, modal = false);
  });
}
