import React, {useState} from 'react';
import Post from './Post'
import NewPostForm from './NewPostForm'
import UserLink from './UserLink'

import {
    BrowserRouter as Router,
    Switch, Route, Link
  } from "react-router-dom"

const Home = ({ users, loggedInUser, posts, changeLike, setPosts, addPost, sortPosts }) => {
    let postsForFeed = []
    let following = []
    if(loggedInUser !== null && following.length === 0){
        users.map((eachUser) => {
            eachUser.follows.map((follow) => {
                if (follow === loggedInUser.id) {
                    return following.push(eachUser.id)
                } else {
                    return null
                }
            })
            return null
        })
        if (following.length !== 0) {
            following.push(loggedInUser.id)
            following.map((eachFollow) => {
                posts.map((post) => {
                  if (post.user === eachFollow) {
                        return postsForFeed.push(post)
                  } else {
                      return null
                  }
                })
                return null
            })
        }
        sortPosts(postsForFeed)
        following.pop()
        return (
            <div>
                <h4> Welcome {loggedInUser.id}! </h4>
                <div id="followingList">
                    <p> You are following: </p>
                    <ul>
                        {following.map((follow) => {
                            return (
                                <li key={follow.index}><UserLink user={follow}/></li>
                            )
                        })}
                    </ul>
                    <p> <Link to={`/users`}>Find users to follow</Link> </p>
                </div>
                    <h5> Your Feed: </h5>
                    <p> <Link to={`/posts`}>View all posts</Link> </p>
                    <NewPostForm user={loggedInUser} updateFn={addPost} />
                    <Post loggedInUser={loggedInUser} posts={postsForFeed} changeLike={changeLike} setPosts={setPosts}/>
            </div>
        )
    } else {
        return (
            <div>
                <h5> All Posts </h5>
                <NewPostForm user={loggedInUser} updateFn={addPost} />
                <Post loggedInUser={loggedInUser} posts={posts} changeLike={changeLike} setPosts={setPosts}/>
            </div>
        )
    }
}

export default Home;