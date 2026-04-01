import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faRocket,
  faLaptopCode,
} from '@fortawesome/free-solid-svg-icons';
import { SectionHeader, GlassCard } from '../components/common';
import { Timeline, ImpactStats, FAQAccordion } from '../components/sections/about';
import { aboutCards } from '../data/about';
import dcitcLogo from '../assets/images/logo/dcitc-logo-trans.png';
import './About.css';

// Icon mapping for about cards
const iconMap = {
  'fa-solid fa-eye': faEye,
  'fa-solid fa-rocket': faRocket,
  'fa-solid fa-laptop-code': faLaptopCode,
};

/**
 * About - Club information page with history, mission, and impact
 */
function About() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="page about-page">
      {/* Hero Header Section */}
      <section className="about-hero">
        <div className="about-hero-container">
          {/* Logo with Tilt Effect */}
          <motion.div
            className="about-logo-wrapper"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Tilt
              className="tilt-wrapper"
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              perspective={1000}
              scale={1.02}
              transitionSpeed={1500}
              glareEnable={true}
              glareMaxOpacity={0.2}
              glareColor="#00b4db"
              glarePosition="all"
              glareBorderRadius="20px"
            >
              <div className="logo-container">
                <img
                  src={dcitcLogo}
                  alt="DCITC Logo"
                  className="about-logo"
                />
                <div className="logo-glow" />
              </div>
            </Tilt>
          </motion.div>

          {/* Hero Text */}
          <motion.div
            className="about-hero-text"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="about-title">Dhaka College IT Club</h1>
            <p className="about-subtitle">
              Empowering students with technology skills and fostering innovation
              since 2018. We are a community of passionate tech enthusiasts dedicated
              to learning, building, and growing together.
            </p>
            <div className="about-divider" />
          </motion.div>
        </div>
      </section>

      {/* About Cards Section - Vision, Mission, What We Do */}
      <section className="about-cards-section">
        <div className="about-container">
          <motion.div
            className="about-cards-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {aboutCards.map((card, index) => {
              const icon = iconMap[card.icon] || faLaptopCode;
              return (
                <motion.div key={card.id} variants={itemVariants}>
                  <GlassCard className="about-card" delay={index * 0.1}>
                    <div className="about-card-icon">
                      <FontAwesomeIcon icon={icon} />
                    </div>
                    <h3 className="about-card-title">{card.title}</h3>
                    <p className="about-card-description">{card.description}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section - Our Journey */}
      <section className="about-timeline-section">
        <div className="about-container">
          <SectionHeader
            title="Our Journey"
            subtitle="From a small group of enthusiasts to a thriving tech community"
            alignment="center"
          />
          <Timeline />
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="about-impact-section">
        <div className="about-container">
          <SectionHeader
            title="Our Impact"
            subtitle="The numbers that reflect our commitment to tech education"
            alignment="center"
          />
          <ImpactStats />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="about-faq-section">
        <div className="about-container">
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about joining DCITC"
            alignment="center"
          />
          <FAQAccordion />
        </div>
      </section>
    </div>
  );
}

export default About;
