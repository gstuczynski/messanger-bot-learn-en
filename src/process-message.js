const fetch = require("node-fetch");
const { findUser, addUser } = require("./controllers/users");
const { handleCommand } = require("./controllers/commands");
const { getDialogflowResponse } = require("./controllers/dialogflow");

const { FACEBOOK_ACCESS_TOKEN } = process.env;

const sendTextMessage = (userId, text) =>
  fetch(
    `https://graph.facebook.com/v2.6/me/messages?access_token=${FACEBOOK_ACCESS_TOKEN}`,
    {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        messaging_type: "RESPONSE",
        recipient: {
          id: userId
        },
        message: {
          text
        }
      })
    }
  );

module.exports = event => {
  const userId = event.sender.id;
  const message = event.message.text;

  return findUser(userId).then(user => {
    if (!user) {
      return sendTextMessage(userId, handlingNotExistingUser(message));
    }
    if (message[0] === "/") {
      handleCommand(message).then(response =>
        sendTextMessage(userId, `${response}`)
      );
    }
    getDialogflowResponse(message).then(response =>
      sendTextMessage(userId, `${response}`)
    );
  });
};
