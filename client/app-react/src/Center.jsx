import { useState,React,useEffect } from 'react';
import './Center.css'
import { Form,Button,Container,Row,Col } from 'react-bootstrap';
import axios from 'axios'


function Center()
{
  const [inputValue, setInputValue] = useState("");
  const [profilePage,setProfilePage]=useState(false);
  const [topPage,setTopPage]=useState(false);
  const [friendsPage,setFriendsPage]=useState(false)
  const [publicPage,setPublicPage]=useState(true);
  const [privatePage,setPrivatePage]=useState(false);
  function handleFormSubmitPublic(event){
    event.preventDefault();
    axios.post('http://localhost:3000/posts/public?id=user1',{
      title: 'My medicament test ',
      content: inputValue,
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {m
        console.log(error);
      });
      setInputValue("")
  };

  function handleInputChange (event){
    setInputValue(event.target.value);
  };


  const GetPosts=({mode=''})=>{
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
    const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/posts${mode}`);
          console.log(response)
          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching data: ', error) ;
        }
      };
      fetchData();},[])
    return(
    posts.map((post)=>(
    <><div className="background-div-post">{post.content}</div>
      <Row className='flexer'>
      <Col sm={4}>{post.likes.length} likes</Col>
      <Col sm={8}>{post.likes.length} dislikes</Col>
      </Row>
      <Row className='flexer'>
      <Col sm><Button  type="submit">Like</Button></Col>
      <Col sm><Button  type="submit">Dislike</Button></Col>
      <Col sm><Button  type="submit">Reply</Button></Col>  
      </Row></>
      )) 
    )
  }
  
    return(
      <>
      <Form onSubmit={handleFormSubmitPublic}className='postform'>
          {(profilePage || friendsPage ||publicPage || privatePage) && (
          <><p>Username 200 posts 20 Friends </p>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control className='inputer' value={inputValue} placeholder="What do you feel like posting today" as="textarea" rows={3}   onChange={handleInputChange}/>
          </Form.Group>
          <Button className='inputer' type="submit">Add  post</Button></>)}
          <Container className='postContainer'>
          {publicPage && (<GetPosts mode='/public'/>)}
          {privatePage && (<GetPosts mode='/private'/>)} 
          {profilePage && (<GetPosts/>)}
          </Container>
        </Form>
      </>);
}

export default Center