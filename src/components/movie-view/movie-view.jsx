// Update:: grab useParams from react-router. This will let us take the URL and store it into a variable.
import { useParams } from "react-router-dom";
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './movie-view.scss';

// Update:: Changed the prop to movies
const MovieView = ({ movies }) => {
  //Update:: grab movieId from the URL. Console log ID to ensure we have the URL param we expect.
  const { movieId } = useParams();
  console.log('movieId ', movieId)

  //Update::find the clicked movie. We will use the .find() array method to search through the movies array. We are looking for the movie with an ID that matches the URL param. More on the .find() method here : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  const movie = movies.find((m) => m.id === movieId);
  //Update::Log the movie. Console log's are my best friend when coding. The more data I can see the better. Here I want to confirm we have everything we need to display in the retrun code below. 
  console.log('movie ', movie)
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
        <Link to="/"> Back </Link>
      </div>
    </div>
  );
};

// MovieView.propTypes = {
//   movie: PropTypes.object.isRequired
// };

export default MovieView;
