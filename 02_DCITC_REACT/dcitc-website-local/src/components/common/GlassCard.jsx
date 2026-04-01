import { motion } from 'framer-motion';

/**
 * GlassCard - Reusable glassmorphism card wrapper component
 * 
 * @param {React.ReactNode} children - Card content
 * @param {string} className - Additional CSS classes
 * @param {number} delay - Animation delay for staggering (in seconds)
 * @param {object} style - Additional inline styles
 */
function GlassCard({ children, className = '', delay = 0, style = {}, ...props }) {
  const cardStyles = {
    background: 'var(--glass-bg)',
    backdropFilter: 'blur(var(--glass-blur))',
    WebkitBackdropFilter: 'blur(var(--glass-blur))',
    border: '1px solid var(--glass-border)',
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--space-6)',
    transition: 'box-shadow var(--transition-medium)',
    ...style,
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      className={`glass-card ${className}`.trim()}
      style={cardStyles}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{
        y: -5,
        boxShadow: 'var(--shadow-glow-lg)',
        transition: { duration: 0.3 },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default GlassCard;
