const express = require('express');
const router = express.Router();

const Customer=require('../models/customer');





router.post("/customer", (req, res)=> {
    console.log("********",req.body);
    const { name, email, password,state} = req.body
    Customer.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "Customer already registerd with this email"})
        } else {
            // creating the scema in mongodb for the user ....
            const customer = new Customer({
                name,
                email,
                password,
                state
            })
            customer.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Customer Successfully Registered, Please login now."})
                }
            })
        }
    })
    
}) 

module.exports = router