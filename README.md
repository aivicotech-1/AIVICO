# AIVICO — Enterprise AI & Full-Stack Web Development Studio

> A state-of-the-art web application showcasing modern AI product development, high-performance web engineering, quiet-tech luxury aesthetics, and interactive 3D spatial visualizations.

---

## 🌟 Overview

**AIVICO** is a modern enterprise digital studio application engineered for high impact. Designed with a **Quiet-Tech Luxury Aesthetic** (Warm Champagne, Platinum & Deep Obsidian), AIVICO balances architectural rigor with rich interactive motion—delivering sub-second load times, fluid micro-interactions, responsive grid systems, and a custom native 3D canvas experience without heavy 3D library overhead.

---

## 🚀 Key Features & Interactive Architecture

### 1. 🎨 Native Interactive 3D Canvas (`Hero3DCanvas.tsx`)
- **Zero Heavy Bundle Overhead**: Built entirely with native HTML5 Canvas 2D Context API (no bulky Three.js or WebGL runtime dependencies).
- **Mathematical Particle Ring Lattice**: Renders a multi-ring rotating 3D node lattice with dynamic connection lines and perspective depth calculations.
- **Cursor Magnetic Interaction**: Particles dynamically respond to user cursor movement with spring physics and smooth vector lerping.
- **Adaptive Light & Dark Palette**: Real-time canvas repainting that shifts palette schemes dynamically between Dark Velvet Obsidian and Light Alabaster Linen.

### 2. ⚡ 6 Core Engineering Services
Interactive tab explorer with live code preview blocks, terminal indicators, and breakdown lists:
1. **Web Development**: Next.js 15 & React 19 Server Components, Custom SaaS Portals, REST & GraphQL APIs, Sub-second Core Web Vitals.
2. **AI Product Development**: Autonomous Multi-Agent Swarms, Vector RAG Search Engines, Custom Copilots, and Factuality Guardrails.
3. **SEO (Search Engine Optimization)**: Technical Crawl Audits, Structured Schema Graphs, Core Web Vitals, and Programmatic Content Architectures.
4. **SQA (Software Quality Assurance)**: Continuous Playwright/Cypress Automation, Synthetic Load & Stress Testing, API Contract Defense.
5. **Digital Marketing**: Data-Led Acquisition Campaigns, GA4/GTM Server Attribution, CRO & A/B Funnel Optimization.
6. **AI/ML Ops**: High-Throughput vLLM & TensorRT Serving, Continuous Drift Telemetry, Containerized GPU Cluster Orchestration.

### 3. 🛸 Technology Universe Explorer (`TechStackExplorer.tsx`)
- Categorized technology catalog covering Web, AI, SEO, SQA, Marketing, and ML Ops.
- Real-time search filtering by technology name, category, or technical specification.
- Dynamic 3D tilt interaction cards (`TiltCard.tsx`) with ambient glowing borders.

### 4. 🧮 Interactive Project Estimator (`ProjectEstimator.tsx`)
- Real-time squad and budget range calculator.
- Custom selection across Domain Types (AI, Web/SaaS, Cloud, Backend), Scale Rigor (MVP, Production, Enterprise), Velocity, and Accelerators (SQA, Observability, Security, SRE Support).

### 5. 👥 Responsive Leadership & Team Showcase (`TeamRow.tsx`)
- Side-by-side team portrait cards with aspect ratio preservation (`242 / 481`).
- Accent border frames with hover zoom animations and descriptive role captions.

### 6. 🌓 Dual Spatial Themes (Quiet-Tech Obsidian & Alabaster Linen)
- Instant theme toggle between Dark Velvet Obsidian (`#0b0d10`) and Light Alabaster Linen (`#faf9f5`).
- Complete CSS Custom Property token system enforcing AAA contrast and subtle glassmorphism (`backdrop-filter`).

---

## 🛠 Tech Stack

| Domain | Technology / Tool | Purpose |
| :--- | :--- | :--- |
| **Frontend Core** | React 19, TypeScript | Reactive UI components & strict type safety |
| **Build Tooling** | Vite 8 | Instant HMR & optimized production bundling |
| **Styling** | Vanilla CSS (CSS Variables) | Modern design tokens, responsive grids & keyframe animations |
| **Icons** | Lucide React | Clean, minimalist SVG icon set |
| **Visual Effects** | HTML5 Canvas 2D, Canvas Confetti | Native 3D particle lattice & interactive micro-celebrations |
| **Backend API** | Node.js, Express.js | Contact form API endpoint & inquiry handler |
| **Email Transport** | Nodemailer | Optional SMTP transmission for project inquiries |

---

## 📁 Directory Structure

```text
AIVICO/
├── public/                 # Static assets & favicon icons
├── server/
│   └── index.js            # Express API server for contact form & email transport
├── src/
│   ├── components/
│   │   ├── CaseStudies.tsx         # Interactive case study metrics & navigation
│   │   ├── Hero3DCanvas.tsx        # Native HTML5 Canvas 3D particle lattice
│   │   ├── ProjectEstimator.tsx    # Live project scope & budget calculator
│   │   ├── TeamRow.tsx             # Team leadership cards & image gallery
│   │   ├── TechStackExplorer.tsx   # Filterable technology universe catalog
│   │   └── TiltCard.tsx            # Mouse-following 3D card tilt wrapper
│   ├── App.tsx             # Main application orchestrator & section composition
│   ├── main.tsx            # React application root entry point
│   ├── styles.css          # Core Quiet-Tech design system & responsive stylesheet
│   └── vite-env.d.ts       # TypeScript environment declarations
├── .env.example            # Environment variable template
├── .gitignore              # Git ignore rules
├── index.html              # HTML base document & font definitions
├── package.json            # NPM dependencies & scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite bundler configuration
```

---

## ⚙️ Installation & Local Setup

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-org/aivico.git
   cd aivico
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Start the API Backend Server (Optional)**:
   ```bash
   npm run server
   ```
   Runs the Express server on `http://localhost:3001/` for handling contact submissions.

5. **Build for Production**:
   ```bash
   npm run build
   ```

6. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment & Environment Setup

### Environment Variables (`.env`)
Create a `.env` file in the root directory based on `.env.example`:

```env
# Server Configuration
PORT=3001

# SMTP Email Configuration (Optional for production email sending)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
RECIPIENT_EMAIL=contact@aivico.com
```

> **Note**: If `.env` variables are not provided, the contact form automatically operates in **Demo Fallback Mode**, presenting interactive feedback to the user without failing or breaking.

### Deploying to Vercel / Netlify
1. Connect the repository to Vercel or Netlify.
2. Build command: `npm run build`
3. Output directory: `dist`
4. The frontend is fully static and self-contained; API routes can be deployed as serverless functions or run alongside the Express server.

---

## 🛡️ License

This project is licensed under the MIT License — feel free to use and customize for enterprise web applications.
