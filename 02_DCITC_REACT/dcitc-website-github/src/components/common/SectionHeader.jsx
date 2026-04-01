import { motion } from 'framer-motion';

/**
 * SectionHeader - Reusable section header with title, subtitle, and animated divider
 * 
 * @param {string} title - Main heading text
 * @param {string} subtitle - Supporting text below the title
 * @param {string} alignment - "center" | "left"
 */
function SectionHeader({ title, subtitle, alignment = 'center' }) {
  const containerStyles = {
    textAlign: alignment,
    marginBottom: 'var(--space-12)',
  };

  const titleStyles = {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(1.75rem, 4vw, var(--text-h1))',
    fontWeight: 700,
    background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 50%, var(--secondary-color) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: 'var(--space-4)',
    lineHeight: 1.2,
  };

  const subtitleStyles = {
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-lg)',
    color: 'var(--text-secondary)',
    maxWidth: alignment === 'center' ? '600px' : 'none',
    margin: alignment === 'center' ? '0 auto' : '0',
    lineHeight: 1.6,
  };

  const dividerContainerStyles = {
    display: 'flex',
    justifyContent: alignment === 'center' ? 'center' : 'flex-start',
    marginTop: 'var(--space-4)',
  };

  const dividerStyles = {
    height: '4px',
    background: 'linear-gradient(90deg, var(--primary-color), var(--accent-color))',
    borderRadius: 'var(--radius-full)',
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const dividerVariants = {
    hidden: { width: 0 },
    visible: {
      width: 80,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div style={containerStyles}>
      <motion.h2
        style={titleStyles}
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          style={subtitleStyles}
          variants={subtitleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}

      <div style={dividerContainerStyles}>
        <motion.div
          style={dividerStyles}
          variants={dividerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        />
      </div>
    </div>
  );
}

export default SectionHeader;
