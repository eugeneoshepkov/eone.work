import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { BlogCard } from "@/components/blog/BlogCard";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Seo } from "@/components/seo/Seo";
import { getFeaturedPosts, getFeaturedProjects } from "@/lib/content";
import { getPersonSchema, SITE_NAME, toAbsoluteUrl } from "@/lib/seo";
import styles from "./Home.module.css";

export function Home() {
  const featuredPosts = getFeaturedPosts(3);
  const featuredProjects = getFeaturedProjects(3);

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

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Posts</h2>
            <Link to="/blog" className={styles.sectionLink}>
              View all
              <ArrowRightIcon size={14} />
            </Link>
          </div>
          <div className={styles.postsGrid}>
            {featuredPosts.map((post, index) => (
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
