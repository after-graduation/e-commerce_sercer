'use strict';

const mongoose = require('mongoose');
const serverMod = require('./lib/server');
socket = io.listen(process.env.PORT);


serverMod.start(); 
const MONGO_URL = 'mongodb+srv://Hammad_95:0000@cluster0.3lcfu.mongodb.net/ecommerce?retryWrites=true&w=majority';
const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
mongoose.connect(MONGO_URL,mongooseOptions);
