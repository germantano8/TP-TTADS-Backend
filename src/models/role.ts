import {Schema, model} from 'mongoose';

const roleSchema = new Schema(
  {
    description: { type: String, unique: true, required: true },
  },
);

const Role = model('role', roleSchema);

export {Role};