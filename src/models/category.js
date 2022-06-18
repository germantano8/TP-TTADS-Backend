const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  description: { type: String, required: true },
  restaurant: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'restaurant' },
});

module.exports = mongoose.model('category', categorySchema);
