# Hangman Game

A web-based Hangman game built with **HTML, SCSS, and JavaScript**.

The game randomly selects a word from a JSON file and allows the player to guess letters using either mouse clicks or keyboard input. Each incorrect guess updates the hangman image until the player either wins or loses.

## Features

* Random word selection from JSON file
* Dynamic hidden word display using underscores
* Interactive alphabet buttons (A–Z)
* Keyboard input support
* Tracks incorrect guesses with hangman images (0–10)
* Attempts counter
* Win / Loss messages
* Restart game functionality
* Used words history panel
* Win/Loss tracking with colored words
* Responsive design for mobile, tablet, and desktop

## Tech Stack

* HTML5
* SCSS (BEM methodology)
* JavaScript (DOM manipulation, event listeners, arrays, fetch API)

## Project Structure

```text
Hangman_game/
│── assets/
│   ├── img/
│   └── example-words.json
│── css/
│── js/
│   └── script.js
│── scss/
│   ├── _hangman.scss
│   ├── _media.scss
│   ├── _reset.scss
│   ├── _variable.scss
│   └── main.scss
│── index.html
│── README.md
```

## How to Run

1. Clone the repository

```bash
git clone <your-repo-url>
```

2. Open project folder

```bash
cd Hangman_game
```

3. Run SCSS watcher

```bash
sass --watch scss/main.scss css/main.css
```

4. Open `index.html` in browser

## Game Rules

* Guess the hidden word one letter at a time.
* Correct guesses reveal letters.
* Wrong guesses increase the hangman stage.
* You have **10 attempts**.
* Win by guessing all letters before attempts run out.

## Future Improvements

* Add difficulty levels
* Add sound effects
* Add animations for win/loss
* Prevent repeated words until all words are used
* Add score tracking

## Author

Built by Shabiha as part of a JavaScript project challenge.
