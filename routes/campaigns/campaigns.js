var express=require("express")
var router=express.Router()
const ObjectId=require("mongodb").ObjectId
var Campaign=require("../../src/campaignSchema/campaignSchema")
var connect =require("../../src/database/database")
var multer=require("multer")
const path = require("path")
var controllers=require("../../src/controllers/AppealsController")


const storage=multer.diskStorage({
    destination:"./src/image",
    filename:(req,file,cb)=>{
       return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload=multer({
    storage:storage
})

router.post("/createappeals",upload.single("image"),controllers.creatAppeals)
router.get('/appeals',controllers.getAppelas)
router.get("/appeals/:id", controllers.getApplealsID)
router.put("/appeals/:id",upload.single("image"),controllers.updateAppeals )
router.delete("/delete/:id",controllers.deleteAppeals)
module.exports=router