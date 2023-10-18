import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, Col, Row, Form } from 'react-bootstrap';


const LoginView = ({ onLoggedIn }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://movies-myflix-85528af4e39c.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        console.log("Login response:", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("User does not exist");
        }
      })
      .catch((e) => {
        alert("Something Went Wrong");
      });
  };

  return (
    <Container className="margin-top-custom">
      <Row className="justify-content-md-center">
        <Col md={5}>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Login</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>username:
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                      required
                      placeholder="enter username"
                    />
                  </Form.Label>
                </Form.Group>

                <Form.Group>
                  <Form.Label>password:
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                      placeholder="enter password"
                    />
                  </Form.Label>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </Form> {" "}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginView;

