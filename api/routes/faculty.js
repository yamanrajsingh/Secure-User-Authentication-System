const express=require('express');
const router=express.Router();

router.get('/',(req,res,next)=>{
     res.json('This is faculty data using get request..')
})

router.post('/',(req,res,next)=>{
    res.json('This is faculty data using post request..')
})



module.exports=router;