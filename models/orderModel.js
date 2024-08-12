//orderModels.js

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required for order"]
    },
    address: {
        type: String,
        required: [true, "Address is required for order"]
    },
    products: [{
        product_id: {
            type: String,
            required: [true, "Product ID is required for order"]
        },
        title: {
            type: String,
            required: [true, "Product title is required"]
        },
        description: {
            type: String,
            required: [true, "Product description is required"]
        },
        price: {
            type: Number,
            required: [true, "Product price is required"]
        },
        image: {
            type: String,
            required: [true, "Product image URL is required"]
        },
        quantity: {
            type: Number,
            required: [true, "Product quantity is required"]
        }
    }],
    orderDate: {
        type: Date,
        required: [true, "Order date is required"]
    },
    deliveryDate: {
        type: Date,
        required: [true, "Expected delivery date is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required for order"]
    }
});

module.exports = mongoose.model('Order', orderSchema);