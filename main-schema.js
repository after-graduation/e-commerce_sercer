'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const users = mongoose.Schema({
  username: { type: String, required: true,unique: true },
  password: { type: String, required: true },
  email: { type: String },
  role: { type: String, enum: ['admin', 'writer'] ,default:'writer' },
  token: { type: String },

},{toObject:{virtuals:true},toJSON:{virtuals:true}});

users.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

users.virtual('stories',{
  ref:'stories',
  localField:'username',
  foreignField:'username',
  justOne:true,

});


module.exports = mongoose.model('users', users);
