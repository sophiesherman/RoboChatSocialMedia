import React from 'react';

const UserAvatar = ({post}) => {
    const user = (post.user).toLowerCase()
    console.log(user)
    const avatar = "http://robohash.org/" + user
    console.log(avatar)
    return (
        <img src={avatar} alt="avatar" id="mini-avatar" />     
    )
}

export default UserAvatar;