import { useState } from 'react';
import { GameCard } from "@/components/game-card";
import { LookingBusyLogo } from "@/components/looking-busy-logo";
import { AlertCircle, Lock, Sparkles, Target, Timer } from "lucide-react";

interface Game {
  id: string;
  name: string;
  description: string;
  tags?: string[];
  category: 'quick' | 'timeKiller';
}

const games: Game[] = [
  // 내기용으로 좋은 간단한 게임
  {
    id: 'rps',
    name: '가위바위보',
    description: '동료와 점심 메뉴 정할 때 최고. 3판 2선승제 추천.',
    category: 'quick'
  },
  {
    id: 'coin',
    name: '동전 던지기',
    description: '커피 내기의 정석. 50:50의 공정함.',
    tags: ['공정', '빠름'],
    category: 'quick'
  },
  {
    id: 'dice',
    name: '주사위 굴리기',
    description: '회의 참석 순서 정하기용. 큰 수가 이긴다.',
    tags: ['랜덤'],
    category: 'quick'
  },
  {
    id: 'ladder',
    name: '사다리 타기',
    description: '3명 이상일 때 유용. 공평하게 당첨자 선정.',
    tags: ['다인원'],
    category: 'quick'
  },

  // 시간 보내기 좋은 게임
  {
    id: 'sudoku',
    name: '스도쿠',
    description: '집중하는 척 하기 좋음. 난이도 조절 가능.',
    tags: ['시간 순삭', '위장용', '표정 관리 가능'],
    category: 'timeKiller'
  },
  {
    id: 'minesweeper',
    name: '지뢰찾기',
    description: '클래식의 정석. Excel 열어놓으면 완벽한 위장.',
    tags: ['집중력', '위장용'],
    category: 'timeKiller'
  },
  {
    id: '2048',
    name: '2048',
    description: '중독성 주의. 한 판만 하려다 퇴근 시간.',
    tags: ['시간 순삭', '중독성'],
    category: 'timeKiller'
  },
  {
    id: 'solitaire',
    name: '솔리테어',
    description: '진짜 일하는 것처럼 보이는 마법의 게임.',
    tags: ['표정 관리 가능', '위장용', '클래식'],
    category: 'timeKiller'
  },
  {
    id: 'wordle',
    name: '워들',
    description: '영어 공부하는 척. 하루 1회 제한으로 적당히 끝.',
    tags: ['일일 퀘스트', '표정 관리 가능'],
    category: 'timeKiller'
  },
  {
    id: 'tetris',
    name: '테트리스',
    description: '손가락 운동과 두뇌 회전. 소리는 꼭 끄세요.',
    tags: ['집중력', '시간 순삭'],
    category: 'timeKiller'
  }
];

export default function App() {
  const [todaysPick] = useState(() => {
    // Random pick from timeKiller games
    const timeKillerGames = games.filter(g => g.category === 'timeKiller');
    return timeKillerGames[Math.floor(Math.random() * timeKillerGames.length)];
  });

  const quickGames = games.filter(g => g.category === 'quick');
  const timeKillerGames = games.filter(g => g.category === 'timeKiller');

  const handleGameClick = (gameId: string) => {
    // Mock function - in real app would navigate to game
    console.log(`Starting game: ${gameId}`);
    alert('실제 게임은 아직 개발 중입니다 🎮');
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
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
        <div className="text-center mb-12">
          <LookingBusyLogo />
          <p className="text-lg text-gray-400 mb-2">
            회사에서 가장 효율적으로 시간을 <span className="text-yellow-400">훔치는</span> 방법
          </p>
          <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            전체화면 비추천 · 소리 끄기 필수
          </p>
        </div>

        {/* Today's Pick */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-lg border border-yellow-400/30 p-6 shadow-2xl shadow-yellow-400/10 relative overflow-hidden">
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-transparent blur-2xl"></div>
            
            <div className="relative mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 tracking-wide">오늘의 추천</span>
              </div>
              <h2 className="text-white mb-1">Today&apos;s Pick</h2>
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
        </div>

        {/* Section: 내기용으로 좋은 간단한 게임 */}
        <div className="mb-12">
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
        </div>

        {/* Section: 시간 보내기 좋은 게임 */}
        <div className="mb-12">
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
        </div>

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
            © 2026 월급 루팡. 이 사이트는 엔터테인먼트 목적입니다.
          </div>
        </footer>
      </div>
    </div>
  );
}