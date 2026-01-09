import { GithubLogoIcon, LinkedinLogoIcon, EnvelopeIcon } from '@phosphor-icons/react';
import styles from './Footer.module.css';

const socialLinks = [
  { href: 'https://github.com/eone', icon: GithubLogoIcon, label: 'GitHub' },
  { href: 'https://linkedin.com/in/evgeny-Oshchepkov', icon: LinkedinLogoIcon, label: 'LinkedIn' },
  { href: 'mailto:me@eone.work', icon: EnvelopeIcon, label: 'Email' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.social}>
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={label}
            >
              <Icon size={20} weight="regular" />
            </a>
          ))}
        </div>
        <p className={styles.copyright}>
          © {currentYear} eone.work
        </p>
      </div>
    </footer>
  );
}
