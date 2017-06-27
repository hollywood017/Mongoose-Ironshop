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


module.exports = router;
