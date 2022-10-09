const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');


const app = express()
const port=8000;
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected successfully....")
})

// const userSchema=new mongoose.Schema({
//     email:String,
//     password:String
// })

 
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    designation: String
})

const User = new mongoose.model("User", userSchema)





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

const productSchema = new mongoose.Schema({
    name: String,
    brand: String,
    ccategory: String,
    description: String
})

const Product = new mongoose.model("Product", productSchema)



app.post("/login",(req,res)=>{
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


app.post("/register", (req, res)=> {
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


app.post("/customer", (req, res)=> {
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




app.post("/products", (req, res)=> {

    console.log("********",req.body);
    const { name, product, price} = req.body
    
}) 




app.get("/",(req,res)=>{
    res.send("app is working")
});

app.listen(port,function(err)
{
    if(err)
    {
        console.log(`Error : ${err}`);
    }
    console.log('Server is running on port',port);
});