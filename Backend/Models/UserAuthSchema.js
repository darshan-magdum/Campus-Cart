const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  password: String,
});

const UserSignup = mongoose.model('UserSignup', UserSchema);

module.exports = UserSignup;
