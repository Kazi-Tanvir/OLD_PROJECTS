import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faUsers, faFilter } from '@fortawesome/free-solid-svg-icons';
import { SectionHeader, ExecutiveCard, ExecutiveModal } from '../components/common';
import { executiveSessions, executiveDepartments, sessionLabels } from '../data/executives';
import './Executives.css';

function Executives() {
  // State management
  const [activeSession, setActiveSession] = useState('2026');
  const [activeDepartment, setActiveDepartment] = useState('All Departments');
  const [selectedMember, setSelectedMember] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedMember]);

  // Get current session data
  const currentSessionData = executiveSessions[activeSession] || [];

  // Filter executives by department
  const filteredExecutives = useMemo(() => {
    if (activeDepartment === 'All Departments') {
      return currentSessionData;
    }
    return currentSessionData.filter(
      (executive) => executive.department === activeDepartment
    );
  }, [currentSessionData, activeDepartment]);

  // Check if department filter should be shown (only for student sessions)
  const showDepartmentFilter = activeSession !== 'Faculty';

  // Handle session tab change
  const handleSessionChange = (session) => {
    setActiveSession(session);
    setActiveDepartment('All Departments');
  };

  // Handle department filter change
  const handleDepartmentChange = (department) => {
    setActiveDepartment(department);
  };

  // Handle card click
  const handleCardClick = (executive) => {
    setSelectedMember(executive);
  };

  // Handle modal close
  const handleModalClose = () => {
    setSelectedMember(null);
  };

  return (
    <div className="page executives-page">
      {/* Page Header */}
      <section className="executives-header">
        <SectionHeader
          title="Executive Team"
          subtitle="Meet the dedicated individuals who lead and manage DCITC"
        />
      </section>

      {/* Session Tabs */}
      <section className="executives-tabs-section">
        <div className="container">
          <div className="executives-tabs">
            {sessionLabels.map((session) => (
              <button
                key={session}
                className={`executives-tab ${activeSession === session ? 'active' : ''}`}
                onClick={() => handleSessionChange(session)}
              >
                <FontAwesomeIcon
                  icon={session === 'Faculty' ? faUserTie : faUsers}
                  className="executives-tab-icon"
                />
                <span>
                  {session === 'Faculty' ? 'Faculty Supervisors' : `Session ${session}`}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Department Filter - Only shown for student sessions */}
      <AnimatePresence mode="wait">
        {showDepartmentFilter && (
          <motion.section
            className="executives-filter-section"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container">
              <div className="executives-filter-header">
                <FontAwesomeIcon icon={faFilter} className="filter-icon" />
                <span>Filter by Department</span>
              </div>
              <div className="executives-filter-buttons">
                {executiveDepartments.map((department) => (
                  <button
                    key={department}
                    className={`executives-filter-btn ${
                      activeDepartment === department ? 'active' : ''
                    }`}
                    onClick={() => handleDepartmentChange(department)}
                  >
                    {department}
                  </button>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Executives Grid */}
      <section className="executives-grid-section">
        <div className="container">
          {/* Results Count */}
          <div className="executives-results-info">
            <p>
              Showing <span className="results-count">{filteredExecutives.length}</span>{' '}
              {filteredExecutives.length === 1 ? 'member' : 'members'}
              {activeDepartment !== 'All Departments' && (
                <span> in {activeDepartment}</span>
              )}
            </p>
          </div>

          {/* Grid */}
          <motion.div
            className="executives-grid"
            key={`${activeSession}-${activeDepartment}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredExecutives.length > 0 ? (
              filteredExecutives.map((executive, index) => (
                <ExecutiveCard
                  key={executive.id}
                  executive={executive}
                  onClick={handleCardClick}
                  delay={index * 0.1}
                />
              ))
            ) : (
              <div className="executives-empty-state">
                <p>No executives found in this category.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Executive Modal */}
      <AnimatePresence>
        {selectedMember && (
          <ExecutiveModal
            executive={selectedMember}
            onClose={handleModalClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Executives;
