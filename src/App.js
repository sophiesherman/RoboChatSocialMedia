import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post'
import NewPostForm from './components/NewPostForm'
import UserProfile from './components/UserProfile'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Users from './components/Users'
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
              <nav className="topNav">
                <Link className="navItem" to="/">Home</Link>
                <Link className="navItem" to="/posts ">All Posts</Link>
                <Link className="navItem" to="/users">Users</Link>
                <Link className="navItem" to="/login">Login</Link>
                <Link className="navItem" to="/my-profile">Profile</Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="content">
          <Switch>
            <Route path="/users/:id">
              <div className="row">
                <LoginForm user={user} setUser={setUser} />
              </div>
              <UserProfile status="other" loggedInUser={user} users={users} posts={posts} changeLike={changeLike} changeFollow={changeFollow} setPosts={setPosts} />
            </Route>
            <Route path="/posts">
              <div className="row">
                <LoginForm user={user} setUser={setUser} />
              </div>
              <NewPostForm user={user} updateFn={addPost} />
              <Post loggedInUser={user} posts={posts} changeLike={changeLike} setPosts={setPosts}/>
            </Route>
            <Route path="/users">
              <div className="row">
                <LoginForm user={user} setUser={setUser} />
              </div>
              <div className="row">
                <Users users={users}/>
              </div>
            </Route>
            <Route path="/login">
              <div className="loginSection">
                <LoginForm user={user} setUser={setUser} />
                <RegisterForm user={user} setUser={setUser} setUsers={setUsers}/>
              </div>
            </Route>
            <Route path="/my-profile">
              <div>
                <UserProfile status="personal" loggedInUser={user} users={users} posts={posts} changeLike={changeLike} changeFollow={changeFollow} setPosts={setPosts}/>
              </div>
            </Route> 
            <Route path="/">
              <div className="row">
                <LoginForm user={user} setUser={setUser} />
              </div>
              <NewPostForm user={user} updateFn={addPost} />
              <Post loggedInUser={user} posts={posts} changeLike={changeLike} setPosts={setPosts}/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div >
  );
}

export default App;
