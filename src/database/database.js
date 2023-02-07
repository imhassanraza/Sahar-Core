const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OBJECT;

const mypw = "sflterp_"  // set mypw to the hr schema password


let connection=undefined
async function connect(query,params) {
if(connection==undefined){
  connection = await oracledb.getConnection( {
    user          : "sflterp_",
    password      : mypw,
    connectString : "admissions.mywire.org:1521/orcl"
  });
}
  

  try {
   

  let result= await connection.execute(query,params,{autoCommit:true})
 
return  {data: result.rows}
  } catch (error) {
    console.log(error)
    return{
      error
    }
  } finally {
    if (connection) {
      try {
        console.log("Connected")
        
        
      } catch (err) {
        console.error(err);
      }
    }
  }
}

module.exports=connect


//  oracledb.getConnection(
//   {
//     user          : "sflterp",
//     password      : "sahara",
//     connectString : "admissions.mywire.org:1521/orcl"
//   },
//   (error, conn) => {
//     if (error)
//     {
//       console.log(error);
//     }
//     else
//     {
//      console.log(conn)
     
//     }
//   });

  

