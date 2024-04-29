import React from 'react'
import axios from 'axios'

function Posts(){
function postStuff() {axios.post('http://localhost:3000/posts/public?id=user1', {
    title: 'My private post',
    content: 'This is a private post'
  })
  .then(response => {
    const data = response.data;
    console.log(data);
  })
  .catch(error => {
    console.error(error);
})}
    return(
        <input type="button" value="Add a post" onClick={postStuff} />
    );
}

export default Posts