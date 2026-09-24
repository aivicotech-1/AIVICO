import { useState, useMemo } from 'react';
import { Calculator, ArrowRight, Shield, Zap, Sparkles, Check } from 'lucide-react';

interface ProjectEstimatorProps {
  onApplySpec?: (specSummary: string) => void;
}

export function ProjectEstimator({ onApplySpec }: ProjectEstimatorProps) {
  const [projectType, setProjectType] = useState<'saas' | 'ai' | 'cloud' | 'backend'>('ai');
  const [scale, setScale] = useState<'mvp' | 'scale' | 'enterprise'>('scale');
  const [timeline, setTimeline] = useState<'fast' | 'standard' | 'extended'>('standard');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['sqa', 'observability']);

  const projectTypes = [
    { id: 'ai', title: 'AI & Autonomous Systems', baseCost: 28000, weeks: 8, squad: '1 AI Lead, 2 ML Engineers, 1 Fullstack' },
    { id: 'saas', title: 'Enterprise Web / SaaS Platform', baseCost: 22000, weeks: 7, squad: '1 Solutions Architect, 2 Fullstack, 1 UI/UX' },
    { id: 'cloud', title: 'Cloud Modernization & DevOps', baseCost: 18000, weeks: 6, squad: '1 Cloud Architect, 1 DevOps/SRE, 1 SecOps' },
    { id: 'backend', title: 'High-Concurrency Backend / API', baseCost: 24000, weeks: 7, squad: '1 Principal Engineer, 2 Distributed Systems Devs' },
  ] as const;

  const scaleMultipliers = {
    mvp: { mult: 0.75, name: 'MVP / Fast Launch', desc: 'Streamlined core feature set for rapid validation' },
    scale: { mult: 1.0, name: 'Production Growth Grade', desc: 'Full-scale architecture built for 100k+ active users' },
    enterprise: { mult: 1.5, name: 'Mission-Critical Enterprise', desc: 'Multi-region redundancy, SOC2/ISO compliance & 99.99% SLA' },
  };

  const timelineMultipliers = {
    fast: { mult: 1.25, name: 'Accelerated Sprint', note: 'Dedicated parallel squad execution' },
    standard: { mult: 1.0, name: 'Standard Agile Sprints', note: 'Bi-weekly deploy cycles & milestones' },
    extended: { mult: 0.95, name: 'Phased Long-term Program', note: 'Staged quarterly feature releases' },
  };

  const addonsList = [
    { id: 'sqa', label: 'Continuous SQA & Load Testing Automation', cost: 4500 },
    { id: 'observability', label: 'OpenTelemetry Distributed Tracing & P99 Alerting', cost: 3500 },
    { id: 'security', label: 'Penetration Testing & SOC2 Compliance Harness', cost: 6000 },
    { id: 'sre', label: '90-Day Post-Launch 24/7 SRE Support', cost: 5000 },
  ];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculation = useMemo(() => {
    const p = projectTypes.find((item) => item.id === projectType)!;
    const s = scaleMultipliers[scale];
    const t = timelineMultipliers[timeline];

    const addonsCost = selectedAddons.reduce((acc, curr) => {
      const match = addonsList.find((a) => a.id === curr);
      return acc + (match ? match.cost : 0);
    }, 0);

    const rawTotal = Math.round((p.baseCost * s.mult * t.mult + addonsCost) / 1000) * 1000;
    const minRange = Math.round(rawTotal * 0.9);
    const maxRange = Math.round(rawTotal * 1.15);

    let estimatedWeeks: number = p.weeks;
    if (scale === 'mvp') estimatedWeeks = Math.max(4, Math.round(estimatedWeeks * 0.7));
    if (scale === 'enterprise') estimatedWeeks = Math.round(estimatedWeeks * 1.4);
    if (timeline === 'fast') estimatedWeeks = Math.max(3, Math.round(estimatedWeeks * 0.75));

    return {
      minRange: minRange.toLocaleString(),
      maxRange: maxRange.toLocaleString(),
      weeks: estimatedWeeks,
      squad: p.squad,
      projectName: p.title,
      scaleName: s.name,
    };
  }, [projectType, scale, timeline, selectedAddons]);

  const handleApply = () => {
    const spec = `Project Scope: ${calculation.projectName} | Scale: ${calculation.scaleName} | Est. Timeline: ~${calculation.weeks} weeks | Est. Budget: $${calculation.minRange} - $${calculation.maxRange}`;
    if (onApplySpec) {
      onApplySpec(spec);
    }
  };

  return (
    <div className="estimator-wrapper">
      <div className="estimator-grid">
        {/* Controls Column */}
        <div className="estimator-controls">
          {/* Step 1: Solution Type */}
          <div className="control-group">
            <label className="group-label">
              <span className="step-num">01</span>
              <span>Select Architecture Domain</span>
            </label>
            <div className="options-grid">
              {projectTypes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`option-card ${projectType === item.id ? 'active' : ''}`}
                  onClick={() => setProjectType(item.id)}
                >
                  <div className="option-indicator" />
                  <div className="option-info">
                    <h4>{item.title}</h4>
                    <small>{item.squad.split(',')[0]} led</small>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: System Scale */}
          <div className="control-group">
            <label className="group-label">
              <span className="step-num">02</span>
              <span>System Scale & Rigor</span>
            </label>
            <div className="scale-buttons">
              {(Object.keys(scaleMultipliers) as Array<keyof typeof scaleMultipliers>).map((key) => {
                const s = scaleMultipliers[key];
                return (
                  <button
                    key={key}
                    type="button"
                    className={`scale-btn ${scale === key ? 'active' : ''}`}
                    onClick={() => setScale(key)}
                  >
                    <b>{s.name}</b>
                    <small>{s.desc}</small>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Add-on Capabilities */}
          <div className="control-group">
            <label className="group-label">
              <span className="step-num">03</span>
              <span>Enterprise Add-On Accelerators</span>
            </label>
            <div className="addons-grid">
              {addonsList.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    className={`addon-chip ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleAddon(addon.id)}
                  >
                    <span className="checkbox-icon">{isSelected ? <Check size={12} /> : null}</span>
                    <span>{addon.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Calculation Output Card */}
        <div className="estimator-output-panel">
          <div className="output-card glass-panel">
            <div className="output-header">
              <div className="calc-badge">
                <Calculator size={15} />
                <span>ESTIMATED INVESTMENT & SQUAD</span>
              </div>
              <span className="status-live">
                <span className="live-dot" /> LIVE MODEL
              </span>
            </div>

            <div className="price-display">
              <div className="price-label">Estimated Investment Range</div>
              <div className="price-amount">
                <span className="currency">$</span>
                <span className="range">{calculation.minRange} – ${calculation.maxRange}</span>
              </div>
              <div className="price-note">Transparent fixed sprint pricing • Zero hidden fees</div>
            </div>

            <div className="output-specs">
              <div className="spec-row">
                <span className="spec-name">
                  <Zap size={15} className="text-cyan" /> Delivery Timeline
                </span>
                <span className="spec-value">~{calculation.weeks} Weeks (Agile Cycles)</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">
                  <Shield size={15} className="text-indigo" /> Dedicated Engineering Squad
                </span>
                <span className="spec-value">{calculation.squad}</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">
                  <Sparkles size={15} className="text-emerald" /> IP Ownership
                </span>
                <span className="spec-value">100% Client Owned (Day 1)</span>
              </div>
            </div>

            <button type="button" className="btn-apply-spec" onClick={handleApply}>
              <span>Lock This Scope Into Inquiry</span>
              <ArrowRight size={16} />
            </button>
            <p className="guarantee-text">
              🔒 Backed by rigorous SQA coverage & production SLA guarantees.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
