import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Button, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';

import './movie-card.scss'

const MovieCard = ({ movie, token, user, username, favoriteMovies, removefromFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem(`favorite_${movie.title}`) === 'true'
  );


  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");
    fetch(`https://movies-myflix-85528af4e39c.herokuapp.com/users/${user.Username}/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log("Favorite Movies from API:", data);
        setFavoriteMovies(data);
      })
      .catch(error => console.error('Error fetching favorite movies:', error));
  }, [user]);

  const toggleFavorite = async (movieTitle) => {
    try {
      const response = await fetch(`https://movies-myflix-85528af4e39c.herokuapp.com/users/${user.Username}/favorites/${movieTitle}`, {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        setIsFavorite(!isFavorite);

        if (isFavorite) {
          localStorage.removeItem(`favorite_${movieTitle}`);
        } else {
          localStorage.setItem(`favorite_${movieTitle}`, 'true');
        }

        removeFromFavorites(movieTitle);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };


  return (
    <Card key={movie.id} className={`h-100 movie-card ${isFavorite ? 'favorite' : ''}`}>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Link to={`/movies/${movie.id}`}>Open</Link>
        <div className={`heart-icon ${isFavorite ? 'favorite' : ''}`} onClick={() => toggleFavorite(movie.title)} />
      </Card.Body>
    </Card>
  );
};


MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  favoriteMovies: PropTypes.array.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
};

export default MovieCard;