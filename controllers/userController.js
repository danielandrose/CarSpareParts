//userController

const User=require("../models/userModel")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")



exports.createUser=async (req,res)=>{
    const {name,email,password}=req.body

    const user=new User({                                                                
        name,
        email,
        password
    })
    await user.save();
    res.status(200).json("User Created Sucessfully")
}


exports.login=async(req,res)=>{
    const{email,password}=req.body
    try{
        const user=await User.findOne({email})
        if(!user){
            res.status(400).json("Invalid email or password")

        }
        const isMatch =  await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json("Invalid email or password")
        }
        const token=jwt.sign({user_id:user._id},"secret_token",{
            expiresIn:"8h",
        })
        return res.status(200).json(token);
    }catch(err){
        console.error(err)
    }
}