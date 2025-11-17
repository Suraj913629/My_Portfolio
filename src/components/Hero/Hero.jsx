import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowRight } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/Suraj913629', label: 'GitHub' },
    { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/suraj-kumar-2b3325203/', label: 'LinkedIn' },
    { icon: <FiMail />, url: 'mailto:sk1486663@gmail.com', label: 'Email' }
  ];

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = () => {
    // You can add your resume download logic here
    alert('Resume download functionality can be added here!');
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>
      </div>
      
      <div className="container">
        <div className="hero-container">
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="hero-badge"
              variants={textVariants}
              custom={0}
            >
              <span className="pulse">🚀</span>
              Available for new opportunities
            </motion.div>
            
            <motion.p
              className="hero-greeting"
              variants={textVariants}
              custom={1}
            >
              Hi, I'm
            </motion.p>
            
            <motion.h1
              className="hero-title"
              variants={textVariants}
              custom={2}
            >
              Suraj Kumar
            </motion.h1>
            
            <motion.h2
              className="hero-subtitle"
              variants={textVariants}
              custom={3}
            >
              Frontend <span className="gradient-text">Developer</span>
            </motion.h2>
            
            <motion.p
              className="hero-description"
              variants={textVariants}
              custom={4}
            >
              I build exceptional digital experiences focused on <strong>performance</strong>, 
              <strong> accessibility</strong>, and <strong>clean design</strong>. Currently specializing in 
              React, JavaScript, and modern frontend technologies to create impactful web applications.
            </motion.p>
            
            <motion.div
              className="hero-actions"
              variants={textVariants}
              custom={5}
            >
              <motion.button 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadResume}
              >
                <FiDownload />
                Download Resume
              </motion.button>
              <motion.button 
                className="btn btn-secondary"
                onClick={scrollToProjects}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
                <FiArrowRight />
              </motion.button>
            </motion.div>
            
            <motion.div
              className="hero-social"
              variants={textVariants}
              custom={6}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  className="social-link glass"
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
          >
            <div className="hero-image-container">
              <div className="hero-image glass floating">
                <div className="image-placeholder">
                  <div className="placeholder-content">
                    <span>👨‍💻</span>
                    <p>Suraj Kumar</p>
                  </div>
                </div>
              </div>
              <div className="hero-orbit">
                <div className="orbit-item">React</div>
                <div className="orbit-item">JavaScript</div>
                <div className="orbit-item">HTML/CSS</div>
                <div className="orbit-item">Node.js</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="scroll-line"></div>
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;