import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import type { Theme } from '@/types';
import styles from './Layout.module.css';

interface LayoutProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Layout({ theme, onToggleTheme }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.ambientBg} aria-hidden="true" />
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
