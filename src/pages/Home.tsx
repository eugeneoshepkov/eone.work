import { Link } from "react-router-dom";
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { BlogCard } from "@/components/blog/BlogCard";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Seo } from "@/components/seo/Seo";
import { getFeaturedProjects, getRecentPosts, getSpotlightProject } from "@/lib/content";
import { getPersonSchema, SITE_NAME, toAbsoluteUrl } from "@/lib/seo";
import styles from "./Home.module.css";

export function Home() {
  const recentPosts = getRecentPosts(3);
  const featuredProjects = getFeaturedProjects(3);
  const spotlight = getSpotlightProject();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: toAbsoluteUrl("/"),
    inLanguage: "en",
  };

  return (
    <div className="container">
      <Seo
        title="Evgeny Oshchepkov | Software Engineer"
        description="Product-minded Software Engineer in Vienna. I build TypeScript, React, Node.js, and AI-powered products with a focus on performance and developer experience."
        path="/"
        jsonLd={[websiteSchema, getPersonSchema()]}
      />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground} aria-hidden="true">
          <div className={styles.orb} />
          <div className={styles.orb} />
          <div className={styles.orb} />
        </div>
        <h1 className={styles.heroTitle}>
          Hi, I'm <span className={styles.accent}>Evgeny</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Product-minded Software Engineer with 10+ years of experience.
          I specialize in TypeScript, React, Node.js, and AI-driven integrations.
          Based in Vienna.
        </p>
        <div className={styles.heroCta}>
          <Link to="/blog" className={styles.primaryButton}>
            Read Blog
            <ArrowRightIcon size={16} />
          </Link>
          <Link to="/about" className={styles.secondaryButton}>
            About Me
          </Link>
        </div>
      </section>

      {/* Spotlight Project */}
      {spotlight && (
        <section className={styles.section}>
          <article className={styles.spotlight}>
            {spotlight.image && (
              <Link to={`/projects/${spotlight.slug}`} className={styles.spotlightImageLink}>
                <img src={spotlight.image} alt={spotlight.title} className={styles.spotlightImage} />
              </Link>
            )}
            <div className={styles.spotlightBody}>
              <span className={styles.spotlightEyebrow}>Featured project</span>
              <h2 className={styles.spotlightTitle}>
                <Link to={`/projects/${spotlight.slug}`}>{spotlight.title}</Link>
              </h2>
              <p className={styles.spotlightDescription}>{spotlight.description}</p>
              <div className={styles.spotlightCta}>
                {spotlight.liveUrl && (
                  <a href={spotlight.liveUrl} className={styles.primaryButton} target="_blank" rel="noopener noreferrer">
                    Open dashboard
                    <ArrowUpRightIcon size={16} />
                  </a>
                )}
                <Link to={`/projects/${spotlight.slug}`} className={styles.secondaryButton}>
                  How it's built
                </Link>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* Featured Posts */}
      {recentPosts.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Posts</h2>
            <Link to="/blog" className={styles.sectionLink}>
              View all
              <ArrowRightIcon size={14} />
            </Link>
          </div>
          <div className={styles.postsGrid}>
            {recentPosts.map((post, index) => (
              <BlogCard
                key={post.slug}
                post={post}
                style={{ transitionDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Projects</h2>
            <Link to="/projects" className={styles.sectionLink}>
              View all
              <ArrowRightIcon size={14} />
            </Link>
          </div>
          <div className={styles.projectsGrid}>
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                style={{ transitionDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
