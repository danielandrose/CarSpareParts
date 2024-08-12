const express = require('express')
const app=express()
const productsRoutes=require("./routes/productRoutes")
const userRoutes=require("./routes/userRoutes")
const loginRoutes=require("./routes/loginRoutes")
const cartRoutes=require("./routes/cartRoutes")
const orderRoutes=require("./routes/orderRoutes")

const mongoose=require("mongoose")
//mongodb+srv://Daniel:dan123@cluster0.ptelakr.mongodb.net/e_commerce
//mongodb://localhost:27017
mongoose.connect(
    `mongodb+srv://Daniel:dan123@cluster0.ptelakr.mongodb.net/e_commerce`
).then(()=>{
    console.log("connected to database")
})

app.use(express.json()) 
app.use("/products",productsRoutes)
app.use("/user",userRoutes)
app.use("/login",loginRoutes)
app.use("/cart",cartRoutes)
app.use("/order",orderRoutes)

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})
