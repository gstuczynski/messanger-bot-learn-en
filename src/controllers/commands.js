const { getAllUsers, todayAnswerLeftDec, todayAddWordDec } = require("./users");
const { addWord, listWords, getRandomWord } = require("./words");

exports.handleCommand = (message, userId) =>
  new Promise((resolve, reject) => {
    const c = message.substr(0, message.indexOf(" ") + 1).trim();
    const command = c || message;
    const content = message.slice(message.indexOf(" ") + 1);
    switch (command) {
      case "/listplayers":
        resolve(getAllUsers());
        break;
      case "/add":
        todayAddWordDec(userId);
        resolve(addWord(content, userId));
        break;
      case "/listwords":
        resolve(listWords());
        break;
      case "/random":
        resolve(getRandomWord());
        break;
      case "/play":
        resolve(
          getRandomWord().then(w => {
            todayAnswerLeftDec(userId);
            global.answer = w.plWord;
            return w.engWord;
          })
        );
        break;
      case "/help":
        resolve(
          `/listplayers - return all users
/add - adding new world example: /add eng:ball;pl:pilka;synonym:dupa;additionalnote:dupa
/listwords - listing all words in database
/play - returnig random english word, you should answer in polish
`
        );
        break;
      default:
        resolve(
          `option ${command} is unknown, try '/help' for more information.`
        );
    }
  });
