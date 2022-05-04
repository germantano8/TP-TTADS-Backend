"use strict";

let roleController = require('./role');
let userController = require('./user');
let tagController = require('./tag');
let categoryControler = require('./category');
let mealController = require('./meal');

module.exports = {
    roleController,
    userController,
    tagController,
    categoryControler,
    mealController
}