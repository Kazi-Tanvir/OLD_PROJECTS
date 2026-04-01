import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { contactInfo, socialLinks, clubInfo } from '@/data/siteMeta';
import dcitcLogo from '@/assets/images/dcitc-logo-trans.png';

// Footer-specific link data with icons
const footerQuickLinks = [
  { path: '/', label: 'Home', icon: 'fa-solid fa-house' },
  { path: '/about', label: 'About Us', icon: 'fa-solid fa-circle-info' },
  { path: '/events', label: 'Events', icon: 'fa-solid fa-calendar-days' },
  { path: '/projects', label: 'Projects', icon: 'fa-solid fa-diagram-project' },
];

const footerResourceLinks = [
  { path: '/departments', label: 'Departments', icon: 'fa-solid fa-users-gear' },
  { path: '/gallery', label: 'Gallery', icon: 'fa-solid fa-images' },
  { path: '#', label: 'Blog', icon: 'fa-solid fa-blog' },
  { path: '#', label: 'Support', icon: 'fa-solid fa-headset' },
];

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Link item animation variants
  const linkVariants = {
    initial: { x: 0, textShadow: '0 0 0px transparent' },
    hover: { 
      x: 8,
      textShadow: '0 0 8px rgba(0, 180, 219, 0.8)',
      transition: { type: 'spring', stiffness: 400, damping: 20 }
    },
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0, filter: 'drop-shadow(0 0 0px transparent)' },
    hover: { 
      scale: 1.3, 
      rotate: 8,
      filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.9))',
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    },
  };

  const socialVariants = {
    initial: { scale: 1, y: 0 },
    hover: { 
      scale: 1.2, 
      y: -5,
      boxShadow: '0 0 25px rgba(0, 180, 219, 0.7), 0 0 50px rgba(0, 180, 219, 0.4)',
      transition: { type: 'spring', stiffness: 400, damping: 15 }
    },
    tap: { scale: 0.9 }
  };

  const FooterLink = ({ to, label, icon }) => (
    <motion.div
      initial="initial"
      whileHover="hover"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-2) 0',
        cursor: 'pointer',
      }}
    >
      <motion.i 
        className={icon} 
        variants={iconVariants}
        style={{ 
          color: 'var(--primary-color)', 
          width: '20px',
          fontSize: 'var(--text-base)',
        }} 
      />
      <motion.div variants={linkVariants}>
        <Link
          to={to}
          style={{
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: 'var(--text-base)',
          }}
        >
          {label}
        </Link>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <footer style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, var(--bg-surface-1) 0%, rgba(12, 12, 20, 0.98) 100%)',
        borderTop: '1px solid var(--glass-border)',
        marginTop: 'auto',
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: 'var(--space-15) var(--space-6) var(--space-6)',
          }}>
            {/* Main Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'var(--space-6)',
              marginBottom: 'var(--space-10)',
            }}
            className="footer-main-grid"
            >
              {/* Brand Column */}
              <div style={{ gridColumn: 'span 2' }} className="footer-brand">
                <Link to="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}
                  >
                    <img
                      src={dcitcLogo}
                      alt="DCITC Logo"
                      style={{ 
                        height: '80px', 
                        width: 'auto',
                        filter: 'drop-shadow(0 0 10px rgba(0, 180, 219, 0.3))',
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </motion.div>
                </Link>
                <p style={{ 
                  color: 'var(--text-secondary)', 
                  lineHeight: 1.7, 
                  fontSize: 'var(--text-sm)',
                  marginTop: 'var(--space-4)',
                  maxWidth: '280px',
                }}>
                  {clubInfo.tagline}
                </p>
              </div>

              {/* Quick Links */}
              <div style={{ minWidth: 0 }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-5)',
                }}>
                  Quick Links
                </h3>
                <nav>
                  {footerQuickLinks.map((link) => (
                    <FooterLink key={link.path + link.label} {...link} to={link.path} />
                  ))}
                </nav>
              </div>

              {/* Resources */}
              <div style={{ minWidth: 0 }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-5)',
                }}>
                  Resources
                </h3>
                <nav>
                  {footerResourceLinks.map((link) => (
                    <FooterLink key={link.label} {...link} to={link.path} />
                  ))}
                </nav>
              </div>

              {/* Contact */}
              <div style={{ gridColumn: 'span 2', minWidth: 0 }} className="footer-contact">
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-5)',
                }}>
                  Contact Us
                </h3>
                <div>
                  {[
                    { icon: 'fa-solid fa-envelope', content: contactInfo.email, href: `mailto:${contactInfo.email}` },
                    { icon: 'fa-solid fa-phone', content: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, '')}` },
                    { icon: 'fa-solid fa-location-dot', content: 'Dhaka College, Dhaka', href: null },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial="initial"
                      whileHover="hover"
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 'var(--space-3)',
                        marginBottom: 'var(--space-3)',
                        cursor: item.href ? 'pointer' : 'default',
                      }}
                    >
                      <motion.i
                        className={item.icon}
                        variants={iconVariants}
                        style={{
                          color: 'var(--primary-color)',
                          width: '18px',
                          fontSize: 'var(--text-sm)',
                          marginTop: '4px',
                        }}
                      />
                      <motion.span variants={linkVariants}>
                        {item.href ? (
                          <a href={item.href} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                            {item.content}
                          </a>
                        ) : (
                          <span style={{ color: 'var(--text-secondary)' }}>{item.content}</span>
                        )}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider with dot */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 'var(--space-8) 0',
            }}>
              <div style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, var(--glass-border), var(--glass-border))',
              }} />
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 10px rgba(0, 180, 219, 0.3)',
                    '0 0 20px rgba(0, 180, 219, 0.6)',
                    '0 0 10px rgba(0, 180, 219, 0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--primary-color)',
                  margin: '0 var(--space-6)',
                }}
              />
              <div style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(90deg, var(--glass-border), var(--glass-border), transparent)',
              }} />
            </div>

            {/* Social Icons - Centered */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-8)',
            }}>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 1, y: 0 }}
                  whileHover={{ 
                    scale: 1.2, 
                    y: -5,
                    backgroundColor: 'var(--primary-color)',
                    color: '#ffffff',
                    boxShadow: '0 0 20px rgba(0, 180, 219, 0.8), 0 0 40px rgba(0, 180, 219, 0.5), 0 0 60px rgba(0, 180, 219, 0.3)',
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--bg-surface-2)',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    border: '1px solid var(--glass-border)',
                    fontSize: '1.25rem',
                  }}
                  aria-label={social.name}
                >
                  <i className={social.icon} />
                </motion.a>
              ))}
            </div>

            {/* Second Divider with dot */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--space-6)',
            }}>
              <div style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, var(--glass-border), var(--glass-border))',
              }} />
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 10px rgba(0, 180, 219, 0.3)',
                    '0 0 20px rgba(0, 180, 219, 0.6)',
                    '0 0 10px rgba(0, 180, 219, 0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--primary-color)',
                  margin: '0 var(--space-6)',
                }}
              />
              <div style={{
                flex: 1,
                height: '1px',
                background: 'linear-gradient(90deg, var(--glass-border), var(--glass-border), transparent)',
              }} />
            </div>

            {/* Copyright */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ 
                color: 'var(--text-secondary)', 
                fontSize: 'var(--text-sm)', 
                margin: 0,
                marginBottom: 'var(--space-2)',
              }}>
                {clubInfo.copyright}
              </p>
              <p style={{ 
                color: 'var(--text-secondary)', 
                fontSize: 'var(--text-xs)', 
                margin: 0,
              }}>
                Designed with{' '}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ display: 'inline-block', color: 'var(--primary-color)' }}
                >
                  <i className="fa-solid fa-heart" />
                </motion.span>
                {' '}by{' '}
                <a 
                  href="#" 
                  style={{ 
                    color: 'var(--primary-color)', 
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  DCITC Team
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: '0 0 30px rgba(0, 180, 219, 0.6)',
            }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: 'fixed',
              bottom: 'var(--space-8)',
              right: 'var(--space-8)',
              width: '50px',
              height: '50px',
              borderRadius: 'var(--radius-full)',
              background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
              color: 'var(--text-primary)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0, 180, 219, 0.4)',
              zIndex: 'var(--z-fixed)',
              fontSize: 'var(--text-lg)',
            }}
            aria-label="Scroll to top"
          >
            <i className="fa-solid fa-arrow-up" />
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .footer-main-grid {
            grid-template-columns: 1.2fr 1fr 1fr 1fr !important;
            gap: var(--space-12) !important;
          }
          .footer-brand {
            grid-column: span 1 !important;
          }
          .footer-contact {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </>
  );
}

export default Footer;
