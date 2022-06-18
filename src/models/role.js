const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    description: { type: String, unique: true, required: true },
  },
);

module.exports = mongoose.model('role', roleSchema);
