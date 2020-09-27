const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('Connected to MongoDB')  
    })  
    .catch((error) => {    
        console.log('Error connecting to MongoDB:', error.message)
    })

const postSchema = new mongoose.Schema({
    user: String,
    timestamp: String,
    content: String,
    likes: Array
})

postSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post


