const express=require('express');  // use to create apk and restful API
const router=express.Router();  // is used to create a new router object.
const mongoose = require('mongoose');
const Student = require('../module/student'); 
const checkAuth=require('../middleware/check_Auth');

router.get('/',checkAuth,(req,res,next)=>{  // retrive all the data from data base  
       Student.find()  
       .then(result=>{
        res.json({
          studentData:result
        });

       }) 
       .catch(err=>{
        console.log(err);
        res.json({
          error:err
        });
       })
})

router.post('/',(req,res,next)=>{    // post request is used to save data to the mongo db database
 
    const student = new Student({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })

   student.save()  // when data is save on mongodb  it will show data which is result..
   .then(result=>{
    console.log(result);
   res.status(200).json({
    newStudent:result
   })
   })

  .catch(err=>{  // if error is found then it will work and show error
    console.log(err);
    res.status(500).json({
        error:err
    })
  })    
})
// req: the request object
// res: the response object
// next: the next middleware function
// id: the value of the name parameter

router.get('/:id',checkAuth,(req,res,next)=>{   // accees data by specific id
   console.log(req.params.id);
   Student.findById(req.params.id)
   .then(result=>{
    res.json(result);
   })

 
  .catch(err=>{          // if error is found then it will work and show error
  console.log(err);
  res.status(500).json({
      error:err
  })
})
})

router.delete('/:id',checkAuth, (req,res,next)=>{  //// delete the particular data by id
  Student.findByIdAndRemove({_id:req.params.id})
  .then(result=>{
    res.json({
      message:'Delete Succesfully',
      result:result
      
    })
  })
  .catch(err=>{
    res.json({
      error:err
    })
  })
})

router.put('/:id',checkAuth,(req,res,next)=>{    /// upadte data by id(put())
  Student.findOneAndUpdate({_id:req.params.id},{
    $set:{
      name:req.body.name,
      email:req.body.email,
      password:req.body.password
    }
  })
  .then(result=>{
    res.json({
      upadate_data:result
    })
  })
  .catch(err=>{
    res.json({
      Error:err
    })
  })
})

module.exports=router; // export router in app.js