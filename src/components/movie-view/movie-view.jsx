// Update:: grab useParams from react-router. This will let us take the URL and store it into a variable.
import { useParams } from "react-router-dom";
import React from 'react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './movie-view.scss';



// Update:: Changed the prop to movies
const MovieView = ({ movies, token, username }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const addToFavorites = async (movieTitle) => {

    try {
      const response = await fetch(`https://movies-myflix-85528af4e39c.herokuapp.com/users/${username}/favorites/${movieTitle}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('username', username);
      console.log('token', token);
      console.log('movieTitle', movieTitle);

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
      });

      if (response.ok) {
        setIsFavorite(false);
      }
    } catch (error) {
      console.error('Error removing movie from favorites:', error);
    }
  };

  const toggleFavorite = (movieTitle) => {
    if (isFavorite) {
      removeFromFavorites(movieTitle);
    } else {
      addToFavorites(movieTitle);
    }
  };

  //Update:: grab movieId from the URL. Console log ID to ensure we have the URL param we expect.
  const { movieId } = useParams();


  console.log('movieId ', movieId)

  //Update::find the clicked movie. We will use the .find() array method to search through the movies array. We are looking for the movie with an ID that matches the URL param. More on the .find() method here : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  const movie = movies.find((m) => m.id === movieId);
  //Update::Log the movie. Console log's are my best friend when coding. The more data I can see the better. Here I want to confirm we have everything we need to display in the retrun code below. 
  console.log('movie ', movie)
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
        <button onClick={() => toggleFavorite(movie.title)}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  //username: PropTypes.string.isRequired,
}

export default MovieView;
