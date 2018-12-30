const { listUsers } = require("./users");

exports.handleCommand = message =>
  new Promise((resolve, reject) => {
    switch (message) {
      case "/list_players":
        resolve(listUsers());
        break;
      default:
        resolve(
          `option ${
            message.split(" ")[0]
          } is unknown, try '/help' for more information.`
        );
    }
  });
