const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const Post = require("../models/posts")
const User = require("../models/users")
const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false);

const SECRET = process.env.SECRET

// Load data from JSON file into memory
const rawData = fs.readFileSync('server/sample.json')
const data = JSON.parse(rawData)

let posts = data.posts
let users = data.users

// const getUser = (username) => {
//   return data.users.filter(u => u.id === username)[0]
// }

const getTokenFrom = request => {
  const authorization = request.get('authorization') 
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) { 
         return authorization.substring(7)  
      }  
  return null
} 

const apiRouter = express.Router()

apiRouter.get('/', (request, response) => {
  response.send('<h1>Web Server</h1>')
})

apiRouter.get('/api/posts', (request, response) => {
  console.log("GOT")

  Post.find({})
  .then(result => {
        response.json(result)
  })
  .catch(error => console.log(error))
})

apiRouter.get('/api/users', async (request, response) => {
    console.log("GOT")
    const users = await User.find({})
    response.json(users)
  })

apiRouter.get('/api/posts/:id', (request, response) => {
	const id = Number(request.params.id)
	const post = posts.find(post => post.id === id)
	if (post) response.json(post)
	else response.status(404).end()
})

apiRouter.get('/api/users/:id', (request, response) => {
    User.find({id: request.params.id})
    .then(user => {
        response.json(user)
    })
    .catch(error => console.log(error))
})

apiRouter.post('/api/posts', (request, response) => {
    console.log("POST")
    const token = getTokenFrom(request)
    console.log("Token ", token)
    const decodedToken = jwt.verify(token, SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const body = request.body

    let date = new Date();
    let currTimestamp = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace("T", " ");

    const newPost = new Post({
        user: body.user,
        timestamp: currTimestamp,
        content: body.content,
        likes: []
    })
    newPost.save()
    .then(result => {
        response.json(result)
    })
    .catch(error => console.log(error))
})

apiRouter.post('/api/users', async (request, response) => {
    console.log("POST USER")
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const avatar = "http://robohash.org/" + body.username
    const newUser = new User({
        id: body.username,
        passwordHash: passwordHash,
        avatar: avatar,
        follows: []
    })

    const savedUser = await newUser.save()
    
    response.json(savedUser)
  })

apiRouter.put('/api/posts/:id', (request, response) => {
    const body = request.body
    const newPost = {
        user: body.user,
        timestamp: body.timestamp,
        content: body.content,
        likes: body.likes
    }
    Post.findByIdAndUpdate(request.params.id, newPost, {new: true})
    .then(result => {
        response.json(result)
    })
    .catch(error => console.log("ERROR:", error))  
})

apiRouter.put('/api/users/:id', (request, response) => {
    // const body = request.body
    // console.log("PARAMS: ", request.params)
    // console.log("PUT: ", body)
    // console.log("FOLLOWS: ", body.follows)   
    // const newUser = {
    //     user: body.user,
    //     timestamp: body.timestamp,
    //     content: body.content,
    //     likes: body.likes
    // }
    // console.log("IDDDDDD: ", request.params.id)
    // Post.findByIdAndUpdate(request.params.id, newPost, {new: true})
    // .then(result => {
    //     response.json(result)
    //     console.log("updated", result)
    // })
    // .catch(error => console.log("ERROR:", error))  


    const id = request.params.id
    let user = users.find(user => user.id === id)
    user = user.follows.concat(id)
    if (user) response.json(user)
    else response.status(404).end()
})

apiRouter.delete('/api/posts/:id', (request, response, next) => {
    Post.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

apiRouter.delete('/api/users/:id', async (request, response, next) => {
  await User.findOneAndDelete({ id: request.params.id })
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

// handle post request for login with {username, password}
apiRouter.post('/api/login', async (request, response) => {
    const body = request.body

    const user = await User.findOne({ id: body.username })
    if (!user) {
      return response.status(401).json({error: "Invalid username or password"})
    }
    if (bcrypt.compare(await body.password, user.passwordHash)) {
      const userForToken = {
        id: user.id
      }
      const token = jwt.sign(userForToken, process.env.SECRET)
      return response.status(200).json({token, id: user.id})

    } else {
      return response.status(401).json({error: "Invalid username or password"})
    }
})

module.exports = apiRouter