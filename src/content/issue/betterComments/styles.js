function updateStyling() {
  document.querySelectorAll("td").forEach((td) => {
    if (["130px", "150px", "250px"].includes(td.style.width)) {
      td.style.width = null;
      td.style.whiteSpace = "nowrap";
    }

    if (td.style.maxWidth === "1000px") {
      td.style.maxWidth = "100% !important";
      td.style.width = "100%";
    }
  });
}

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = () => {
  updateStyling();
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations

function wait(ms = 100) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function init() {
  await wait(2000);

  observer.observe(document.querySelector(".issuelog_table"), config);

  updateStyling();
}

init();
