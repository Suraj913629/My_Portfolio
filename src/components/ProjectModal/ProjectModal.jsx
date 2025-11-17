import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUpload, FiStar, FiCode, FiPlus, FiTrash2 } from 'react-icons/fi';
import './ProjectModal.css';

const ProjectModal = ({ isOpen, onClose, project, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: [],
    category: 'frontend',
    github: '',
    live: '',
    featured: false,
    status: 'completed'
  });
  const [currentTech, setCurrentTech] = useState('');

  useEffect(() => {
    if (project) {
      setFormData(project);
    } else {
      setFormData({
        title: '',
        description: '',
        image: '',
        technologies: [],
        category: 'frontend',
        github: '',
        live: '',
        featured: false,
        status: 'completed'
      });
    }
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleAddTech = () => {
    if (currentTech.trim() && !formData.technologies.includes(currentTech.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, currentTech.trim()]
      }));
      setCurrentTech('');
    }
  };

  const handleRemoveTech = (techToRemove) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTech();
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="project-modal glass"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>{project ? 'Edit Project' : 'Add New Project'}</h2>
              <motion.button
                className="close-btn"
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Project Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                    placeholder="Enter project title"
                  />
                </div>
                
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="fullstack">Full Stack</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows="4"
                  required
                  placeholder="Describe your project..."
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>GitHub URL</label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                    placeholder="https://github.com/username/repo"
                  />
                </div>
                
                <div className="form-group">
                  <label>Live Demo URL</label>
                  <input
                    type="url"
                    value={formData.live}
                    onChange={(e) => setFormData(prev => ({ ...prev, live: e.target.value }))}
                    placeholder="https://your-project.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <div className="image-input">
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                  <FiUpload className="upload-icon" />
                </div>
              </div>

              <div className="form-group">
                <label>Technologies</label>
                <div className="tech-input">
                  <input
                    type="text"
                    value={currentTech}
                    onChange={(e) => setCurrentTech(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add technology and press Enter"
                  />
                  <motion.button 
                    type="button" 
                    onClick={handleAddTech} 
                    className="add-tech-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!currentTech.trim()}
                  >
                    <FiPlus />
                  </motion.button>
                </div>
                <div className="tech-tags">
                  {formData.technologies.map((tech, index) => (
                    <motion.span
                      key={index}
                      className="tech-tag"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      layout
                    >
                      <FiCode />
                      {tech}
                      <motion.button
                        type="button"
                        onClick={() => handleRemoveTech(tech)}
                        className="remove-tech"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiTrash2 />
                      </motion.button>
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group checkbox-group">
                  <motion.label 
                    className="checkbox-label"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    />
                    <FiStar className={`star-icon ${formData.featured ? 'featured' : ''}`} />
                    Featured Project
                  </motion.label>
                </div>
                
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="planned">Planned</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <motion.button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {project ? 'Update Project' : 'Create Project'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;