import React from 'react';
import PropTypes from 'prop-types'
import { Button, Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './movie-card.scss'

const MovieCard = ({ movie, user, onFavoriteClick }) => {
  return (
    <Card key={movie.id} className="h-100 movie-card">
      <Card.Img
        variant="top"
        src={movie.image}
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Link to={`/movies/${movie.id}`} movie={movie}>Open</Link>
        {user && (
          <button className="btn btn-primary" onClick={() => onFavoriteClick(movie)}>
            Favorite
          </button>
        )}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  user: PropTypes.object,
  onFavoriteClick: PropTypes.func.isRequired,
};

export default MovieCard;