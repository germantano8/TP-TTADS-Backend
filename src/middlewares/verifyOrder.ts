import {Restaurant} from '../models/index';
import {isValidObjectId, Types} from 'mongoose';

const verifyOrder = async (req, res, next) => {
  try {
    const errors = {
      restaurant: null,
      meals: null,
    };

    // Restaurant
    if (!isValidObjectId(req.body.restaurant.toString())) {
      errors.restaurant = 'Not a valid restaurant';
    } else {
      const restaurant = await Restaurant.findById(req.body.restaurant);
      if (!restaurant) {
        errors.restaurant = 'Restaurant does not exist';
      }
    };


    // Meals
    if (!(Array.isArray(req.body.meals) && req.body.meals.length > 0)) {
      errors.meals = "Must be an array of meals of length greater than 0";
    } else {

      const atLeastOneInvalidMeal = !req.body.meals.every(meal => Types.ObjectId.isValid(meal.toString()));

      if (atLeastOneInvalidMeal) errors.meals = "There is one or more invalid meals";

    };

    if (Object.entries(errors).some((e) => e[1] != null)) {
      return res.status(400).send(errors);
    }

    return next();
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
};

export{verifyOrder};
