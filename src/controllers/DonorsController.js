var Connect=require("../database/database")

const getDonor= async (res,req,next)=>{
    try{
        const {id}=res.body
        console.log("My Email.........",id)
        const query="SELECT image from donors WHERE donor_id=:id"
        const params=[id]
        const result= await Connect(query,params)
        req.status(200).json(result)
    }catch(error){
        console.log(error)
    }
   
}
const updateDonors= async (res,req,next)=>{
    try{
        const {name,email,phone,id}=res.body
        const image=res.file.filename
        console.log("name=",name,email,phone,image,id)
        const query="UPDATE donors SET name=:name,email=:email,phone=:phone,image=:image WHERE donor_id=:id"
        const params=[name,email,phone,image,id]
       const result= await Connect(query,params)
       req.status(201).json(result)


    }catch(error){
        console.log(error)
    }
}
module.exports={getDonor,updateDonors}

