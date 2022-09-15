const verifyMongooseID = require("./verifyMongooseID");
const verifyTag = require("./verifyTag");
const verifyUser = require("./verifyUser");
const verifyCategory = require("./verifyCategory");
const verifyMeal = require("./verifyMeal");
const verifyLocation = require("./verifyLocation");
const verifyRestaurant = require('./verifyRestaurant');
const verifyRestaurantTags = require("./verifyRestaurantTags");
const verifyOrder = require("./verifyOrder");
const auth = require("./auth-middleware");

module.exports = {
  verifyMongooseID,
  verifyTag,
  verifyUser,
  verifyCategory,
  verifyMeal,
  verifyLocation,
  verifyRestaurant,
  verifyRestaurantTags,
  verifyOrder,
  auth,
};
