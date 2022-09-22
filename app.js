const express= require ('express');
const mongoose= require('mongoose');
const dotenv= require('dotenv');



const app=express();

dotenv.config({path:'./config.env'});

require('./db/conn');
//const User= require('./model/userschema');

app.use(express.json());

app.use(require('./router/auth'));

const middleware= (req,res,next)=>{
 console.log("Middleware is checking status"); 
 next();
}

//app.get('/',(req , res)=>{
 // res.send("Hello World");
//});
app.get('/about',middleware,(req , res)=>{
    console.log('About page');
    res.send("Hello World in about ");
  });
  app.get('/contact',(req , res)=>{
    res.send("Hello World in contact");
  });
  app.get('/login',(req , res)=>{ 
    res.send("Hello World in login ");
  });
  app.get('/signup',(req , res)=>{
    res.send("Hello World in registration. ");
  });

app.listen(5000, (req ,res)=>{
    console.log("Server is running on port 5000.");
});