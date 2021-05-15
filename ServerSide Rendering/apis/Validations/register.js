const Validator=require('validator')


const isEmpty=(value)=>
		value===undefined || 
		value=== null || 
		(typeof value==='object' && Object.keys(value).length===0) || 
		(typeof value==='string' && value.trim().length===0)

function isValid(p) {
    var phoneRe = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    var digits = p.replace(/\D/g, "");
    return phoneRe.test(digits);
}





module.exports=function validateRegisterInput(data){

    console.log()


	let error={}

	data.firstName=!isEmpty(data.firstName)?data.firstName:'';

    data.userName=!isEmpty(data.userName)?data.userName:'';

	data.email=!isEmpty(data.email)?data.email:'';
    data.phone=!isEmpty(data.phone)?data.phone:'';

	data.password=!isEmpty(data.password)?data.password:'';
	data.confirmPassword=!isEmpty(data.confirmPassword)?data.confirmPassword:'';


	if(!Validator.isLength(data.firstName,{min:4,max:20})){
		error.firstName='Name must be between 4 and 30 characters'
	}

	if(Validator.isEmpty(data.firstName)){
		error.firstName="Name field must not be Empty"
	}

    if(Validator.isEmpty(data.userName)){
		error.userName="UserName field must not be Empty"
	}

    if(data.userName.length<6 && data.userName.length>20){
		error.userName='userName must be between 6 and 20 characters'
	}

	

    // if(Validator.isEmpty(data.phone)){
	// 	error.phone="Phone field must not be Empty"
	// }

    if(!isValid(data.phone)){
		error.phone="Please enter valid 10 digit phone number starts with +91"
	}


	if(Validator.isEmpty(data.email)){
		error.email="Email field must not be Empty"
	}

	if(!Validator.isEmail(data.email)){
		error.email="Email is invalid"
	}

    if(Validator.isEmpty(data.password)){
		error.password="Password field must not be Empty"
	}


	if(!Validator.isLength(data.password,{min:6,max:30})){
		error.password="Password length must be atleast 6 characters"
	}

    
	if(Validator.isEmpty(data.confirmPassword)){
		error.confirmPassword="Confirm Password field must not be Empty"
	}

	if(!Validator.equals(data.password,data.confirmPassword)){
		error.confirmPassword="Password must match"
	}

	return { 
		error,
		isValid:isEmpty(error)
	}

}