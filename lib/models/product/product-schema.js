'use strict';

const mongoose = require('mongoose');

const products = mongoose.Schema({
    title:{type:String,required:true},
    desc: {type:String,required:true},
    price: {type:Number,required:true},
    quantity:{type:Number,required:true},
    image: {type:String},
});



module.exports = mongoose.model('products',products);