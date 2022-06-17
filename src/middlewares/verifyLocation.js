const validator = require("validator");
const { Location } = require("../models/index");
const mongoose = require("mongoose");

const verifyLocation = async (req, res, next) => {
  const errors = {
    location: null,
  };

  if (mongoose.isValidObjectId(req.body.locationId)) {
    let location = await Location.findById(req.body.locationId);
    location ? null : (errors.location = "Location is not valid");
    console.log("Valid Location");
  }

  if (Object.entries(errors).some((e) => e[1] != null)) {
    return res.status(400).send({
      success: false,
      errors: errors,
    });
  }
  next();
};

module.exports = verifyLocation;
