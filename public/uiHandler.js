// Function to update the word stream displayed
function updateWordStream(currentStream) {
    const wordStream = document.getElementById('wordStream');
    const displayedWords = currentStream.slice(0, 30); // Slice the first 30 words
    wordStream.innerHTML = displayedWords.map((word, index) => 
        `<span class="word ${index === 0 ? 'highlight' : ''}">${word}</span>`
    ).join('');
}

// Function to update the display of the current word being typed
function updateCurrentWordDisplay(currentWord, inputValue) {
    const currentWordElement = document.querySelector('#wordStream .word.highlight');
    currentWordElement.innerHTML = getFormattedWord(currentWord, inputValue);
}

// Function to format the current word based on user input
function getFormattedWord(word, typed) {
    return [...word].map((char, index) => {
        const typedChar = typed[index];
        const colorClass = typedChar === char ? 'correct' : 'incorrect';
        return `<span class="${typedChar == null ? '' : colorClass}">${char}</span>`;
    }).join('');
}

// Function to update the timer display
function updateTimerDisplay(time) {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `Time: ${formatTime(time)}`;
}

// Function to format time for display
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Function to update the word count display
function updateWordCountDisplay(wordCount) {
    const wordCountElement = document.getElementById('wordCount');
    wordCountElement.textContent = `Words: ${wordCount}`;
}

// Function to handle the end of the game
function endGame() {
    document.getElementById('wordInput').disabled = true;
    document.getElementById('wordCount').style.color = '#FF0000';
}

export { updateWordStream, updateCurrentWordDisplay, updateTimerDisplay, updateWordCountDisplay, endGame };
