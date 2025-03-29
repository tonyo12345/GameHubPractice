import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = ({ darkMode }) => {
  const [featuredGames, setFeaturedGames] = useState([]);

  // Fetch featured games from the backend
  useEffect(() => {
    fetch('http://localhost:5000/games') // Replace with your backend API endpoint
      .then((response) => response.json())
      .then((data) => {
        // Select the first 3 games as featured games (or apply your own logic)
        setFeaturedGames(data.slice(0, 3));
      })
      .catch((error) => console.error('Error fetching featured games:', error));
  }, []);

  return (
    <div
      className={`${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}
      style={{
        minHeight: '100vh',
        width: '1667px',
        display: 'flex',
        flexDirection: 'column',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: darkMode ? '#fff' : '#000',
      }}
    >
      {/* Hero Section */}
      <div
        className="hero-section d-flex justify-content-center align-items-center"
        style={{
          minHeight: '80vh',
          position: 'relative',
          backgroundImage: `url('https://www.skyweaver.net/images/media/wallpapers/wallpaper1.jpg')`,
          backgroundSize: 'cover', // Ensures the image covers the entire section
          backgroundPosition: 'center', // Centers the image
          backgroundRepeat: 'no-repeat', // Prevents the image from repeating
        }}
      >
        <div className="text-center" style={{ zIndex: 1 }}>
          <h1 className="display-3 fw-bold animated fadeIn">Welcome to GameHub</h1>
          <p className="lead animated fadeIn delay-1s">
            Your ultimate destination for gaming adventures, challenges, and epic battles.
          </p>
          <Link
            to="/games"
            className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'} btn-lg mt-3 animated bounceIn`}
          >
            Explore Games
          </Link>
        </div>
        {/* Optional Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.3)',
            zIndex: 0,
          }}
        ></div>
      </div>

      {/* Featured Games Section */}
      <div className="featured-games py-5">
        <div className="container">
          <h2 className="text-center mb-4">Featured Games</h2>
          <div className="row g-4">
            {featuredGames.length > 0 ? (
              featuredGames.map((game) => (
                <div key={game.id} className="col-md-4">
                  <div
                    className={`card border-0 shadow-lg ${
                      darkMode ? 'bg-secondary text-white' : 'bg-white text-dark'
                    }`}
                    style={{ borderRadius: '10px', overflow: 'hidden' }}
                  >
                    <img
                      src={game.image_links}
                      className="card-img-top"
                      alt={game.title}
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{game.title}</h5>
                      <p className="card-text">
                        {game.description.length > 100
                          ? `${game.description.substring(0, 100)}...`
                          : game.description}
                      </p>
                      <Link
                        to="/games"
                        className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'} w-100`}
                      >
                        Play Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">Loading featured games...</p>
            )}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div
        className="cta-section text-center py-5"
        style={{
          background: darkMode
            ? 'linear-gradient(135deg, #333, #222)'
            : 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
        }}
      >
        <h3 className="mb-3">Ready to Play?</h3>
        <p className="lead">
          Join thousands of gamers and dive into the best gaming experiences. What are you waiting for?
        </p>
        <Link
          to="/games"
          className={`btn ${darkMode ? 'btn-light' : 'btn-dark'} btn-lg mt-3`}
        >
          Start Playing
        </Link>
      </div>
    </div>
  );
};

export default Home;