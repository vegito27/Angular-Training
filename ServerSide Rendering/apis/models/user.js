const mongoose =require('mongoose')

const schema=mongoose.Schema

const UserSchema=new schema({
    
	firstName:{
		type:String,
		required:true
	},
    lastName:{
		type:String
	},
    userName:{
		type:String,
		required:true,
        trim:true,
        unique:true
	},
    email:{
		type:String,
		required:true,
        unique:true,
        trim:true
	},
    phone:{
		type:String,
		required:true
	},
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    password:{
		type:String,
		required:true
	},
    confirmPassword:{
        type:String,
		required:true
    },
    date:{
		type:Date,
		default:Date.now()
	}
	

})

module.exports=User=mongoose.model('User',UserSchema)