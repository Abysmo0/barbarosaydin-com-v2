import { getAllPosts, getPostBySlug } from '../../../lib/blog-data';
import { listMarkdownPosts, getMarkdownPost } from '../../../lib/markdown';
import { getArticleSchema, getBreadcrumbSchema } from '../../../lib/schema-helpers';

export async function generateStaticParams() {
  const legacy = getAllPosts().map(p => ({ slug: p.slug }));
  const md = listMarkdownPosts().map(p => ({ slug: p.slug }));
  const map = new Map();
  [...legacy, ...md].forEach(p => map.set(p.slug, p));
  return [...map.values()];
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug) || getMarkdownPost(params.slug);
  if (!post) return { title: 'Yazı bulunamadı' };
  return {
    title: `${post.title} | Barbaros Aydın`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` }
  };
}

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug) || getMarkdownPost(params.slug);
  if (!post) return <div>Bulunamadı</div>;
  const articleSchema = getArticleSchema(post);
  const breadcrumb = getBreadcrumbSchema([
    { name: 'Ana Sayfa', url: 'https://www.barbarosaydin.com/' },
    { name: 'Blog', url: 'https://www.barbarosaydin.com/blog' },
    { name: post.title, url: `https://www.barbarosaydin.com/blog/${post.slug}` }
  ]);
  return (
    <main className="prose mx-auto px-4 py-8">
      <h1>{post.title}</h1>
      {/* Bu satır düzeltildi. `Date` nesnesi, bir string'e çevrildi. */}
      <p><em>Güncelleme: {new Date(post.updatedAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>
      {post.html ? <div dangerouslySetInnerHTML={{ __html: post.html }} /> : <p>{post.excerpt}</p>}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </main>
  );
}