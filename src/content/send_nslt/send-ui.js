const overlay = document.createElement("div");
overlay.className = "overlay";

const closeCard = document.createElement("button");
closeCard.textContent = "x";
closeCard.className = "closeBtn";

const idForInput = document.createElement("input");
idForInput.type = "number";
idForInput.className = "mainInput";
idForInput.placeholder = "Id for CHDE campaign";

const getCampaignIdBtn = document.createElement("button");
getCampaignIdBtn.innerHTML = `
  <svg
      viewBox="0 0 16 16"
      class="bi bi-lightning-charge-fill"
      fill="currentColor"
      height="16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"
      ></path></svg
    >
`;
getCampaignIdBtn.className = "getCampaignId";
getCampaignIdBtn.textContent = "Start Sending";

// GAME UI =====================================

// const openGame = document.createElement("button");
// openGame.className = "openGame";
// openGame.textContent = "Open game";
// openGame.innerHTML = `
//   <svg viewBox="0 0 16 16" fill="currentColor" height="18" width="18" xmlns="http://www.w3.org/2000/svg" class="game"> <path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z"></path> <path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z"></path> </svg>
//   <div class="arrow">››</div>
// `;

// const gameBlock = document.createElement("div");
// gameBlock.className = "game-block";

// const gameWrapper = document.createElement("div");
// gameWrapper.className = "game-wrapper";

// const dinosaur = document.createElement("div");
// dinosaur.className = "dinosaur";

// const cactus1 = document.createElement("div");
// cactus1.className = "cactus1";

// const cactus2 = document.createElement("div");
// cactus2.className = "cactus2";

// const closeGame = document.createElement("button");
// closeGame.className = "closeGame";
// closeGame.textContent = "Close";

// const gameRoad = document.createElement("div");
// gameRoad.className = "gameRoad";

// const gameOverText = document.createElement("p");
// gameOverText.className = "gameOver-text";
// gameOverText.textContent = "Game Over";

// const scoreBlock = document.createElement("div");
// scoreBlock.className = "score-block";

// const hiScore = document.createElement("p");
// hiScore.className = "hiScore";

// const score = document.createElement("p");
// score.className = "score";

// const clouds1 = document.createElement("div");
// clouds1.className = "clouds-game1";
// const clouds2 = document.createElement("div");
// clouds2.className = "clouds-game2";
// const clouds3 = document.createElement("div");
// clouds3.className = "clouds-game3";

// scoreBlock.append(score);
// scoreBlock.append(hiScore);

// gameWrapper.append(scoreBlock);
// gameWrapper.append(closeGame);
// gameWrapper.append(clouds1);
// gameWrapper.append(clouds2);
// gameWrapper.append(clouds3);
// gameWrapper.append(gameOverText);
// gameWrapper.append(dinosaur);
// gameWrapper.append(cactus1);
// gameWrapper.append(cactus2);
// gameWrapper.append(gameRoad);
// gameBlock.append(gameWrapper);

// END FOR GAME======================================================
const customerLoaderText = document.createElement("p");
customerLoaderText.className = "customerLoaderText";
customerLoaderText.textContent = "Please wait...";

const customerLoader = document.createElement("div");
customerLoader.className = "loaderLol";

const customerLoaderWrapper = document.createElement("div");
customerLoaderWrapper.className = "customerLoaderWrapper";

customerLoaderWrapper.append(customerLoader);
customerLoaderWrapper.append(customerLoaderText);

const customerTableBtn = document.createElement("button");
customerTableBtn.innerHTML = `<span>Fetch customer</span>`
// customerTableBtn.textContent = "Fetch customer";
customerTableBtn.className = "customerFetch";

const closeBtn = document.createElement;
const mainCard = document.createElement("div");
mainCard.className = "mainCard";

const mainCardContainer = document.createElement("div");
mainCardContainer.className = "mainCard-container";

const mainButtonStart = document.createElement("button");
mainButtonStart.className = "Btn";
mainButtonStart.innerHTML = `<div class="sign">
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

const spanLoader = document.createElement("span");
spanLoader.className = "loaderEye";

const loaderText = document.createElement("p");
loaderText.className = "loaderText";
loaderText.textContent = " Please wait, we insert ID";

const loaderBlock = document.createElement("div");
loaderBlock.className = "loaderBlock";

loaderBlock.append(spanLoader);
loaderBlock.append(loaderText);

let saveNameText = document.createElement("p");
saveNameText.textContent = "";
saveNameText.className = "saveSettingsName";

let saveNameStatus = document.createElement("p");
saveNameStatus.textContent = "";
saveNameStatus.className = "saveStatusName";

const saveNameBlock = document.createElement("div");
saveNameBlock.className = "saveNameBlock";

const ABbtnContainer = document.createElement("div");
ABbtnContainer.className = "ABbtnContainer";

//For Information after click Customer Btn
const informationBlock = document.createElement("div");
informationBlock.className = "informationBlock";

const solvingUserText = document.createElement("p");
solvingUserText.className = "solvingUserText";

const subjectText = document.createElement("p");
subjectText.className = "subjectText";

const campaignIdText = document.createElement("p");
campaignIdText.className = "campaignIdText";

informationBlock.append(solvingUserText);
informationBlock.append(subjectText);
informationBlock.append(campaignIdText);

mainCardContainer.append(closeCard);
mainCardContainer.append(getCampaignIdBtn);
mainCardContainer.append(informationBlock);
mainCardContainer.append(customerTableBtn);
mainCardContainer.append(ABbtnContainer);

mainCard.append(mainCardContainer);
// mainCard.append(openGame);
mainCard.append(spanText);
mainCard.append(loaderBlock);
mainCard.append(saveNameBlock);

// document.body.append(gameBlock);
document.body.append(mainCard);
document.body.append(mainButtonStart);
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
