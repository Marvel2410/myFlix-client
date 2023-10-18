import React, { useState, useEffect } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import NavigationBar from '../navigation-bar/navigation-bar';
import ProfileView from '../profile-view/profile-view';
import SignupView from '../signup-view/signup-view';
import PropTypes from 'prop-types';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import './main-view.scss';
import "../../index.scss";

const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movies-myflix-85528af4e39c.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => response.json())
      .then(data => {
        console.log("Movies from API:", data);
        setMovies(data);
      })
      .catch((error) => {
        console.error("fetch error:", error);
      });
  }, [token]);

  const moviesFromApi = (arr, query) => {
    return arr.filter((movie) => {
      return movie.title
    });
  };
  console.log(moviesFromApi(movies, search));

  useEffect(() => {
    setFilteredMovies(moviesFromApi(movies, search));
  }, [search, movies]);



  return (
    <>
      <NavigationBar
        user={user} movies={movies} search={search}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />

      <Row className="margin-top-custom justify-content-center mb-5">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={
              <>
                {user ? (
                  <Navigate to="/movies" />
                ) : (
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}
                  />
                )}
              </>
            }
            />

            <Route path="/signup" element={<>{user ? <Navigate to="/movies" /> : <SignupView />}</>}
            />
            <Route
              path="/movies"
              element={
                <>
                  {filteredMovies.map((movies) => {
                    return (
                      <MovieCard
                        movie={movie}
                        token={token}
                        setUser={setUser}
                        user={user}
                      />
                    );
                  })}
                </>
              }
            />
            <Route
              path="/movies/:movieId"
              element={<MovieView movies={movies} />}
            />
            <Route
              path="/profile"
              element={user ? (
                <ProfileView user={user} token={token} movies={movies} setUser={setUser} />
              ) : (
                <Navigate to="/login" />
              )}
            />
          </Routes>
        </BrowserRouter>
      </Row>
    </>
  );
};

MainView.propTypes = {
  onLoggedOut: PropTypes.func
};

export default MainView;