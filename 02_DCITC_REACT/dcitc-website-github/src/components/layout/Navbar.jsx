import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import dcitcLogo from '@/assets/images/dcitc-logo-trans.png';

const navLinks = [
  { path: '/', label: 'Home', icon: 'fa-solid fa-house' },
  { path: '/about', label: 'About', icon: 'fa-solid fa-circle-info' },
  { path: '/executives', label: 'Executive', icon: 'fa-solid fa-users' },
  { path: '/events', label: 'Events', icon: 'fa-solid fa-calendar-days' },
  { path: '/projects', label: 'Projects', icon: 'fa-solid fa-code' },
  { path: '/gallery', label: 'Gallery', icon: 'fa-regular fa-images' },
  { path: '/departments', label: 'Departments', icon: 'fa-solid fa-building' },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Styles
  const navStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 'var(--z-fixed)',
    padding: 'var(--space-4) var(--space-6)',
    transition: 'all var(--transition-medium)',
    background: isScrolled ? 'var(--glass-bg)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(var(--glass-blur))' : 'none',
    WebkitBackdropFilter: isScrolled ? 'blur(var(--glass-blur))' : 'none',
    borderBottom: isScrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
  };

  const containerStyles = {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const logoStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    textDecoration: 'none',
    color: 'var(--text-primary)',
  };

  const logoTextStyles = {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-xl)',
    fontWeight: 700,
    background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const desktopNavStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-6)',
  };

  const linkBaseStyles = {
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontSize: 'var(--text-base)',
    fontWeight: 500,
    transition: 'color var(--transition-fast)',
    position: 'relative',
  };

  const linkActiveStyles = {
    color: 'var(--primary-color)',
  };

  const iconButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    background: 'transparent',
    border: '1px solid var(--glass-border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
  };

  const hamburgerStyles = {
    ...iconButtonStyles,
    display: 'none',
  };

  // Mobile menu animation variants
  const mobileMenuVariants = {
    hidden: {
      x: '100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: {
        type: 'tween',
        duration: 0.25,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const mobileNavItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  return (
    <>
      <nav style={navStyles}>
        <div style={containerStyles}>
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" style={logoStyles}>
              <img
                src={dcitcLogo}
                alt="DCITC Logo"
                style={{ 
                  height: '48px', 
                  width: 'auto',
                  filter: 'drop-shadow(0 0 8px rgba(0, 180, 219, 0.4))',
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div style={desktopNavStyles} className="desktop-nav">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                style={{ textDecoration: 'none' }}
              >
                {({ isActive }) => (
                  <motion.div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
                      fontWeight: 500,
                      fontSize: 'var(--text-sm)',
                      position: 'relative',
                      cursor: 'pointer',
                    }}
                    whileHover={{
                      color: 'var(--primary-color)',
                      textShadow: '0 0 12px rgba(0, 180, 219, 0.8)',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.i 
                      className={link.icon}
                      style={{ fontSize: '14px' }}
                      whileHover={{
                        filter: 'drop-shadow(0 0 6px rgba(0, 180, 219, 0.9))',
                      }}
                    />
                    <span>{link.label}</span>
                    {/* Active underline indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: '12px',
                          right: '12px',
                          height: '2px',
                          background: 'var(--primary-color)',
                          borderRadius: '2px',
                          boxShadow: '0 0 10px rgba(0, 180, 219, 0.8)',
                        }}
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.div>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            {/* Mobile Menu Toggle */}
            <motion.button
              style={hamburgerStyles}
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <i className={isMobileMenuOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars'} />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 'calc(var(--z-fixed) + 1)',
              }}
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '280px',
                maxWidth: '80vw',
                background: 'var(--bg-surface-1)',
                zIndex: 'calc(var(--z-fixed) + 2)',
                padding: 'var(--space-8) var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                borderLeft: '1px solid var(--glass-border)',
              }}
            >
              {/* Mobile Menu Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 'var(--space-8)',
                }}
              >
                <span style={logoTextStyles}>Menu</span>
                <motion.button
                  style={iconButtonStyles}
                  onClick={closeMobileMenu}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close menu"
                >
                  <i className="fa-solid fa-times" />
                </motion.button>
              </div>

              {/* Mobile Nav Links */}
              <nav style={{ flex: 1 }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.path}
                      custom={index}
                      variants={mobileNavItemVariants}
                      initial="hidden"
                      animate="visible"
                      style={{ marginBottom: 'var(--space-2)' }}
                    >
                      <NavLink
                        to={link.path}
                        onClick={closeMobileMenu}
                        style={({ isActive }) => ({
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-3)',
                          padding: 'var(--space-4)',
                          color: isActive ? 'var(--primary-color)' : 'var(--text-primary)',
                          textDecoration: 'none',
                          fontSize: 'var(--text-lg)',
                          fontWeight: 500,
                          borderRadius: 'var(--radius-md)',
                          background: isActive ? 'rgba(0, 180, 219, 0.1)' : 'transparent',
                          transition: 'all var(--transition-fast)',
                        })}
                      >
                        <i className={link.icon} style={{ width: '20px', textAlign: 'center' }} />
                        {link.label}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Mobile Menu Footer */}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CSS for responsive behavior */}
      <style>{`
        .desktop-nav {
          display: flex !important;
        }
        .mobile-menu-toggle {
          display: none !important;
        }
        
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;
