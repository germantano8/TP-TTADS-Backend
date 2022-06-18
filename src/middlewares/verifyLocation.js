const validator = require('validator');
const mongoose = require('mongoose');
const { Location } = require('../models/index');

const verifyLocation = async (req, res, next) => {
  const errors = {
    location: null,
  };

  if (mongoose.isValidObjectId(req.body.locationId)) {
    const location = await Location.findById(req.body.locationId);
    location ? null : (errors.location = 'Location is not valid');
    console.log('Valid Location');
  }

  if (Object.entries(errors).some((e) => e[1] != null)) {
    return res.status(400).send({
      success: false,
      errors,
    });
  }
  next();
};

module.exports = verifyLocation;
