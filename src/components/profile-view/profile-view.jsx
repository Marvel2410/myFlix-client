import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Card, CardGroup, Col, Container, Form, Row, } from 'react-bootstrap';
import MovieCard from "../movie-card/movie-card";
import { Link } from 'react-router-dom';


const ProfileView = ({ user, token, movies, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [userData, setUserData] = useState(user);

  let result = movies.filter((m) => user.favoriteMovies.includes(m._id));

  const handleUpdate = (event) => {
    event.preventDefault();

    let data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday
    };

    console.log(JSON.stringify(data));
    console.log(username);

    fetch(
      `https://movies-myflix-85528af4e39c.herokuapp.com/users/${user.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data)
      }
    )

      .then(async (response) => {
        console.log("response:", response);
        if (response.ok) {
          alert("update successful");
          const data = await response.json();
          localStorage.setItem("user", JSON.stringify(data));
          window.location.reload();
        } else {
          const errorText = await response.text();
          console.log("Error response body:", errorText);
          alert("update failed");
        }
      })
      .catch((err) => console.log("error", err));
  };


  const deleteAccount = () => {
    fetch(
      `https://movies-myflix-85528af4e39c.herokuapp.com/users/${user.username}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    ).then((resonse) => {
      if (response.ok) {
        setUser(null);
        localStorage.clear();
        alert("Your account has been deleted");
        window.location.replace("/login");
      } else {
        alert("could not delete account");
      }
    });
  };

  return (
    <>
      <Container className="">
        <Row className="justify-conten-md-center">
          <Col md={8}>
            <CardGroup>
              <Card className="mb-5 border border-0 card-custom">
                <Card.Body>
                  <Card.Title>Profile</Card.Title>
                  <Card.Text>
                    <strong>Username</strong> {userData.Username}
                  </Card.Text>
                  <Card.Text>
                    <strong>Email</strong> {userData.Email}
                  </Card.Text>
                  <Card.Text>
                    <strong>Birthday:</strong> {userData.Birthday}
                  </Card.Text>
                  <Form onSubmit={handleUpdate}>

                  //Username
                    <Form.Group>
                      <Form.Label>
                        username:
                        <Form.Control
                          type="text"
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                          placeholder={user.username}
                        />
                      </Form.Label>
                    </Form.Group>

              //Password
                    <Form.Group>
                      <Form.Label>
                        password:
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          placeholder="******"
                        />
                      </Form.Label>
                    </Form.Group>


                  //Email
                    <Form.Group>
                      <Form.Label>
                        email:
                        <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          placeholder={"user.email"}
                        />
                      </Form.Label>
                    </Form.Group>

                  //Birthday
                    <Form.Group>
                      <Form.Label>
                        birthday:
                        <Form.Control
                          type="date"
                          value={birthday}
                          onChange={(e) => {
                            setBirthday(e.target.value);
                          }}
                        />
                      </Form.Label>
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleUpdate}
                    >
                      Update Profile Information
                    </Button>\
                  </Form>
                  <Link to="/login">
                    <Button variant="danger"
                      type=""
                      onClick={deleteAccount}
                    >
                      Delete your account
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container >

      <Container>
        <Row className="justify-content-md-center align-items-center">
          {result.map((movie) => {
            return (
              <Col
                key={movie._id}
                className="mb-4 justify-content-center align-items-center d-flex"
              >
                <MovieCard
                  movie={movie}
                  token={token}
                  setUser={setUser}
                  user={user}
                />
              </Col>
            );
          })}
        </Row>
      </Container >
    </>
  );
};


ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
};

export default ProfileView;