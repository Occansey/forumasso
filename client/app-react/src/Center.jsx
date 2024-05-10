import { useState, useEffect } from 'react';
import './Center.css'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios'
import FriendsList from './Sidebar';
import Cookies from 'js-cookie';

function Center(props) {
  const [inputValue, setInputValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [friends,setFriends]=useState([]);
  const [username,setUsername]=useState("");
  const [nbPosts,setNbPosts]=useState(0);
  const [email,setEmail]=useState("");
  const [date,setDate]=useState("");

  const userCookieId=Cookies.get('userId')
  const baseUrl=`http://localhost:3000`

  function handleFormSubmitPublic(event) {
    event.preventDefault();
    axios.post(`${baseUrl}/posts/${props.privatePage ? `private` : `public`}?userId=${userCookieId}`, {
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
      const response = await axios.get(`${baseUrl}/users`);
      setFriends(response.data);
    } catch (error) {console.error('Error fetching data: ', error);}};
  getData();}, [])

  const liker=async (postId)=>{
    try{
    await axios.post(`${baseUrl}/like?userId=${userCookieId}&postId=${postId}`,{}); 
    } catch (error) {console.error('Error fetching data: ', error.response);}};

    const disliker=async (postId)=>{
      try{
        await axios.post(`${baseUrl}/dislike?userId=${userCookieId}&postId=${postId}`,{}); 
      } catch (error) {console.error('Error fetching data: ', error.data.response);}};

  const GetPosts = ({ mode = `user/profile` }) => {
    const [posts, setPosts] = useState([]);
      const fetchData = async () => {
        try {
          const response = await axios.get(`${baseUrl}/${mode}?userId=${userCookieId}`);
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
          <div className="background-div-post" onClick={GetComments(post._id)}>{post.content}</div>
          <Row className='flexer'>
            <Col sm={4}>{post.likes.length} likes</Col>
            <Col sm={8}>{post.dislikes.length} dislikes</Col>
          </Row>
          <Row className='flexer'>
            <Col sm><Button type="submit" onClick={()=>liker(post._id)}>Like</Button></Col>
            <Col sm><Button type="submit" onClick={()=>disliker(post._id)}>Dislike</Button></Col>
            <Col sm><Button type="submit" onClick={()=>(post._id)}>Reply</Button></Col>
          </Row>
        </div>
      )))
 
  }
 
  
    const GetComments=({postId})=>{
      const [comments,setComments]=useState([]);
      const inside=async(postId)=>{
      try{setComments(await axios.get(`${baseUrl}/posts/messages?postId=${postId}`))}
      catch (error) {console.error('Error fetching data: ', error);}}
    inside(postId);
  return (      
  <Container className='postContainer'>
  <div key='{post.id}'>
  <p>{'post.title'}</p>
     <Row>{txt}</Row>
      <div className="background-div-post"></div>
      <Row className='flexer'>
        <Col sm={4}>{'post.likes.length'} likes</Col>
        <Col sm={8}>{'post.dislikes.length'} dislikes</Col>
      </Row>
      <Row className='flexer'>
        <Col sm><Button onClick={()=>liker('post._id')}>Like</Button></Col>
        <Col sm><Button type="submit" onClick={()=>disliker('post._id')}>Dislike</Button></Col>
        <Col sm><Button type="submit">Reply</Button></Col>
      </Row>
      <Container className='postContainer'>
      {comments.map((comment)=>(
      <Row className='flexer'>
      <Col sm={2}>{comment.username}</Col>
      <Col sm={8}>{comment.content}</Col>
      </Row>))}
      </Container>
    </div></Container>
)

  };
  
 const txt="McNulty's on harbor patrol. Daniels is in the police-archives dungeon. Prez is chafing in the suburbs. Greggs has a desk job. The detail may be on ice, but corruption marches on . . . and a horrific discovery is about to turn the Baltimore shipping port inside out. Setting up in the wake of the first season's joint homicide/narcotics detail that exposed a major drug operation — and left its members stigmatized and reassigned — the second season expands to include not only familiar drug dealers, but a group of longshoremen and organized crime members who are caught up in a major homicide case."


  return (
      <>
      {/* {!props.userPage &&(<Form onSubmit={handleFormSubmitPublic} className='postform'>
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
          <><p>{username} {nbPosts} posts  </p>
            <p>{email}</p>
            <p>member since {date}</p>
          <GetPosts/>
          </>)}
          {props.postPage && (<GetComments postId='662a196e2bb94ae6ff24163c'/>)}
        </Container>
      </Form>)}
 
      <FriendsList friends={friends}/> */}
      {/* -----------------------------------------------------------ONE POST------------------------------------------------- */}
      <GetComments postId='662a196e2bb94ae6ff24163c'/>
      </>
    );
}

export default Center