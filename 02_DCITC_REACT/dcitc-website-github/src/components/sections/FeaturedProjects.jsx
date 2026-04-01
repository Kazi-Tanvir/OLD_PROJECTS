import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare, faCodeBranch, faUsers } from '@fortawesome/free-solid-svg-icons';
import { SectionHeader, GlassCard, Button } from '../common';
import { projects } from '../../data/projects';
import './FeaturedProjects.css';

/**
 * FeaturedProjects - Showcase of top featured projects for homepage
 */
function FeaturedProjects() {
  // Filter featured projects and take top 4
  const featuredProjects = projects
    .filter((project) => project.isFeatured)
    .slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className="featured-projects-section" id="featured-projects">
      <div className="featured-projects-container">
        <SectionHeader
          title="Featured Projects"
          subtitle="Showcasing our best work across different domains"
          alignment="center"
        />

        <motion.div
          className="projects-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {featuredProjects.map((project, index) => (
            <GlassCard
              key={project.id}
              className="project-card"
              delay={index * 0.1}
            >
              {/* Project Image */}
              <div className="project-image-wrapper">
                <img
                  src={project.imagePlaceholder}
                  alt={project.title}
                  className="project-image"
                  loading="lazy"
                />
                <div className="project-overlay">
                  <div className="project-links">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label="View on GitHub"
                      >
                        <FontAwesomeIcon icon={faGithub} />
                      </a>
                    )}
                    {project.links.liveDemo && (
                      <a
                        href={project.links.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label="View Live Demo"
                      >
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="project-content">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                {/* Tech Stack */}
                <div className="project-tech">
                  {project.techStack.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="project-stats">
                  <div className="stat">
                    <FontAwesomeIcon icon={faCodeBranch} />
                    <span>{project.stats.branches} branches</span>
                  </div>
                  <div className="stat">
                    <FontAwesomeIcon icon={faUsers} />
                    <span>{project.stats.contributors} contributors</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          className="projects-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link to="/projects">
            <Button variant="primary" icon="fa-solid fa-arrow-right">
              View All Projects
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
