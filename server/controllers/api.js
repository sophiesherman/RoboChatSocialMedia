const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const Post = require("../models/posts")

const SECRET = process.env.SECRET

// Load data from JSON file into memory
const rawData = fs.readFileSync('server/sample.json')
const data = JSON.parse(rawData)

let posts = data.posts
let users = data.users

const getUser = (username) => {
  return data.users.filter(u => u.id === username)[0]
}

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

  Post.find({}).then(result => {
      console.log(result)
      response.json(result)
  })
})

apiRouter.get('/api/users', (request, response) => {
    console.log("GOT")
    response.json(users)
  })

apiRouter.get('/api/posts/:id', (request, response) => {
	const id = Number(request.params.id)
	const post = posts.find(post => post.id === id)
	if (post) response.json(post)
	else response.status(404).end()
})

apiRouter.get('/api/users/:id', (request, response) => {
	const id = request.params.id
	const user = users.find(user => user.id === id)
	if (user) response.json(user)
	else response.status(404).end()
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
})

apiRouter.post('/api/users', (request, response) => {
    console.log("POST")
    const user = request.body
    users = users.concat(user)
    response.json(user)
  })

apiRouter.put('/api/posts/:id', (request, response) => {
    const id = Number(request.params.id) 
    let post = posts.find(post => post.id === id)
    post = post.likes.concat("User")
    if (post) response.json(post)
    else response.status(404).end()
})

apiRouter.put('/api/users/:id', (request, response) => {
    const id = request.params.id
    let user = users.find(user => user.id === id)
    user = user.follows.concat(id)
    if (user) response.json(user)
    else response.status(404).end()
})

apiRouter.delete('/api/posts/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log('the passed ID is: ', id)
    posts = posts.filter(post => post.id !== id)
    response.status(404).end()
})

// handle post request for login with {username, password}
apiRouter.post('/api/login', async (request, response) => {
    const {username, password} = request.body

    const user = getUser(username)
    
    if (!user) {
      return response.status(401).json({error: "Invalid username or password"})
    }

    if (await bcrypt.compare(password, user.password)) {
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