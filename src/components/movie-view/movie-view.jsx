import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './movie-view.scss';


const MovieView = ({ movie, user, handleFavoriteClick }) => {


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
        <Link to="/" className="btn btn-primary"> Back </Link>
        {user && (
          <button className="btn btn-primary" onClick={() => handleFavoriteClick(movie)}>
            Favorite
          </button>
        )}
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.object.isRequired,
  user: PropTypes.object,
  handleFavoriteClick: PropTypes.func.isRequired
};

export default MovieView;
