// Gallery Data - DCITC Photo Gallery
// Dynamically generates 143 image objects with featured designations

// Featured image IDs - these will span 2x2 in the masonry grid
const featuredIds = [
  1, 3, 6, 11, 14, 17, 23, 26, 29, 32, 35, 41, 44, 47, 50, 
  63, 68, 74, 82, 84, 88, 111, 120, 121
];

// Generate gallery data array
const generateGalleryData = () => {
  const galleryData = [];
  
  for (let i = 1; i <= 143; i++) {
    // Handle special case for FB 131.webp
    const extension = i === 131 ? 'webp' : 'jpg';
    const paddedNumber = String(i).padStart(3, '0');
    
    galleryData.push({
      id: i,
      title: `DCITC Event Photo ${i}`,
      image: `/gallery/FB ${paddedNumber}.${extension}`,
      isFeatured: featuredIds.includes(i),
      // Add category hints based on ranges (optional metadata)
      category: getCategoryByIndex(i)
    });
  }
  
  return galleryData;
};

// Helper to assign rough categories based on image range
const getCategoryByIndex = (index) => {
  if (index <= 30) return 'events';
  if (index <= 60) return 'workshops';
  if (index <= 90) return 'hackathons';
  if (index <= 120) return 'meetups';
  return 'general';
};

// Export the generated data
export const galleryData = generateGalleryData();

// Export featured IDs for potential filtering
export const featuredImageIds = featuredIds;

// Export total count
export const totalImages = 143;

export default galleryData;
