import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { eventsData } from '../data/events';
import SectionHeader from '../components/common/SectionHeader';
import EventModal from '../components/common/EventModal';
import FeaturedEvent from '../components/sections/events/FeaturedEvent';
import EventControls from '../components/sections/events/EventControls';
import EventGrid from '../components/sections/events/EventGrid';
import EventCalendar from '../components/sections/events/EventCalendar';
import './Events.css';

/**
 * Events Page - Complete Assembly
 * Features: Featured event with countdown, search/filter controls, grid/calendar views
 */
function Events() {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // "grid" or "calendar"
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Get the main featured event (Tech Fest 2026)
  const featuredEvent = useMemo(() => {
    return eventsData.find(e => e.isMainFeatured) || eventsData.find(e => e.isFeatured);
  }, []);

  // Filter events based on search and category
  const filteredEvents = useMemo(() => {
    return eventsData.filter(event => {
      // Exclude the main featured event from the grid
      if (event.isMainFeatured) return false;

      // Category filter
      const categoryMatch = activeCategory === 'all' || event.category === activeCategory;

      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const searchMatch = !searchQuery || 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower) ||
        event.category.toLowerCase().includes(searchLower);

      return categoryMatch && searchMatch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="page events-page">
      <div className="events-container">
        <SectionHeader 
          title="Upcoming Events" 
          subtitle="Discover and register for our latest technical gatherings" 
        />

        {/* Featured Event Highlight */}
        {featuredEvent && (
          <FeaturedEvent event={featuredEvent} />
        )}

        {/* Search, Filter, and View Controls */}
        <EventControls 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Events Grid / Calendar View */}
        <div className="events-view-container">
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <EventGrid 
                key="grid" 
                events={filteredEvents} 
                onEventClick={setSelectedEvent}
              />
            ) : (
              <EventCalendar 
                key="calendar" 
                events={filteredEvents} 
                onEventClick={setSelectedEvent}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Events;
