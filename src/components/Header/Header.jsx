import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import './Header.css';

const Header = ({ darkMode, setDarkMode, activeSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      className="header glass"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <nav className="nav">
        <motion.div 
          className="nav-brand"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <span>Portfolio</span>
        </motion.div>

        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className={`nav-link ${
                activeSection === item.href.slice(1) ? 'active' : ''
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.name}
              <motion.span 
                className="nav-link-underline"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: activeSection === item.href.slice(1) ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>

        <div className="nav-actions">
          <motion.button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </motion.button>

          <motion.button
            className="mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`mobile-nav-link ${
                  activeSection === item.href.slice(1) ? 'active' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;