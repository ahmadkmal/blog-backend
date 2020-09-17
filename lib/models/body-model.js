'use strict';
const schema = require('./body-schema');
const Model = require('./model.js');
class Body extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new Body();