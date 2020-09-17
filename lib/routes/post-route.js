'use strict';

const express = require('express');
const router = express.Router();
const postModel = require('../models/posts-model.js');
const specifyUser = require('../middleware/specifyUsers');
const berar = require('../middleware/bearer-auth');

router.post('/user/:username', berar, postHandler);
router.get('/all', showAllPosts);
router.get('/search/:id', specifyUser, showOnePost);

//HANDLERS:


/////// SHOW one POST
async function showOnePost(req, res, next) {


  console.log('onepost------>',req.params.id);
  let userPost = (await postModel.ownerPost(req.params.id));
  console.log('userPost------>',userPost);
  if(userPost){
    if (userPost.username === req.user.username||userPost.status==='accepted'){
      res.json(userPost);
    }
  }
  
  postModel.getOnePost(req.params.id).then((data) => {
    console.log(data);
    res.json(data);
  });
  
  // .catch(err => next(err.message));
}



/////// SHOW ALL POST
function showAllPosts(req, res, next) {
  postModel.getAllPosts()
    .then(data => {
      console.log(data);
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
      res.json(data);
    } catch (e) {
      next(e.message);
    }
  } else {
    next('Invalid User Post');
  }
}
module.exports = router;