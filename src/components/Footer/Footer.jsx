import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/Suraj913629', label: 'GitHub' },
    { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/suraj-kumar-2b3325203/', label: 'LinkedIn' },
    { icon: <FiMail />, url: 'mailto:sk1486663@gmail.com', label: 'Email' }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3>Suraj Kumar</h3>
            <p>Frontend Developer passionate about creating amazing digital experiences.</p>
            <div className="footer-social">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  className="social-link"
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="footer-contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4>Get In Touch</h4>
            <p>Ready to start your next project? Let's talk!</p>
            <motion.a
              href="mailto:sk1486663@gmail.com"
              className="contact-email"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              sk1486663@gmail.com
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="footer-copyright">
            <p>
              © {currentYear} Suraj Kumar. Made with{' '}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <FiHeart className="heart-icon" />
              </motion.span>{' '}
              and React
            </p>
          </div>
          <div className="footer-credits">
            <p>Designed & Built with Passion</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;