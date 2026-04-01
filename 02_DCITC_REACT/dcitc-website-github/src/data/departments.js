/**
 * DCITC Website - Departments Data
 * Contains all department information including stats, tech stacks, and descriptions
 */

export const departments = [
  {
    id: 'web-dev',
    name: 'Web & App Development',
    icon: 'fa-solid fa-code',
    tagline: 'Building the Digital Future',
    description: 'Our Web & App Development department focuses on creating modern, responsive web applications and mobile apps. Members learn industry-standard frameworks and tools while working on real-world projects that solve actual problems.',
    stats: {
      projects: 25,
      members: 12,
      awards: 8,
    },
    techStack: ['React', 'Flutter', 'Node.js', 'JavaScript', 'Firebase'],
    isFeatured: true,
    slug: 'web-app-development',
    color: '#00b4db',
  },
  {
    id: 'competitive-programming',
    name: 'Competitive Programming',
    icon: 'fa-solid fa-terminal',
    tagline: 'Sharpening Problem-Solving Skills',
    description: 'The Competitive Programming department trains members in algorithmic thinking and problem-solving. We participate in national and international programming contests, building a strong foundation in data structures and algorithms.',
    stats: {
      contests: 30,
      members: 15,
      medals: 10,
    },
    techStack: ['C++', 'Java', 'Python', 'DSA', 'Algorithms'],
    isFeatured: true,
    slug: 'competitive-programming',
    color: '#9b59b6',
  },
  {
    id: 'robotics',
    name: 'Robotics',
    icon: 'fa-solid fa-robot',
    tagline: 'Engineering Tomorrow\'s Machines',
    description: 'Our Robotics department brings together hardware and software enthusiasts to build intelligent machines. From Arduino projects to advanced IoT systems, members gain hands-on experience with embedded systems and automation.',
    stats: {
      projects: 18,
      members: 10,
      competitions: 5,
    },
    techStack: ['Arduino', 'Raspberry Pi', 'IoT', 'Embedded Systems', '3D Printing'],
    isFeatured: true,
    slug: 'robotics',
    color: '#e74c3c',
  },
  {
    id: 'graphics-design',
    name: 'Graphics Designing',
    icon: 'fa-solid fa-palette',
    tagline: 'Crafting Visual Experiences',
    description: 'The Graphics Designing department creates stunning visual content for the club and beyond. Members master industry-standard design tools while developing their creative portfolios through branding, UI/UX, and multimedia projects.',
    stats: {
      projects: 40,
      members: 8,
      exhibitions: 12,
    },
    techStack: ['Photoshop', 'Illustrator', 'Figma', 'After Effects', 'Blender'],
    isFeatured: true,
    slug: 'graphics-designing',
    color: '#f39c12',
  },
  {
    id: 'cyber-security',
    name: 'Cyber Security',
    icon: 'fa-solid fa-shield-halved',
    tagline: 'Defending the Digital Realm',
    description: 'Our Cyber Security department focuses on ethical hacking, network security, and digital forensics. Members participate in CTF competitions and learn to identify vulnerabilities while building secure systems.',
    stats: {
      projects: 15,
      members: 7,
      ctfWins: 6,
    },
    techStack: ['Ethical Hacking', 'Network Security', 'Cryptography', 'Forensics', 'Penetration Testing'],
    isFeatured: true,
    slug: 'cyber-security',
    color: '#27ae60',
  },
];

export const departmentFilters = [
  { id: 'all', label: 'All Departments', value: 'all' },
  { id: 'web-dev', label: 'Web & App Dev', value: 'web-dev' },
  { id: 'competitive-programming', label: 'Competitive Programming', value: 'competitive-programming' },
  { id: 'robotics', label: 'Robotics', value: 'robotics' },
  { id: 'graphics-design', label: 'Graphics Designing', value: 'graphics-design' },
  { id: 'cyber-security', label: 'Cyber Security', value: 'cyber-security' },
];

export const executiveDepartmentFilters = [
  { id: 'all', label: 'All Departments', value: 'all' },
  { id: 'core', label: 'Core Team', value: 'Core Executive Team' },
  { id: 'admin', label: 'Administration', value: 'Administration' },
  { id: 'pr', label: 'Public Relations', value: 'Public Relations' },
  { id: 'graphics', label: 'Graphics & Design', value: 'Graphics & Design' },
  { id: 'web', label: 'Web & App Development', value: 'Web & App Development' },
  { id: 'robotics', label: 'Robotics & Programming', value: 'Robotics & Programming' },
];

export default departments;
