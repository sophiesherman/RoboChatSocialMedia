import React from 'react';

const LikeButton = ({ loggedInUser, post, changeLike }) => {
    if(loggedInUser){
        if((post.likes).includes(loggedInUser.id) === false){            
            return (
                <button className="four columns" id="like-button" onClick={() => changeLike(post, 0)}>Like</button>
            )
        } else {
            return (
                <button className="four columns" id="like-button" onClick={() => changeLike(post, 1)}>Unlike</button>
            )
        }
    }  else {
        return (
            <p className="pleaseLogin"><i>Login to like</i></p>
        )   
    }
    
    // if(loggedInUser){
    //     return (
    //         <button className="four columns" id="like-button" onClick={() => addLike(post)}>Like this post</button>
    //     )    
    // } else {
    //     return (
    //         <p className="pleaseLogin"><i>Login to like</i></p>
    //     )   
    // }
  }  

export default LikeButton;