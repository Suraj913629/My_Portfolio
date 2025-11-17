import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import ProjectModal from './components/ProjectModal/ProjectModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import './Styles/App.css';

function App() {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [activeSection, setActiveSection] = useState('home');
  const [projects, setProjects] = useLocalStorage('portfolio-projects', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    if (projects.length === 0) {
      const sampleProjects = [
        {
          id: Date.now(),
          title: 'Sketchbook App',
          description: 'A digital sketchbook application with real-time drawing capabilities, multiple brush styles, and save functionality. Perfect for artists and designers to create digital artwork.',
          image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
          technologies: ['React', 'JavaScript', 'HTML5 Canvas', 'CSS3', 'Local Storage'],
          category: 'frontend',
          github: 'https://github.com/Suraj913629/sketchbook',
          live: 'https://suraj913629.github.io/sketchbook',
          featured: true,
          status: 'completed'
        },
        {
          id: Date.now() + 1,
          title: 'Portfolio Website',
          description: 'A responsive portfolio website showcasing my projects and skills with modern design, smooth animations, and dark/light theme functionality.',
          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
          technologies: ['React', 'JavaScript', 'CSS3', 'Framer Motion', 'Vite'],
          category: 'frontend',
          github: 'https://github.com/Suraj913629/portfolio',
          live: 'https://suraj913629.github.io/portfolio',
          featured: true,
          status: 'completed'
        }
      ];
      setProjects(sampleProjects);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollY = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollY >= element.offsetTop && scrollY < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now(),
      featured: project.featured || false
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (updatedProject) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  };

  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        activeSection={activeSection}
      />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects 
          projects={projects}
          onEditProject={handleEditProject}
          onDeleteProject={deleteProject}
          onAddProject={handleAddProject}
        />
        <Experience />
        <Contact />
      </main>
      <Footer />
      
      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={editingProject}
        onSave={editingProject ? updateProject : addProject}
      />
    </div>
  );
}

export default App;