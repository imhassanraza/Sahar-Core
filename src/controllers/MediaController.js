var connect=require("../database/database")


const PostImages= async(req,res,next)=>{
    try{
        const images=req.files
       
   const result= images.map((i)=>{
            console.log(i.filename)
            const query="INSERT INTO media(images) VALUES(:images)"
        const params=[i.filename]
       connect(query,params)
        
    })
res.status(200).json(result)
        
    }catch(error){
        console.log(error)
    }
}

const getImage= async (res,req,next)=>{
try{

const query="SELECT images from media"
const params=[]

await connect(query,params).then((result)=>{
    req.status(200).json(result)
})


}catch(error){
    console.log(error)
}
}
module.exports={PostImages,getImage}