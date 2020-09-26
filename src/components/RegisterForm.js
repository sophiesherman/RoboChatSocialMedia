import React, {useState} from 'react'
import userService from '../service/users'

const RegisterForm = ({user, setUser, setUsers}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const formHandler = (event) => {
      event.preventDefault()
      
      userService.register({username, password})
        .then(data => {
            setUser(data)
        }
        )
        .catch(error => {
            alert("Use a different username or password")
        })
    }

    const deleteProfile = (user) => {
        console.log(user)
        userService.del(user)
        .then(data => {
            setUsers(data)
            alert("Your profile has been deleted successfully")
            setUser(null)
        }
        )
        .catch(error => {
            alert("Cannot delete your profile")
        })
    }
  
    if (user) {
        return (
                <div className="row webForm loginSection">
                    <div className="eight columns">
                        <p>You have registered as @{user.id}</p>
                    </div>
                    <div className="four columns">
                        <button onClick={() => deleteProfile(user.id)}>Delete my profile</button>
                    </div>
                </div>
        )
    } else {
        return (
            <div className="loginSection">
                <h5> Register: </h5>
                <form onSubmit={formHandler}>
                        <div className="row">
                            <div className="three columns">
                                <label htmlFor="username">Username</label>
                                <input className="u-full-width" type="text" name="username" onChange={e => setUsername(e.target.value)} />
                            </div>
                            <div className="three columns">
                                <label htmlFor="password">Password</label>
                                <input className="u-full-width" name="password" type="password" onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className="three columns" id="login-button">
                                <input type="submit" value="Register"/>
                            </div>
                        </div>
                </form> 
            </div>
            )
    }
}

  export default RegisterForm