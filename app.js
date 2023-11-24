const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const words = require('an-array-of-english-words'); // You can replace this with a larger word list

// Serve static files from the "public" directory
app.use(express.static('public'));

// Use EJS as the view engine
app.set('view engine', 'ejs');

// Serve the homepage
app.get('/', (req, res) => {
  res.render('index');
});

// Generate a random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Socket.io logic for sending random words to clients
io.on('connection', (socket) => {
  socket.on('requestWord', () => {
    const randomWord = getRandomWord();
    socket.emit('newWord', randomWord);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
