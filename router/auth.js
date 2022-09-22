const express= require('express');
const jwt = require('jsonwebtoken');
const User = require('../model/userschema');
const router= express.Router();
const bcrypt = require('bcrypt');

require('../db/conn');
const user = require('../model/userschema');

router.get('/',(req , res)=>{
    res.send("Hello World server router");
  });

//router.post('/signup',(req , res)=>{
  
  //const { name, email, phone, work, password, cpassword }= req.body;

 //if(!name|| !email|| !phone|| !work||!password ||!cpassword)
//return res.status(422).json({err:"Please fill the field properly"})

//User.findOne({email:email}).then((userExits)=>{
 // if(userExits){
   //return res.status(422).json({Error:"User already Exits"})
  //}

  //const user= new User({name, email, phone, work, password, cpassword });
  //user.save().then(()=>{
  // res.status(201).json({message:"Registered Successfully"});
  //}).catch(()=>{
    //res.status(500).json({Error:"Registeration failed"});
  //});

//}).catch(err => {console.log(err)});

//});

router.post('/register',async(req , res)=>{
  
  const { name, email, phone, work, password, cpassword }= req.body;

 if(!name|| !email|| !phone|| !work||!password ||!cpassword){
  return res.status(422).json({err:"Please fill the field properly"})
 }

try{
  const userExits = await User.findOne({email:email});
  
    if(userExits){
     return res.status(422).json({Error:"User already Exits"})
    }else if(password != cpassword){
      return res.status(422).json({Error:"Password doesnot match"})
    }else{
      const user= new User({name, email, phone, work, password, cpassword });

      const userRegis= await user.save()
      
      if(userRegis){
        res.status(201).json({message:"Registered Successfully"});
       }else{
         res.status(500).json({Error:"Registeration failed"});
       }
    }
    
   
}catch(err){
  console.log(err);
}
});

router.post('/signin', async(req, res)=>{
try{
       const {email, password}=req.body;
       const registeredUser= await User.findOne({email:email});

       if(!email || !password){
         res.status(400).json({message:"Please fill the data"})
       }

          if(registeredUser){
            const isMatch = await bcrypt.compare(password , registeredUser.password);
         
            const token = await registeredUser.generateAuthToken();
                  console.log(token);

                  res.cookie("jwtoken",token,{
                    expires:new Date(Date.now()+25892000000),
                    httpOnly:true
                  })

            if(registeredUser){
             res.json({message:"Login Successful"});
            }else{
              res.json({message:"Invalid Credential"});
            }
          }else{
            res.json({message:"Invalid Credential"});
          }

          
}catch(err){
  console.log(err);
}
});



// about

module.exports= router;
