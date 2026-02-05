import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://looking-busy.vercel.app';

/**
 * 사이트맵 생성 함수
 * Next.js App Router에서 자동으로 /sitemap.xml 경로로 생성됩니다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // trailing slash 제거 및 정규화
  const baseUrl = siteUrl.replace(/\/$/, '');
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];
}
