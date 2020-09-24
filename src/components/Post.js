import React from 'react';

const Post = ({posts, addLike}) => {
    return (
      <div className="row">
        <ul>
          {posts.map((post) => (
            <li id="individual-post" key={post.id}> 
              <div className="two column"><b>@{post.user}</b> <i>{post.timestamp}</i></div>
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
                <button className="four columns" id="like-button" onClick={() => addLike(post)}>Like this post</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

export default Post;