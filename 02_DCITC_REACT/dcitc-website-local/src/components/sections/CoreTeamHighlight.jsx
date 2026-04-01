import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCircleCheck, faUserPlus, faUsers, faComments, faTimes, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { SectionHeader, Button } from '../common';
import { executiveSessions } from '../../data/executives';
import './CoreTeamHighlight.css';

/**
 * CoreTeamHighlight - Display core executive team for homepage
 * Card design: Profile image at top, name with verified badge, bio, stats, follow button
 * Modal: Full member details on click
 */
function CoreTeamHighlight() {
  const [selectedMember, setSelectedMember] = useState(null);

  // Filter for Core Executive Team members (top 4)
  const coreTeam = useMemo(() => {
    return executiveSessions['2026']
      .filter((member) => member.department === 'Core Team')
      .slice(0, 4);
  }, []);

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="core-team-section" id="core-team">
      <div className="core-team-container">
        <SectionHeader
          title="Meet Our Leaders"
          subtitle="The passionate individuals driving DCITC's mission forward"
          alignment="center"
        />

        <motion.div
          className="team-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {coreTeam.map((member, index) => (
            <motion.div
              key={member.id}
              className="team-card"
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              onClick={() => setSelectedMember(member)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedMember(member)}
            >
              {/* Member Image - Large at top */}
              <div className="member-image-wrapper">
                <img
                  src={member.image}
                  alt={member.name}
                  className="member-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `https://placehold.co/400x400/1a1a1a/00b4db?text=${encodeURIComponent(member.name.split(' ')[0])}`;
                  }}
                />
              </div>

              {/* Member Info */}
              <div className="member-info">
                <div className="member-name-row">
                  <h3 className="member-name">{member.name}</h3>
                  <FontAwesomeIcon 
                    icon={faCircleCheck} 
                    className="verified-badge" 
                  />
                </div>
                <span className="member-position">{member.position}</span>
                <p className="member-bio">{member.bio}</p>
              </div>

              {/* View Profile Button */}
              <motion.button
                className="follow-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMember(member);
                }}
              >
                <span>View Profile</span>
                <FontAwesomeIcon icon={faUserPlus} />
              </motion.button>

              {/* Social Links on hover */}
              <div className="social-hover-links">
                {member.socials.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={`${member.name} on LinkedIn`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                )}
                {member.socials.github && (
                  <a
                    href={member.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={`${member.name} on GitHub`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          className="team-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link to="/executives">
            <Button variant="outline" icon="fa-solid fa-arrow-right">
              Meet the Full Team
            </Button>
          </Link>
        </motion.div>

        {/* Member Modal */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              className="member-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
            >
              <motion.div
                className="member-modal"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="modal-close-btn"
                  onClick={() => setSelectedMember(null)}
                  aria-label="Close modal"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>

                <div className="modal-content">
                  <div className="modal-image-wrapper">
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="modal-image"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/400x400/1a1a1a/00b4db?text=${encodeURIComponent(selectedMember.name.split(' ')[0])}`;
                      }}
                    />
                  </div>

                  <div className="modal-details">
                    <div className="modal-name-row">
                      <h2 className="modal-name">{selectedMember.name}</h2>
                      <FontAwesomeIcon icon={faCircleCheck} className="verified-badge" />
                    </div>
                    <span className="modal-position">{selectedMember.position}</span>
                    <p className="modal-bio">{selectedMember.bio}</p>

                    <div className="modal-stats">
                      <div className="modal-stat">
                        <FontAwesomeIcon icon={faUsers} />
                        <span>312 Connections</span>
                      </div>
                      <div className="modal-stat">
                        <FontAwesomeIcon icon={faComments} />
                        <span>48 Projects</span>
                      </div>
                    </div>

                    <div className="modal-social-links">
                      {selectedMember.socials.linkedin && (
                        <a
                          href={selectedMember.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="modal-social-btn linkedin"
                        >
                          <FontAwesomeIcon icon={faLinkedin} />
                          <span>LinkedIn</span>
                        </a>
                      )}
                      {selectedMember.socials.github && (
                        <a
                          href={selectedMember.socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="modal-social-btn github"
                        >
                          <FontAwesomeIcon icon={faGithub} />
                          <span>GitHub</span>
                        </a>
                      )}
                      {selectedMember.socials.email && (
                        <a
                          href={`mailto:${selectedMember.socials.email}`}
                          className="modal-social-btn email"
                        >
                          <FontAwesomeIcon icon={faEnvelope} />
                          <span>Email</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default CoreTeamHighlight;
