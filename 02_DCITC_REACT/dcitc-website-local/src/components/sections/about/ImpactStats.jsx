import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faCode,
  faCalendarCheck,
  faHandshake,
} from '@fortawesome/free-solid-svg-icons';
import { impactStats } from '../../../data/about';
import './ImpactStats.css';

// Icon mapping
const iconMap = {
  'fa-solid fa-users': faUsers,
  'fa-solid fa-code': faCode,
  'fa-solid fa-calendar-check': faCalendarCheck,
  'fa-solid fa-handshake': faHandshake,
};

/**
 * StatCard - Individual stat with count-up animation
 */
function StatCard({ stat, isInView, delay }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = stat.value / steps;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          setCount(stat.value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(increment * currentStep));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isInView, stat.value]);

  const icon = iconMap[stat.icon] || faUsers;

  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <div className="stat-icon-wrapper">
        <FontAwesomeIcon icon={icon} className="stat-icon" />
      </div>
      <div className="stat-value">
        {count}
        {stat.suffix && <span className="stat-suffix">{stat.suffix}</span>}
      </div>
      <div className="stat-label">{stat.label}</div>
    </motion.div>
  );
}

/**
 * ImpactStats - Grid of animated statistics
 * Uses count-up animation triggered by scroll visibility
 */
function ImpactStats() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <div className="impact-stats-section" ref={containerRef}>
      <div className="stats-grid">
        {impactStats.map((stat, index) => (
          <StatCard
            key={stat.id}
            stat={stat}
            isInView={isInView}
            delay={index * 0.15}
          />
        ))}
      </div>
    </div>
  );
}

export default ImpactStats;
