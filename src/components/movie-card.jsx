import React from 'react';
import PropTypes from 'prop-types'

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  onMovieClick: PropTypes.func.isRequired
};