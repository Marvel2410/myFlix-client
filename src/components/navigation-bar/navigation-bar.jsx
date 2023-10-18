import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, Form, Container } from "react-bootstrap";

function NavigationBar({ user, onLoggedOut, movies, search, setSearch }) {
  return (
    <Navbar
      expand="lg"
      className=" mb-5 fixed-top justify-content-end navbar-style "
    >
      <Container className="align-bottom align-items-end align-content-end align-self-end navbar-style">

        <Navbar.Brand className="align-bottom navbar-style">
          Archive
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav className="me-auto justify-content-end"> */}
          <Nav className=" justify-content-end d-flex flex-grow-1">
            {!user ? (
              <>
                <Nav.Item>
                  <Nav.Link href="/login">login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/signup">signup</Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link href="/movies">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/login" onClick={onLoggedOut}>
                    Logout
                  </Nav.Link>
                </Nav.Item>
                <Form className="d-flex navbar-style">
                  <Form.Control
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  {/* <Button
                  variant="outline-primary"
                  type="submit"
                  onClick={handleSearch}
                >
                  Search
                </Button> */}
                </Form>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;