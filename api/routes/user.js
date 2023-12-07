const express=require('express');  // use to create apk and restful API
const router=express.Router();  // is used to create a new router object.
const mongoose = require('mongoose');
const User = require('../module/user'); 
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


router.get('/',(req,res,next)=>{  // user get function
    User.find()  
    .then(result=>{
     res.json({
       userData:result
     });
     console.log("Fetch Succesfully..")
    }) 
    .catch(err=>{
     console.log(err);
     res.json({
       error:err
     });
    })
})

router.post('/signUp',(req,res,next)=>{   /// Post method save data to the database
    bcrypt.hash(req.body.password,10,(err,hash)=>{   // encode the password method using hash method
        if(err)
        {
            res.json({
                error:err
            })
        }
        else{
            const user =  new User({    //assign the value to data base column to the req from front end
                _id:new mongoose.Types.ObjectId,
                userName:req.body.userName,
                email:req.body.email,
                password:hash,
                phoneNumber:req.body.phoneNumber,
                 userType:req.body.userType
            })
            user.save()
            .then(result=>{
                res.json({
                    Massage :'data saved succesfully..',
                    New_user:result
                })
            })
            .catch(err=>{  // if error is found then it will work and show error
                console.log(err);
                res.status(500).json({
                    error:err
                })
              })  
        }
    })

})

router.post('/login',(req,res,next)=>{   // login function..
    User.find({userName:req.body.userName})   // find username to the database
    .exec()
    .then(user=>{
        if(user.length>1)    // user does not exixt
        {
            return res.json({
                Massage:'User Does Not exist'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{  // comnapre both password in front-end and database password
            if(!result)
            {
                return res.json({
                    error:'Password does not match'
                })
            }
            if(result)
            {
               const token=jwt.sign({    // when username and password is correct get user detail to generate  token
                userName:user[0].userName,
                _id:user[0]._id,
                userType:user[0].userType,
                email:user[0].email,
                phoneNumber:user[0].phoneNumber
               },
               'this is dummy Text',
               {
                expiresIn:"24h"  // time period of token 
               }
               );
               res.json({   //when username and password is correct show user detail with token
                userName:user[0].userName,
                // userType:user[0].userType,
                 email:user[0].email,
                 _id:user[0]._id,
                phoneNumber:user[0].phoneNumber,
                token:token
               })
            }
        })
    }) 
    .catch(err=>{
        res.json({
            error:err
        })
    })
})


module.exports=router;