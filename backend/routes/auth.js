const express = require("express");
const { body, validationResult } = require('express-validator');
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const router = express.Router();
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


const JWT_SECRET="bashirisdevelop$er";

//ROUTE 1: creat user using POST: api/auth/createuser, does not require auth
router.post('/createuser', [
    body('name', 'Enter a valid name, it must be 3 latter').isLength({min:3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password, it must be 5 digit').isLength({min:5}),

], async (req, res)=>{
    //if there are error, return bad request
   const errors =validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors : errors.array()});
   }
   //check whether user with this email exist already
   let user = await User.findOne({email:req.body.email});
   if(user){
    return res.status(400).json({error:"sorry, a user with this email already exists" })
   }
// below line add salt in the password
   const salt = await bcrypt.genSalt(10);
   const secPas = await bcrypt.hash(req.body.password, salt);
   //create new user
    user = await User.create({
    name : req.body.name,
    email : req.body.email,
    password: secPas,
    
   })
   const data ={
        user:{
            id:user.id,
        }
   }

   const authToken =jwt.sign(data,JWT_SECRET);
   res.json({authToken});
});

//ROUTE:2 authenticate using POST api/auth/login: no login require
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password can not be blank').exists(),
],
async (req, res)=>{
    //if there are error, return bad request
   const errors =validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors : errors.array()});
}
const{email, password} = req.body;
try {
    let user = await User.findOne({email});
    if(!user){
        success
        return res.status(400).json({errors:"login with correct credential"});
    }
    const passwordcompare = await bcrypt.compare(password, user.password);
    if(!passwordcompare){
        return res.status(400).json({errors:"login with correct credential"});
    }
    const data ={
        user:{
            id:user.id,
        }
   }
   const authToken =jwt.sign(data,JWT_SECRET);
   res.json({authToken});

} catch (error) {
    console.error(errors.message);
    res.status(500).send("Internal server error");
}
})

//ROUTE 3: get details of loggedin user using POST: api/auth/getuser
router.post('/getuser', fetchuser, async (req, res)=>{
  
    try {
         userId =req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
    }

})

module.exports = router

