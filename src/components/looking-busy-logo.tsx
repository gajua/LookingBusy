import { Eye, Fingerprint } from "lucide-react";

export function LookingBusyLogo() {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="relative" aria-hidden="true">
        <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-30"></div>
        <div className="relative bg-gradient-to-br from-yellow-400 to-amber-500 p-3 rounded-lg shadow-lg">
          <Fingerprint className="w-8 h-8 text-black" aria-hidden="true" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl text-yellow-400 tracking-tight">월급 루팡</h1>
          <Eye className="w-5 h-5 text-yellow-400/60" aria-hidden="true" />
        </div>
        <div className="text-xs text-yellow-400/40 tracking-wider uppercase" aria-label="부제목">Looking busy</div>
      </div>
    </div>
  );
}
