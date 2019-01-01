const Word = require("../models/Word");

const getRandomWord = () =>
  new Promise((resolve, reject) =>
    Word.count().exec((err, count) => {
      if (err) reject(err);
      const random = Math.floor(Math.random() * count);
      Word.findOne()
        .skip(random)
        .then(res => resolve(res))
        .catch(err => reject(err));
    })
  );

exports.getRandomWord = getRandomWord;

exports.addWord = (w, userId) =>
  new Promise((resolve, reject) =>
    new Word({
      engWord: w.engWord,
      plWord: w.plWord,
      synonym: w.synonym ? w.synonym : [],
      additionalNote: w.additionalNote ? w.additionalNote : "",
      addedBy: userId
    })
      .save()
      .then(result => {
        resolve("Word added!");
      })
      .catch(err => reject(err))
  );

exports.listWords = () =>
  Word.find()
    .then(words => words)
    .catch(err => {
      console.log(err);
    });
