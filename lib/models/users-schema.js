'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const users = mongoose.Schema({
  username: { type: String, required: true,unique: true },
  password: { type: String, required: true },
  email: { type: String },
  fullName: { type: String },
  userImage: { type: String },
  role: { type: String, enum: ['admin', 'writer'] ,default:'writer' },
  token: { type: String },
},{toObject:{virtuals:true},toJSON:{virtuals:true}});
users.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 5);
});
users.virtual('posts',{
  ref:'posts',
  localField:'username',
  foreignField:'username',
  justOne:false,
});
users.pre('find',function(next){
  try{
    console.log('this error i1');
    this.populate('psots');
  
    next();
  }catch(e){
    console.log('this error inside find ---------------->',e);
  }
});
users.post('find',async function(){
  try{
    console.log('this error i2');
    await this.populate('posts').execPopulate((err)=>{
      console.log(err);
    });
  }catch(e){
    console.log('this error inside find ---------------->',e);
  }
});
module.exports = mongoose.model('users', users);