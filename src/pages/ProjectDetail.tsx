import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, ArrowUpRightIcon, GithubLogoIcon } from '@phosphor-icons/react';
import { BlogContent } from '@/components/blog/BlogContent';
import { getProject } from '@/lib/content';
import styles from './ProjectDetail.module.css';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProject(slug) : undefined;

  if (!project) {
    return (
      <div className="container">
        <div className={styles.notFound}>
          <h1>Project not found</h1>
          <p>The project you're looking for doesn't exist.</p>
          <Link to="/projects" className={styles.backLink}>
            <ArrowLeftIcon size={16} />
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="container">
      <Link to="/projects" className={styles.backLink}>
        <ArrowLeftIcon size={16} />
        Back to projects
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>{project.title}</h1>
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

        <div className={styles.links}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryLink}
            >
              View Live
              <ArrowUpRightIcon size={16} />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryLink}
            >
              <GithubLogoIcon size={16} />
              Source Code
            </a>
          )}
        </div>
      </header>

      {project.image && (
        <div className={styles.imageWrapper}>
          <img src={project.image} alt={project.title} className={styles.image} />
        </div>
      )}

      {project.content && <BlogContent content={project.content} />}
    </article>
  );
}
