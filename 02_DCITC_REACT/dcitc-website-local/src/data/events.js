/**
 * DCITC Website - Events Data
 * Contains all event information including featured events and filters
 * Current date context: March 2026
 */

export const eventCategories = [
  { id: 'all', label: 'All', value: 'all' },
  { id: 'conference', label: 'Conferences', value: 'Conference' },
  { id: 'workshop', label: 'Workshops', value: 'Workshop' },
  { id: 'webinar', label: 'Webinars', value: 'Webinar' },
  { id: 'meetup', label: 'Meetups', value: 'Meetup' },
];

export const eventTags = [
  { id: 'all', label: 'All Events', count: 12 },
  { id: 'upcoming', label: 'Upcoming', count: 8 },
  { id: 'featured', label: 'Featured', count: 3 },
  { id: 'free', label: 'Free', count: 5 },
  { id: 'premium', label: 'Premium', count: 7 },
  { id: 'virtual', label: 'Virtual', count: 6 },
  { id: 'in-person', label: 'In-Person', count: 6 },
];

export const eventsData = [
  // PAST EVENTS (before March 2026)
  {
    id: 1,
    title: 'Web Development Bootcamp 2026',
    date: 'Feb 15, 2026',
    dateISO: '2026-02-15',
    location: 'DCITC Lab, Dhaka College',
    category: 'Workshop',
    priceType: 'Free',
    status: 'past',
    isVirtual: false,
    imagePlaceholder: 'https://placehold.co/600x400/3498db/ffffff?text=Web+Dev+Bootcamp',
    isFeatured: false,
    description: 'An intensive bootcamp covering React, Node.js, and modern web development practices for beginners and intermediate developers.',
  },
  {
    id: 2,
    title: 'Competitive Programming Contest',
    date: 'Jan 28, 2026',
    dateISO: '2026-01-28',
    location: 'Online - HackerRank',
    category: 'Conference',
    priceType: 'Free',
    status: 'past',
    isVirtual: true,
    imagePlaceholder: 'https://placehold.co/600x400/9b59b6/ffffff?text=CP+Contest',
    isFeatured: false,
    description: 'Annual inter-college competitive programming contest featuring algorithmic challenges and prizes for top performers.',
  },

  // ONGOING EVENTS (happening this week - early March 2026)
  {
    id: 3,
    title: 'UI/UX Design Workshop Series',
    date: 'Mar 5-10, 2026',
    dateISO: '2026-03-05',
    endDateISO: '2026-03-10',
    location: 'Creative Hub, Dhaka',
    category: 'Workshop',
    priceType: 'Paid',
    status: 'ongoing',
    isVirtual: false,
    imagePlaceholder: 'https://placehold.co/600x400/f39c12/ffffff?text=UI+UX+Workshop',
    isFeatured: false,
    description: 'A week-long workshop series covering Figma, prototyping, user research methodologies, and design systems.',
  },
  {
    id: 4,
    title: 'Tech Tuesday: AI Ethics Webinar',
    date: 'Mar 6, 2026',
    dateISO: '2026-03-06',
    location: 'Online - Zoom',
    category: 'Webinar',
    priceType: 'Free',
    status: 'ongoing',
    isVirtual: true,
    imagePlaceholder: 'https://placehold.co/600x400/27ae60/ffffff?text=AI+Ethics',
    isFeatured: false,
    description: 'Exploring the ethical implications of artificial intelligence in society, featuring industry experts and researchers.',
  },

  // UPCOMING EVENTS (after March 6, 2026)
  {
    id: 5,
    title: 'DCITC Tech Fest 2026',
    date: 'Mar 20-22, 2026',
    dateISO: '2026-03-20',
    endDateISO: '2026-03-22',
    location: 'Dhaka College Campus',
    category: 'Conference',
    priceType: 'Free',
    status: 'upcoming',
    isVirtual: false,
    imagePlaceholder: 'https://placehold.co/600x400/00b4db/ffffff?text=Tech+Fest+2026',
    isFeatured: true,
    isMainFeatured: true,
    description: 'The flagship annual technology festival featuring hackathons, tech talks, project showcases, and networking opportunities with industry professionals.',
  },
  {
    id: 6,
    title: 'Cloud Computing Fundamentals',
    date: 'Mar 15, 2026',
    dateISO: '2026-03-15',
    location: 'Online - Google Meet',
    category: 'Workshop',
    priceType: 'Paid',
    status: 'upcoming',
    isVirtual: true,
    imagePlaceholder: 'https://placehold.co/600x400/1abc9c/ffffff?text=Cloud+Computing',
    isFeatured: false,
    description: 'Learn cloud architecture fundamentals, deployment strategies, and best practices for AWS, Azure, and GCP.',
  },
  {
    id: 7,
    title: 'Robotics Workshop: Arduino Basics',
    date: 'Mar 25, 2026',
    dateISO: '2026-03-25',
    location: 'DCITC Robotics Lab',
    category: 'Workshop',
    priceType: 'Paid',
    status: 'upcoming',
    isVirtual: false,
    imagePlaceholder: 'https://placehold.co/600x400/e74c3c/ffffff?text=Arduino+Workshop',
    isFeatured: true,
    description: 'Hands-on workshop introducing Arduino microcontrollers, sensors, and basic robotics projects.',
  },
  {
    id: 8,
    title: 'Frontend Developers Meetup',
    date: 'Mar 12, 2026',
    dateISO: '2026-03-12',
    location: 'Tech Cafe, Dhanmondi',
    category: 'Meetup',
    priceType: 'Free',
    status: 'upcoming',
    isVirtual: false,
    imagePlaceholder: 'https://placehold.co/600x400/8e44ad/ffffff?text=Frontend+Meetup',
    isFeatured: false,
    description: 'Connect with fellow frontend developers, share experiences, and discuss the latest trends in React (version 19), Next.js, and modern CSS.',
  },
  {
    id: 9,
    title: 'Cybersecurity Awareness Webinar',
    date: 'Mar 18, 2026',
    dateISO: '2026-03-18',
    location: 'Online - YouTube Live',
    category: 'Webinar',
    priceType: 'Free',
    status: 'upcoming',
    isVirtual: true,
    imagePlaceholder: 'https://placehold.co/600x400/2c3e50/ffffff?text=Cybersecurity',
    isFeatured: false,
    description: 'Learn about common cyber threats, password security, phishing prevention, and best practices for online safety.',
  },
  {
    id: 10,
    title: 'Machine Learning Study Group',
    date: 'Mar 28, 2026',
    dateISO: '2026-03-28',
    location: 'DCITC Lab, Dhaka College',
    category: 'Meetup',
    priceType: 'Free',
    status: 'upcoming',
    isVirtual: false,
    imagePlaceholder: 'https://placehold.co/600x400/e67e22/ffffff?text=ML+Study+Group',
    isFeatured: false,
    description: 'Weekly meetup for machine learning enthusiasts to discuss papers, share projects, and learn together.',
  },
  {
    id: 11,
    title: 'Graphic Design Masterclass',
    date: 'Apr 5, 2026',
    dateISO: '2026-04-05',
    location: 'Creative Studio, Gulshan',
    category: 'Workshop',
    priceType: 'Paid',
    status: 'upcoming',
    isVirtual: false,
    imagePlaceholder: 'https://placehold.co/600x400/6c3483/ffffff?text=Design+Masterclass',
    isFeatured: false,
    description: 'Advanced graphic design techniques using Adobe Photoshop, Illustrator, and After Effects.',
  },
  {
    id: 12,
    title: 'Startup Pitch Night',
    date: 'Apr 10, 2026',
    dateISO: '2026-04-10',
    location: 'Innovation Hub, Dhaka',
    category: 'Meetup',
    priceType: 'Free',
    status: 'upcoming',
    isVirtual: false,
    imagePlaceholder: 'https://placehold.co/600x400/16a085/ffffff?text=Pitch+Night',
    isFeatured: false,
    description: 'An evening for aspiring entrepreneurs to pitch their startup ideas to investors and receive feedback.',
  },
];

export const getFeaturedEvents = () => eventsData.filter((e) => e.isFeatured);

export const getEventsByCategory = (category) => {
  if (category === 'all') return eventsData;
  return eventsData.filter((e) => e.category === category);
};

export const getEventsByPriceType = (priceType) => {
  return eventsData.filter((e) => e.priceType === priceType);
};

export const getEventsByStatus = (status) => {
  return eventsData.filter((e) => e.status === status);
};

export const getVirtualEvents = () => eventsData.filter((e) => e.isVirtual);

export const getInPersonEvents = () => eventsData.filter((e) => !e.isVirtual);

export const getEventById = (id) => eventsData.find((e) => e.id === id);

export const getMainFeaturedEvent = () => eventsData.find((e) => e.isMainFeatured);

export const getUpcomingEvents = () => eventsData.filter((e) => e.status === 'upcoming');

export const getPastEvents = () => eventsData.filter((e) => e.status === 'past');

export const getOngoingEvents = () => eventsData.filter((e) => e.status === 'ongoing');

export default eventsData;
