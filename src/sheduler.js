var cron = require("node-cron");
const { sendTextMessage } = require("./helpers/sendTextMessage");
const { getAllUsers, dailyResetUsers } = require("./controllers/users");
const { getRandomWord } = require("./controllers/words");

exports.reminder = cron.schedule("0 10-21/3 * * *", () => {
  getAllUsers().then(users => {
    users.forEach(user => {
      const { _id, nick, todayAnswerLeft, todayAddWordsLeft } = user;
      let response;
      if (todayAnswerLeft > 0 && todayAddWordsLeft > 0) {
        response = `You have ${todayAnswerLeft} words to guess, and ${todayAddWordsLeft} words to add.`;
      } else if (todayAnswerLeft > 0) {
        response = `You have ${todayAnswerLeft} words to guess`;
      } else if (todayAddWordsLeft > 0) {
        response = `You have ${todayAddWordsLeft} words to add.`;
      }
      response = `Hi ${nick}! ${response} Type /help if you don't remember how to do it.`;
      return sendTextMessage(_id, response);
    });
  });
});

exports.reset = cron.schedule("0 0 * * *", () => {
  dailyResetUsers();
});

exports.frequencyQuestions = cron.schedule("0 8-22/1 * * *", () => {
  getRandomWord()
    .then(w => {
      global.answer = w.plWord;
      sendTextMessage(2108831775803641, w.engWord);
    })
    .catch(err => console.log(err));
});
