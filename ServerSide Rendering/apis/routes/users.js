const express=require('express')
const router=express.Router()
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const passport=require('passport')

const User=require('../models/user')
const ObjectId=require('mongodb').ObjectId
const secretOrKeys='secret'

const validateRegisterInput=require('../Validations/register')
const validateLoginInput=require('../Validations/login')

require('../auth/auth')


// create user route
router.post('/',async (req,res)=>{

    console.log(req.body.userName)
    const {error,isValid}=validateRegisterInput(req.body)
    if(!isValid){
        // console.log("invalid")
        return res.status(400).send(error)
    }

    try{
        // Checking the database
        const user= await User.findOne({email:req.body.email})
        const userName= await User.findOne({userName:req.body.userName})
        
    
    if(user){
        error.email="Email already exists"
        res.status(400).send(error)
    }else{
        //Create new User
        
        if(userName){
            error.userName="UserName already exists"
            res.status(400).json(error)
        }else{
            const user=new User({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                userName:req.body.userName,
                email:req.body.email,
                phone:req.body.phone,
                isAdmin:req.body.isAdmin,
                password:req.body.password,
                confirmPassword:req.body.confirmPassword
            })

            bcrypt.genSalt(10,(err,salt)=>{
				bcrypt.hash(user.password,salt,(err,hash)=>{
					if(err) throw err

                    user.password=hash
                    user.save()
                    res.send({"message":user})
				})
			})
        }
        
    }}
    catch(e){
        res.send({error:e.message})
    }
})


// get normal Users
router.get('/',async (req,res)=>{
    try{
        const users=await User.find({isAdmin:false})

        res.send(users)
    }catch(e){
        res.status(400).send(e)
    }
})


// delete normal user
router.delete('/:id',async (req,res)=>{
    let id=req.params.id
    
    try{
        await User.deleteOne({_id:ObjectId(id)}) 

        res.status(200).send({"message":"Deleted Successfully"});

    }catch(e){
        res.status(404).send(e)
    }
})



/*-----------------------------------------------------------------------------------------------*/

// Test Routes

router.get('/weekUsers',(req,res)=>{

    let today=new Date()

    today.setDate(today.getDate()-7) 

    User.find()
    .populate('user.date')
    .find({"date":{'$gte':today,'$lt':new Date()}})
    .then(res=>{
        console.log("this is user",res)
    }).catch(error=>console.log(error))


    res.send({"hi":"hi"})

})


// Login route for all type of users
router.post('/login',async(req,res)=>{

    const {error,valid}=validateLoginInput(req.body)
    console.log("pich",valid)

    if(!valid){
        return res.status(200).send({error:error})
    }

    try{
        const user=await User.findOne({email:req.body.email})
        if(!user){
            error.email="Email does not exists!"
            res.status(201).send({error:error})

        }else{
            const user=await User.findOne({email:req.body.email})
            if(!user){
                error.password="Password does not match***"
                res.status(201).send({error:error})
            }
            else{
                bcrypt
                    .compare(req.body.password,user.password)
                    .then(isMatch=>{
                        if(isMatch){
                            const payload={id:user.id,email:user.email,userName:user.userName}

                            jwt.sign(payload,secretOrKeys,{expiresIn:86400},(err,token)=>{
                                res.json({Success:true,token:'Bearer '+token,user:user})
                            })

                        }else{
                            error.password="Password did not match***"
                            res.status(201).send({error:error})
                        }
                    })
                }
            }
    }catch(e){
        console.error(e)
    }
})


// ************************Test***************************

router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
      res.json({
        message: 'Signup successful',
        user: req.user
      });
    }
  );


  router.post(
    '/login1',
    async (req, res, next) => {
      passport.authenticate(
        'login',
        async (err, user, info) => {
          try {
            if (err || !user) {
              const error = new Error('An error occurred.');
  
              return next(error);
            }
  
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);
  
                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, 'TOP_SECRET');
  
                return res.json({ token });
              }
            );
          } catch (error) {
            return next(error);
          }
        }
      )(req, res, next);
    }
  );
  
//   ****************************TEST************************************


module.exports=router