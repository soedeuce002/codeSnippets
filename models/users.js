const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  passwordHash: {type: String, required: true}
})



const Users = mongoose.model('Users', userSchema)

module.exports = Users;
