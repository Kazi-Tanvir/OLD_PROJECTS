import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../components/common/SectionHeader';
import DepartmentCardFull from '../components/sections/departments/DepartmentCardFull';
import { departments, departmentFilters } from '../data/departments';
import './Departments.css';

/**
 * Departments - Departments page with category filtering
 */
function Departments() {
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter departments based on active filter
  const filteredDepartments = useMemo(() => {
    if (activeFilter === 'all') {
      return departments;
    }
    return departments.filter(dept => dept.id === activeFilter);
  }, [activeFilter]);

  return (
    <div className="page departments-page">
      {/* Section Header */}
      <SectionHeader
        title="Our Departments"
        subtitle="Explore our specialized departments where innovation meets expertise"
      />

      {/* Filter Bar */}
      <div className="filter-bar">
        {departmentFilters.map((filter) => (
          <button
            key={filter.id}
            className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Departments Grid */}
      <div className="departments-grid">
        <AnimatePresence mode="popLayout">
          {filteredDepartments.map((department) => (
            <motion.div
              key={department.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <DepartmentCardFull department={department} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredDepartments.length === 0 && (
        <div className="empty-state">
          <p>No departments found.</p>
        </div>
      )}
    </div>
  );
}

export default Departments;
