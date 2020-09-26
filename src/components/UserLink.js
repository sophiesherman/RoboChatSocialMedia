import React from 'react';

const UserLink = ({ user }) => {
    const url = "/users/" + user
    console.log(url)
    
    return (
        <div className="link">
                <a href={url}>@{user}</a>
        </div>
    )
}

export default UserLink;