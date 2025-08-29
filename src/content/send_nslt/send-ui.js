const overlay = document.createElement("div");
overlay.className = "overlay";

const closeCard = document.createElement("button");
closeCard.textContent = "x";
closeCard.className = "closeBtn";

const idForInput = document.createElement("input");
idForInput.type = "number";
idForInput.className = "mainInput";
idForInput.placeholder = "Id for CHDE campaign";

const closeBtn = document.createElement;

const mainCard = document.createElement("div");
mainCard.className = "mainCard";

const mainCardContainer = document.createElement("div");
mainCardContainer.className = "mainCard-container";

const button = document.createElement("button");
button.className = "Btn";
button.innerHTML = `<div class="sign">
<svg viewBox="0 0 512 512">
<path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z">
</path></svg></div>
<div class="text">Customers</div>`;

const startBtn = document.createElement("button");
startBtn.className = "startBtn";
startBtn.innerHTML = `<span data-text="Send">Send</span>`;

const spanText = document.createElement("span");
spanText.textContent = "Please paste corrected id";
spanText.className = "spanAlertText";

const spanLoader = document.createElement('span');
spanLoader.className = 'loaderEye';

const loaderText = document.createElement('p');
loaderText.className = 'loaderText';
loaderText.textContent = ' Please wait, we insert ID';

const loaderBlock = document.createElement('div');
loaderBlock.className = 'loaderBlock';

loaderBlock.append(spanLoader);
loaderBlock.append(loaderText);

let saveNameText = document.createElement("p");
saveNameText.textContent = "";
saveNameText.className = "saveSettingsName";

let saveNameStatus = document.createElement('p');
saveNameStatus.textContent = '';
saveNameStatus.className = 'saveStatusName';

const saveNameBlock = document.createElement('div');
saveNameBlock.className = 'saveNameBlock';

mainCardContainer.append(idForInput);
mainCardContainer.append(startBtn);
mainCardContainer.append(closeCard);

mainCard.append(mainCardContainer);
mainCard.append(spanText);
mainCard.append(loaderBlock);
mainCard.append(saveNameBlock);

document.body.append(mainCard);
document.body.append(button);
document.body.append(overlay);

function swalFireModal(title, message, iconStyle, confirmText, btnColor, needCancel) {
  return Swal.fire({
    title: title,
    text: message,
    icon: iconStyle,
    confirmButtonText: confirmText || "Ok",
    confirmButtonColor: btnColor || "#328a35",
    showCancelButton: needCancel,
  });
}

