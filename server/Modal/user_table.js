const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true,
    unique: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_data:
    {
      user_role: {
        type: String,
        required: true,
      },
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
