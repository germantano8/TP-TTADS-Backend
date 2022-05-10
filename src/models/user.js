const mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String, required: false },
    email: { type: String, unique: true, required: true },
    imageUrl: { type: String, required: false },
    password: { type: String, required: true },
    role: { type: mongoose.SchemaTypes.ObjectId, required:true, ref: "role" },
    //Acá se guardan todas las locations
    locations: {type: [mongoose.SchemaTypes.ObjectId]}, 
    // Acá solo se selecciona la principal de todas las que tiene el usuario
    mainLocation: {type: mongoose.SchemaTypes.ObjectId, required:true ,ref: "location"},  
  }
);

module.exports = mongoose.model("user", userSchema);