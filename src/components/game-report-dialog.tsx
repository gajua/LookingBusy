'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface GameReportDialogProps {
  trigger: React.ReactNode;
}

export function GameReportDialog({ trigger }: GameReportDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    gameName: '',
    gameUrl: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/report-game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        alert('게임 제보가 완료되었습니다! 감사합니다 😊');
        setFormData({ gameName: '', gameUrl: '', description: '' });
        setOpen(false);
      } else {
        const errorMessage =
          typeof data?.error === 'string' ? data.error : '제보 전송에 실패했습니다. 다시 시도해주세요.';
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('네트워크 오류가 발생했습니다. 연결을 확인한 뒤 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 border-yellow-400/20">
        <DialogHeader>
          <DialogTitle className="text-yellow-400">게임 제보하기</DialogTitle>
          <DialogDescription className="text-gray-400">
            새로운 게임을 제보해주시면 검토 후 추가하겠습니다.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gameName" className="text-gray-300">
              게임 이름 <span className="text-yellow-400">*</span>
            </Label>
            <Input
              id="gameName"
              placeholder="예: 테트리스"
              value={formData.gameName}
              onChange={(e) => setFormData({ ...formData, gameName: e.target.value })}
              required
              className="bg-black border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gameUrl" className="text-gray-300">
              게임 URL <span className="text-yellow-400">*</span>
            </Label>
            <Input
              id="gameUrl"
              type="url"
              placeholder="https://example.com/game"
              value={formData.gameUrl}
              onChange={(e) => setFormData({ ...formData, gameUrl: e.target.value })}
              required
              className="bg-black border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">
              설명 (선택사항)
            </Label>
            <Textarea
              id="description"
              placeholder="게임에 대한 간단한 설명을 입력해주세요..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="bg-black border-gray-700 text-white"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  전송 중...
                </>
              ) : (
                '제보하기'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
