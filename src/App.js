import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post'
import NewPostForm from './components/NewPostForm'
import postService from './services/posts'

const App = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    console.log('effect')
    postService
      .getAll()
      .then(initialPosts => {
        console.log('promise fulfilled')
        setPosts(initialPosts)
      })
  }, [])
  console.log('render', posts.length, 'posts')
 
  // Sorting to show most recent first
  console.log(posts);
  posts.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  console.log(posts);

  const addPost = (newPost) => {
        const newId = posts.length + 1
        const date = new Date();
        const currTimestamp = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace("T", " ");
        const newPostObject = ([
        {
            id: newId, 
            user: "Bean", 
            timestamp: currTimestamp, 
            content: newPost,
            likes: [
              "Mandible",
              "Barfoo",
              "Jimbulator"
            ]
        }])
      // setPosts(posts.concat(newPostObject))
      postService
        .create(newPostObject)
        .then(data => {
          setPosts(posts.concat(data))
        })
  }

  return (
    <div>
     <h1 id="heading"> RoboChat </h1>
      <NewPostForm updateFn={addPost}/>
      <Post posts={posts}/>
    </div>
  )
}

export default App;
