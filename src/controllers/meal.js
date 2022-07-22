const { Meal } = require('../models/index');

const mealController = {
  getMeals: async (req, res) => {
    try {
      const meals = await Meal.find({}).exec();
      return res.send(meals);
    } catch {
      return res.status(500).send({ message: 'Error finding meals' });
    }
  },

  getMeal: async (req, res) => {
    try {
      const meal = await Meal.findById(req.params.id).exec();

      if (!meal) return res.status(404).send({ message: `There is no meal with ID: ${req.params.id}` });

      return res.send(meal);
    } catch {
      return res.status(500).send({ message: 'Error finding meal' });
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
      return res.send({message: 'Meal created successfully'});
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: 'Error creating meal' });
    }
  },

  deleteMeal: async (req, res) => {
    try {
      const removedMeal = await Meal.findByIdAndRemove(req.params.id).exec();

      if (!removedMeal) return res.status(404).send({ message: `There is no meal with ID: ${req.params.id}` });

      return res.send({message: "Meal deleted successfully"});
    } catch {
      return res.status(500).send({ message: 'Error deleting meal' });
    }
  },

  updateMeal: async (req, res) => {
    try {
      const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        vegan: req.body.vegan,
        celiac: req.body.celiac,
      }).exec();

      if (!updatedMeal) return res.status(404).send({ message: `There is no meal with ID: ${req.params.id}` });

      return res.send({message: "Meal updated successfully"});
    } catch {
      return res.status(500).send({ message: 'Error updating meal' });
    }
  },
};

module.exports = mealController;
