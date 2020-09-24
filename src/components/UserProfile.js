import React from 'react';
import Post from './Post'
import FollowButton from './FollowButton'

const UserProfile = ({ loggedInUser, userId, users, posts, addLike, addFollow, removeFollow }) => {
    const getUser = (id) => {
        const foundUser = users.find(user => user.id === id)
        if (foundUser) {
            const userDetails = [{ "id": foundUser.id, "password": foundUser.password, "avatar": foundUser.avatar, "follows": foundUser.follows }]
            return (userDetails)
        }
        else {
            return "User not found"
        }
    }

    const getUserPosts = (userId, posts) => {
        const foundPosts = posts.filter(post => post.user === userId)
        return foundPosts
    }

    const user = getUser(userId)

    //If user profile exists
    if (user !== "User not found") {
        const id = user[0].id
        const avatar = user[0].avatar
        const follows = user[0].follows

        const userPosts = getUserPosts(userId, posts)

        return (
            <div className="row">
                <h4 id="userProfile"> {id}'s Profile </h4>
                <div className="four columns" id="profile">
                    <div>
                        <img src={avatar} alt="avatar" id="avatar" />
                    </div>
                    <h5>@{id}</h5>
                    <div id="follows">
                        <p><i> {follows.length} followers </i></p>
                        <ul>
                            {follows.map((name, index) => (
                                <li key={index}>
                                    {name}
                                </li>
                            ))}
                        </ul>
                        <FollowButton loggedInUser={loggedInUser} addFollow={addFollow} removeFollow={removeFollow} user={user[0]} />
                    </div>
                </div>
                <div className="eight columns">
                    <Post loggedInUser={loggedInUser} posts={userPosts} addLike={addLike} />
                </div>
            </div>
        )
    //If user profile does not exist
    } else {
        return (
            <div>
                <h5> The User <i>@{userId}</i> does not exist </h5>
            </div>
        )
    }
}

export default UserProfile;