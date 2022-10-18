const mongoose = require('mongoose');
const { Schema } = mongoose;



const productSchema = new mongoose.Schema({
    name: String,
    brand: String,
    ccategory: String,
    description: String
})

const Product = new mongoose.model("Product", productSchema)
module.exports = Product;