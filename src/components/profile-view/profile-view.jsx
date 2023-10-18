import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProfileView = ({ user }) => {
  const [newUsername, setNewUsername] = useState(user.Username);
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState(user.Email);
  const [newBirthday, setNewBirthday] = useState(user.Birthday);

  const [favoriteMovies, setFavoriteMovies] = useState(user.FavoriteMovies);

  const handleFavorite = (movie) => {
    if (favoriteMovies.includes(movie._id)) {
      const updatedFavorites = favoriteMovies.filter(id => id !== movie._id);
      setFavoriteMovies(updatedFavorites);
    } else {
      const updatedFavorites = [...favoriteMovies, movie._id];
      setFavoriteMovies(updatedFavorites);
    }
    const username = user.Username;
    const token = localStorage.getItem("token");

    fetch(`https://movies-myflix-85528af4e39c.herokuapp.com/users/${username}/favorites/${movie.title}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ FavoriteMovies: favoriteMovies }),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Updated favorites on server:", data);
      })
      .catch(error => console.error('Error updating favorites:', error));
  };

};

const renderFavoriteMovies = () => {
  if (favoriteMovies.length === 0) {
    return <div>No favorite movies yet.</div>;
  }

  return (
    <div>
      <h4>Favorite Movies:</h4>
      <ul>
        {favoriteMovies.map((movieId) => {
          const movie = movies.find((m) => m.id === movieId);
          return (
            <li key={movieId}>
              {movie ? movie.title : 'Movie not found'}
            </li>
          );
        })}
      </ul>
    </div>
  );
};


const handleUpdate = () => {
  const data = {
    Username: newUsername,
    Password: newPassword,
    Email: newEmail,
    Birthday: newBirthday,
  };

  fetch(`https://movies-myflix-85528af4e39c.herokuapp.com/users/${user.Username}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Update response:', data);
      alert('User information updated successfully!');
    })
    .catch(error => {
      console.error('Error updating user information:', error);
      alert('Something went wrong. Please try again.');
    });
};

const handleDeregister = () => {
  fetch(`https://movies-myflix-85528af4e39c.herokuapp.com/users/${user.Username}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      if (response.ok) {
        alert('User deregistered successfully!');
        setUser(null);
        setToken(null);
        localStorage.clear();
      } else {
        alert('Something went wrong. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error deregistering user:', error);
      alert('Something went wrong. Please try again.');
    });
};

return (
  <div className="container">
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Profile</Card.Title>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
              minLength="3"
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>New Password:</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label>Date of Birth:</Form.Label>
            <Form.Control
              type="date"
              value={newBirthday}
              onChange={(e) => setNewBirthday(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>

          <Button variant="danger" onClick={handleDeregister}>
            Deregister
          </Button>
        </Form>
      </Card.Body>
    </Card>
  </div>
);


ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileView;
