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
  User.findOne({ _id: userId }, (err, user) => user.nick).then(nick => nick);

exports.listUsers = () =>
  User.find()
    .then(users => {
      return users;
    })
    .catch(err => {
      console.log(err);
    });

exports.handlingNotExistingUser = message => {
  if (message.includes("/my_nick:")) {
    const nick = message.split(" ")[1];
    addUser({ userId, nick });
    return `Thanks, I'll remember you ${nick}`;
  }
  return `What is your name <br />
          Type: /n
          /my_nick: ${your_nick}`;
};

exports.addUser = addUser;
