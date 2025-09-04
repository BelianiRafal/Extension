cactus.style.backgroundImage = `url("${chrome.runtime.getURL('content/send_nslt/game/img/cactus-game.png')}")`;
dinosaur.style.backgroundImage = `url("${chrome.runtime.getURL('content/send_nslt/game/img/dino-game.png')}")`;

openGame.addEventListener('click', () => {
    gameBlock.style.display = 'block';
})

//tested

closeGame.addEventListener('click', () => {
    gameBlock.style.display = 'none';
})