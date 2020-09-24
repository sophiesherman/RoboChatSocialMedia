import React, {useState} from 'react';

const NewPostForm = ({user, updateFn}) => {
    const initialState = ''

    const [newPost, setNewPost] = useState(initialState)

    const handlePostIdChange = (event) => {
        console.log(event.target.value)
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
        <p className="pleaseLogin"><i>Please login if you wish to post on RoboChat</i></p>
      )
    }
  
  }

export default NewPostForm;