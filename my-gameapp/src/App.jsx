import React, { useState, useEffect } from 'react';
import NavigationBar from './assets/Components/NavigationBar';
import GameCards from './assets/Components/GameCards';
import Footer from './assets/Components/Footer';
import Home from './assets/Components/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutPage from './assets/Components/About';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  // Example categories - In a real app, you can fetch this from an API
  useEffect(() => {
    // This could be replaced by a fetch call to get categories from an API
    const fetchedCategories = ['Action', 'Adventure', 'Puzzle', 'RPG', 'Strategy'];
    setCategories(fetchedCategories);
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleFilter = (value) => {
    setSelectedCategory(value);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  return (
    // <>
    //   <div className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}>
    //     <NavigationBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    //     {/* Pass search term and selected category to GameCards */}
    //     <GameCards 
    //       darkMode={darkMode} 
    //       searchTerm={searchTerm} 
    //       selectedCategory={selectedCategory} 
    //     />
    //   </div>
    //   <Footer darkMode={darkMode} />
    // </>
    <Router>
      <div className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}>
        <NavigationBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        {/* Routing for different pages */}
        <Routes>
          <Route path='/' element={<Home darkMode={darkMode}/>}/>
          <Route path='/about' element={<AboutPage darkMode={darkMode}/>}/>
          <Route 
            path="/games" 
            element={
              <GameCards 
                darkMode={darkMode} 
                searchTerm={searchTerm} 
                selectedCategory={selectedCategory} 
              />
            } 
          />
          {/* Add more routes here as needed */}
        </Routes>
        
      </div>
      <Footer darkMode={darkMode} />
    </Router>
  );
};

export default App;
