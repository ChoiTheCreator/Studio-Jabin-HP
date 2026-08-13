# Jabin Taste Profile

이 문서는 범용 `design-taste-frontend` Skill을 Jabin 홈페이지에 적용하기 위한 프로젝트 전용 프로필이다. Skill 원문과 충돌하면 아래 우선순위를 따른다.

1. 사용자가 현재 작업에서 명시한 요구사항
2. `DESIGN.md`
3. `DESIGN_NAVY.md`
4. 이 문서
5. `SKILL.md`

## Design Read

Jabin은 기술 책임자와 발주 담당자를 위한 프리미엄 B2B 디지털 스튜디오다. 기존 브랜드를 보존하면서 큰 타이포그래피, 정밀한 선, 실제 프로젝트와 운영 근거, 절제된 모션으로 신뢰를 만든다.

- Mode: Redesign - Preserve
- `DESIGN_VARIANCE`: 6
- `MOTION_INTENSITY`: 4
- `VISUAL_DENSITY`: 4
- Stack: Next.js App Router, TypeScript, Tailwind CSS v4
- Type: Freesentation local WOFF2
- Icon family: 기존 `@heroicons/react`만 사용

프론트엔드 구현 전에는 위 Design Read와 세 다이얼 값을 한 줄로 선언한다. 작업 목적상 다른 값이 필요하면 이유와 변경값을 먼저 밝힌다.

## Preserve

- Navy, White, Soft Gray가 장면 단위로 전환되는 기존 색상 서사를 유지한다.
- 헤더, 내비게이션 라벨, 앵커 ID, 문의 경로, 법적 고지와 로고를 임의로 바꾸지 않는다.
- `Reveal`의 IntersectionObserver 패턴과 reduced-motion 대응을 유지한다.
- 각 섹션은 큰 메시지 하나와 실제 근거 하나를 중심으로 구성한다.
- 카드보다 여백과 얇은 선을 우선하되 사양, 인물, 프로젝트처럼 반복 비교가 필요한 항목에는 최대 8px 카드가 가능하다.

## Project Overrides

다음 항목은 Jabin의 확정된 브랜드 시스템이 범용 Skill보다 우선한다.

- 페이지 전체를 하나의 밝기 테마로 잠그지 않는다. White, Soft Gray, Navy 전환은 콘텐츠 장면을 구분하기 위한 의도된 패턴이다.
- 자동 다크 모드를 추가하지 않는다. 현재 브랜드 팔레트가 고정 테마다.
- 새 아이콘 라이브러리를 설치하지 않는다. 기존 Heroicons 한 종류로 통일한다.
- 모든 섹션에 이미지를 강제하지 않는다. 프로젝트와 팀에는 실제 이미지를 사용하고, 인프라처럼 구조가 핵심인 섹션은 의미 있는 다이어그램을 시각 자산으로 인정한다.
- 기존 헤더의 스크롤 반응은 유지한다. 이후 리팩터링 시 CSS scroll-driven animation 또는 Motion 기반 구현을 우선 검토한다.
- 현재의 섹션 라벨 체계는 한 번에 제거하지 않는다. 신규 섹션에서는 장식용 eyebrow를 줄이고 정보 구분에 필요한 라벨만 사용한다.

## Taste Rules

- 장식만을 위한 영문 단어 나열, 도시명 띠, 상태 점, 가짜 버전 번호를 추가하지 않는다.
- 같은 목적의 CTA는 같은 한국어 라벨을 사용한다. 문의 CTA는 `프로젝트 문의`로 통일한다.
- 5개가 넘는 항목을 단순 구분선 목록으로 만들지 않는다. 그리드, 그룹, 단계 또는 비교 구조를 선택한다.
- 한 섹션 안에서 동일한 카드 3개를 기본값처럼 반복하지 않는다.
- 실제 수치에는 범위와 의미를 정확히 적고 검증되지 않은 성능 우위를 주장하지 않는다.
- 지속 애니메이션은 서비스 범위 marquee 한 개와 인프라 흐름 pulse처럼 의미가 있는 경우에만 사용한다.
- 모든 모션은 `prefers-reduced-motion`에서 중지되거나 즉시 완료되어야 한다.
- 모바일 390px, 데스크톱 1440px에서 텍스트 겹침, 가로 overflow, CTA 줄바꿈을 확인한다.

## Preflight

- [ ] Design Read와 다이얼을 선언했다.
- [ ] 기존 정보 구조, 브랜드, CTA 의도를 보존했다.
- [ ] 섹션의 첫 메시지가 하나로 읽힌다.
- [ ] 장식용 라벨, 점, 긴 구분선 목록을 걷어냈다.
- [ ] 컴포넌트와 Tailwind 토큰을 기존 패턴으로 구현했다.
- [ ] 키보드, 대비, 스크린 리더, reduced-motion을 확인했다.
- [ ] 390px와 1440px에서 시각 검증했다.
- [ ] lint, typecheck, build, 관련 E2E를 통과했다.
