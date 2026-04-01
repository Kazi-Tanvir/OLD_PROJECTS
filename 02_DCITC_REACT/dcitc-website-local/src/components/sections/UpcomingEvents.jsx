import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarDays, 
  faLocationDot, 
  faArrowRight,
  faVideo,
  faBuilding
} from '@fortawesome/free-solid-svg-icons';
import { SectionHeader, GlassCard, Button } from '../common';
import { eventsData } from '../../data/events';
import './UpcomingEvents.css';

// Category color mapping
const categoryColors = {
  Conference: '#00b4db',
  Workshop: '#f39c12',
  Webinar: '#27ae60',
  Meetup: '#9b59b6',
};

/**
 * UpcomingEvents - Showcase of upcoming events for homepage
 */
function UpcomingEvents() {
  // Get upcoming events sorted by date (assuming events are in the future)
  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return eventsData
      .filter((event) => new Date(event.dateISO) >= now)
      .sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO))
      .slice(0, 3);
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

  return (
    <section className="upcoming-events-section" id="upcoming-events">
      <div className="upcoming-events-container">
        <SectionHeader
          title="Upcoming Events"
          subtitle="Don't miss out on our exciting upcoming events and workshops"
          alignment="center"
        />

        <motion.div
          className="events-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {upcomingEvents.map((event, index) => (
            <GlassCard
              key={event.id}
              className="event-card"
              delay={index * 0.1}
              style={{ '--category-color': categoryColors[event.category] || '#00b4db' }}
            >
              {/* Event Image */}
              <div className="event-image-wrapper">
                <img
                  src={event.imagePlaceholder}
                  alt={event.title}
                  className="event-image"
                  loading="lazy"
                />
                {/* Category Badge */}
                <span className="event-category">{event.category}</span>
                {/* Featured Badge */}
                {event.isFeatured && (
                  <span className="featured-badge">Featured</span>
                )}
                {/* Date Overlay */}
                <div className="event-date-overlay">
                  <FontAwesomeIcon icon={faCalendarDays} />
                  <span>{event.date}</span>
                </div>
              </div>

              {/* Event Content */}
              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>

                {/* Event Meta */}
                <div className="event-meta">
                  <div className="meta-item">
                    <FontAwesomeIcon
                      icon={event.isVirtual ? faVideo : faBuilding}
                    />
                    <span>{event.location}</span>
                  </div>
                  <span className={`price-badge ${event.priceType.toLowerCase()}`}>
                    {event.priceType}
                  </span>
                </div>

                {/* Register Button */}
                <motion.button
                  className="event-register-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Register Now
                  <FontAwesomeIcon icon={faArrowRight} />
                </motion.button>
              </div>
            </GlassCard>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          className="events-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link to="/events">
            <Button variant="outline" icon="fa-solid fa-arrow-right">
              View All Events
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default UpcomingEvents;
