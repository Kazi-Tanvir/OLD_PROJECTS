/**
 * DCITC Executive Team Data
 * 
 * Structure: executiveSessions object grouped by session/category
 * - "Faculty": Faculty supervisors (year-independent)
 * - "2026": Current session executives
 * - "2025": Previous session executives
 * 
 * Image Path Pattern: /src/assets/images/team/[session]/[position].jpg
 */

export const executiveSessions = {
  Faculty: [
    {
      id: 'fac-001',
      name: 'Dr. Jane Smith',
      position: 'Faculty Supervisor',
      department: 'Computer Science',
      image: '/src/assets/images/team/faculty/faculty_supervisor_cs.jpg',
      bio: 'Dr. Jane Smith has been guiding DCITC with her extensive experience in computer science education and research. She specializes in artificial intelligence and machine learning, bringing cutting-edge knowledge to the club.',
      skills: ['Artificial Intelligence', 'Machine Learning', 'Research Methodology', 'Academic Mentorship'],
      socials: {
        linkedin: 'https://linkedin.com/in/drjanesmith',
        email: 'jane.smith@dhakacollege.edu.bd',
        researchgate: 'https://researchgate.net/profile/Jane-Smith'
      }
    },
    {
      id: 'fac-002',
      name: 'Prof. Michael Chen',
      position: 'Faculty Supervisor',
      department: 'Software Engineering',
      image: '/src/assets/images/team/faculty/faculty_supervisor_se.jpg',
      bio: 'Prof. Michael Chen brings industry experience combined with academic excellence. His expertise in software engineering practices helps students bridge the gap between theoretical knowledge and real-world applications.',
      skills: ['Software Architecture', 'Agile Methodologies', 'Industry Collaboration', 'Project Management'],
      socials: {
        linkedin: 'https://linkedin.com/in/profmichaelchen',
        email: 'michael.chen@dhakacollege.edu.bd',
        github: 'https://github.com/profmichaelchen'
      }
    },
    {
      id: 'fac-003',
      name: 'Dr. Sarah Johnson',
      position: 'Faculty Supervisor',
      department: 'Data Science',
      image: '/src/assets/images/team/faculty/faculty_supervisor_ds.jpg',
      bio: 'Dr. Sarah Johnson oversees data science initiatives at DCITC. Her research in big data analytics and statistical modeling provides students with valuable insights into data-driven decision making.',
      skills: ['Data Analytics', 'Statistical Modeling', 'Big Data', 'Research Publication'],
      socials: {
        linkedin: 'https://linkedin.com/in/drsarahjohnson',
        email: 'sarah.johnson@dhakacollege.edu.bd',
        researchgate: 'https://researchgate.net/profile/Sarah-Johnson'
      }
    }
  ],

  '2026': [
    // Executive Board
    {
      id: '2026-001',
      name: 'M M Mushfiq Bin Musa',
      position: 'President',
      department: 'Executive Board',
      image: '/src/assets/images/team/2026/president.jpg',
      bio: 'M M Mushfiq Bin Musa leads DCITC with a vision to empower every member with cutting-edge technology skills. Under his leadership, the club continues to expand its reach and impact across the institution.',
      skills: ['Leadership', 'Strategic Planning', 'Public Speaking', 'Team Management'],
      socials: {
        email: 'president@dcitc.com'
      }
    },
    {
      id: '2026-002',
      name: 'Tahasin Raj Khan',
      position: 'Vice President',
      department: 'Executive Board',
      image: '/src/assets/images/team/2026/vice_president.jpg',
      bio: 'Tahasin Raj Khan supports the president in all club operations and drives member engagement initiatives. His technical expertise and interpersonal skills make him an invaluable part of the executive board.',
      skills: ['Operations Management', 'Event Planning', 'Communication', 'Problem Solving'],
      socials: {
        email: 'vp@dcitc.com'
      }
    },
    {
      id: '2026-003',
      name: 'Sakhwat Hossain Saikot',
      position: 'General Secretary',
      department: 'Executive Board',
      image: '/src/assets/images/team/2026/general_secretary.jpg',
      bio: 'Sakhwat Hossain Saikot manages all administrative functions and ensures smooth communication between departments. His organizational skills keep the club running efficiently.',
      skills: ['Administration', 'Documentation', 'Coordination', 'Communication'],
      socials: {
        email: 'gs@dcitc.com'
      }
    },

    // Chief Executives
    {
      id: '2026-004',
      name: 'Jannato Adon Soaeb',
      position: 'Chief Executive of Administration',
      department: 'Administration',
      image: '/src/assets/images/team/2026/chief_executive_administration.jpg',
      bio: 'Jannato Adon Soaeb oversees all administrative operations, ensuring that club activities run smoothly and all members are well-supported.',
      skills: ['Administrative Leadership', 'Policy Development', 'Team Coordination', 'Resource Management'],
      socials: {
        email: 'admin@dcitc.com'
      }
    },
    {
      id: '2026-005',
      name: 'Arpon Saha',
      position: 'Chief Executive of Content Writing & Publication',
      department: 'Content Writing & Publication',
      image: '/src/assets/images/team/2026/chief_executive_content_writing_publication.jpg',
      bio: 'Arpon Saha leads the content team, producing engaging articles, publications, and written materials that showcase DCITC\'s activities and achievements.',
      skills: ['Content Writing', 'Publication', 'Editorial', 'Creative Writing', 'Documentation'],
      socials: {
        email: 'content@dcitc.com'
      }
    },
    {
      id: '2026-006',
      name: 'MD An Nafi',
      position: 'Chief Executive of Graphics & Design',
      department: 'Graphics & Design',
      image: '/src/assets/images/team/2026/chief_executive_graphics_design.jpg',
      bio: 'MD An Nafi leads the creative team, producing stunning visuals for events, social media, and club branding. His design philosophy merges aesthetics with functionality.',
      skills: ['Graphic Design', 'UI/UX Design', 'Adobe Creative Suite', 'Figma', 'Brand Identity'],
      socials: {
        email: 'design@dcitc.com'
      }
    },
    {
      id: '2026-007',
      name: 'MD Rudro Biswas',
      position: 'Chief Executive of Web Development & Cyber Security',
      department: 'Web Development & Cyber Security',
      image: '/src/assets/images/team/2026/chief_executive_web_development_cyber_security.jpg',
      bio: 'MD Rudro Biswas leads the web development and cyber security department, building secure digital solutions and ensuring the club\'s online presence is protected.',
      skills: ['Web Development', 'Cyber Security', 'Full-Stack Development', 'Network Security', 'System Architecture'],
      socials: {
        email: 'webdev@dcitc.com'
      }
    },
    {
      id: '2026-008',
      name: 'Srijon Kumar Shill',
      position: 'Chief Executive of Programming & Robotics',
      department: 'Programming & Robotics',
      image: '/src/assets/images/team/2026/chief_executive_programming_robotics.jpg',
      bio: 'Srijon Kumar Shill leads the programming and robotics teams. He organizes coding contests, robotics workshops, and competitive programming sessions for skill development.',
      skills: ['C++', 'Python', 'Arduino', 'Competitive Programming', 'Embedded Systems', 'Algorithm Design'],
      socials: {
        email: 'programming@dcitc.com'
      }
    },

    // Joint Executives
    {
      id: '2026-009',
      name: 'Nazmul Alom Shanto',
      position: 'Joint Executive of Programming & Robotics',
      department: 'Programming & Robotics',
      image: '/src/assets/images/team/2026/joint_executive_programming_robotics.jpg',
      bio: 'Nazmul Alom Shanto assists in programming and robotics projects, helping train members in coding fundamentals and problem-solving techniques.',
      skills: ['Python', 'Robotics', 'IoT', 'Data Structures', 'Problem Solving', 'Mentorship'],
      socials: {
        email: 'programming.joint@dcitc.com'
      }
    }
  ],

  '2025': [
    // Core Executive Team
    {
      id: '2025-001',
      name: 'Ahnaf Hasan',
      position: 'President',
      department: 'Core Team',
      image: '/src/assets/images/team/2025/president.jpg',
      bio: 'Ahnaf Hasan led DCITC with a vision to empower every member with cutting-edge technology skills. Under his leadership, the club expanded its reach and impact across the institution.',
      skills: ['Leadership', 'Strategic Planning', 'Public Speaking', 'Full-Stack Development', 'Team Management'],
      socials: {
        email: 'ahnaf.hasan@alumni.dcitc.com'
      }
    },
    {
      id: '2025-002',
      name: 'Maloy Roy Orko',
      position: 'Vice President',
      department: 'Core Team',
      image: '/src/assets/images/team/2025/vice_president.jpg',
      bio: 'Maloy Roy Orko supported the president in all club operations and drove member engagement initiatives. His technical expertise and interpersonal skills made him an invaluable part of the core team.',
      skills: ['Operations Management', 'Event Planning', 'Frontend Development', 'Communication', 'Problem Solving'],
      socials: {
        email: 'maloy.orko@alumni.dcitc.com'
      }
    },
    {
      id: '2025-003',
      name: 'Muhammad Hasin Raihan',
      position: 'General Secretary',
      department: 'Core Team',
      image: '/src/assets/images/team/2025/general_secretary.jpg',
      bio: 'Muhammad Hasin Raihan managed all administrative functions and ensured smooth communication between departments. His organizational skills kept the club running efficiently.',
      skills: ['Administration', 'Documentation', 'Coordination', 'Backend Development', 'Database Management'],
      socials: {
        email: 'hasin.raihan@alumni.dcitc.com'
      }
    },
    {
      id: '2025-004',
      name: 'Solaiman Tanvir Raj',
      position: 'Treasurer',
      department: 'Core Team',
      image: '/src/assets/images/team/2025/treasurer.jpg',
      bio: 'Solaiman Tanvir Raj handled all financial matters of the club with transparency and precision. He ensured proper budget allocation for events and projects.',
      skills: ['Financial Management', 'Budget Planning', 'Accounting', 'Excel', 'Financial Analysis'],
      socials: {
        email: 'solaiman.raj@alumni.dcitc.com'
      }
    },

    // Department Executives
    {
      id: '2025-005',
      name: 'Husain Zuhair Zuhan',
      position: 'Chief Executive of Administration',
      department: 'Administration',
      image: '/src/assets/images/team/2025/chief_executive_administration.jpg',
      bio: 'Husain Zuhair Zuhan oversaw all administrative operations, ensuring that club activities ran smoothly and all members were well-supported.',
      skills: ['Administrative Leadership', 'Policy Development', 'Team Coordination', 'Resource Management'],
      socials: {
        email: 'husain.zuhan@alumni.dcitc.com'
      }
    },
    {
      id: '2025-006',
      name: 'Muhammad Arman',
      position: 'Chief Executive of Public Relation',
      department: 'Public Relations',
      image: '/src/assets/images/team/2025/chief_executive_public_relation.jpg',
      bio: 'Muhammad Arman managed external communications and partnerships. He built relationships with sponsors, media, and other tech communities.',
      skills: ['Public Relations', 'Partnership Development', 'Social Media Management', 'Content Strategy', 'Networking'],
      socials: {
        email: 'muhammad.arman@alumni.dcitc.com'
      }
    },
    {
      id: '2025-007',
      name: 'Md. Tanzilur Rahman Fakir',
      position: 'Joint Executive of Public Relation',
      department: 'Public Relations',
      image: '/src/assets/images/team/2025/joint_executive_public_relation.jpg',
      bio: 'Md. Tanzilur Rahman Fakir assisted in public relations activities and helped maintain the club\'s public image through various communication channels.',
      skills: ['Communication', 'Event Promotion', 'Content Writing', 'Social Media', 'Brand Management'],
      socials: {
        email: 'tanzilur.fakir@alumni.dcitc.com'
      }
    },
    {
      id: '2025-008',
      name: 'Muhtasim Muin',
      position: 'Chief Executive of Graphics & Design',
      department: 'Graphics & Design',
      image: '/src/assets/images/team/2025/chief_executive_graphics_design.jpg',
      bio: 'Muhtasim Muin led the creative team, producing stunning visuals for events, social media, and club branding. His design philosophy merged aesthetics with functionality.',
      skills: ['Graphic Design', 'UI/UX Design', 'Adobe Creative Suite', 'Figma', 'Brand Identity', 'Motion Graphics'],
      socials: {
        email: 'muhtasim.muin@alumni.dcitc.com'
      }
    },
    {
      id: '2025-009',
      name: 'Sadid Hasan Dhurbak',
      position: 'Joint Executive of Graphics & Design',
      department: 'Graphics & Design',
      image: '/src/assets/images/team/2025/joint_executive_graphics_design.jpg',
      bio: 'Sadid Hasan Dhurbak contributed creative designs for various club initiatives. He specialized in digital illustrations and promotional materials.',
      skills: ['Digital Illustration', 'Poster Design', 'Photoshop', 'Illustrator', 'Visual Communication'],
      socials: {
        email: 'sadid.dhurbak@alumni.dcitc.com'
      }
    },
    {
      id: '2025-010',
      name: 'Kazi Md Mainul Islam Tanvir',
      position: 'Chief Executive of Web & App Development',
      department: 'Web & App Development',
      image: '/src/assets/images/team/2025/chief_executive_web_app_development.jpg',
      bio: 'Kazi Md Mainul Islam Tanvir led the web and app development department, building digital solutions that showcased the club\'s technical prowess.',
      skills: ['React', 'Node.js', 'Flutter', 'Full-Stack Development', 'System Architecture', 'API Design'],
      socials: {
        email: 'mainul.tanvir@alumni.dcitc.com'
      }
    },
    {
      id: '2025-011',
      name: 'Kazi Md Amimul Ahsan Tamim',
      position: 'Joint Executive of Web & App Development',
      department: 'Web & App Development',
      image: '/src/assets/images/team/2025/joint_executive_web_app_development.jpg',
      bio: 'Kazi Md Amimul Ahsan Tamim supported web development projects and mentored junior members in modern web technologies.',
      skills: ['JavaScript', 'React', 'CSS/SASS', 'Firebase', 'Git', 'Responsive Design'],
      socials: {
        email: 'amimul.tamim@alumni.dcitc.com'
      }
    },
    {
      id: '2025-012',
      name: 'Md. Junayet Hassan',
      position: 'Chief Executive of Robotics & Programming',
      department: 'Robotics & Programming',
      image: '/src/assets/images/team/2025/chief_executive_robotics_programming.jpg',
      bio: 'Md. Junayet Hassan led the robotics and competitive programming teams. He organized coding contests and robotics workshops for skill development.',
      skills: ['C++', 'Python', 'Arduino', 'Competitive Programming', 'Embedded Systems', 'Algorithm Design'],
      socials: {
        email: 'junayet.hassan@alumni.dcitc.com'
      }
    },
    {
      id: '2025-013',
      name: 'Abdullah Al Mahi',
      position: 'Joint Executive of Robotics & Programming',
      department: 'Robotics & Programming',
      image: '/src/assets/images/team/2025/joint_executive_robotics_programming.jpg',
      bio: 'Abdullah Al Mahi assisted in robotics projects and helped train members in programming fundamentals and problem-solving techniques.',
      skills: ['Python', 'Raspberry Pi', 'IoT', 'Data Structures', 'Problem Solving', 'Mentorship'],
      socials: {
        email: 'abdullah.mahi@alumni.dcitc.com'
      }
    }
  ]
};

// Available departments for filtering (used in Executives page)
export const executiveDepartments = [
  'All Departments',
  'Executive Board',
  'Core Team',
  'Administration',
  'Content Writing & Publication',
  'Graphics & Design',
  'Web Development & Cyber Security',
  'Web & App Development',
  'Programming & Robotics',
  'Robotics & Programming',
  'Public Relations'
];

// Session labels for tabs
export const sessionLabels = ['Faculty', '2026', '2025'];

export default executiveSessions;
