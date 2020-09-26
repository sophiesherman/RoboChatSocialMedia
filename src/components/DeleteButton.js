import React from 'react';
import postService from '../service/posts'

const DeleteButton = ({ loggedInUser, post, setPosts}) => {
    const handleDelete = (post) => {
        postService
          .del(post.id)
          .then(data => {
            alert("Your post has been deleted successfully")
            setPosts(data)
          })
          .then(data => {
            window.location.reload()
          })
          .catch(
            (error) => {
              alert(error)
            }
          )
    }
    if (loggedInUser !== null){
        if(loggedInUser.id === post.user){
            return (
                <button className="four columns" id="like-button"  onClick={() => handleDelete(post)}>Delete post</button>
            )
        }  else {
            return (
                <p></p>
            )   
        }
    } else {
        return (
            <p></p>
        )   
    }
  }  

export default DeleteButton;