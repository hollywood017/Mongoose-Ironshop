const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myProductSchema = new Schema({
  name: {type: String},
  price: {type: Number},
  imageUrl: {type: String, default: '/images/product.gif'},
  description: {type: String}
});

 const Product = mongoose.model('Product', myProductSchema);

//Collection name is automatically determined by mongoose
//--------------------------------------------------------
//Product -> products -> db.products.find()



//DON'T FORGET THIS OR IT WILL NOT WORK
module.exports = Product;
