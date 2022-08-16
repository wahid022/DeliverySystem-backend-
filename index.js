const express=require('express');
const app=express();
const port=7000;
const db=require('./config/mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


app.use(session(
    {
        name:'delivery_system',
        // TODO change the secret before deployment in production code
        secret:'blahsomething',
        saveUninitialized:false,   //todo later
        resave:false,
        cookie:
        {
            maxAge:(1000*60*100)
        },
        store: new MongoStore(
            {
                mongooseConnection: db,
                autoRemove: 'disabled'
            
            },
            function(err){
                console.log(err ||  'connect-mongodb setup ok');
            }
        )
    })
);

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