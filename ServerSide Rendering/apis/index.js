const express=require('express')
const app=express();

app.use(express.json())

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });

const MongoClient = require('mongodb').MongoClient;
const ObjectId=require('mongodb').ObjectId

const uri = "mongodb+srv://socialApp:rishabh@123@cluster0.sadge.gcp.mongodb.net/admin-panel?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/user',(req,response)=>{
    client.connect((err,db)=>{
        if (err) throw err;
        const collection = client.db("admin-panel").collection("user");
        collection.find({}).toArray((err,res)=>{
            if(err) throw err 
            response.send(res)
            //  db.close()
        })
    })
})


app.post('/user',(req,response)=>{
    client.connect((err,db) => {
        const collection = client.db("admin-panel").collection("user");
        let object={
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            userName:req.body.userName,
            email:req.body.email,
            phone:req.body.phone,
            isAdmin:req.body.isAdmin,
            password:req.body.password,
            confirmPassword:req.body.confirmPassword
        }
        collection.insertOne(object,(err,res)=>{
            // this returns promise
            if (err) throw err;
            console.log("1 document inserted");
            response.send({"message":req.body})
            // db.close();      
        })  
    })
})

app.delete('/user/:id',(req,response)=>{

    console.log("Delete Api called")

    let id=req.params.id

    console.log(id)

    client.connect((err,db)=>{
        if (err) throw err;
        const collection = client.db("admin-panel").collection("user");
        
        collection.deleteOne({"_id":ObjectId(id)},function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");

            response.send({"message":"deleted Successfully"})

             // db.close()

          
        })
       

    })
})

// {"_id":{"$oid":"609bf36274f662d302d20cea"},"firstName":"Rishabh","lastName":"Tripathi","userName":"1234","email":"trishabh885@gmail.com","phone":"+447838195205","isAdmin":"","password":"","confirmPassword":""}




app.listen('2000',()=>{
    console.log('2000 port started')
})