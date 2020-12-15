'use strict';

const express = require('express');
const route = express.Router();
const userModel = require('../lib/models/user/users-model');
const basicAuth = require('../middleware/basic-auth');
const bearer=require('../middleware/bearer-auth')
// const OAuthMiddleware = require('./middleware/oauth');

route.post('/signup',signUp);
route.post('/signin',basicAuth,signIn);
route.get('/users',allUsers,bearer);
// route.get('/oauth',OAuthMiddleware,signInGitHub);


// for signUp
// this done in two part, first one save the new user to  database after check 
// then generate the user to incript him and  return an object to the client which contains the token.
function signUp(req,res,next){
  let newUser = req.body;
  userModel.save(newUser)
    .then(result =>{
      let token = userModel.generateToken(result);
      // console.log("result",result);
      // console.log("token",token);

      res.cookie('token', token, {
        expires  : new Date(Date.now() + 9999999),
        httpOnly : false,
      });
      res.status(200).send({  token: token });
    })
    .catch(()=>{
      res.json({error: 'This userName is taken'});
    });

}

// for sign In
function signIn(req,res,next){
  res.cookie('token', req.token, {
    expires  : new Date(Date.now() + 9999999),
    httpOnly : false,
  });
  res.status(200).send({  token: req.token });
}

// get all users
function allUsers(req,res,next){
  userModel.allUsers()
    .then(result =>{
      res.json(result);

    });
}


// for oauth route
// function signInGitHub(req,res){
//   res.cookie('token', req.token, {
//     expires  : new Date(Date.now() + 9999999),
//     httpOnly : false,
//   });
//   res.status(200).send({  token: req.token });
// }




module.exports = route;