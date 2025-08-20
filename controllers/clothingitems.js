const ClothingItem = require("../models/clothingitem");

const createItem = (req, res) => {
  console.log(req)
  console.log(req.body)

  const {name, weather, imageURL} = req.body;

  ClothingItem.create({ name, weather, imageURL }).then((item) => {
     console.log(item);
     res.status(201).send({ data: item })
  }).catch((e) => {
    console.error(e);
    res.status(500).send({message: "Error from createItem",e})
  })
};

const getItems = (req, res) => {
   ClothingItem.find({}).then((items) => res.status(200).send(items))
   .catch((e) => {
    res.status(500).send({message: "Error from getItems", e})
   })
}

const updateItems = (req, res) => {
  const {itemId} = req.params;
  const {imageURL} = req.body;

  ClothingItem.findByIdAndUpdate(
    itemId,
    {$set: {imageURL}},
    {new: true, runValidators: true}
  )
  .orFail().then((item) => res.status(200).send({data:item}))
  .catch((e) => {
    res.status(500).send({message: "Error from updateItems", e})
  })
}

const deleteItem = (req, res) => {
  const {itemId} = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId).orFail().then((item) => res.status(204).send({}))
  .catch((e) => {
    res.status(500).send({message: "Error from deleteItem", e})
  })
}

module.exports = {createItem, getItems, updateItems, deleteItem}