import { useState } from 'react';
import { MovieCard } from '../components/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Robin Hood: Prince of Thieves',
      description: 'Robin Hood decides to fight back as an outlaw when faced with the tyranny of the Sheriff of Nottingham and also to win back the love of the beautiful Maid Marian.',
      image: '../img/robinhood.jpg',
      genre: 'Action',
      director: 'Kevin Reynolds',
    },
    {
      id: 2,
      title: 'Hook',
      description: 'When Captain James Hook kidnaps his children, an adult Peter Pan must return to Neverland and reclaim his youthful spirit in order to challenge his old enemy.',
      image: '../img/hook.jpg',
      genre: 'Adventure',
      director: 'Steven Spielberg',
    },
    {
      id: 3,
      title: 'Beetlejuice',
      description: 'The spirits of a deceased couple are harassed by an unbearable family that has moved into their home, and hire a malicious spirit to drive them out.',
      image: '../img/beetlejuice.jpg',
      genre: 'Comedy',
      director: 'Tim Burton',
    },
  ])


  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }
  if (movies.length === 0) {
    return <div>The List is empty!</div>;
  }


  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) =>
              setSelectedMovie(newSelectedMovie)
            }
          />
        );
      })}
    </div>
  );
};
