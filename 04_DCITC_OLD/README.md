# DCITC Hub - Original Single Page Website

The original single-page website for Dhaka College Information & Technology Club (DCITC). Features a modern, tech-inspired design with interactive elements and smooth animations.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [File Descriptions](#file-descriptions)
- [Sections Overview](#sections-overview)
- [Technologies Used](#technologies-used)
- [Design System](#design-system)
- [Usage](#usage)
- [License](#license)

## ✨ Features

- **Single Page Application**: Smooth navigation between sections
- **Typewriter Effect**: Animated text display in hero section
- **Interactive Carousel**: Image slider with thumbnail navigation
- **Responsive Design**: Mobile-first approach with hamburger menu
- **Circuit Board Background**: Tech-inspired visual aesthetics
- **Glass Morphism**: Modern UI with frosted glass effects
- **Contact Form**: Integrated contact section
- **Smooth Scrolling**: Seamless navigation experience

## 📁 Project Structure

```
DCITC/
├── index.html                 # Main HTML file (single page)
├── styles.css                 # Complete stylesheet
├── script.js                  # JavaScript functionality
├── README.md                  # Project documentation
│
├── image/                     # Image assets
│   ├── dcitc-logo.png         # Club logo
│   ├── img1.png               # Carousel images
│   ├── img2.png
│   └── ...
│
├── Panel/                     # Panel section images
│   └── ...
│
└── tech_tuesday/              # Tech Tuesday event images
    └── ...
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation

1. Clone or download the project files
```bash
git clone <repository-url>
cd DCITC
```

2. Open `index.html` directly in your browser, or use a local server:
   - **Using Python 3**:
     ```bash
     python -m http.server 8000
     ```
   - **Using VS Code Live Server**:
     - Right-click on `index.html` and select "Open with Live Server"

## 📄 File Descriptions

### Core Files

| File | Purpose |
|------|---------|
| `index.html` | Single-page structure with all sections |
| `styles.css` | Complete styling including animations and responsive design |
| `script.js` | Typewriter effect, carousel, hamburger menu, smooth scroll |

### Assets

| Directory | Contents |
|-----------|----------|
| `image/` | Logo and carousel images |
| `Panel/` | Panel section graphics |
| `tech_tuesday/` | Tech Tuesday event photos |

## 📖 Sections Overview

### Hero Section
- Full-screen landing with gradient background
- Animated typewriter effect cycling through "INFORMATION" and "IT CLUB"
- Call-to-action button

### About Section
- Club introduction and mission
- Logo display
- Glass-morphism card design
- "Join Our Community" CTA

### Carousel Section
- Interactive image slider
- Auto-play functionality (7s interval)
- Thumbnail navigation
- Previous/Next controls
- Progress bar animation

### Projects Section
- Project showcases
- Card-based layout
- Hover effects

### Panel Section
- Team/Panel member displays
- Grid layout

### Contact Section
- Contact form
- Social media links
- Location information

## 🛠 Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Custom properties, Flexbox, animations, glass morphism
- **Vanilla JavaScript**: No frameworks or libraries
- **Font Awesome 6.4.0**: Icons
- **Google Fonts**: Poppins font family

## 🎨 Design System

### Color Palette

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| Primary Blue | `#00b4db` | `--primary-color` | Accents, buttons |
| Secondary Blue | `#0083b0` | `--secondary-color` | Hover states |
| Body Background | `#0c0c14` | `--body-background` | Page background |
| Navbar Background | `rgba(26,26,26,0.9)` | `--navbar-background` | Navigation |
| Text Color | `#fff` | `--text-color` | Primary text |
| Secondary Text | `#aaa` | `--secondary-text-color` | Muted text |
| Card Background | `#1a1a1a` | `--card-background` | Card elements |

### Typography

- **Font Family**: Poppins (Google Fonts)
- **Weights**: 100-900 (full range)
- **Line Height**: 1.6

## 💻 Usage

### Modifying the Typewriter Effect

Edit the `textArray` in `script.js`:
```javascript
let textArray = ["INFORMATION", "IT CLUB", "YOUR TEXT"];
```

### Carousel Configuration

Adjust timing in `script.js`:
```javascript
let timeRunning = 3000;    // Animation duration
let timeAutoNext = 7000;   // Auto-slide interval
```

### Adding New Sections

1. Add HTML section in `index.html`
2. Add navigation link in navbar
3. Style in `styles.css`
4. Add smooth scroll target

## 📝 License

This project is licensed under the MIT License.

---

**Last Updated**: March 2026

For questions or support, contact the DCITC development team.