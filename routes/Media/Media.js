var express=require("express")
var router=express.Router()
var multer=require("multer")
const path = require("path")
var controllers=require("../../src/controllers/MediaController")


const storage=multer.diskStorage({
    destination:"./src/media/image",
    filename:(req,file,cb)=>{
       return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload=multer({
    storage:storage,
    
})

router.post("/image-upload",upload.array("image",10),controllers.PostImages)
router.get("/image",controllers.getImage)

module.exports=router