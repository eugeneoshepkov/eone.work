import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, CalendarBlankIcon, ClockIcon, ArrowRightIcon } from '@phosphor-icons/react';
import { format } from 'date-fns';
import { BlogContent } from '@/components/blog/BlogContent';
import { BlogCard } from '@/components/blog/BlogCard';
import { Seo } from '@/components/seo/Seo';
import { Tag } from '@/components/ui/Tag';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { getBlogPost, getBlogPosts } from '@/lib/content';
import { AUTHOR_NAME, toAbsoluteUrl } from '@/lib/seo';
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
        <Seo
          title="Post Not Found | eone.work"
          description="The requested article could not be found."
          path="/blog"
          noindex
        />

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

  const postUrl = `/blog/${post.slug}`;
  const publishedTime = new Date(post.date).toISOString();
  const wordCount = post.content.split(/\s+/).filter(Boolean).length;
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: toAbsoluteUrl(postUrl),
    url: toAbsoluteUrl(postUrl),
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: toAbsoluteUrl('/about'),
    },
    publisher: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: toAbsoluteUrl('/about'),
    },
    image: [toAbsoluteUrl('/og-image.png')],
    keywords: post.tags.join(', '),
    wordCount,
    timeRequired: `PT${post.readingTime}M`,
    inLanguage: 'en',
  };

  return (
    <article className="container">
      <Seo
        title={`${post.title} | eone.work`}
        description={post.description}
        path={postUrl}
        type="article"
        publishedTime={publishedTime}
        tags={post.tags}
        jsonLd={blogPostingSchema}
      />

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
