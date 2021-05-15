const mongoose=require('mongoose')

const schema=mongoose.Schema

const postSchema=new schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    post:{ 
        type: String,
        required: true,
        trim: true
    },
    date:{
		type:String,
		default:Date.now()
	},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

const Post=mongoose.model('Post',postSchema)

module.exports=Post