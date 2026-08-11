# Jabin 아키텍처

## 선택한 구조

초기 단계에서는 프론트엔드와 백엔드를 하나의 Next.js 저장소에 둔다. 홈페이지, SEO, 이후 추가될 API를 한 번에 배포할 수 있고 타입과 배포 설정을 공유할 수 있기 때문이다. 백엔드 규모가 커지기 전까지 별도 서버와 모노레포가 만드는 운영 비용을 피한다.

```text
Jabin-Studio-HP/
├── public/                    # 폰트, 이미지 등 변경 없는 정적 파일
├── src/
│   ├── app/                   # 라우트, 레이아웃, 메타데이터
│   │   ├── _components/       # 페이지 전용 컴포넌트
│   │   └── api/               # 서버액션
│   ├── components/            # 여러 기능에서 재사용하는 UI와 모션
│   │   └── ui/tailwind.ts     # 공통 Tailwind 클래스 상수
├── DESIGN.md                  # 디자인 단일 기준
├── ARCHITECTURE.md            # 코드 책임과 확장 규칙
└── COMMIT_CONVENTION.md       # 협업 이력 규칙
```

## 의존성 방향

`app/api → server/domain → 외부 저장소·웹훅` 방향으로만 의존한다. `server`는 React 컴포넌트를 가져오지 않는다. 화면 컴포넌트는 데이터 저장 방식을 알지 못하고 HTTP 계약만 사용한다. 현재 `src/server`에 해당하는 코드는 없으며, 서버 로직이 처음 생길 때 이 규칙에 따라 추가한다.

## 환경 변수

현재 필수 환경 변수도, 선택 환경 변수도 없다. 공개 도메인처럼 배포 환경과 무관하게 고정된 값은 환경 변수 대신 `src/config`의 상수로 관리한다. `NEXT_PUBLIC_` 값은 빌드 시점에 번들에 새겨지므로 런타임 주입으로는 바꿀 수 없다는 점을 전제로 판단한다.

새 환경 변수를 추가할 때는 `.env.example`을 다시 만들어 이름과 용도를 먼저 기록한다. 비밀값은 저장소에 커밋하지 않고 배포 플랫폼의 시크릿으로 주입한다. 브라우저에서 필요한 값만 `NEXT_PUBLIC_` 접두사를 사용한다.

## 스타일 규칙

- 화면과 컴포넌트 스타일은 Tailwind utility class를 기본으로 사용한다.
- 반복되는 레이아웃 utility는 `src/components/ui/tailwind.ts`의 정적 문자열로 관리한다.
- `src/app/globals.css`에는 폰트 선언, Tailwind `@theme` 토큰, 공통 keyframe, 전역 접근성 규칙만 둔다.
- 특정 페이지·섹션·컴포넌트 이름을 가진 CSS selector는 `globals.css`에 추가하지 않는다.
- 동적 상태는 조건부 Tailwind class로 표현하고, 런타임 계산이 필요한 CSS 변수만 inline style을 허용한다.
