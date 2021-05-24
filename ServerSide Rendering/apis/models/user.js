const mongoose =require('mongoose')
const bcrypt = require('bcrypt');

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
	}

    ,confirmPassword:{
        type:String,
		required:true
    },
    date:{
		type:Date,
		default:Date.now()
	}
})


//runs before creating model and provide encryption to password
// UserSchema.pre(
// 	'save',
// 	async function(next) {
// 	  const user = this;
// 	  const hash = await bcrypt.hash(this.password, 10);
// 	  this.password = hash;
// 	  next();
// 	}
//   );

//   UserSchema.methods.isValidPassword = async function(password) {
// 	const user = this;
// 	const compare = await bcrypt.compare(password, user.password);
  
// 	return compare;
//   }

module.exports=User=mongoose.model('User',UserSchema)