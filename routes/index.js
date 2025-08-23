const router = require("express").Router();
const clothingItem = require("./clothingitems");
const userRouter = require("./users");

router.use("/items", clothingItem);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(404).send({message: "Router not found"})
});

module.exports = router;