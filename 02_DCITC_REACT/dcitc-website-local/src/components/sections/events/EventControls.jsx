import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMagnifyingGlass, 
  faBorderAll, 
  faCalendar 
} from '@fortawesome/free-solid-svg-icons';
import { eventCategories } from '../../../data/events';
import './EventControls.css';

/**
 * Event Controls Component
 * Search, filter, and view mode controls for events
 */
const EventControls = ({ 
  searchQuery, 
  setSearchQuery, 
  activeCategory, 
  setActiveCategory, 
  viewMode, 
  setViewMode 
}) => {
  return (
    <div className="event-controls">
      {/* Search Input */}
      <div className="search-wrapper">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button 
            className="search-clear"
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className="category-filters">
        {eventCategories.map((category) => (
          <button
            key={category.id}
            className={`filter-btn ${activeCategory === category.value ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.value)}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* View Mode Toggle */}
      <div className="view-toggle">
        <button
          className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
          onClick={() => setViewMode('grid')}
          aria-label="Grid view"
        >
          <FontAwesomeIcon icon={faBorderAll} />
        </button>
        <button
          className={`view-btn ${viewMode === 'calendar' ? 'active' : ''}`}
          onClick={() => setViewMode('calendar')}
          aria-label="Calendar view"
        >
          <FontAwesomeIcon icon={faCalendar} />
        </button>
      </div>
    </div>
  );
};

export default EventControls;
