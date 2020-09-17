'use strict';

const express = require('express');
const router = express.Router();
const userModel = require('../models/users-model.js');
const postModel = require('../models/posts-model.js');


router.get('/user/:username', userHandler);


//HANDLERS:

/////// GET USERS POSTs
async function userHandler(req, res, next) {
  postModel
    .getByUser(req.params.username)
    .then(async (data) =>{
      let user = (await userModel.getUserByUsername(req.params.username));
      console.log('data,user------>',data,user);
      res.json({data,user});
    })
    .catch(next);
}

module.exports = router;