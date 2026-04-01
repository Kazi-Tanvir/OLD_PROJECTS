import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faImages } from '@fortawesome/free-solid-svg-icons';
import { SectionHeader } from '../components/common';
import Lightbox from '../components/sections/gallery/Lightbox';
import { galleryData, totalImages } from '../data/gallery';
import './Gallery.css';

function Gallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Display all images (no filter)
  const displayedImages = galleryData;

  // Handle image click
  const handleImageClick = (imageId) => {
    // Find the index in the full galleryData array for proper navigation
    const index = galleryData.findIndex(img => img.id === imageId);
    setSelectedImageIndex(index);
  };

  // Close lightbox
  const handleCloseLightbox = () => {
    setSelectedImageIndex(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="gallery-page">
      <div className="container">
        <SectionHeader 
          title="Photo Gallery"
          subtitle="Moments captured throughout our journey"
        />

        {/* Gallery Info */}
        <div className="gallery-controls">
          <p className="gallery-count">
            <FontAwesomeIcon icon={faImages} />
            <span className="highlight">{displayedImages.length}</span> photos
          </p>
        </div>

        {/* Masonry Grid */}
        <motion.div 
          className="gallery-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {displayedImages.map((image) => (
            <motion.div
              key={image.id}
              className={`gallery-item ${image.isFeatured ? 'featured' : ''}`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleImageClick(image.id)}
            >
              <div className="gallery-image-wrapper">
                <img 
                  src={image.image}
                  alt={image.title}
                  loading="lazy"
                  draggable={false}
                  className="gallery-image"
                />
                
                {/* Hover Overlay */}
                <div className="gallery-overlay">
                  <div className="overlay-content">
                    {image.isFeatured && (
                      <span className="featured-badge">
                        <FontAwesomeIcon icon={faStar} /> Featured
                      </span>
                    )}
                    <h4 className="image-title">{image.title}</h4>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {displayedImages.length === 0 && (
          <div className="gallery-empty">
            <FontAwesomeIcon icon={faImages} className="empty-icon" />
            <p>No photos to display</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <Lightbox 
            images={galleryData}
            initialIndex={selectedImageIndex}
            onClose={handleCloseLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Gallery;
