import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFilter, FiEdit2, FiTrash2, FiPlus, FiStar, FiCode } from 'react-icons/fi';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Projects.css';

const Projects = ({ projects, onEditProject, onDeleteProject, onAddProject }) => {
  const [ref, isIntersecting] = useIntersectionObserver(0.1);
  const [activeFilter, setActiveFilter] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filters = [
    { key: 'all', label: 'All Projects', count: projects.length },
    { key: 'fullstack', label: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length },
    { key: 'frontend', label: 'Frontend', count: projects.filter(p => p.category === 'frontend').length },
    { key: 'backend', label: 'Backend', count: projects.filter(p => p.category === 'backend').length },
    { key: 'featured', label: 'Featured', count: projects.filter(p => p.featured).length }
  ];

  const filteredProjects = projects.filter(project => 
    activeFilter === 'all' || 
    (activeFilter === 'featured' ? project.featured : project.category === activeFilter)
  );

  const handleDelete = (projectId) => {
    onDeleteProject(projectId);
    setDeleteConfirm(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -15,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 80 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100
          }}
        >
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            My Projects
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Here are some of my projects that showcase my skills and passion for development
          </motion.p>
          
          <motion.div
            className="projects-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.button
              className="btn btn-primary add-project-btn"
              onClick={onAddProject}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={floatingAnimation}
            >
              <FiPlus />
              Add New Project
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="projects-filters"
          initial={{ opacity: 0, y: 40 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.key}
              className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiFilter />
              {filter.label}
              <span className="filter-count">{filter.count}</span>
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`project-card ${project.featured ? 'featured' : ''}`}
                variants={cardVariants}
                whileHover="hover"
                layout
              >
                {project.featured && (
                  <motion.div 
                    className="featured-badge"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                  >
                    <FiStar />
                    Featured
                  </motion.div>
                )}
                
                <div className="project-image">
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    className="project-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="project-links">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiGithub />
                      </motion.a>
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiExternalLink />
                      </motion.a>
                    </div>
                  </motion.div>
                  
                  <div className="project-actions">
                    <motion.button
                      className="btn-edit"
                      onClick={() => onEditProject(project)}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.9)' }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiEdit2 />
                    </motion.button>
                    <motion.button
                      className="btn-delete"
                      onClick={() => setDeleteConfirm(project.id)}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.9)' }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiTrash2 />
                    </motion.button>
                  </div>
                </div>
                
                <div className="project-content">
                  <motion.h3 
                    className="project-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p 
                    className="project-description"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    {project.description}
                  </motion.p>
                  
                  <motion.div 
                    className="project-technologies"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="tech-tag"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: index * 0.1 + techIndex * 0.1 + 0.6,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          y: -2,
                          backgroundColor: 'var(--primary-color)',
                          color: 'white'
                        }}
                      >
                        <FiCode />
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="empty-icon">📁</div>
            <h3>No projects found</h3>
            <p>Try selecting a different filter or add a new project</p>
            <motion.button
              className="btn btn-primary"
              onClick={onAddProject}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiPlus />
              Add Your First Project
            </motion.button>
          </motion.div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteConfirm && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirm(null)}
            >
              <motion.div
                className="delete-modal glass"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3>Delete Project</h3>
                <p>Are you sure you want to delete this project? This action cannot be undone.</p>
                <div className="modal-actions">
                  <motion.button
                    className="btn btn-secondary"
                    onClick={() => setDeleteConfirm(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    className="btn btn-danger"
                    onClick={() => handleDelete(deleteConfirm)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Delete Project
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;