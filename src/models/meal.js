const mongoose = require('mongoose');

var mealSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    vegan: { type: Boolean, required: true },
    celiac: { type: Boolean, required: true },
    category: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "category" },
});

module.exports = mongoose.model('meal', mealSchema);