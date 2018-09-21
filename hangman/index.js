// Queries
const letters = document.querySelector('#alphabet-container');
const guessLetters = document.querySelector('#guess-area').children;
const hangman = document.querySelector('#hangman');
// Game Counts
let failCount = 0;
let successCount = 0;
const loseCount = 6;
const winCount = randomName.length - 1;
// Game Sounds
const winSound = () => new Audio('sounds/cheer.wav');
const loseSound = () => new Audio('sounds/buzzer.wav');

// Game
letters.addEventListener( 'click', (event) => {
    if (successCount < winCount && failCount < loseCount) {
        const target = event.target.closest(".letters.unclicked");
        let guessedRight = false;
        if (target) {
            for (let node of guessLetters) {
                if (node.firstChild.innerHTML === target.firstChild.innerHTML && successCount <= winCount) {
                    node.firstChild.classList.remove("hidden");
                    target.classList.add('correct');
                    target.classList.remove('unclicked');
                    guessedRight = true;
                    successCount += 1;
                }
            }

            if (!guessedRight && failCount <= loseCount) { 
                failCount += 1; 
                if (failCount < loseCount) {
                    target.classList.add('hidden');
                    hangman.src = `hangman-assets/fail-${failCount}.jpg`;
                }
            }

            if (loseCount === failCount) {
                hangman.src = `hangman-assets/fail-${randomName.replace(" ", "").toLowerCase()}.jpg`;
                loseSound().play();
                    setTimeout(() => {alert("Sorry you lose!")}, 100);
                setTimeout(() => {location.reload()}, 3000);
            }

            if (winCount === successCount) {
                winSound().play();
                    setTimeout(() => {alert("You win!")}, 100);
                setTimeout(() => {location.reload()}, 2000);
            } 
        }
    }
})

document.addEventListener("keydown", event => {
    if (successCount < winCount && failCount < loseCount) {
        const keyPress = event.key;
        let guessedRight = false;
        if (alphabetList.includes(keyPress)) {
            for (let node of guessLetters) {
                if (node.firstChild.classList.contains('hidden') && node.firstChild.innerHTML.toLowerCase() === keyPress && successCount <= winCount) {
                    node.firstChild.classList.remove("hidden");
                    document.querySelector(`#${keyPress}`).classList.add('correct');
                    guessedRight = true;
                    successCount += 1;
                    console.log(node.firstChild.innerHTML);
                }
            }

            if (!document.querySelector(`#${keyPress}`).classList.contains('correct') && !guessedRight && failCount <= loseCount) { 
                failCount += 1; 
                if (failCount < loseCount) {
                    document.querySelector(`#${keyPress}`).classList.add('hidden');
                    hangman.src = `hangman-assets/fail-${failCount}.jpg`;
                }
            }

            if (loseCount === failCount) {
                hangman.src = `hangman-assets/fail-${randomName.replace(" ", "").toLowerCase()}.jpg`;
                loseSound().play();
                    setTimeout(() => {alert("Sorry you lose!")}, 100);
                setTimeout(() => {location.reload()}, 3000);
            }

            if (winCount === successCount) {
                successCount += 1;
                winSound().play();
                    setTimeout(() => {alert("You win!")}, 100);
                setTimeout(() => {location.reload()}, 3000);
            } 
        }
    }
})