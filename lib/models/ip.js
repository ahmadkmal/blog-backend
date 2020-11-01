const moment = require('moment');
const mongoose = require('mongoose');
let ipSchema = mongoose.Schema({
  ip: { type: String, required: true},
  axs: { type: String, enum: ['true', 'f'] ,default:'true' },
  date: { type:  String, default: moment().format('MMMM Do YYYY, h:mm:ss a') },
});

module.exports = mongoose.model('ip', ipSchema);