import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post'
import NewPostForm from './components/NewPostForm'
import UserProfile from './components/UserProfile'
import LoginForm from './components/LoginForm'
import postService from './service/posts'
import userService from './service/users'

const App = () => {
  let [posts, setPosts] = useState([])
  let [users, setUsers] = useState([])
  let [user, setUser] = useState(null)
  
  const addLike = thing => {
    console.log("addLike", thing)
    if((thing.likes).includes(user.id) === false) {
      const newThing = {...thing, likes: thing.likes.push(user.id)}
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
    if((thing.follows).includes(user.id) === false) {
      const newThing = {...thing, follows: thing.follows.push(user.id)}
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

  const removeFollow  = thing => {
    console.log("removeFollow", thing)
    if((thing.follows).includes(user.id) === true) {
      const newThing = {...thing, follows: (thing.follows).filter(name => name !== user.id)}
      console.log("removed follow in item", newThing)
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
            console.log(users)
          })
          .catch(
            (error) => {
              alert("There was an error!")
            }
          )
    } else {
      alert("You have already unfollowed this user")
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
        let newId = posts.length + 1
        let date = new Date();
        let currTimestamp = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace("T", " ");
        let newPostObject = ([
        {
            id: newId, 
            user: user.id, 
            timestamp: currTimestamp, 
            content: newPost,
            likes: []
        }])
      postService
        .create(newPostObject)
        .then(data => {
          console.log("new post: ", data)
          setPosts(posts.concat(data))
        })
        .catch(
          (error) => {
            alert("There was an error with posting!")
          }
        )
  }

  return (
    <div>
      <div id="top-bar" className="u-full-width row">
        <h1 id="heading"> RoboChat </h1>
      </div>
      <div id="content">
        <div>
          <LoginForm user={user} setUser={setUser}/>
        </div>
        <div id = "profile-page">
          <UserProfile loggedInUser={user} userId="Jimbulator" users={users} posts={posts} addLike={addLike} addFollow={addFollow} removeFollow={removeFollow}/>
        </div>
        <div id="homepage">
          <NewPostForm user={user} updateFn={addPost}/>
          <Post loggedInUser={user} posts={posts} addLike={addLike}/>
        </div>
      </div>
    </div>
  )
}

export default App;
