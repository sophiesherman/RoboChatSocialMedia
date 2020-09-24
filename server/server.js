const express = require('express')
const app = express()
const cors = require('cors')
const { request } = require('express')

let posts = require('./sample.json').posts
let users = require('./sample.json').users

const PORT = 3001

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
    console.log("request: ", request.params)
    const id = Number(request.params.id) 
    let post = posts.find(post => post.id === id)
    post = post.likes.push("Test")
    if (post) response.json(post)
    else response.status(404).end()
})

app.put('/api/users/:id', (request, response) => {
    console.log("request: ", request.params)
    const id = request.params.id
    let user = users.find(user => user.id === id)
    user = user.follows.push("Test")
    if (user) response.json(user)
    else response.status(404).end()
})

app.delete('/api/posts/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log('the passed ID is: ', id)
  posts = posts.filter(post => post.id !== id)
  response.status(404).end()
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})