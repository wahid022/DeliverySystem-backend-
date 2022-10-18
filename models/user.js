const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    designation: String
})
const User = new mongoose.model("User", userSchema)
module.exports = User;