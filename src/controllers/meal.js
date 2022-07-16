const { Meal } = require('../models/index');

const mealController = {
  getMeals: async (req, res) => {
    try {
      const meals = await Meal.find({}).exec();
      return res.status(200).send({ success: true, meals });
    } catch {
      return res.status(500).send({ success: false, message: 'Error finding meals' });
    }
  },

  getMeal: async (req, res) => {
    try {
      const meal = await Meal.findById(req.params.id).exec();

      if (!meal) return res.status(404).send({ success: false, message: `There is no meal with ID: ${req.params.id}` });

      return res.status(200).send({ success: true, meal });
    } catch {
      return res.status(500).send({ success: false, message: 'Error finding meal' });
    }
  },

  createMeal: async (req, res) => {
    try {
      const meal = new Meal({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        vegan: req.body.vegan,
        celiac: req.body.celiac,
        category: req.body.category,
        restaurant: req.body.restaurant,
      });
      await meal.save();
      return res.status(200).send({ success: true, meal });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ success: false, message: 'Error creating meal' });
    }
  },

  deleteMeal: async (req, res) => {
    try {
      const removedMeal = await Meal.findByIdAndRemove(req.params.id).exec();

      if (!removedMeal) return res.status(404).send({ success: false, message: `There is no meal with ID: ${req.params.id}` });

      return res.status(200).send({ success: true, removedMeal });
    } catch {
      return res.status(500).send({ success: false, message: 'Error deleting meal' });
    }
  },

  updateMeal: async (req, res) => {
    try {
      const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        tags: req.body.tags,
      }).exec();

      if (!updatedMeal) return res.status(404).send({ success: false, message: `There is no meal with ID: ${req.params.id}` });

      return res.status(200).send({ success: true, updatedMeal });
    } catch {
      return res.status(500).send({ success: false, message: 'Error updating meal' });
    }
  },
};

module.exports = mealController;
