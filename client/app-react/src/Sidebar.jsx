    import {React,useState} from 'react';
    import './FriendsList.css';
    import { Form, Button, Container, Row, Col } from 'react-bootstrap';
    import axios from 'axios';
    import Cookies from 'js-cookie';


function FriendsList (prop){
  const [message,setMessage]=useState()
  const userCookieId=Cookies.get('userId')
  const [admin,setAdmin]=useState(false)
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/user/profile?userId=${userCookieId}`);
      setAdmin(response.data.profile.admin);
    } catch (error) {console.error('Error fetching data: ', error);}};
  fetchData();
  const makeAdmin=async (userId)=>{
    try{
    const response=await axios.post(`http://localhost:3000/makeadmin?adminId=${userCookieId}&memberId=${userId}`,{})
    setMessage(response.data.message);
    }catch (error) {
    setMessage(error.response);
  }
  }
  const makeMember=async(userId)=>{
    try{
    const response=await axios.post(`http://localhost:3000/acceptmember?adminId=${userCookieId}&userId=${userId}`,{})
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
            {friend._id===userCookieId && (<Button  >ME</Button>)}
            {!friend.member && admin && (<Button onClick={()=>makeMember(friend._id)} >ACCEPT</Button>)}
            {friend.member && !friend.admin && admin &&(<Button onClick={()=>makeAdmin(friend._id)} >MAKE ADMIN</Button>)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;