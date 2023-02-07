var express=require("express")
var router=express.Router()
var controllers=require("../../src/controllers/StripePaymentController")


router.post("/stripe-payment",controllers.Payment)


module.exports=router