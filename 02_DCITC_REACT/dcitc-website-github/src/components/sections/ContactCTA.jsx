import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { contactInfo } from '../../data/siteMeta';
import './ContactCTA.css';

/**
 * ContactCTA - Final call-to-action section
 */
function ContactCTA() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="contact-cta-section" id="contact-cta">
      {/* Decorative Background Elements */}
      <div className="cta-background" aria-hidden="true">
        <div className="glow-orb orb-1" />
        <div className="glow-orb orb-2" />
        <div className="grid-overlay" />
      </div>

      <div className="contact-cta-container">
        <motion.div
          className="cta-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Main CTA */}
          <motion.div className="cta-header" variants={itemVariants}>
            <span className="cta-badge">Join Our Community</span>
            <h2 className="cta-title">Ready to Shape the Future?</h2>
            <p className="cta-description">
              Become a part of DCITC and unlock opportunities to learn, innovate,
              and connect with fellow tech enthusiasts. Start your journey today!
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div className="cta-actions" variants={itemVariants}>
            <motion.a
              href="https://forms.google.com/dcitc-membership"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button primary"
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 180, 219, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Join DCITC Now</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </motion.a>
            <p className="membership-note">
              Annual membership: {contactInfo.membershipFee}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactCTA;
