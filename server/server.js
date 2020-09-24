const express = require('express')
const fs = require('fs')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Load data from JSON file into memory
const rawData = fs.readFileSync('server/sample.json')
const data = JSON.parse(rawData)

let posts = data.posts
let users = data.users

const getUser = (username) => {
  return data.users.filter(u => u.id === username)[0]
}

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Web Server</h1>')
})

app.get('/api/posts', (request, response) => {
  console.log("GOT")
  response.json(posts)
})

app.get('/api/users', (request, response) => {
    console.log("GOT")
    response.json(users)
  })

app.get('/api/posts/:id', (request, response) => {
	const id = Number(request.params.id)
	const post = posts.find(post => post.id === id)
	if (post) response.json(post)
	else response.status(404).end()
})

app.get('/api/users/:id', (request, response) => {
	const id = request.params.id
	const user = users.find(user => user.id === id)
	if (user) response.json(user)
	else response.status(404).end()
})

app.post('/api/posts', (request, response) => {
  console.log("POST")
  const post = request.body
  posts = posts.concat(post)
  response.json(post)
})

app.post('/api/users', (request, response) => {
    console.log("POST")
    const user = request.body
    users = users.concat(user)
    response.json(user)
  })

app.put('/api/posts/:id', (request, response) => {
    const id = Number(request.params.id) 
    let post = posts.find(post => post.id === id)
    post = post.likes.concat("Test")
    if (post) response.json(post)
    else response.status(404).end()
})

app.put('/api/users/:id', (request, response) => {
    const id = request.params.id
    let user = users.find(user => user.id === id)
    user = user.follows.concat(id)
    if (user) response.json(user)
    else response.status(404).end()
})

app.delete('/api/posts/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log('the passed ID is: ', id)
    posts = posts.filter(post => post.id !== id)
    response.status(404).end()
})

// handle post request for login with {username, password}
app.post('/api/login', async (request, response) => {
    const {username, password} = request.body

    const user = getUser(username)
    
    if (!user) {
      return response.status(401).json({error: "Invalid username or password"})
    }

    if (await bcrypt.compare(password, user.password)) {
      console.log("Password is good!")

      const userForToken = {
        id: user.id
      }

      const token = jwt.sign(userForToken, "secret")

      return response.status(200).json({token, id: user.id})

    } else {
      return response.status(401).json({error: "Invalid username or password"})
    }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})