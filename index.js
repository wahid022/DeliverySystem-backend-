const express=require('express');
const connectToMongo = require('./config/mongoose')
const app = express()
const port=8000;
const cors=require('cors');


connectToMongo();

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


// middleware for users,customer and products routes 

app.use('/users/admin', require('./routes/user'));
app.use('/customer', require('./routes/customer'));
app.use('/products', require('./routes/products'));


app.listen(port,function(err)
{
    if(err)
    {
        console.log(`Error : ${err}`);
    }
    console.log('Server is running on port',port);
});