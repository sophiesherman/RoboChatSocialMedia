import React from 'react';

const LikeButton = ({ loggedInUser, post, addLike }) => {
    if(loggedInUser){
        return (
            <button className="four columns" id="like-button" onClick={() => addLike(post)}>Like this post</button>
        )    
    } else {
        return (
            <p className="pleaseLogin"><i>Login to like</i></p>
        )   
    }
  }  

export default LikeButton;