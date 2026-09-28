import { useEffect, useRef, useState, type FormEvent } from 'react';
import confetti from 'canvas-confetti';
import { TiltCard } from './components/TiltCard';
import { TechStackExplorer } from './components/TechStackExplorer';
import { TeamRow } from "./components/TeamRow";
import { CaseStudies } from './components/CaseStudies';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  Compass,
  Code2,
  Cpu,
  Search,
  ShieldCheck,
  TrendingUp,
  Database
} from 'lucide-react';

interface ServiceDetail {
  id: string;
  num: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  category: string;
  features: string[];
  codePreview: string;
}

// Exactly the 6 requested services
const serviceCatalog: ServiceDetail[] = [
  {
    id: 'web-dev',
    num: '01',
    name: 'Web Development',
    shortDesc: 'High-performance web apps, Next.js portals, custom platforms, and responsive interfaces.',
    fullDesc: 'We engineer full-stack web applications with atomic design systems, streaming server components, sub-second page loads, and bulletproof security.',
    category: 'FULL-STACK WEB',
    features: [
      'Next.js 15 & React 19 Server Components',
      'Custom SaaS & Enterprise Client Portals',
      'Scalable REST & GraphQL API Integration',
      'Sub-second Core Web Vitals & Responsiveness',
    ],
    codePreview: `// High-Performance Streaming Web Architecture
export default async function ModernPortal() {
  const data = await getSecureEnterpriseFeed();
  return <RealtimeClientDashboard feed={data} />;
}`,
  },
  {
    id: 'ai-product',
    num: '02',
    name: 'AI Product Development',
    shortDesc: 'Intelligent AI products, autonomous LLM agents, and custom workflow copilots.',
    fullDesc: 'From prototype to enterprise deployment, we build domain-specific AI products, autonomous reasoning agent swarms, and vector RAG search tools.',
    category: 'INTELLIGENT SYSTEMS',
    features: [
      'Autonomous Multi-Agent Task Orchestration',
      'Vector Search & Domain-Specific RAG',
      'Custom Copilots & Workflow Automation',
      'Factuality Guardrails & Safety Filters',
    ],
    codePreview: `// Autonomous Agent Workflow Engine
const copilot = new EnterpriseAICopilot({
  vectorMemory: new VectorStore({ topK: 8 }),
  guardrails: ['strict-factuality', 'pii-masking']
});
const result = await copilot.run({ task: 'Analyze quarterly telemetry' });`,
  },
  {
    id: 'seo',
    num: '03',
    name: 'SEO (Search Engine Optimization)',
    shortDesc: 'Technical foundations, Core Web Vitals, schema architecture, and organic ranking growth.',
    fullDesc: 'We turn search into a compounding growth channel with in-depth technical audits, high-impact schema markup, and programmatic SEO content architectures.',
    category: 'SEARCH ARCHITECTURE',
    features: [
      'Complete Technical SEO & Crawl Budget Audit',
      'Structured Schema Graph & Rich Snippets',
      'Core Web Vitals & Speed Optimization',
      'Programmatic Content Architecture',
    ],
    codePreview: `// Automated Schema & Structured Data Injection
export const metadata = {
  title: 'Enterprise AI & Web Studio | Aivico',
  alternates: { canonical: 'https://aivico.com/' },
  openGraph: { type: 'website', locale: 'en_US' }
};`,
  },
  {
    id: 'sqa',
    num: '04',
    name: 'SQA (Software Quality Assurance)',
    shortDesc: 'Automated end-to-end testing, Playwright suites, regression defense, and load benchmarks.',
    fullDesc: 'Quality is engineered into every commit. We establish automated E2E test suites, visual diff checks, and synthetic stress simulation in continuous delivery.',
    category: 'QUALITY ENGINEERING',
    features: [
      'Continuous Playwright & Cypress Automation',
      'Distributed Synthetic Load & Stress Testing',
      'API Contract & Payload Validation',
      '95%+ Enforced Code Coverage Defense',
    ],
    codePreview: `// Automated Continuous SQA Pipeline
test('Critical Checkout & Auth Flow Verification', async ({ page }) => {
  await page.goto('/auth/enterprise');
  await expect(page.locator('#dashboard')).toBeVisible();
});`,
  },
  {
    id: 'digital-marketing',
    num: '05',
    name: 'Digital Marketing',
    shortDesc: 'Data-led paid campaigns, conversion rate optimization (CRO), and growth funnels.',
    fullDesc: 'We drive revenue with data-driven acquisition campaigns, multi-channel attribution tracking, conversion rate optimization, and high-converting landing pages.',
    category: 'GROWTH & CONVERSION',
    features: [
      'Conversion Rate Optimization (CRO) & A/B Tests',
      'Data-Led Paid Acquisition & Ad Management',
      'Server-Side GA4 & GTM Event Attribution',
      'Funnel Analytics & Customer Retention',
    ],
    codePreview: `// Data Attribution & Conversion Event Tracking
window.dataLayer.push({
  event: 'conversion_lead_qualified',
  serviceDomain: 'AI Product Development',
  estimatedValue: 45000
});`,
  },
  {
    id: 'aiml-ops',
    num: '06',
    name: 'AI/ML Ops',
    shortDesc: 'Model deployment, high-throughput GPU serving, automated retraining, and monitoring.',
    fullDesc: 'Bridging model experimentation and reliable production with quantized vLLM serving, automated CI/CD evaluation harnesses, and real-time drift telemetry.',
    category: 'AI INFRASTRUCTURE',
    features: [
      'High-Throughput vLLM & TensorRT Serving',
      'Continuous Drift Telemetry & Hallucination Alerting',
      'Automated Fine-Tuning CI/CD Pipelines',
      'Containerized GPU Cluster Orchestration',
    ],
    codePreview: `# Production Inference Deployment Manifest
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vllm-inference-service
spec:
  replicas: 4
  template:
    spec:
      containers:
      - name: vllm
        image: vllm/vllm-openai:latest
        resources: { limits: { nvidia.com/gpu: 1 } }`,
  },
];

// Creston-inspired structured step progression
const engineeringSteps = [
  {
    num: '01',
    phase: 'DISCOVERY',
    title: 'Scope & Requirement Mapping',
    desc: 'Deep discovery into your business goals, technical stack, and target deliverables before work begins.',
    deliverable: 'Confirmed Scope Document',
  },
  {
    num: '02',
    phase: 'STRATEGY',
    title: 'Architecture & Plan',
    desc: 'Designing clean system architecture, database contracts, and sprint milestones tailored to your timeline.',
    deliverable: 'Technical Roadmap',
  },
  {
    num: '03',
    phase: 'EXECUTION',
    title: 'Agile Delivery Sprints',
    desc: 'Fast, iterative dual-week development cycles with continuous automated tests and staging previews.',
    deliverable: 'Tested Staging Releases',
  },
  {
    num: '04',
    phase: 'QUALITY',
    title: 'SQA & Verification',
    desc: 'End-to-end regression validation, cross-browser compatibility, and performance stress checks.',
    deliverable: 'Verified Production Build',
  },
  {
    num: '05',
    phase: 'SCALE',
    title: 'Launch & Continuous Growth',
    desc: 'Zero-downtime production deployment backed by ongoing SEO, marketing, and operational monitoring.',
    deliverable: 'Live Production System',
  },
];

const faqs = [
  {
    q: 'What core services does Aivico provide?',
    a: 'We specialize strictly in 6 core disciplines: Web Development, AI Product Development, SEO, SQA (Software Quality Assurance), Digital Marketing, and AI/ML Ops.',
  },
  {
    q: 'Who owns the intellectual property and code?',
    a: 'You own 100% of the code, digital assets, configurations, and intellectual property from day one with zero lock-in.',
  },
  {
    q: 'Can you work on individual services or a combined solution?',
    a: 'Both. You can engage us for a single specialized need (such as SQA automation or SEO) or for an end-to-end delivery combining Web Development, AI Products, and Digital Marketing.',
  },
  {
    q: 'How quickly can your team begin?',
    a: 'Following our initial consultation and confirmed requirement scope, we typically mobilize and begin within 5 to 7 business days.',
  },
];

const heroTaglines = [
  'Build faster. Scale with confidence.',
  'From ambitious ideas to reliable software.',
  'Engineering digital products for what comes next.',
];

const heroHeadings = [
  {
    before: 'Digital products &',
    accent: 'intelligent software',
    after: 'engineered to scale',
  },
  {
    before: 'Next-generation digital solutions',
    accent: 'built for enterprise scale',
    after: '',
  },
  {
    before: 'Intelligent software &',
    accent: 'high-performance platforms',
    after: 'built for impact',
  },
];

const marqueeLogos = [
  { name: 'Python', src: 'https://cdn.simpleicons.org/python/34d399' },
  { name: 'Django', src: 'https://cdn.simpleicons.org/django/34d399' },
  { name: 'Flask', src: 'https://cdn.simpleicons.org/flask/34d399' },
  { name: 'FastAPI', src: 'https://cdn.simpleicons.org/fastapi/34d399' },
  { name: 'JavaScript', src: 'https://cdn.simpleicons.org/javascript/34d399' },
  { name: 'React', src: 'https://cdn.simpleicons.org/react/34d399' },
  { name: 'Angular', src: 'https://cdn.simpleicons.org/angular/34d399' },
  { name: 'Java', src: 'https://cdn.simpleicons.org/openjdk/34d399' },
  { name: 'Spring', src: 'https://cdn.simpleicons.org/spring/34d399' },
  { name: 'Docker', src: 'https://cdn.simpleicons.org/docker/34d399' },
  { name: 'Next.js', src: 'https://cdn.simpleicons.org/nextdotjs/34d399' },
  { name: 'AWS', src: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazonaws.svg' },
  { name: 'Vercel', src: 'https://cdn.simpleicons.org/vercel/34d399' },
];

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-wrapper">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/" className="brand-logo">
              <span className="brand-icon">A</span>
              <span>AIVICO</span>
              <span className="dot">.</span>
            </a>
            <p>
              Professional software engineering studio specializing in Web Development, AI Products, SEO, SQA, Digital Marketing, and AI/ML Ops.
            </p>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="/#technologies">Technology Universe</a></li>
              <li><a href="/#impact">Case Studies</a></li>
              <li><a href="/#process">Five-Step Process</a></li>
              <li><a href="/#faq">FAQ</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:hello@aivico.com" className="footer-email-link">hello@aivico.com ↗</a></li>
              <li><span style={{ color: 'var(--text-dim)', fontSize: '13px' }}>NASTP (National Aerospace Science and Technology Park) <br /> Delta-4, Office 4030, Abid Majeed Road <br /> Lahore Cantt, Pakistan</span></li>
              <li><a href="/#contact" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Start Project ↗</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Aivico Technologies Inc. All rights reserved.</span>
          <div className="footer-social-links">
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LeadershipPage({
  theme,
  setTheme,
}: {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}) {
  return (
    <>
      <header className="site-header scrolled">
        <div className="header-container">
          <a href="/" className="brand-logo" aria-label="Aivico Home">
            <span className="brand-icon">A</span>
            <span>AIVICO</span>
            <span className="dot">.</span>
          </a>

          <nav className="desktop-nav" aria-label="Main Navigation">
            <a href="/">Home</a>
            <a href="/leadership" aria-current="page">Leadership</a>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="btn-theme-toggle"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <a href="/" className="btn-nav-cta">
              <span>Back to Home</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="leadership-page">
        <TeamRow />
      </main>

      <SiteFooter />
    </>
  );
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      return localStorage.getItem('aivico-theme') === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });
  const [activeService, setActiveService] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedServiceChip, setSelectedServiceChip] = useState('Web Development');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [heroTaglineIndex, setHeroTaglineIndex] = useState(0);
  const [heroHeadingIndex, setHeroHeadingIndex] = useState(0);
  const [heroHeadingVisible, setHeroHeadingVisible] = useState(true);
  const heroServicesPanelRef = useRef<HTMLDivElement>(null);
  const activeHeroServiceTabRef = useRef<HTMLButtonElement>(null);
  const heroServiceDetailRef = useRef<HTMLDivElement>(null);
  const [heroConnector, setHeroConnector] = useState<{
    width: number;
    height: number;
    path: string;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null>(null);

  // Sync data-theme attribute and persist whenever theme changes
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('aivico-theme', theme);
  }, [theme]);

  // Header scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateHeroConnector = () => {
      const panel = heroServicesPanelRef.current;
      const tab = activeHeroServiceTabRef.current;
      const detail = heroServiceDetailRef.current;
      if (!panel || !tab || !detail) return;

      const panelRect = panel.getBoundingClientRect();
      const tabRect = tab.getBoundingClientRect();
      const detailRect = detail.getBoundingClientRect();
      const startX = tabRect.right - panelRect.left;
      const startY = tabRect.top + tabRect.height / 2 - panelRect.top;
      const endX = detailRect.left - panelRect.left;
      const endY = detailRect.top + detailRect.height / 2 - panelRect.top;
      const curveOffset = Math.max(14, (endX - startX) * 0.45);

      setHeroConnector({
        width: panelRect.width,
        height: panelRect.height,
        path: `M${startX} ${startY} C${startX + curveOffset} ${startY}, ${endX - curveOffset} ${endY}, ${endX} ${endY}`,
        startX,
        startY,
        endX,
        endY,
      });
    };

    const frame = window.requestAnimationFrame(updateHeroConnector);
    window.addEventListener('resize', updateHeroConnector);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', updateHeroConnector);
    };
  }, [activeService]);

  useEffect(() => {
    const serviceTimer = window.setInterval(() => {
      setActiveService((currentIndex) => (currentIndex + 1) % serviceCatalog.length);
    }, 5200);

    return () => window.clearInterval(serviceTimer);
  }, []);

  useEffect(() => {
    let headingSwapTimeout: number | null = null;
    const headingTimer = window.setInterval(() => {
      setHeroHeadingVisible(false);
      headingSwapTimeout = window.setTimeout(() => {
        setHeroHeadingIndex((currentIndex) => (currentIndex + 1) % heroHeadings.length);
        setHeroTaglineIndex((currentIndex) => (currentIndex + 1) % heroTaglines.length);
        setHeroHeadingVisible(true);
      }, 520);
    }, 4200);

    return () => {
      window.clearInterval(headingTimer);
      if (headingSwapTimeout !== null) window.clearTimeout(headingSwapTimeout);
    };
  }, []);

  // Scroll reveal observer — covers all reveal variants
  useEffect(() => {
    const elements = document.querySelectorAll(
      '.reveal-on-scroll, .reveal-left, .reveal-scale, .stagger-item'
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      company: form.get('company'),
      service: selectedServiceChip,
      message: form.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.warn('API non-ok, using demo success feedback.');
      }

      setStatus('sent');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#34d399', '#a7f3d0', '#0f766e', '#ffffff'],
      });
      e.currentTarget.reset();
    } catch {
      setStatus('sent');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#34d399', '#a7f3d0', '#0f766e'],
      });
    }
  };

  if (window.location.pathname === '/leadership') {
    return <LeadershipPage theme={theme} setTheme={setTheme} />;
  }

  const currentService = serviceCatalog[activeService];

  return (
    <>
      {/* Navigation Header */}
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <a href="#top" className="brand-logo" aria-label="Aivico Home">
            <span className="brand-icon">A</span>
            <span>AIVICO</span>
            <span className="dot">.</span>
          </a>

          <nav className="desktop-nav" aria-label="Main Navigation">
            <a href="#services">Services</a>
            <a href="#technologies">Technologies</a>
            <a href="#impact">Case Studies</a>
            <a href="#process">Process</a>
            <a href="#faq">FAQ</a>
            <a href="/leadership">Leadership</a>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="btn-theme-toggle"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <a href="#contact" className="btn-nav-cta">
              <span>Start a Project</span>
              <ArrowUpRight size={14} />
            </a>

            <button
              type="button"
              className="btn-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation drawer"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
        <a href="#technologies" onClick={() => setMobileMenuOpen(false)}>Technologies</a>
        <a href="#impact" onClick={() => setMobileMenuOpen(false)}>Case Studies</a>
        <a href="#process" onClick={() => setMobileMenuOpen(false)}>Process</a>
        <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
        <a href="/leadership" onClick={() => setMobileMenuOpen(false)}>Leadership</a>
        <a href="#contact" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--accent-primary)' }}>
          Start a Project ↗
        </a>
      </div>

      <main id="top">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <div className="eyebrow-pill">
                <Sparkles size={12} />
                <span>Web Development • AI Product • SEO • SQA • Marketing • AI/ML Ops</span>
              </div>

              <h1 className={`hero-title ${heroHeadingVisible ? 'is-visible' : 'is-hidden'}`}>
                <span className="hero-word">{heroHeadings[heroHeadingIndex].before}</span>{' '}
                <span className="hero-word text-gradient">{heroHeadings[heroHeadingIndex].accent}</span>{' '}
                <span className="hero-word">{heroHeadings[heroHeadingIndex].after}</span>
              </h1>

              <p className="hero-tagline" aria-live="polite" key={heroTaglineIndex}>
                <span>{heroTaglines[heroTaglineIndex]}</span>
              </p>

              <p className="hero-subtitle">
                <span>Aivico builds modern web applications, AI products, automated SQA systems, and high-impact digital growth campaigns.</span>
              </p>

              <div className="hero-cta-group">
                <a href="#contact" className="btn-primary">
                  <span>Start a Conversation</span>
                  <ArrowRight size={15} />
                </a>

                <a href="#services" className="btn-secondary">
                  <Compass size={15} />
                  <span>Explore Services</span>
                </a>
              </div>
            </div>

            <div className="hero-visual-wrapper">
              <div className="hero-services-panel" ref={heroServicesPanelRef}>
                <div className="hero-service-list" role="tablist" aria-label="Aivico services">
                  <div className="hero-panel-kicker">CAPABILITY INDEX // 01</div>
                  {serviceCatalog.map((service, index) => (
                    <button
                      key={service.id}
                      type="button"
                      role="tab"
                      aria-selected={index === activeService}
                      ref={index === activeService ? activeHeroServiceTabRef : undefined}
                      className={`hero-service-tab ${index === activeService ? 'active' : ''}`}
                      onClick={() => setActiveService(index)}
                    >
                      <span className="hero-service-tab-number">{service.num}</span>
                      <span>{service.name}</span>
                      <ArrowUpRight size={14} />
                    </button>
                  ))}
                </div>

                  {heroConnector && (
                    <svg
                      key={activeService}
                      className="hero-service-connector"
                      viewBox={`0 0 ${heroConnector.width} ${heroConnector.height}`}
                      aria-hidden="true"
                    >
                      <path className="hero-service-connector-glow" d={heroConnector.path} />
                      <path className="hero-service-connector-line" d={heroConnector.path} />
                    </svg>
                  )}

                <div className="hero-service-detail" ref={heroServiceDetailRef} role="tabpanel">
                  <span className="hero-panel-kicker">{currentService.category}</span>
                  <h2>{currentService.name}</h2>
                  <p>{currentService.fullDesc}</p>
                  <div className="hero-service-features">
                    {currentService.features.slice(0, 3).map((feature) => (
                      <span key={feature}>{feature}</span>
                    ))}
                  </div>
                  <span className="hero-service-status">
                    <span className="hero-service-status-dot" />
                    READY TO ENGINEER
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Exact 6 Core Services with Smooth Sliding Preview */}
        <section id="services" className="content-section reveal-on-scroll">
          <div className="section-wrapper">
            <div className="section-header">
              <div className="section-shimmer-divider" />
              <span className="section-label">Core Capabilities // 01</span>
              <h2 className="section-title">
                Our 6 specialized <span className="text-gradient">services.</span>
              </h2>
              <p className="section-desc">
                Everything required to build, test, deploy, and scale high-performing digital systems.
              </p>
            </div>

            <div className="services-layout">
              {/* Service Tab Buttons */}
              <div className="services-nav-list" role="tablist">
                {serviceCatalog.map((service, index) => (
                  // stagger-item is on the wrapper div so React re-renders
                  // (which change the button's className) cannot wipe is-revealed
                  <div key={service.id} className="stagger-item">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={index === activeService}
                      className={`service-card-btn ${index === activeService ? 'active' : ''}`}
                      onClick={() => setActiveService(index)}
                    >
                      <span className="service-index">{service.num}</span>
                      <div className="service-btn-content">
                        <h3>{service.name}</h3>
                        <p>{service.shortDesc}</p>
                      </div>
                      <span className="service-arrow">↗</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Service Architecture Preview Panel */}
              <div className="service-preview-panel glass-panel">
                <div className="preview-topbar">
                  <div className="terminal-dots">
                    <span className="terminal-dot" />
                    <span className="terminal-dot" />
                    <span className="terminal-dot" />
                  </div>
                  <span className="mono">SERVICE // {currentService.name.toUpperCase()}</span>
                </div>

                <div className="preview-body">
                  <span className="preview-category-tag">{currentService.category}</span>
                  <h3 className="preview-title">{currentService.name}</h3>
                  <p className="preview-full-desc">{currentService.fullDesc}</p>

                  <div className="preview-features-grid">
                    {currentService.features.map((feat, i) => (
                      <div key={i} className="preview-feature-item">
                        <CheckCircle2 size={14} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="preview-code-block">
                    <pre>{currentService.codePreview}</pre>
                  </div>

                  <a
                    href="#contact"
                    className="btn-primary"
                    style={{ width: '100%' }}
                    onClick={() => setSelectedServiceChip(currentService.name)}
                  >
                    <span>Inquire About {currentService.name}</span>
                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

         {/* Creston-inspired continuous sliding marquee banner */}
        <div className="marquee-container" aria-hidden="true">
          <div className="marquee-track">
            <div className="marquee-group">
              {marqueeLogos.map((logo) => (
                <div className="marquee-item" key={logo.name}>
                  <img className={`marquee-logo ${logo.name === 'AWS' ? 'marquee-logo-aws' : ''}`} src={logo.src} alt="" aria-hidden="true" />
                </div>
              ))}
            </div>
            <div className="marquee-group" aria-hidden="true">
              {marqueeLogos.map((logo) => (
                <div className="marquee-item" key={logo.name}>
                  <img className={`marquee-logo ${logo.name === 'AWS' ? 'marquee-logo-aws' : ''}`} src={logo.src} alt="" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technology Universe // 02 (Filtered by the 6 Services) */}
        <section id="technologies" className="content-section reveal-on-scroll" style={{ background: 'var(--bg-secondary)' }}>
          <div className="section-wrapper">
            <div className="section-header">
              <div className="section-shimmer-divider" />
              <span className="section-label">Technology Universe // 02</span>
              <h2 className="section-title">
                The technical stack behind <span className="text-gradient">our 6 services.</span>
              </h2>
              <p className="section-desc">
                From modern Web Development frameworks to AI Product pipelines and SQA test defense.
              </p>
            </div>

            <TechStackExplorer />
          </div>
        </section>

        {/* Case Studies / Proven Impact in the 6 Services */}
        <section id="impact" className="content-section reveal-on-scroll">
          <div className="section-wrapper">
            <div className="section-header">
              <div className="section-shimmer-divider" />
              <span className="section-label">Proven Results // 03</span>
              <h2 className="section-title">
                Real impact across <span className="text-gradient">our core disciplines.</span>
              </h2>
              <p className="section-desc">
                Delivering measurable client outcomes in Web Development, AI Products, SEO, and Quality Engineering.
              </p>
            </div>

            <CaseStudies />
          </div>
        </section>

        {/* Process with Creston-Inspired Interactive Step Progress Slider */}
        <section id="process" className="content-section reveal-on-scroll" style={{ background: 'var(--bg-secondary)' }}>
          <div className="section-wrapper">
            <div className="section-header">
              <div className="section-shimmer-divider" />
              <span className="section-label">Structured Process // 04</span>
              <h2 className="section-title">
                From discovery to launch in <span className="text-gradient">five clear steps.</span>
              </h2>
              <p className="section-desc">
                Each stage has clear deliverables and full visibility so you always know what is being delivered.
              </p>
            </div>

            <div className="process-interactive-wrapper">
              <div className="process-progress-bar-wrap">
                <div
                  className="process-progress-fill"
                  style={{ width: `${((activeStep + 1) / engineeringSteps.length) * 100}%` }}
                />
              </div>

              <div className="process-grid">
                {engineeringSteps.map((step, idx) => (
                  // stagger-item on wrapper div — keeps is-revealed when button re-renders
                  <div key={step.num} className="stagger-item">
                    <button
                      type="button"
                      className={`process-step-btn ${idx === activeStep ? 'active' : ''}`}
                      onClick={() => setActiveStep(idx)}
                      style={{ width: '100%', height: '100%' }}
                    >
                      <div className="step-header">
                        <span className="step-num-badge">{step.num}</span>
                        <span className="step-phase-tag">{step.phase}</span>
                      </div>
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-desc">{step.desc}</p>
                      <div className="step-deliverable">
                        <small>DELIVERABLE:</small>
                        <div>{step.deliverable}</div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="content-section reveal-on-scroll">
          <div className="section-wrapper">
            <div className="section-header center">
              <div className="section-shimmer-divider" style={{ margin: '0 auto 24px' }} />
              <span className="section-label">FAQ // 05</span>
              <h2 className="section-title">
                Frequently asked <span className="text-gradient">questions.</span>
              </h2>
              <p className="section-desc">
                Clear answers regarding our services, engagement model, and IP ownership.
              </p>
            </div>

            <div className="faq-list">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className="faq-chevron" size={17} />
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section (with Chips strictly for the 6 services) */}
        <section id="contact" className="contact-section reveal-on-scroll">
          <div className="section-wrapper">
            <div className="contact-grid">
              <div className="contact-info-col reveal-left">
                <div className="section-shimmer-divider" />
                <span className="section-label">START A PROJECT</span>
                <h2>
                  Ready to build or scale <span className="text-gradient">your solution?</span>
                </h2>
                <p>
                  Speak directly with our technical team. Select any of our 6 service disciplines below to initiate your project consultation.
                </p>

                <div className="contact-perks-list">
                  <div className="perk-item">
                    <CheckCircle2 size={17} />
                    <span>Direct discussion with senior engineering leads</span>
                  </div>
                  <div className="perk-item">
                    <CheckCircle2 size={17} />
                    <span>Detailed scope and proposal within 24–48 hours</span>
                  </div>
                  <div className="perk-item">
                    <CheckCircle2 size={17} />
                    <span>100% intellectual property ownership from day one</span>
                  </div>
                </div>
              </div>

              <div className="contact-form-panel glass-panel reveal-scale">
                <div className="form-category-selector">
                  <span className="mono" style={{ fontSize: '11px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                    Select Service Discipline:
                  </span>
                  <div className="category-chips">
                    {[
                      'Web Development',
                      'AI Product Development',
                      'SEO',
                      'SQA',
                      'Digital Marketing',
                      'AI/ML Ops',
                    ].map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        className={`chip-btn ${selectedServiceChip === chip ? 'active' : ''}`}
                        onClick={() => setSelectedServiceChip(chip)}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>

                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <label>
                    <span>Full Name *</span>
                    <input required name="name" autoComplete="name" placeholder="Sarah Connor" />
                  </label>

                  <label>
                    <span>Work Email *</span>
                    <input required type="email" name="email" autoComplete="email" placeholder="sarah@company.com" />
                  </label>

                  <label>
                    <span>Company</span>
                    <input name="company" placeholder="Acme Inc." />
                  </label>

                  <label>
                    <span>Timeline</span>
                    <select name="timeline" defaultValue="standard">
                      <option value="immediate">Immediate (1-2 weeks)</option>
                      <option value="standard">Standard (1-2 months)</option>
                      <option value="planning">Exploratory / Planning</option>
                    </select>
                  </label>

                  <label className="form-field-full">
                    <span>Project Overview *</span>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder={`Tell us about your ${selectedServiceChip} requirements, goals, or current setup...`}
                      required
                    />
                  </label>

                  <button
                    type="submit"
                    className="btn-submit-inquiry"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? (
                      <span>Dispatching...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  {status === 'sent' && (
                    <div className="form-alert success" role="status">
                      <CheckCircle2 size={16} />
                      <span>Thank you. Your inquiry regarding {selectedServiceChip} has been received. We will respond within 24 hours.</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

       {/* Footer */}
  <footer className="site-footer">
    {/* …existing footer code… */}
  </footer>

      {/* Footer */}
      <footer className="site-footer">
        <div className="section-wrapper">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#top" className="brand-logo">
                <span className="brand-icon">A</span>
                <span>AIVICO</span>
                <span className="dot">.</span>
              </a>
              <p>
                Professional software engineering studio specializing in Web Development, AI Products, SEO, SQA, Digital Marketing, and AI/ML Ops.
              </p>
            </div>

            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                <li><a href="#services">Web Development</a></li>
                <li><a href="#services">AI Product Development</a></li>
                <li><a href="#services">SEO</a></li>
                <li><a href="#services">SQA</a></li>
                <li><a href="#services">Digital Marketing</a></li>
                <li><a href="#services">AI/ML Ops</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Explore</h4>
              <ul>
                <li><a href="#technologies">Technology Universe</a></li>
                <li><a href="#impact">Case Studies</a></li>
                <li><a href="#process">Five-Step Process</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li>
                  <a
                    href="mailto:hello@aivico.com"
                    className="footer-email-link"
                  >
                    hello@aivico.com ↗
                  </a>
                </li>
                <li><span style={{ color: 'var(--text-dim)', fontSize: '13px' }}>NASTP (National Aerospace Science and Technology Park) <br /> Delta-4, Office 4030, Abid Majeed Road <br /> Lahore Cantt, Pakistan</span></li>
                <li><a href="#contact" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Start Project ↗</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Aivico Technologies Inc. All rights reserved.</span>
            <div className="footer-social-links">
              <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
