const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(" ")[1];

        const decoded = jwt.verify(token, "secret_token");
       
    req.user = decoded;
  
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = auth;


/*const jwt = require('jsonwebtoken');

const auth=(req,res,next)=>{
    const token = req.header("Authorization").split(" ")[1]

    if(!token){
        return res.status(401).json({error:"No Token, authorization denied"});

    }
    try{
        const decoded=jwt.verify(token,"secret_token");
        req,user=decoded;
        next();
    }catch(err){
        res.status(401).json({ error: "Token is not valid"})
    }
}

module.exports=auth */