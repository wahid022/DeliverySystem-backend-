const express = require('express');
const router = express.Router();

const Products=require('../models/products');




router.post("/products", (req, res)=> {

    console.log("********",req.body);
    const { name, product, price} = req.body
    
}) 


module.exports = router