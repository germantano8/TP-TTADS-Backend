const validator = require("validator");

const verifyTag = (req, res, next) => {
  const { description } = req.body;

  if (description && validator.isLength(description, { min: 4, max: 200 }))
    return next();

  return res.status(400).send({
    success: false,
    errors: {
      description: "description must be between 4 and 200 characters",
    },
  });
};

module.exports = verifyTag;
