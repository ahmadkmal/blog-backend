'use strict';

require('dotenv').config();
const express = require('express');
const router = express.Router();
const users = require('../models/users-model');
const basic = require('../middleware/basic.js');
const token = require('../middleware/token');


router.post('/signup', signupHandler);
router.post('/signin',basic,token, signinHandler);


//HANDLERS:


/////// SIGN UP HANDLER
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