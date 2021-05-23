

const mongoose =require('mongoose')

const schema=mongoose.Schema

const skillSchema=new schema({

    skill:{
		type:String,
        trim:true
	},
	percentage:{
		type:number,
		required:true
	},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

})

module.exports=Skill=mongoose.model('Skill',skillSchema)

