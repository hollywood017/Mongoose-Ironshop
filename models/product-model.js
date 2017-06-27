const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myProductSchema = new Schema({
  name: {type: String},
  price: {type: Number},
  imageUrl: {type: String, default: '/images/product.gif'},
  description: {type: String}
});
//Model
//  constructor function that allows us to interact with a single collection
 const Product = mongoose.model('Product', myProductSchema);
//                                  |
//   --------------------------------
//   |
// 'Product'  ->   'products'  ->   db.products.find()
//
//Collection name is automatically determined by mongoose


//DON'T FORGET THIS OR IT WILL NOT WORK
module.exports = Product;
