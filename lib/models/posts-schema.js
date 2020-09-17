'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
let dataSchema = mongoose.Schema({
  username: { type: String },
  userImage: { type: String },
  theComment: { type: String },
});
// let rateSchema=mongoose.Schema({
//   username: { type: String },
//   theRate: { type: String },
// });
const posts = mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  data: [dataSchema],
});


module.exports = mongoose.model('posts', posts);