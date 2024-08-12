//cartModel.js
const mongoose = require('mongoose');
const User = require('./userModel');

const CartSchema = new mongoose.Schema({
    user_id: String,
    products:[{  
        product_id: String,
        quantity: Number ,
    },],
});
    const cart =  mongoose.model("cart", CartSchema);


module.exports = cart;