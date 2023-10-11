import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';


export const MovieView = ({ movie, onBackClick }) => {
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
      <div className="button">
        <button
          onClick={onBackClick}
          className="back-button"
          style={{ cursor: "pointer" }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
};

