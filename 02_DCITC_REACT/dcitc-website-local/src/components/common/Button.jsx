import { motion } from 'framer-motion';

/**
 * Button - Standardized button component with variants
 * 
 * @param {React.ReactNode} children - Button text/content
 * @param {string} variant - "primary" | "outline"
 * @param {function} onClick - Click handler
 * @param {string} className - Additional CSS classes
 * @param {string} icon - Font Awesome class (e.g., "fa-solid fa-arrow-right")
 * @param {string} type - Button type attribute
 * @param {boolean} disabled - Disabled state
 */
function Button({
  children,
  variant = 'primary',
  onClick,
  className = '',
  icon,
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    padding: 'var(--space-3) var(--space-6)',
    fontSize: 'var(--text-base)',
    fontWeight: 600,
    fontFamily: 'var(--font-body)',
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all var(--transition-fast)',
    opacity: disabled ? 0.6 : 1,
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
      color: 'var(--text-primary)',
      border: 'none',
      boxShadow: 'var(--shadow-md)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--primary-color)',
      border: '2px solid var(--primary-color)',
    },
  };

  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
  };

  return (
    <motion.button
      type={type}
      className={`btn btn-${variant} ${className}`.trim()}
      style={combinedStyles}
      onClick={onClick}
      disabled={disabled}
      whileHover={
        !disabled
          ? {
              scale: 1.05,
              boxShadow: 'var(--shadow-glow)',
            }
          : {}
      }
      whileTap={!disabled ? { scale: 0.95 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
      {icon && <i className={icon} aria-hidden="true" />}
    </motion.button>
  );
}

export default Button;
