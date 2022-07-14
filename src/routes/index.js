const express = require('express');
const role = require('./role');
const user = require('./user');
const tag = require('./tag');
const category = require('./category');
const meal = require('./meal');
const location = require('./location');
const restaurant = require('./restaurant');
const order = require('./order');

const router = express.Router();

router.use('/roles', role);
router.use('/users', user);
router.use('/tags', tag);
router.use('/categories', category);
router.use('/meals', meal);
router.use('/locations', location);
router.use('/restaurants', restaurant);
router.use('/orders', order);

module.exports = router;
