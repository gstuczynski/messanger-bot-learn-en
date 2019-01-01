const User = require("../models/User");

const addUser = user => {
  new User({
    _id: user.userId,
    nick: user.nick,
    points: 0
  })
    .save()
    .then(result => {
      return "User Added";
    })
    .catch(err => console.log(err));
};

exports.findUser = userId =>
  User.findOne({ _id: userId }, (err, user) => {
    if (err) {
      console.log(err);
    }
    return user;
  });

exports.getAllUsers = () =>
  User.find()
    .then(users => users)
    .catch(err => {
      console.log(err);
    });

exports.handlingNotExistingUser = (message, userId) => {
  if (message.includes("/my_nick:")) {
    const nick = message.split(" ")[1];
    addUser({ userId, nick });
    return `Thanks, I'll remember you ${nick}`;
  }
  return `What is your name 
Type:
/my_nick: {your_nick}`;
};

exports.addUser = addUser;

exports.incPoints = userId =>
  User.findOneAndUpdate({ _id: userId }, { $inc: { points: 1 } })
    .then(res => console.log("Increased Points"))
    .catch(err => console.log(err));

exports.todayAddWordDec = userId =>
  User.findOneAndUpdate(
    { _id: userId, todayAddWordsLeft: { $gte: 1 } },
    { $inc: { todayAddWordsLeft: -1 } }
  )
    .then(res => console.log("Decreased todayAddWordsLeft"))
    .catch(err => console.log(err));

exports.todayAnswerLeftDec = userId =>
  User.findOneAndUpdate(
    { _id: userId, todayAnswerLeft: { $gte: 1 } },
    { $inc: { todayAnswerLeft: -1 } }
  )
    .then(res => console.log("Decreased todayAnswerLeft"))
    .catch(err => console.log(err));

exports.dailyResetUsers = () =>
  User.updateMany({}, { todayAnswerLeft: 3, todayAddWordsLeft: 3 })
    .then(res => console.log("Reseted"))
    .catch(err => console.log(err));
