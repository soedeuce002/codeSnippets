const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {type: String},
  name: {type: String, required: true},
  email: {type: String, required: true},
  username: {type: String, required: true},
  passwordHash: {type: String}
})

userSchema.methods.setPassword = function(password) {
  this.passwordHash = bcrypt.hashSync(password, 8);
};


const User = mongoose.model('User', userSchema)

module.exports = User;
