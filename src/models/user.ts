import {Schema, model, SchemaTypes} from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phone: { type: String, required: false },
  email: { type: String, unique: true, required: true },
  imageUrl: { type: String, required: false },
  password: { type: String, required: true },
  role: { type: SchemaTypes.ObjectId, required: true, ref: 'role' },
  // Acá se guardan todas las locations
  locations: { type: [SchemaTypes.ObjectId] },
  // Acá solo se selecciona la principal de todas las que tiene el usuario
  mainLocation: { type: SchemaTypes.ObjectId, ref: 'location' },
});

const User = model('user', userSchema);

export {User};