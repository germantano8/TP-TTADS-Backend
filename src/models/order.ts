import {Schema, model, SchemaTypes} from 'mongoose';

const orderSchema = new Schema(
  {
    restaurant: { type: SchemaTypes.ObjectId, ref: 'restaurant', required: true },
    user: { type: SchemaTypes.ObjectId, ref: 'user', required: true },
    totalPrice: { type: Number, required: true },
    meals: { type: [SchemaTypes.ObjectId], ref: 'meal', required: true },
  },
  {
    timestamps: true,
  },
);

const Order = model('order', orderSchema);

export {Order};
