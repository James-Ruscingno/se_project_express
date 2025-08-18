const router = require("express").Router();
const clothingItem = require("./clothingitems");

router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(500).send({message: "Router not found"})
});

const userRouter = require("./users");

router.use("/users", userRouter);

module.exports = router;