import React from 'react';
import UserLink from './UserLink'

const Users = ({ users, loggedInUser, setUser }) => {
    return (
        <div className="row">
          <h5> RoboChat Users </h5>
          <ul>
            {users.map((user) => (
              <li id="individual-user" key={user.id}> 
              <div className="row">
                  <div className="five columns">
                      <img src={user.avatar} alt="avatar" id="mini-avatar" />     
                  </div>
                  <div className="seven columns"> 
                    <div>
                      <UserLink user={user.id}/>
                    </div>
                  </div>
              </div>
              </li>
            ))}
          </ul>
      </div>
    )
}

export default Users;