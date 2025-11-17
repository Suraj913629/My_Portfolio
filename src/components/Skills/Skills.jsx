import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Skills.css';

const Skills = () => {
  const [ref, isIntersecting] = useIntersectionObserver(0.1);

  const skillCategories = [
    {
      category: 'Frontend',
      icon: '🎨',
      skills: [
        { name: 'React', level: 85, color: '#61DAFB' },
        { name: 'JavaScript', level: 88, color: '#F7DF1E' },
        { name: 'HTML/CSS', level: 92, color: '#E34F26' },
        { name: 'TypeScript', level: 75, color: '#3178C6' }
      ]
    },
    {
      category: 'Backend & Databases',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 80, color: '#339933' },
        { name: 'Python', level: 82, color: '#3776AB' },
        { name: 'Java', level: 78, color: '#ED8B00' },
        { name: 'MySQL', level: 85, color: '#4479A1' }
      ]
    },
    {
      category: 'Programming & Tools',
      icon: '🛠️',
      skills: [
        { name: 'C++', level: 85, color: '#00599C' },
        { name: 'C', level: 80, color: '#A8B9CC' },
        { name: 'Git', level: 88, color: '#F05032' },
        { name: 'REST APIs', level: 82, color: '#FF6B35' }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            Here are the technologies I work with to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="skill-category glass"
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h3 className="category-title">{category.category}</h3>
              </div>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        style={{ 
                          backgroundColor: skill.color,
                          boxShadow: `0 0 10px ${skill.color}`
                        }}
                        initial={{ width: 0 }}
                        animate={isIntersecting ? { width: `${skill.level}%` } : {}}
                        transition={{ 
                          duration: 1.5, 
                          delay: categoryIndex * 0.2 + skillIndex * 0.1,
                          type: "spring",
                          stiffness: 100
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="skills-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p>Interested in working together? Let's build something amazing!</p>
          <motion.button
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start a Project
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;