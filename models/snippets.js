const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const snippetSchema = new Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  notes: {type: String},
  language: {type: String, required: true},
  tags: {type: Array, required: true}
})


const Snippets = mongoose.model('Snippets', snippetSchema)

module.exports = Snippets;
