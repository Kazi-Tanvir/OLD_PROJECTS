import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import HeroSection from '../components/sections/HeroSection';
import AboutSnippet from '../components/sections/AboutSnippet';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import UpcomingEvents from '../components/sections/UpcomingEvents';
import CoreTeamHighlight from '../components/sections/CoreTeamHighlight';
import ContactCTA from '../components/sections/ContactCTA';
import './Home.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Home - Main landing page with hero section and GSAP scroll animations
 * Assembles all homepage sections in the "highlight reel" strategy
 */
function Home() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);

  // GSAP ScrollTrigger animation for hero fade-out on scroll
  useGSAP(
    () => {
      const hero = document.querySelector('.hero-section');
      if (!hero) return;

      gsap.to(hero, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: hero,
          start: 'center center',
          end: 'bottom top',
          scrub: 1,
          toggleActions: 'play none none reverse',
        },
      });

      // Parallax effect on logo
      const logoContainer = document.querySelector('.logo-container');
      if (logoContainer) {
        gsap.to(logoContainer, {
          y: -80,
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div className="page home-page" ref={containerRef}>
      {/* Hero Section - Full viewport with typewriter and floating symbols */}
      <div ref={heroRef}>
        <HeroSection />
      </div>

      {/* About Snippet - 3D tilt logo and quick stats */}
      <AboutSnippet />

      {/* Featured Projects - Top 4 showcase projects */}
      <FeaturedProjects />

      {/* Upcoming Events - Next 3 events */}
      <UpcomingEvents />

      {/* Core Team Highlight - President, VP, Secretary, Treasurer */}
      <CoreTeamHighlight />

      {/* Contact CTA - Join DCITC and contact info */}
      <ContactCTA />
    </div>
  );
}

export default Home;
