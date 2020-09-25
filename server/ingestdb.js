require("dotenv").config()
const mongoose = require("mongoose")
const Post = require("./models/posts")
const User = require("./models/users")
const fs = require("fs")

// Load data from JSON file into memory
const rawData = fs.readFileSync("server/sample.json")
const data = JSON.parse(rawData)

let posts = data.posts
let users = data.users

posts.map(record => {
    console.log(record)
    const newPost = new Post({
        user: record.user,
        timestamp: record.timestamp,
        content: record.content,
        likes: record.likes
    })
    newPost.save()
    .then(result => {
        console.log("Post record saved")
    })
})

users.map(record => {
    console.log(record)
    const newUser = new User({
        id: record.id,
        passwordHash: record.password,
        avatar: record.avatar,
        follows: record.follows
    })
    newUser.save()
    .then(result => {
        console.log("Post user record saved")
    })
})

// mongoose.connection.close()
