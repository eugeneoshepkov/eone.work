import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { getProjects } from '@/lib/content';
import styles from './Projects.module.css';

export function Projects() {
  const projects = getProjects();

  return (
    <div className="container">
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
