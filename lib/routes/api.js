'use strict';

require('dotenv').config();
const express = require('express');
const router = express.Router();
const users = require('../models/users-model');
const ip = require('../models/ip-model');
const basic = require('../middleware/basic.js');
const token = require('../middleware/token');


router.post('/signup', signupHandler);
router.post('/signin',basic,token, signinHandler);
router.post('/newserver', serverhundeler);

//HANDLERS:


/////// SIGN UP HANDLER
function serverhundeler (req, res,next)  {
  console.log('serverHandler');
  ip
    .create(req.body)
    .then((ip) => {
      console.log('this is newserver ip',ip);
    
    
      res.json(true ); 
    })
    .catch((err) => next(err));
}
function signupHandler (req, res,next)  {
  console.log('signupHandler');
  users
    .createUser(req.body)
    .then((user) => {
      console.log('this is user after sign up',user);
      const token = users.generateToken(user);
      req.user=user;
      return token;
    }).then(token=>{
      console.log('token',token);
      req.token=token;
      return users.update(req.user._id,{token:req.token});
    }).then((userUpdate)=>{
      console.log('userUpdated',userUpdate);
      req.user = userUpdate;
      res.json({ token:req.token }); 
    })
    .catch((err) => next(err));
}

/////// SIGN IN HANDLER
function signinHandler(req, res,next)  {
  console.log('signinHandler');
  res.json({ token: req.token });
}







module.exports = router;