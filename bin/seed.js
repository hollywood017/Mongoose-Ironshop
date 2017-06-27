// SEED FILE
// just a JavaScript file that saves things to your database when you run it
// (makes onboarding easier and it allows you to re-populate the DB after you delete things.)
const mongoose = require('mongoose');
                                    //database name
                                    //    |
mongoose.connect('mongodb://localhost/ironshop');
                                    //    |
                                    // use ironshop
//We have to connect the DB again here
//because seed.js is SEPARATE from app.js
const Product = require('../models/product-model.js');

const productInfoArray =[{
  name:'Phone Case',
  price: 9.99,
  imageUrl: 'https://media.giphy.com/media/rGuqjoQIeWG7m/giphy.gif',
  description: 'Protects your phone. Any model. Any size. One size fits all.'
},
{
  name:'Bean Bag Chair',
  price: 25.99,
  imageUrl: 'https://media.giphy.com/media/FCACuwkULerp6/giphy.gif',
  description: 'So comfy you can fall on.'
},
{
  name:'Tissues',
  price: 13.70,
  imageUrl: 'https://media.giphy.com/media/3oEdv889IaMYigqgZa/giphy.gif',
  description: 'Capture all the debris coming out of your nose.'
},
{
  name:'Yoga Mat',
  price: 29.99,
  imageUrl: 'https://media.giphy.com/media/U48VSm1RTbqso/giphy.gif',
  description: 'Keeps your knees safe, slip proof. Top of the line.'
},
{
  name:'20in. Monitor',
  price: 249.99,
  imageUrl: 'https://media.giphy.com/media/3o6ZtgzXegXnwpHJII/giphy.gif',
  description: 'Large enough for even the heaviest gamer.'
},
{
  name:'Soylent',
  price: 54.99,
  imageUrl: 'https://media.giphy.com/media/b3h9b66CCujPG/giphy.gif',
  description: 'You never have to leave your computer! All the nutrition you will ever need.'
}
];


Product.create(
  productInfoArray,                 //1st argument -> array of product info objects
  (err, productResults) => {        //2nd argument -> callback!
    if (err){
      console.log("OMG! Database error.");
      return;
    }

    productResults.forEach((oneProd) =>{
      console.log('New Product! ' + oneProd.name);
    });
  }
);
