import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './movie-view.scss';

const MovieView = ({ movies, token, username }) => {
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if the movie is in the user's favorites
    const isMovieFavorite = movies.some(movie => movie.title === movieId);
    setIsFavorite(isMovieFavorite);
  }, [movies, movieId]);

  const addToFavorites = async (movieTitle) => {
    try {
      const response = await fetch(`https://movies-myflix-85528af4e39c.herokuapp.com/users/${username}/favorites/${movieTitle}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error adding movie to favorites:', error);
    }
  };

  const removeFromFavorites = async (movieTitle) => {
    try {
      const response = await fetch(`https://movies-myflix-85528af4e39c.herokuapp.com/users/${username}/favorites/${movieTitle}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        setIsFavorite(false);
      }
    } catch (error) {
      console.error('Error removing movie from favorites:', error);
    }
  };


  const movie = movies.find((m) => m.id === movieId);

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <img className="img-fluid" src={movie.image} alt={movie.title} />
        </div>
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>

      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div className="button">
        <Link to="/"> Back </Link>
      </div>
      <div>
        <button onClick={() => addToFavorites(movie.title)}>
          Add to Favorites
        </button>
        <button onClick={() => removeFromFavorites(movie.title)}>
          Remove from Favorites
        </button>
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}

export default MovieView;

