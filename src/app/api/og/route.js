import { ImageResponse } from 'next/og';
import { getPostBySlug } from '../../../lib/blog-data';
import { getMarkdownPost } from '../../../lib/markdown';

export const runtime = 'edge';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const title = searchParams.get('title');
  let heading = 'Barbaros Aydın';
  if (slug) {
    const post = getPostBySlug(slug) || getMarkdownPost(slug);
    if (post) heading = post.title;
  } else if (title) heading = title;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px',
          background: 'linear-gradient(135deg,#0f172a,#1e293b)',
          color: '#f1f5f9',
          fontSize: 64,
          fontFamily: 'Arial, sans-serif'
        }}>
        <div style={{ fontSize: 42, opacity: 0.85 }}>barbarosaydin.com</div>
        <div style={{ fontWeight: '700', lineHeight: 1.1 }}>{heading}</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}