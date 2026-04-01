import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faCalendarAlt,
  faUsers,
  faUserGraduate,
  faFolder,
  faCode,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { timelineData, journeyStats } from '../../../data/about';
import './Timeline.css';

/**
 * Timeline - Interactive journey timeline with sidebar navigation
 * Features auto-scroll, clickable dates, and stats panel
 */
function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timelineRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Get icon component from string
  const getIcon = (iconClass) => {
    const iconMap = {
      'fa-solid fa-flag': faCalendarAlt,
      'fa-solid fa-trophy': faCalendarAlt,
      'fa-solid fa-code': faCode,
      'fa-solid fa-laptop-code': faCode,
      'fa-solid fa-award': faCalendarAlt,
      'fa-solid fa-handshake': faUsers,
      'fa-solid fa-chart-line': faCalendarAlt,
    };
    return iconMap[iconClass] || faCalendarAlt;
  };

  // Auto-play through timeline
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % timelineData.length);
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  // Pause auto-play on user interaction
  const handleTimelineClick = (index) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + timelineData.length) % timelineData.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % timelineData.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentEvent = timelineData[activeIndex];

  return (
    <div className="journey-timeline" ref={timelineRef}>
      {/* Left Sidebar - Timeline Navigation */}
      <div className="timeline-sidebar">
        <div className="timeline-track">
          <div className="timeline-line-vertical" />
          {timelineData.map((event, index) => (
            <button
              key={event.id}
              className={`timeline-marker ${index === activeIndex ? 'active' : ''} ${
                index < activeIndex ? 'passed' : ''
              }`}
              onClick={() => handleTimelineClick(index)}
            >
              <div className="marker-dot" />
              <div className="marker-info">
                <span className="marker-year">{event.year}</span>
                <span className="marker-date">{event.date}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="timeline-content-area">
        {/* Navigation Header */}
        <div className="timeline-nav-header">
          <button
            className="nav-arrow"
            onClick={goToPrevious}
            aria-label="Previous event"
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
          <button
            className="nav-arrow"
            onClick={goToNext}
            aria-label="Next event"
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          <div className="current-date-display">
            <span className="display-year">{currentEvent.year}</span>
            <span className="display-date">{currentEvent.date}</span>
          </div>
        </div>

        {/* Event Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEvent.id}
            className="event-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="event-title">{currentEvent.milestone}</h3>
            <p className="event-description">{currentEvent.description}</p>

            {/* Event Visual/Icon Area */}
            <div className="event-visual">
              <div className="event-icon-container">
                <FontAwesomeIcon
                  icon={getIcon(currentEvent.icon)}
                  className="event-icon"
                />
              </div>
              <div className="event-visual-decoration">
                <div className="decoration-circle" />
                <div className="decoration-circle" />
                <div className="decoration-circle" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicator */}
        <div className="timeline-progress">
          {timelineData.map((_, index) => (
            <button
              key={index}
              className={`progress-dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => handleTimelineClick(index)}
              aria-label={`Go to event ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right Sidebar - Stats Panel */}
      <div className="timeline-stats-panel">
        {/* Events Card */}
        <div className="stats-card events-card">
          <div className="stats-card-header">
            <FontAwesomeIcon icon={faCalendarAlt} className="stats-icon" />
            <div>
              <span className="stats-title">Events</span>
              <span className="stats-subtitle">Organized by DCITC</span>
            </div>
          </div>
          <div className="stats-large-number">{journeyStats.totalEvents}</div>
          <span className="stats-label">Total Events</span>
          <div className="stats-breakdown">
            <div className="breakdown-item">
              <span className="breakdown-label">Intra Events</span>
              <span className="breakdown-value">{journeyStats.intraEvents}</span>
            </div>
            <div className="breakdown-item">
              <span className="breakdown-label">National Events</span>
              <span className="breakdown-value">{journeyStats.nationalEvents}</span>
            </div>
          </div>
        </div>

        {/* Members Stats */}
        <div className="stats-row">
          <div className="stats-mini-card members-card">
            <FontAwesomeIcon icon={faUsers} className="mini-icon" />
            <span className="mini-label">Total Members</span>
            <span className="mini-value">{journeyStats.totalMembers}+</span>
            <span className="mini-subtitle mobile-only">Active in DCITC</span>
            <div className="mini-divider mobile-only" />
            <span className="mini-extra mobile-only">Growing Strong</span>
          </div>
          <div className="stats-mini-card">
            <FontAwesomeIcon icon={faUserGraduate} className="mini-icon" />
            <span className="mini-label">Total Alumni</span>
            <span className="mini-value">{journeyStats.totalAlumni}+</span>
          </div>
        </div>

        {/* Years Circle */}
        <div className="years-circle">
          <svg viewBox="0 0 100 100" className="circle-svg">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(0, 180, 219, 0.2)"
              strokeWidth="4"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="var(--primary-color)"
              strokeWidth="4"
              strokeDasharray={`${(journeyStats.yearsOfJourney / 10) * 283} 283`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="circle-content">
            <span className="circle-number">{journeyStats.yearsOfJourney}</span>
            <span className="circle-label">Years</span>
            <span className="circle-sublabel">of journey</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="timeline-bottom-bar">
        <div className="panelists-count">
          <FontAwesomeIcon icon={faFolder} className="panelists-icon" />
          <span className="panelists-label">Total Panelists</span>
          <span className="panelists-value">{journeyStats.totalPanelists}</span>
        </div>
        <div className="bottom-actions">
          <Link to="/executives" className="action-btn">
            <FontAwesomeIcon icon={faFolder} />
            <span>See Executives</span>
          </Link>
          <Link to="/projects" className="action-btn primary">
            <FontAwesomeIcon icon={faCode} />
            <span>Explore Developers</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Timeline;
