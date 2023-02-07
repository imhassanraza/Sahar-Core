var express=require("express")
var router=express.Router()
var User=require("../../src/userSchema/userSchema")
const ObjectId=require("mongodb").ObjectId

router.put("/:id",function(req,res,next){
const id=req.params.id
const {name,country,phoneNumber,image} =req.body
const userId=ObjectId(id)
console.log(userId)
User.findOneAndUpdate({_id:userId},{
   $set:{
    name:name,
    country:country,
    phoneNumber:phoneNumber,
    image:image
   }
}).then(result=>{
res.status(201).json({data:result})
}).catch(err=>{
    res.status(500).json({error:err})
})
})

module.exports=router