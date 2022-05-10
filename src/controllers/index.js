"use strict";

let roleController = require('./role');
let userController = require('./user');
let tagController = require('./tag');
let categoryControler = require('./category');
let mealController = require('./meal');
let locationController = require('./location');
let restaurantController = require('./restaurant');

module.exports = {
    roleController,
    userController,
    tagController,
    categoryControler,
    mealController,
    locationController,
    restaurantController,
}