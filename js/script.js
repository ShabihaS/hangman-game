let wrongGuesses = 0;
const maxGuesses = 10;

let words = [];
let randomWord = "";
let hiddenWord = [];

// array to keep all words from json file
let usedWords = [];

const hangmanStages = [
  "./assets/img/h-0.png",
  "./assets/img/h-1.png",
  "./assets/img/h-2.png",
  "./assets/img/h-3.png",
  "./assets/img/h-4.png",
  "./assets/img/h-5.png",
  "./assets/img/h-6.png",
  "./assets/img/h-7.png",
  "./assets/img/h-8.png",
  "./assets/img/h-9.png",
  "./assets/img/h-10.png"
];

const wordDisplay = document.getElementById("wordDisplay");
const lettersContainer = document.getElementById("lettersContainer");
const restartBtn = document.getElementById("restartBtn");
const message = document.getElementById("message");
const hangmanImg = document.getElementById("hangmanImg");
const usedWordsList = document.getElementById("usedWordsList");

//  attempts display
const attemptsDisplay = document.getElementById("attempts");

const letters = "abcdefghijklmnopqrstuvwxyz".split("");

// read all words from json file
fetch("./assets/example-words.json")
  .then((res) => res.json())
  .then((data) => {
    words = data;
    startGame();
  })
  .catch((err) => console.error("Error loading JSON:", err));

// Start the game
function startGame() {
  wrongGuesses = 0;
  message.textContent = "";

  randomWord = words[Math.floor(Math.random() * words.length)];
  hiddenWord = Array(randomWord.length).fill("_");

  wordDisplay.textContent = hiddenWord.join(" ");
  hangmanImg.src = hangmanStages[0];

  createKeyboard();
  updateAttempts(); 

  console.log("New word:", randomWord);
}

// Keep track of words that have been used already and display them on the screen
function updateUsedWordsUI() {
  if (!usedWordsList) return;

  usedWordsList.innerHTML = "";

  usedWords.forEach((item, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td style="color:${item.result === "win" ? "limegreen" : "red"}; font-weight:bold;">
        ${item.word}
      </td>
    `;

    usedWordsList.appendChild(row);
  });
}

// Create keyboard and allow input
function createKeyboard() {
  lettersContainer.innerHTML = "";

  letters.forEach((letter) => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.classList.add("hangman__button", "letter-btn");

    button.addEventListener("click", () => {
      handleGuess(letter, button);
    });

    lettersContainer.appendChild(button);
  });
}

// Guess logic
function handleGuess(guess, button) {
  button.disabled = true;

  if (randomWord.includes(guess)) {
    button.classList.add("correct");

    for (let i = 0; i < randomWord.length; i++) {
      if (randomWord[i] === guess) {
        hiddenWord[i] = guess;
      }
    }

    wordDisplay.textContent = hiddenWord.join(" ");
  } else {
    wrongGuesses++;
    button.classList.add("wrong");

    hangmanImg.src = hangmanStages[wrongGuesses];

    updateAttempts(); 
  }

  checkGameStatus();
}

// Check win/lose
function checkGameStatus() {
  if (!hiddenWord.includes("_")) {
    message.textContent = "🎉 You Win!";
    message.style.color = "green";
    disableAllButtons();

    usedWords.push({ word: randomWord, result: "win" });
    updateUsedWordsUI();
  }

  if (wrongGuesses >= maxGuesses) {
    message.textContent = "💀 Game Over!";
    message.style.color = "red";
    disableAllButtons();

    usedWords.push({ word: randomWord, result: "lose" });
    updateUsedWordsUI();
  }
}

// Disable buttons
function disableAllButtons() {
  document.querySelectorAll(".letter-btn").forEach((btn) => {
    btn.disabled = true;
  });
}

// Update attempts UI
function updateAttempts() {
  if (!attemptsDisplay) return;

  const remaining = maxGuesses - wrongGuesses;
  attemptsDisplay.textContent = `${remaining} attempts left`;

  if (remaining <= 3) {
    attemptsDisplay.style.color = "red";
  } else if (remaining <= 6) {
    attemptsDisplay.style.color = "orange";
  } else {
    attemptsDisplay.style.color = "green";
  }
}

// Restart game
function resetGame() {
  startGame();
}

restartBtn.addEventListener("click", resetGame);

// Keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  if (letters.includes(key)) {
    const button = [...document.querySelectorAll(".letter-btn")].find(
      (btn) => btn.textContent === key
    );

    if (button && !button.disabled) {
      handleGuess(key, button);
    }
  }
});