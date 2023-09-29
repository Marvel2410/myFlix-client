import React from "react";
import { useState } from "react";
import { MovieCard } from "../components/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: 'Robin Hood: Prince of Thieves',
      Description: 'Robin Hood decides to fight back as an outlaw when faced with the tyranny of the Sheriff of Nottingham and also to win back the love of the beautiful Maid Marian.',
      Image: '#',
      Genre: 'Action',
      Director: 'Kevin Reynolds',
    },
    {
      id: 2,
      Title: 'Hook',
      Description: 'When Captain James Hook kidnaps his children, an adult Peter Pan must return to Neverland and reclaim his youthful spirit in order to challenge his old enemy.',
      Image: '#',
      Genre: 'Adventure',
      Director: 'Steven Spielberg',
    },
    {
      id: 3,
      Title: 'Beetlejuice',
      Description: 'The spirits of a deceased couple are harassed by an unbearable family that has moved into their home, and hire a malicious spirit to drive them out.',
      Image: '#',
      Genre: 'Comedy',
      Director: 'Tim Burton',
    },
    {
      id: 4,
      Title: 'Legend',
      Description: 'A young man must stop the Lord of Darkness from destroying daylight and marrying the woman he loves.',
      Image: '#',
      Genre: 'Fantasy',
      Director: 'Ridley Scott',
    },
    {
      id: 5,
      Title: '',
      Description: '',
      Image: '#',
      Genre: '',
      Director: '',
    },
    {
      id: 6,
      Title: 'Inglourious Basterds',
      Description: 'In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owners vengeful plans for the same.',
      Image: '#',
      Genre: 'Drama',
      Director: 'Quentin Tarantino',
    },
    {
      id: 7,
      Title: 'Captain Marvel',
      Description: 'Carol Danvers becomes one of the universes most powerful heroes when Earth is caught in the middle of a galactic war between two alien races.',
      Image: '#',
      Genre: 'Action',
      Director: 'Anna Boden',
    },
    {
      id: 8,
      Title: 'Pitch Perfect',
      Description: 'Beca, a freshman at Barden University, is cajoled into joining The Bellas, her schools all-girls singing group. Injecting some much needed energy into their repertoire, The Bellas take on their male rivals in a campus competition.',
      Image: '#',
      Genre: 'Comedy',
      Director: 'Jason Moore',
    },
    {
      id: 9,
      Title: 'Harry Potter and the Prisoner of Azkaban',
      Description: 'Harry Potter, Ron and Hermione return to Hogwarts School of Witchcraft and Wizardry for their third year of study, where they delve into the mystery surrounding an escaped prisoner who poses a dangerous threat to the young wizard.',
      Image: '#',
      Genre: 'Adventure',
      Director: 'Alfonso Cuaron',
    },
    {
      id: 10,
      Title: 'The Fifth Element',
      Description: 'In the colorful future, a cab driver unwittingly becomes the central figure in the search for a legendary cosmic weapon to keep Evil and Mr. Zorg at bay.',
      Image: '#',
      Genre: 'Science Fiction',
      Director: 'Luc Besson',
    }
  ])


  const [selectedMovies, setSelectedMovies] = useState(null);

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
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovies(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
