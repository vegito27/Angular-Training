const express=require('express')
const mongoose= require('mongoose')
const app=express.Router()

app.use(express.json())

const Post=require('../models/post')


// Use for admin
// Get all posts 
app.get('/posts',async (req,res)=>{

	try{
		const allPosts=await Post.find()
		res.send({'posts':post})

	}catch(e){
		res.send(e)
	}
})
 


// Get users post 
// use for normal user
// pass the userid in params
app.get('/post',async(req,res)=>{
	try{
		const id=req.params.id
		const userPosts=await Post.find({user:mongoose.types.ObjectId(id)})
		res.send({"posts":userPosts})

	}catch(e){
		res.send({"error":e})
	}
})


app.post('/post',async (req,res)=>{

	try{

		const post=new Post({
			title:req.body.title,
			post:req.body.post,
			category:req.body.category,
			user:mongoose.types.ObjectId(localStorage.getItem(id))
		})

		await post.save()

		res.send({"message":"Post has been save"})

	}catch(e){
		res.send({"error":e})
	}
})


// pass the post id to update the post
app.patch('/post/:id',async (req,res)=>{

	try{
		const id=req.params.id
		const post=Post.findOne({_id:mongoose.types.ObjectId(id)})

		post.title=req.body.title

		if(req.body.post!==null || req.body.post!==''){
			post.post=req.body.post
		}

		if(req.body.title!==null || req.body.title!==''){
			post.title=req.body.title
		}

		if(req.body.category!==null || req.body.category!==''){
			post.category=req.body.category
		}

		await post.save()


		res.send({"Post Saved":post})


	}catch(e){
		res.send({"error":e})
	}

})


// delete the post 
// pass the post Id
app.delete('/posts/:id',async (req,res)=>{





})

module.exports=app