import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DateTime } from 'luxon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronLeft, 
  faChevronRight, 
  faCalendarDay,
  faCircle
} from '@fortawesome/free-solid-svg-icons';
import './EventCalendar.css';

/**
 * EventCalendar Component
 * Calendar view for displaying events by date
 * 
 * @param {Array} events - Array of event objects
 * @param {Function} onEventClick - Handler for event click to open modal
 */
const EventCalendar = ({ events, onEventClick }) => {
  // Current viewing month state
  const [currentDate, setCurrentDate] = useState(DateTime.now());

  // Navigation handlers
  const goToPrevMonth = () => {
    setCurrentDate(currentDate.minus({ months: 1 }));
  };

  const goToNextMonth = () => {
    setCurrentDate(currentDate.plus({ months: 1 }));
  };

  const goToToday = () => {
    setCurrentDate(DateTime.now());
  };

  // Generate calendar data
  const calendarData = useMemo(() => {
    const startOfMonth = currentDate.startOf('month');
    const endOfMonth = currentDate.endOf('month');
    const startDay = startOfMonth.weekday; // 1 = Monday, 7 = Sunday
    
    // Adjust for Sunday start (make Sunday = 0)
    const startOffset = startDay === 7 ? 0 : startDay;
    
    const daysInMonth = endOfMonth.day;
    const weeks = [];
    let currentWeek = [];

    // Add empty cells for days before the month starts
    for (let i = 0; i < startOffset; i++) {
      currentWeek.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = currentDate.set({ day });
      const dateISO = date.toISODate();
      
      // Find events for this day
      const dayEvents = events.filter(event => {
        const eventStart = event.dateISO;
        const eventEnd = event.endDateISO || event.dateISO;
        return dateISO >= eventStart && dateISO <= eventEnd;
      });

      currentWeek.push({
        day,
        date,
        dateISO,
        events: dayEvents,
        isToday: date.hasSame(DateTime.now(), 'day'),
        isPast: date < DateTime.now().startOf('day'),
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Fill remaining cells in the last week
    while (currentWeek.length > 0 && currentWeek.length < 7) {
      currentWeek.push(null);
    }
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
    }

    return weeks;
  }, [currentDate, events]);

  // Count events in current month
  const monthEventCount = useMemo(() => {
    return events.filter(event => {
      const eventDate = DateTime.fromISO(event.dateISO);
      return eventDate.hasSame(currentDate, 'month');
    }).length;
  }, [events, currentDate]);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <motion.div
      className="events-calendar-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Calendar Header */}
      <div className="calendar-header">
        <div className="calendar-title">
          <h3>{currentDate.toFormat('MMMM yyyy')}</h3>
          <span className="month-event-count">
            {monthEventCount} {monthEventCount === 1 ? 'event' : 'events'}
          </span>
        </div>
        <div className="calendar-nav">
          <button 
            className="calendar-nav-btn" 
            onClick={goToPrevMonth}
            aria-label="Previous month"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button 
            className="calendar-today-btn" 
            onClick={goToToday}
          >
            <FontAwesomeIcon icon={faCalendarDay} />
            Today
          </button>
          <button 
            className="calendar-nav-btn" 
            onClick={goToNextMonth}
            aria-label="Next month"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {/* Week Day Headers */}
        <div className="calendar-weekdays">
          {weekDays.map((day) => (
            <div key={day} className="weekday-header">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="calendar-days">
          {calendarData.map((week, weekIndex) => (
            <div key={weekIndex} className="calendar-week">
              {week.map((dayData, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`calendar-day ${
                    dayData === null ? 'empty' : ''
                  } ${dayData?.isToday ? 'today' : ''} ${
                    dayData?.isPast ? 'past' : ''
                  } ${dayData?.events?.length > 0 ? 'has-events' : ''}`}
                >
                  {dayData && (
                    <>
                      <span className="day-number">{dayData.day}</span>
                      
                      {/* Event Indicators */}
                      {dayData.events.length > 0 && (
                        <div className="day-events">
                          {dayData.events.slice(0, 2).map((event) => (
                            <button 
                              key={event.id} 
                              className={`day-event-item ${event.category.toLowerCase()}`}
                              title={event.title}
                              onClick={(e) => {
                                e.stopPropagation();
                                onEventClick && onEventClick(event);
                              }}
                            >
                              <span className="event-dot">
                                <FontAwesomeIcon icon={faCircle} />
                              </span>
                              <span className="event-name desktop-name">{event.title}</span>
                              <span className="event-name mobile-name">{event.category}</span>
                            </button>
                          ))}
                          {dayData.events.length > 2 && (
                            <div className="more-events">
                              +{dayData.events.length - 2} more
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-dot conference"></span>
          <span>Conference</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot workshop"></span>
          <span>Workshop</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot webinar"></span>
          <span>Webinar</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot meetup"></span>
          <span>Meetup</span>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCalendar;
