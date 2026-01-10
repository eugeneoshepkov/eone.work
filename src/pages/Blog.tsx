import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { XIcon } from '@phosphor-icons/react';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogIntro } from '@/components/blog/BlogIntro';
import { Tag } from '@/components/ui/Tag';
import { getBlogPosts } from '@/lib/content';
import styles from './Blog.module.css';

const INTRO_KEY = 'blog:intro:dismissed:v1';

export function Blog() {
  const [searchParams] = useSearchParams();
  const activeTag = searchParams.get('tag');

  const allPosts = getBlogPosts();
  const introPost = allPosts.find((post) => post.slug === 'hello-world');

  const [introDismissed, setIntroDismissed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(INTRO_KEY) === 'true';
  });

  const showIntro = !activeTag && !!introPost && !introDismissed;

  const filteredPosts = activeTag
    ? allPosts.filter((post) => post.tags.includes(activeTag))
    : allPosts;

  const posts = showIntro && introPost
    ? filteredPosts.filter((post) => post.slug !== introPost.slug)
    : filteredPosts;

  // Get all unique tags
  const allTags = [...new Set(allPosts.flatMap((post) => post.tags))].sort();

  const handleDismissIntro = () => {
    window.localStorage.setItem(INTRO_KEY, 'true');
    setIntroDismissed(true);
  };

  return (
    <div className="container">
      <header className={styles.header}>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.description}>
          Thoughts on technology, design, and building things for the web.
        </p>
      </header>

      {showIntro && introPost && (
        <BlogIntro post={introPost} onDismiss={handleDismissIntro} />
      )}

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
