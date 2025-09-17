import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const blogDir = path.join(process.cwd(), 'content', 'blog');

export function listMarkdownPosts() {
  if (!fs.existsSync(blogDir)) return [];
  return fs.readdirSync(blogDir)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace(/\.md$/, '');
      const full = fs.readFileSync(path.join(blogDir, filename), 'utf8');
      const { data } = matter(full);
      return {
        slug,
        title: data.title || slug,
        excerpt: data.excerpt || '',
        updatedAt: data.updatedAt || data.date || new Date().toISOString().slice(0,10),
        tags: data.tags || []
      };
    });
}

export function getMarkdownPost(slug) {
  const file = path.join(blogDir, slug + '.md');
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  const html = marked.parse(content);
  return {
    slug,
    title: data.title || slug,
    excerpt: data.excerpt || content.slice(0,160),
    updatedAt: data.updatedAt || data.date || new Date().toISOString().slice(0,10),
    tags: data.tags || [],
    html
  };
}
