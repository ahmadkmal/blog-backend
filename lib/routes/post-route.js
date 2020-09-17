'use strict';

const express = require('express');
const router = express.Router();
const postModel = require('../models/posts-model.js');
const bodyModel = require('../models/body-model');
const berar = require('../middleware/bearer-auth');

router.post('/user/:username', berar, postHandler);
router.get('/all', showAllPosts);
router.route('/post/:id')
  .get(showOnePost)
  .post(berar,addToPost);
router.route('/body/:id')
  .put(berar,editBody)
  .delete(berar,deleteBody);


//HANDLERS:
async function deleteBody(req, res, next) {
  try{
    const data = (await bodyModel.get(req.params.id))[0];
    if(data.username===req.user.username){
      await bodyModel.delete(req.params.id)
        .then(newdata=>res.json(newdata));
    }else{
      next('not othorized');
    }
    
  }catch(err){
    next(err);
  }
}

async function addToPost(req, res, next) {
  try{
    console.log('addtopost==--->', {
      postId:req.params.id,
      body:req.body.body,
      username:req.user.username,
      userImage:req.user.userImage,
    });
    const data =  await bodyModel.create(
      {
        postId:req.params.id,
        body:req.body.body,
        username:req.user.username,
        userImage:req.user.userImage,
      });
    res.json(data);
  }catch(err){
    next(err);
  }
}

async function editBody(req, res, next) {
  try{
    if(req.user.role==='admin'){
      await bodyModel.update(req.params.id,{body:req.body.body})
        .then(newdata=>res.json(newdata));
    }else{
      const data = await bodyModel.get(req.params.id);
      if(data.username===req.user.username){
        await bodyModel.update(req.params.id,{body:req.body})
          .then(newdata=>res.json(newdata));
      }
    }
    next('you are not authorize');
    
  }catch(err){
    next(err);
  }
}
/////// SHOW one POST
async function showOnePost(req, res, next) {
  try{
    postModel.getOnePost(req.params.id).then((data) => {
      console.log(data);
      res.json(data);
    });
  }catch(err){
    next(err);
  }
}



/////// SHOW ALL POST
function showAllPosts(req, res, next) {
  postModel.getAllPosts()
    .then(data => {
      res.json(data);
    })
    .catch(err => next(err.message));
}



/////// CREATE POST
async function postHandler(req, res, next) {

  console.log('req.user.username', req.user.username);
  console.log('req.params.username', req.params);

  if (req.params.username === req.user.username) {
    try {
      req.body.username = req.user.username;
      req.body.userImage = req.user.userImage;
      const data = await postModel.create(req.body);
      console.log('data', data,{...req.body,postId:data._id});
      const bodyData = await bodyModel.create({...req.body,postId:data._id});
      console.log('bodyData',bodyData);
      const data2 =await postModel.get(data._id);
      console.log('data2',data2);
      res.json(data2);
    } catch (e) {
      next(e.message);
    }
  } else {
    next('Invalid User Post you cant post on other user');
  }
}
module.exports = router;