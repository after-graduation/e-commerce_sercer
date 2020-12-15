'use strict';

const userModel = require('../lib/models/user/users-model');
const base64 = require('base-64');

function authSignIn(req,res,next){
  console.log("req.headers", req.headers)
  // will send by the front-end
  if(!req.headers.authorization){
    next('Invalid SignIn');
    return;
  }
  let base = req.headers.authorization.split(' ')[1];
  // this value will be increbted username and password
  // console.log("base", base)

  // destructureing the the value of the user and password after coming from the header as a authorization
  let [user,password] = base64.decode(base).split(':');
  // 
  console.log("user from basic", user)
  console.log("password from basic", password)


  userModel.authenticate(user,password)
    .then(result =>{
      req.token = result;
      // console.log("req.token", req.token)

      next();
    })
    .catch(err=>{
      next('Your Input is uncorrect');
    });
}

module.exports = authSignIn;