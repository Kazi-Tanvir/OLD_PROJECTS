/**
 * DCITC About Page Data
 * Contains content for Vision, Mission, Timeline, Stats, Testimonials, and FAQs
 */

// About Cards - Vision, Mission, What We Do
export const aboutCards = [
  {
    id: 'vision',
    title: 'Our Vision',
    description: 'To create a hub for tech innovation at Dhaka College and produce future tech leaders of Bangladesh who will drive digital transformation across industries.',
    icon: 'fa-solid fa-eye',
  },
  {
    id: 'mission',
    title: 'Our Mission',
    description: 'To foster technical excellence, encourage innovation, and build a strong community through workshops, collaborative projects, and mentorship programs.',
    icon: 'fa-solid fa-rocket',
  },
  {
    id: 'what-we-do',
    title: 'What We Do',
    description: 'We organize workshops, hackathons, coding competitions, tech talks, and project collaborations to help students develop practical skills and industry connections.',
    icon: 'fa-solid fa-laptop-code',
  },
];

// Timeline Data - Club History (with full dates for interactive timeline)
export const timelineData = [
  {
    id: 'event-1',
    year: '2018',
    date: '01 Jan',
    milestone: 'The Beginning',
    description: 'Founded by a group of tech enthusiasts at Dhaka College with a vision to spread technology education and create future tech leaders of Bangladesh.',
    icon: 'fa-solid fa-flag',
  },
  {
    id: 'event-2',
    year: '2018',
    date: '21 Mar',
    milestone: 'College Robotics Contest Winner',
    description: 'Our first achievement came when we won the 1st robotics competition for college organized by campusbd.net with a prize of 1 lakh taka.',
    icon: 'fa-solid fa-trophy',
  },
  {
    id: 'event-3',
    year: '2018',
    date: '23 Nov',
    milestone: 'First Web Development Workshop',
    description: 'Conducted our inaugural web development workshop introducing HTML, CSS, and JavaScript to over 50 students.',
    icon: 'fa-solid fa-code',
  },
  {
    id: 'event-4',
    year: '2019',
    date: '09 Aug',
    milestone: 'First Hackathon',
    description: 'Organized our first hackathon with 100+ participants from across Dhaka, establishing our presence in the tech community.',
    icon: 'fa-solid fa-laptop-code',
  },
  {
    id: 'event-5',
    year: '2023',
    date: '03 Apr',
    milestone: 'National Recognition',
    description: 'Received national recognition for our contributions to tech education and community building across Bangladesh.',
    icon: 'fa-solid fa-award',
  },
  {
    id: 'event-6',
    year: '2023',
    date: '15 Sep',
    milestone: 'Industry Partnerships',
    description: 'Established partnerships with leading tech companies for internships and mentoring programs for our members.',
    icon: 'fa-solid fa-handshake',
  },
  {
    id: 'event-7',
    year: '2025',
    date: '12 Jan',
    milestone: 'Expansion & Growth',
    description: 'Grew to 700+ total members and 2700+ alumni, cementing our position as the premier IT club in Bangladesh.',
    icon: 'fa-solid fa-chart-line',
  },
];

// Journey Stats - for the timeline sidebar
export const journeyStats = {
  totalEvents: 22,
  intraEvents: 15,
  nationalEvents: 7,
  totalMembers: 700,
  totalAlumni: 2700,
  yearsOfJourney: 7,
  totalPanelists: 24,
};

// Impact Statistics
export const impactStats = [
  {
    id: 'members',
    label: 'Active Members',
    value: 200,
    icon: 'fa-solid fa-users',
    suffix: '+',
  },
  {
    id: 'projects',
    label: 'Projects Completed',
    value: 50,
    icon: 'fa-solid fa-code',
    suffix: '+',
  },
  {
    id: 'events',
    label: 'Events Organized',
    value: 25,
    icon: 'fa-solid fa-calendar-check',
    suffix: '+',
  },
  {
    id: 'partners',
    label: 'Industry Partners',
    value: 10,
    icon: 'fa-solid fa-handshake',
    suffix: '+',
  },
];

// Testimonials
export const testimonials = [
  {
    id: 'testimonial-1',
    name: 'Tanzim Hossain',
    role: 'Class of 2022, Software Engineer',
    quote: 'The workshops at DCITC helped me land my first internship. The practical skills I gained here gave me a significant edge in interviews.',
    avatar: 'TH',
  },
  {
    id: 'testimonial-2',
    name: 'Nusrat Jahan',
    role: 'Class of 2023, UX Designer',
    quote: 'The mentorship and feedback sessions at DCITC were invaluable. I found my passion for design through the graphics department here.',
    avatar: 'NJ',
  },
  {
    id: 'testimonial-3',
    name: 'Rifat Khan',
    role: 'Current Member, Full-stack Developer',
    quote: 'DCITC has the most inclusive community for beginners. No matter your skill level, you will find support and guidance to grow.',
    avatar: 'RK',
  },
];

// FAQs
export const faqs = [
  {
    id: 'faq-1',
    question: 'How can I become a member of DCITC?',
    answer: 'Any Dhaka College student can join DCITC. We open enrollment at the start of each semester with an orientation session. No prior programming experience is required - we welcome students of all skill levels.',
  },
  {
    id: 'faq-2',
    question: 'What activities does DCITC organize?',
    answer: 'We organize weekly workshops, monthly hackathons, coding competitions, tech talks by industry professionals, and an annual tech festival. Our departments also run specialized training programs throughout the year.',
  },
  {
    id: 'faq-3',
    question: 'Do I need prior programming experience to join?',
    answer: 'No, absolutely not! DCITC welcomes students of all skill levels. We have beginner-friendly workshops and a mentorship program that pairs newcomers with experienced members.',
  },
  {
    id: 'faq-4',
    question: 'What are the membership fees?',
    answer: 'The annual membership fee is 500 BDT, which covers all regular workshops and access to our resources. Fee waivers are available for students who need financial assistance.',
  },
];

export default {
  aboutCards,
  timelineData,
  impactStats,
  testimonials,
  faqs,
};
