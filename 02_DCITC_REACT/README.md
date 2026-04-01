
---

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Usage |
|---|---|---|
| HTML5 | — | Page structure |
| CSS3 | — | Styling, animations |
| JavaScript (ES6+) | — | All interactivity |
| Google Fonts (Inter, Montserrat, Poppins) | — | Typography |
| Font Awesome | 6.4.0 | Icons throughout |
| AOS (Animate on Scroll) | 2.3.4 | Scroll-triggered entrance animations |
| Particles.js | 2.0.0 | Animated particle backgrounds |
| GSAP + ScrollTrigger | 3.12.5 | Advanced animations (homepage, slider) |
| Three.js | r128 | 3D canvas effects (homepage) |
| jQuery + Tilt.js | 3.6.0 / 1.2.1 | 3D tilt on logo (homepage, about) |
| Vanilla Tilt | 1.7.0 | CSS-based tilt cards |
| SweetAlert2 | 11.4.8 | Popup dialogs & alerts |
| Animate.css | 4.1.1 | CSS keyframe animations |
| Toastr.js | latest | Toast notifications (executives) |
| Luxon | — | Date/time handling (events) |

### Design System (`styles/global.css`)
**Color Palette (Dark Theme — Default)**
| Token | Value | Usage |
|---|---|---|
| `--primary-color` | `#00b4db` | Buttons, highlights, links |
| `--secondary-color` | `#0083b0` | Hover states, borders |
| `--accent-color` | `#00d4ff` | Glow effects |
| `--bg-body` | `#0c0c14` | Page background |
| `--bg-surface-1` | `#1a1a1a` | Cards, modals |
| `--bg-surface-2` | `#2a2a3a` | Subtle surface variants |
| `--text-primary` | `#ffffff` | Main text |
| `--text-secondary` | `#aaaaaa` | Muted text |

**Light Theme** overrides activated by `.light` class on `<html>` — light backgrounds (`#f5f5f7`), dark text (`#212529`), same brand colors.

**Typography:** Inter (body), Montserrat (headings) — font sizes from `0.75rem` (xs) to `2.8rem` (h1).

**Design Tokens:** Spacing (`4px`–`60px`), border radii (`4px`–`50%`), shadows (sm/md/lg + primary glow variants), transitions (fast `0.2s` / medium `0.3s` / slow `0.5s`), full z-index stack (background → loader at `9999`), breakpoints (`480px`–`1400px`).

---

## 📄 Pages — Detailed Breakdown

---

### 1. `index.html` — Home Page

The landing page of the website. All sections animate in via AOS and GSAP ScrollTrigger.

#### Navbar (Global Component)
- Sticky header, transparent on top → dark glass effect on scroll (`scrolled` class)
- DCITC logo (transparent PNG) + "DCITC" text wordmark
- Navigation links: Home · About · Executive · Events · Projects · Gallery · Departments (Font Awesome icons)
- **Theme Toggle** — sun/moon toggle switch; persists preference in `localStorage`; defaults to OS preference
- Animated "tech circles" (decorative dots in logo area)
- Hamburger menu for mobile — animates into an X on open, locks body scroll, has overlay backdrop

#### Section 1 — Hero
- Full-viewport hero with deep dark background
- **Floating code symbols** (`</>`, `{}`, `#`, `01`) drift across the background
- **Particles.js canvas** — interactive cyan particles with link lines, push on click, grab on hover
- **Typewriter animation** — "Dhaka College IT Club" typed character-by-character
- `data-aos` fade animations on: college name, title, description text, and buttons
- **CTAs:** "Join Now" (primary, filled) + "Learn More" (secondary, outlined)

#### Section 2 — About Snippet
- Circuit board decorative background (7 CSS paths + 6 animated pulse nodes)
- **Glassmorphism card** with frosted glass overlay + glass highlight sheen
- Left: DCITC logo with Tilt.js 3D tilt effect (zoom-in-right AOS)
- Right: "About DCITC" heading, tagline, paragraph description
- **Stats:** `6+` Years Experience · `50+` Projects Delivered · `200+` Active Members
- "Explore More" CTA button
- Decorative animated tech dots at card corners

#### Section 3 — Departments
- **Filter bar:** All Departments · Web & App Dev · Competitive Programming · Robotics · Graphics Designing · Cyber Security
- **Department cards grid** (5 cards) — each card has:
  - Pattern overlay + glow effect on hover
  - Icon (Font Awesome), department name, tagline
  - Description paragraph
  - Animated count-up stats (3 per card)
  - Tech/tool tags
  - "Learn More" anchor button

| Department | Icon | Stats | Tech Stack |
|---|---|---|---|
| Web & App Development | `fa-code` | 25 projects, 12 members, 8 awards | React, Flutter, Node.js, JavaScript, Firebase |
| Competitive Programming | `fa-terminal` | 30 contests, 15 members, 10 medals | C++, Java, Python, DSA, Algorithms |
| Robotics | `fa-robot` | 18 projects, 10 members, 5 competitions | Arduino, Raspberry Pi, IoT, Embedded Systems, 3D Printing |
| Graphics Designing | `fa-palette` | 40 projects, 8 members, 12 exhibitions | Photoshop, Illustrator, Figma, After Effects, Blender |
| Cyber Security | `fa-shield-alt` | 15 projects, 7 members, 6 CTF wins | Ethical Hacking, Network Security, Cryptography, Forensics, Penetration Testing |

#### Section 4 — Tech Tuesday Slider
A full-width horizontal content slider showcasing 8 weekly "Tech Tuesday" educational posts. Each slide has a unique color theme.

| Week | Badge | Title | Key Stats |
|---|---|---|---|
| Week 8 | HUMAN ENHANCEMENT | Biohacking | 2018 mainstream adoption, 84% self-improvement focus |
| Week 7 | CYBERSECURITY | PQC: Last Line of Defence | 2022 NIST standards, 256-bit minimum key |
| Week 6 | DATA SECURITY | Encryption | 256-bit standard key, 99.9% protection rate |
| Week 5 | CYBERSECURITY | Bybit Crypto Heist | $3.67 trillion stolen (2025), Lazarus Group |
| Week 4 | INFORMATION SECURITY | Steganography | First use 440 BC, 10% payload capacity |
| Week 3 | THOUGHT EXPERIMENT | Roko's Basilisk | Origin 2010, LessWrong forum |
| Week 2 | HARDWARE INNOVATION | AI Chip Revolution | 150nm chip size, 90% energy reduction |
| Week 1 | INTERNET PHENOMENON | Dead Internet Theory | Origin 2021, 67% content automation |

Each slide includes: colored badge, title, description paragraph, 2 factual stats, "Explore Topic" button, and a topic image from `/Public/tech_tuesday/`. Navigation via prev/next arrows + dot indicators.

#### Section 5 — Events Preview
- Filter buttons: All Events · Webinars · Workshops · Conferences · Hackathons · Meetups
- "View All Events" link
- 5 static event cards:

| Event | Category | Date | Location |
|---|---|---|---|
| Future Tech Conference 2025 | Conference | Jul 12 | Tech Center, San Francisco |
| Advanced AI Development Workshop | Workshop | Jun 23 | Innovation Hub, Seattle |
| Cloud Computing Best Practices | Webinar | Aug 5 | Virtual Event |
| Web3 Innovation Hackathon | Hackathon | Sep 18 | Tech Campus, Austin ($50k prize) |
| DevOps Community Meetup | Meetup | Jul 2 | Tech Brewery, Portland |

Each card: event image, category badge, date overlay, title, location, time, featured badge (where applicable), "Register" button.

#### Footer (Global Component)
- DCITC logo
- **Quick Links:** Home · About Us · Events
- **Resources:** Tutorials · Workshops · Blog · FAQs
- **Contact:** `info@dcitc.com` · `+880 123 456 7890` · Dhaka College, Dhaka
- **Social Icons:** Facebook · Twitter · Instagram · LinkedIn · YouTube · GitHub
- Copyright: © 2025 DCITC
- Back-to-top button (appears after 200px scroll)
- Particles.js footer background (separate canvas)

---

### 2. `about.html` — About the Club

#### Preloader
CSS spinner + "LOADING..." text, hides on `DOMContentLoaded` + short timeout.

#### Header
- "Dhaka College IT Club" large title (fade-down AOS)
- Subtitle: "Empowering students with technology skills..."
- Animated divider line (zoom-in AOS)

#### Logo Section
- DCITC logo with Vanilla Tilt 3D perspective tilt
- Glow effect radiating from the logo
- `flip-left` AOS animation on entry

#### About Us Section
3 glassmorphism cards:
| Card | Content |
|---|---|
| **Our Vision** | Create a hub for tech innovation; produce future tech leaders of Bangladesh |
| **Our Mission** | Foster technical excellence, encourage innovation, build community through workshops, projects, and mentorship |
| **What We Do** | Workshops, hackathons, coding competitions, tech talks, project collaborations |

#### Timeline — "Our Journey"
Alternating left/right timeline items:
| Year | Milestone |
|---|---|
| 2018 | The Beginning — founded by tech enthusiasts |
| 2019 | First Hackathon — 100+ participants across Dhaka |
| 2020 | Going Virtual — shifted online during the pandemic |
| 2022 | Industry Partnerships — internships & mentoring with tech companies |
| 2023 | National Recognition — awarded for contributions to tech education |
| 2025 | Expansion & Growth — 200+ members, satellite chapters in other institutions |

#### Stats — "Our Impact"
Animated count-up numbers on scroll:
- **200** Active Members
- **50** Projects Completed
- **25** Events Organized
- **10** Industry Partners

#### Testimonials — "What Members Say"
Auto-advancing carousel with 3 testimonials:
1. **Tanzim Hossain** (Class of 2022, Software Engineer) — workshops helped land first internship
2. **Nusrat Jahan** (Class of 2023, UX Designer) — mentorship and feedback sessions
3. **Rifat Khan** (Current Member, Full-stack Developer) — inclusive community for beginners

Navigation: prev/next arrows + dot indicators.

#### FAQ — "Frequently Asked Questions"
Animated accordion with 4 questions:
1. How to become a member → Dhaka College student, start of semester enrollment, orientation session, no prior experience required
2. What activities → weekly workshops, monthly hackathons, coding competitions, tech talks, annual tech festivals
3. Prior programming experience needed → No, all skill levels welcome
4. Membership fees → 500 BDT/year, covers all regular workshops; fee waivers available

---

### 3. `executives.html` — Executive Team

#### Loading Animation
Full-screen spinner overlay fades out on page load.

#### Search
Real-time text search filtering all cards by name, position, or department.

#### Year Tabs
Three panels, only one visible at a time:
- **2023–2024** (current, default)
- **2022–2023**
- **2021–2022**

#### Department Filter (2023–2024 panel only)
Buttons: All Departments · Core Team · Administration · Public Relations · Graphics & Design · Web & App Development · Robotics & Programming

#### Faculty Supervisors (year-independent)
| Name | Position | Department |
|---|---|---|
| Dr. Jane Smith | Faculty Supervisor | Computer Science |
| Prof. Michael Chen | Faculty Supervisor | Software Engineering |
| Dr. Sarah Johnson | Faculty Supervisor | Data Science |

Each card: photo, name overlay on hover, position, department, social links (LinkedIn, GitHub/ResearchGate, Email).

#### Student Executive Team — 2023–2024
| Name | Position | Department |
|---|---|---|
| Ahnaf Hasan | President | Core Executive Team |
| Maloy Roy Orko | Vice President | Core Executive Team |
| Muhammad Hasin Raihan | General Secretary | Core Executive Team |
| Solaiman Tanvir Raj | Treasurer | Core Executive Team |
| Husain Zuhair Zuhan | Chief Executive of Administration | Administration |
| Muhammad Arman | Chief Executive of Public Relation | Public Relations |
| Md. Tanzilur Rahman Fakir | Joint Executive of Public Relation | Public Relations |
| Muhtasim Muin | Chief Executive of Graphics & Design | Graphics & Design |
| Sadid Hasan Dhurbak | Joint Executive of Graphics & Design | Graphics & Design |
| Kazi Md Mainul Islam Tanvir | Chief Executive of Web & App Development | Web & App Development |
| Kazi Md Amimul Ahsan Tamim | Joint Executive of Web & App Development | Web & App Development |
| Md. Junayet Hassan | Chief Executive of Robotics & Programming | Robotics & Programming |
| Abdullah Al Mahi | Joint Executive of Robotics & Programming | Robotics & Programming |

#### Student Executive Team — 2022–2023 & 2021–2022
Placeholder cards for: President, General Secretary, Treasurer, Chief Executive (Web Dev) in 2022–23; President, Secretary in 2021–22.

#### Member Detail Modal
Clicking any card opens a modal (JSON encoded in `data-member-json`) showing:
- Photo, name, position, department
- Bio paragraph
- Skills tags
- Achievements (where set)
- Social links (LinkedIn, GitHub, Twitter, Behance, Dribbble, website)
- Contact: email, phone, location

---

### 4. `events.html` — Events

#### Controls Header
- Section title: "Upcoming Events"
- **Search input** — real-time text search across title, description, location, type
- **Sort buttons:** All · Conferences · Workshops · Webinars · Meetups
- **View toggle:** Grid View | Calendar View
- **Event counter** — live count of visible events

#### Event Tags (Quick Filters)
| Tag | Count |
|---|---|
| All Events | 12 |
| Upcoming | 8 |
| Featured | 3 |
| Free | 5 |
| Premium | 7 |
| Virtual | 6 |
| In-Person | 6 |

#### Featured Event — Tech Innovation Summit 2025
- Large standalone card with banner image
- Live countdown timer (days / hours / minutes / seconds) to May 15–17, 2025
- Location: San Francisco, CA
- Type: Conference
- "Register Now" button

#### Recommended / Draggable Strip
- Horizontally draggable row of event cards
- Prev/next scroll navigation buttons

#### Events Grid (12 Dynamic Events)
| # | Title | Date | Location | Type | Price |
|---|---|---|---|---|---|
| 1 | Global Tech Conference 2025 | Jun 5, 2025 | Virtual | Conference | Paid |
| 2 | UX/UI Design Workshop | Apr 28, 2025 | Creative Hub Downtown | Workshop | Paid |
| 3 | AI in Healthcare Webinar | May 10, 2025 | Online | Webinar | Free |
| 4 | Frontend Developers Meetup | Apr 20, 2025 | Tech Cafe | Meetup | Free |
| 5 | Cloud Computing Workshop | May 22, 2025 | Online | Workshop | Paid |
| 6 | Cybersecurity Summit | Jul 15, 2025 | Grand Convention Center | Conference | Paid |
| 7 | Machine Learning Fundamentals | Jun 12, 2025 | Online | Workshop | Free |
| 8 | Digital Marketing Trends Webinar | Apr 30, 2025 | Online | Webinar | Free |
| 9 | Startup Networking Night | May 18, 2025 | The Innovation Loft | Meetup | Free |
| 10 | The Future of Work | Apr 22, 2025 | Online | Webinar | Free |
| 11 | Web3 Developer Conference | Aug 5, 2025 | Metaverse & NYC | Conference | Paid |
| 12 | Tech Innovation Summit 2025 | May 15–17, 2025 | San Francisco, CA | Conference | Paid |

#### Calendar View (toggleable)
- Monthly grid calendar
- Navigation: previous month, today, next month
- Event dates highlighted with indicator dots
- Clicking a date shows events for that day

#### Event Detail Modal
Clicking any card or "Register" button opens a full modal:
- Banner image
- Title, date, location (map pin), type (tag)
- **Tabs:** About | Schedule | Speakers
  - About: full description
  - Schedule: timed sessions list
  - Speakers: grid of speaker cards with photos, names, roles
- **Actions:** Register Now · Remind Me · Share

#### Notification Center
Toast-style notifications appear for actions (filter resets, reminders, errors).

---

### 5. `projects.html` — Project Portfolio

#### Page Header
- Title: "My Projects"
- Subtitle: "Explore my portfolio of technical projects across different domains"

#### Category Navigation
Filter buttons: All Projects · Web Development · Competitive Programming · Graphics Designing · Cyber Security · Robotics & AI/ML

Clicking a button shows only the matching section; "All Projects" shows all.

#### Web Development — 4 Projects
| Project | Tech Stack | Branches | Contributors |
|---|---|---|---|
| E-commerce Platform | React, Node.js, MongoDB | 15 | 3 |
| Portfolio Website | HTML/CSS, JavaScript, GSAP | 8 | 1 |
| Blog Platform | Vue.js, Firebase, Tailwind CSS | 12 | 2 |
| Weather Dashboard | React, Weather API, Chart.js | 6 | 1 |

#### Competitive Programming — 3 Projects
| Project | Tech Stack | Branches | Contributors |
|---|---|---|---|
| Algorithm Visualizer | JavaScript, D3.js, CSS | 10 | 2 |
| CP Library | C++, Algorithms, Data Structures | 23 | 4 |
| Contest Platform | Python, Django, PostgreSQL | 18 | 3 |

#### Graphics Designing — 3 Projects
| Project | Tool Stack | Branches | Contributors |
|---|---|---|---|
| Brand Identity Package | Adobe Illustrator, Branding, Logo Design | 7 | 2 |
| UI/UX Design System | Figma, UI Components, Design System | 12 | 3 |
| 3D Character Modeling | Blender, 3D Modeling, Character Design | 5 | 1 |

#### Cyber Security — 3 Projects
| Project | Tech Stack | Branches | Contributors |
|---|---|---|---|
| Network Security Monitor | Python, Flask, Network Analysis | 14 | 2 |
| Vulnerability Scanner | Go, Security, Penetration Testing | 21 | 3 |
| CTF Writeup Collection | Linux, Bash, Various | — | — |

#### Robotics & AI/ML — (Section)
Filtered category for robotics and machine learning projects.

Each project card contains:
- Placeholder/real image with fallback ("Image Unavailable" div)
- Project title, tech stack tags
- Description paragraph
- Stats: branches count + contributors count
- Links: GitHub repository + Live Demo (or Behance/Figma/ArtStation depending on type)

---

### 6. `gallery.html` — Photo Gallery

#### Gallery Grid
- Masonry-style responsive CSS grid
- **143 images** dynamically loaded from `/Public/Gallery/FB 001.jpg` through `FB 143.jpg` (+ `FB 131.webp`)
- Each image lazy-loads (`loading="lazy"`)
- **Featured images** (larger grid spans): #001, #003, #006, #011, #014, #017, #023, #026, #029, #032, #035, #041, #044, #047, #050, #063, #068, #074, #082, #084, #088, #111, #120, #121
- Hover: dark overlay + title text
- AOS staggered fade-in animation (6-item cycle, 50ms delay steps)

#### Lightbox Modal
Opens on any image click. Features:
- **Header bar:** image title + four control buttons:
  - ▶ Slideshow toggle (auto-advance every few seconds)
  - ⊞ Thumbnail strip toggle
  - ⛶ Fullscreen toggle (uses Fullscreen API)
  - ✕ Close
- **Main viewer:** large image with fade crossfade transition, prev/next arrow buttons on sides
- **Thumbnail strip:** horizontally scrollable row of all images; active thumbnail auto-scrolls into view and highlights
- **Footer bar:** "current / total" counter + real image dimensions (loaded dynamically)
- **Keyboard support:** Left/Right arrow keys for navigation, Escape to close
- Adjacent images preloaded for smooth transitions
- Body scroll locked while modal is open

---

### 7. `departments.html` — Departments

#### Loading Spinner
Full-screen spinner overlay ("Loading...") that fades out on page ready.

#### Section Header
- Title: "Our Departments"
- Subtitle: "Explore our specialized departments where innovation meets expertise"

#### Filter Bar
Buttons: All Departments · Web & App Dev · Competitive Programming · Robotics · Graphics Designing · Cyber Security

Active filter shows/hides corresponding department cards with smooth transitions.

#### Department Cards — Full Details

**Web & App Development** *(Featured badge)*
- Icon: `fa-code`
- Tagline: "Building digital experiences that transform ideas into reality"
- Description: Responsive websites and mobile applications using modern frameworks, clean code architecture, user-centric designs
- Stats: 25 Projects · 12 Members · 8 Awards
- Tech: React · Flutter · Node.js · JavaScript · Firebase

**Competitive Programming**
- Icon: `fa-laptop-code`
- Tagline: "Solving complex problems with elegant algorithms"
- Description: Algorithmic problem-solving and optimization, competition training, analytical thinking
- Stats: 30 Contests · 15 Members · 10 Medals
- Languages: C++ · Java · Python · Data Structures · Algorithms

**Robotics** *(Featured badge)*
- Icon: `fa-robot`
- Tagline: "Innovating the future through automation and intelligence"
- Description: Autonomous systems, sensors, actuators, microcontrollers, advanced control algorithms
- Stats: 18 Projects · 10 Members · 5 Competitions
- Tech: Arduino · Raspberry Pi · IoT · Embedded Systems · 3D Printing

**Graphics Designing**
- Icon: `fa-paintbrush`
- Tagline: "Visualizing concepts with artistic excellence"
- Description: Digital illustrations, UI/UX design, promotional visuals for events and platforms
- Stats: 40 Projects · 8 Members · 12 Exhibitions
- Tools: Photoshop · Illustrator · Figma · After Effects · Blender

**Cyber Security**
- Icon: `fa-shield-alt`
- Tagline: "Protecting digital assets in an interconnected world"
- Description: Penetration testing, security audits, ethical hacking, awareness training
- Stats: 15 Projects · 7 Members · 6 CTF Wins
- Specialties: Ethical Hacking · Network Security · Cryptography · Forensics · Penetration Testing

#### Quick Stats Bar (Overall Club)
Animated count-up on scroll:
- **345** Projects Completed
- **45** Team Members
- **28** Awards Won
- **12** Years Experience

---

## ⚙️ JavaScript Modules — Key Functionality

### All Pages (shared patterns)
- **AOS init** — `duration: 800ms`, `easing: ease-in-out`, `once: true`
- **Navbar** — hamburger toggle, overlay click-to-close, body scroll lock on mobile, sticky `scrolled` class on 50px scroll, active link highlight by filename match
- **Theme toggle** — reads/writes `localStorage('theme')`, toggles `.light` class on `<html>`, respects `prefers-color-scheme` OS setting
- **Particles.js** — dual configs: main background (80 particles, `#00b4db`, grab on hover, push on click) and footer background (40 particles, `#0083b0`, slower)
- **Back-to-top button** — appears after 200px scroll, smooth scroll to top

### `index.js` (Home)
- Typewriter effect for hero title
- GSAP + ScrollTrigger for sectional reveals
- Tech Tuesday slider: GSAP-driven slides with theme color transitions per slide, keyboard and progress bar

### `events.js` (Events)
- **Luxon** for all date math and formatting
- `filterAndDisplayEvents()` — combined sort + tag + search filtering, updates DOM with `createDocumentFragment` for performance
- `renderCalendar()` — generates full calendar grid, highlights dates with events, respects month navigation
- `startCountdown()` — live countdown to May 15, 2025 (featured event), updates every second
- `populateDraggableEvents()` — fills the horizontal draggable strip with recommended items
- Drag scrolling (mouse + touch) on the recommended events strip

### `gallery.js` (Gallery)
`EnhancedGallery` class with methods:
- `loadImages()` — defines 143-image manifest
- `renderGallery()` — builds grid DOM, attaches click handlers
- `openModal(index)` / `closeModal()` — modal state management
- `updateModalImage()` — handles fade transition, updates counter, preloads adjacent images, fetches real dimensions
- `renderThumbnails()` / `highlightActiveThumbnail()` — thumbnail strip management
- `toggleSlideshow()` — starts/stops `setInterval` auto-advance
- `toggleFullscreen()` — `requestFullscreen()` / `exitFullscreen()` API
- `handleKeyDown()` — Left/Right arrows, Escape

### `executives.js` (Executives)
- Year tab switching — shows/hides `.year-content[data-year]` sections
- Department filter — filters `.team-card` by `data-department` within active year
- Search — filters all visible cards by text content (name + position + department)
- Member modal — parses `data-member-json` attribute, generates rich modal with bio, skills, social links

### `departments.js` (Departments)
- Filter buttons — toggles visibility of `.department-card[data-category]`
- Count-up animation — `IntersectionObserver` triggers numeric count-up on first viewport entry

### `projects.js` (Projects)
- Category nav — shows/hides `.projects-section[data-category]` blocks, updates active button state

---

## 🎨 Design Highlights

- **Dark-first design** — deep navy/black backgrounds with cyan `#00b4db` accent create a high-tech aesthetic
- **Glassmorphism** — frosted glass cards with `backdrop-filter: blur()` and semi-transparent backgrounds
- **Particle animations** — interactive floating particles on every page using Particles.js
- **Micro-interactions** — hover glows on cards, scale transforms, color transitions, animated borders
- **Circuit board decorations** — CSS-drawn circuit paths and pulse nodes on the homepage's about section
- **Gradient text** — section headings use `linear-gradient` text clip for the cyan-blue brand range
- **AOS stagger** — cards and sections animate in with 100ms–100ms delays between items

---

## 🌐 Contact & Social

| Channel | Info |
|---|---|
| Email | info@dcitc.com |
| Phone | +880 123 456 7890 |
| Address | Dhaka College, Dhaka, Bangladesh |
| Facebook | [DCITC Facebook](#) |
| Twitter | [DCITC Twitter](#) |
| Instagram | [DCITC Instagram](#) |
| LinkedIn | [DCITC LinkedIn](#) |
| YouTube | [DCITC YouTube](#) |
| GitHub | [DCITC GitHub](#) |

---

## 📜 Club History

| Year | Milestone |
|---|---|
| 2018 | Founded by a group of tech enthusiasts at Dhaka College |
| 2019 | Organized first hackathon — 100+ participants from across Dhaka |
| 2020 | Shifted online during COVID-19, expanding nationwide reach |
| 2022 | Established industry partnerships for internships and mentoring |
| 2023 | Received national recognition for tech education contributions |
| 2025 | Expanded to 200+ active members, launched satellite chapters |

---

## 👥 Executive Team (2023–2024)

**Core Executive Team**
- President: Ahnaf Hasan
- Vice President: Maloy Roy Orko
- General Secretary: Muhammad Hasin Raihan
- Treasurer: Solaiman Tanvir Raj

**Department Chiefs**
- Administration: Husain Zuhair Zuhan
- Public Relations: Muhammad Arman (Chief), Md. Tanzilur Rahman Fakir (Joint)
- Graphics & Design: Muhtasim Muin (Chief), Sadid Hasan Dhurbak (Joint)
- Web & App Development: Kazi Md Mainul Islam Tanvir (Chief), Kazi Md Amimul Ahsan Tamim (Joint)
- Robotics & Programming: Md. Junayet Hassan (Chief), Abdullah Al Mahi (Joint)

---

*Designed with ❤️ by the DCITC Team — © 2025 Dhaka College IT Club. All rights reserved.*