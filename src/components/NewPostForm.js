import React, {useState} from 'react';

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"


const NewPostForm = ({user, updateFn}) => {
    const initialState = ''

    const [newPost, setNewPost] = useState(initialState)

    const handlePostIdChange = (event) => {
        setNewPost(event.target.value)
    }

    const formHandler = (event) => {
        event.preventDefault()
        if(newPost.length < 2) {
            alert('Post is too short')
            return false;
        }

        
        updateFn(newPost)
        setNewPost('')
    }
    if (user){
      return (
        <form onSubmit={formHandler}>
              <textarea 
                className="u-full-width" 
                placeholder="What's on your mind?" 
                maxLength="150"
                id="post-input"
                value={newPost}
                onChange={handlePostIdChange}
              />
          <button type="submit" className="button-primary">Publish</button>
        </form>
      )
    } else {
      return (
        <p className="pleaseLogin"><i><Link to={`/profile`}>Please login or register if you wish to post on RoboChat</Link></i></p>
      )
    }
  
  }

export default NewPostForm;