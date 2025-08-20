const router = require("express").Router();

const { createItem, getItems, deleteItem, updateItem, likeItem, unlikeItem, } = require("../controllers/clothingitems");


//CRUD

//CREATE
router.post("/", createItem);

//read

router.get("/", getItems);

//update

router.put("/:itemId", updateItem);

//delte

router.delete("/:itemId", deleteItem);

//Like

router.put("/:itemId/likes", likeItem);

//unlike

router.delete("/:itemId/likes", unlikeItem);

module.exports = router;