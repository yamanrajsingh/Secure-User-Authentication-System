const http=require('http'); // include http module
const app=require('./app'); // include app .js file in main server 
const cors=require('cors');
app.use(cors());
const server =http.createServer(app); /// https is use to create server and run the file(app) which is in function 
app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });
