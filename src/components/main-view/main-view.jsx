import React, { useState, useEffect } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import NavigationBar from '../navigation-bar/navigation-bar';
//import { SignupView } from '../signup-view/signup-view';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';
import "../../index.scss";

const MainView = ({ onLoggedOut }) => {
  const [user, setUser] = useState(null);
  //const [movies, setMovies] = useState([]);
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
        console.log("Movies set:", moviesFromApi);
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
        <NavigationBar user={user} onLoggedOut={onLoggedOut} />
        <Switch>
          <Route exact path="/" render={() => (
            <Row>
              {movies.map((movie) => (
                <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
                  <Link to={`/movies/${movie.id}`}>
                    <MovieCard movie={movie} />
                  </Link>
                </Col>
              ))}
            </Row>
          )} />
          <Route path="/movies/:movieId" render={({ match }) => (
            <MovieView movie={movies.find(m => m.id === match.params.movieId)} />
          )} />
        </Switch>
      </div>
    </Router>
  );
};

MainView.propTypes = {
  onLoggedOut: PropTypes.func
};

export default MainView;