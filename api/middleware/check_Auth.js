const jwt=require('jsonwebtoken');


module.exports=(req,res,next)=>{
   try{
   const token = req.headers.authorization.split(" ")[1];
   console.log(token);
   const verify= jwt.verify(token,'this is dummy Text'); 
   console.log(verify);
   next();
   }
   catch(err)
   {
    res.json({
        massage:"Invalid Token"
    })
   }
}