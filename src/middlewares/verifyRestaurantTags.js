const { Tag } = require("../models/index");
const mongoose = require("mongoose");

const verifyRestaurantTags = async (req, res, next) => {
  try {
    let tags = req.body.tags;
    if (!tags) next();
    tags.forEach((tagId) => {
      if (mongoose.isValidObjectId(tagId)) {
        let tag = Tag.findById(tagId);
        if (!tag) {
          res.status(400).send({
            success: false,
            errors: {
              description: "Some of the tags provided do not exist",
            },
          });
        }
      }
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      errors: {
        description: "Some error ocurred validating tags",
      },
    });
  }
};

module.exports = verifyRestaurantTags;
