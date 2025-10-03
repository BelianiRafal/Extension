const CUSTOMERSPAN_URL = "https://www.prologistics.info/api/customerSpam/buildTemplate/";

//! Count for newslettter in issue
function getidForAB() {
  const findChecklistText = document.querySelectorAll('[class="panel-heading"][id="collapseHeading"]');

  const AB = Array.from(findChecklistText).filter((item) => {
    return item.textContent.toLowerCase().trim().includes("newsletter testing");
  });

  return AB;
}

//! Fetch Saving data example -> grz
async function getSavingSetting(pageUrlId) {
  const response = await fetch(CUSTOMERSPAN_URL);
  const data = await response.json();

  const resultData = data?.data?.settings;

  const result = resultData.filter((item) => item.id === String(pageUrlId));

  return result;
}

function getGZvalues() {
  const allDivs = document.querySelectorAll('div[style*="margin-right: 10px;"]');
  const targetDiv = Array.from(allDivs).find((div) => div.textContent.trim() === "use saved settings");

  if (!targetDiv) return;

  return targetDiv.nextElementSibling.children[1].children[0].children[1].textContent;
}

function splittedGrziesName(data, arr) {
  const idForPaste = [];

  if (!data || data.length === 0 || !data[0]?.title) {
    console.log("No data or title found");
    return idForPaste;
  }

  const title = data[0].title;

  let searchKey;
  if (title.includes("GRZESIEK") || title.includes("GRZEGORZ")) {
    const parts = title.split(" - ");
    searchKey = parts[1] ? parts[1].trim() : parts[0];
  } else {
    searchKey = title.split("-")[0].trim();
  }

  const countryMapping = {
    ES: "SP",
    COUK: "UK",
  };

  //! Normalized for AVANDEO DE -> DE-AVANDEO
  let normalizedKey;
  if (searchKey.includes("AVANDEO")) {
    const keyParts = searchKey.split(" ");
    normalizedKey = keyParts.length === 2 ? `${keyParts[1]}-${keyParts[0]}` : searchKey.replace(" ", "-");
  } else {
    normalizedKey = searchKey.replace(" ", "-");
  }

  normalizedKey = countryMapping[normalizedKey] || normalizedKey;
  searchKey = countryMapping[searchKey] || searchKey;

  arr.forEach((item) => {
    if (item.key === normalizedKey || item.key === searchKey) {
      // console.log("Match found:", item);
      idForPaste.push(item.id);
    }
  });

  return idForPaste;
}

async function getSimilarId(arr, keyName) {
  const idForPaste = [];

  arr.forEach((item) => {
    if (item.key === keyName) {
      return idForPaste.push(item.id);
    }
  });

  return idForPaste;
}

async function getFirstOrSecondInput(doc, selector, indexes) {
  const secondSearch = await waitTransferElement(doc, selector, 28);
  return indexes.map((elem) => secondSearch[elem]);
}

//! Update data with "success" or "X"
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

async function fetchChecklist() {
  const issue_id = window.location.pathname.split("/").pop();
  const response = await fetch(`https://${window.location.hostname}/api/issueLog/checklist/?issue_id=${issue_id}`);
  return response.json();
}

async function getChecklist() {
  const checklistData = await fetchChecklist();
  const checklists = checklistData?.checklists || [];

  const checklistArray = [];

  checklists.forEach((item) => variableCase(item, checklistArray));
  return checklistArray;
}

function variableCase(item, arr) {
  switch (item.title.trim()) {
    case "HTML QA - Status of Project":
    case "HTML QA - Planning day":
    case "HTML QA - Planning Sunday":
      arr.push(...item?.checkpoints);
      arr.splice(4, 2);
      break;

    case "Newsletter Testing":
      arr.push(item);
      break;
  }
}

//! 2 checklista? To maszs kurwa w ednym :D
async function getchecklistForAB() {
  const checklistData = await fetchChecklist();
  const checklists = checklistData?.checklists || [];

  const checklistCheckpoints = checklists.filter((item) =>
    item.title?.trim().toLowerCase().includes("newsletter testing")
  );

  const groupedOrder = [];
  const seen = {};

  checklistCheckpoints.forEach((item) => {
    item.checkpoints?.forEach((checkpoint) => {
      const parts = checkpoint.description.split("\t");
      const key = parts[0].trim();
      const id = parts[1].split("?id=").pop();

      if (!seen[key]) {
        seen[key] = [];
        groupedOrder.push(seen[key]);
      }

      seen[key].push({ key, id });
    });
  });

  const result = groupedOrder.flat();

  return result;
}

async function splitedArrayForABtest() {
  const ABchecklists = await getchecklistForAB();

  const targets = ["CHDE", "CHFR", "DE"];

  for (let t of targets) {
    let index = ABchecklists.findIndex((e) => e.key === t);
    if (index !== -1) {

      const suffix = t === "DE" ? "AVANDEO" : "RICARDO";

      const key = `${t}-${suffix}`;
      ABchecklists.splice(index + 1, 0, { key, id: ABchecklists[index].id });
    }
  }

  return ABchecklists;
}
