const validator = require('validator');

function verifyLength(field) {
  if (!(field && validator.isLength(field, { min: 4, max: 20 }))) {
    return true;
  }
  return false;
}
exports.verifyLength = verifyLength;
