import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post'
import NewPostForm from './components/NewPostForm'
import UserProfile from './components/UserProfile'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import postService from './service/posts'
import userService from './service/users'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

const App = () => {
  let [posts, setPosts] = useState([])
  let [users, setUsers] = useState([])
  let [user, setUser] = useState(null)

  const changeLike = thing => {
    if ((thing.likes).includes(user.id) === false) {
      const newThing = { ...thing, likes: thing.likes.concat(user.id) }
      postService.update(newThing)
        .then(data => {
          // replace old thing in things array with newthing - match on id
          const newThings = posts.map(
            thing => thing.id !== data.id ? thing : data
          )
          setPosts(newThings)
        })
        .then(() => {
          console.log("the next then")
        })
        .catch(
          (error) => {
            alert("There was an error!")
          }
        )
    } else {
      const newThing = { ...thing, likes: thing.likes.filter(name => name !== user.id) }
      postService.update(newThing)
        .then(data => {
          // replace old thing in things array with newthing - match on id
          const newThings = posts.map(
            thing => thing.id !== data.id ? thing : data
          )
          setPosts(newThings)
        })
        .then(() => {
          console.log("the next then")
        })
        .catch(
          (error) => {
            alert("There was an error!")
          }
        )
    }
  }

  const changeFollow = thing => {
    console.log("addFollow", thing)
    if ((thing.follows).includes(user.id) === false) {
      const newThing = { ...thing, follows: thing.follows.push(user.id) }
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
        .then(() => {
          console.log("the next then")
        })
        .catch(
          (error) => {
            alert("There was an error!")
          }
        )
    } else {
      const newThing = { ...thing, follows: (thing.follows).filter(name => name !== user.id) }
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
        .then(() => {
          console.log(users)
        })
        .catch(
          (error) => {
            alert("There was an error!")
          }
        )
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
    postService
      .create({ user: user.id, content: newPost }, user)
      .then(data => {
        console.log("new post: ", data)
        setPosts(posts.concat(data))
      })
      .catch(
        (error) => {
          alert(error)
        }
      )
  }

  return (
    <div>
      <Router>
        <div id="top-bar" className="u-full-width">
          <div className="row">
            <div className="four columns">
              <h1 id="heading"> RoboChat </h1>
            </div>
            <div className="eight columns">
              <nav id="topNav">
                <Link className="navItem" to="/">Home</Link>
                <Link className="navItem" to="/posts ">All Posts</Link>
                <Link className="navItem" to="/users ">Users</Link>
                <Link className="navItem" to="/login">Login</Link>
              </nav>
            </div>
          </div>
        </div>
        <div id="content">
          <Switch>
            <Route path="/users/:id">
              <div className="row">
                <LoginForm user={user} setUser={setUser} />
              </div>
              <UserProfile loggedInUser={user} users={users} posts={posts} changeLike={changeLike} changeFollow={changeFollow} />
            </Route>
            <Route path="/posts">
              <div className="row">
                <LoginForm user={user} setUser={setUser} />
              </div>
              <NewPostForm user={user} updateFn={addPost} />
              <Post loggedInUser={user} posts={posts} changeLike={changeLike} />
            </Route>
            <Route path="/users">
              <div className="row">
                <LoginForm user={user} setUser={setUser} />
              </div>
              <p> To be done </p>
            </Route>
            <Route path="/login">
              <div className="loginSection">
                <h4> Login: </h4>
                <LoginForm user={user} setUser={setUser} />
                <RegisterForm user={user} setUser={setUser} />
              </div>
            </Route>
            <Route path="/">
              <div className="row">
                <LoginForm user={user} setUser={setUser} />
              </div>
              <NewPostForm user={user} updateFn={addPost} />
              <Post loggedInUser={user} posts={posts} changeLike={changeLike} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div >
  );
}
// <div>
//   <div id="top-bar" className="u-full-width row">
//     <h1 id="heading"> RoboChat </h1>
//   </div>
//   <div id="content">
//     <div>
//       <LoginForm user={user} setUser={setUser}/>
//       <RegisterForm user={user} setUser={setUser}/>
//     </div>
//     <div id = "profile-page">
//       <UserProfile loggedInUser={user} userId="Jimbulator" users={users} posts={posts} changeLike={changeLike} changeFollow={changeFollow}/>
//     </div>
//     <div id="homepage">
//       <NewPostForm user={user} updateFn={addPost}/>
//       <Post loggedInUser={user} posts={posts} changeLike={changeLike}/>
//     </div>
//   </div>
// </div> 
// }

export default App;
