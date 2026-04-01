import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import { SectionHeader, Button } from '../common';
import { heroStats } from '../../data/siteMeta';
import dcitcLogo from '../../assets/images/logo/dcitc-logo.png';
import './AboutSnippet.css';

/**
 * AboutSnippet - Homepage about section with 3D tilt logo and stats
 */
function AboutSnippet() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="about-snippet-section" id="about-snippet">
      {/* Circuit Board Decorations */}
      <div className="circuit-decorations" aria-hidden="true">
        <div className="circuit-path path-1" />
        <div className="circuit-path path-2" />
        <div className="circuit-path path-3" />
        <div className="circuit-node node-1" />
        <div className="circuit-node node-2" />
        <div className="circuit-node node-3" />
      </div>

      <div className="about-snippet-container">
        <motion.div
          className="about-snippet-wrapper glass-effect"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Left Side - Logo with Tilt Effect */}
          <motion.div className="logo-side" variants={logoVariants}>
            <Tilt
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              glareEnable={true}
              glareMaxOpacity={0.2}
              glareColor="#00b4db"
              glarePosition="all"
              glareBorderRadius="16px"
              scale={1.02}
              transitionSpeed={1000}
              className="logo-tilt-wrapper"
            >
              <div className="logo-glow-container">
                <div className="logo-glow" />
                <img
                  src={dcitcLogo}
                  alt="DCITC Logo"
                  className="about-logo-image"
                />
              </div>
            </Tilt>
            {/* Decorative tech dots */}
            <div className="tech-dots">
              <span className="tech-dot" />
              <span className="tech-dot" />
              <span className="tech-dot" />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <div className="content-side">
            <motion.div className="content-header" variants={itemVariants}>
              <span className="section-label">/ About Us</span>
              <h2 className="about-title">About DCITC</h2>
              <p className="about-tagline">
                Empowering students with technology skills since 2018
              </p>
            </motion.div>

            <motion.p className="about-description" variants={itemVariants}>
              The Dhaka College IT Club (DCITC) is a vibrant community of tech
              enthusiasts dedicated to fostering innovation, collaboration, and
              excellence in technology. We provide hands-on workshops, mentorship
              programs, and real-world project experience to prepare members for
              the tech industry.
            </motion.p>

            {/* Quick Stats */}
            <motion.div className="about-stats" variants={itemVariants}>
              {heroStats.map((stat) => (
                <div key={stat.id} className="stat-item">
                  <span className="stat-number">
                    {stat.value}
                    <span className="stat-suffix">{stat.suffix}</span>
                  </span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div className="about-cta" variants={itemVariants}>
              <Link to="/about">
                <Button variant="primary" icon="fa-solid fa-arrow-right">
                  Explore More
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSnippet;
