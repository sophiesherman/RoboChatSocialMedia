import React from 'react';
import Post from './Post'

const UserProfile = ({userId, users, posts, addLike, addFollow}) => {
    const getUser = (id) => {
        const foundUser = users.find(user => user.id === id) 
        if(foundUser){
          const userDetails = [{"id": foundUser.id, "password": foundUser.password, "avatar": foundUser.avatar, "follows": foundUser.follows}]
          return(userDetails)
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
    
    if(user !== "User not found") {
        const id = user[0].id
        const avatar = user[0].avatar
        const follows = user[0].follows

        const userPosts = getUserPosts(userId, posts)

        return (
            <div>
                <div className="row" id="profile">
                    <h4> User Profile: @{id} </h4>
                    <div className="six columns">
                        <img src={avatar} alt="avatar" id="avatar" />
                    </div>
                    <div className="five columns" id="follows">
                        <p><i> {follows.length} followers </i></p>
                        <ul>
                            {follows.map((name, index) => (
                                <li key={index}> 
                                    {name}
                                </li>
                            ))}
                        </ul>
                        <button className="button-primary" id="follow-button" onClick={() => addFollow(user[0])}>Follow</button>
                    </div>
                </div>
                <br />
                <div>
                    <h5> {id}'s Posts </h5>
                    <Post posts={userPosts} addLike={addLike}/>
                </div>
            </div>
            )
    } else {
        return (
            <div>
                <h4> The User <b><i>{userId}</i></b> does not exist </h4>
            </div>
        )
    }
  }

export default UserProfile;