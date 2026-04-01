import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarDays, 
  faLocationDot, 
  faTag,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import useCountdown from '../../../hooks/useCountdown';
import GlassCard from '../../common/GlassCard';
import Button from '../../common/Button';
import './FeaturedEvent.css';

/**
 * Featured Event Component
 * Displays a highlighted event with countdown timer
 */
const FeaturedEvent = ({ event }) => {
  // Use dateISO directly for reliable countdown parsing
  const countdownDate = event.dateISO || event.date;

  const { days, hours, minutes, seconds, isExpired } = useCountdown(countdownDate);

  // Format number with leading zero
  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <motion.div
      className="featured-event-wrapper"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <GlassCard className="featured-event-card">
        {/* Left Side - Image */}
        <div className="featured-event-image">
          <img 
            src={event.imagePlaceholder} 
            alt={event.title}
            loading="eager"
          />
          <div className="image-overlay" />
          {event.isFeatured && (
            <span className="featured-badge">
              <FontAwesomeIcon icon={faTag} />
              Featured
            </span>
          )}
        </div>

        {/* Right Side - Content */}
        <div className="featured-event-content">
          <span className="event-category-badge">{event.category}</span>
          
          <h2 className="event-title">{event.title}</h2>
          
          <p className="event-description">{event.description}</p>

          {/* Event Meta Info */}
          <div className="event-meta">
            <div className="meta-item">
              <FontAwesomeIcon icon={faCalendarDays} />
              <span>{event.date}</span>
            </div>
            <div className="meta-item">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{event.location}</span>
            </div>
            <div className="meta-item">
              <FontAwesomeIcon icon={faTag} />
              <span>{event.priceType}</span>
            </div>
          </div>

          {/* Countdown Timer */}
          {!isExpired && (
            <div className="countdown-section">
              <div className="countdown-label">
                <FontAwesomeIcon icon={faClock} />
                Event Starts In
              </div>
              <div className="countdown-grid">
                <div className="countdown-box">
                  <span className="countdown-value">{formatNumber(days)}</span>
                  <span className="countdown-unit">Days</span>
                </div>
                <div className="countdown-box">
                  <span className="countdown-value">{formatNumber(hours)}</span>
                  <span className="countdown-unit">Hours</span>
                </div>
                <div className="countdown-box">
                  <span className="countdown-value">{formatNumber(minutes)}</span>
                  <span className="countdown-unit">Minutes</span>
                </div>
                <div className="countdown-box">
                  <span className="countdown-value">{formatNumber(seconds)}</span>
                  <span className="countdown-unit">Seconds</span>
                </div>
              </div>
            </div>
          )}

          {isExpired && (
            <div className="event-expired-badge">
              <FontAwesomeIcon icon={faClock} />
              Event Has Started
            </div>
          )}

          {/* CTA Button */}
          <div className="featured-event-actions">
            <Button variant="primary">
              Register Now
            </Button>
            <Button variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default FeaturedEvent;
