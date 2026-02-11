import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const DIST_SSR_DIR = path.join(ROOT_DIR, 'dist-ssr');
const SITE_URL = 'https://eone.work';

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function loadRenderer() {
  const candidates = ['entry-server.js', 'entry-server.mjs'];

  for (const fileName of candidates) {
    const filePath = path.join(DIST_SSR_DIR, fileName);
    if (await fileExists(filePath)) {
      const module = await import(pathToFileURL(filePath).href);
      if (typeof module.render === 'function') {
        return module.render;
      }
    }
  }

  throw new Error('Could not locate SSR entry module in dist-ssr');
}

function parseRoutesFromSitemap(xml) {
  const routes = [];
  const regex = /<loc>https:\/\/eone\.work([^<]*)<\/loc>/g;

  for (const match of xml.matchAll(regex)) {
    const route = match[1] || '/';
    routes.push(route === '' ? '/' : route);
  }

  return Array.from(new Set(routes));
}

function toOutputPath(routePath) {
  if (routePath === '/') {
    return path.join(DIST_DIR, 'index.html');
  }

  const normalized = routePath.replace(/^\/+|\/+$/g, '');
  return path.join(DIST_DIR, normalized, 'index.html');
}

function injectSeoAndHtml(template, appHtml, headTags) {
  const withHead = template.replace(
    /<!--SEO_HEAD_START-->[\s\S]*?<!--SEO_HEAD_END-->/,
    `<!--SEO_HEAD_START-->\n${headTags}\n    <!--SEO_HEAD_END-->`
  );

  return withHead.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

async function main() {
  const render = await loadRenderer();
  const [template, sitemap] = await Promise.all([
    readFile(path.join(DIST_DIR, 'index.html'), 'utf8'),
    readFile(path.join(DIST_DIR, 'sitemap.xml'), 'utf8'),
  ]);

  const routes = parseRoutesFromSitemap(sitemap)
    .map((route) => {
      if (!route.startsWith('/')) return '/';

      const url = new URL(route, SITE_URL);
      return url.pathname === '' ? '/' : url.pathname;
    })
    .sort((a, b) => a.length - b.length);

  for (const route of routes) {
    const { appHtml, headTags } = await render(route);
    const outputPath = toOutputPath(route);

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, injectSeoAndHtml(template, appHtml, headTags), 'utf8');
  }

  console.log(`Prerendered ${routes.length} routes`);
}

main().catch((error) => {
  console.error('Prerender failed:', error);
  process.exit(1);
});
