const validator = require('validator');
const mongoose = require('mongoose');
const { Restaurant } = require('../models/index');
const { isValidLength } = require('../utils/isValidLength');

const verifyCategory = async (req, res, next) => {
  try {
    const errors = {
      description: null,
      restaurant: null,
    };

    errors.description = isValidLength(req.body.description) ? null : 'Description must be between 4 and 20 characters';


    if (!mongoose.isValidObjectId(req.body.restaurant.toString())) {

      errors.restaurant = 'Not a valid Restaurant';

    } else {

      const restaurant = await Restaurant.findById(req.body.restaurant);
      errors.restaurant = restaurant ? null : 'Restaurant does not exist';
    }

    if (Object.entries(errors).some((e) => e[1] != null)) {
      return res.status(400).send(errors);
    }

    return next();
  } catch {
    return res.status(500).send({ message: 'Error creating Category' });
  }
};

module.exports = verifyCategory;
