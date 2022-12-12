import {Schema, model} from 'mongoose';

const locationSchema = new Schema(
  {
    street: { type: String, required: true },
    number: { type: Number, required: true },
    floor: { type: Number },
    apartment: { type: String },
    longitude: { type: String, required: true },
    latitude: { type: String, required: true },
  },
);

const Location = model('location', locationSchema);

export {Location};
