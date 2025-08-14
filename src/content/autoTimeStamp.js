const toggleAutoAcceptButton = document.createElement("button");
toggleAutoAcceptButton.innerText = "Toggle Auto Confirm";

function updateButtonStyle() {
  const isActive = localStorage.getItem("autoAcceptLogin") === "true";
  toggleAutoAcceptButton.style = `
    color: ${isActive ? "green" : "red"};
    font-family: Arial;
    text-transform: uppercase;
    font-size: 11px;
    background: white;
    border: 2px solid ${isActive ? "green" : "red"};
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 3px;
    margin: 5px;`;
}

updateButtonStyle();

toggleAutoAcceptButton.onclick = () => {
  const currentState = localStorage.getItem("autoAcceptLogin") === "true";
  localStorage.setItem("autoAcceptLogin", currentState ? "false" : "true");
  updateButtonStyle(); // Update button appearance after click
};

document.querySelector("#timesheet_div").after(toggleAutoAcceptButton);

function handleTimestampConfirm() {
  const alertifyModals = document.querySelectorAll(".ajs-dialog");

  alertifyModals.forEach((timestampAlert, index) => {
    if (
      timestampAlert.querySelector(".ajs-header").innerText.trim() !==
      "Login Confirmation"
    )
      return;
    timestampAlert.querySelector(".ajs-ok").click();

    // remove observer since we are logged in
    if (window.__loginConfObserver) {
      window.__loginConfObserver.disconnect();
    }
  });
}

window.__loginConfObserver = new MutationObserver(() => {
  if (localStorage.getItem("autoAcceptLogin") === "true")
    handleTimestampConfirm();
});

window.__loginConfObserver.observe(document.body, {
  childList: true,
  subtree: true,
});

if (localStorage.getItem("autoAcceptLogin") === "true")
  handleTimestampConfirm();
