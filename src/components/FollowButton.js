import React from 'react';

const FollowButton = ({ loggedInUser, changeFollow, user }) => {
    if(loggedInUser){
        if((user.follows).includes(loggedInUser.id) === false){
            return (
                <button className="button-primary" id="follow-button" onClick={() => changeFollow(user)}>Follow</button>
            )
        } else {
            return (
                <button className="button-primary" id="follow-button" onClick={() => changeFollow(user)}>Unfollow</button>
            )
        }    
    } else {
        return (
            <p className="pleaseLogin"><i>Login to follow</i></p>
        )   
    }
  }  

export default FollowButton;