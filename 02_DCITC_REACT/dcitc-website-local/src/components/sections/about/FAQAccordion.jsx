import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faqs } from '../../../data/about';
import './FAQAccordion.css';

/**
 * FAQAccordion - Expandable FAQ section with smooth animations
 * Only one item can be open at a time
 */
function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      className="faq-container"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {faqs.map((faq, index) => {
        const isActive = activeIndex === index;
        return (
          <motion.div
            key={faq.id}
            className={`faq-item ${isActive ? 'active' : ''}`}
            variants={itemVariants}
          >
            {/* Question Button */}
            <button
              className="faq-question"
              onClick={() => toggleAccordion(index)}
              aria-expanded={isActive}
              aria-controls={`faq-answer-${index}`}
            >
              <div className="faq-question-content">
                <FontAwesomeIcon icon={faCircleQuestion} className="faq-icon" />
                <span className="faq-question-text">{faq.question}</span>
              </div>
              <motion.div
                className="faq-chevron"
                animate={{ rotate: isActive ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FontAwesomeIcon icon={faChevronDown} />
              </motion.div>
            </button>

            {/* Answer Panel */}
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  id={`faq-answer-${index}`}
                  className="faq-answer-wrapper"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default FAQAccordion;
