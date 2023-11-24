const words = ['example', 'game', 'typing', 'nodejs', 'javascript', 'bootstrap', 'random', 'words', 'practice', 'stream', 'challenge', 'code', 'learn', 'fun', 'keyboard'];
let currentWordIndex = 0;

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function updateWordStream() {
    for (let i = 1; i <= 5; i++) {
        const wordElement = document.getElementById(`word${i}`);
        wordElement.innerText = words[(currentWordIndex + i - 1) % words.length];
        wordElement.classList.remove('highlight');
    }
    document.getElementById('word1').classList.add('highlight'); // Highlight the first word
}

function updateCurrentWordDisplay(inputValue) {
    const currentWordElement = document.getElementById('word1');
    const currentWord = words[currentWordIndex % words.length];
    let formattedWord = '';
    let firstMistakeFound = false;

    for (let i = 0; i < currentWord.length; i++) {
        let colorClass = '';
        if (i < inputValue.length) {
            if (!firstMistakeFound && inputValue[i] !== currentWord[i]) {
                firstMistakeFound = true;
            }
            colorClass = firstMistakeFound ? 'incorrect' : 'correct';
        }

        formattedWord += `<span class="${colorClass}">${currentWord[i]}</span>`;
    }

    currentWordElement.innerHTML = formattedWord;
}


document.getElementById('wordInput').addEventListener('input', (event) => {
    const trimmedInput = event.target.value.trimStart(); // Trim leading spaces
    const currentWord = words[currentWordIndex % words.length];

    if (trimmedInput === currentWord) {
        event.target.value = ''; // Clear the input
        currentWordIndex++; // Move to the next word
        updateWordStream();
    } else {
        updateCurrentWordDisplay(trimmedInput);
    }
});


// ... (existing JavaScript code) ...

let time = 60; // Timer in seconds
let timerRunning = false;
let wordCount = 0;

function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        let timerInterval = setInterval(() => {
            if (time <= 0) {
                clearInterval(timerInterval);
                endGame();
            } else {
                time--;
                updateTimerDisplay();
            }
        }, 1000);
    }
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    timerElement.textContent = `Time: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function updateWordCount() {
    const wordCountElement = document.getElementById('wordCount');
    wordCountElement.textContent = `Words: ${wordCount}`;
}

function endGame() {
    // Disable input
    document.getElementById('wordInput').disabled = true;
    // Highlight the final word count
    document.getElementById('wordCount').style.color = '#FF0000';
    // You could also display a message to the user, save the score, etc.
}

document.getElementById('wordInput').addEventListener('input', (event) => {
    // ... (existing input logic) ...

    if (trimmedInput === currentWord) {
        // ... (existing logic) ...
        wordCount++; // Increment word count
        updateWordCount(); // Update the displayed word count
    }

    // ... (rest of the input event logic) ...
});

// Initial calls to set up the game
updateWordStream();
updateTimerDisplay();
updateWordCount();
startTimer(); // Call this function when you are ready to start the timer

