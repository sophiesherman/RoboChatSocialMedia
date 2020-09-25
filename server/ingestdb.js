require("dotenv").config()
const mongoose = require("mongoose")
const Post = require("./models/posts")
const fs = require("fs")

// Load data from JSON file into memory
const rawData = fs.readFileSync("server/sample.json")
const data = JSON.parse(rawData)

data.posts.map(record => {

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

// mongoose.connection.close()
