import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCodeBranch,
  faUsers,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import GlassCard from '../../common/GlassCard';
import Button from '../../common/Button';
import './ProjectCard.css';

/**
 * ProjectCard - Detailed project card component
 * Horizontal layout on mobile, vertical on desktop
 * 
 * @param {Object} project - Project data object
 */
function ProjectCard({ project }) {
  const {
    title,
    description,
    techStack,
    stats,
    imagePlaceholder,
    links,
    isFeatured,
  } = project;

  return (
    <GlassCard 
      className={`project-card ${isFeatured ? 'featured' : ''}`}
      style={{ padding: 0 }}
    >
      {/* Project Image */}
      <div className="project-image-wrapper">
        <img
          src={imagePlaceholder}
          alt={title}
          className="project-image"
          loading="lazy"
        />
        {isFeatured && (
          <span className="featured-badge">Featured</span>
        )}
      </div>

      {/* Project Content */}
      <div className="project-body">
        <h3 className="project-title">{title}</h3>
        
        {/* Tech Stack Tags */}
        <div className="tech-stack-tags">
          {techStack.slice(0, 3).map((tech, index) => (
            <span key={index} className="tech-tag">
              {tech}
            </span>
          ))}
          {techStack.length > 3 && (
            <span className="tech-tag-more">+{techStack.length - 3}</span>
          )}
        </div>

        {/* Description - hidden on mobile */}
        <p className="project-description">{description}</p>

        {/* Stats */}
        <div className="project-stats">
          {stats.branches !== null && (
            <div className="stat-item">
              <FontAwesomeIcon icon={faCodeBranch} className="stat-icon" />
              <span className="stat-value">{stats.branches}</span>
              <span className="stat-label">Branches</span>
            </div>
          )}
          {stats.contributors !== null && (
            <div className="stat-item">
              <FontAwesomeIcon icon={faUsers} className="stat-icon" />
              <span className="stat-value">{stats.contributors}</span>
              <span className="stat-label">Contributors</span>
            </div>
          )}
        </div>

        {/* Action Links */}
        <div className="project-actions">
          {links.github && (
            <a href={links.github} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="action-btn">
                <FontAwesomeIcon icon={faGithub} />
                <span className="action-text">GitHub</span>
              </Button>
            </a>
          )}
          {links.liveDemo && (
            <a href={links.liveDemo} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="action-btn">
                <FontAwesomeIcon icon={faExternalLinkAlt} />
                <span className="action-text">Demo</span>
              </Button>
            </a>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

export default ProjectCard;
