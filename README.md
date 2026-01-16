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

### 인증

- 이메일 기반 로그인
- JWT 토큰 기반 인증
- 보호된 라우트 처리

### 환전

- 실시간 환율 정보 조회 (1분마다 자동 갱신)
- 환전 견적 조회 (매수/매도)
- USD, JPY 환전 지원
- 환전 실행 및 지갑 잔액 자동 업데이트

### 환전 내역

- 과거 환전 거래 내역 조회
- 거래 ID, 일시, 출금/입금 금액, 체결 환율 표시

## 5. 구현 특징

### 명확한 폴더 구조와 관심사 분리

- `api/`, `queries/`, `providers/` 등 각 폴더를 단일 책임 원칙에 따라 분리하여 코드 탐색 및 유지보수성을 향상시켰습니다

### 체계적인 에러 처리

- ErrorBoundary를 통해 예상치 못한 런타임 에러를 포착하고 사용자에게 적절한 피드백을 제공합니다

## 6. 개선 방향

### 공통 컴포넌트 부재

- Button, Input, Table 등 재사용 가능한 UI 컴포넌트가 구현되지 않아, 향후 확장성을 위해 공통 컴포넌트 시스템 구축이 필요합니다

### 테스트 코드 부재

- Vite 내장 테스트 도구인 Vitest 도입을 검토하였으나 현재 공통 로직 부족으로 보류하였습니다. 향후 프로젝트 확장 시 안정적인 배포를 위한 테스트 환경 구축이 필요합니다
