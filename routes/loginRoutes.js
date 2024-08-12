//loginRoutes.js

const LoginController=require('../controllers/loginController')
const express = require('express')
const router = express.Router();

router.post("/",LoginController.login)


module.exports=router