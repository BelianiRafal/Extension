cactus1.style.backgroundImage = `url("${chrome.runtime.getURL("content/send_nslt/game/img/cactus-game.png")}")`;
cactus2.style.backgroundImage = `url("${chrome.runtime.getURL("content/send_nslt/game/img/double-cactus.png")}")`;
dinosaur.style.backgroundImage = `url("${chrome.runtime.getURL("content/send_nslt/game/img/dino-game.png")}")`;
clouds1.style.backgroundImage = `url("${chrome.runtime.getURL("content/send_nslt/game/img/second-cloud.webp")}")`;
clouds2.style.backgroundImage = `url("${chrome.runtime.getURL("content/send_nslt/game/img/clouds-2.webp")}")`;
clouds3.style.backgroundImage = `url("${chrome.runtime.getURL("content/send_nslt/game/img/second-cloud.webp")}")`;

let aliveDino;
let scoreInterval;

openGame.addEventListener("click", () => {
  gameBlock.style.display = "block";
  
  
});

let initialScore = 0;
function setScore(newScore) {
  score.textContent = `Your score: ${(initialScore = newScore)}`;
}

function countScore() {
  scoreInterval = setInterval(() => {
    setScore(initialScore + 1);
  }, 100);
}

let highScore = localStorage.getItem("highscore") || 0;
function setHightScore(newScore) {
  hiScore.textContent = `High score: ${(highScore = newScore)}`;
  localStorage.setItem("highscore", newScore);
}

function checkHighScore() {
  if (initialScore > highScore) {
    setHightScore(initialScore);
  }
}

function startJump() {
  document.addEventListener("keydown", function (event) {
    gameOverText.style.display = "none";
    if (event.code === "Space") {
      jump();
    }
  });
}

let jumping = false;
function jump() {
  if (jumping) return;

  jumping = true;
  dinosaur.classList.add("animDino");

  setTimeout(() => {
    dinosaur.classList.remove("animDino");
    jumping = false;
  }, 500);
}

function collision() {
  aliveDino = setInterval(() => {
    let dinoBottom = parseInt(window.getComputedStyle(dinosaur).getPropertyValue("bottom"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus1).getPropertyValue("left"));
    let cactusLeft2 = parseInt(window.getComputedStyle(cactus2).getPropertyValue("left"));

    let hitCactus1 = cactusLeft < 30 && cactusLeft > 0 && dinoBottom <= 60;
    let hitCactus2 = cactusLeft2 < 30 && cactusLeft2 > 0 && dinoBottom <= 60;

    if (hitCactus1 || hitCactus2) {
      alert("GAME OVER");
      checkHighScore(initialScore);
      initialScore = 0;
    }
  }, 10);
}

closeGame.addEventListener("click", () => {
  gameBlock.style.display = "none";

  clearInterval(aliveDino);

  initialScore = 0;

});

function setRandomCactusAnimation(cactus, time) {
  let positions = [1050, 800, 1300, 2000];
  let randomLeft = positions[Math.floor(Math.random() * positions.length)];

  let styleSheet = document.styleSheets[0];
  let animationName = "cactusDynamic_" + Math.floor(Math.random() * 100000);

  setAnimationStyle(styleSheet, animationName, randomLeft, cactus, time);
}

function setAnimationStyle(style, animName, random, element, time) {
  style.insertRule(
    `
    @keyframes ${animName} {
      0% { left: ${random}px; }
      100% { left: -100px; }
    }
  `,
    style.cssRules.length
  );

  element.style.animation = "none";
  element.offsetHeight;
  element.style.animation = `${animName} ${time}s linear infinite`;
}

cactus1.addEventListener("animationiteration", () => {
  setRandomCactusAnimation(cactus1, 4);
});

cactus2.addEventListener("animationiteration", () => {
  setRandomCactusAnimation(cactus2, 3);
});

function main() {
  collision();
  startJump();
  countScore();
  setHightScore(highScore);

  setRandomCactusAnimation(cactus1, 4);
  setRandomCactusAnimation(cactus2, 3);
}

main();
