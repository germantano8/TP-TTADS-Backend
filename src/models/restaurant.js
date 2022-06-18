const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  deliveryPricePerKm: { type: Number, required: true },
  deliveryPriceBase: { type: Number, required: true },
  location: { type: mongoose.SchemaTypes.ObjectId, ref: 'location' },
  tags: { type: [mongoose.SchemaTypes.ObjectId] },
});

module.exports = mongoose.model('restaurant', restaurantSchema);
