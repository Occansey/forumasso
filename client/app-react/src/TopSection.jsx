import './TopSection.css'
import {React,useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios'

function Tsect()    
{
  const [posts, setPosts] = useState([])

  const change=(postId)=>{
    console.log(postId)
    const postElement = document.getElementById(postId);
    if (postElement) postElement.scrollIntoView({ behavior: "smooth" })
    else console.log ('not found')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/posts/topliked');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);
    return(
<Container fluid>
      <Row>
        <Col>
          <div className="sliding-section">
            <div className="sliding-content">
              {posts.map((post)=><button className="sliding-item" key={post._id} onClick={()=>change(post._id)} >{post.title}</button>)}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    )
}

export default Tsect