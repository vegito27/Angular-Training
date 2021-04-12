const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')

 const PORT=3001

 const app=express()

 app.use(bodyParser.json())

 app.use(cors())


 app.get('/',function(req,res){

    console.log('Hello')

    res.send("hello from server")

 })

app.post('/enroll',(req,res)=>{
    console.log(req.body)
    
    res.status(200).send({"message":"Data received"})

})
 app.listen(PORT,()=>console.log('Server running on localhost : '+PORT))