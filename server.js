const express = require('express');
const cors = require('cors');
const OpenAiApi = require('./OpenAiApi.js');
require('dotenv').config();

const app = express();
const port = 3000;

// Setup OpenAiApi with your API key
const openAiApi = new OpenAiApi(process.env.API_KEY);

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.post('/generateWords', async (req, res) => {
    try {
        const userName = req.body.userName || '';
        //const prevInput = req.body.prevInput || '';
        console.log("do we get to server.js")
        console.log(userName)
        const response = await openAiApi.generateWords(userName);
        console.log("but we never get here")
        res.json({ words: response });
    } catch (error) {
        res.status(500).send('Error generating words');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
