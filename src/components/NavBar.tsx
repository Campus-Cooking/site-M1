import React from 'react';
import { Search, Twitter, Instagram } from 'lucide-react';

const Navbar = () => (
  <header className="navbar">
    <div className="navbar-container">
      <nav className="nav">
        <a href="/" className="logo">
          Campus Cooking
        </a>

        <ul className="nav-links">
          {[
            { name: 'Home', path: '/' },
            { name: 'Recipes', path: '/recipes' },
            { name: 'Blog', path: '/blog' },
            { name: 'Contact', path: '/contact' },
            { name: 'Add Recipe', path: '/addrecipe' },
          ].map((item) => (
            <li key={item.name}>
              <a href={item.path} className="nav-link">
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="social-links">
          <Search size={22} />
          <Twitter size={22} />
          <Instagram size={22} />
        </div>
      </nav>
    </div>
  </header>
);

export default Navbar;
