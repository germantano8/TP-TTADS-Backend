const mongoose = require('mongoose');
const { Location } = require('../models/index');
const { isValidLength } = require('../utils/isValidLength');

const verifyLocation = async (req, res, next) => {
  const errors = {
    street: null,
    number: null,
    floor: null,
    apartment: null,
    longitude: null,
    latitude: null,
  };

  errors.street = isValidLength(req.body.street) ? null : 'Street must be between 4 and 20 characters';

  errors.number = typeof req.body.number === 'number' && req.body.number > 0 ? null : 'Number must be a number greater than 0';

  if(req.body.floor){
    errors.floor = typeof req.body.floor === 'number' && req.body.floor >= 0 ? null : 'Floor must be a number greater than 0';
  }

  if(req.body.apartment){
    errors.apartment = typeof req.body.apartment === 'char' ? null : 'Apartment must be a letter';
  }

  errors.longitude = typeof req.body.longitude === 'number' ? null : 'Wrong longitude';

  errors.latitude = typeof req.body.latitude === 'number' ? null : 'Wrong latitude';


  if (Object.entries(errors).some((e) => e[1] != null)) {
    return res.status(400).send(errors);
  }
  return next();
};

module.exports = verifyLocation;
