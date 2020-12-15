'use strict';

const mongoose = require('mongoose');
const serverMod = require('./lib/server');
serverMod.start(); 
const MONGO_URL = 'mongodb://localhost:27017/ecommerce';
const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
mongoose.connect(MONGO_URL,mongooseOptions);
