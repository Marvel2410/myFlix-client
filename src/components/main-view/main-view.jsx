import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import PropTypes from 'prop-types';
import "../../index.scss";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';



export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

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

  return (
    <BrowserRouter>
      <div className="main-view">
        <Row>
          {movies.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            </Col>
          ))}
        </Row>

        <Routes>
          <Route
            path="/movies/:movieId"
            element={<MovieView />}
          />
          <Route
            path="/login"
            element={
              !user ? (
                <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
              ) : null
            }
          />
          <Route
            path="/signup"
            element={<SignupView />}
          />
        </Routes>


        {user && (
          //<Link to="/login">Login</Link>
          //) : (
          <button className="logoutbutton" onClick={() => {
            setUser(null); setToken(null); localStorage.clear();
          }}
          >
            Logout
          </button>
        )}
      </div>
    </BrowserRouter>

  );
};


MainView.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MainView;
