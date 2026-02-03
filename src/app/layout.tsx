import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lookingbusy.vercel.app';
const siteName = '월급 루팡';
const siteDescription = '회사에서 가장 효율적으로 시간을 훔치는 방법. 내기용 간단한 게임부터 시간 보내기 좋은 게임까지, 다양한 무료 온라인 게임을 제공합니다.';
const siteKeywords = [
  '월급 루팡',
  '회사 게임',
  '시간 킬러',
  '간단한 게임',
  '무료 게임',
  '온라인 게임',
  '사다리 타기',
  '룰렛',
  '빙고',
  '스도쿠',
  '지뢰찾기',
  '타자연습',
  'Monkeytype',
  'Skribbl',
  '지렁이 게임',
  '마피아 게임',
  '회사에서 할 게임',
  '업무 중 게임',
  '점심 메뉴 정하기',
  '커피 내기',
  '시간 보내기',
  '간단한 내기 게임',
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - 회사에서 가장 효율적으로 시간을 훔치는 방법`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteUrl,
    siteName: siteName,
    title: `${siteName} - 회사에서 가장 효율적으로 시간을 훔치는 방법`,
    description: siteDescription,
    images: [
      {
        url: '/looking-busy-og.png',
        width: 1200,
        height: 630,
        alt: `${siteName} - 직장인을 위한 킬링 타임 공간`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} - 회사에서 가장 효율적으로 시간을 훔치는 방법`,
    description: siteDescription,
    images: ['/looking-busy-og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console verification code를 여기에 추가하세요
    // google: 'your-google-verification-code',
  },
  category: '게임',
  classification: '엔터테인먼트',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href={siteUrl} />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="language" content="Korean" />
        <meta name="geo.region" content="KR" />
        <meta name="rating" content="general" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta name="naver-site-verification" content="fd65643dea872805e964254f6b839d01e1a19591" />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
