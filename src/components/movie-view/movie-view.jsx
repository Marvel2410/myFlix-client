import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './movie-view.scss';


const handleFavorite = (movie) => {
  if (favoriteMovies.includes(movie._id)) {
    // If the movie is already in favorites, remove it
    const updatedFavorites = favoriteMovies.filter(id => id !== movie._id);
    setFavoriteMovies(updatedFavorites);
  } else {
    // If the movie is not in favorites, add it
    const updatedFavorites = [...favoriteMovies, movie._id];
    setFavoriteMovies(updatedFavorites);
  }
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


const MovieView = ({ movie, handleFavorite }) => {
  return (
    <div>
      <div>
        <img className="w-100" src={movie.image} alt={movie.title} />
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
      <Button variant="primary" onClick={() => handleFavorite(movie)}>
        Favorite
      </Button>

      <div className="button">
        <Link to="/"> Back </Link>
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.object.isRequired,
  handleFavorite: PropTypes.func.isRequired,
};

export default MovieView;
