import { Link } from 'react-router-dom';
import { ArrowRightIcon, XIcon } from '@phosphor-icons/react';
import type { BlogPost } from '@/types';
import styles from './BlogIntro.module.css';

interface BlogIntroProps {
  post: BlogPost;
  onDismiss: () => void;
}

export function BlogIntro({ post, onDismiss }: BlogIntroProps) {
  return (
    <section className={styles.banner} aria-label="Blog introduction">
      <Link to={`/blog/${post.slug}`} className={styles.clickArea}>
        <div className={styles.kicker}>Start here</div>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.description}>{post.description}</p>
        <div className={styles.cta}>
          Read
          <ArrowRightIcon size={14} />
        </div>
      </Link>
      <button
        type="button"
        className={styles.dismiss}
        onClick={onDismiss}
        aria-label="Dismiss"
      >
        <XIcon size={16} />
      </button>
    </section>
  );
}
