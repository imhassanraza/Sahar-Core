
var express = require('express');
var router = express.Router();
var User=require("../../src/userSchema/userSchema")




router.post('/', function(req, res, next) {
    const {name,email,password,country}=req.body;
    if(!name||!email||!password){
        return res.status(422).json({error:"Please fill all fields"})
    }
User.findOne({email:email}).then((userExist)=>{
    if(userExist){
        return res.status(402).json({error: "Email already exist"})
    }
    const user=new User({name,email,password,country})
    user.save().then(()=>{
        res.status(201).json({message:"User Registered successfully"})
    }).catch((err)=>res.status(500).json({error:"Registered Failed"}))
}).catch(err=>{console.log(err)})

  
});

module.exports = router;
