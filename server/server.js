const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')

 const PORT=3001

 const app=express()

 app.use(bodyParser.json())

 app.use(cors())


 app.get('/',function(req,res){

 })

app.post('/enroll',(req,res)=>{
    
    res.status(200).send({"Message":"Success"})

})
 app.listen(PORT,()=>console.log('Server running on localhost : '+PORT))