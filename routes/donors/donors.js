var express=require("express")
var router=express.Router()
var multer=require("multer")
var path=require("path")
var controllers=require("../../src/controllers/DonorsController")

const storage=multer.diskStorage({
    destination:"./src/media/avatar",
    filename:(req,file,cb)=>{
       return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload=multer({
    storage:storage
})




router.post("/donors",controllers.getDonor)
router.put("/donors-update",upload.single("image"),controllers.updateDonors)

module.exports=router