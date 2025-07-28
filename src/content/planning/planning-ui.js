const datebtn = document.createElement("button");
const openPlaningTool = document.createElement("button");

const mainBlock = document.createElement("div");
const mainContainer = document.createElement("div");
const inputContainer = document.createElement("div");

const inputForDate = document.createElement("input");
const inputForTime = document.createElement("input");

const alertSpan = document.createElement("span");
alertSpan.textContent = 'Please incorrect time and date!'
alertSpan.className = 'alert-span';

inputForDate.placeholder = "Set date";
inputForDate.className = "input input-forDate";
inputForDate.type = "date";

inputForTime.className = "input input-forTime";
inputForTime.placeholder = "Set Time";
inputForTime.type = "text";

inputContainer.className = "input-container";
mainContainer.className = "planing-container";
mainBlock.className = "planing-mainBlock";

openPlaningTool.className = "openPlaningBtn";
openPlaningTool.textContent = "Open Planing";

datebtn.className = "setDateBtn";
datebtn.textContent = "Set date and time";

// document.body.append(openPlaningTool);
inputContainer.append(inputForDate);
inputContainer.append(inputForTime);
inputContainer.append(datebtn);

mainContainer.append(inputContainer)
mainContainer.append(alertSpan);

mainBlock.append(mainContainer);

document.body.append(mainBlock);
document.body.append(openPlaningTool);