const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    restaurant: { type: mongoose.SchemaTypes.ObjectId, ref: 'restaurant', required: true },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'user', required: true },
    totalPrice: { type: Number, required: true },
    meals: { type: [mongoose.SchemaTypes.ObjectId], ref: 'meal', required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('order', orderSchema);
