const fetch = require("node-fetch");
const { FACEBOOK_ACCESS_TOKEN } = process.env;

exports.sendTextMessage = (userId, text) =>
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
