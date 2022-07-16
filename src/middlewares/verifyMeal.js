const validator = require('validator');
const mongoose = require('mongoose');
const { Category, Restaurant } = require('../models/index');
const { verifyLength } = require('./verifyLength');

const verifyMeal = async (req, res, next) => {
  try {
    const errors = {
      name: null,
      description: null,
      price: null,
      category: null,
      restaurant: null,
    };

    errors.name = verifyLength(req.body.name) ? 'Name must be between 4 and 20 characters' : null;
    errors.description = verifyLength(req.body.description) ? 'Description must be between 4 and 20 characters' : null;

    errors.price = typeof req.body.price === 'number' ? null : 'Price must be a number';

    if (req.body.category) {
      if (mongoose.isValidObjectId(req.body.category)) {
        const category = await Category.findById(req.body.category);
        errors.category = category ? null : 'Category is not valid';
      }
    }

    if (!req.body.restaurant) {
      errors.restaurant = 'Restaurant is required';
    } else if (mongoose.isValidObjectId(req.body.restaurant)) {
      const restaurant = await Restaurant.findById(req.body.restaurant);
      errors.restaurant = restaurant ? null : 'Restaurant is not valid';
    }

    if (Object.entries(errors).some((e) => e[1] != null)) {
      return res.status(400).send({
        success: false,
        errors,
      });
    }

    return next();
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      errors: {
        message: 'Error creating meal',
      },
    });
  }
};

module.exports = verifyMeal;
