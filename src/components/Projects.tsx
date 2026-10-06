import { Image } from 'lucide-react';
import skill2SuccessImage from '../images/skill2success.jpg';
import aivicoImage from '../images/AIVICO-AI.jpg';
import crestonImage from '../images/CrestonBiz.jpg';

const projects = [
  {
    id: 'skill2success',
    name: 'Skill2Success',
    description: 'Skill2Success is a premier STEAM education academy designed to empower young minds, students, and professionals with future-ready tech skills. Through hands-on, project-based learning, the platform offers expert-led courses spanning Artificial Intelligence, Coding, LEGO & Arduino Robotics, Web Development, and Cybersecurity. By partnering with leading schools and institutions, Skill2Success bridges the gap between traditional education and modern technological innovation to foster the next generation of builders and problem solvers.',
    image: skill2SuccessImage,
  },
  {
    id: 'aivico-ai',
    name: 'AIVICO',
    description: 'AIVICO AI is an innovative AI-driven technology company dedicated to transforming education and corporate learning through natural, interactive personal tutoring companions. Specializing in advanced artificial intelligence, the platform designs tailored educational agents and intelligent tools that adapt to individual learner pathways and progress. By merging educational science with pioneering AI modeling, AIVICO.AI bridges traditional training gaps to provide scalable, 24/7 personal learning support.',
    image: aivicoImage,
  },
  {
    id: 'creston-biz',
    name: 'Creston Biz',
    description: 'Creston Biz is a comprehensive business consulting platform specializing in facility management, office operations, and administrative support to keep organizations running smoothly. Through expert event management and tailored operational strategies, Creston Biz ensures optimal workplace performance and seamless business execution. The platform empowers enterprises to streamline workflows, enhance efficiency, and achieve sustainable growth.',
    image: crestonImage,
  },
];

export function Projects() {
  return (
    <section id="projects" className="content-section">
      <div className="section-wrapper">
        <div className="section-header projects-heading">
          <h2 className="section-title">Our <span className="text-gradient">projects.</span></h2>
          <p className="section-desc">A closer look at what we build.</p>
        </div>
        <div className="projects-list">
          {projects.map(project => (
            <article className="project-row reveal-on-scroll" key={project.id}
              onPointerMove={event => {
                if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                const rect = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
                event.currentTarget.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
              }}>
              <div className="project-copy">
                {!project.image && <span className="project-placeholder-label">Project preview</span>}
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
              <div className="project-image">
                {project.image ? <img src={project.image} alt={`${project.name} website preview`} loading="lazy" decoding="async" /> : (
                  <div className="project-image-placeholder"><Image size={36} aria-hidden="true" /><span>Project image coming soon</span></div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
