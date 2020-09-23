import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post'
import NewPostForm from './components/NewPostForm'
import postService from './service/posts'

const App = () => {
  let [posts, setPosts] = useState([])

  const addLike = thing => {
    console.log("addLike", thing)
    const newThing = {...thing, likes: thing.likes.concat("Test")}
    console.log("updated vote in item", newThing)
    postService.update(newThing.id, newThing)
        .then(data => {
          // replace old thing in things array with newthing - match on id
          console.log("got response", data)
          const newThings = posts.map(
              thing => thing.id !== data.id ? thing : data 
            )
            setPosts(newThings)
        })
        .then(()=> {
          console.log("the next then")
        })
        .catch(
          (error) => {
            alert("There was an error!")
          }
        )
  }

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
            likes: []
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
      <Post posts={posts} addLike={addLike}/>
    </div>
  )
}

export default App;
