import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

const MovieCard = ({ movie, token, user, favoriteMovies, removeFromFavorites }) => {
  const [isFavorite, setIsFavorite] = useState(() => {

    const storageKey = `favorite_${movie.title}`;
    const isFavorited = localStorage.getItem(storageKey);
    return isFavorited ? JSON.parse(isFavorited) : favoriteMovies.some(favorite => favorite === movie.title);
  });

  useEffect(() => {
    const storageKey = `favorite_${movie.title}`;

    const toggleFavorite = async () => {
      try {
        const response = await fetch(
          `https://movies-myflix-85528af4e39c.herokuapp.com/users/${user.Username}/favorites/${movie.title}`,
          {
            method: isFavorite ? 'DELETE' : 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          setIsFavorite(!isFavorite);

          if (isFavorite) {
            localStorage.removeItem(storageKey);
          } else {
            localStorage.setItem(storageKey, JSON.stringify(true));
          }

          removeFromFavorites(movie.title);
        }
      } catch (error) {
        console.error('Error toggling favorite:', error);
      }
    };

    const heartIcon = document.getElementById(storageKey);
    if (heartIcon) {
      heartIcon.addEventListener('click', toggleFavorite);
    }

    return () => {
      if (heartIcon) {
        heartIcon.removeEventListener('click', toggleFavorite);
      }
    };
  }, [isFavorite, movie.title, removeFromFavorites, token, user.Username]);

  return (
    <Card key={movie.id} className={`h-100 movie-card ${isFavorite ? 'favorite' : ''}`}>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Link to={`/movies/${movie.id}`}>Open</Link>
        <div className="heart-icon" id={`favorite_${movie.title}`} />
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
  favoriteMovies: PropTypes.array.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
};

export default MovieCard;
