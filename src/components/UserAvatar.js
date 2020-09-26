import React from 'react';

const UserAvatar = ({post}) => {
    const user = (post.user).toLowerCase()
    const avatar = "http://robohash.org/" + user
    return (
        <img src={avatar} alt="avatar" id="mini-avatar" />     
    )
}

export default UserAvatar;