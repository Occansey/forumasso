import { useState,React,useEffect } from 'react';
import './Center.css'
import { Form,Button,Container,Row,Col } from 'react-bootstrap';
import axios from 'axios'

function Center()
{
  const tx="He say that I'm good enough, grabbin' my duh-duh-duh Thinkin' 'bout shit that I shouldn't have (huh) So I tell him there's one of me, he makin' fun of me (ha-ha) His girl is a bum to me (grrah) Like that boy is a cap, sayin' he home but I know where he at, like Bet he blowin' her back Thinkin' 'bout me 'cause he know that ass fat (damn) And it been what it been (uh, huh) Callin' his phone like, \"Yo, send me your PIN\" Duckin' my shit, 'cause he know what I'm on (grrah) But when he hit me I'm not gon' respond (grrah) But I don't sleep enough without you And I can't eat enough without you (huh) If you don't speak, does that mean we're through? (Huh) Don't like sneaky shit that you do (grrah"
  const [inputValue, setInputValue] = useState("");
  const [profilePage,setProfilePage]=useState(false);
  const [topPage,setTopPage]=useState(false);
  const [friendsPage,setFriendsPage]=useState(false)
  const [publicPage,setPublicPage]=useState(true);
  const [privatePage,setPrivatePage]=useState(false);
  function handleFormSubmitPublic(event){
    event.preventDefault();
    setInputValue("")
    axios.post('http://localhost:3000/posts/public?id=user1',{
      title: 'My new post test ',
      content: inputValue,
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {m
        console.log(error);
      });
  };
  function handleFormSubmitPrivate(event){
    event.preventDefault();
    setInputValue("")
    axios.post('http://localhost:3000/posts/private?id=user1',{
      title: 'My new post test ',
      content: inputValue,
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {m
        console.log(error);
      });
  };
  function handleInputChange (event){
    setInputValue(event.target.value);
  };



  function GetPosts({mode}){
    const [posts, setPosts] = useState([]);
    if (!mode) mode=''
    const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/posts/${mode}`);
          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching data: ', error) ;
        }
      };
      fetchData();
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
          <Form.Control className='inputer' value={inputValue} placeholder="What do you feel like posting today" as="textarea" rows={3}  onChange={handleInputChange} />
          </Form.Group>
          <Button className='inputer' type="submit">Add  post</Button></>)}
          <Container className='postContainer'>
          {publicPage && (<GetPosts mode='public'/>)}
          {privatePage && (<GetPosts mode='private'/>)} 
          {profilePage && (<GetPosts/>)}
          </Container>
        </Form>
      </>);
}

export default Center