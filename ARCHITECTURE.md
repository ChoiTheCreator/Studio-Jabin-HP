# Jabin 아키텍처

## 선택한 구조

초기 단계에서는 프론트엔드와 백엔드를 하나의 Next.js 저장소에 둔다. 홈페이지, SEO, 문의 API를 한 번에 배포할 수 있고 타입과 배포 설정을 공유할 수 있기 때문이다. 백엔드 규모가 커지기 전까지 별도 서버와 모노레포가 만드는 운영 비용을 피한다.

```text
Jabin-Studio-HP/
├── public/                    # 폰트, 이미지 등 변경 없는 정적 파일
├── src/
│   ├── app/                   # 라우트, 레이아웃, 메타데이터, API 어댑터
│   │   └── api/               # HTTP 요청/응답만 책임지는 얇은 계층
│   ├── components/            # 여러 기능에서 재사용하는 UI와 모션
│   │   └── ui/tailwind.ts     # 공통 Tailwind 클래스 상수
│   ├── features/              # 페이지 또는 비즈니스 기능 단위 UI
│   │   ├── home/              # 홈페이지 콘텐츠와 섹션 컴포넌트
│   │   └── projects/          # 프로젝트 공개 상태와 콘텐츠 타입
│   ├── config/                # 브랜드와 공유 가능한 문의 옵션
│   └── server/                # 서버 전용 검증, 서비스, 외부 연동
│       ├── inquiries/         # 문의 도메인
│       └── shared/            # 서버 공통 응답과 오류
├── DESIGN.md                  # 디자인 단일 기준
├── ARCHITECTURE.md            # 코드 책임과 확장 규칙
└── COMMIT_CONVENTION.md       # 협업 이력 규칙
```

## 의존성 방향

`app/api → server/domain → 외부 저장소·웹훅` 방향으로만 의존한다. `server`는 React 컴포넌트를 가져오지 않는다. 화면 컴포넌트는 데이터 저장 방식을 알지 못하고 HTTP 계약만 사용한다.

## 백엔드 확장 기준

현재 문의 API는 허용된 프로젝트 유형과 선택 옵션, 문자열 길이, 개인정보 동의를 검증한다. `INQUIRY_WEBHOOK_URL`이 있으면 검증된 데이터를 웹훅으로 전달하고, 값이 없으면 개발 중에도 폼 전체 흐름을 확인할 수 있도록 민감 정보를 가리고 길이와 선택 개수만 서버 로그에 남긴다.

honeypot 필드에 값이 있으면 외부 전송과 로그 없이 접수 응답만 반환한다. IP 기반 요청 제한은 단일 프로세스 메모리에서 10분당 5회로 동작한다. 다중 인스턴스 배포 전에는 동일 인터페이스를 Redis 또는 배포 플랫폼의 분산 rate limit 저장소로 교체한다.

외부 웹훅을 실제 운영에 연결하기 전에는 수탁 업체, 처리 목적과 보유 기준을 확정하고 `/privacy` 문서를 먼저 갱신한다.

아래 중 하나가 생기면 `src/server`의 서비스 인터페이스는 유지하고 저장소 구현만 PostgreSQL로 교체한다.

- 문의 상태, 담당자, 메모를 관리하는 어드민이 필요할 때
- 프로젝트 CMS 또는 로그인 기능이 추가될 때
- 트랜잭션이 필요한 둘 이상의 데이터 모델이 생길 때

독립 백엔드로 분리하는 기준은 배포 주기가 달라지거나, 장시간 작업·WebSocket·다수의 외부 클라이언트가 필요해질 때다. 그 전에는 동일 저장소가 더 단순하다.

## 라우트 규칙

- 페이지: `src/app/**/page.tsx`
- API: `src/app/api/**/route.ts`
- 페이지 전용 UI: `src/features/<feature>/components`
- 공용 UI: 두 개 이상의 feature에서 사용될 때만 `src/components`
- 서버 로직: 반드시 `src/server` 아래에 두고 `server-only`로 브라우저 번들 유입을 방지

## 환경 변수

환경 변수 이름과 용도는 `.env.example`에 먼저 추가한다. 비밀값은 저장소에 커밋하지 않는다. 브라우저에서 필요한 값만 `NEXT_PUBLIC_` 접두사를 사용한다.

## 스타일 규칙

- 화면과 컴포넌트 스타일은 Tailwind utility class를 기본으로 사용한다.
- 반복되는 레이아웃 utility는 `src/components/ui/tailwind.ts`의 정적 문자열로 관리한다.
- `src/app/globals.css`에는 폰트 선언, Tailwind `@theme` 토큰, 공통 keyframe, 전역 접근성 규칙만 둔다.
- 특정 페이지·섹션·컴포넌트 이름을 가진 CSS selector는 `globals.css`에 추가하지 않는다.
- 동적 상태는 조건부 Tailwind class로 표현하고, 런타임 계산이 필요한 CSS 변수만 inline style을 허용한다.
