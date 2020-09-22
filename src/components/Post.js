import React from 'react';

const Post = ({posts}) => {
    return (
      <div>
        <ul>
          {posts.map((post) => (
            <li id="individual-post"> 
              <p><b>@{post.user}</b> <i>{post.timestamp}</i></p>
              <p>{post.content}</p> 
            </li>
          ))}
        </ul>
      </div>
    )
  }

export default Post;