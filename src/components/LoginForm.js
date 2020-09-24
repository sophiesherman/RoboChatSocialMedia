/* eslint-disable react/prop-types */
import React, {useState} from 'react'
import userService from '../service/users'

const LoginForm = ({user, setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const formHandler = (event) => {
      event.preventDefault()
      console.log("Form Submitted", username, password)
      
      userService.login({username, password})
        .then(data => {
            console.log("Success:", data)
            setUser(data)
        }
        )
        .catch(error => {
            console.log("Error:", error)
        })
    }
  
    if (user) {
        return (
            <div className="row webForm loginSection">
                <div className="nine columns">
                    <p>Logged in as @{user.id}</p>
                </div>
                <div className="three columns">
                    <button onClick={() => setUser(null)}>Logout</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="loginSection">
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
                                <input type="submit" value="Login"/>
                            </div>
                        </div>
                </form> 
            </div>
            )
    }
}

  export default LoginForm