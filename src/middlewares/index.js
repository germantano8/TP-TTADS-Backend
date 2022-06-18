const verifyMongooseID = require('./verifyMongooseID');
const verifyTag = require('./verifyTag');
const verifyUser = require('./verifyUser');
const verifyCategory = require('./verifyCategory');
const verifyMeal = require('./verifyMeal');
const verifyLocation = require('./verifyLocation');
const verifyRestaurantTags = require('./verifyRestaurantTags');
const auth = require('./auth');

module.exports = {
  verifyMongooseID,
  verifyTag,
  verifyUser,
  verifyCategory,
  verifyMeal,
  verifyLocation,
  verifyRestaurantTags,
  auth,
};
