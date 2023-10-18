import React, { useState, useEffect } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import NavigationBar from '../navigation-bar/navigation-bar';
import ProfileView from '../profile-view/profile-view';
import SignupView from '../signup-view/signup-view';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Container, Nav } from 'react-bootstrap';

import './main-view.scss';
import "../../index.scss";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [movies, setMovies] = useState([]);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedFavoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies'));
    const storedUsername = localStorage.getItem('username');
    const storedToken = localStorage.getItem('token');

    if (storedFavoriteMovies) {
      setFavoriteMovies(storedFavoriteMovies);
    }

    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  const [search, setSearch] = useState("");
  // const [filteredMovies, setFilteredMovies] = useState({});

  const handleFavorite = (movie) => {
    if (favoriteMovies.includes(movie.id)) {
      // If the movie is already in favorites, remove it
      const updatedFavorites = favoriteMovies.filter(id => id !== movie.id);
      setFavoriteMovies(updatedFavorites);
    } else {
      // If the movie is not in favorites, add it
      const updatedFavorites = [...favoriteMovies, movie.id];
      setFavoriteMovies(updatedFavorites);
    }
    fetch(`https://movies-myflix-85528af4e39c.herokuapp.com/users/${username}/favorites/${movie.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ FavoriteMovies: favoriteMovies }),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Updated favorites on server:", data);
      })
      .catch(error => console.error('Error updating favorites:', error));
  };
}

useEffect(() => {
  if (!token) return;

  fetch("https://movies-myflix-85528af4e39c.herokuapp.com/movies", {
    headers: { Authorization: `Bearer ${token}` },
  })
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
}, [token]);


if (!user) {
  return <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />;
}


if (!movies || movies.length === 0) {
  return <div>The List is empty!</div>;
}

return (
  <Router>
    <div className="main-view">
      <NavigationBar
        user={user} movies={movies} search={search} onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />

      <Row className="margin-top-custom justify-content-center mb-5">
        <Routes>
          <Route
            path="/login"
            element={
              user ? <Navigate to="/" replace /> : <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
            }
          />

          <Route path="/signup" element={<SignupView />} />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col xs={12} s={8} md={4} className="mb-5" key={movie.id}>
                        <MovieCard
                          movie={movie}
                          user={user}
                          handleFavorite={handleFavorite}
                          favoriteMovies={favoriteMovies}
                          username={username}
                          token={token}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />

          <Route
            path="/movies/:movieId"
            element={<MovieView movie={movies} />}
          />
          <Route
            path="/profile"
            element={<ProfileView user={user} token={token} movie={movies} setUser={setUser} />}
          />


        </Routes>
      </Row>
    </div>
  </Router>
);


MainView.propTypes = {
  onLoggedOut: PropTypes.func
};

export default MainView;