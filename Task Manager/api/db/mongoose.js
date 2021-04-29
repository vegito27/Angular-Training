const mongoose=require('mongoose')

mongoose.Promise=global.Promise

mongoose.connect('mongodb://localhost:27017/TaskManager',{useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false  }).then(()=>{
    console.log('Mongodb connected successfully') 
}).catch(err=>console.log(err))

module.export={
    mongoose
}
