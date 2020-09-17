const moment = require('moment');
const mongoose = require('mongoose');
let bodySchema = mongoose.Schema({
  postId: { type: String, required: true},
  username: { type: String },
  userImage: { type: String },
  body: { type: String },
  date: { type:  String, default: moment().format('MMMM Do YYYY, h:mm:ss a') },
});

module.exports = mongoose.model('body', bodySchema);