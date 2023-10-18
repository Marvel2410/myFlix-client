import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import './movie-view.scss';
import { useParams } from "react-router";



const MovieView = ({ movie }) => {
  const { movieId } = useParams();

  if (!movie.length) {
    return <></>;
  }

  //const movie = movie.find((m) => m._id === movieId);




  return (
    <>
      <Container className="">
        <Row className="justify-content-md-center">
          <Col className="col-lg-6">
            <Card className="border-0 moviePoster mx-auto">
              <Card.img src={movie.image} alt={movie.title} className="w-100" />
            </Card>
          </Col>

          <Col className="collg-6 mt-5 mt-md-0">
            <Card className="movie-infos border-0 h-100 card-custom">
              <Card.Body className="d-flex flex-column">
                <Card.Title><span>Title: </span><span>{movie.title}</span></Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <Card.Title><span>Director: </span></Card.Title>
                <Card.Text>{movie.director.name}</Card.Text>
                <Card.Title><span>Genre: </span></Card.Title>
                <Card.Text>{movie.genre.name}</Card.Text>
              </Card.Body>
              <Link to="/movies">
                <Button className="mt-auto m-4" variant="primary">
                  Back
                </Button>
              </Link>
            </Card >
          </Col >
        </Row >
      </Container >
    </>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.shape({ name: PropTypes.string }),
    genre: PropTypes.shape({ name: PropTypes.string }),
  }),
};

export default MovieView;
