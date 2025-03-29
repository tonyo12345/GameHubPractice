import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const GameList = ({ darkMode, searchTerm }) => {
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState(searchTerm);

  // Fetch the games and categories from the backend API
  useEffect(() => {
    fetch('http://localhost:5000/games')
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
        setCategories([...new Set(data.map(game => game.category))]); // Extract unique categories
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Apply filters to the games list
  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory ? game.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Handle the game card click
  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  // Close the sidebar
  const closeSidebar = () => {
    setSelectedGame(null);
  };

  // Filter sidebar change handlers
  const handleCategoryClick = (category) => {
    setFilterCategory(category === filterCategory ? '' : category); // Toggle category
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (loading) {
    return (
      <div className="loading-text text-white d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`container-fluid ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className="row" style={{ minHeight: '100vh', width: '1667px' }}>
        {/* Filter Sidebar */}
        <div
          className={`col-md-3 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'} p-4`}
          style={{
            position: 'fixed',
            top: '36px', // Adjust based on your navbar height
            left: 0,
            height: '100vh',
            width: '300px',
            zIndex: 1000,
            backdropFilter: 'blur(10px)',
            overflowY: 'auto',
            paddingTop: '70px', // Adjust for navbar height (if any)
          }}
        >
          <h5>Filter Games</h5>

          {/* Search Bar */}
          <div className="mb-3">
            <label htmlFor="searchQuery" className="form-label">Search by Title</label>
            <input
              id="searchQuery"
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          {/* Category Filter - Tile buttons */}
          <div className="mb-3">
            <h6>Categories</h6>
            <div className="d-flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`btn ${filterCategory === category ? 'btn-primary' : 'btn-outline-secondary'} text-truncate`}
                  onClick={() => handleCategoryClick(category)}
                  style={{ maxWidth: '150px' }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9" style={{ marginLeft: '300px', paddingTop: '70px' }}>
          <div className="row g-4 d-flex flex-wrap" style={{ minHeight: '75vh' }}>
            {filteredGames.map((game) => (
              <div key={game.id} className="col-md-4">
                <div
                  className={`card border-0 shadow-lg ${darkMode ? 'bg-secondary text-white' : 'bg-white text-dark'} h-100 d-flex flex-column`}
                  style={{ overflow: 'hidden', width: '400px', borderRadius: '10px'}}
                >
                  <img
                    src={game.image_links}
                    className="card-img-top rounded-3"
                    alt={game.title}
                    style={{ height: '250px', objectFit: 'cover', cursor: 'pointer', transition: 'transform 0.3s ease-in-out' }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    onClick={() => handleGameClick(game)} // Click to open sidebar
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title"><strong>{game.title}</strong></h5>
                    <p className="card-text">{game.description}</p>
                    <div className="mt-auto">
                      <button
                        className={`btn btn-sm ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'} w-100`}
                        onClick={() => handleGameClick(game)} // Open sidebar on card click
                      >
                        View Game Details
                      </button>
                      <small className="text-muted">{game.category}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar for selected game */}
      {selectedGame && (
        <div
          className={`sidebar position-fixed top-0 end-0 p-4 ${darkMode ? 'text-light' : 'text-dark'}`}
          style={{
            width: '30%',
            height: '100vh',
            marginTop: '40px', // Adjust based on your navbar height
            backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <button className={`btn-close btn-close-white ${darkMode ? 'text-light' : 'bg-light text-dark'}`} aria-label="Close" onClick={closeSidebar}></button>
          <h4>{selectedGame.title}</h4>
          <img
            src={selectedGame.image_links}
            alt={selectedGame.title}
            className="img-fluid mb-3 rounded-3 w-100"
            style={{ maxHeight: '200px', objectFit: 'cover' }}
          />
          <p><strong>Description:</strong> {selectedGame.description}</p>
          <p><strong>Genre:</strong> {selectedGame.category}</p>
          <p><strong>Release Date:</strong> {new Date(selectedGame.release_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <p><strong>Platforms:</strong> {selectedGame.platforms}</p>
          <p><strong>Developer:</strong> {selectedGame.developer}</p>
          <p><strong>Publisher:</strong> {selectedGame.publisher}</p>

          {/* Tags */}
          <div>
            <strong>Tags: </strong>
            {selectedGame.tags.split(',').map((tag, index) => (
              <span key={index} className={`badge ${darkMode ? 'bg-primary' : 'bg-secondary'} me-2`}>
                {tag.trim()}
              </span>
            ))}
          </div>

          <div className="mt-3">
            <a
              href={selectedGame.game_url}
              className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'} w-100`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Play Now
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameList;
