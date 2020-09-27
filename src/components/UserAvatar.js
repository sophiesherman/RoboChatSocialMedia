import React from 'react';

const UserAvatar = ({user}) => {
    const name = (user).toLowerCase()
    const avatar = "http://robohash.org/" + name
    return (
        <img src={avatar} alt="avatar" id="mini-avatar" />     
    )
}

export default UserAvatar;