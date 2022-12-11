const mongoose = require('mongoose');

const verifyMongooseID = (req, res, next) => {
  /* SI NO SE PASA UN ID COMO UN PARÁMETRO,
  LA FUNCIÓN VA A EVALUAR POR DEFECTO EL ID QUE SE PASA POR EL STRING DEL PARAM */
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({ message: 'Not a Mongoose ID' });

  next();
};

const verifyMongooseIDWrapper = (id) => {
  return (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: 'Not a Mongoose ID' });
  }
  next();
}

module.exports = { verifyMongooseID, verifyMongooseIDWrapper };
