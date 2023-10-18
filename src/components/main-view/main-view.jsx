import React, { useState, useEffect } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import NavigationBar from '../navigation-bar/navigation-bar';
import ProfileView from '../profile-view/profile-view';
import SignupView from '../signup-view/signup-view';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate, useNavigate } from 'react-router-dom'; // Updated import statements
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Container, Nav } from 'react-bootstrap';

import './main-view.scss';
//import "../../index.scss";

const MainView = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [movies, setMovies] = useState([]);
  const [token, setToken] = useState(storedToken ? storedToken : null);


  // const [filteredMovies, setFilteredMovies] = useState({});

  const handleFavoriteClick = (movie) => {
    if (user) {
      fetch(`https://movies-myflix-85528af4e39c.herokuapp.com/users/${user.Username}/favorites/${movie.Title}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
        .then(response => response.json())
        .then(data => {
          setUser(data.updatedUser);
          localStorage.setItem("user", JSON.stringify(data.updatedUser));
        })
        .catch(error => console.error('Error:', error));
    }
  };

  const handleDeregister = () => {
    if (user) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
    }
  };

  const [search, setSearch] = useState("");

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

  const navigate = useNavigate();

  const onLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
    navigate('/profile');
  };

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
                            user={user ? JSON.parse(user) : null}
                            onFavoriteClick={handleFavoriteClick}
                          />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />

            <Route path="/login" element={
              <LoginView
                onLoggedIn={onLoggedIn}
              />
            } />
            <Route path="/signup" element={<SignupView />} />


            <Route
              path="/movies/:movieId"
              element={<MovieView movies={movies} />}
            />
            <Route
              path="/profile"
              element={
                <ProfileView
                  user={user}
                  movies={movies}
                  onFavoriteClick={handleFavoriteClick}
                  onDeregister={handleDeregister}
                />
              }
            />
          </Routes>
        </Row>
      </div>
    </Router>
  );
};

MainView.propTypes = {
  onLoggedOut: PropTypes.func
};

export default MainView;