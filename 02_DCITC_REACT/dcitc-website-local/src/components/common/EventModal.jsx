import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faCalendarDays,
  faClock,
  faLocationDot,
  faGlobe,
  faTag,
} from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import './EventModal.css';

/**
 * EventModal - Detailed event modal for viewing full event details
 * 
 * @param {Object} event - Event data object
 * @param {Function} onClose - Function to close the modal
 */
function EventModal({ event, onClose }) {
  // Lock body scroll and handle escape key
  useEffect(() => {
    // Lock scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Escape key handler
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!event) return null;

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Stop propagation on modal content click
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  // Category color mapping
  const getCategoryColor = (category) => {
    const colors = {
      'Conference': '#00b4db',
      'Workshop': '#f39c12',
      'Webinar': '#27ae60',
      'Meetup': '#9b59b6',
    };
    return colors[category] || '#00b4db';
  };

  // Handle register click
  const handleRegister = () => {
    console.log(`Registering for event: ${event.title}`);
    alert(`Registration initiated for: ${event.title}`);
  };

  return (
    <motion.div
      className="event-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
    >
      <motion.div
        className="event-modal-container"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={handleContentClick}
      >
        {/* Close Button */}
        <button
          className="event-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Header Image */}
        <div className="event-modal-image-section">
          <img
            src={event.imagePlaceholder}
            alt={event.title}
            className="event-modal-image"
            onError={(e) => {
              e.target.src = `https://placehold.co/800x400/1a1a1a/00b4db?text=${encodeURIComponent(event.title)}`;
            }}
          />
          <div className="event-modal-image-overlay" />
        </div>

        {/* Modal Content */}
        <div className="event-modal-content">
          {/* Tags Row */}
          <div className="event-modal-tags">
            <span 
              className="event-modal-category"
              style={{ backgroundColor: getCategoryColor(event.category) }}
            >
              <FontAwesomeIcon icon={faTag} />
              {event.category}
            </span>
            <span className={`event-modal-price ${event.priceType.toLowerCase()}`}>
              {event.priceType}
            </span>
          </div>

          {/* Title */}
          <h2 id="event-modal-title" className="event-modal-title">
            {event.title}
          </h2>

          {/* Event Details Grid */}
          <div className="event-modal-details">
            <div className="event-modal-detail-item">
              <FontAwesomeIcon icon={faCalendarDays} />
              <span>{event.date}</span>
            </div>
            {event.time && (
              <div className="event-modal-detail-item">
                <FontAwesomeIcon icon={faClock} />
                <span>{event.time}</span>
              </div>
            )}
            <div className="event-modal-detail-item">
              <FontAwesomeIcon icon={event.isVirtual ? faGlobe : faLocationDot} />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Divider */}
          <hr className="event-modal-divider" />

          {/* Description */}
          <div className="event-modal-description">
            <p>{event.description}</p>
          </div>

          {/* Footer Actions */}
          <div className="event-modal-actions">
            <Button 
              variant="primary" 
              onClick={handleRegister}
              icon="fa-solid fa-arrow-right"
            >
              Register Now
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default EventModal;
