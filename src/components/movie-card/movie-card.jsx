import React from 'react';
import PropTypes from 'prop-types'
import { Button, Card } from "react-bootstrap";
import './movie-card.scss'

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100 movie-card">
      <Card.Img
        variant="top"
        src={movie.image}
      />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <button onClick={() => onMovieClick(movie)}>Open</button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  onMovieClick: PropTypes.func.isRequired
};

export default MovieCard;