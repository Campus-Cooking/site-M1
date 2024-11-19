'use client';

import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Footer = () => (
  <footer className="navbar">
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
          <Navbar.Brand href="/" className="logo fs-2 fw-bold">
            Campus Cooking
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="footer-navbar-nav" />
          <Navbar.Collapse id="footer-navbar-nav" className="justify-content-between">
            <Nav className="nav-links">
              {['Home', 'Recipes', 'Blog', 'Contact', 'About us'].map((item) => (
                <Nav.Link key={item} href={`/${item.toLowerCase()}`}>
                  {item}
                </Nav.Link>
              ))}
            </Nav>
            <Nav className="nav-social d-flex">
              <Nav.Link href="#" className="d-flex align-items-center mx-2">
                <Facebook size={22} />
              </Nav.Link>
              <Nav.Link href="#" className="d-flex align-items-center mx-2">
                <Twitter size={22} />
              </Nav.Link>
              <Nav.Link href="#" className="d-flex align-items-center mx-2">
                <Instagram size={22} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="divider" />
      <div className="text-center py-3">
        <p className="mb-0 body-text">© 2024 Campus Cooking</p>
      </div>
    </div>
  </footer>
);

export default Footer;
