import React from 'react';
import LikeButton from './LikeButton'

const Post = ({loggedInUser, posts, changeLike}) => {
    return (
      <div className="row">
        <ul>
          {posts.map((post) => (
            <li id="individual-post" key={post.id}> 
              <div className="two column"><b><a href='http://localhost:3000/users/'>@{post.user}</a></b> <i>{post.timestamp}</i></div>
              <div>{post.content}</div> 
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    )    
}

export default Post;