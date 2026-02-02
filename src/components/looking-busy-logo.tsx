import Image from 'next/image';

export function LookingBusyLogo() {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="relative">
        <Image
          src="/looking-busy-logo.png"
          alt="월급 루팡 로고"
          width={64}
          height={64}
          priority
          className="object-contain"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl text-yellow-400 tracking-tight">월급 루팡</h1>
        </div>
        <div className="text-xs text-yellow-400/40 tracking-wider uppercase" aria-label="부제목">Looking busy</div>
      </div>
    </div>
  );
}
