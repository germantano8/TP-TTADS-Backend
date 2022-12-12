import {Schema, model, SchemaTypes} from 'mongoose';

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  deliveryPricePerKm: { type: Number, required: true },
  deliveryPriceBase: { type: Number, required: true },
  location: { type: SchemaTypes.ObjectId, ref: 'location' },
  tags: { type: [SchemaTypes.ObjectId] },
});

const Restaurant = model('restaurant', restaurantSchema);

export {Restaurant};