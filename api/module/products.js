const mongoose= require('mongoose'); // create db connection..

const productSchema = new  mongoose.Schema({  //  create schema of student with given field
   // this is id create by moongoose
    name:String,
    price:String,
    category:String,
    company:String,
    userId:String
})

module.exports= mongoose.model('products',productSchema); // crrate model of  student schema 