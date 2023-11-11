import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

const MovieCard = ({ movie }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <Card
      key={movie.id}
      className={`h-100 movie-card ${clicked ? 'clicked' : ''}`}
      onClick={handleClick}
    >
      <div className="card-img-container">
        <Card.Img className="card-img-top" variant="top" src={movie.image} />
      </div>
      <div className="card-content">
        <Card.Body className="card-body">
          <Card.Title className="card-title">{movie.title}</Card.Title>
          <Link to={`/movies/${movie.id}`}>Open</Link>
        </Card.Body>
      </div>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;

