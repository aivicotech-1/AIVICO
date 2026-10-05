import { Image } from 'lucide-react';

// Replace these placeholders with approved project copy and local screenshots.
const projects = Array.from({ length: 4 }, (_, index) => ({
  id: `project-${index + 1}`,
  name: `Project ${index + 1}`,
  description: 'Project details coming soon. This space will introduce the product, its purpose, and the work delivered by Aivico Tech.',
  image: '',
}));

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
                <span className="project-placeholder-label">Project preview</span>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
              <div className="project-image">
                {project.image ? <img src={project.image} alt={`${project.name} product screenshot`} loading="lazy" /> : (
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
