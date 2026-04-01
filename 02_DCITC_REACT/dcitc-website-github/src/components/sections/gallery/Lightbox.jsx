import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, 
  faPause, 
  faTh, 
  faExpand, 
  faCompress,
  faTimes, 
  faChevronLeft, 
  faChevronRight 
} from '@fortawesome/free-solid-svg-icons';
import './Lightbox.css';

const Lightbox = ({ images, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const thumbnailContainerRef = useRef(null);
  const slideshowIntervalRef = useRef(null);

  // Current image data
  const currentImage = images[currentIndex];

  // Lock body scroll on mount
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Navigate to next image
  const goToNext = useCallback(() => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Navigate to previous image
  const goToPrev = useCallback(() => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowRight':
          goToNext();
          break;
        case 'ArrowLeft':
          goToPrev();
          break;
        case 'Escape':
          onClose();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, onClose]);

  // Slideshow functionality
  useEffect(() => {
    if (isPlaying) {
      slideshowIntervalRef.current = setInterval(() => {
        goToNext();
      }, 3000);
    } else {
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current);
        slideshowIntervalRef.current = null;
      }
    }

    return () => {
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current);
      }
    };
  }, [isPlaying, goToNext]);

  // Auto-scroll thumbnail into view
  useEffect(() => {
    if (thumbnailContainerRef.current && showThumbnails) {
      const activeThumb = thumbnailContainerRef.current.querySelector('.thumbnail-item.active');
      if (activeThumb) {
        activeThumb.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest', 
          inline: 'center' 
        });
      }
    }
  }, [currentIndex, showThumbnails]);

  // Preload adjacent images
  useEffect(() => {
    const preloadIndexes = [
      (currentIndex + 1) % images.length,
      (currentIndex - 1 + images.length) % images.length
    ];

    preloadIndexes.forEach((index) => {
      const img = new Image();
      img.src = images[index].image;
    });
  }, [currentIndex, images]);

  // Fullscreen toggle
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Handle thumbnail click
  const handleThumbnailClick = (index) => {
    setImageLoaded(false);
    setCurrentIndex(index);
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Image animation variants
  const imageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 }
  };

  return (
    <motion.div 
      className="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackdropClick}
    >
      {/* Header Bar */}
      <header className="lightbox-header">
        <div className="lightbox-title">
          <h3>{currentImage.title}</h3>
        </div>
        
        <div className="lightbox-controls">
          <button 
            className={`control-btn ${isPlaying ? 'active' : ''}`}
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          
          <button 
            className={`control-btn ${showThumbnails ? 'active' : ''}`}
            onClick={() => setShowThumbnails(!showThumbnails)}
            title="Toggle Thumbnails"
          >
            <FontAwesomeIcon icon={faTh} />
          </button>
          
          <button 
            className="control-btn"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
          </button>
          
          <button 
            className="control-btn close-btn"
            onClick={onClose}
            title="Close"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </header>

      {/* Main Viewer Area */}
      <div className="lightbox-viewer">
        {/* Previous Button */}
        <button 
          className="nav-btn nav-prev"
          onClick={goToPrev}
          aria-label="Previous image"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {/* Image Container with AnimatePresence */}
        <div className="lightbox-image-container">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={currentImage.image}
              alt={currentImage.title}
              className="lightbox-image"
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onLoad={() => setImageLoaded(true)}
              draggable={false}
            />
          </AnimatePresence>
          
          {/* Loading indicator */}
          {!imageLoaded && (
            <div className="lightbox-loading">
              <div className="loading-spinner"></div>
            </div>
          )}
        </div>

        {/* Next Button */}
        <button 
          className="nav-btn nav-next"
          onClick={goToNext}
          aria-label="Next image"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      {/* Thumbnail Strip */}
      <AnimatePresence>
        {showThumbnails && (
          <motion.div 
            className="lightbox-thumbnails"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2 }}
          >
            <div 
              className="thumbnails-container"
              ref={thumbnailContainerRef}
            >
              {images.map((image, index) => (
                <button
                  key={image.id}
                  className={`thumbnail-item ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img 
                    src={image.image} 
                    alt={image.title}
                    loading="lazy"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Counter */}
      <footer className="lightbox-footer">
        <span className="image-counter">
          {currentIndex + 1} / {images.length}
        </span>
        {currentImage.isFeatured && (
          <span className="featured-badge">Featured</span>
        )}
      </footer>
    </motion.div>
  );
};

export default Lightbox;
