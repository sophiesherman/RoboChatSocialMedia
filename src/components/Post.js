import React from 'react';
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import UserAvatar from './UserAvatar'
import UserLink from './UserLink'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

const Post = ({ loggedInUser, posts, changeLike, setPosts }) => {
    return (
      <div className="row">
        <ul>
          {posts.map((post) => (
            <li id="individual-post" key={post.id}> 
            <div className="row">
                <div className="two columns">
                  <UserAvatar user={post.user}/>
                </div>
                <div className="eight columns"> 
                  <div>
                    <b><UserLink user={post.user}/></b> <i>{post.timestamp}</i>
                  </div>
                  <div id="content">
                    {post.content.split(" ").map((word) => {
                      const end = word.substring(1)
                        if (word.startsWith("@")) {
                            return (
                             <span key={`word.index${word}`}><Link to={`/users/${end}`}>@{end}</Link> </span>
                            )
                        } else if (word.startsWith("#")) {
                              return (
                              <span key={`word.index${word}`}><Link to={`/hashtag/${end}`}>#{end}</Link> </span>
                              )
                        } else {
                            return ( word + " ")
                        }
                    })}
                  </div> 
                </div> 
                <div className="row" id="like-row">
                  <div className="eight columns" id="likes">
                          <p><i> {post.likes.length} likes </i></p>
                          <p >
                              {post.likes.map((name, index) => (
                                  <b key={index}>{name}{index < post.likes.length - 1 ? ', ' : ''}</b>)
                              )}
                          </p>
                      </div>
                      <LikeButton loggedInUser={loggedInUser} post={post} changeLike={changeLike}/>
                      <DeleteButton loggedInUser={loggedInUser} post={post} setPosts={setPosts}/>
                </div>
            </div>
            </li>
          ))}
        </ul>
      </div>
    )    
}

export default Post;