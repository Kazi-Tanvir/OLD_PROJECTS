import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import EventCard from '../../common/EventCard';
import './EventGrid.css';

/**
 * EventGrid Component
 * Grid view container for displaying events
 * 
 * @param {Array} events - Array of event objects
 * @param {Function} onEventClick - Handler for event click to open modal
 */
const EventGrid = ({ events, onEventClick }) => {
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  // Empty state when no events match
  if (!events || events.length === 0) {
    return (
      <motion.div 
        className="events-empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="empty-state-icon">
          <FontAwesomeIcon icon={faCalendarXmark} />
        </div>
        <h3 className="empty-state-title">No Events Found</h3>
        <p className="empty-state-text">
          No events found matching your criteria. Try adjusting your search or filters.
        </p>
        <div className="empty-state-suggestions">
          <span className="suggestion-label">Suggestions:</span>
          <ul>
            <li>Check your spelling</li>
            <li>Try broader search terms</li>
            <li>Clear filters to see all events</li>
          </ul>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="events-grid-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Results Count */}
      <div className="events-results-header">
        <span className="results-count">
          <FontAwesomeIcon icon={faSearch} />
          {events.length} {events.length === 1 ? 'event' : 'events'} found
        </span>
      </div>

      {/* Events Grid */}
      <AnimatePresence mode="popLayout">
        <div className="events-grid">
          {events.map((event, index) => (
            <EventCard 
              key={event.id} 
              event={event} 
              index={index} 
              onClick={() => onEventClick && onEventClick(event)}
            />
          ))}
        </div>
      </AnimatePresence>
    </motion.div>
  );
};

export default EventGrid;
