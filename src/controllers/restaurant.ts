import { Restaurant, Meal } from '../models/index';

const restaurantController = {

  getRestaurants: async (req, res) => {
    try {
      const restaurants = await Restaurant.find(req.query.tag ? {
        tags: req.query.tag,
      } : {}).populate({ path: 'location' }).exec();

      return res.status(200).send(restaurants);
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Error finding restaurants' });
    }
  },


  getRestaurant: async (req, res) => {
    try {
      const { detailed } = req.query;
      let restaurant = null;

      if (!detailed) {
        restaurant = await Restaurant.findById(req.params.id).exec();

      } else {

        const restaurantModel = await Restaurant.findById(req.params.id).populate({ path: 'location' }).exec();

        if (restaurantModel) {

          const meals = await Meal.find({ restaurant: req.params.id }).exec();
          restaurant = restaurantModel.toObject();
          restaurant.meals = meals;

        };

      }
      if (!restaurant) {
        return res.status(404).send({ message: `There is no restaurant with ID: ${req.params.id}`, });
      }
      return res.status(200).send(restaurant);
    } catch (error) {

      return res
        .status(500)
        .send({ message: 'Error finding restaurant' });
    }
  },

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
      return res.status(201).send({ message: "Restaurant created successfully" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Error creating restaurant' });
    }
  },

  deleteRestaurant: async (req, res) => {
    try {
      const removedRestaurant = await Restaurant.findByIdAndRemove(
        req.params.id,
      ).exec();

      if (!removedRestaurant) {
        return res.status(404).send({ message: `There is no restaurant with ID: ${req.params.id}` });
      }

      return res.status(200).send({ message: "Restaurant deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Error deleting restaurant' });
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
        return res.status(404).send({ message: `There is no restaurant with ID: ${req.params.id}` });
      }

      return res.status(200).send({ message: "Restaurant updated successfully" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Error updating restaurant' });
    }
  },

  addLocation: async (req, res) => {
    try {
      const restaurantId = req.params.id;

      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res
          .status(404)
          .send({ message: 'Restaurant not found' });
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
        return res.status(500).send({ message: 'Error trying to add location' });
      }

      return res.status(200).send({ message: "Location added to Restaurant successfully" });
    } catch (error) {
      return res.status(500).send({ message: 'Error creating restaurant' });
    }
  },

  removeLocation: async (req, res) => {
    try {
      const restaurantId = req.params.id;

      const restaurant = await Restaurant.findById(restaurantId);

      if (!restaurant) {
        return res
          .status(404)
          .send({ message: 'Restaurant not found' });
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
        return res.status(500).send({ message: 'Error trying to remove location from restaurant' });
      }

      return res.status(200).send({ message: "Location deleted from Restaurant successfully" });
    } catch (error) {
      return res.status(500).send({ message: 'Error removing location from restaurant' });
    }
  },
};

export {restaurantController};
