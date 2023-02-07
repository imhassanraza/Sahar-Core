var stripe=require("stripe")(process.env.SECRET_KEY)
var Connect=require("../../src/database/database")






const Payment = async (req,res,next)=>{
    try{
        const customer = await stripe.customers.create();
        const ephemeralKey = await stripe.ephemeralKeys.create(
            {customer: customer.id},
            {apiVersion: '2022-08-01'}
            
          );
          
const {name,paymentMethodId,amount,currency,email,phone,title,countryCode}=req.body
if(!name||!amount||!email||!phone) return res.status(400).json({message:"FILL_DATA"})
const idQuery="SELECT donor_id FROM donors WHERE email=:email"
const idparams=[email]
 const resultID= await Connect(idQuery,idparams)
 const donorId=resultID.data.map((id)=>id.DONOR_ID).toString()
 


const date_obj=new Date()
       const day=("0"+date_obj.getDate()).slice(-2);
       const month=date_obj.toLocaleString('en-US',{month:"short"})
      const year=date_obj.getFullYear();
       const date=day+"-"+month+"-"+year
const paymentIntent= await stripe.paymentIntents.create({
    amount:Math.round(amount*100),
    currency:currency,
    metadata:{name:name,email:email,countryCode:countryCode,phone:phone,date:date,amount:amount,currency:currency},
    payment_method:paymentMethodId,
    confirm:true,
    receipt_email:email
       
    
});
 
 const UserData={
    name:name,
    phone:phone,
    email:email,
    currency:currency,
    date:date,
    amount:amount,
    donor_id:donorId,
    countryCode:countryCode
}
console.log("payment intent..........",paymentIntent)
const clientSecret=paymentIntent.client_secret;
console.log("customer id.........",paymentIntent.metadata)


const dname=paymentIntent.metadata.name
const demail=paymentIntent.metadata.email
const dphone=paymentIntent.metadata.phone
const damount=paymentIntent.amount
const dcurrency=paymentIntent.currency
if(paymentIntent.status==="succeeded"){
    const query3="SELECT email FROM donors"
   const params3=[]
   const result= await Connect(query3,params3)
   const Email=result.data.map((resu)=>resu.EMAIL).toString()
   const filter=Email.includes(email)


   if(filter===true){
    
    const query2="INSERT INTO donors_donation(id,donor_id,amount,currency,donation_on) VALUES(:id,:donor_id,:amount,:currency,:donation_on)"
    const params2=[donorId,donorId,damount,dcurrency,date]
    await Connect(query2,params2)
}else{
    const query="INSERT INTO donors(id,donor_id,name,email,phone,country_code) VALUES(donorid.nextval,donorid.currval,:name,:email,:phone,:country_code)"

    const  params=[dname,demail,dphone,countryCode]
    
      await Connect(query,params)
      const query2="INSERT INTO donors_donation(id,donor_id,amount,currency,donation_on) VALUES(donorid.currval,donorid.currval,:amount,:currency,:donation_on)"
      const params2=[damount,dcurrency,date]
      await Connect(query2,params2)
     
}
const paymentQuery="SELECT raised,goal from appeals WHERE title=:title"
const params=[title]
const raisedAmount=await Connect(paymentQuery,params)
const PrevAmount=raisedAmount.data.map((am)=>am.RAISED).toString()
const goalAmount=raisedAmount.data.map((goal)=>goal.GOAL)
const totalAmount=parseFloat(PrevAmount)+ parseFloat(amount) 
const divide=amount/goalAmount
const percentage=divide*100
const paymentQuery2=" UPDATE appeals SET raised = :raised ,goal_average=:goal_average WHERE title=:title"
const paymentValue=[totalAmount,percentage,title]
await Connect(paymentQuery2,paymentValue)
const idQuery2="SELECT donor_id FROM donors WHERE email=:email"
const idparams2=[email]
 const resultID2= await Connect(idQuery2,idparams2)
 const donorId2=resultID2.data.map((id)=>id.DONOR_ID).toString()
 
 
 res.status(200).json({client_secret:clientSecret,ephemeralKey: ephemeralKey.secret,customer: customer.id,UserData:UserData,donor_id:donorId2})



 
}


 

    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}


module.exports={Payment}
"SELECT* from Donors,Donors_Donation WHERE Donors.Donor_id=Donors_Donation.Donor_id"