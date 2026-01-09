import { Link } from 'react-router-dom';
import { CalendarBlankIcon, ClockIcon } from '@phosphor-icons/react';
import { format } from 'date-fns';
import { Tag } from '@/components/ui/Tag';
import type { BlogPost } from '@/types';
import styles from './BlogCard.module.css';

interface BlogCardProps {
  post: BlogPost;
  activeTag?: string | null;
}

export function BlogCard({ post, activeTag }: BlogCardProps) {
  return (
    <article className={styles.card}>
      <Link to={`/blog/${post.slug}`} className={styles.link}>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.description}>{post.description}</p>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <CalendarBlankIcon size={14} />
            {format(new Date(post.date), 'MMM d, yyyy')}
          </span>
          <span className={styles.metaItem}>
            <ClockIcon size={14} />
            {post.readingTime} min read
          </span>
        </div>
      </Link>

      {post.tags.length > 0 && (
        <div className={styles.tags}>
          {post.tags.map((tag) => (
            <Tag key={tag} tag={tag} active={tag === activeTag} />
          ))}
        </div>
      )}
    </article>
  );
}
