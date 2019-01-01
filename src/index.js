const path = require("path");
require("dotenv").config({ path: path.resolve("../variables.env") });
console.log(path.resolve())
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const sheduler = require("./sheduler");

console.log(process.env.FACEBOOK_ACCESS_TOKEN)

const config = require("../config");
const verifyWebhook = require("./helpers/verify-webhook");
const messageWebhook = require("./helpers/message-webhook");

global.answer = null;
global.newWord = null;
global.currentNewWordProp = null;
global.newWordProps = ["engWord", "plWord", "synonym", "additionalNote"];
global.propIdx = 0;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", verifyWebhook);
app.post("/", messageWebhook);

// reminder.start();
// 1reset.start();
// frequencyQuestions.start();

mongoose
  .connect(`${config.dbUrl}/${config.dbName}`)
  .then(result => {
    app.listen(config.port, () =>
      console.log(`listening on port ${config.port}`)
    );
  })
  .catch(err => {
    console.log(err);
  });
