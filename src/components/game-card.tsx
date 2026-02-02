import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface GameCardProps {
  name: string;
  description: string;
  tags?: string[];
  isPick?: boolean;
  onClick?: () => void;
}

export function GameCard({ name, description, tags, isPick = false, onClick }: GameCardProps) {
  return (
    <article className={`
      bg-gradient-to-br from-gray-900 to-black border border-yellow-400/20 rounded-lg p-5 
      transition-all duration-200
      hover:border-yellow-400/40 hover:shadow-lg hover:shadow-yellow-400/10
      ${isPick ? 'border-yellow-400/50 shadow-lg shadow-yellow-400/20' : ''}
    `} itemScope itemType="https://schema.org/Game">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-yellow-400 mb-1" itemProp="name">{name}</h3>
            <p className="text-sm text-gray-400 leading-relaxed" itemProp="description">{description}</p>
          </div>
          {isPick && (
            <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-300 border-yellow-400/30 shrink-0" aria-label="오늘의 추천 게임">
              Today&apos;s Pick
            </Badge>
          )}
        </div>
        
        {tags && tags.length > 0 && (
          <div className="flex gap-2 flex-wrap" role="list">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 rounded bg-yellow-400/10 text-yellow-300/80 border border-yellow-400/20"
                role="listitem"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Button 
          onClick={onClick}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium transition-all hover:shadow-lg hover:shadow-yellow-400/20"
          aria-label={`${name} 게임 시작하기`}
        >
          바로 시작
        </Button>
      </div>
    </article>
  );
}
