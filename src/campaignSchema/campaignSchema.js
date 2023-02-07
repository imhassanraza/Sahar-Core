var mongoose=require("mongoose")

const campaignSchema= new mongoose.Schema({
image:{
    type:String
},
title:{
    type:String
},
desc:{
    type:String
},
raised:{
    type:String
},
goal:{
    type:String
}
})

const Campaign=mongoose.model("campaigns",campaignSchema)
module.exports=Campaign