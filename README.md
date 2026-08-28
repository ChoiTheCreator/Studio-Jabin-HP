# Jabin

Jabin의 공식 홈페이지와 문의 API를 함께 운영하는 Next.js 풀스택 프로젝트입니다.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 문의 이메일 설정

```bash
cp .env.example .env.local
```

`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`을 운영 환경에 맞게 설정한다. 발신 주소는 Resend에서 인증한 도메인을 사용해야 하며, 수신 주소는 실제 문의 담당자 메일함으로 지정한다.

API 키가 없는 로컬·테스트 환경에서는 이메일을 보내지 않고 개인정보를 제외한 접수 요약만 로그에 남긴다. 유효한 문의는 IP 기준으로 10분에 5회까지 접수한다.

## 문서

- [COLLABORATION_HARNESS.md](./COLLABORATION_HARNESS.md): 공동 작업 브랜치, PR, 인수인계 운영 기준
- [DESIGN.md](./DESIGN.md): 색상, 타이포그래피, 레이아웃, 반응형, 모션의 단일 기준
- [DESIGN_NAVY.md](./DESIGN_NAVY.md): 네이비 레퍼런스를 역추적한 별도 디자인 사양과 적용 기준
- [HOMEPAGE_PLAN.md](./HOMEPAGE_PLAN.md): SI 홈페이지의 정보 구조, 콘텐츠 규격, 구현 우선순위
- [ARCHITECTURE.md](./ARCHITECTURE.md): 프론트엔드와 백엔드 폴더의 책임 경계
- [ANALYTICS.md](./ANALYTICS.md): GTM·GA4 설정, 이벤트 규격과 검증 방법
- [COMMIT_CONVENTION.md](./COMMIT_CONVENTION.md): `<Type> 한국어 설명` 커밋 규칙
- [.agents/skills](./.agents/skills): 공동 작업용 프로젝트 로컬 Skill과 Jabin 적용 프로필

## 주요 명령어

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```
