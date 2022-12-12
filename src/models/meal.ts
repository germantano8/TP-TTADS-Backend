import {Schema, model, SchemaTypes} from 'mongoose';

const mealSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  vegan: { type: Boolean, required: true },
  celiac: { type: Boolean, required: true },
  category: { type: SchemaTypes.ObjectId, required: false, ref: 'category' },
  restaurant: { type: SchemaTypes.ObjectId, required: true, ref: 'restaurant' },
});

const Meal = model('meal', mealSchema);

export {Meal};
