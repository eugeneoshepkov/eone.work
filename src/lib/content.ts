import type { BlogPost, Project } from '@/types';

// Import all markdown files from content/blog
const blogModules = import.meta.glob('/src/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// Import all project markdown files
const projectModules = import.meta.glob('/src/content/projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function parseMarkdown(content: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { metadata: {}, content };
  }

  const [, frontmatter, body] = match;
  const metadata: Record<string, unknown> = {};

  frontmatter.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.slice(0, colonIndex).trim();
    let value: string | string[] | boolean = line.slice(colonIndex + 1).trim();

    // Handle arrays (tags: [tag1, tag2])
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((v: string) => v.trim().replace(/['"]/g, ''));
    }
    // Handle booleans
    else if (value === 'true') value = true;
    else if (value === 'false') value = false;
    // Handle quoted strings
    else if (
      typeof value === 'string' &&
      ((value.startsWith('"') && value.endsWith('"')) ||
       (value.startsWith("'") && value.endsWith("'")))
    ) {
      value = value.slice(1, -1);
    }

    metadata[key] = value;
  });

  return { metadata, content: body.trim() };
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function getBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [path, content] of Object.entries(blogModules)) {
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const { metadata, content: body } = parseMarkdown(content as string);

    posts.push({
      slug,
      title: (metadata.title as string) || slug,
      description: (metadata.description as string) || '',
      date: (metadata.date as string) || '',
      tags: (metadata.tags as string[]) || [],
      content: body,
      readingTime: calculateReadingTime(body),
      featured: (metadata.featured as boolean) || false,
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((post) => post.slug === slug);
}

export function getFeaturedPosts(limit = 3): BlogPost[] {
  const posts = getBlogPosts();
  const featured = posts.filter((p) => p.featured);
  return featured.length > 0 ? featured.slice(0, limit) : posts.slice(0, limit);
}

export function getProjects(): Project[] {
  const projects: Project[] = [];

  for (const [path, content] of Object.entries(projectModules)) {
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const { metadata, content: body } = parseMarkdown(content as string);

    projects.push({
      slug,
      title: (metadata.title as string) || slug,
      description: (metadata.description as string) || '',
      image: (metadata.image as string) || undefined,
      tags: (metadata.tags as string[]) || [],
      liveUrl: (metadata.liveUrl as string) || undefined,
      repoUrl: (metadata.repoUrl as string) || undefined,
      featured: (metadata.featured as boolean) || false,
      content: body,
    });
  }

  return projects;
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function getFeaturedProjects(limit = 3): Project[] {
  const projects = getProjects();
  const featured = projects.filter((p) => p.featured);
  return featured.length > 0 ? featured.slice(0, limit) : projects.slice(0, limit);
}
