/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable max-len */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Timer, ChevronRight } from 'lucide-react';

const Landing = () => (
  <section className="landing">
    <div className="side-container-left" />
    <div className="side-container-right" />

    <div className="landing-container">
      <div className="left-panel">
        <div className="hot-recipe-badge">
          <img src="/landing-img/scroll.png" alt="Hot recipe icon" width={22} />
          <span>Hot Recipes</span>
        </div>

        <h1 className="recipe-title">Air Fryer Chicken</h1>
        <h1 className="recipe-title">Wings!</h1>
        <h1 className="recipe-title" />
        <p className="recipe-description">Make these delicious, nutritious Air fryer wings</p>

        <div className="metadata-container">
          <div className="metadata-badge">
            <Timer size={24} />
            <span>30 Minutes</span>
          </div>
          <div className="metadata-badge">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.9989 7.47893C..."
                fill="black"
              />
            </svg>
            <span>Chicken</span>
          </div>
        </div>

        <div className="pt-8 mt-8">
          <div className="footer pt-10">
            <div className="author d-none d-md-block">
              <img
                src="/landing-img/JohnSmith.png"
                alt="John Smith"
                className="author-image"
              />
              <div className="author-info">
                <p className="author-name">John Smith</p>
                <p className="author-date">15 March 2022</p>
              </div>
            </div>

            <button type="button" className="view-recipe-btn">
              <span>View Recipe</span>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="right-panel">
        <img
          src="/landing-img/chickenwing.jpeg"
          alt="Featured Recipe"
          className="featured-image"
        />
      </div>
    </div>
  </section>
);

export default Landing;
