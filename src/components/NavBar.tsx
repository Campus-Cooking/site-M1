import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Navbar = () => (
  <header className="navbar">
    <div className="navbar-container">
      <nav className="nav">
        <a href="/" className="logo">
          Campus Cooking
        </a>

        <ul className="nav-links">
          {['Home', 'Recipes', 'Blog', 'Contact', 'About us'].map((item) => (
            <li key={item}>
              <a href={`/${item.toLowerCase()}`} className="nav-link">
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="social-links">
          <Facebook size={22} />
          <Twitter size={22} />
          <Instagram size={22} />
        </div>
      </nav>
    </div>
  </header>
);

export default Navbar;
