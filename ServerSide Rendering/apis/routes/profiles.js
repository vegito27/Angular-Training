const express=require('express')
const mongoose= require('mongoose')
const app=express.Router()

app.use(express.json())

const Profile=require('../models/profile')


// get all profiles details
app.get('/profile',async (req,res)=>{

    try{
        const profile=await Profile.find()
        res.send({"profiles":profile})

    }catch(e){

        res.send({"error":e})
    }
})


// get single profile detail
// pass profile Id
app.get('/profile/:id',async (req,res)=>{

    try{
        const id=req.params.id
        const profile=await Profile.findOne({user:mongoose.Types.ObjectId(id)})
        res.send(profile)
    }catch(e){
        res.send({"error":"Error while sending Profile"})
    }

})



// create Profile
app.post('/profile',async (req,res)=>{

    try{
        const profile=new Profile({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            DOB:req.body.DOB,
            gender:req.body.gender,
            addressLine:req.body.addressLine,
            social:req.body.social,
            companyInfo:req.body.companyInfo,
            user:mongoose.Types.ObjectId(req.body.id)
        })

        const user= await User.findOne({_id:mongoose.Types.ObjectId(req.body.id)})

        user.firstName=req.body.firstName
        user.lastName=req.body.lastName

        await user.save()
        await profile.save()

        res.status(200).send(req.body)

    }catch(e){
        console.log(e)
    }
})

// Update Profile
app.patch('/profile/:id',async (req,res)=>{

    try{
        const profile=await Profile.findOne({user:mongoose.Types.ObjectId(req.params.id)})

        if(req.body.DOB) profile.DOB=req.body.DOB
        if(req.body.gender) profile.gender=req.body.gender

        let addressLine={}
        if(req.body.address) addressLine.address=req.body.address
        if(req.body.state) addressLine.state=req.body.state
        if(req.body.city) addressLine.city=req.body.city
        if(req.body.district) addressLine.district=req.body.district
        if(req.body.zip) addressLine.zip=req.body.zip

        let customerInfo={}
        if(req.body.company) customerInfo.company=req.body.company
        if(req.body.website) customerInfo.website=req.body.website

        let social={}
        if(req.body.github) customerInfo.github=req.body.github
        if(req.body.linkedin) customerInfo.linkedin=req.body.linkedin


        profile.customerInfo=customerInfo
        profile.addressLine=addressLine
        profile.social=social
        await profile.save()


        const user=await User.findOne({_id:mongoose.Types.ObjectId(req.params.id)})
        if(req.body.firstName) user.firstName=req.body.firstName
        if(req.body.lastName)  user.lastName=req.body.lastName

        await user.save()

        res.send({"profile":profile})

    }catch(e){
        console.log(e)
    }
})

// **********************TEST***********************

app.get(
    '/myprofile',
    (req, res, next) => {
      res.json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.query.secret_token
      })
})


module.exports=app

