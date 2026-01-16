import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { BlogCard } from "@/components/blog/BlogCard";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { getFeaturedPosts, getFeaturedProjects } from "@/lib/content";
import styles from "./Home.module.css";

export function Home() {
  const featuredPosts = getFeaturedPosts(3);
  const featuredProjects = getFeaturedProjects(3);

  return (
    <div className="container">
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Hi, I'm <span className={styles.accent}>Evgeny</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Product-minded Software Engineer with 10+ years of experience. I
          specialize in TypeScript, React, Node.js, and AI-driven integrations.
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
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
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
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
