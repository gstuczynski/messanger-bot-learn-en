require("dotenv").config({ path: "variables.env" });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const config = require("../config");
const verifyWebhook = require("./verify-webhook");
const messageWebhook = require("./message-webhook");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", verifyWebhook);
app.post("/", messageWebhook);

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
