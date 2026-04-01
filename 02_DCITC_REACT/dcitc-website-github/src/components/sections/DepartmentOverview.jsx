import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCode, 
  faTerminal, 
  faRobot, 
  faPalette, 
  faShieldHalved,
  faArrowRight 
} from '@fortawesome/free-solid-svg-icons';
import { SectionHeader, GlassCard, Button } from '../common';
import { departments } from '../../data/departments';
import './DepartmentOverview.css';

// Icon mapping for Font Awesome
const iconMap = {
  'fa-solid fa-code': faCode,
  'fa-solid fa-terminal': faTerminal,
  'fa-solid fa-robot': faRobot,
  'fa-solid fa-palette': faPalette,
  'fa-solid fa-shield-halved': faShieldHalved,
};

/**
 * DepartmentOverview - Simplified grid of department cards for homepage
 */
function DepartmentOverview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className="department-overview-section" id="departments-overview">
      <div className="department-overview-container">
        <SectionHeader
          title="Our Departments"
          subtitle="Explore specialized domains where innovation meets expertise"
          alignment="center"
        />

        <motion.div
          className="departments-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {departments.map((dept, index) => (
            <GlassCard
              key={dept.id}
              className="department-card"
              delay={index * 0.1}
              style={{ '--dept-color': 'var(--primary-color)' }}
            >
              {/* Icon */}
              <div className="dept-icon-wrapper">
                <div className="dept-icon-bg" />
                <FontAwesomeIcon
                  icon={iconMap[dept.icon] || faCode}
                  className="dept-icon"
                />
              </div>

              {/* Content */}
              <h3 className="dept-name">{dept.name}</h3>
              <p className="dept-tagline">{dept.tagline}</p>

              {/* Hover Glow Effect */}
              <div className="dept-glow" aria-hidden="true" />
            </GlassCard>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          className="departments-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link to="/departments">
            <Button variant="outline" icon="fa-solid fa-arrow-right">
              View All Departments
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default DepartmentOverview;
