const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    street: { type: String, required: true },
    number: { type: Number, required: true },
    floor: { type: Number },
    apartment: { type: String },
    longitude: { type: String, required: true },
    latitude: { type: String, required: true },
  },
);

module.exports = mongoose.model('location', locationSchema);
