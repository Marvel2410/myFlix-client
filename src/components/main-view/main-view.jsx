import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import PropTypes from 'prop-types';
import "../../index.scss";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://movies-myflix-85528af4e39c.herokuapp.com/movies")
      .then(response => response.json())
      .then(data => {
        console.log("Movies from API:", data);
        const moviesFromApi = data.map(movie => ({
          id: movie.id,
          title: movie.Title,
          description: movie.Description,
          genre: movie.Genre,
          director: movie.Director,
          image: movie.ImagePath
        }));
        setMovies(moviesFromApi);
      })
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }
  if (movies.length === 0) {
    return <div>The List is empty!</div>;
  }


  return (
    <div className="my-flix">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) =>
            setSelectedMovie(newSelectedMovie)
          }
        />
      ))}
    </div>
  );
};

MainView.propTypes = {
  movies: PropTypes.array.isRequired,
};
