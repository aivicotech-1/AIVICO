import { useState } from 'react';
import { ArrowUpRight, TrendingUp, ShieldCheck, Zap, Code2, Search } from 'lucide-react';

interface CaseStudy {
  id: string;
  serviceBadge: string;
  title: string;
  subtitle: string;
  narrative: string;
  metrics: { label: string; value: string; icon: typeof TrendingUp }[];
  tags: string[];
}

const studies: CaseStudy[] = [
  {
    id: 'ai-product',
    serviceBadge: 'AI PRODUCT & AI/ML OPS',
    title: 'Autonomous Enterprise Copilot & Reasoning Swarm',
    subtitle: 'Deploying sub-100ms multi-agent workflows with continuous fine-tuning',
    narrative: 'Architected a custom domain-specific AI copilot with vector RAG search and continuous model evaluation, reducing manual administrative review time by 74%.',
    metrics: [
      { label: 'Latency Reduction', value: '-65%', icon: Zap },
      { label: 'Evaluation Accuracy', value: '99.4%', icon: ShieldCheck },
      { label: 'Time Saved per Workflow', value: '74%', icon: TrendingUp },
    ],
    tags: ['AI Product', 'Vector RAG', 'vLLM', 'AI/ML Ops', 'Python'],
  },
  {
    id: 'web-dev',
    serviceBadge: 'WEB DEVELOPMENT & SQA',
    title: 'High-Performance SaaS Platform & Zero-Defect CI/CD',
    subtitle: 'Next.js 15 full-stack application backed by 98% automated test coverage',
    narrative: 'Engineered a modern web portal with instant Core Web Vitals, headless authentication, and automated Playwright regression test defense on every deploy.',
    metrics: [
      { label: 'Page Load Speed', value: '0.42s', icon: Zap },
      { label: 'Automated Test Coverage', value: '98.5%', icon: ShieldCheck },
      { label: 'Lighthouse Score', value: '100 / 100', icon: Code2 },
    ],
    tags: ['Web Development', 'Next.js', 'TypeScript', 'SQA Automation', 'Playwright'],
  },
  {
    id: 'seo-marketing',
    serviceBadge: 'SEO & DIGITAL MARKETING',
    title: 'Programmatic Organic Growth & Funnel Optimization',
    subtitle: 'Driving 420,000+ organic monthly sessions with conversion rate optimization',
    narrative: 'Executed a complete technical SEO architecture, structured schema graph, and data-backed digital marketing funnel that 3.4x’d qualified enterprise inbound leads.',
    metrics: [
      { label: 'Organic Traffic Lift', value: '+340%', icon: TrendingUp },
      { label: 'Target Keywords in Top 3', value: '1,850+', icon: Search },
      { label: 'Inbound Conversion Rate', value: '4.8%', icon: Zap },
    ],
    tags: ['SEO', 'Digital Marketing', 'Technical Audits', 'CRO', 'GA4 Analytics'],
  },
];

export function CaseStudies() {
  const [activeStudy, setActiveStudy] = useState(0);
  const current = studies[activeStudy];

  return (
    <div className="case-studies-container">
      <div className="case-studies-nav">
        {studies.map((s, index) => (
          <button
            key={s.id}
            type="button"
            className={`case-tab-btn ${index === activeStudy ? 'active' : ''}`}
            onClick={() => setActiveStudy(index)}
          >
            <span className="case-tab-badge">{s.serviceBadge}</span>
            <span className="case-tab-title">{s.title}</span>
            <span className="case-tab-metric">{s.metrics[0].value}</span>
          </button>
        ))}
      </div>

      <div className="case-study-showcase glass-panel">
        <div className="showcase-header">
          <div>
            <div className="showcase-badge">
              <span className="pill-dot" />
              <span>{current.serviceBadge} DELIVERED</span>
            </div>
            <h3 className="showcase-title">{current.title}</h3>
            <p className="showcase-subtitle">{current.subtitle}</p>
          </div>
          <div className="showcase-cta-wrap">
            <a
              href="#contact"
              className="btn-secondary-link"
              onClick={(event) => {
                event.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <span>Discuss Similar Project</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <p className="showcase-narrative">{current.narrative}</p>

        {/* Metrics Bar */}
        <div className="metrics-row">
          {current.metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={i} className="metric-box">
                <div className="metric-icon-wrap">
                  <Icon size={18} />
                </div>
                <div className="metric-data">
                  <span className="metric-val">{m.value}</span>
                  <span className="metric-lbl">{m.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="blueprint-tags">
          {current.tags.map((t) => (
            <span key={t} className="blueprint-tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
