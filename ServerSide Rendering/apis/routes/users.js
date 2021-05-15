const express=require('express')
const router=express.Router()

const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const passport=require('passport')

const User=require('../models/user')
const ObjectId=require('mongodb').ObjectId

const validateRegisterInput=require('../Validations/register')

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
        }
        else{
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

            await user.save()
            res.send({"message":"success"})
        }
        }
    }catch(e){
        res.send({error:e.message})
    }
})


router.get('/',async (req,res)=>{
    try{
        const users=await User.find({isAdmin:false})

        res.send(users)
    }catch(e){
        res.status(400).send(e)
    }
})


router.delete('/:id',async (req,res)=>{
    let id=req.params.id
    
    try{
        await User.deleteOne({_id:ObjectId(id)}) 

        res.status(200).send({"message":"Deleted Successfully"});

    }catch(e){
        res.status(404).send(e)
    }
})

router.get('/weekUsers',(req,res)=>{

    let today=new Date()

    today.setDate(today.getDate()-7) 
    
    // console.log(today1)

    console.log(today)

    User.find()
    .populate('user.date')
    .find({"date":{'$gte':today,'$lt':new Date()}})
    .then(res=>{
        console.log("this is user",res)
    }).catch(error=>console.log(error))


    res.send({"hi":"hi"})

})




module.exports=router