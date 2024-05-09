import { useState, useEffect } from 'react';
import './Center.css'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios'
import FriendsList from './Sidebar';
import Cookies from 'js-cookie'

function Center(props) {
  const [inputValue, setInputValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [friends,setFriends]=useState([]);
  const [username,setUsername]=useState("");
  const [nbPosts,setNbPosts]=useState(0);
  const [email,setEmail]=useState("");
  const [date,setDate]=useState("");
  const affiche=Cookies.get('userId')
  console.log(affiche)

  function handleFormSubmitPublic(event) {
    event.preventDefault();
    axios.post(`http://localhost:3000/posts/${props.privatePage ? `private` : `public`}?userId=661cdfea7213a820f8a34d38`, {
      title: titleValue,
      content: inputValue,
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    setInputValue("")
    setTitleValue("")
  };

  function handleInputChange(event) {
    setInputValue(event.target.value);
  };
  function handleTitleChange(event) {
    setTitleValue(event.target.value);
  };
  useEffect(() => {
  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users`);
      setFriends(response.data);
    } catch (error) {console.error('Error fetching data: ', error);}};
  getData();}, [])

  const liker=async (postId)=>{
    try{
    await axios.post(`http://localhost:3000/like?userId=661cdfea7213a820f8a34d38&postId=${postId}`,{}); 
    } catch (error) {console.error('Error fetching data: ', error.response);}};

    const disliker=async (postId)=>{
      try{
        await axios.post(`http://localhost:3000/dislike?userId=661cdfea7213a820f8a34d38&postId=${postId}`,{}); 
      } catch (error) {console.error('Error fetching data: ', error.data.respons);}};

  const GetPosts = ({ mode = `user/profile` }) => {
    const [posts, setPosts] = useState([]);
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/${mode}?userId=661cdfea7213a820f8a34d38`);
          if(mode == `user/profile` ){
          setPosts(response.data.posts.reverse())
          setUsername(response.data.profile.username);
          setNbPosts(response.data.profile.posts.length);
          setEmail(response.data.profile.email);
          setDate(response.data.profile.date);}
          else setPosts(response.data.reverse());
        } catch (error) {console.error('Error fetching data: ', error);}};
      fetchData();


    return (
      posts.map((post) => (
        <div key={post._id}>
          <p>{post.title}</p>
          <div className="background-div-post">{post.content}</div>
          <Row className='flexer'>
            <Col sm={4}>{post.likes.length} likes</Col>
            <Col sm={8}>{post.dislikes.length} dislikes</Col>
          </Row>
          <Row className='flexer'>
            <Col sm><Button onClick={()=>liker(post._id)}>Like</Button></Col>
            <Col sm><Button type="submit" onClick={()=>disliker(post._id)}>Dislike</Button></Col>
            <Col sm><Button type="submit">Reply</Button></Col>
          </Row>
        </div>
      )))
  }




  return (
      <>
      {!props.userPage &&(<Form onSubmit={handleFormSubmitPublic} className='postform'>
      <img src='https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp' id='pp' alt='profile picture' />
        {(props.publicPage || props.privatePage) && (
          <><Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control className='inputer' value={titleValue} placeholder="title" as="textarea" rows={1} onChange={handleTitleChange} />
            <Form.Control className='inputer' value={inputValue} placeholder="What do you feel like posting today" as="textarea" rows={3} onChange={handleInputChange} />
          </Form.Group>
            <Button className='inputer' type="submit">Add post</Button></>)}
        <Container className='postContainer'>
          {props.publicPage && (<GetPosts mode='posts/public' />)}
          {props.privatePage && (<GetPosts mode='posts/private' />)}
          {props.profilePage && (
          <><p>{username} {nbPosts} posts - Admin  </p>
            <p>{email}</p>
            <p>member since {date}</p>
          <GetPosts/>
          </>)}
        </Container>
      </Form>)}
      <FriendsList friends={friends}/>
      
      </>
    );
}

export default Center