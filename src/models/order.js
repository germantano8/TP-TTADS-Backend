const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    idRestaurant: { type: mongoose.SchemaTypes.ObjectId, ref: 'restaurant', required:true },
    idUser: { type: mongoose.SchemaTypes.ObjectId, ref: 'user', required:true },
    totalPrice: { type: Number, required: true },
    meals: { type: [mongoose.SchemaTypes.ObjectId], ref: 'meal', required:true },
},
{
    timestamps: true,
});

module.exports = mongoose.model('order', orderSchema);