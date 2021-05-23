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

    let currentUserId=localStorage.getItem(req.params.id)

    try{
        const profile=new Profile({
            DOB:req.body.DOB,
            gender:req.body.gender,
            aboutMe:req.body.aboutMe,
            addressList:{
                address:req.body.address,
                country:req.body.country,
                state:req.body.country,
                city:req.body.city,
                zip:req.body.zip
            },
            social:{
                github:req.body.github,
                linkedin:req.body.linkedin
            },
            companyInfo:{
                companyName:req.body.companyName,
                webSite:req.body.webSite
            },
            user:mongoose.Types.ObjectId(currentUserId)
        })

        let data={$set:{firstName:req.body.firstName,lastName: req.body.lastName} }
            

        const user= await User.updateOne({_id:mongoose.Types.ObjectId("60a163a6d182668ca66400c6")},data)

       console.log(user)
        await profile.save()

        res.status(200).send(req.body)

    }catch(e){
        console.log(e)
    }
})

// Update Profile
app.patch('/profile/:id',async (req,res)=>{

    try{
        const profile=new Profile({
            DOB:req.body.DOB,
            gender:req.body.gender,
            aboutMe:req.body.aboutMe,
            addressList:{
                address:req.body.address,
                country:req.body.country,
                state:req.body.country,
                city:req.body.city,
                zip:req.body.zip
            },
            social:{
                github:req.body.github,
                linkedin:req.body.linkedin
            },
            companyInfo:{
                companyName:req.body.companyName,
                webSite:req.body.webSite
            },
            user:mongoose.Types.ObjectId(req.params.id)
        })
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

