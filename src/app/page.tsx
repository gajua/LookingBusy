'use client';

import { useMemo } from 'react';
import { GameCard } from "@/components/game-card";
import { LookingBusyLogo } from "@/components/looking-busy-logo";
import { AlertCircle, Lock, Sparkles, Target, Timer } from "lucide-react";
import gamesData from '@/../data/games.json';

interface Game {
  id: string;
  name: string;
  description: string;
  tags?: string[];
  category: 'quick' | 'timeKiller';
  url?: string;
}

const games: Game[] = gamesData.games as Game[];

export default function Home() {
  const todaysPick = useMemo(() => {
    // Date-based pick for consistent server/client rendering
    // Uses today's date as seed to ensure same game is selected throughout the day
    const timeKillerGames = games.filter(g => g.category === 'timeKiller');
    if (timeKillerGames.length === 0) return null;
    
    // Get today's date string (YYYY-MM-DD) and use it as seed
    const today = new Date().toISOString().split('T')[0];
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const index = seed % timeKillerGames.length;
    
    return timeKillerGames[index];
  }, []);

  const quickGames = games.filter(g => g.category === 'quick');
  const timeKillerGames = games.filter(g => g.category === 'timeKiller');

  const handleGameClick = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    if (game?.url) {
      window.open(game.url, '_blank', 'noopener,noreferrer');
    } else {
      console.warn(`Game ${gameId} has no URL`);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-radial from-yellow-400/10 via-transparent to-transparent blur-3xl pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <LookingBusyLogo />
          <p className="text-lg text-gray-400 mb-2">
            회사에서 가장 효율적으로 시간을 <span className="text-yellow-400">훔치는</span> 방법
          </p>
          <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            전체화면 비추천 · 소리 끄기 필수
          </p>
        </header>

        {/* Today's Pick */}
        {todaysPick && (
          <section className="mb-12" aria-label="오늘의 추천 게임">
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-lg border border-yellow-400/30 p-6 shadow-2xl shadow-yellow-400/10 relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-transparent blur-2xl"></div>
              
              <div className="relative mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 tracking-wide">오늘의 추천</span>
                </div>
                <h2 className="text-white mb-1" lang="en">Today's Pick</h2>
                <p className="text-sm text-gray-400">
                  오늘 하루 딱 이거 하나면 충분합니다
                </p>
              </div>
              <GameCard
                name={todaysPick.name}
                description={todaysPick.description}
                tags={todaysPick.tags}
                isPick={true}
                onClick={() => handleGameClick(todaysPick.id)}
              />
            </div>
          </section>
        )}

        {/* Section: 내기용으로 좋은 간단한 게임 */}
        <section className="mb-12" aria-label="내기용 간단한 게임">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-yellow-400" />
              <h2 className="text-white">내기용으로 좋은 간단한 게임</h2>
            </div>
            <p className="text-sm text-gray-400">
              빠르게 승부를 내고 싶을 때. 점심 메뉴, 커피 내기 등에 활용하세요.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickGames.map((game) => (
              <GameCard
                key={game.id}
                name={game.name}
                description={game.description}
                tags={game.tags}
                onClick={() => handleGameClick(game.id)}
              />
            ))}
          </div>
        </section>

        {/* Section: 시간 보내기 좋은 게임 */}
        <section className="mb-12" aria-label="시간 보내기 좋은 게임">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Timer className="w-5 h-5 text-yellow-400" />
              <h2 className="text-white">시간 보내기 좋은 게임</h2>
            </div>
            <p className="text-sm text-gray-400">
              조용히 몰입해서 시간을 보낼 수 있는 게임들. 표정 관리 필수.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timeKillerGames.map((game) => (
              <GameCard
                key={game.id}
                name={game.name}
                description={game.description}
                tags={game.tags}
                onClick={() => handleGameClick(game.id)}
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-yellow-400/20 pt-8 pb-6">
          <div className="text-center mb-4">
            <p className="text-xs text-gray-500 mb-3 flex items-center justify-center gap-2">
              <AlertCircle className="w-3 h-3" />
              본 사이트 사용으로 인한 업무 효율 저하에 대해 책임지지 않습니다.
            </p>
            <button 
              className="text-sm text-yellow-400/60 hover:text-yellow-400 underline underline-offset-2 transition-colors"
              onClick={() => alert('제보 기능은 준비 중입니다 😊')}
            >
              익명으로 게임 제보하기
            </button>
          </div>
          <div className="text-center text-xs text-gray-600">
            © 2026 LookingBusy. 이 사이트는 엔터테인먼트 목적입니다.
          </div>
        </footer>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: '월급 루팡',
            alternateName: 'LookingBusy',
            description: '회사에서 가장 효율적으로 시간을 훔치는 방법. 내기용 간단한 게임부터 시간 보내기 좋은 게임까지, 다양한 무료 온라인 게임을 제공합니다.',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://lookingbusy.vercel.app',
            inLanguage: 'ko-KR',
            isAccessibleForFree: true,
            genre: '게임',
            keywords: '회사 게임, 시간 킬러, 간단한 게임, 무료 게임, 온라인 게임',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://lookingbusy.vercel.app'}/search?q={search_term_string}`,
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: '게임 목록',
            description: '회사에서 즐길 수 있는 다양한 무료 온라인 게임들',
            numberOfItems: games.length,
            itemListElement: games.map((game, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Game',
                name: game.name,
                description: game.description,
                gameLocation: {
                  '@type': 'Place',
                  name: '온라인',
                },
                gamePlatform: '웹 브라우저',
                applicationCategory: '게임',
                operatingSystem: '웹 브라우저',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'KRW',
                },
                ...(game.url && {
                  url: game.url,
                }),
              },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: '월급 루팡',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://lookingbusy.vercel.app',
            logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://lookingbusy.vercel.app'}/og-image.png`,
            description: '회사에서 가장 효율적으로 시간을 훔치는 방법을 제공하는 게임 플랫폼',
            sameAs: [],
          }),
        }}
      />
    </main>
  );
}
