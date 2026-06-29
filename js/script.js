let wrongGuesses = 0;
let guessedLetters = [];
const maxGuesses = 10;



const words = [
  "apple",
  "banana",
  "orange",
  "grape",
  "kiwi",
  "pear",
  "peach",
  "plum",
  "melon",
  "lemon"];

const hangmanStages = [
  "./assets/img/h-0.jpg",
  "./assets/img/h-1.jpg",
  "./assets/img/h-2.jpg",
  "./assets/img/h-3.jpg",
  "./assets/img/h-4.jpg",
  "./assets/img/h-5.jpg",
  "./assets/img/h-6.jpg",
  "./assets/img/h-7.jpg",
  "./assets/img/h-8.jpg",
  "./assets/img/h-9.jpg",
  "./assets/img/h-10.jpg"
];
let randomWord = words[Math.floor(Math.random() * words.length)];
console.log(randomWord);

const wordDisplay=document.getElementById("wordDisplay");
const lettersContainer = document.getElementById("lettersContainer");
const restartBtn = document.getElementById("restartBtn");

let hiddenWord = Array(randomWord.length).fill("_");



wordDisplay.textContent = hiddenWord.join(" ");

const letters = "abcdefghijklmnopqrstuvwxyz".split("");



letters.forEach(letter => {
  const button = document.createElement("button");
  button.textContent = letter;
  button.classList.add("hangman__button", "letter-btn");

button.addEventListener("click", () => {
  button.disabled = true; // prevent repeat clicks

  const guess = letter;
  guessedLetters.push(guess);

  if (randomWord.includes(guess)) {
    // correct guess
    for (let i = 0; i < randomWord.length; i++) {
      if (randomWord[i] === guess) {
        hiddenWord[i] = guess;
      }
    }

    wordDisplay.textContent = hiddenWord.join(" ");
  } else {
    // wrong guess
    wrongGuesses++;

    document.getElementById("hangmanImg").src =
      hangmanStages[wrongGuesses];
  }

  checkGameStatus();
});
  lettersContainer.appendChild(button);
});

function checkGameStatus() {
  if (!hiddenWord.includes("_")) {
    document.getElementById("message").textContent = "You Win!";
    disableAllButtons();
  }

  if (wrongGuesses >= maxGuesses) {
    document.getElementById("message").textContent = "Game Over!";
    disableAllButtons();
  }
}
function disableAllButtons() {
  document.querySelectorAll(".letter-btn").forEach(btn => {
    btn.disabled = true;
  });
}

restartBtn.addEventListener("click", resetGame);

function resetGame() {
  // pick new word
  randomWord = words[Math.floor(Math.random() * words.length)];

  // reset state
  wrongGuesses = 0;
  guessedLetters = [];

  // reset hidden word
  hiddenWord = Array(randomWord.length).fill("_");
  wordDisplay.textContent = hiddenWord.join(" ");

  // reset image
  document.getElementById("hangmanImg").src = hangmanStages[0];

  // reset message
  document.getElementById("message").textContent = "";

  // enable all buttons again
 document.querySelectorAll(".letter-btn").forEach(btn => {
  btn.disabled = false;
});

  console.log("New word:", randomWord);
}