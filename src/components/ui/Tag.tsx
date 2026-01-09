import { Link } from 'react-router-dom';
import styles from './Tag.module.css';

interface TagProps {
  tag: string;
  active?: boolean;
}

export function Tag({ tag, active = false }: TagProps) {
  return (
    <Link
      to={`/blog?tag=${encodeURIComponent(tag)}`}
      className={`${styles.tag} ${active ? styles.active : ''}`}
    >
      {tag}
    </Link>
  );
}
