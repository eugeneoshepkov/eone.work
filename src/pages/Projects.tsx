import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { Seo } from '@/components/seo/Seo';
import { getProjects } from '@/lib/content';
import { toAbsoluteUrl } from '@/lib/seo';
import styles from './Projects.module.css';

export function Projects() {
  const projects = getProjects();

  const projectsSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects | eone.work',
    description: "A collection of Evgeny Oshchepkov's software projects.",
    url: toAbsoluteUrl('/projects'),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: project.title,
        url: toAbsoluteUrl(`/projects/${project.slug}`),
      })),
    },
  };

  return (
    <div className="container">
      <Seo
        title="Projects | eone.work"
        description="Case studies and experiments built with TypeScript, React, AI, and modern web tooling."
        path="/projects"
        jsonLd={projectsSchema}
      />

      <header className={styles.header}>
        <h1 className={styles.title}>Projects</h1>
        <p className={styles.description}>
          A collection of things I've built, designed, and shipped.
        </p>
      </header>

      {projects.length > 0 ? (
        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>No projects yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
