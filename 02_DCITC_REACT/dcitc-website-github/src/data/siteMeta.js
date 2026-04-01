/**
 * DCITC Website - Global Site Metadata
 * Contains contact information, social links, club history, and global statistics
 */

export const contactInfo = {
  email: 'info@dcitc.com',
  phone: '+880 123 456 7890',
  address: 'Dhaka College, Dhaka, Bangladesh',
  membershipFee: '500 BDT/year',
};

export const socialLinks = [
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://facebook.com/dcitc',
    icon: 'fa-brands fa-facebook-f',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    url: 'https://twitter.com/dcitc',
    icon: 'fa-brands fa-twitter',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://instagram.com/dcitc',
    icon: 'fa-brands fa-instagram',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/dcitc',
    icon: 'fa-brands fa-linkedin-in',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://youtube.com/@dcitc',
    icon: 'fa-brands fa-youtube',
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/dcitc',
    icon: 'fa-brands fa-github',
  },
];

export const clubHistory = [
  {
    year: 2018,
    title: 'The Beginning',
    description: 'DCITC was founded by a group of tech enthusiasts at Dhaka College with a vision to create a hub for technology learning and innovation.',
  },
  {
    year: 2019,
    title: 'First Hackathon',
    description: 'Organized our first hackathon with over 100 participants from across Dhaka, marking our entry into the competitive tech scene.',
  },
  {
    year: 2020,
    title: 'Going Virtual',
    description: 'Successfully transitioned to online operations during the pandemic, continuing workshops and events through virtual platforms.',
  },
  {
    year: 2022,
    title: 'Industry Partnerships',
    description: 'Established partnerships with leading tech companies, providing members with internship opportunities and industry mentorship.',
  },
  {
    year: 2023,
    title: 'National Recognition',
    description: 'Received national recognition and awards for significant contributions to technology education in Bangladesh.',
  },
  {
    year: 2025,
    title: 'Expansion & Growth',
    description: 'Grew to over 200 active members and established satellite chapters in other institutions across the country.',
  },
];

export const globalStats = [
  {
    id: 'projects',
    label: 'Projects Completed',
    value: 50,
    suffix: '+',
    icon: 'fa-solid fa-diagram-project',
  },
  {
    id: 'members',
    label: 'Active Members',
    value: 200,
    suffix: '+',
    icon: 'fa-solid fa-users',
  },
  {
    id: 'events',
    label: 'Events Organized',
    value: 25,
    suffix: '+',
    icon: 'fa-solid fa-calendar-check',
  },
  {
    id: 'partners',
    label: 'Industry Partners',
    value: 10,
    suffix: '+',
    icon: 'fa-solid fa-handshake',
  },
];

export const heroStats = [
  {
    id: 'experience',
    label: 'Years Experience',
    value: 6,
    suffix: '+',
  },
  {
    id: 'projects',
    label: 'Projects Delivered',
    value: 50,
    suffix: '+',
  },
  {
    id: 'members',
    label: 'Active Members',
    value: 200,
    suffix: '+',
  },
];

export const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Events', path: '/events' },
];

export const resourceLinks = [
  { label: 'Tutorials', path: '#' },
  { label: 'Workshops', path: '/events' },
  { label: 'Blog', path: '#' },
  { label: 'FAQs', path: '/about#faq' },
];

export const clubInfo = {
  name: 'Dhaka College IT Club',
  shortName: 'DCITC',
  tagline: 'Empowering students with technology skills for the digital future',
  description: 'A student-led technology organization dedicated to fostering technical excellence, encouraging innovation, and building a strong tech community through workshops, projects, and mentorship.',
  foundedYear: 2018,
  copyright: '2025 DCITC. All rights reserved.',
};

export const visionMission = {
  vision: 'To create a hub for technology innovation and produce future tech leaders of Bangladesh who will shape the digital landscape.',
  mission: 'Foster technical excellence, encourage innovation, and build a strong community through hands-on workshops, collaborative projects, and industry mentorship.',
  whatWeDo: 'We organize workshops, hackathons, coding competitions, tech talks, and project collaborations to help students develop real-world technical skills.',
};

export const faqs = [
  {
    id: 1,
    question: 'How can I become a member of DCITC?',
    answer: 'Membership is open to all Dhaka College students. We hold enrollment sessions at the start of each semester followed by an orientation session. No prior programming experience is required.',
  },
  {
    id: 2,
    question: 'What activities does DCITC organize?',
    answer: 'We organize weekly workshops, monthly hackathons, coding competitions, tech talks by industry professionals, and annual tech festivals. Members also collaborate on real-world projects.',
  },
  {
    id: 3,
    question: 'Do I need prior programming experience to join?',
    answer: 'No, absolutely not! DCITC welcomes students of all skill levels. We have dedicated tracks and workshops for complete beginners as well as advanced members.',
  },
  {
    id: 4,
    question: 'Are there any membership fees?',
    answer: 'The annual membership fee is 500 BDT, which covers access to all regular workshops and resources. Fee waivers are available for students who demonstrate financial need.',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Tanzim Hossain',
    role: 'Software Engineer',
    batch: 'Class of 2022',
    image: '/assets/testimonials/tanzim.jpg',
    quote: 'The workshops and hands-on projects at DCITC helped me land my first internship. The community support was invaluable in my journey.',
  },
  {
    id: 2,
    name: 'Nusrat Jahan',
    role: 'UX Designer',
    batch: 'Class of 2023',
    image: '/assets/testimonials/nusrat.jpg',
    quote: 'DCITC provided the mentorship and feedback sessions that shaped my design career. I learned more here than in any classroom.',
  },
  {
    id: 3,
    name: 'Rifat Khan',
    role: 'Full-stack Developer',
    batch: 'Current Member',
    image: '/assets/testimonials/rifat.jpg',
    quote: 'As a beginner, I found DCITC to be incredibly inclusive. The senior members are always willing to help and guide newcomers.',
  },
];
