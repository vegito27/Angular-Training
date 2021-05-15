const express=require('express')
const mongoose=require("mongoose");

const app=express();

app.use(express.json())

const {MONGO_URI}=require('./config/uri')


app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
});
mongoose.connect(MONGO_URI,{ useUnifiedTopology: true , useNewUrlParser: true })
const connection=mongoose.connection;

const users=require('./routes/users')


connection.once("open",()=>{
    console.log("MongoDB database connection established successfully");
}).catch(err=>console.error(err))


app.use('/user',users)


app.listen(4000, () => {
    console.log("server start at 4000");
  });	 