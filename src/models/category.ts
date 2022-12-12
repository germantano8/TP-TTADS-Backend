import {Schema, model, SchemaTypes} from 'mongoose';

const categorySchema = new Schema({
  description: { type: String, required: true },
  restaurant: { type: SchemaTypes.ObjectId, required: true, ref: 'restaurant' },
});

const Category = model('category', categorySchema);

export {Category}
