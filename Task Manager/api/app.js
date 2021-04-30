const express=require('express')
const app=express()

const mongoose=require('./db/mongoose')

const bodyParser=require('body-parser')

const jwt = require('jsonwebtoken');

app.use(bodyParser.json())

const {list,task,User}=require('./db/model')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );
    next();
});



// check whether the request has a valid JWT access token
let authenticate = (req, res, next) => {
    let token = req.header('x-access-token');

    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            res.status(401).send(err);
        } else {
            // jwt is valid
            req.user_id = decoded._id;
            next();
        }
    });
}

// Verify Refresh Token Middleware (which will be verifying the session)
let verifySession = (req, res, next) => {
    // grab the refresh token from the request header
    let refreshToken = req.header('x-refresh-token');

    // grab the _id from the request header
    let _id = req.header('_id');

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            // user couldn't be found
            return Promise.reject({
                'error': 'User not found. Make sure that the refresh token and user id are correct'
            });
        }

        // if the code reaches here - the user was found
        // therefore the refresh token exists in the database - but we still have to check if it has expired or not

        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                // check if the session has expired
                if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                    // refresh token has not expired
                    isSessionValid = true;
                }
            }
        });

        if (isSessionValid) {
            // the session is VALID - call next() to continue with processing this web request
            next();
        } else {
            // the session is not valid
            return Promise.reject({
                'error': 'Refresh token has expired or the session is invalid'
            })
        }

    }).catch((e) => {
        res.status(401).send(e);
    })
}

/* END MIDDLEWARE  */


app.get('/lists',authenticate,(req,res)=>{
    list.find({
        _userId:req.user_id
    }).then(lists=>{
        res.send(lists)
    }).catch(e=>{
        res.send(e)
    })
})

app.post('/lists',authenticate,(req,res)=>{
   let title=req.body.title
   console.log(req)
   let newlist=new list({title,_userId:req.user_id})

   newlist.save().then((listDoc)=>{
       res.send(listDoc)
   })
})

app.patch('/lists/:id',authenticate,(req,res)=>{
    list.findOneAndUpdate({_id:req.params.id,_userId:req.user_id},{$set:req.body}).then(()=>{
        res.sendStatus(200)
    })
})

app.delete('/lists/:id',authenticate,(req,res)=>{

    list.findOneAndRemove({
        _id:req.params.id,
        _userId:req.user_id
    }).then(removedListDoc=>{
        res.send({removedListDoc})

        deleteTasksFromList(removedListDoc._id)
    })
})

app.get('/lists/:listId/tasks',authenticate,(req,res)=>{
    // return all tasks that belong to specific task
    task.find({
        _listid:req.params.listId
    }).then((tasks)=>{
        res.send(tasks)
    })
})

app.post('/lists/:listId/tasks',authenticate,(req,res)=>{

    list.findOne({
        _id:req.params.listId,
        _userId:req.user_id
    }).then(list=>{
        if(list){
            return true
        }
        return false

    }).then(canCreateTask=>{

        if(canCreateTask){
            let title=req.body.title
            let newtask=new task({title,_listid:req.params.listId}) 
            newtask.save().then((newtaskDoc)=>{
            res.send(newtaskDoc)
            })
        }else{
            res.sendStatus(404)
        }         
    })
})

app.patch('/lists/:listId/tasks/:taskId',authenticate,(req,res)=>{

    list.findOne({
        _id:req.params.listId,
        _userId:req.user_id
    }).then(list=>{
        if(list){
            return true
        }
        return false
    }).then(canUpdateTask=>{

        if(canUpdateTask){
            task.findOneAndUpdate({
                _id:req.params.taskId,
                _listid:req.params.listId},
                {
                $set:req.body
            }).then(()=>{
                res.send({'message':'Updated Successfully!'})
            })
        }else{
            res.sendStatus(404)
        }  
    })
})


app.delete('/lists/:listId/tasks/:taskId',authenticate,(req,res)=>{

    list.findOne({
        _id:req.params.listId,
        _userId:req.user_id
    }).then(list=>{
        if(list){
            return true
        }
        return false
    }).then(canDeleteTask=>{

        if(canDeleteTask){
            task.findOneAndRemove({
                _id:req.params.taskId,
                _listid:req.params.listId
             }).then((removeTaskDoc)=>{
                 console.log(removeTaskDoc)
                 res.send({"Message":"Successfully Removed"})
             })
        }else{
            res.sendStatus(404)
        }
    })

})

// app.get('/lists/:listId/tasks/:taskId',(req,res)=>{
//     task.findOne({
//         _id:request.params.taskId,
//         _listId:req.params.listId
//     }).then((task)=>{
//         res.send(task)
//     })
// })



// User Routes

app.post('/users', (req, res) => {
    // User sign up

    let body = req.body;
    let newUser = new User(body);

    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        // Session created successfully - refreshToken returned.
        // now we geneate an access auth token for the user

        return newUser.generateAccessAuthToken().then((accessToken) => {
            // access auth token generated successfully, now we return an object containing the auth tokens
            return { accessToken, refreshToken }
        });
    }).then((authTokens) => {
        // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

//login

app.post('/users/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user

            return user.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
})

/**
 * GET /users/me/access-token
 * Purpose: generates and returns an access token
 */
 app.get('/users/me/access-token', verifySession, (req, res) => {
    // we know that the user/caller is authenticated and we have the user_id and user object available to us
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    });
})



/* HELPER METHODS */
let deleteTasksFromList = (_listId) => {
    Task.deleteMany({
        _listId
    }).then(() => {
        console.log("Tasks from " + _listId + " were deleted!");
    })
}


app.listen(3001,()=>{
    console.log("server is listening on port 3000")
})
