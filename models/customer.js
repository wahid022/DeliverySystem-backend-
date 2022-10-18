const mongoose = require('mongoose');
const { Schema } = mongoose;



const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    state: String,
    products:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products'
    }
})

const Customer = new mongoose.model("Customer", customerSchema)
module.exports = Customer;