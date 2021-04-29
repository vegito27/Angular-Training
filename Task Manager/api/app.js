const express=require('express')
const app=express()

const mongoose=require('./db/mongoose')

const bodyParser=require('body-parser')

app.use(bodyParser.json())

const {list,task}=require('./db/model')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/lists',(req,res)=>{
    list.find({}).then(lists=>{
        res.send(lists)
    })
})

app.post('/lists',(req,res)=>{
   let title=req.body.title
   let newlist=new list({title})

   newlist.save().then((listDoc)=>{
       res.send(listDoc)
   })
})

app.patch('/lists/:id',(req,res)=>{
    list.findOneAndUpdate({_id:req.params.id},{$set:req.body}).then(()=>{
        res.sendStatus(200)
    })
})

app.delete('/lists/:id',(req,res)=>{

    list.findOneAndRemove({
        _id:req.params.id
    }).then(removedListDoc=>{
        res.send({removedListDoc})
    })
})

app.get('/lists/:listId/tasks',(req,res)=>{
    // return all tasks that belong to specific task
    task.find({
        _listid:req.params.listId
    }).then((tasks)=>{
        res.send(tasks)
    })
})

app.post('/lists/:listId/tasks',(req,res)=>{
    let title=req.body.title
    let newtask=new task({title,_listid:req.params.listId})
 
    newtask.save().then((newtaskDoc)=>{
        res.send(newtaskDoc)

    })
})

app.patch('/lists/:listId/tasks/:taskId',(req,res)=>{
    task.findOneAndUpdate({
        _id:req.params.taskId,
        _listid:req.params.listId
    },{
        $set:req.body
    }).then(()=>{
        res.sendStatus(200)
    })
})


app.delete('/lists/:listId/tasks/:taskId',(req,res)=>{
    task.findOneAndRemove({
        _id:req.params.taskId,
        _listid:req.params.listId
     }).then((removeTaskDoc)=>{
         console.log(removeTaskDoc)
         res.send({"Message":"Successfully Removed"})
     })
})

// app.get('/lists/:listId/tasks/:taskId',(req,res)=>{
//     task.findOne({
//         _id:request.params.taskId,
//         _listId:req.params.listId
//     }).then((task)=>{
//         res.send(task)
//     })
// })

app.listen(3001,()=>{
    console.log("server is listening on port 3000")
})
