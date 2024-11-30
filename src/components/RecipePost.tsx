import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const RecipePost = () => {
  return (
    <article className="recipe-post">
      <header className="recipe-post-header">
        <h1>Bone Broth Ramen in your rice cooker</h1>
      </header>
      <div className="author-info">
        <img
          src="/landing-img/johnsmith.png"
          alt="John Smith"
          className="author-avatar"
        />
        <span className="author-name">John Smith</span>
        <span className="post-date">10 Nov 2024</span>
      </div>
      <p className="recipe-post-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac
        ultrices odio. Nulla at congue diam, at dignissim turpis. Ut vehicula
        sed velit a faucibus. In feugiat vestibulum velit vel pulvinar.
      </p>

      <div className="recipe-image-container">
        <img
          src="/landing-img/bonebrothramen.png"
          alt="Bone Broth Ramen"
          className="recipe-image"
        />
      </div>

      <div className="recipe-content">
        <div className="main-content">
          <section className="recipe-section">
            <h2>Recipe;</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              ac ultrices odio. Nulla at congue diam, at dignissim turpis. Ut
              vehicula sed velit a faucibus. In feugiat vestibulum velit vel
              pulvinar. Fusce id mollis ex. Praesent feugiat elementum ex ut
              suscipit.
            </p>
          </section>

          <section className="recipe-section">
            <h2>STEPS</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              ac ultrices odio. Nulla at congue diam, at dignissim turpis. Ut
              vehicula sed velit a faucibus. In feugiat vestibulum velit vel
              pulvinar. Fusce id mollis ex. Praesent feugiat elementum ex ut
              suscipit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              ac ultrices odio. Nulla at congue diam, at dignissim turpis. Ut
              vehicula sed velit a faucibus. In feugiat vestibulum velit vel
              pulvinar. Fusce id mollis ex. Praesent feugiat elementum ex ut
              suscipit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              ac ultrices odio. Nulla at congue diam, at dignissim turpis. Ut
              vehicula sed velit a faucibus. In feugiat vestibulum velit vel
              pulvinar. Fusce id mollis ex. Praesent feugiat elementum ex ut
              suscipit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              ac ultrices odio. Nulla at congue diam, at dignissim turpis. Ut
              vehicula sed velit a faucibus. In feugiat vestibulum velit vel
              pulvinar. Fusce id mollis ex. Praesent feugiat elementum ex ut
              suscipit.
            </p>
          </section>
        </div>

        <aside className="share-sidebar">
          <h3>SHARE THIS ON:</h3>
          <div className="social-links">
            <a href="#" className="social-link">
              <Facebook size={24} />
            </a>
            <a href="#" className="social-link">
              <Twitter size={24} />
            </a>
            <a href="#" className="social-link">
              <Instagram size={24} />
            </a>
          </div>
        </aside>
      </div>
    </article>
  );
};

export default RecipePost;
