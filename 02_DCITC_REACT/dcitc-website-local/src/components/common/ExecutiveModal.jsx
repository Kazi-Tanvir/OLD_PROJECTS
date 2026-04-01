import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faEnvelope,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedinIn,
  faGithub,
  faBehance,
  faDribbble,
  faTwitter,
  faFacebook,
  faInstagram,
  faYoutube,
  faResearchgate,
} from '@fortawesome/free-brands-svg-icons';
import './ExecutiveModal.css';

/**
 * ExecutiveModal - Detailed profile modal for executive members
 * 
 * @param {Object} executive - Executive data object
 * @param {Function} onClose - Function to close the modal
 */
function ExecutiveModal({ executive, onClose }) {
  if (!executive) return null;

  // Map social platform to icon - dynamically supports any platform in the data
  const getSocialIcon = (platform) => {
    const icons = {
      linkedin: faLinkedinIn,
      github: faGithub,
      behance: faBehance,
      dribbble: faDribbble,
      twitter: faTwitter,
      facebook: faFacebook,
      instagram: faInstagram,
      youtube: faYoutube,
      researchgate: faResearchgate,
      email: faEnvelope,
      website: faGlobe,
      portfolio: faGlobe,
    };
    return icons[platform.toLowerCase()] || faGlobe;
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="executive-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <motion.div
          className="executive-modal-container"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Close Button */}
          <button
            className="executive-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          {/* Modal Content */}
          <div className="executive-modal-content">
            {/* Left Section - Image */}
            <div className="executive-modal-image-section">
              <div className="executive-modal-image-wrapper">
                <img
                  src={executive.image}
                  alt={executive.name}
                  className="executive-modal-image"
                  onError={(e) => {
                    e.target.src = `https://placehold.co/400x400/1a1a1a/00b4db?text=${encodeURIComponent(executive.name.split(' ')[0])}`;
                  }}
                />
                <div className="executive-modal-image-glow" />
              </div>
            </div>

            {/* Right Section - Details */}
            <div className="executive-modal-details">
              <h2 id="modal-title" className="executive-modal-name">
                {executive.name}
              </h2>
              <p className="executive-modal-position">{executive.position}</p>
              <p className="executive-modal-department">{executive.department}</p>

              {/* Skills */}
              {executive.skills && executive.skills.length > 0 && (
                <div className="executive-modal-skills">
                  <h3 className="executive-modal-section-title">Skills</h3>
                  <div className="executive-modal-skills-list">
                    {executive.skills.map((skill, index) => (
                      <span key={index} className="executive-modal-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bio */}
              {executive.bio && (
                <div className="executive-modal-bio">
                  <h3 className="executive-modal-section-title">About</h3>
                  <p className="executive-modal-bio-text">{executive.bio}</p>
                </div>
              )}

              {/* Social Links */}
              {executive.socials && Object.keys(executive.socials).length > 0 && (
                <div className="executive-modal-socials">
                  <h3 className="executive-modal-section-title">Connect</h3>
                  <div className="executive-modal-social-links">
                    {Object.entries(executive.socials).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={platform === 'email' ? `mailto:${url}` : url}
                        target={platform === 'email' ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className="executive-modal-social-link"
                        aria-label={platform}
                        title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                      >
                        <FontAwesomeIcon icon={getSocialIcon(platform)} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ExecutiveModal;
