import React from 'react';

const FollowButton = ({ loggedInUser, addFollow, removeFollow, user }) => {
    if(loggedInUser){
        if((user.follows).includes(loggedInUser.id) === false){
            return (
                <button className="button-primary" id="follow-button" onClick={() => addFollow(user)}>Follow</button>
            )
        } else {
            return (
                <button className="button-primary" id="follow-button" onClick={() => removeFollow(user)}>Unfollow</button>
            )
        }    
    } else {
        return (
            <p className="pleaseLogin"><i>Login to follow</i></p>
        )   
    }
  }  

export default FollowButton;