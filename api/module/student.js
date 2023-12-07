const mongoose= require('mongoose'); // create db connection..

const studentSchema = new  mongoose.Schema({  //  create schema of student with given field
    _id:mongoose.Schema.Types.ObjectId, // this is id create by moongoose
    name:String,
    email:String,
    password:String
})

module.exports= mongoose.model('Student',studentSchema); // crrate model of  student schema 