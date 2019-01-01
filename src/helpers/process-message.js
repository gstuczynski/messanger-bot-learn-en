const {
  findUser,
  handlingNotExistingUser,
  incPoints
} = require("../controllers/users");
const { addWord } = require("../controllers/words");
const { handleCommand } = require("../controllers/commands");
const { sendTextMessage } = require("./sendTextMessage");
const { getDialogflowResponse } = require("../controllers/dialogflow");

// let { newWord, currentNewWordProp, newWordProps, propIdx } = global;

module.exports = event => {
  const userId = event.sender.id;
  const message = event.message.text;
  console.log(message);
  return findUser(userId).then(user => {
    if (!user) {
      return sendTextMessage(userId, handlingNotExistingUser(message, userId));
    }
    if (global.answer) {
      let response;
      if (message.toLowerCase() === global.answer.toLowerCase()) {
        response = "👍";
        incPoints(userId);
      } else {
        response = "👎";
      }
      global.answer = null;
      return sendTextMessage(userId, response);
    }
    if (message === "/add") {
      global.newWord = {};
      // global.currentNewWordProp = "engWord";
      return sendTextMessage(userId, "English word: ");
    }
    if (global.newWord) {
      global.newWord[global.newWordProps[global.propIdx]] = message;
      global.propIdx++;
      console.log(global.propIdx, global.newWordProps.length);
      if (global.propIdx + 1 > global.newWordProps.length) {
        global.newWord.synonym = global.newWord.synonym.split(",");
        return addWord(global.newWord, userId)
          .then(res => {
            global.propIdx = 0;
            global.newWord = null;
            return sendTextMessage(userId, res);
          })
          .catch(err => console.log(err));
      }
      return sendTextMessage(userId, global.newWordProps[global.propIdx]);
    }
    if (message[0] === "/") {
      return handleCommand(message, userId).then(response =>
        sendTextMessage(userId, `${response}`)
      );
    }
    getDialogflowResponse(message).then(response =>
      sendTextMessage(userId, `${response}`)
    );
  });
};
