import { useState } from 'react';
import { TiltCard } from './TiltCard';
import {
  Code2,
  Cpu,
  Search,
  ShieldCheck,
  TrendingUp,
  Layers,
  ArrowUpRight,
  Database
} from 'lucide-react';

interface TechItem {
  id: string;
  name: string;
  category: 'web' | 'ai-product' | 'seo' | 'sqa' | 'marketing' | 'aiml-ops';
  categoryLabel: string;
  spec: string;
  description: string;
  badge?: string;
}

const universeItems: TechItem[] = [
  // 1. Web Development
  {
    id: 'nextjs-react',
    name: 'Next.js 15 & React 19',
    category: 'web',
    categoryLabel: 'Web Development',
    spec: 'Full-Stack Architecture',
    description: 'High-performance web apps built with Server Components, streaming hydration, and sub-second page loads.',
    badge: 'Core',
  },
  {
    id: 'typescript-clean',
    name: 'Strict TypeScript & UI Systems',
    category: 'web',
    categoryLabel: 'Web Development',
    spec: 'End-to-End Type Safety',
    description: 'Scalable design systems and component libraries built for long-term maintainability and zero runtime bugs.',
  },
  {
    id: 'api-microservices',
    name: 'REST, GraphQL & Cloud Backends',
    category: 'web',
    categoryLabel: 'Web Development',
    spec: 'Scalable APIs',
    description: 'High-throughput microservices and serverless backends engineered for fast database queries and uptime.',
    badge: 'Backend',
  },

  // 2. AI Product Development
  {
    id: 'agentic-ai',
    name: 'Autonomous Agent Swarms',
    category: 'ai-product',
    categoryLabel: 'AI Product',
    spec: 'Multi-Step Reasoning',
    description: 'Self-directing LLM agents designed for multi-step workflow automation, tool invocation, and decision-making.',
    badge: 'Flagship',
  },
  {
    id: 'rag-vector',
    name: 'Vector Search & Knowledge RAG',
    category: 'ai-product',
    categoryLabel: 'AI Product',
    spec: 'Domain-Specific Retrieval',
    description: 'Sub-millisecond semantic search across proprietary datasets, connecting LLMs directly to verified business data.',
  },
  {
    id: 'custom-copilots',
    name: 'Custom Copilots & Workflows',
    category: 'ai-product',
    categoryLabel: 'AI Product',
    spec: 'Human-in-the-Loop',
    description: 'Embedded AI copilots tailored for enterprise software to automate repetitive manual work and analysis.',
  },

  // 3. SEO
  {
    id: 'technical-seo',
    name: 'Technical SEO & Core Web Vitals',
    category: 'seo',
    categoryLabel: 'SEO',
    spec: 'Search Engine Architecture',
    description: 'Optimizing crawl budgets, canonical topologies, server response times, and LCP/FID metrics for high Google rankings.',
    badge: 'High Impact',
  },
  {
    id: 'programmatic-seo',
    name: 'Programmatic SEO & Content Engines',
    category: 'seo',
    categoryLabel: 'SEO',
    spec: 'Scalable Organic Growth',
    description: 'Automated high-quality dynamic landing page architectures generating long-tail search dominance and qualified leads.',
  },
  {
    id: 'schema-markup',
    name: 'Structured Data & Schema Graph',
    category: 'seo',
    categoryLabel: 'SEO',
    spec: 'Rich Snippet Graph',
    description: 'JSON-LD schema implementations that increase SERP real estate, knowledge graph placement, and click-through rates.',
  },

  // 4. SQA (Software Quality Assurance)
  {
    id: 'e2e-automation',
    name: 'Automated E2E Testing (Playwright)',
    category: 'sqa',
    categoryLabel: 'SQA',
    spec: 'Regression Defense',
    description: 'Continuous end-to-end browser and device testing executing automatically on every pull request before release.',
    badge: 'Automated',
  },
  {
    id: 'performance-load',
    name: 'Synthetic Load & Stress Testing',
    category: 'sqa',
    categoryLabel: 'SQA',
    spec: 'Capacity Benchmarking',
    description: 'Simulating 50k+ concurrent virtual users to detect memory leaks, database bottlenecks, and SLA thresholds.',
  },
  {
    id: 'api-security-qa',
    name: 'API Quality & Contract Validation',
    category: 'sqa',
    categoryLabel: 'SQA',
    spec: 'Zero Flaky Tests',
    description: 'Automated contract testing, payload fuzzing, and security vulnerability scans integrated into CI/CD pipelines.',
  },

  // 5. Digital Marketing
  {
    id: 'cro-funnels',
    name: 'Conversion Rate Optimization (CRO)',
    category: 'marketing',
    categoryLabel: 'Digital Marketing',
    spec: 'Funnel Enhancement',
    description: 'Data-backed A/B testing, user journey heatmapping, and checkout flow optimization to maximize customer conversion.',
    badge: 'Growth',
  },
  {
    id: 'performance-ads',
    name: 'Data-Led Paid Acquisition',
    category: 'marketing',
    categoryLabel: 'Digital Marketing',
    spec: 'ROI-Driven Strategy',
    description: 'Precision targeting campaigns across search, social, and programmatic channels focused on sustainable CAC and LTV.',
  },
  {
    id: 'analytics-attribution',
    name: 'GA4, GTM & Attribution Modeling',
    category: 'marketing',
    categoryLabel: 'Digital Marketing',
    spec: 'Multi-Touch Tracking',
    description: 'Clean server-side tracking and attribution setup ensuring accurate revenue reporting and zero signal loss.',
  },

  // 6. AI/ML Ops
  {
    id: 'model-serving',
    name: 'vLLM & TensorRT Inference Serving',
    category: 'aiml-ops',
    categoryLabel: 'AI/ML Ops',
    spec: 'High-Throughput GPUs',
    description: 'Quantized production model deployment, continuous batching, and GPU cluster orchestration for minimal token latency.',
    badge: 'Scale',
  },
  {
    id: 'pipeline-monitoring',
    name: 'Model Monitoring & Drift Detection',
    category: 'aiml-ops',
    categoryLabel: 'AI/ML Ops',
    spec: 'Observability & Safety',
    description: 'Real-time telemetry tracking data drift, hallucination rates, and latency anomalies with automated alerting.',
  },
  {
    id: 'fine-tuning-cicd',
    name: 'Continuous Fine-Tuning CI/CD',
    category: 'aiml-ops',
    categoryLabel: 'AI/ML Ops',
    spec: 'LoRA & Automated Eval',
    description: 'Automated retraining pipelines with synthetic evaluation benchmarks before models deploy to live production.',
  },
];

export function TechStackExplorer() {
  const [activeCategory, setActiveCategory] = useState<
    'all' | 'web' | 'ai-product' | 'seo' | 'sqa' | 'marketing' | 'aiml-ops'
  >('web');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Services', icon: Layers },
    { id: 'web', label: 'Web Development', icon: Code2 },
    { id: 'ai-product', label: 'AI Product', icon: Cpu },
    { id: 'seo', label: 'SEO', icon: Search },
    { id: 'sqa', label: 'SQA', icon: ShieldCheck },
    { id: 'marketing', label: 'Digital Marketing', icon: TrendingUp },
    { id: 'aiml-ops', label: 'AI/ML Ops', icon: Database },
  ] as const;

  const filteredItems = universeItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.spec.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="tech-universe-container">
      {/* Category Navigation & Search */}
      <div className="tech-universe-header">
        <div className="universe-tabs" role="tablist">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const count =
              cat.id === 'all'
                ? universeItems.length
                : universeItems.filter((i) => i.category === cat.id).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                className={`universe-tab ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <Icon size={14} />
                <span>{cat.label}</span>
                <span className="count-pill">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="universe-search">
          <Search size={14} className="search-icon" />
          <input
            type="text"
            placeholder="Search capabilities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Filter capabilities"
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery('')}>
              ×
            </button>
          )}
        </div>
      </div>

      {/* Grid of Clean Tech Cards */}
      <div className="universe-grid">
        {filteredItems.map((tech) => (
          <TiltCard key={tech.id} className="universe-card" maxTilt={5}>
            <div className="universe-card-top">
              <span className="tech-cat-label">{tech.categoryLabel}</span>
              {tech.badge && <span className="tech-badge">{tech.badge}</span>}
            </div>

            <h3 className="universe-tech-name">{tech.name}</h3>
            <p className="universe-tech-spec">{tech.spec}</p>
            <p className="universe-tech-desc">{tech.description}</p>

            <div className="universe-card-bottom">
              <span className="card-indicator" />
              <ArrowUpRight size={14} className="card-arrow" />
            </div>
          </TiltCard>
        ))}

        {filteredItems.length === 0 && (
          <div className="universe-empty">
            <p>No capabilities matched &ldquo;{searchQuery}&rdquo;</p>
            <button
              className="btn-secondary"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
