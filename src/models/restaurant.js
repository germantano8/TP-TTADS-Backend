const mongoose = require("mongoose");

var restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  deliveryPricePerKm: { type: Number, required: true },
  deliveryPriceBase: { type: Number, required: true },
  location: { type: mongoose.SchemaTypes.ObjectId, ref: "location" },
});

module.exports = mongoose.model("restaurant", restaurantSchema);
