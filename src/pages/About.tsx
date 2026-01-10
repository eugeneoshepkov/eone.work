import { GithubLogoIcon, LinkedinLogoIcon, EnvelopeIcon } from '@phosphor-icons/react';
import styles from './About.module.css';

const socialLinks = [
  {
    href: "https://github.com/eugeneoshepkov",
    icon: GithubLogoIcon,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/in/evgeny-Oshchepkov",
    icon: LinkedinLogoIcon,
    label: "LinkedIn",
  },
  { href: "mailto:me@eone.work", icon: EnvelopeIcon, label: "Email" },
];

const skills = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'AWS',
  'PostgreSQL',
  'GraphQL',
  'Docker',
  'LLMs / OpenAI',
  'Python',
  'Machine Learning',
];

export function About() {
  return (
    <div className="container">
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.avatarWrap}>
            <img
              src="/avatar-bw.png"
              alt="Evgeny Oshchepkov"
              className={styles.avatar}
            />
          </div>
          <h1 className={styles.title}>About Me</h1>
        </header>

        <section className={styles.section}>
          <p className={styles.intro}>
            I'm Evgeny Oshchepkov, a product-minded Software Engineer with over
            10 years of experience building scalable web applications. I bridge
            the gap between product and engineering.
          </p>
          <p className={styles.text}>
            Currently based in Vienna, I specialize in TypeScript, React, and
            Node.js, with a growing focus on AI-driven integrations and LLMs.
            I've helped build products at companies like Embeddable,
            ImmoScout24, and TourRadar — modernizing legacy systems, building
            SDKs, and shipping AI-enhanced analytics features.
          </p>
          <p className={styles.text}>
            I'm passionate about developer experience, performance optimization,
            and creating tools that make complex things simple. When I'm not
            coding, I mentor engineers and explore new technologies.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills & Tools</h2>
          <div className={styles.skills}>
            {skills.map((skill) => (
              <span key={skill} className={styles.skill}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Connect</h2>
          <p className={styles.text}>
            I'm always interested in hearing about new projects and
            opportunities. Feel free to reach out!
          </p>
          <div className={styles.social}>
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <Icon size={20} weight="regular" />
                {label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
