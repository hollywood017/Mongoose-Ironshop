const express = require('express');
const Product = require('../models/product-model.js');
const router = express.Router();

router.get('/products', (req, res, next) =>{
  Product.find((err, productResults) =>{
    if(err){
      //use next() to skip to the ERROR PAGE
      next(err);
      return;
    }
    //display "product-list-views.ejs"
    res.render('product-views/product-list-view.ejs', {
      productsAndStuff: productResults
    });
  });
});

//STEP 1 of form submission for a new product
router.get('/products/new', (req, res, next) => {
  //display "new-product-view.ejs"
  res.render('product-views/new-product-view.ejs');
});
//STEP 2 of form submisson for a new product
//<form method="post" action="products">
//                |               |
//      -----------               |
//      |         -----------------
//      |         |
router.post('/products', (req, res, next) => {
  const theProduct = new Product({
    name: req.body.productName,
    price: req.body.productPrice,
    imageUrl: req.body.productImageUrl,
    description: req.body.productDescription
  });
  theProduct.save((err) => {
    if(err){
    //use next() to skip to the ERROR PAGE
    next(err);
    return;
  }
  // if save successfully, redirect to URL
  //(redirect is STEP 3 )
  res.redirect('/products');
  });
});

router.get('/products/details', (req, res, next) => {
  //       /products/details/myId=595174b1e7890a864f5f0b
  Product.findById(
    req.query.myId,           // 1st argument -> the id to find in the DB
    (err, theProduct) => {    // 2nd argument -> callback
      if(err) {
        //USE NEXT() TO SKIP TO THE ERROR PAGE
        next(err);
        return;
      }
      //NEW WAY TO TRANSFER PRODUCTS OVER TO THE view
      res.locals.productDetails = theProduct;
      res.render('product-views/product-details-view.ejs');
      // res.render('product-views/product-details-view.ejs',{
      //   productDetails: theProduct
      // });
    }
  );
});

//STEP 1 of form submisson for UPDATING a product
//(SAME AS DETAILS PAGE BUT DIFFERENT VIEW FILE)
router.get('/products/edit', (req, res, next) => {
  //             /products/details/edit?myId=595174b1e7890a864f5f0b
  Product.findById(
    req.query.myId,
    (err, theProduct) =>{
      if (err) {
        //use next() to skip to the ERROR PAGE
        next(err);
        return;
      }
      res.locals.productDetails = theProduct;
      res.render('product-views/edit-product-view.ejs');


    }
  );
});
//STEP 2 of form submisson for UPDATING a product
//<form method="post" action="products">
//                |               |
//      -----------               |
//      |         -----------------
//      |         |
router.post('/products/update', (req, res, next) => {

  Product.findByIdAndUpdate(
    req.query.myId,           //1st argument -> id of document to update
    {                         //2nd argument -> object of fields to update
      name: req.body.productName,
      price: req.body.productPrice,
      imageUrl: req.body.productImageUrl,
      description: req.body.productDescription

    },
    (err, theProduct) => {    //3rd argument -> callback!!!!
      if(err){
        //use next() to skip to the ERROR PAGE
        next(err);
        return;
      }
      // if save successfully, redirect to URL
      //(redirect is STEP 3 )
      res.redirect('/products/details?myId=' + theProduct._id);
      //you can ONLY redirect to a URL
      //🚨🚨🚨
      //If you dont redirect, you can refresh and duplicate your data!!!!!
      //🚨🚨🚨

    }
  );
});
//DELETE LINK
router.get('/products/delete', (req, res, next) => {
  Product.findByIdAndRemove(
    req.query.myId,           //1st argument -> id of document to remove
    (err, theProduct) => {    //2nd argument -> callback
      if(err){
        //use next() to skip to the ERROR PAGE
        next(err);
        return;
      }
      //If remvoed successfully redirect to a URL.
      res.redirect('/products');

    }
  );
});
router.post('/products/delete', (req, res, next) => {
  Product.findByIdAndRemove(
    req.query.myId,           //1st argument -> id of document to remove
    (err, theProduct) => {    //2nd argument -> callback
      if(err){
        //use next() to skip to the ERROR PAGE
        next(err);
        return;
      }
      //If remvoed successfully redirect to a URL.
      res.redirect('/products');

    }
  );
});

module.exports = router;
