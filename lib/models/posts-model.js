'use strict';
const schema = require('./posts-schema');
const Model = require('./model.js');
class posts extends Model {
  constructor() {
    super(schema);
  }
  async getOnePost(_id) {
    const queryObject = {_id};
    console.log('getdbonepost------>',_id,queryObject);
    return (await this.schema.find(queryObject))[0];
  }
  getAllPosts() {
    const queryObject = {};
    return this.schema.find(queryObject);
  }
  
}

module.exports = new posts();