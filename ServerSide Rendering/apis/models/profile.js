const mongoose =require('mongoose')

const schema=mongoose.Schema

const profileSchema=new schema({

    profile:{
		type:String,
        trim:true
	},
    DOB:{
		type:String,
        trim:true
	},
    aboutMe:{
		type:String
	},
    gender:{
        type:String
     
    },
    addressList:{
        address:{
            type:String
        },
        country:{
            type:String
        },
        state:{
            type:String
        },
        city:{
            type:String
        },
        zip:{
            type:Number
        }
	},
    companyInfo:{
        companyName:{
            type:String
        },
        webSite:{
            type:String
        }
    },
    social:{
        github:{
            type:String
        },
        linkedin:{
            type:String
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'User'
    }

})

module.exports=Profile=mongoose.model('Profile',profileSchema)

