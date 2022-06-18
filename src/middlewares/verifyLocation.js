const mongoose = require('mongoose');
const { Location } = require('../models/index');

const verifyLocation = async (req, res, next) => {
  const errors = {
    location: null,
  };

  if (mongoose.isValidObjectId(req.body.locationId)) {
    const location = await Location.findById(req.body.locationId);
    errors.location = location ? null : 'Location is not valid';
  }

  if (Object.entries(errors).some((e) => e[1] != null)) {
    return res.status(400).send({
      success: false,
      errors,
    });
  }
  return next();
};

module.exports = verifyLocation;
