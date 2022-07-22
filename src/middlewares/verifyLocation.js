const mongoose = require('mongoose');
const { Location } = require('../models/index');

const verifyLocation = async (req, res, next) => {
  const errors = {
    street: null,
    number: null,
    floor: null,
    apartment: null,
    longitude: null,
    latitude: null,
  };

  /*REALIZAR TODAS LAS VALIDACIONES CORRESPONDIENTES*/

  if (Object.entries(errors).some((e) => e[1] != null)) {
    return res.status(400).send(errors);
  }
  return next();
};

module.exports = verifyLocation;
