const user = {
  OleHrytsa: "Oleksander Hrytsaienko",
  RKobus: "Rafał Kobus",
  JurgowiakM: "Michał Jurgowiak",
  KaKazaniecki: "Kamil Kazaniecki",
  Orlinski: "Kamil Orliński",
};

const target = document.body.getAttribute("data-user");
const splitTarget = user[target].split(" ")[0];

const openPlaningTool = createDomElement("button", "openPlaningBtn", "Open Planing", document.body);
const mainBlock = createDomElement("div", "planing-mainBlock", null, document.body);
const helloText = createDomElement("h2", "planing-text", `Hi, ${splitTarget}`, mainBlock);
const closeButton = createDomElement("button", 'closeBtn', 'X', mainBlock);

const mainContainer = createDomElement("div", "planing-container", null, mainBlock);
const inputContainer = createDomElement("div", "input-container", null, mainContainer);
const alertSpan = createDomElement("span", "alert-span", "Please incorrect time and date!", mainContainer);
const btnContainer = createDomElement("div", "btn-container", null, mainContainer);

const inputForDate = createDomElement("input", "input input-forDate", null, inputContainer, "Set Date", "date");
const inputForTime = createDomElement("input", "input input-forTime", null, inputContainer, "Set Time", "text");

const datebtn = createDomElement("button", "btn setDateBtn", "Set date and time", inputContainer);
const colorTargetRow = createDomElement("button", "btn colorRowBtn", "Set color row", btnContainer);
const startClick = createDomElement("button", "btn startClickBtn", "Started click", btnContainer);
const showCurrentStop = createDomElement("button", "btn currentStopBtn", "Show current stop", btnContainer);

const stopLengthText = createDomElement("p", 'stopLengthText', null, mainContainer );
const currentNumberText = createDomElement('p', "currentNumberText", null, mainContainer);


function typographyText(text, element) {
  let index = 0;
  const currentText = text;

  const typeInterval = setInterval(() => {
  element.textContent = currentText.slice(0, index + 1);
  index++;

  if (index === currentText.length) return clearInterval(typeInterval);
}, 100);
}

function createDomElement(selector, className, textContent, mainElement, placeholder = null, inputType = null) {
  const domElement = document.createElement(selector);
  domElement.className = className;

  if (textContent) domElement.textContent = textContent;
  if (placeholder) domElement.placeholder = placeholder;
  if (inputType) domElement.type = inputType;

  mainElement.append(domElement);

  return domElement;
}
