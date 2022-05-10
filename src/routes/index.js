"use strict";
let express = require("express");
let role = require("./role");
let user = require("./user");
let tag = require('./tag');
let category = require('./category');
let meal = require('./meal');
let location = require('./location');
let restaurant = require('./restaurant');

let router = express.Router();

router.use('/roles', role);
router.use('/users', user);
router.use("/tags", tag);
router.use('/categories', category);
router.use('/meals', meal);
router.use("/location",location);
router.use("/restaurant", restaurant);

module.exports = router;