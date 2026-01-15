const url = "https://www.prologistics.info/react/reports_page/customers_newsletter/?filter_id=";
const customerUrl = "https://www.prologistics.info/react/reports_page/customers_newsletter/";
const planingUrl = "https://www.prologistics.info/spam_plan.php";
const newsEmailUrl = "https://www.prologistics.info/news_email.php?id=";

const id = "11607";

let checkstate = "";
ABcheckBtn.checked = checkstate;

ABcheckBtn.addEventListener("change", (ev) => {
  checkstate = ev.target.checked;
});

const shopId = {
  CHDE: 11607,
  "CHDE-RICARDO": 11606,
  CHFR: 11604,
  "CHFR-RICARDO": 11605,
  AT: 46175,
  BENL: 1309711,
  BEFR: 1309715,
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
  const campaignLink = await getIdForLink();
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
  const waitChecklist = await getChecklist();
  const doubleChecklist = getidForAB();

  if (doubleChecklist.length >= 2 && !checkstate) {
    swalFireModal("", `You have two checklist, Mark the "A/B Test" checkbox`, "error", "", "", false);
    return;
  }

  if (!chdeLinkId || !waitChecklist) {
    swalFireModal("¯\\_(ツ)_/¯", `Newsletter checklist is not found`, "error", "", "", false);
    return false;
  }

  for (const item of waitChecklist) {
    if (item.done !== "1") {
      swalFireModal("Not to fast", `Please mark "${item.description}" in the checklist`, "error", "", "", false);
      return;
    }
  }

  if (doubleChecklist.length >= 2 && checkstate) {
    const resultArray = await splitedArrayForABtest();

    chrome.runtime.sendMessage({ action: "setFirstTab" });
    startOrStopLoader(true);
    informationBlock.style.display = "none";

    openCustomerFilter(resultArray, 0, doubleChecklist);
  } else {
    // console.log(getCheck);
    const result = await swalFireModal(`Campaing id "${chdeLinkId}" is correct?`, ``, "question", "", "", true);

    if (result.isConfirmed) {
      //Open page with Mailing templates
      const idsArray = await openMailTable("duplicateId");
      //Return to main page
      chrome.runtime.sendMessage({ action: "setFirstTab" });
      startOrStopLoader(true);
      informationBlock.style.display = "none";
      openCustomerFilter(idsArray, 0, doubleChecklist);
    } else {
      return false;
    }
  }
});

async function openMailTable(variable) {
  const idFromChecklist = await getStandartTestingChecklist();
  const ids = [];

  idFromChecklist.forEach((item, index) => {
    pushIdFromArray(variable, index, ids, item.id);
  });

  return ids;
}

async function openCustomerFilter(ids, index = 0, abchecklist) {
  if (index >= ids.length || index >= Object.keys(shopId).length) {
    setTimeout(() => {
      startOrStopLoader(false);
      swalFireModal(`Done`, `Your id is already!`, "success", "", "", false);
      customerCopyWrapper.style.display = "flex";
      getCampaignIdBtn.style.display = "none";
      ABcheckBtn.style.display = "none";
    }, 800);
    return;
  }

  const valuesForOpen = Object.values(shopId);
  const GZdata = await getSavingSetting(valuesForOpen[index]);

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
        setTimeout(async () => {
          filterDiv.click();

          const GRZESIEK = splittedGrziesName(GZdata, ids);

          if (abchecklist.length === 2) {
            handleCheckboxClicked(doc, GRZESIEK, ids, index, objectKey);
          } else {
            setTimeout(() => {
              clickToTransferButton(doc, index, ids, objectKey);
            }, 1000);
          }
        }, 1500);
      }
    } catch (e) {
      console.warn("Not access", e);
    }
  }, 500);
}

//! Automatically clicked to checbox A/B to issue
function handleCheckboxClicked(doc, pasteId, ids, index, objectKey) {
  const myInterval = setInterval(async () => {
    try {
      if (pasteId.length === 2) {
        const labels = doc.querySelectorAll("label.MuiFormControlLabel-root");

        if (!labels) return;

        labels.forEach((label) => {
          if (label.textContent.includes("make test A/B")) {
            const checkbox = label.querySelector('input[type="checkbox"]');

            if (checkbox) {
              clearInterval(myInterval);

              setTimeout(async () => {
                checkbox.click();

                const [firstInput, secondInput] = await getFirstOrSecondInput(
                  doc,
                  '[id^="undefined--undefined-"]',
                  [26, 27]
                );
                const firstDiv = firstInput.querySelectorAll("div");
                const secondDiv = secondInput.querySelectorAll("div");

                setTimeout(() => {
                  handleClickForItem(doc, firstDiv, pasteId[0], false, ids, index, objectKey);

                  setTimeout(() => {
                    handleClickForItem(doc, secondDiv, pasteId[1], true, ids, index, objectKey);
                  }, 1300);
                }, 1000);
              }, 500);
            }
          }
        });
      } else if (pasteId.length === 1) {
        clearInterval(myInterval);

        const [firstInput] = await getFirstOrSecondInput(doc, '[id^="undefined--undefined-"]', [26, 27]);
        const firstDiv = firstInput.querySelectorAll("div");
        handleClickForItem(doc, firstDiv, pasteId[0], true, ids, index, objectKey);
      }
    } catch (e) {
      console.log("access denied");
      clearInterval(myInterval);
    }
  }, 500);
}




//! ФУНКЦИЮ ВЗЯЛ С FUTURE
async function clickToTransferButton(windowPage, index, ids, objectKey) {
  // Code from Second button
  const blockWithId = await waitTransferElement(windowPage, '[id^="undefined--undefined-"]', 27);
  const blockDiv = blockWithId[26];
  const nextDiv = blockDiv.querySelectorAll("div");

  if (nextDiv.length && nextDiv[0].children[1]) {
    nextDiv[0].children[1].click();
  }

  const spanItem = await windowPage.querySelectorAll('span[role="menuitem"]');

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

async function watchToLoader(windowPage, index, spinnerVisible, ids, objectKey) {
  const doubleChecklist = getidForAB();

  const observer = new MutationObserver((mutations, obs) => {
    const overlay = windowPage.querySelector('div[name="blockOverlay"]');
    const spinnerContainer = overlay ? overlay.querySelector("span") : null;
    const hasSpinner = spinnerContainer && spinnerContainer.children.length > 0;

    if (hasSpinner && !spinnerVisible) {
      spinnerVisible = true;

      setTimeout(() => {
        openCustomerFilter(ids, index + 1, doubleChecklist);
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

async function getIdForLink() {
  const needId = await getStandartTestingChecklist();

  if (!needId.length < 0) {
    swalFireModal("", "Checklist for CHDE is not found -____-", "error", "", "", false);
    return;
  }

  const chdeLinkId = needId[0].id;
  return chdeLinkId;
}

function getIdsForNewsMail(table, arrayId, resolve, variable) {
  const doubleChecklist = getidForAB();

  if (table.length > 0) {
    table.forEach((item, index) => {
      pushIdFromArray(variable, index, arrayId, item.id);
    });

    resolve(arrayId);

    //For next scripts
    variable === "duplicateId" ? openCustomerFilter(arrayId, 0, doubleChecklist) : console.log("Subscribers count!");
  } else {
    swalFireModal("┐(￣ヘ￣;)┌", "Something get wrong. Please try again", "error", "", "", false);
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

//! Logic for Fetch customer button and copy button
customerTableBtn.addEventListener("click", async () => {
  chrome.runtime.sendMessage({ action: "setFirstTab" });
  showButtonLoader(customerTableBtn, customerLoaderWrapper);

  const arrayForSpreadsheet = [];
  const chdeId = await getIdForLink();
  const idsArr = await openMailTable(chdeId, "not duplicate");

  openTableForCustomer(idsArr, arrayForSpreadsheet, 0);
});

function openTableForCustomer(openId, stateArr, index) {
  if (index >= openId.length) {
    copyArrayToClipboard(stateArr, true);
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
      if (!sortedTable) return;

      const findTable = sortedTable.nextElementSibling;
      if (!findTable) return;

      const tableBody = findTable.querySelectorAll('tbody [role="row"]');

      sortedFIlteredRow(tableBody, arrayRow);

      if (arrayRow.length > 0) {
        const incrementTotal = Number(arrayRow[1]?.children[3].textContent) || 0;
        const sumFooter = arrayRow.reduce((accum, item) => {
          const value = Number(item?.children[3].textContent);
          return accum + (isNaN(value) ? 0 : value);
        }, 0);

        const resultEndForIncrement = sumFooter - incrementTotal;

        if (index === 0 || index === 1 || index === 6) {
          stateArr.push(
            isNaN(resultEndForIncrement) ? 0 : resultEndForIncrement,
            isNaN(incrementTotal) ? 0 : incrementTotal
          );
        } else {
          stateArr.push(isNaN(sumFooter) ? 0 : sumFooter);
        }

        clearInterval(waitResponse);
        openWindow.close();

        setTimeout(() => {
          openTableForCustomer(openId, stateArr, index + 1);
        }, 500);
      }
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

function sortedFIlteredRow(tableBody, arr) {
  const [originalDate, originalTime] = tableBody[tableBody.length - 2].children[0].textContent.split(" ");
  const splitOriginalTIme = originalTime.split(":")[1];

  tableBody.forEach((item) => {
    const text = item.children[0].textContent.trim();

    let myDate, myTime;

    if (text.includes(" ")) {
      [myDate, myTime] = text.split(" ");
    } else {
      myTime = text;
    }

    const [hh, mm, ss] = myTime.split(":").map(Number);

    if (Number(splitOriginalTIme) === mm || Math.abs(Number(splitOriginalTIme) - mm) <= 1) {
      return arr.push(item);
    }
  });
}

function copyBtnClick(arr) {
  copyBtn.addEventListener("click", () => {
    copyArrayToClipboard(arr, (modal = false));
  });
}

function handleClickForItem(page, item, id, clickBtn, ids, index, objectKey) {
  item[0].children[1].click();

  setTimeout(() => {
    const spanItem = page.querySelectorAll('span[role="menuitem"]');
    const found = Array.from(spanItem).find((elem) => {
      const text = elem.textContent.trim();
      return text.includes(`${String(id)}:`);
    });

    if (!found) return;

    const muiButton = page.querySelector("button[type='button'][label='Transfer to batch file']");

    if (found && muiButton) {
      found.click();

      if (clickBtn) {
        setTimeout(() => {
          muiButton.click();
        }, 1000);
      }

      if (clickBtn) {
        let spinnerVisible = false;
        watchToLoader(page, index, spinnerVisible, ids, objectKey);
      }
    }
  }, 500);
}
