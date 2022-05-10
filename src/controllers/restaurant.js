const { Restaurant } = require('../models/index');

const restaurantController = {

    createRestaurant: async (req, res) => {
        try {
            const newRestaurant = new Restaurant(
                {
                    name: req.body.name,
                    description: req.body.description,
                    image: req.body.image,
                    deliveryPricePerKm: req.body.deliveryPricePerKm,
                    deliveryPriceBase: req.body.deliveryPriceBase,
                });

            await newRestaurant.save();

            res.send({ success: true, newRestaurant })
        } catch (error) {
            res.status(500).send({ success: false, message: "Error creating restaurant" })
        }
    },

    getRestaurants: async (req, res) => {
        try {
            const restaurants = await Restaurant.find({}).exec();
            res.send({ success: true, restaurants });

        } catch (error) {
            res.status(500).send({ success: false, message: "Error finding restaurants" })
        }
    },

    getRestaurant: async (req, res) => {
        try {
            const restaurant = await Restaurant.findById(req.params.id).exec();

            if (!restaurant) return res.status(404).send({ success: false, message: `There is no restaurant with ID: ${req.params.id}` });

            res.send({ success: true, restaurant });

        } catch (error) {
            res.status(500).send({ success: false, message: "Error finding restaurant" })
        }
    },

    deleteRestaurant: async (req, res) => {
        try {
            const removedRestaurant = await Restaurant.findByIdAndRemove(req.params.id).exec();

            if (!removedRestaurant) return res.status(404).send({ success: false, message: `There is no restaurant with ID: ${req.params.id}` });

            res.send({ success: true, removedRestaurant })
        } catch (error) {
            res.status(500).send({ success: false, message: "Error deleting restaurant" })
        }
    },

    updateRestaurant: async (req, res) => {
        try {
            const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id,
                {
                    name: req.body.name,
                    description: req.body.description,
                    image: req.body.image,
                    deliveryPricePerKm: req.body.deliveryPricePerKm,
                    deliveryPriceBase: req.body.deliveryPriceBase,
                }).exec();

            if (!updatedRestaurant) return res.status(404).send({ success: false, message: `There is no restaurant with ID: ${req.params.id}` });

            res.send({ success: true, updatedRestaurant });

        } catch (error) {
            res.status(500).send({ success: false, message: "Error updating restaurant" })
        }
    },



};

module.exports = restaurantController;