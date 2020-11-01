'use strict';
const schema = require('./ip');
const Model = require('./model.js');
class Body extends Model {
  constructor() {
    super(schema);
  }
  async createIp(record) {
    console.log('record------>',record);
    try{
      let newRecord = new this.schema(record);
      let ip = await newRecord.save();
      console.log('ip after create and save------->',ip);
      return ip;
    }catch(err){
      try{
        let ip =await this.schema.find(record.ip);
        return ip;
      }
      catch(err){
        console.log('rejected' , err);
        return Promise.reject('this user is already exist'); 
      }
    }
  }
}

module.exports = new Body();