import { Link, NavLink } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import type { Theme } from '@/types';
import styles from './Header.module.css';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link to="/" className={styles.logoWrap}>
          <img src="/avatar-bw.png" alt="" className={styles.avatar} />
          <span className={styles.logo}>
            eone<span className={styles.accent}>.work</span>
          </span>
        </Link>

        <nav className={styles.nav}>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            Blog
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            About
          </NavLink>
        </nav>

        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
