const ClothingItem = require("../models/clothingitem");
const {
  STATUS_OK,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageURL } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageURL,
    owner: req.user._id,
  })
    .then((item) => res.status(STATUS_CREATED).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(STATUS_BAD_REQUEST)
          .send({ message: "Invalid data passed when creating item" });
      }
      console.error(err);
      return res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(STATUS_OK).send(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => {
      throw Object.assign(new Error("Item not found"), { name: "DocumentNotFoundError" });
    })
    .then((deletedItem) =>
      res
        .status(STATUS_OK)
        .send({ message: "Item successfully deleted", data: deletedItem })
    )
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(STATUS_BAD_REQUEST)
          .send({ message: "Invalid item ID format" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(STATUS_NOT_FOUND).send({ message: "Item not found" });
      }
      return res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail(() => {
      throw Object.assign(new Error("Item not found"), { name: "DocumentNotFoundError" });
    })
    .then((item) => res.status(STATUS_OK).send({ data: item }))
    .catch((err) => {
      console.error(err);
      return res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const unlikeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .orFail(() => {
      throw Object.assign(new Error("Item not found"), { name: "DocumentNotFoundError" });
    })
    .then((item) => res.status(STATUS_OK).send({ data: item }))
    .catch((err) => {
      console.error(err);
      return res
        .status(STATUS_INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};