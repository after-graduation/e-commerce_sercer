'use strict';

const userModel = require('../lib/models/user/users-model');

module.exports= (capability)=>{
  console.log("capability",capability)
  return (req,res,next) =>{
    console.log("req.user.capability",req.user.capability)
    return userModel.can(req.user.capability.includes(capability))
      .then(result =>{
        result ? next() : next('access Denide');
      });
    
  };
};