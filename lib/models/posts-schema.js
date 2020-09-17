'use strict';
require('dotenv').config();

const mongoose = require('mongoose');


const posts = mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
},{toObject:{virtuals:true},toJSON:{virtuals:true}});

posts.virtual('body',{
  ref:'body',
  localField:'_id',
  foreignField:'postId',
  justOne:false,
});
posts.pre('find',function(next){
  try{
    console.log('pre psots');
    this.populate('body');
    next();
  }catch(e){
    console.log(e);
  }
});
posts.post('find',async function(){
  try{
    console.log('post psots');
    await this.populate('body').execPopulate((err)=>{
      console.log(err);
    });
  }catch(e){
    console.log(e);
  }
});
module.exports = mongoose.model('posts', posts);