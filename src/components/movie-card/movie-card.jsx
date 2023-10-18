import React from 'react';
import PropTypes from 'prop-types'
import { Button, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './movie-card.scss'

const MovieCard = ({ movie, handleFavoriteMovieCard, favoriteMovies, username, token }) => {

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

};

return (
  <Card key={movie.id} className="h-100 movie-card">
    <Card.Img
      variant="top"
      src={movie.image}
    />
    <Card.Body>
      <Card.Title>{movie.title}</Card.Title>
      <Button variant="primary" onClick={() => handleFavorite(movie)}>Favorite</Button>
      <Link to={`/movies/${movie.id}`}>Open</Link>
    </Card.Body>
  </Card>
);


MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  handleFavorite: PropTypes.func.isRequired,
};

export default MovieCard;