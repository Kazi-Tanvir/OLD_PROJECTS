/**
 * DCITC Website - Projects Data
 * Contains all project portfolio information organized by category
 */

export const projectCategories = [
  { id: 'all', label: 'All Projects', value: 'all' },
  { id: 'web-dev', label: 'Web Development', value: 'Web Development' },
  { id: 'cp', label: 'Competitive Programming', value: 'Competitive Programming' },
  { id: 'graphics', label: 'Graphics Designing', value: 'Graphics Designing' },
  { id: 'cyber', label: 'Cyber Security', value: 'Cyber Security' },
  { id: 'robotics', label: 'Robotics & AI/ML', value: 'Robotics & AI/ML' },
];

export const projects = [
  // Web Development Projects
  {
    id: 'web-001',
    title: 'E-commerce Platform',
    category: 'Web Development',
    description: 'A full-featured e-commerce platform with product catalog, shopping cart, payment integration, and admin dashboard.',
    techStack: ['React', 'Node.js', 'MongoDB'],
    stats: {
      branches: 15,
      contributors: 3,
    },
    imagePlaceholder: 'https://placehold.co/600x400/00b4db/ffffff?text=E-commerce+Platform',
    links: {
      github: 'https://github.com/dcitc/ecommerce-platform',
      liveDemo: 'https://ecommerce.dcitc.com',
    },
    isFeatured: true,
  },
  {
    id: 'web-002',
    title: 'Portfolio Website',
    category: 'Web Development',
    description: 'A modern, animated portfolio website showcasing projects and skills with smooth GSAP animations.',
    techStack: ['HTML/CSS', 'JavaScript', 'GSAP'],
    stats: {
      branches: 8,
      contributors: 1,
    },
    imagePlaceholder: 'https://placehold.co/600x400/0083b0/ffffff?text=Portfolio+Website',
    links: {
      github: 'https://github.com/dcitc/portfolio-template',
      liveDemo: 'https://portfolio.dcitc.com',
    },
    isFeatured: false,
  },
  {
    id: 'web-003',
    title: 'Blog Platform',
    category: 'Web Development',
    description: 'A modern blogging platform with rich text editing, user authentication, and real-time comments.',
    techStack: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    stats: {
      branches: 12,
      contributors: 2,
    },
    imagePlaceholder: 'https://placehold.co/600x400/00d4ff/ffffff?text=Blog+Platform',
    links: {
      github: 'https://github.com/dcitc/blog-platform',
      liveDemo: 'https://blog.dcitc.com',
    },
    isFeatured: false,
  },
  {
    id: 'web-004',
    title: 'Weather Dashboard',
    category: 'Web Development',
    description: 'An interactive weather dashboard with real-time forecasts, historical data charts, and location search.',
    techStack: ['React', 'Weather API', 'Chart.js'],
    stats: {
      branches: 6,
      contributors: 1,
    },
    imagePlaceholder: 'https://placehold.co/600x400/1a1a1a/00b4db?text=Weather+Dashboard',
    links: {
      github: 'https://github.com/dcitc/weather-dashboard',
      liveDemo: 'https://weather.dcitc.com',
    },
    isFeatured: false,
  },

  // Competitive Programming Projects
  {
    id: 'cp-001',
    title: 'Algorithm Visualizer',
    category: 'Competitive Programming',
    description: 'An interactive tool to visualize sorting algorithms, graph traversals, and pathfinding algorithms step-by-step.',
    techStack: ['JavaScript', 'D3.js', 'CSS'],
    stats: {
      branches: 10,
      contributors: 2,
    },
    imagePlaceholder: 'https://placehold.co/600x400/9b59b6/ffffff?text=Algorithm+Visualizer',
    links: {
      github: 'https://github.com/dcitc/algorithm-visualizer',
      liveDemo: 'https://algo-viz.dcitc.com',
    },
    isFeatured: true,
  },
  {
    id: 'cp-002',
    title: 'CP Library',
    category: 'Competitive Programming',
    description: 'A comprehensive collection of optimized algorithms and data structure implementations for competitive programming.',
    techStack: ['C++', 'Algorithms', 'Data Structures'],
    stats: {
      branches: 23,
      contributors: 4,
    },
    imagePlaceholder: 'https://placehold.co/600x400/8e44ad/ffffff?text=CP+Library',
    links: {
      github: 'https://github.com/dcitc/cp-library',
      liveDemo: null,
    },
    isFeatured: true,
  },
  {
    id: 'cp-003',
    title: 'Contest Platform',
    category: 'Competitive Programming',
    description: 'A full-fledged online judge platform for hosting programming contests with automated test case evaluation.',
    techStack: ['Python', 'Django', 'PostgreSQL'],
    stats: {
      branches: 18,
      contributors: 3,
    },
    imagePlaceholder: 'https://placehold.co/600x400/6c3483/ffffff?text=Contest+Platform',
    links: {
      github: 'https://github.com/dcitc/contest-platform',
      liveDemo: 'https://judge.dcitc.com',
    },
    isFeatured: false,
  },

  // Graphics Designing Projects
  {
    id: 'gfx-001',
    title: 'Brand Identity Package',
    category: 'Graphics Designing',
    description: 'Complete brand identity design including logo, color palette, typography guidelines, and marketing materials.',
    techStack: ['Adobe Illustrator', 'Branding', 'Logo Design'],
    stats: {
      branches: 7,
      contributors: 2,
    },
    imagePlaceholder: 'https://placehold.co/600x400/f39c12/ffffff?text=Brand+Identity',
    links: {
      github: null,
      liveDemo: 'https://behance.net/dcitc/brand-identity',
    },
    isFeatured: true,
  },
  {
    id: 'gfx-002',
    title: 'UI/UX Design System',
    category: 'Graphics Designing',
    description: 'A comprehensive design system with reusable UI components, style guides, and interaction patterns.',
    techStack: ['Figma', 'UI Components', 'Design System'],
    stats: {
      branches: 12,
      contributors: 3,
    },
    imagePlaceholder: 'https://placehold.co/600x400/e67e22/ffffff?text=Design+System',
    links: {
      github: null,
      liveDemo: 'https://figma.com/@dcitc/design-system',
    },
    isFeatured: true,
  },
  {
    id: 'gfx-003',
    title: '3D Character Modeling',
    category: 'Graphics Designing',
    description: 'A collection of stylized 3D character models created for games and animations with rigging and textures.',
    techStack: ['Blender', '3D Modeling', 'Character Design'],
    stats: {
      branches: 5,
      contributors: 1,
    },
    imagePlaceholder: 'https://placehold.co/600x400/d35400/ffffff?text=3D+Characters',
    links: {
      github: null,
      liveDemo: 'https://artstation.com/dcitc/characters',
    },
    isFeatured: false,
  },

  // Cyber Security Projects
  {
    id: 'sec-001',
    title: 'Network Security Monitor',
    category: 'Cyber Security',
    description: 'A real-time network traffic analyzer and intrusion detection system with alerting capabilities.',
    techStack: ['Python', 'Flask', 'Network Analysis'],
    stats: {
      branches: 14,
      contributors: 2,
    },
    imagePlaceholder: 'https://placehold.co/600x400/27ae60/ffffff?text=Network+Monitor',
    links: {
      github: 'https://github.com/dcitc/network-monitor',
      liveDemo: null,
    },
    isFeatured: true,
  },
  {
    id: 'sec-002',
    title: 'Vulnerability Scanner',
    category: 'Cyber Security',
    description: 'An automated vulnerability scanning tool for web applications with detailed reporting and remediation suggestions.',
    techStack: ['Go', 'Security', 'Penetration Testing'],
    stats: {
      branches: 21,
      contributors: 3,
    },
    imagePlaceholder: 'https://placehold.co/600x400/2ecc71/ffffff?text=Vuln+Scanner',
    links: {
      github: 'https://github.com/dcitc/vuln-scanner',
      liveDemo: null,
    },
    isFeatured: true,
  },
  {
    id: 'sec-003',
    title: 'CTF Writeup Collection',
    category: 'Cyber Security',
    description: 'A curated collection of capture-the-flag competition writeups covering various security challenges and techniques.',
    techStack: ['Linux', 'Bash', 'Various'],
    stats: {
      branches: null,
      contributors: null,
    },
    imagePlaceholder: 'https://placehold.co/600x400/1abc9c/ffffff?text=CTF+Writeups',
    links: {
      github: 'https://github.com/dcitc/ctf-writeups',
      liveDemo: null,
    },
    isFeatured: false,
  },

  // Robotics & AI/ML Projects
  {
    id: 'robo-001',
    title: 'Autonomous Line Follower',
    category: 'Robotics & AI/ML',
    description: 'An Arduino-based autonomous robot that follows lines using IR sensors with PID control for smooth navigation.',
    techStack: ['Arduino', 'C++', 'PID Control'],
    stats: {
      branches: 8,
      contributors: 3,
    },
    imagePlaceholder: 'https://placehold.co/600x400/e74c3c/ffffff?text=Line+Follower',
    links: {
      github: 'https://github.com/dcitc/line-follower',
      liveDemo: null,
    },
    isFeatured: true,
  },
  {
    id: 'robo-002',
    title: 'Smart Home IoT System',
    category: 'Robotics & AI/ML',
    description: 'A complete IoT home automation system with mobile app control, voice commands, and energy monitoring.',
    techStack: ['Raspberry Pi', 'Python', 'IoT', 'MQTT'],
    stats: {
      branches: 16,
      contributors: 4,
    },
    imagePlaceholder: 'https://placehold.co/600x400/c0392b/ffffff?text=Smart+Home',
    links: {
      github: 'https://github.com/dcitc/smart-home-iot',
      liveDemo: null,
    },
    isFeatured: true,
  },
  {
    id: 'robo-003',
    title: 'Image Classification Model',
    category: 'Robotics & AI/ML',
    description: 'A deep learning model for image classification trained on custom datasets with a web-based demo interface.',
    techStack: ['Python', 'TensorFlow', 'CNN', 'Flask'],
    stats: {
      branches: 11,
      contributors: 2,
    },
    imagePlaceholder: 'https://placehold.co/600x400/a93226/ffffff?text=Image+Classifier',
    links: {
      github: 'https://github.com/dcitc/image-classifier',
      liveDemo: 'https://ml-demo.dcitc.com',
    },
    isFeatured: false,
  },
];

export const getFeaturedProjects = () => projects.filter((p) => p.isFeatured);

export const getProjectsByCategory = (category) => {
  if (category === 'all') return projects;
  return projects.filter((p) => p.category === category);
};

export const getProjectById = (id) => projects.find((p) => p.id === id);

export default projects;
