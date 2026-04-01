import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarDays, 
  faLocationDot, 
  faTag,
  faGlobe,
  faBuilding,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import GlassCard from './GlassCard';
import Button from './Button';
import './EventCard.css';

/**
 * EventCard Component
 * Horizontal layout on mobile, vertical on desktop
 * 
 * @param {Object} event - Event data object
 * @param {number} index - Index for staggered animations
 * @param {Function} onClick - Click handler for opening modal
 */
const EventCard = ({ event, index = 0, onClick }) => {
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

  // Status badge styling
  const getStatusBadge = (status) => {
    const badges = {
      'past': { text: 'Completed', className: 'status-past', shortText: 'Done' },
      'ongoing': { text: 'Happening Now', className: 'status-ongoing', shortText: 'Live' },
      'upcoming': { text: 'Upcoming', className: 'status-upcoming', shortText: 'Soon' },
    };
    return badges[status] || badges['upcoming'];
  };

  const statusBadge = getStatusBadge(event.status);

  return (
    <motion.div
      className="event-card-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      layout
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <GlassCard className="ev-card-item" style={{ padding: 0 }}>
        {/* Image Section */}
        <div className="ev-card-image">
          <img 
            src={event.imagePlaceholder} 
            alt={event.title}
            loading="lazy"
          />
          <div className="ev-card-overlay" />
          
          {/* Status Badge */}
          <span className={`ev-status-badge ${statusBadge.className}`}>
            <span className="badge-short">{statusBadge.shortText}</span>
            <span className="badge-full">{statusBadge.text}</span>
          </span>

          {/* Category Badge */}
          <span 
            className="ev-category-tag"
            style={{ backgroundColor: getCategoryColor(event.category) }}
          >
            {event.category}
          </span>

          {/* Price Badge */}
          <span className={`ev-price-badge ${event.priceType.toLowerCase()}`}>
            {event.priceType}
          </span>
        </div>

        {/* Content Section */}
        <div className="ev-card-content">
          {/* Date & Category Row */}
          <div className="ev-card-date">
            <FontAwesomeIcon icon={faCalendarDays} />
            <span>{event.date}</span>
            {/* Category shown inline on mobile */}
            <span 
              className="ev-category-inline"
              style={{ backgroundColor: getCategoryColor(event.category) }}
            >
              {event.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="ev-card-title">{event.title}</h3>

          {/* Location */}
          <div className="ev-card-location">
            <FontAwesomeIcon icon={event.isVirtual ? faGlobe : faLocationDot} />
            <span>{event.location}</span>
          </div>

          {/* Description */}
          <p className="ev-card-description">{event.description}</p>

          {/* Tags Row */}
          <div className="ev-card-tags">
            {event.isVirtual && (
              <span className="ev-tag virtual">
                <FontAwesomeIcon icon={faGlobe} /> Virtual
              </span>
            )}
            {!event.isVirtual && (
              <span className="ev-tag in-person">
                <FontAwesomeIcon icon={faBuilding} /> In-Person
              </span>
            )}
            {event.isFeatured && (
              <span className="ev-tag featured">
                <FontAwesomeIcon icon={faTag} /> Featured
              </span>
            )}
          </div>

          {/* Action Button */}
          <div className="ev-card-actions">
            <Button 
              variant="outline" 
              className="ev-card-btn"
              onClick={(e) => {
                e.stopPropagation();
                onClick && onClick();
              }}
            >
              <span className="btn-text">View Details</span>
              <FontAwesomeIcon icon={faArrowRight} className="btn-icon-mobile" />
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default EventCard;
