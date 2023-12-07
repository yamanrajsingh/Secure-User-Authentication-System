const mongoose= require('mongoose'); // create db connection..

const userSchema = new  mongoose.Schema({  //  create schema of student with given field
    _id:mongoose.Schema.Types.ObjectId, // this is id create by moongoose
    userName:String,
    email:String,
    password:String,
    phoneNumber:Number,
    userType:String
})

module.exports= mongoose.model('user',userSchema); // crrate model of  student schema 