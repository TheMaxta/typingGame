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

updateWordStream();
