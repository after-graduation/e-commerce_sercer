'use strict';

const express = require('express');
const route = express.Router();
const productsCrud = require('../lib/models/product/product-collection');
const bearerMiddleware = require('../middleware/bearer-auth');
const permissions  =require('../middleware/autharize')
const users = require('../lib/models/user/users-schema');


route.post('/product',bearerMiddleware,permissions('create'),postProduct);
route.get('/product',bearerMiddleware,permissions('read'),getAllProducts);
route.get('/product/:id',bearerMiddleware,permissions('read'),getByIdProduct);
route.put('/product/:id',bearerMiddleware,permissions('update'),updatedProductById);
route.delete('/product/:id',bearerMiddleware,permissions('delete'),deleteProduct);
// route.post('/addToCart',addToCart);
// route.get('/recipe',getToCart);



function postProduct(req, res,next){
  let data = req.body;
  productsCrud.create(data)
    .then(productAdded=>{
      res.json(productAdded);
    })
    .catch(next);
}

function getAllProducts(req, res,next){
  productsCrud.get()
    .then(allProducts =>{
      res.json(allProducts);
    })
    .catch(next);
}

function getByIdProduct(req, res,next){
  let id = req.params.id;
  productsCrud.get(id)
    .then(productId =>{
      res.json(productId);
    })
    .catch(next);
}

function updatedProductById(req, res,next){
  let id = req.params.id;
  let data = req.body;
  productsCrud.update(id,data)
    .then(updatedProduct =>{
      res.json(updatedProduct);
    })
    .catch(next);
}


function deleteProduct(req, res,next){
  let id = req.params.id;
  productsCrud.delete(id)
    .then(result =>{
      res.json({delete:`you delete the product has Id: ${id}`});
    })
    .catch(next);
}




// router.post('/:userId/product', async (req, res) => {
//   //Find a user
//   const user = await users.findOne({ _id: req.params.userId });

//   //Create a product
//   const product = new productsCrud();
//   comment.content = req.body.content;
//   product.user = user._id;
//   await product.save();

//   // Associate user with product
//   user.product.push(product._id);
//   await user.save();

//   res.send(product);
// });

  
module.exports = route;