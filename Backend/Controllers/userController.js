const User = require("../Models/User");

const bcrypt = require("bcrypt");

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      animes: [],
    });
    user
      .save()
      .then(() => res.status(201).json({ message: "Utilisateur crée" }));
  });
};

exports.login = (req, res, next) => {};
