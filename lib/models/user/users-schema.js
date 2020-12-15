'user strict';

const mongoose = require('mongoose');

const Users = mongoose.Schema({
  username: {type: String,required: true},
  password:{type: String,required:true},
  role : {
    type : String,
    default : 'user',
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
    },
  ],
},
)



module.exports = mongoose.model('Users',Users);