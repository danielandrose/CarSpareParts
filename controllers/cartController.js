//CartController.js

const Cart = require('../models/cartModel')
const Products = require('../models/productModel')

exports.showCart = async (req,res)=>{
    const user_id = req.user.user_id;
    const userCart = await Cart.findOne({user_id});

    if(!userCart ){
        return res.status(404).json({message:"Cart is empty"})
    }

    try{
    let subtotal =0;
    const allproducts =  await Products.find();
    const products = userCart.products.map((product)=>{

        const productDetails = allproducts.find((item)=> item.product_id == product.product_id);

        subtotal += productDetails.price * product.quantity;
        return {
            id:productDetails.id,
            title:productDetails.title,
            description:productDetails.description,
            price:productDetails.price,
            image:productDetails.image,
            quantity:product.quantity
        };
    })
    res.status(200).json({products,subtotal});
}catch(e){
    res.status(500).json({
        message:"Error in fetching products",
    })
}
}

exports.addToCart = async(req,res)=>{
    const userId = req.user.user_id;
    const {product_id,quantity} = req.body;
    const userCart = await Cart.findOne({userId});
    //console.log(userCart)
    if(!userCart){
        const userCart = new Cart({
            user_id:userId,
            products:[
                {
                    product_id,
                    quantity,
                }
            ],
        })
        try{
            await userCart.save();
            res.status(200).json("new cart created")
        }catch(e){
            console.log(e)
        }
    }
    else{
        const products = userCart.products;
        const existing_product =products.find((product)=>product.product_id == productId);

        if(existing_product){
            existing_product.quantity = quantity;
        }
        else{
            products.push({
                productId,
                quantity
            })
        }

        try{
            await userCart.save();
            res.status(200).json("product added to cart")
        }catch(e){
            console.log(e)
        }
    }   
}

exports.removefromcart = async (req, res) => {
    const userId = req.user.user_id;
    const productId = req.params.id;
    
    const userCart = await Cart.findOne({ user_id: userId });
    if (!userCart) {
        return res.status(404).json("cart not found");
    }

    const cartitems = userCart.products;
    if (!cartitems || cartitems.length === 0) {
        return res.status(200).json("No items in cart");
    }

    if (!cartitems.find((item) => productId == item.product_id)) {
        return res.status(200).json("product not found in cart");
    }

    const updatedCartitems = cartitems.filter((product) => productId != product.product_id);
    userCart.products = updatedCartitems;
    await userCart.save();
    res.status(200).json("item removed from cart");
}

/*const Cart = require("../models/cartModel");

exports.createCart = async (req, res) => {
    const { user_id } = req.user;
    const { product_id, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user_id });

        if (!cart) {
            cart = new Cart({
                user_id,
                products: [
                    {
                        product_id,
                        quantity,
                    },
                ],
            });
        } else {
            const productIndex = cart.products.findIndex(
                (prod) => prod.product_id === product_id
            );

            if (productIndex > -1) {
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.push({ product_id, quantity });
            }
        }

        await cart.save();
        res.status(201).json({ message: "Product added/updated in cart", cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};




exports.getCart=async(req,res)=>{
    const {user_id}=req.user;
    const cart=await Cart.find({user_id})
    
    if(!cart){
        return res.status(404).json({message:"cart not found"})
    }
    try{
        let subTotal=0
        const CartItems=await Promise.all(
            cart.products.map(async (product)=>{
                const productDetails = await Product.findById(product.product_id)
                subTotal+=productDetails.price*product.quantity
                return{
                    product_id:productDetails.id,
                    title:productDetails.title,
                    decription:productDetails.description,
                    price:productDetails.price,
                    image:productDetails.image,
                    quatity:product.quatity
                }
            })
        )
        res.status(200).json({cartItems: CartItems.subTotal});
    }
    catch(err){
        res.status(500).json({message:"Sever Error",err})
    }
}

*/