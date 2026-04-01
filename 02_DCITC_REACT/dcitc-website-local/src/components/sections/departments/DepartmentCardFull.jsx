import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCode,
  faTerminal,
  faRobot,
  faPalette,
  faShieldHalved,
  faFolder,
  faUsers,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import GlassCard from '../../common/GlassCard';
import './DepartmentCardFull.css';

/**
 * CountUpNumber - Animated number counter component
 */
function CountUpNumber({ targetValue, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView || targetValue === null) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * targetValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, targetValue, duration]);

  if (targetValue === null) return <span ref={ref}>-</span>;

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

/**
 * DepartmentCardFull - Detailed department card with animated stats
 * 
 * @param {Object} department - Department data object
 */
function DepartmentCardFull({ department }) {
  const {
    name,
    icon,
    tagline,
    description,
    stats,
    techStack,
    isFeatured,
    color,
  } = department;

  // Icon mapping from Font Awesome class string to icon object
  const getIconComponent = (iconClass) => {
    const iconMap = {
      'fa-solid fa-code': faCode,
      'fa-solid fa-terminal': faTerminal,
      'fa-solid fa-robot': faRobot,
      'fa-solid fa-palette': faPalette,
      'fa-solid fa-shield-halved': faShieldHalved,
    };
    return iconMap[iconClass] || faCode;
  };

  // Get stat label and icon based on key
  const getStatConfig = (key) => {
    const configs = {
      projects: { label: 'Projects', icon: faFolder },
      members: { label: 'Members', icon: faUsers },
      awards: { label: 'Awards', icon: faTrophy },
      contests: { label: 'Contests', icon: faTrophy },
      medals: { label: 'Medals', icon: faTrophy },
      competitions: { label: 'Competitions', icon: faTrophy },
      exhibitions: { label: 'Exhibitions', icon: faTrophy },
      ctfWins: { label: 'CTF Wins', icon: faTrophy },
    };
    return configs[key] || { label: key, icon: faFolder };
  };

  return (
    <GlassCard 
      className={`department-card-full ${isFeatured ? 'featured' : ''}`}
      style={{ '--dept-color': color }}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <span className="featured-badge">Featured</span>
      )}

      {/* Header */}
      <div className="dept-header">
        <div className="dept-icon-wrapper" style={{ background: `${color}20`, borderColor: `${color}40` }}>
          <FontAwesomeIcon 
            icon={getIconComponent(icon)} 
            className="dept-icon"
            style={{ color }}
          />
        </div>
        <div className="dept-title-group">
          <h3 className="dept-name">{name}</h3>
          <p className="dept-tagline">{tagline}</p>
        </div>
      </div>

      {/* Description */}
      <p className="dept-description">{description}</p>

      {/* Stats Row */}
      <div className="dept-stats">
        {Object.entries(stats).map(([key, value]) => {
          const config = getStatConfig(key);
          return (
            <div key={key} className="stat-item">
              <FontAwesomeIcon icon={config.icon} className="stat-icon" style={{ color }} />
              <span className="stat-value">
                <CountUpNumber targetValue={value} />
              </span>
              <span className="stat-label">{config.label}</span>
            </div>
          );
        })}
      </div>

      {/* Tech Stack */}
      <div className="dept-tech-stack">
        {techStack.map((tech, index) => (
          <span 
            key={index} 
            className="tech-tag"
            style={{ 
              background: `${color}15`,
              borderColor: `${color}30`,
              color: color 
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </GlassCard>
  );
}

export default DepartmentCardFull;
