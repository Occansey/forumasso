import './TopSection.css'
import {React,useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios'

function Tsect()    
{
  const [posts, setPosts] = useState([]);

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
              {posts.map((post)=><div className="sliding-item" key={post._id}>{post.title}</div>)}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    )
}

export default Tsect