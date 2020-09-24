import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post'
import NewPostForm from './components/NewPostForm'
import UserProfile from './components/UserProfile'
import postService from './service/posts'
import userService from './service/users'

const App = () => {
  let [posts, setPosts] = useState([])
  let [users, setUsers] = useState([])
  // let [user, setUser] = useState([])
  
  const addLike = thing => {
    console.log("addLike", thing)
    if((thing.likes).includes("Test") === false) {
      const newThing = {...thing, likes: thing.likes.push("Test")}
      console.log("updated vote in item", newThing)
      postService.update(newThing)
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
    } else {
      alert("You have already liked this post")
    }
  }

  const addFollow = thing => {
    console.log("addFollow", thing)
    if((thing.follows).includes("Test") === false) {
      const newThing = {...thing, follows: thing.follows.push("Test")}
      console.log("updated vote in item", newThing)
      userService.update(newThing)
          .then(data => {
            // replace old thing in things array with newthing - match on id
            console.log("got response", data)
            const newThings = users.map(
                thing => thing.id !== data.id ? thing : data 
              )
              setUsers(newThings)
          })
          .then(()=> {
            console.log("the next then")
          })
          .catch(
            (error) => {
              alert("There was an error!")
            }
          )
    } else {
      alert("You have already followed this user")
    }
  }

  useEffect(() => {
    postService
      .getAll()
      .then(initialPosts => {
        setPosts(initialPosts)
      })
    userService
      .getAll()
      .then(initialPosts => {
        setUsers(initialPosts)
      })
  }, [])
  
  // Sorting to show most recent first
  posts.sort((a, b) => b.timestamp.localeCompare(a.timestamp));

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
      <div id="top-bar">
        <h1 id="heading"> RoboChat </h1>
      </div>
      <div id = "profile-page">
        <UserProfile userId="Jimbulator" users={users} posts={posts} addLike={addLike} addFollow={addFollow}/>
      </div>
      <div id="homepage">
        <NewPostForm updateFn={addPost}/>
        <Post posts={posts} addLike={addLike}/>
      </div>
    </div>
  )
}

export default App;
