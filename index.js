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
    password: String
})

const User = new mongoose.model("User", userSchema)


app.post("/login",(req,res)=>{
    console.log(req.body);
    const {email,password}=req.body
    
    User.findOne({email:email},(err,user)=>{
        if(user)
        {
            if(password===user.password)
            {
                res.send({message:"Login Successful",user:user})
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
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    
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