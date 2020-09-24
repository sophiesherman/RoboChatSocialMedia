import React from 'react';
import Post from './Post'

const UserProfile = ({loggedInUser, userId, users, posts, addLike, addFollow, removeFollow}) => {
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
    
    //If user is logged in
    if (loggedInUser) {
        if(user !== "User not found") {
            const id = user[0].id
            const avatar = user[0].avatar
            const follows = user[0].follows

            const userPosts = getUserPosts(userId, posts)

            if((user[0].follows).includes(loggedInUser.id) === false){
               console.log("logged in user is not following") 
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
                            <button className="button-primary" id="follow-button" onClick={() => addFollow(user[0])}>Follow</button>
                        </div>
                    </div>
                    <br />
                    <div className="eight columns">
                        <Post loggedInUser={loggedInUser} posts={userPosts} addLike={addLike}/>
                    </div>
                </div>
                )                
            } else {
                console.log("logged in user is following!!") 
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
                                <button className="button-primary" id="follow-button" onClick={() => removeFollow(user[0])}>Unfollow</button>
                            </div>
                        </div>
                        <br />
                        <div className="eight columns">
                            <Post loggedInUser={loggedInUser} posts={userPosts} addLike={addLike}/>
                        </div>
                    </div>
                    )    
            }
            
        } else {
            return (
                <div>
                    <h5> The User <i>@{userId}</i> does not exist </h5>
                </div>
            )
        }
    //If user is not logged in
    } else {
        if(user !== "User not found") {
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
                            <p className="pleaseLogin"><i>Login to follow</i></p>
                        </div>
                    </div>
                    <div className="eight columns">
                        <Post loggedInUser={loggedInUser} posts={userPosts} addLike={addLike}/>
                    </div>
                </div>
                )
        } else {
            return (
                <div>
                    <h5> The User <i>@{userId}</i> does not exist </h5>
                </div>
            )
        }
    }
  }

export default UserProfile;