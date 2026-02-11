import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = 'https://eone.work';

const ROOT_DIR = process.cwd();
const BLOG_DIR = path.join(ROOT_DIR, 'src/content/blog');
const PROJECTS_DIR = path.join(ROOT_DIR, 'src/content/projects');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

function toAbsoluteUrl(routePath) {
  return new URL(routePath, SITE_URL).toString();
}

function toIsoDate(value) {
  if (!value) return undefined;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;

  return date.toISOString().split('T')[0];
}

function getFrontmatterDate(rawContent) {
  const match = rawContent.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return undefined;

  const [, frontmatter] = match;
  const dateLine = frontmatter
    .split('\n')
    .find((line) => line.trim().startsWith('date:'));

  if (!dateLine) return undefined;
  return dateLine.slice(dateLine.indexOf(':') + 1).trim().replace(/^['"]|['"]$/g, '');
}

function toUrlEntry({ routePath, changefreq, priority, lastmod }) {
  const xmlParts = [
    '  <url>',
    `    <loc>${toAbsoluteUrl(routePath)}</loc>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority.toFixed(1)}</priority>`,
  ];

  if (lastmod) {
    xmlParts.splice(2, 0, `    <lastmod>${lastmod}</lastmod>`);
  }

  xmlParts.push('  </url>');
  return xmlParts.join('\n');
}

async function loadBlogRoutes() {
  const files = (await readdir(BLOG_DIR)).sort();
  const entries = [];

  for (const fileName of files) {
    if (!fileName.endsWith('.md')) continue;

    const filePath = path.join(BLOG_DIR, fileName);
    const slug = fileName.replace('.md', '');
    const rawContent = await readFile(filePath, 'utf8');
    const date = getFrontmatterDate(rawContent);

    entries.push({
      routePath: `/blog/${slug}`,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: toIsoDate(date),
    });
  }

  return entries;
}

async function loadProjectRoutes() {
  const files = (await readdir(PROJECTS_DIR)).sort();
  const entries = [];

  for (const fileName of files) {
    if (!fileName.endsWith('.md')) continue;

    const slug = fileName.replace('.md', '');
    entries.push({
      routePath: `/projects/${slug}`,
      changefreq: 'monthly',
      priority: 0.7,
    });
  }

  return entries;
}

async function generateSitemap() {
  const staticRoutes = [
    { routePath: '/', changefreq: 'weekly', priority: 1.0 },
    { routePath: '/blog', changefreq: 'weekly', priority: 0.9 },
    { routePath: '/projects', changefreq: 'weekly', priority: 0.9 },
    { routePath: '/about', changefreq: 'monthly', priority: 0.8 },
  ];

  const [blogRoutes, projectRoutes] = await Promise.all([
    loadBlogRoutes(),
    loadProjectRoutes(),
  ]);

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...[...staticRoutes, ...blogRoutes, ...projectRoutes].map(toUrlEntry),
    '</urlset>',
    '',
  ].join('\n');

  await writeFile(path.join(PUBLIC_DIR, 'sitemap.xml'), xml, 'utf8');
}

async function generateRobotsTxt() {
  const robotsTxt = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${toAbsoluteUrl('/sitemap.xml')}`,
    '',
  ].join('\n');

  await writeFile(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt, 'utf8');
}

async function main() {
  await Promise.all([generateSitemap(), generateRobotsTxt()]);
  console.log('Generated sitemap.xml and robots.txt');
}

main().catch((error) => {
  console.error('Failed to generate SEO files:', error);
  process.exit(1);
});
