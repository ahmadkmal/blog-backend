'use strict';

const express = require('express');
const router = express.Router();
const userModel = require('../models/users-model.js');
const postModel = require('../models/posts-model.js');
const specifyUser = require('../middleware/specifyUsers');


router.get('/user/:username', specifyUser, userHandler);


//HANDLERS:

/////// GET USERS POSTs
async function userHandler(req, res, next) {
 
  //get all user's published posts only from posts schema
  let test = await userModel.getUserByUsername(req.params.username);
  console.log('not owner',test);

  postModel
    .getOnly(req.params.username)
    .then(async (data) =>{
      let user = (await userModel.getUserByUsername(req.params.username));
      console.log('data,user------>',data,user);
      res.json({data,user});
    })
    .catch(next);
}

module.exports = router;