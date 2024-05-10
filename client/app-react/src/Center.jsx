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
  const [title,setTitle]=useState("")
  const [content,setContent]=useState("");
  const [pid,setPid]=useState("");
  const [likes,setLikes]=useState(0);
  const [dislikes,setDislikes]=useState(0);
  const [replies,setReplies]=useState(0);
  const [action,setAction]=useState(true)
  const [comment,setComment]=useState("")
  const userCookieId=Cookies.get('userId')
  const baseUrl=`http://localhost:3000`

  function handleFormSubmitPublic(event) {
    event.preventDefault();
    const requestBody = {
      title: titleValue,
      content: inputValue,
    };
    axios.post(`${baseUrl}/posts/${props.privatePage ? `private` : `public`}?userId=${userCookieId}`, requestBody)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Error submitting post: ', error.response);
        if (error.response && error.response.status === 400) {
          console.error('Bad Request: ', error.response.data);
        }
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
    try {const response = await axios.get(`${baseUrl}/users`);
      setFriends(response.data);} catch (error) {console.error('Error fetching data: ', error);}};
  getData();}, [])

  const liker=async (postId)=>{
    try{
    await axios.post(`${baseUrl}/like?userId=${userCookieId}&postId=${postId}`,{});
    setAction(!action) 
    } catch (error) {console.error('Error fetching data: ', error.response);}};

    const disliker=async (postId)=>{
      try{
        await axios.post(`${baseUrl}/dislike?userId=${userCookieId}&postId=${postId}`,{}); 
        setAction(!action)
      } catch (error) {console.error('Error fetching data: ', error.response);}};

  const GetPosts = ({ mode = `user/profile` }) => {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
      const fetchData = async (mode) => {
        try {
          const response = await axios.get(`${baseUrl}/${mode}?userId=${userCookieId}`);
          if(mode == `user/profile` ){
          setPosts(response.data.posts.reverse())
          setUsername(response.data.profile.username);
          setNbPosts(response.data.profile.posts.length);
          setEmail(response.data.profile.email);}
          else setPosts(response.data.reverse());
        } catch (error) {console.error('Error fetching data: ', error);}}
        fetchData(mode);},[mode,action])


    return (
      posts.map((post) => (
        <div key={post._id} id={post._id}>
          <p>{post.title}</p>
          <div className="background-div-post" >{post.content}</div>
          <Row className='flexer'>
            <Col sm={4}>{post.likes.length} likes</Col>
            <Col sm={4}>{post.dislikes.length} dislikes</Col>
            <Col sm={4}>{post.messages.length} replies</Col>
          </Row>
          <Row className='flexer'>
            <Col sm><Button onClick={()=>liker(post._id)}>Like</Button></Col>
            <Col sm><Button onClick={()=>disliker(post._id)}>Dislike</Button></Col>
            <Col sm><Button onClick={()=>onePost(post._id,post.title,post.content,post.likes.length,post.dislikes.length,post.messages.length)}>Reply</Button></Col>
          </Row>
        </div>
      )))
      
 
  }
  function handlecom(event) {
    setComment(event.target.value);
}
  const handleComments=(event)=> {
    event.preventDefault();
    axios.post(`${baseUrl}/posts/messages?userId=${userCookieId}&postId=${pid}`, {content: comment })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Error submitting post: ', error.response);
        if (error.response && error.response.status === 400) {
          console.error('Bad Request: ', error.response.data);
        }
      });
    setComment("")
  };
 
  const onePost=(id,title,content,likes,dislikes,replies)=>{
    props.setTest(false);
    setTitle(title);
    setContent(content);
    setPid(id);
    setLikes(likes)
    setDislikes(dislikes)
    setReplies(replies)
  }

  
    const GetComments=({postId,title,content,likes,dislikes,replies})=>{
      const [comments,setComments]=useState([]);
      const inside=async(postId)=>{
      try{const response=await axios.get(`${baseUrl}/posts/messages?postId=${postId}`)
      setComments(response.data)
    }
      catch (error) {console.error('Error fetching data: ', error);}}
      useEffect(() => {inside(postId);}, [postId,comment]);
    return (
    (<Container className='postform'>
    <div key={'post._id'}>
    <p>{title}</p>
    <div className="background-div-post" >{content}</div>
    <Row className='flexer'>
      <Col sm={4}>{likes} likes</Col>
      <Col sm={8}>{dislikes} dislikes</Col>
      <Col sm={8}>{replies} replies</Col>
    </Row>
    <Row className='flexer'>
      <Col sm><Button type="submit" onClick={()=>liker(postId)}>Like</Button></Col>
      <Col sm><Button type="submit" onClick={()=>disliker(postId)}>Dislike</Button></Col>
    </Row>
    <Form onSubmit={handleComments} className='mb-3'>
    <Form.Group className="mb-3"  >
    <Form.Control className='inputer' id='com' value={comment}  placeholder="reply " as="textarea" rows={1} onChange={handlecom}/>
    <Button className='inputer' type="submit">Reply</Button>
    </Form.Group>
    </Form>
  </div>
  {comments.length!=0 ?(<Container className='postContainer'>
  {comments.map((comment, index) => (
    <><Row className='flexer' key={index}>
      <Col md={4}>{comment.username}</Col>
      <Col md={{ span: 4, offset: 4 }}>{comment.content}</Col>
    </Row>
    <Row ></Row></>
  ))}
</Container>):(<p>NO COMMENTS YET</p>)}
  </Container>)
)
};
  

  return (
      <>
      {props.test && !props.userPage &&(<Form onSubmit={handleFormSubmitPublic} className='postform'>
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
          <GetPosts/>
          </>)}
        </Container>
      </Form>)}
      {!props.test &&(<GetComments postId={pid} title={title} content={content} likes={likes} dislikes={dislikes} replies={replies} />)}
      {props.test &&(<FriendsList friends={friends}/>)}
      </>
    );
}

export default Center