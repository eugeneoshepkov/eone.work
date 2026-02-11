export const SITE_URL = 'https://eone.work';
export const SITE_NAME = 'eone.work';
export const AUTHOR_NAME = 'Evgeny Oshchepkov';
export const AUTHOR_ROLE = 'Software Engineer';
export const DEFAULT_TITLE = 'Evgeny Oshchepkov | Software Engineer';
export const DEFAULT_DESCRIPTION =
  'Product-minded Software Engineer specializing in TypeScript, React, Node.js, AWS, and AI integrations.';
export const DEFAULT_IMAGE_PATH = '/og-image.png';

export const AUTHOR_PROFILES = [
  'https://github.com/eugeneoshepkov',
  'https://linkedin.com/in/evgeny-Oshchepkov',
];

export function toAbsoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR_NAME,
    jobTitle: AUTHOR_ROLE,
    url: toAbsoluteUrl('/about'),
    image: toAbsoluteUrl('/avatar-bw.png'),
    sameAs: AUTHOR_PROFILES,
  };
}
