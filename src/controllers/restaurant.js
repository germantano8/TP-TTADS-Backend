const { Restaurant } = require('../models/index');

const restaurantController = {
  createRestaurant: async (req, res) => {
    try {
      const newRestaurant = new Restaurant({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        deliveryPricePerKm: req.body.deliveryPricePerKm,
        deliveryPriceBase: req.body.deliveryPriceBase,
        tags: req.body.tags,
      });

      await newRestaurant.save();
      return res.status(200).send({ success: true, newRestaurant });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: 'Error creating restaurant' });
    }
  },

  getRestaurants: async (req, res) => {
    try {
      const restaurants = await Restaurant.find({}).exec();
      return res.status(200).send({ success: true, restaurants });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: 'Error finding restaurants' });
    }
  },

  getRestaurantsByTag: async (req, res) => {
    try {
      const tagId = req.params.id;
      const restaurants = await Restaurant.find({
        tags: tagId,
      }).exec();
      return res.status(200).send({ success: true, restaurants });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: 'Error finding restaurants' });
    }
  },

  getRestaurant: async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.id).exec();

      if (!restaurant) {
        return res.status(404).send({
          success: false,
          message: `There is no restaurant with ID: ${req.params.id}`,
        });
      }

      return res.status(200).send({ success: true, restaurant });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: 'Error finding restaurant' });
    }
  },

  deleteRestaurant: async (req, res) => {
    try {
      const removedRestaurant = await Restaurant.findByIdAndRemove(
        req.params.id,
      ).exec();

      if (!removedRestaurant) {
        return res.status(404).send({
          success: false,
          message: `There is no restaurant with ID: ${req.params.id}`,
        });
      }

      return res.status(200).send({ success: true, removedRestaurant });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: 'Error deleting restaurant' });
    }
  },

  updateRestaurant: async (req, res) => {
    try {
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          description: req.body.description,
          image: req.body.image,
          deliveryPricePerKm: req.body.deliveryPricePerKm,
          deliveryPriceBase: req.body.deliveryPriceBase,
        },
      ).exec();

      if (!updatedRestaurant) {
        return res.status(404).send({
          success: false,
          message: `There is no restaurant with ID: ${req.params.id}`,
        });
      }

      return res.status(200).send({ success: true, updatedRestaurant });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: 'Error updating restaurant' });
    }
  },

  addLocation: async (req, res) => {
    try {
      const restaurantId = req.params.id;

      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res
          .status(404)
          .send({ success: false, message: 'Restaurant not found' });
      }
      restaurant.location = req.body.locationId;

      const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        restaurantId,
        restaurant,
        {
          new: true,
        },
      );

      if (!updatedRestaurant) {
        return res.status(500).send({
          success: false,
          message: 'Error trying to add location',
        });
      }

      return res.status(200).send({
        success: true,
        message: 'Restaurant updated successfully',
        restaurant: updatedRestaurant,
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        message: 'Error creating restaurant',
      });
    }
  },

  removeLocation: async (req, res) => {
    try {
      const restaurantId = req.params.id;

      const restaurant = await Restaurant.findById(restaurantId);

      if (!restaurant) {
        return res
          .status(404)
          .send({ success: false, message: 'Restaurant not found' });
      }

      restaurant.location = null;

      const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        restaurantId,
        restaurant,
        {
          new: true,
        },
      );

      if (!updatedRestaurant) {
        return res.status(500).send({
          success: false,
          message: 'Error trying to remove location from restaurant',
        });
      }

      return res.status(200).send({
        success: true,
        message: 'Location removed succesfully',
        restaurant: updatedRestaurant,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: 'Error removing location from restaurant',
      });
    }
  },
};

module.exports = restaurantController;
