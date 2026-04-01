import { GlassCard } from './index';
import './ExecutiveCard.css';

/**
 * ExecutiveCard - Individual profile card for executive members
 * 
 * @param {Object} executive - Executive data object
 * @param {Function} onClick - Click handler to open modal
 * @param {number} delay - Animation delay for staggering
 */
function ExecutiveCard({ executive, onClick, delay = 0 }) {
  return (
    <GlassCard
      className="executive-card"
      delay={delay}
      onClick={() => onClick(executive)}
      style={{ cursor: 'pointer' }}
    >
      {/* Image Container */}
      <div className="executive-card-image-container">
        <img
          src={executive.image}
          alt={executive.name}
          className="executive-card-image"
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://placehold.co/400x400/1a1a1a/00b4db?text=${encodeURIComponent(executive.name.split(' ')[0])}`;
          }}
        />
        <div className="executive-card-image-overlay">
          <span className="executive-card-view-text">View Profile</span>
        </div>
      </div>

      {/* Info Section */}
      <div className="executive-card-info">
        <h3 className="executive-card-name">{executive.name}</h3>
        <p className="executive-card-position">{executive.position}</p>
        <p className="executive-card-department">{executive.department}</p>
      </div>
    </GlassCard>
  );
}

export default ExecutiveCard;
