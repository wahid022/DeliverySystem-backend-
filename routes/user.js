const express = require('express');
const router = express.Router();

const User=require('../models/user');



router.post("/login",(req,res)=>{
    console.log(req.body);
    const {email,password}=req.body
    
    User.findOne({email:email}, (err,user)=>{
        if(user)
        {
            
            console.log("here is the user *********",user);
            if(password===user.password)
            {
                res.send({message: "Login Successfull",user:user})
            }
            else{
                res.send({message:"Password didn't match"})
            }
        }
        else
        {
            res.send({message:"User Not Registered"})
        }
    })
})


router.post("/register", (req, res)=> {
    console.log("********",req.body);
    const { name, email, password,designation} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            // creating the scema in mongodb for the user ....
            const user = new User({
                name,
                email,
                password,
                designation
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now."})
                }
            })
        }
    })
    
}) 

module.exports = router
