import { createContext, useContext, useEffect, useMemo } from 'react';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE_PATH,
  DEFAULT_TITLE,
  SITE_NAME,
  toAbsoluteUrl,
} from '@/lib/seo';

type JsonLdSchema = Record<string, unknown>;

export interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  imagePath?: string;
  type?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  publishedTime?: string;
  tags?: string[];
  jsonLd?: JsonLdSchema | JsonLdSchema[];
}

export interface ResolvedSeoProps {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl: string;
  type: 'website' | 'article' | 'profile';
  noindex: boolean;
  publishedTime?: string;
  tags: string[];
  jsonLdItems: JsonLdSchema[];
}

export const SeoContext = createContext<((seo: ResolvedSeoProps) => void) | null>(null);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function resolveSeoProps({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  imagePath = DEFAULT_IMAGE_PATH,
  type = 'website',
  noindex = false,
  publishedTime,
  tags = [],
  jsonLd,
}: SeoProps): ResolvedSeoProps {
  const canonicalUrl = toAbsoluteUrl(path || '/');
  const imageUrl = toAbsoluteUrl(imagePath);
  const jsonLdItems = !jsonLd ? [] : Array.isArray(jsonLd) ? jsonLd : [jsonLd];

  return {
    title,
    description,
    canonicalUrl,
    imageUrl,
    type,
    noindex,
    publishedTime,
    tags,
    jsonLdItems,
  };
}

export function renderSeoHeadTags(seo: ResolvedSeoProps): string {
  const robotsContent = seo.noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  const articlePublished =
    seo.type === 'article' && seo.publishedTime
      ? `\n    <meta property="article:published_time" content="${escapeHtml(seo.publishedTime)}" />`
      : '';

  const articleTags =
    seo.type === 'article'
      ? seo.tags
          .map((tag) => `    <meta property="article:tag" content="${escapeHtml(tag)}" />`)
          .join('\n')
      : '';

  const jsonLdScripts = seo.jsonLdItems
    .map((schema) => {
      const json = JSON.stringify(schema).replace(/</g, '\\u003c');
      return `    <script type="application/ld+json">${json}</script>`;
    })
    .join('\n');

  const jsonLdSection = jsonLdScripts ? `\n${jsonLdScripts}` : '';
  const articleTagsSection = articleTags ? `\n${articleTags}` : '';

  return [
    `    <title>${escapeHtml(seo.title)}</title>`,
    `    <meta name="description" content="${escapeHtml(seo.description)}" />`,
    `    <meta name="robots" content="${escapeHtml(robotsContent)}" />`,
    `    <meta name="theme-color" content="#161616" />`,
    `    <link rel="canonical" href="${escapeHtml(seo.canonicalUrl)}" />`,
    `    <meta property="og:type" content="${escapeHtml(seo.type)}" />`,
    `    <meta property="og:url" content="${escapeHtml(seo.canonicalUrl)}" />`,
    `    <meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `    <meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `    <meta property="og:image" content="${escapeHtml(seo.imageUrl)}" />`,
    `    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    '    <meta property="og:image:width" content="1200" />',
    '    <meta property="og:image:height" content="630" />',
    '    <meta name="twitter:card" content="summary_large_image" />',
    `    <meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `    <meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `    <meta name="twitter:image" content="${escapeHtml(seo.imageUrl)}" />`,
    articlePublished,
    articleTagsSection,
    jsonLdSection,
  ]
    .filter(Boolean)
    .join('\n');
}

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}

function removeMeta(attribute: 'name' | 'property', key: string) {
  const tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (tag) {
    tag.remove();
  }
}

function upsertCanonical(url: string) {
  let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }

  canonical.setAttribute('href', url);
}

export function Seo({
  title,
  description,
  path,
  imagePath,
  type,
  noindex,
  publishedTime,
  tags,
  jsonLd,
}: SeoProps) {
  const reportSeo = useContext(SeoContext);

  const resolvedSeo = useMemo(
    () =>
      resolveSeoProps({
        title,
        description,
        path,
        imagePath,
        type,
        noindex,
        publishedTime,
        tags,
        jsonLd,
      }),
    [description, imagePath, jsonLd, noindex, path, publishedTime, tags, title, type]
  );

  if (typeof document === 'undefined' && reportSeo) {
    reportSeo(resolvedSeo);
  }

  useEffect(() => {
    document.title = resolvedSeo.title;

    const robotsContent = resolvedSeo.noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

    upsertMeta('name', 'description', resolvedSeo.description);
    upsertMeta('name', 'robots', robotsContent);
    upsertMeta('name', 'theme-color', '#161616');

    upsertMeta('property', 'og:type', resolvedSeo.type);
    upsertMeta('property', 'og:title', resolvedSeo.title);
    upsertMeta('property', 'og:description', resolvedSeo.description);
    upsertMeta('property', 'og:url', resolvedSeo.canonicalUrl);
    upsertMeta('property', 'og:image', resolvedSeo.imageUrl);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:image:width', '1200');
    upsertMeta('property', 'og:image:height', '630');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', resolvedSeo.title);
    upsertMeta('name', 'twitter:description', resolvedSeo.description);
    upsertMeta('name', 'twitter:image', resolvedSeo.imageUrl);

    upsertCanonical(resolvedSeo.canonicalUrl);

    if (resolvedSeo.type === 'article' && resolvedSeo.publishedTime) {
      upsertMeta('property', 'article:published_time', resolvedSeo.publishedTime);
    } else {
      removeMeta('property', 'article:published_time');
    }

    document.head
      .querySelectorAll('meta[data-seo-article-tag="true"]')
      .forEach((node) => node.remove());

    if (resolvedSeo.type === 'article') {
      resolvedSeo.tags.forEach((tagValue) => {
        const tag = document.createElement('meta');
        tag.setAttribute('property', 'article:tag');
        tag.setAttribute('content', tagValue);
        tag.setAttribute('data-seo-article-tag', 'true');
        document.head.appendChild(tag);
      });
    }

    document.head
      .querySelectorAll('script[data-seo-json-ld="true"]')
      .forEach((node) => node.remove());

    resolvedSeo.jsonLdItems.forEach((schema) => {
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-seo-json-ld', 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, [resolvedSeo]);

  return null;
}
