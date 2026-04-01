import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Button from '../common/Button';
import dcitcLogo from '../../assets/images/logo/dcitc-logo.png';
import './HeroSection.css';

// Floating code symbols configuration
const floatingSymbols = [
  { text: '</>', top: '10%', left: '5%', delay: 0 },
  { text: '{}', top: '20%', right: '8%', delay: 0.5 },
  { text: '#', bottom: '25%', left: '8%', delay: 1 },
  { text: '01', bottom: '15%', right: '5%', delay: 1.5 },
];

// Typing sequence phases
const TYPING_PHASES = {
  TYPING_BUILDING: 'typing_building',
  TYPING_TOMORROW: 'typing_tomorrow',
  PAUSE_TOMORROW: 'pause_tomorrow',
  DELETING_TOMORROW: 'deleting_tomorrow',
  TYPING_TODAY: 'typing_today',
  PAUSE_TODAY: 'pause_today',
  DELETING_TODAY: 'deleting_today',
};

/**
 * HeroSection - Split layout hero with DCITC branding and animated motto
 */
function HeroSection() {
  const [mottoText, setMottoText] = useState('');
  const [phase, setPhase] = useState(TYPING_PHASES.TYPING_BUILDING);
  const heroRef = useRef(null);

  const BUILDING = 'Building ';
  const TOMORROW = 'Tomorrow';
  const TODAY = 'Today';

  // Advanced typing effect with delete and retype
  useEffect(() => {
    let timeout;

    switch (phase) {
      case TYPING_PHASES.TYPING_BUILDING:
        if (mottoText.length < BUILDING.length) {
          timeout = setTimeout(() => {
            setMottoText(BUILDING.slice(0, mottoText.length + 1));
          }, 100);
        } else {
          setPhase(TYPING_PHASES.TYPING_TOMORROW);
        }
        break;

      case TYPING_PHASES.TYPING_TOMORROW:
        if (mottoText.length < BUILDING.length + TOMORROW.length) {
          timeout = setTimeout(() => {
            setMottoText(
              BUILDING + TOMORROW.slice(0, mottoText.length - BUILDING.length + 1)
            );
          }, 100);
        } else {
          setPhase(TYPING_PHASES.PAUSE_TOMORROW);
        }
        break;

      case TYPING_PHASES.PAUSE_TOMORROW:
        // Pause so users can read "Building Tomorrow"
        timeout = setTimeout(() => {
          setPhase(TYPING_PHASES.DELETING_TOMORROW);
        }, 1500);
        break;

      case TYPING_PHASES.DELETING_TOMORROW:
        if (mottoText.length > BUILDING.length) {
          timeout = setTimeout(() => {
            setMottoText(mottoText.slice(0, -1));
          }, 80);
        } else {
          setPhase(TYPING_PHASES.TYPING_TODAY);
        }
        break;

      case TYPING_PHASES.TYPING_TODAY:
        if (mottoText.length < BUILDING.length + TODAY.length) {
          timeout = setTimeout(() => {
            setMottoText(
              BUILDING + TODAY.slice(0, mottoText.length - BUILDING.length + 1)
            );
          }, 100);
        } else {
          setPhase(TYPING_PHASES.PAUSE_TODAY);
        }
        break;

      case TYPING_PHASES.PAUSE_TODAY:
        timeout = setTimeout(() => {
          setPhase(TYPING_PHASES.DELETING_TODAY);
        }, 1500);
        break;

      case TYPING_PHASES.DELETING_TODAY:
        if (mottoText.length > BUILDING.length) {
          timeout = setTimeout(() => {
            setMottoText(mottoText.slice(0, -1));
          }, 80);
        } else {
          setPhase(TYPING_PHASES.TYPING_TOMORROW);
        }
        break;

      default:
        break;
    }

    return () => clearTimeout(timeout);
  }, [mottoText, phase]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.3 },
    },
  };

  const floatAnimation = {
    y: [0, -15, 0],
    transition: {
      repeat: Infinity,
      duration: 4,
      ease: 'easeInOut',
    },
  };

  return (
    <section className="hero-section" ref={heroRef} id="hero">
      {/* Floating Code Symbols - decorative background elements */}
      <div className="floating-symbols" aria-hidden="true">
        {floatingSymbols.map((symbol, index) => (
          <motion.div
            key={index}
            className="floating-symbol"
            style={{
              top: symbol.top,
              bottom: symbol.bottom,
              left: symbol.left,
              right: symbol.right,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              ...floatAnimation,
            }}
            transition={{
              ...floatAnimation.transition,
              delay: symbol.delay,
            }}
          >
            {symbol.text}
          </motion.div>
        ))}
      </div>

      <div className="hero-container">
        {/* Left Side - Text Content */}
        <motion.div
          className="hero-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Big Club Name Title */}
          <motion.h1 className="hero-title" variants={itemVariants}>
            <span className="title-text">Dhaka College IT Club</span>
          </motion.h1>

          {/* Motto with Typing Effect */}
          <motion.div className="hero-motto" variants={itemVariants}>
            <span className="motto-text">{mottoText}</span>
            <span className="motto-cursor blink">
              |
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p className="hero-subtitle" variants={itemVariants}>
            Dhaka College Information Technology Club
          </motion.p>

          {/* CTA Buttons */}
          <motion.div className="hero-ctas" variants={itemVariants}>
            <Button variant="primary" icon="fa-solid fa-user-plus">
              Join Now
            </Button>
            <Button variant="outline" icon="fa-solid fa-arrow-right">
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Right Side - Logo */}
        <motion.div
          className="hero-right"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        >
          <Tilt
            className="logo-tilt-wrapper"
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            perspective={1000}
            scale={1.02}
            transitionSpeed={2000}
            gyroscope={true}
          >
            <div className="logo-container">
              <div className="logo-glow"></div>
              <img
                src={dcitcLogo}
                alt="DCITC Logo"
                className="hero-logo"
              />
              {/* Decorative elements around logo */}
              <div className="logo-orbit logo-orbit-1"></div>
              <div className="logo-orbit logo-orbit-2"></div>
            </div>
          </Tilt>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.div
          className="scroll-mouse"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="scroll-wheel"></div>
        </motion.div>
        <span className="scroll-text">Scroll Down</span>
      </motion.div>
    </section>
  );
}

export default HeroSection;
