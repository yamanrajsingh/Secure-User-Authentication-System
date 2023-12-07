const express = require("express"); //It is used to build a single page, multipage, and hybrid web application.
// It's a layer built on the top of the Node js that helps manage servers and routes
const cors = require("cors");

const Product = require("./api/module/products");

const studentRoute = require("./api/routes/student"); // include path of other file in app.js
const facultyRoute = require("./api/routes/faculty");
const userRoute = require("./api/routes/user");

const mongoose = require("mongoose");
// creates a connection between MongoDB and the Node.js

const bodyParser = require("body-parser"); // recieve data from client

// It is responsible for parsing the incoming request bodies in a middleware before you handle it.

mongoose.connect(
  "mongodb+srv://yamanrajsingh:yaman123@cluster0.zvjtn4d.mongodb.net/?retryWrites=true&w=majority"
);
// connect mongodb with url
// mongoose.connect('mongodb://localhost:27017');

mongoose.connection.on("error", (error) => {
  console.log("connected with database is Failed..."); // error massage when mongodb is not connected
});

mongoose.connection.on("connected", (connected) => {
  console.log(" connected with database is Succesfully..."); // when mongo db is connected succesfully
});

const app = express(); // creates a new express application for you.

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/student", studentRoute); // It is mostly used to set up middleware for your application.
//  first prameter path:->It is the path for which the middleware function is being called
// second parameter is callback :-> it is middleware function
app.use("/faculty", facultyRoute);
app.use("/user", userRoute);

app.post("/add", async (req, res, next) => {
  /// Post method save data to the database
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  let product = new Product(req.body);
  let result = await product.save();
  product
    .save()
    .then((result) => {
      res.json({
        Massage: "data saved succesfully..",
        New_product: result,
      });
    })
    .catch((err) => {
      // if error is found then it will work and show error
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

app.get("/product", async (req, res, next) => {
  // retrive all the data from data base

  let products = await Product.find();
  if(products.length>0)
  {
    res.json(products);
  }
    else{
      res.send({
        result:"No products found"
      })
    }
});

app.delete("/product/:id",(req,res)=>{
  Product.deleteOne({_id:req.params.id})
    // Product.findByIdAndRemove()
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



app.get("/product/:id", async (req, res) => {
  try {
  
    const result = await   Product.findById(req.params.id);

    if (result) {
      res.send(result);
    } else {
      res.status(404).send({ result: "Oops, not found..." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});
//when page is not find then it will work
app.use((req, res, next) => {
  res.status(404).json("Page is not found"); // there is two router which is given above when we request other
  /// than request it will call this app.use method
});
module.exports = app; // exports this module app to server.js
