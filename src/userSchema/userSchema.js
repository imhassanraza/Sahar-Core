var mongoose=require("mongoose")
var bycript=require("bcryptjs")
var jwt=require("jsonwebtoken")
require("dotenv").config()
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   country:{
         type:String
   },
    phoneNumber:{
        type:String,
    },
    image:{
        type:String
    },
    token:{
        type:String,
    },
    refreshToken:{
        type:String,
        
    }
   
})

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password= await bycript.hash(this.password,12)
    }
    next()
})

userSchema.methods.generateToken= function(){
   return jwt.sign({_id:this._id,email:this.email,},process.env.SECRET_KEY) 
   
}
userSchema.methods.generateRefreshToken= function(){
    return jwt.sign({_id:this._id,email:this.email,},process.env.REFRESH_JWT_SECRET,{expiresIn:process.env.REFRESH_JWT_EXPIRATION}) 
    
 }

const User=mongoose.model("USER",userSchema)
module.exports =User;