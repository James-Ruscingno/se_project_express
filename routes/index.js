const router = require("express").Router();
const clothingItem = require("./clothingitems");
const userRouter = require("./users");
const { STATUS_NOT_FOUND } = require('../utils/errors');

router.use("/items", clothingItem);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(STATUS_NOT_FOUND).send({message: "Router not found"})
});

module.exports = router;