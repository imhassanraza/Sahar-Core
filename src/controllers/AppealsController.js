
var connect =require("../database/database")




  const creatAppeals= async(req,res,nex)=>{
    try{
       
       const {ID,title,description,goal,cate,raised,created_by}=req.body
      const image=req.file.filename
      console.log("image appeals",image)
       
       const date_obj=new Date()
       const day=("0"+date_obj.getDate()).slice(-2);
       const month=date_obj.toLocaleString('en-US',{month:"short"})
      const year=date_obj.getFullYear();
       var date=day+"-"+month+"-"+year
    
        const query=`INSERT INTO appeals(ID,title,description,goal,category,raised,created_on,created_by,image) 
            VALUES(appeals_seq.nextval,:title,:description,:goal,:category,:raised,:created_on,:created_by,:image)`
    
            const params=[title,description,goal,cate,raised,date,created_by,image]
            await connect(query,params).then((responce,error)=>{
                if(error){
                    res.status(400).json({error:error})
                }else{
                    res.status(201).json(responce)
                }
            })
        
    }catch(err){
        console.log(err)
    }
}

const getAppelas= async (res,req,next)=>{
try{
    const query=`SELECT * FROM APPEALS`
    const params=[]
    const result= await connect(query,params)
    req.status(200).json(result)
}catch(err){
    console.log(err)
}
}

const getApplealsID= async (req,res,nex)=>{
    try{
        const id=req.params.id
        console.log(id)
        const query="SELECT * FROM appeals WHERE ID =:id"
       const params=[id]
        await connect(query,params).then((responce,error)=>{
            if(error){
                res.status(400).json({error:error})
            }
            res.status(200).json(responce)
        })
    }catch(err){
        console.log(err)
    }
}

const updateAppeals= async (res,req,next)=>{
    try{
        const id=res.params.id
        const {goal,raised,title,description,cate}=res.body
        console.log(cate)
         const image=res?.file?.filename
         if(!image){
            const date_obj=new Date()
            const day=("0"+date_obj.getDate()).slice(-2);
            const month=date_obj.toLocaleString('en-US',{month:"short"})
           const year=date_obj.getFullYear();
            var date=day+"-"+month+"-"+year
        
           const query="UPDATE appeals SET title=:title,description=:description,goal=:goal,category=:category,raised=:raised,updated_on=:updated_on WHERE ID=:id"
           const params=[title,description,goal,cate,raised,date,id]
            await connect(query,params).then((result)=>{
                req.status(201).json(result)
            })
         }else{
        const date_obj=new Date()
        const day=("0"+date_obj.getDate()).slice(-2);
        const month=date_obj.toLocaleString('en-US',{month:"short"})
       const year=date_obj.getFullYear();
        var date=day+"-"+month+"-"+year
    
       const query="UPDATE appeals SET title=:title,description=:description,goal=:goal,category=:category,raised=:raised,image=:image WHERE ID=:id"
       const params=[title,desc,goal,cate,raised,image,id]
        await connect(query,params).then((result)=>{
            req.status(201).json(result)
        })
    }
    }catch(err){
        console.log(err)
    }
}

const deleteAppeals = async (req,res,next)=>{
    try{
        const id=req.params.id
        console.log(id)
        const query = "DELETE FROM appeals WHERE ID=:id"
        const params=[id]
        const result= await connect(query,params)
        res.status(204).json({message:"APPEALS_DELETE"})
        

    }catch(error){
        console.log(error)
    }
}


module.exports={creatAppeals,getAppelas,getApplealsID,updateAppeals,deleteAppeals}
 

