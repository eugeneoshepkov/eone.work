import { isValidElement, type ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './BlogContent.module.css';

interface BlogContentProps {
  content: string;
}

function getYoutubeId(href: string): string | null {
  try {
    const url = new URL(href);
    if (url.hostname === 'youtu.be') {
      return url.pathname.replace('/', '') || null;
    }
    if (url.hostname.endsWith('youtube.com')) {
      if (url.pathname === '/watch') return url.searchParams.get('v');
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts[0] === 'embed' || parts[0] === 'shorts') return parts[1] || null;
    }
  } catch {
    return null;
  }
  return null;
}

function getText(children: unknown): string | null {
  if (typeof children === 'string') return children;
  if (Array.isArray(children) && children.every((c) => typeof c === 'string')) {
    return children.join('');
  }
  return null;
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className={styles.content}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => {
            const arr = Array.isArray(children) ? children : [children];
            if (arr.length === 1 && isValidElement(arr[0]) && arr[0].type === 'a') {
              const el = arr[0] as ReactElement<{ href?: string; children?: unknown }>;
              const href = el.props.href;
              const text = getText(el.props.children);
              if (href && text === href) {
                const id = getYoutubeId(href);
                if (id) {
                  return (
                    <div className={styles.embed}>
                      <div className={styles.embedFrame}>
                        <iframe
                          src={`https://www.youtube.com/embed/${id}`}
                          title="YouTube video"
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  );
                }
              }
            }

            return <p>{children}</p>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
