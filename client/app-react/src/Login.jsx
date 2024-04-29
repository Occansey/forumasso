import React from 'react';
import './Login.css';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

function Login() {
  return (
    <Container fluid>
    <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Col xs={2} sm={8} md={6} lg={4}>
          <Card>
            <Card.Body>
              <h3 className="text-center mb-4">Login</h3>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit" block>
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
