import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { useInView } from '@/hooks/useInView';
import type { Project } from '@/types';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  style?: React.CSSProperties;
}

export function ProjectCard({ project, style }: ProjectCardProps) {
  const { ref, isVisible } = useInView();

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className={`${styles.card} fadeUp ${isVisible ? 'visible' : ''}`}
      style={style}
    >
      <Link to={`/projects/${project.slug}`} className={styles.link}>
        {project.image && (
          <div className={styles.imageWrapper}>
            <img src={project.image} alt={project.title} className={styles.image} />
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.header}>
            <h3 className={styles.title}>{project.title}</h3>
            <ArrowUpRightIcon size={18} className={styles.arrow} />
          </div>

          <p className={styles.description}>{project.description}</p>

          {project.tags.length > 0 && (
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
