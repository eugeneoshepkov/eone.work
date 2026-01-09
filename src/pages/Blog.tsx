import { useSearchParams, Link } from 'react-router-dom';
import { XIcon } from '@phosphor-icons/react';
import { BlogCard } from '@/components/blog/BlogCard';
import { Tag } from '@/components/ui/Tag';
import { getBlogPosts } from '@/lib/content';
import styles from './Blog.module.css';

export function Blog() {
  const [searchParams] = useSearchParams();
  const activeTag = searchParams.get('tag');

  const allPosts = getBlogPosts();
  const posts = activeTag
    ? allPosts.filter((post) => post.tags.includes(activeTag))
    : allPosts;

  // Get all unique tags
  const allTags = [...new Set(allPosts.flatMap((post) => post.tags))].sort();

  return (
    <div className="container">
      <header className={styles.header}>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.description}>
          Thoughts on technology, design, and building things for the web.
        </p>
      </header>

      {/* Tag filter */}
      <div className={styles.tags}>
        {allTags.map((tag) => (
          <Tag key={tag} tag={tag} active={tag === activeTag} />
        ))}
      </div>

      {/* Active filter indicator */}
      {activeTag && (
        <div className={styles.activeFilter}>
          <span>Filtered by: <strong>{activeTag}</strong></span>
          <Link to="/blog" className={styles.clearFilter}>
            <XIcon size={14} />
            Clear
          </Link>
        </div>
      )}

      {posts.length > 0 ? (
        <div className={styles.grid}>
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} activeTag={activeTag} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>No posts with tag "{activeTag}".</p>
          <Link to="/blog" className={styles.clearLink}>View all posts</Link>
        </div>
      )}
    </div>
  );
}
