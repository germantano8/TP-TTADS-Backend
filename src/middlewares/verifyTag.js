const validator = require('validator');
const { isValidLength } = require('../utils/isValidLength');
const { Tag } = require('../models/index');

const verifyTag = async (req, res, next) => {

  const errors = {
    description: null
  };


  if (isValidLength(req.body.description)) {

    const existingTag = await Tag.findOne({ description: req.body.description }).exec();
    if (existingTag) errors.description = "Description is already in use";

  } else {
    errors.description = "must be between 4 and 20 characters";
  };



  if (Object.entries(errors).some((e) => e[1] != null)) {
    return res.status(400).send(errors);
  };

  next();
};

module.exports = verifyTag;
