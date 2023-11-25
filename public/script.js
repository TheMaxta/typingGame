import { updateWordStream, updateCurrentWordDisplay, updateTimerDisplay, updateWordCountDisplay, endGame } from './uiHandler.js';

// // Global variables
// const words = [
//     'example', 'game', 'typing', 'nodejs', 'javascript',
//     'bootstrap', 'random', 'words', 'practice', 'stream',
//     'challenge', 'code', 'learn', 'fun', 'keyboard'
// ];

// Function to fetch words from the server
async function fetchWordsFromServer(userName = 'Max') {
    try {
        const response = await fetch('http://localhost:3000/generateWords', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.words;
    } catch (error) {
        console.error('Error fetching words:', error);
        return [];
    }
}



async function setupGame() {
    try {
        // Fetch words from the server and proceed with setup only after fetching
        const words = await fetchWordsFromServer();
        

        let currentStream = [...words]; // Use predefined words directly
        let time = 60;
        let timerRunning = false;
        let wordCount = 0;
        let timerInterval;


        // Function to start the game timer
        function startGame() {
            if (!timerRunning) {
                resetTimer();
                timerInterval = setInterval(updateTimer, 1000); // Update every second
            }
        }

        // Function to reset the game timer
        function resetTimer() {
            time = 60;
            timerRunning = true;
        }

        // Function to update the game timer
        function updateTimer() {
            if (time <= 0) {
                clearInterval(timerInterval);
                endGame();
            } else {
                time--;
                updateTimerDisplay(time);
            }
        }

        // Function to format time for display
        function formatTime(time) {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }

        // Event listener for user input
        document.getElementById('wordInput').addEventListener('input', handleInputEvent);

        // Function to handle user input
        function handleInputEvent(event) {
            const trimmedInput = event.target.value.trimStart();
            const currentWord = currentStream[0] || '';

            if (!timerRunning) startGame();

            if (trimmedInput === currentWord) {
                wordCount++;
                currentStream.shift();
                updateGameUI();
                event.target.value = '';
            } else {
                updateCurrentWordDisplay(currentWord, trimmedInput);
            }
        }

        // Function to update the game UI
        function updateGameUI() {
            updateWordStream(currentStream);
            updateWordCountDisplay(wordCount);
        }

        // Function to initialize the game
        function initializeGame() {
            updateGameUI();
        }

        // Event listener for user input
        document.getElementById('wordInput').addEventListener('input', (event) => handleInputEvent(event, currentStream, timerRunning, wordCount));

        // Initialize the game UI
        initializeGame();
    } catch (error) {
        console.error('Error setting up the game:', error);
    }
}

// Call setupGame to start the game setup
setupGame();