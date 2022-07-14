const validator = require('validator');
const { Restaurant, User } = require('../models/index');

const verifyOrder = async (req, res, next) => {
  try {
    const errors = {
      restaurant: null,
      user: null,
      meals: null,
      total: null,
    };

    // Restaurant
    if (!req.body.restaurant) {
      errors.restaurant = 'Restaurant is required';
    } else {
      const restaurant = await Restaurant.findById(req.body.restaurant);
      if (!restaurant) {
        errors.restaurant = 'Restaurant is not valid';
      }
    }

    // User
    if (!req.body.user) {
      errors.user = 'User is required';
    } else {
      const user = await User.findById(req.body.user);
      if (!user) {
        errors.user = 'User is not valid';
      }
    }

    // Meals
    if (!req.body.meals) {
      errors.meals = 'Meals are required';
    } else {
      const meals = await Meal.find({ _id: { $in: req.body.meals } });
      if (meals.length !== req.body.meals.length) {
        errors.meals = 'Meals are not valid';
      }
    }

    // Total
    if (!req.body.total) {
      errors.total = 'Total is required';
    } else {
      if (!validator.isNumeric(req.body.total)) {
        errors.total = 'Total is not valid';
      }
    }

    if (Object.entries(errors).some((e) => e[1] != null)) {
      return res.status(400).send({
        success: false,
        errors,
      });
    }

    return next();
  } catch (error) {
    res.status(500).json({
      success: false,
      errors: {
        message: 'Error creating order',
      },
    });
  }
}

module.exports = verifyOrder;