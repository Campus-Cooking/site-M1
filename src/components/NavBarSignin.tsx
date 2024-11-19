'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavBar = () => (
  <header className="navbar">
    <div className="navbar-container">
      <Navbar
        expand="xl"
        variant="light"
        style={{
          borderBottom: 'none',
          boxShadow: 'none',
        }}
      >
        <Container>
          <a href="/" className="logo fs-2 fw-bold">
            Campus Cooking
          </a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
            <Nav className="nav-links">
              {['Home', 'Recipes', 'Blog', 'Contact', 'About us'].map((item) => (
                <Nav.Link key={item} href={`/${item.toLowerCase()}`}>
                  {item}
                </Nav.Link>
              ))}
            </Nav>
            <a href="/login" className="login-btn d-flex align-items-center ms-3">
              Login
              <ChevronRight size={16} className="ms-1" />
            </a>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  </header>
);

export default NavBar;
