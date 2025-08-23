module.exports = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

ClothingItem.findById(id)
  .orFail(() => {
    const err = new Error('Item not found');
    err.name = 'DocumentNotFoundError';
    throw err;
  })
  .then((item) => res.send(item))
  .catch((err) => {
    console.error(err);

    if (err.name === 'CastError') {
      return res.status(BAD_REQUEST).send({ message: 'Invalid item ID format' });
    } else if (err.name === 'DocumentNotFoundError') {
      return res.status(NOT_FOUND).send({ message: 'Item not found' });
    } else {
      return res.status(SERVER_ERROR).send({ message: 'An error has occurred on the server' });
    }
  });