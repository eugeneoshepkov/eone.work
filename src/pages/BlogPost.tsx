import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, CalendarBlankIcon, ClockIcon } from '@phosphor-icons/react';
import { format } from 'date-fns';
import { BlogContent } from '@/components/blog/BlogContent';
import { Tag } from '@/components/ui/Tag';
import { getBlogPost } from '@/lib/content';
import styles from './BlogPost.module.css';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return (
      <div className="container">
        <div className={styles.notFound}>
          <h1>Post not found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className={styles.backLink}>
            <ArrowLeftIcon size={16} />
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="container">
      <Link to="/blog" className={styles.backLink}>
        <ArrowLeftIcon size={16} />
        Back to blog
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <CalendarBlankIcon size={16} />
            {format(new Date(post.date), 'MMMM d, yyyy')}
          </span>
          <span className={styles.metaItem}>
            <ClockIcon size={16} />
            {post.readingTime} min read
          </span>
        </div>

        {post.tags.length > 0 && (
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
        )}
      </header>

      <BlogContent content={post.content} />
    </article>
  );
}
