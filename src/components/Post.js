import React from 'react';

const Post = ({posts}) => {
    return (
      <div className="row">
        <ul>
          {posts.map((post) => (
            <li id="individual-post" key={post.id}> 
              <div className="two column"><b>@{post.user}</b> <i>{post.timestamp}</i></div>
              <div>{post.content}</div> 
            </li>
          ))}
        </ul>
      </div>
    )
  }

export default Post;