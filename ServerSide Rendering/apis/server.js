const express=require('express')
const mongoose=require("mongoose");
const passport=require("passport");

const app=express();

app.use(express.json())
var cors = require('cors');
app.use(cors());


const users=require('./routes/users')
const profile=require('./routes/profiles')

const {MONGO_URI}=require('./config/uri')


app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
});

require('./config/passport')(passport)
mongoose.connect(MONGO_URI,{ useUnifiedTopology: true , useNewUrlParser: true })
const connection=mongoose.connection;


connection.once("open",()=>{
    console.log("MongoDB database connection established successfully");
}).catch(err=>console.error(err))


app.use('/user',users)
app.use('',profile)

app.listen(4004, () => {
    console.log("server start at 4004");
  });	 