# Kazi Tanvir - Portfolio Project

This repository contains the source code for my dynamic, neobrutalist portfolio website. It is built using modern web technologies to ensure high performance, security, and a stunning visual experience.

---

## 🎨 Design Details & Theme

The project employs a **Neobrutalism** design aesthetic. This style is characterized by bold typography, high-contrast colors, distinct borders, and flat, hard shadows instead of soft, diffused ones.

### **Core Themes & Variables**
- **Color Palette:** 
  - Primary Yellow (`#ffe600`) as the main background and accent.
  - Secondary Accents: Hero Background Pink (`#ff57c3`), About Background Cyan (`#00d1ff`), and Milestone Background Orange (`#ff9100`).
  - High contrast black (`#000000`) and white (`#ffffff`) for surfaces and text.
- **Typography:** 
  - **Headlines:** `Space Grotesk` (with an `Arial Black` fallback) for bold, striking titles.
  - **Body Text:** `Manrope` for readable, clean structural text.
- **Visuals:** Defined in `src/app/globals.css` using custom Tailwind CSS v4 variables (`@theme`).

### **Responsiveness & Structural Adjustments**
To ensure the Neobrutalist design looks great on all screen sizes, specific responsive changes were implemented:
- **Scaling Borders:** The main `<body>` wrapper has a 4px black border on mobile that scales up to an 8px border on medium (`md:`) screens and above.
- **Dynamic Shadows:** Custom utility classes (`.neo-shadow`, `.neo-shadow-sm`, `.neo-shadow-lg`) were created. On mobile, these cast a smaller shadow (e.g., `4px 4px`), but using a media query (`@media (min-width: 768px)`), these shadows automatically enlarge on desktop displays (e.g., `8px 8px`) to emphasize depth without overpowering small screens.
- **Text Strokes:** Custom `.text-stroke` class provides a 3px text shadow on mobile, scaling to 4px on larger screens.

---

## ⚙️ Functionality & Application Logic

This application is built on **Next.js (App Router)**. It provides a static-first front end combined with powerful server-side functionality.

### **Key Logic Areas:**
1. **Server Actions (`src/app/actions.ts`):** 
   - Replaces traditional REST API endpoints. Form submissions (like the Contact Form) and all Admin CRUD operations directly call server functions, improving security and performance.
   - Cache invalidation (`revalidatePath`) is used after data mutations to ensure the static frontend immediately reflects database changes without a hard refresh.
2. **Secure Admin Dashboard:**
   - The `/admin` routes are protected.
   - **Authentication:** Uses JSON Web Tokens (JWT) signed via the `jose` package.
   - Passwords are securely hashed in the database using `bcryptjs`.
   - On successful login, an `admin_token` HTTP-only cookie is set, allowing secure navigation through the dashboard to manage Projects, Skills, Education, Reviews, and Messages.
3. **Contact Form Handling:**
   - Generates a UUID for every message.
   - Directly stores user submissions into the MySQL database without exposing database credentials to the client.

---

## 🗄️ Database Integration

A **MySQL** database is utilized to store all dynamic content, allowing the portfolio to be completely manageable via the Admin UI.

### **Connection & Setup**
- Handled through `src/lib/db.ts` using the `mysql2` package.
- It uses a **Connection Pool** (`mysql.createPool`) configured via the `DATABASE_URL` environment variable. This ensures connections are reused, preventing server overload and improving query latency.

### **Tables & Usage:**
- **`admin`**: Stores the administrative credentials (username, hashed password).
- **`project`**: Stores project details (UUID, title, description, tags [JSON], image URLs, category, and external links).
- **`skill`**: Manages displayed technical skills and their respective icon references.
- **`review`**: Stores client testimonials.
- **`education`**: Tracks educational history and active status.
- **`message`**: Captures incoming contact form submissions (UUID, name, email, payload).

*A complete database schema and sample data can be found in `db_dump.sql`.*

---

## 📦 Required Packages

Here are the key dependencies required to run the project, alongside a brief description of their purpose:

### **Core Framework & UI**
- **`next` (^16.2.1-canary.45):** The core React framework used for SSR, routing (App Router), and Server Actions.
- **`react` & `react-dom` (^19.0.0):** The foundational UI libraries for building components.
- **`lucide-react`:** Provides clean, SVG-based icons used across the frontend and admin dashboard.
- **`motion` (Framer Motion):** A production-ready animation library used for the dynamic micro-interactions and smooth UI transitions.

### **Styling**
- **`tailwindcss` (^4.1.14) & `@tailwindcss/postcss`:** A utility-first CSS framework (Version 4) used to rapidly build the custom design.
- **`postcss` & `autoprefixer`:** CSS processors used to apply Tailwind and automatically handle vendor prefixes for cross-browser compatibility.

### **Backend & Database**
- **`mysql2`:** A high-performance MySQL driver for Node.js. It supports Promises, which is critical for our modern `async/await` Server Actions.
- **`bcryptjs`:** Used to hash admin passwords before storing them in the database, and to securely compare them during login attempts.
- **`jose`:** A lightweight, dependency-free library for signing and verifying JSON Web Tokens (JWT) used in admin session management.
- **`dotenv`:** Loads environment variables from the `.env` file into `process.env`.

---

## 🚀 How to Run the Project Locally

Follow these steps to run the application smoothly on your local machine.

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- MySQL Server running locally or remotely

### 2. Environment Setup
Create a `.env` file in the root directory and add the following keys:
```env
# Database connection string
DATABASE_URL="mysql://username:password@localhost:3306/portfoliodb"

# Secret key for signing Admin JWT tokens
ADMIN_SECRET="your_very_secure_secret_string"
```

### 3. Database Initialization
Import the provided SQL dump to create the necessary tables and initial admin account:
```bash
mysql -u your_username -p portfoliodb < db_dump.sql
```
*(Default admin credentials are: Username: `admin`, Password: `admin123` - please update this via hashing your own password if deploying)*

### 4. Installation & Startup
```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```
The application will be accessible at `http://localhost:3000`.
