import React from 'react';
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { Button, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './movie-card.scss'

const MovieCard = ({ movie, token, setUser, user, username }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = () => {
    setIsFavorite(prevState => !prevState);
  };

  const addFavoriteMovie = () => {
    fetch(
      `https://movies-myflix-85528af4e39c.herokuapp.com/users/${username}/movies/${movie._id}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Failed to add fav movie");
        }
      })
      .then((user) => {
        if (user) {
          alert("successfully added to favorites");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavorite(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const removeFavoriteMovie = () => {
    fetch(
      `https://movies-myflix-85528af4e39c.herokuapp.com/${username}/movies/${movie._id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
        }
      })
      .then((user) => {
        if (user) {
          alert("successfully deleted from favorites");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavorite(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };



  return (
    <Card key={movie.id} className="h-100 movie-card">
      <Card.Img
        variant="top"
        src={movie.image}
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Link to={`/movies/${movie.id}`}>Open</Link>
        <div>
          <button onClick={toggleFavorite}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

// MovieCard.propTypes = {
//   movie: PropTypes.object.isRequired,
// };

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;