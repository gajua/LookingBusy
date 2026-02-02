# LookingBusy

회사에서 가장 효율적으로 시간을 훔치는 방법을 제공하는 웹 애플리케이션입니다.

## 기술 스택

- **Next.js 15** - React 프레임워크 (App Router)
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 스타일링
- **Radix UI** - 접근성 우수한 UI 컴포넌트

## 주요 기능

- 🎮 다양한 게임 제공 (내기용 간단한 게임, 시간 보내기 좋은 게임)
- 📱 반응형 디자인
- 🔍 SEO 최적화 (메타데이터, Open Graph, 구조화된 데이터)
- 🎨 모던한 UI/UX

## 시작하기

### 설치

```bash
npm install
# 또는
yarn install
# 또는
pnpm install
```

### 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
# 또는
yarn build
# 또는
pnpm build
```

### 프로덕션 실행

```bash
npm start
# 또는
yarn start
# 또는
pnpm start
```

## 프로젝트 구조

```
LookingBusy/
├── data/
│   └── games.json          # 게임 목록 데이터
├── public/                 # 정적 파일
├── src/
│   ├── app/
│   │   ├── layout.tsx      # 루트 레이아웃 (SEO 메타데이터 포함)
│   │   ├── page.tsx        # 메인 페이지
│   │   └── globals.css     # 전역 스타일
│   └── components/
│       ├── game-card.tsx   # 게임 카드 컴포넌트
│       ├── lupin-logo.tsx  # 로고 컴포넌트
│       └── ui/             # UI 컴포넌트들
├── next.config.ts          # Next.js 설정
├── tailwind.config.ts      # Tailwind CSS 설정
└── tsconfig.json           # TypeScript 설정
```

## 게임 목록 관리

게임 목록은 `data/games.json` 파일에서 관리됩니다. 새로운 게임을 추가하거나 기존 게임을 수정하려면 이 파일을 편집하세요.

### 게임 데이터 구조

```json
{
  "games": [
    {
      "id": "게임ID",
      "name": "게임 이름",
      "description": "게임 설명",
      "tags": ["태그1", "태그2"],
      "category": "quick" | "timeKiller"
    }
  ]
}
```

## SEO 최적화

이 프로젝트는 다음과 같은 SEO 최적화가 적용되어 있습니다:

- ✅ 메타데이터 (title, description, keywords)
- ✅ Open Graph 태그 (소셜 미디어 공유 최적화)
- ✅ Twitter Card 태그
- ✅ 구조화된 데이터 (JSON-LD)
- ✅ 시맨틱 HTML (header, section, footer 등)
- ✅ 접근성 개선 (aria-label 등)

## 환경 변수

`.env` 또는 `.env.local` 파일을 생성하여 다음 변수를 설정할 수 있습니다:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
RESEND_API_KEY=re_xxxx   # 게임 제보 이메일 전송 (Resend 발급)
```

### Vercel 배포 시 (프로덕션에서 메일이 안 올 때)

**로컬에서는 메일이 오는데, 배포 후 프로덕션에서는 안 오는 경우** → Vercel에 환경 변수가 없을 가능성이 큽니다.

1. [Vercel 대시보드](https://vercel.com) → 해당 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 아래 변수 추가 후 **Production**(필수), **Preview**(선택) 체크
   - **Name**: `RESEND_API_KEY`
   - **Value**: Resend에서 발급한 API 키 (`re_` 로 시작)
4. 저장 후 **Redeploy** (Deployments → 최신 배포 → ⋮ → Redeploy)

배포 후에도 메일이 안 오면 Vercel **Logs** (프로젝트 → Logs)에서 `[report-game]` 로 검색해 Resend API 실패 사유를 확인하세요.

## 라이선스

이 프로젝트는 엔터테인먼트 목적으로 제작되었습니다.
# LookingBusy
