const router = require("express").Router();

const { createItem } = require("../controllers/clothingitems")


//CRUD

//CREATE
router.post("/", createItem);

//read

router.get("/", getItems);

//update

router.put("/:itemId", updateItem);

//delte

router.delete("/:itemId", deleteItem);

module.exports = router;