'use strict';
require('dotenv').config();
const users = require('./users-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET =  process.env.SECRET || 'homesweet';

class UsersModel{
  async authenticate(username, password){
  
    return new Promise((resolve,reject) =>{
      return users.find({username:username})
        .then(result =>{
          // console.log("result", result)
          if(result.length){
            // result[0].password >> from database
            bcrypt.compare(password, result[0].password)
              .then(final =>{
                if(final){
                  // if the user is exist return user data
                  // console.log("final", final)
                  
                  return resolve(this.generateToken(result[0])
                  );
                }
                else{
                  return reject('error');
                }
              });
          }
          else{
            return reject('error');
          }
        });   
    });
   
  }

  async save(newUser){
    return users.find({username: newUser.username})
      .then(async result=>{
        if(!result[0]){
          newUser.password = await bcrypt.hash(newUser.password,5);
          let newUserSave = new users(newUser);
          let final = await newUserSave.save();
          // console.log("final",final);
          return final;
        }
          return Promise.reject("the name is used");
        
      });
    
  }
  generateToken(user){
    let roles = {
      user:['read', 'create'],
      admin: ['read','create','delete','update'],
    };
    let token = jwt.sign({username: user.username, capability:roles[user.role]},SECRET,{
      expiresIn: '15m',
    });

    // console.log("tokeninuser",token);
    return token;
  }
  

  allUsers(){
    return users.find({});
  }

  verfiyToken(token){
    console.log("jwt.verify", jwt.verify)
    return jwt.verify(token, SECRET, (err, verifiedJwt) => {
      if(err){
        return Promise.reject();
      }else{
        let username = verifiedJwt['username'];
        console.log("username in verfiyToken", username)
        return users.find({username})
          .then(result =>{
            if(result.length){
              // console.log("verifiedJwt",verifiedJwt)
              return Promise.resolve(verifiedJwt);
            }
            else{
              return Promise.reject();
            }
          });
      }
    });
  }



  can(permision){
    if(permision){
      console.log("permision",permision)
      return Promise.resolve(true);
    }
    else{
      return Promise.resolve(false);
    }
  }
}

module.exports = new UsersModel();