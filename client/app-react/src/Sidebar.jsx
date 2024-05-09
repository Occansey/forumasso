    import {React,useState} from 'react';
    import './FriendsList.css';
    import { Form, Button, Container, Row, Col } from 'react-bootstrap';
    import axios from 'axios';


function FriendsList (prop){
  const [message,setMessage]=useState()
  const makeAdmin=async (userId)=>{
    try{
    const response=await axios.post(`http://localhost:3000/makeadmin?adminId=661cdfea7213a820f8a34d38&memberId=${userId}`,{})
    setMessage(response.data.message);
    }catch (error) {
    setMessage(error.response);
  }
  }
  const makeMember=async(userId)=>{
    try{
    const response=await axios.post(`http://localhost:3000/acceptmember?adminId=661cdfea7213a820f8a34d38&userId=${userId}`,{})
    setMessage(response.data.message);
    }catch (error) {
    setMessage(error);
  }
  }

  return (
    
    <div className="friends-list">
      {prop.friends.map((friend, index) => (
        <div key={friend._id} className="friend-block">
          <img src='https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp' alt={friend.name} />
          <div className="friend-info">
            <p>{friend.username}</p>
            <p>{friend.email}</p>
            <p>{friend.member ? 'member': 'outsider'}</p>
            <p>{friend.admin ? 'admin': 'user'}</p>
            {!friend.member && (<Button onClick={()=>makeMember(friend._id)} >ACCEPT</Button>)}
            {friend.member && !friend.admin &&(<Button onClick={()=>makeAdmin(friend._id)} >MAKE ADMIN</Button>)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;