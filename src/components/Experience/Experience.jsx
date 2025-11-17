import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Experience.css';

const Experience = () => {
  const [ref, isIntersecting] = useIntersectionObserver(0.1);

  const experiences = [
    {
      company: 'National Informatics Centre',
      position: 'Frontend Developer Intern',
      period: '14 july 2025 - 14 november 2025',
      description: 'Worked on the frontend development of E-Jagriti System, implementing responsive UI components and enhancing user experience. Collaborated with the development team to build scalable web applications.',
      technologies: ['React', 'JavaScript', 'HTML5', 'CSS3', 'REST APIs'],
      type: 'work'
    },
    {
      company: 'Freelance Projects',
      position: 'Frontend Developer',
      period: '2022 - Present',
      description: 'Developed multiple web applications including Sketchbook drawing app and personal portfolio. Focused on creating responsive, user-friendly interfaces with modern design principles.',
      technologies: ['React', 'JavaScript', 'CSS3', 'Framer Motion', 'Git'],
      type: 'work'
    },
    {
      company: 'Dr. Akhilesh Das Gupta Institute of Professional Studies',
      position: 'B.Tech Computer Science & Engineering',
      period: '2022 - 2026',
      description: 'Will graduate with focus on software engineering, web technologies, and computer science fundamentals. Built strong foundation in programming, algorithms, and system design.',
      technologies: ['C++', 'Java', 'Python', 'Database Systems', 'Networking'],
      type: 'education'
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section id="experience" className="experience" ref={ref}>
      <div className="container">
        <motion.div
          className="experience-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-subtitle">
            My journey through technology and education
          </p>
        </motion.div>

        <motion.div
          className="timeline"
          variants={containerVariants}
          initial="hidden"
          animate={isIntersecting ? "visible" : "hidden"}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`timeline-item ${exp.type}`}
              variants={itemVariants}
            >
              <div className="timeline-marker">
                <div className="marker-dot"></div>
                {index < experiences.length - 1 && <div className="timeline-line"></div>}
              </div>
              
              <motion.div 
                className="timeline-content glass"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="experience-type">{exp.type === 'work' ? '💼 Work' : '🎓 Education'}</span>
                <h3 className="company">{exp.company}</h3>
                <h4 className="position">{exp.position}</h4>
                <span className="period">{exp.period}</span>
                <p className="description">{exp.description}</p>
                
                <div className="technologies">
                  {exp.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;