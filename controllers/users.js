const User = require("../models/user");
const {
  STATUS_OK,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(STATUS_OK).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'An error has occurred on the server' });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(STATUS_CREATED).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(STATUS_BAD_REQUEST).send({ message: "Invalid data passed when creating user" });
      }
      return res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'An error has occurred on the server' });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      const err = new Error('User not found');
      err.name = 'DocumentNotFoundError';
      throw err;
    })
    .then((user) => res.status(STATUS_OK).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(STATUS_NOT_FOUND).send({ message: "User not found" });
      }
      if (err.name === "CastError") {
        return res.status(STATUS_BAD_REQUEST).send({ message: "Invalid user ID format" });
      }
      return res.status(STATUS_INTERNAL_SERVER_ERROR).send({ message: 'An error has occurred on the server' });
    });
};

module.exports = { getUsers, createUser, getUser };