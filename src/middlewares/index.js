const { verifyMongooseID, verifyMongooseIDWrapper } = require("./verifyMongooseID");
const verifyTag = require("./verifyTag");
const { verifyUserWrapper } = require("./verifyUser");
const verifyCategory = require("./verifyCategory");
const verifyMealWrapper = require("./verifyMeal");
const verifyLocation = require("./verifyLocation");
const verifyRestaurant = require('./verifyRestaurant');
const verifyRestaurantTags = require("./verifyRestaurantTags");
const verifyOrder = require("./verifyOrder");
const authMiddleware = require("./auth-middleware");

module.exports = {
  verifyMongooseID,
  verifyMongooseIDWrapper,
  verifyTag,
  verifyUserWrapper,
  verifyCategory,
  verifyMealWrapper,
  verifyLocation,
  verifyRestaurant,
  verifyRestaurantTags,
  verifyOrder,
  authMiddleware,
};
