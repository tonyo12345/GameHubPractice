import React from 'react';

const AboutPage = ({ darkMode }) => {
  return (
    <div
      className={`${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}
      style={{
 // Prevent content from exceeding the viewport height
        minHeight: '80vh',
        overflow: 'hidden', // Disable scrolling
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width:'1667px',
        padding: '50px 20px',
      }}
    >
      <div className="container text-center">
        <h1 className="display-4 fw-bold mb-4">About GameHub</h1>
        <p className="lead mb-5">
          Welcome to <strong>GameHub</strong>, your ultimate destination for gaming enthusiasts! 
          We are passionate about bringing you the best gaming experiences, from thrilling adventures 
          to epic battles. Whether you're a casual gamer or a hardcore competitor, GameHub is the place for you.
        </p>

        <div className="row g-4">
          <div className="col-md-4">
            <div
              className={`card border-0 shadow-lg ${
                darkMode ? 'bg-secondary text-white' : 'bg-white text-dark'
              }`}
              style={{ borderRadius: '10px', overflow: 'hidden' }}
            >
              <div className="card-body">
                <h5 className="card-title">Our Mission</h5>
                <p className="card-text">
                  To create a vibrant community of gamers and provide a platform where everyone can 
                  discover, play, and share their favorite games.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className={`card border-0 shadow-lg ${
                darkMode ? 'bg-secondary text-white' : 'bg-white text-dark'
              }`}
              style={{ borderRadius: '10px', overflow: 'hidden' }}
            >
              <div className="card-body">
                <h5 className="card-title">What We Offer</h5>
                <p className="card-text">
                  A curated selection of games, personalized recommendations, and a seamless gaming 
                  experience tailored to your preferences.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div
              className={`card border-0 shadow-lg ${
                darkMode ? 'bg-secondary text-white' : 'bg-white text-dark'
              }`}
              style={{ borderRadius: '10px', overflow: 'hidden' }}
            >
              <div className="card-body">
                <h5 className="card-title">Join Us</h5>
                <p className="card-text">
                  Become a part of our growing community and connect with gamers from around the world. 
                  Together, let's make gaming more fun and exciting!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3>Contact Us</h3>
          <p>
            Have questions or feedback? Reach out to us at{' '}
            <a href="mailto:support@gamehub.com" className="text-decoration-none">
              support@gamehub.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;