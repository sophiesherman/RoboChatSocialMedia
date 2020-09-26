import React from 'react';
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'
import UserAvatar from './UserAvatar'
import UserLink from './UserLink'

const Post = ({ loggedInUser, posts, changeLike, setPosts }) => {
    return (
      <div className="row">
        <ul>
          {posts.map((post) => (
            <li id="individual-post" key={post.id}> 
            <div className="row">
                <div className="two columns">
                  <UserAvatar post={post}/>
                </div>
                <div className="eight columns"> 
                  <div>
                    <b><UserLink user={post.user}/></b> <i>{post.timestamp}</i>
                  </div>
                  <div>
                    {post.content.split(" ").map((word, i) => {
                        if (word.startsWith("@")) {
                            return (
                            <span key={word.index}><a href={"/users/" + word.substring(1)}>{word}</a> </span>
                            )
                        } else if (word.startsWith("#")) {
                              return (
                              <span key={word.index}><a href={"/hashtag/" + word.substring(1)}>{word}</a> </span>
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