'use strict';
const schema = require('./ip');
const Model = require('./model.js');
class Body extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new Body();