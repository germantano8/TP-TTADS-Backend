import validator from 'validator';

function isValidLength(field, min = 4, max = 20) {
  return field && typeof field === "string" && validator.isLength(field, { min: min, max: max });
}

function isValidImageURL(field, min = 4, max = 200) {
  return field && typeof field === "string" && validator.isLength(field, { min: min, max: max });
}

export {isValidImageURL,isValidLength}