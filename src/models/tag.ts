import {Schema, model} from 'mongoose';

const tagSchema = new Schema(
  {
    description: { type: String, unique: true, required: true },
  },
);

const Tag = model('tag', tagSchema);

export {Tag};