import React from 'react';

const Footer = ({ darkMode }) => {
  return (
    <footer className={`text-center py-3 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <p>&copy; {new Date().getFullYear()} GameHub. All rights reserved.</p>
    </footer>
  );
};

export default Footer;