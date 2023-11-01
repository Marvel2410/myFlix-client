import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const ProfileView = ({ user, onUpdateProfile }) => {
  const [newUsername, setNewUsername] = useState(user.Username);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newEmail, setNewEmail] = useState(user.Email);
  const [newBirthday, setNewBirthday] = useState(user.Birthday);

  const handleUpdate = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.  Please try again.");
      return;
    }

    const updatedUserData = {
      Username: newUsername,
      Email: newEmail,
      Birthday: newBirthday
    };

    if (newPassword) {
      updatedUserData.Password = newPassword;
    }

    console.log("updated user data:", updatedUserData);

    const token = localStorage.getItem("token");
    fetch(`https://movies-myflix-85528af4e39c.herokuapp.com/users/${user.Username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedUserData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('User profile updated:', data);
        onUpdateProfile(data);
      })
      .catch(error => {
        console.error('Error updating user profile:', error);
      });
  };


  const handleDeregister = () => {
    const token = localStorage.getItem("token");
    fetch(`https://movies-myflix-85528af4e39c.herokuapp.com/users/${user.Username}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('User deregistered:', data);
      })
      .catch(error => {
        console.error('Error deregistering user:', error);
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

            <Form.Group controlId="formPasswordConfirm">
              <Form.Label>Confirm New Password:</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
};


ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  onUpdateProfile: PropTypes.func.isRequired,
};

export default ProfileView;