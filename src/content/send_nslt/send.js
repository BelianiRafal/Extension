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
  }, 800);
});

button.addEventListener("click", async () => {
  overlay.classList.add("active");
  mainCard.classList.add("explode-animation");
});

// startBtn.addEventListener("click", async () => {
//   spanText.classList.remove("show");
//   const value = idForInput.value;
//   const regex = /[a-zA-Z]|\d{7,}/;

//   if (value === "" || regex.test(value)) {
//     spanText.classList.add("show");
//     return;
//   }

//   const result = await swalFireModal(`Campaing id "${value}" is correct?`, ``, "question", "", "", true);
//   if (result.isConfirmed) {
//     openMailTable(value);
//     chrome.runtime.sendMessage({ action: "setFirstTab" });
//     startOrStopLoader(true);
//   } else {
//     return false;
//   }
// });

getCampaignIdBtn.addEventListener("click", async () => {
  const findChecklistText = document.querySelectorAll('[class="panel-heading"][id="collapseHeading"]');
  const getText = Array.from(findChecklistText).find((text) => {
    return text.textContent.toLowerCase().trim().includes("newsletter testing");
  });

  const ulList = getText.nextSibling;
  const ulItem = ulList.querySelectorAll('ul div li div [class^="jss"] a');
  const hasCHDE = Array.from(ulItem).find((item) => {
    return item.previousSibling.textContent.includes("CHDE");
  });


  //Тут сортируем есть ли еще чеклисты
  //Сделать отдельную функцию для получения ид, если 2 чеклиста
  //Добавь игру в камень ножницы.

  const AB = Array.from(findChecklistText).filter((item) => {
    return item.textContent.toLowerCase().trim().includes("newsletter testing");
  });

  const ABlist = AB.forEach((item) => {
    const itemList = item.nextSibling;
    const ulItem = itemList.querySelectorAll('ul div li div [class^="jss"] a');
    const itemHasCHDE = Array.from(ulItem).find((item) => {
      return item.previousSibling.textContent.includes("CHDE");
    });

    const chdeLinkId = itemHasCHDE.href.split("id=")[1];

    //Назначаем кнопке значение с ид и кликаем по нужным, дальше нужно передать это значение
    const abBtn = document.createElement('button');
    abBtn.textContent = chdeLinkId;
    abBtn.value = chdeLinkId;
    mainCardContainer.append(abBtn);

    abBtn.addEventListener('click', (e) => {
      console.log(e.currentTarget.value);
    })

    getCampaignIdBtn.disabled = true;
    
  });

  if (!hasCHDE) {
    swalFireModal("", "Checklist for CHDE is not found -____-", "error", "", "", false);
    return;
  }

  console.log("Ul list:", findChecklistText);
  console.log("Get text:", getText);

  const chdeLink = hasCHDE.href.split("id=")[1];
  console.log("Link:", chdeLink);

  // const result = await swalFireModal(`Campaing id "${chdeLink}" is correct?`, ``, "question", "", "", true);
  // if (result.isConfirmed) {
  //   openMailTable(value);
  //   chrome.runtime.sendMessage({ action: "setFirstTab" });
  //   startOrStopLoader(true);
  // } else {
  //   return false;
  // }
});

function openMailTable(valueId) {
  const ids = [];
  const newsMailWindow = window.open(`${newsEmailUrl + valueId}`, "_blank");
  const startTimer = Date.now();

  const waitForMail = setInterval(() => {
    try {
      const doc = newsMailWindow.document;
      if (!doc || doc.readyState !== "complete") return;
      const resultTime = differenceTime(doc);

      const tableMain = doc.querySelectorAll("center table.tablesorter tbody tr td form div a");

      if (tableMain.length > 0 && resultTime) {
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
      } else if (Date.now() - startTimer > 10000) {
        clearInterval(waitForMail);
        newsMailWindow.close();
        swalFireModal("┐(￣ヘ￣;)┌", "We did not response for your campaign, repeat again", "error", "", "", false);
        startOrStopLoader(false);
      } else if (!resultTime) {
        clearInterval(waitForMail);
        swalFireModal("┐(￣ヘ￣;)┌", "Date your campaign over 8 days or does not exist", "error", "", "", false);
        startOrStopLoader(false);
        newsMailWindow.close();
      }
    } catch (e) {
      console.log(e);
    }
  }, 500);
}

function openCustomerFilter(ids, index = 0) {
  if (index >= ids.length) {
    startOrStopLoader(false);
    swalFireModal(`Woooow`, `Your id is already!`, "success", "", "", false);
    idForInput.value = "";
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
        console.log("Find filter:", filterDiv);
        setTimeout(() => {
          filterDiv.click();

          // setTimeout(() => {
          //   clickToTransferButton(doc, index, ids, objectKey);
          // }, 1000);
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

  // console.log("final found:", found);
}

function watchToLoader(windowPage, index, spinnerVisible, ids, objectKey) {
  const observer = new MutationObserver((mutations, obs) => {
    const overlay = windowPage.querySelector('div[name="blockOverlay"]');
    const spinnerContainer = overlay ? overlay.querySelector("span") : null;
    const hasSpinner = spinnerContainer && spinnerContainer.children.length > 0;

    if (hasSpinner && !spinnerVisible) {
      spinnerVisible = true;
      // console.log("Спиннер виден!");

      setTimeout(() => {
        openCustomerFilter(ids, index + 1);
      }, 2000);
    }

    if (!hasSpinner && spinnerVisible) {
      spinnerVisible = false;
      // console.log("SPinner end");
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

function getMyTime() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const cutoff = new Date(now);
  const yyyy = cutoff.getFullYear();
  const mm = String(cutoff.getMonth() + 1).padStart(2, "0");
  const dd = String(cutoff.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function differenceTime(doc) {
  const myTime = getMyTime();
  let result = "";

  const firstAddedTime = doc.querySelectorAll('center table tbody tr input[type="submit"][name="update_body"]');
  const timeTr = firstAddedTime[0].closest("tr").nextElementSibling;
  console.log(timeTr);
  const TimeTd = timeTr.querySelectorAll("td");
  const timeName = TimeTd[1]?.innerText.split(" ")[3];

  console.log("Name time -", timeName);
  console.log("My time - ", myTime);

  const nameDate = new Date(timeName);
  const myDate = new Date(myTime);

  const differenceInMs = myDate - nameDate;
  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

  return (result = differenceInDays < 8);
}
