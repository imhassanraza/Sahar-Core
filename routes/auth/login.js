var express = require('express');
var router = express.Router();
var jwt=require("jsonwebtoken")
var bycript=require("bcryptjs")
var connect =require("../../src/database/database")

router.post('/',  async function (req, res, next) {
  
  
try{
  const {email,password}=req.body;
if(!email || !password){
  return res.status(400).json({message:"Please fill data"})
}
console.log(email)
const query="SELECT * FROM admin WHERE email=:email"
const params=[email]
 const result= await connect(query,params)
 console.log( "my password.......",result.data)
const Email=result.data.map((email)=>email.EMAIL).toString()
const Password=result.data.map((password)=>password.PASSWORD).toString()
console.log("my Email....",Email)
const response={
  status:200,
  message:"LOGIN_SUCCESS",
  data:result
}
if(result.data.length===0){
  console.log("not found")
  return res.status(400).json({message:"USER_NOT_FOUND"})
}else if(Email===email && password===Password){
  res.json(response)
}else{
  return res.status(400).json({message:"USER_NOT_FOUND"})
}

// if(userLogin){
//   const pass= await bycript.compare(password,userLogin.password)
  
//   if(!pass){
//     res.status(404).json({message:"user not found"})
//   }else{
//     const token= await userLogin.generateToken()
 
   
//   const refreshToken=await userLogin.generateRefreshToken()
//   console.log("User Login")
//   userLogin.token=token
//   userLogin.refreshToken=refreshToken
    
//   res.cookie("token",token,{
//     domain:"http://localhost:3000/"
    
    
//   })

  
 
  
//     console.log(userLogin)
    
//     res.json(response)
    
    
//   }
// }else{
//   res.status(404).json({message:"User not found"})
// }


}catch(error){
  console.log(error)
}
});



module.exports = router;
