const projectId = "chatbot-test-a33eb";
const sessionId = "123456";
const languageCode = "en-US";

const dialogflow = require("dialogflow");

const config = {
  credentials: {
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
  }
};

const sessionClient = new dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

exports.getDialogflowResponse = message =>
  new Promise((resolve, reject) => {
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: languageCode
        }
      }
    };

    sessionClient
      .detectIntent(request)
      .then(responses => {
        const result = responses[0].queryResult;
        resolve(result.fulfillmentText);
      })
      .catch(err => {
        reject(err);
      });
  });
