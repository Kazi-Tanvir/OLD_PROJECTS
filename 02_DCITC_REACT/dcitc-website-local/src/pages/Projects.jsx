import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SectionHeader from '../components/common/SectionHeader';
import ProjectCard from '../components/sections/projects/ProjectCard';
import { projects, projectCategories } from '../data/projects';
import './Projects.css';

/**
 * Projects - Project portfolio page with category filtering
 */
function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects based on active category and search query
  const filteredProjects = useMemo(() => {
    let result = projects;
    
    // Category filter
    if (activeCategory !== 'all') {
      const categoryFilter = projectCategories.find(cat => cat.id === activeCategory);
      result = result.filter(project => project.category === categoryFilter?.value);
    }
    
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.techStack.some(tech => tech.toLowerCase().includes(searchLower))
      );
    }
    
    return result;
  }, [activeCategory, searchQuery]);

  return (
    <div className="page projects-page">
      {/* Section Header */}
      <SectionHeader
        title="Our Projects"
        subtitle="Explore our portfolio of technical projects across different domains"
      />

      {/* Search and Filter Bar */}
      <div className="projects-controls">
        {/* Search Input */}
        <div className="search-wrapper">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          {projectCategories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Count */}
      <div className="projects-count">
        <span className="count-number">{filteredProjects.length}</span>
        <span className="count-label">
          {filteredProjects.length === 1 ? 'Project' : 'Projects'} Found
        </span>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="empty-state">
          <p>No projects found in this category.</p>
        </div>
      )}
    </div>
  );
}

export default Projects;
