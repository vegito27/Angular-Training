const Validator=require('validator')
const {isEmpty} =require('./validators')


module.exports=function validateLoginInput(data){

	let error={}

	data.email=!isEmpty(data.email)?data.email:'';
	data.password=!isEmpty(data.password)?data.password:'';

	console.log(data)


	if(Validator.isEmpty(data.email)){
		error.email="Email field must not be empty****"
	}

	if(!Validator.isEmpty(data.email)){

		if(!Validator.isEmail(data.email)){
			error.email="OOPs! Email is invalid!*** Please enter the valid Email!!"
		}
	}

	if(Validator.isEmpty(data.password)){
		error.password="Password field must not be Empty"
	}

	return { 
		error,
		valid:isEmpty(error)
	}

}