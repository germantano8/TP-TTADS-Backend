const mongoose = require('mongoose');
const { Tag } = require('../models/index');

const verifyRestaurantTags = async (req, res, next) => {
  try {
    const { tags } = req.body;
    if (!tags) next();
    tags.forEach((tagId) => {
      if (mongoose.isValidObjectId(tagId)) {
        const tag = Tag.findById(tagId);
        if (!tag) {
          res.status(400).send({ message: 'Some of the tags provided do not exist', });
        }
      }
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Some error ocurred validating tags' });
  }
};

module.exports = verifyRestaurantTags;
