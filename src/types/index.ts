export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
  readingTime: number;
  featured?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  image?: string;
  thumbnail?: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  spotlight?: boolean;
  content?: string;
}

export type Theme = 'dark' | 'light';
