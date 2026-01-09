import { Link } from 'react-router-dom';
import { HouseIcon } from '@phosphor-icons/react';
import styles from './NotFound.module.css';

export function NotFound() {
  return (
    <div className="container">
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Page not found</h2>
        <p className={styles.description}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className={styles.link}>
          <HouseIcon size={16} />
          Back to home
        </Link>
      </div>
    </div>
  );
}
