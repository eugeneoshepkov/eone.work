import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, CalendarBlankIcon, ClockIcon, ArrowRightIcon } from '@phosphor-icons/react';
import { format } from 'date-fns';
import { BlogContent } from '@/components/blog/BlogContent';
import { BlogCard } from '@/components/blog/BlogCard';
import { Tag } from '@/components/ui/Tag';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { getBlogPost, getBlogPosts } from '@/lib/content';
import styles from './BlogPost.module.css';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;
  const otherPosts = getBlogPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

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
      <ScrollProgress />
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

      {otherPosts.length > 0 && (
        <section className={styles.otherPosts}>
          <div className={styles.otherPostsHeader}>
            <h2 className={styles.otherPostsTitle}>Other Posts</h2>
            <Link to="/blog" className={styles.otherPostsLink}>
              View all
              <ArrowRightIcon size={14} />
            </Link>
          </div>
          <div className={styles.otherPostsGrid}>
            {otherPosts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
