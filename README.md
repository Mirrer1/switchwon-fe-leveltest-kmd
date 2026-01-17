# Leveltest

**Frontend Developer Kimmindeok**

<br />

## 배포 URL

- [**https://switchwon-fe-leveltest-kmd.vercel.app/**](https://switchwon-fe-leveltest-kmd.vercel.app/)

<br />

## 1. 기술 스택

- **React 19** + **TypeScript**
- **Vite** - 빌드 도구
- **pnpm** - 패키지 매니저
- **React Query** - 서버 상태 관리
- **Axios** - HTTP 클라이언트
- **tailwindCSS** - 스타일링

## 2. 세팅 방법

### 설치

```bash
# pnpm 미설치 시
npm install -g pnpm
```

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

## 3. 프로젝트 구조

```
src/
├── api/                          # API 클라이언트 및 엔드포인트 정의
│   ├── index.ts                  # Axios 인스턴스 및 인터셉터 설정
│   ├── auth.ts                   # 인증 관련 API
│   ├── exchangeRate.ts           # 환율 조회 API
│   ├── order.ts                  # 환전 주문/내역 API
│   └── wallet.ts                 # 지갑 조회 API
│
├── components/                   # 전역 레벨 공용 컴포넌트
│   └── Layout/                   # 레이아웃 컴포넌트
│
├── pages/                        # 페이지 컴포넌트
│   ├── Login/                    # 로그인 페이지
│   ├── Exchange/                 # 환전 페이지
│   └── History/                  # 환전 내역 페이지
│
├── providers/                    # Context Providers
│   ├── index.tsx                 # 전체 Provider 통합
│   ├── AuthProvider.tsx          # 인증 라우트 보호
│   └── ErrorBoundaryProvider.tsx # 시스템 에러 핸들링
│
├── queries/                      # React Query 훅
│   ├── auth/                     # 인증 관련 쿼리
│   ├── exchangeRate/             # 환율 관련 쿼리
│   ├── order/                    # 주문 관련 쿼리
│   └── wallet/                   # 지갑 관련 쿼리
│
├── styles/                       # 전역 스타일
├── App.tsx                       # App 컴포넌트
├── main.tsx                      # 진입점
└── routes.tsx                    # 라우트 설정
```

## 4. 주요 기능

### 사용자 인증
- ✅ 이메일 기반 로그인
- ✅ JWT 토큰 관리
- ✅ Authorization 헤더에 Bearer 토큰 자동 포함
- ✅ 로그아웃 및 로그인 페이지 리다이렉트
- ✅ 보호된 라우트

### 환전
- ✅ 지갑 잔액 조회 및 총 자산 표시
- ✅ 실시간 환율 정보 조회 - 1분마다 자동 갱신
- ✅ 환전 견적 조회
- ✅ 환전 실행 및 지갑 잔액 자동 갱신
- ✅ API 에러 메시지 표시

### 환전 내역
- ✅ 환전 내역 목록 조회
- ✅ 거래 상세 정보 표시


## 5. 트러블슈팅

### CORS 이슈 - 로컬 개발 환경

API 서버가 CORS를 허용하지 않아 브라우저에서 직접 요청 시 차단되었습니다.

그래서 이 부분을 해결하기 위해 Vite의 프록시 기능을 사용하여 `/api` 경로로 들어오는 요청을 실제 API 서버로 전달하도록 설정했습니다.

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'https://exchange-example.switchflow.biz',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, ''),
      secure: false,
    },
  },
}
```

### CORS 이슈 - 배포 환경(Vercel)

로컬 개발 환경의 CORS 이슈를 해결하기 위해 추가된 Vite 프록시 설정은 로컬 개발 서버에서만 동작하고 배포 환경에서는 적용되지 않았습니다.

그래서 배포 환경에서도 동일하게 프록시 기능을 추가하기 위해 `vercel.json`에 해당 규칙을 추가했습니다.

```json
// vercel.json
{
  "source": "/api/:path*",
  "destination": "https://exchange-example.switchflow.biz/:path*"
}
```

### SPA 라우팅 404 에러


배포 후 환전 내역(`/history`) 경로에서 새로고침 시 404 에러가 발생했습니다.

이는 Vercel 서버가 실제 파일을 찾으려 하기 때문에 모든 경로를 `index.html`로 리다이렉트하여 React Router가 처리하도록 수정했습니다.


```json
// vercel.json
{
  "source": "/(.*)",
  "destination": "/index.html"
}
```

