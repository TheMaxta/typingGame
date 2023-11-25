const { default: OpenAI } = require('openai');

class OpenAiApi {
    constructor(apiKey) {
        this.openai = new OpenAI({ apiKey });
    }

    async chatCompletion(inputString) {
        const chatResponse = await this.openai.chat.completions.create({
            messages: [{ role: 'user', content: inputString }],
            model: 'gpt-4-1106-preview',
        });
        return chatResponse.choices[0].message.content;
    }
    async generateWords(userName) {
        const prompt = `This is a game. The users name is: [${userName}]. Refer to them by their name. You are going to give me a self aware chatbot response. this input was just typed by a human user and they need to be messed with, please give me an unpredictable response that is aware of this odd situation and make it a little crazy for the person typing. Inject a little randomness and craziness. Make it a fun journey for the user.
        Here are the rules for the chatbot: 1) no emojis, 2) only characters that a user can reasonably be expected to type 3) begin the first 10 words of your response only using characters of the english alphabet.`;
        return this.chatCompletion(prompt);
    }
    
    // async generateWords(userName, prevInput) {
    //     const prompt = `This is a game. The users name is: [${userName}]. Refer to them by their name. You are going to give me a self aware chatbot response based on this previous input typed by a user:  [${prevInput}]  this input was just typed by a human user and they need to be messed with, please give me an unpredictable response that is aware of this odd situation and make it a little crazy for the person typing. Inject a little randomness and craziness.
    //     Here are the rules for the chatbot: 1) no emojis, 2) only characters that a user can reasonably be expected to type 3) begin the first 10 words of your response only using characters of the english alphabet.`;
    //     return this.chatCompletion(prompt);
    // }

}

module.exports = OpenAiApi;