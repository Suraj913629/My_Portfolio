import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './About.css';

const About = () => {
  const [ref, isIntersecting] = useIntersectionObserver(0.1);

  const stats = [
    { number: '2+', label: 'Years Coding' },
    { number: '10+', label: 'Projects Completed' },
    { number: '5+', label: 'Technologies' },
    { number: '1', label: 'Internship' }
  ];

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Passionate developer crafting digital experiences that make a difference
          </p>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Hello! I'm Suraj, a Frontend Developer based in Delhi.</h3>
            <p>
              I specialize in creating exceptional digital experiences that are fast, 
              accessible, and visually appealing. My journey in web development started 
              during my college years, and I've been passionate about creating meaningful 
              solutions ever since.
            </p>
            <p>
              With experience in technologies like React, JavaScript, and modern frontend 
              tools, I enjoy turning complex problems into simple, beautiful designs. 
              When I'm not coding, you can find me exploring new technologies, 
              contributing to projects, or learning new programming concepts.
            </p>
            
            <div className="about-stats">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-item"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="visual-container glass">
              <div className="code-snippet">
                <div className="code-header">
                  <div className="code-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span>about-me.js</span>
                </div>
                <div className="code-content">
                  <pre>{`const developer = {
  name: "Suraj Kumar",
  role: "Frontend Developer",
  location: "Delhi, India",
  skills: ["React", "JavaScript", "HTML/CSS"],
  passion: "Creating amazing web experiences",
  available: true
};`}</pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;