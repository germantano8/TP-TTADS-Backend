const validator = require('validator');

function isValidLength(field, min = 4, max = 20) {
  return field && typeof field === "string" && validator.isLength(field, { min: min, max: max });

}
exports.isValidLength = isValidLength;
