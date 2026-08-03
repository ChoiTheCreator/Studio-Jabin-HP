# DESIGN NAVY

이 문서는 로컬 레퍼런스 프로젝트의 마케팅 화면을 코드와 실제 렌더링 결과에서 역추적한 디자인 사양서다. 특정 브랜드의 문구나 자산을 복제하기 위한 문서가 아니라, 네이비 기반 B2B 홈페이지가 어떤 시각 규칙과 움직임으로 구성되어 있는지 재현 가능한 수준으로 기록한다.

현재 상태는 Draft다. Jabin의 운영 디자인 기준은 DESIGN.md이며, 이 문서는 네이비 디자인 방향을 검토하고 선택적으로 이식하기 위한 별도 원본이다. 승인 없이 DESIGN.md의 토큰을 대체하지 않는다.

## 1. 역추적 범위

### 조사한 화면

| 화면 유형 | Desktop 높이 | Mobile 높이 | 핵심 역할 |
| --- | ---: | ---: | --- |
| Home | 7,764px | 6,542px | 브랜드 서사, 신뢰, 프로세스, 전환 |
| Service | 6,825px | 7,843px | 서비스 분류, 성과, 원칙, 사례 |
| About | 5,235px | 5,623px | 회사 관점, 방법론, 조직 |
| Column | 1,359px | 1,563px | 콘텐츠 탐색, 탭, 빈 상태 |
| Diagnosis | 2,030px | 1,784px | 실제 입력과 제출을 위한 업무형 폼 |

Desktop은 1440×900, Mobile은 390×844 뷰포트에서 확인했다. 모든 화면은 문서 전체 너비가 뷰포트 너비와 같았으며 문서 단위의 가로 스크롤은 발생하지 않았다.

### 조사한 구현

- 마케팅 라우트 5개와 공통 Header, Footer, Floating CTA
- 홈 화면의 Hero, About, Platforms, Review, Process, Diagnosis 섹션
- 서비스, 회사, 콘텐츠, 진단 화면의 페이지별 컴포넌트
- 전역 CSS 1,157줄과 로컬 폰트, 이미지, 영상 자산
- Desktop과 Mobile의 full-page 렌더링 및 스크롤 진입 상태

### 정량 근거

- IntersectionObserver 생성: 43회
- IntersectionObserver를 직접 가진 파일: 17개
- keyframes 선언: 42개
- infinite animation 사용: 31개
- rounded utility 사용: 191개
- Desktop 히어로 영상: 약 2.4MB
- Mobile 히어로 영상: 약 2.3MB

이 수치는 시각적 완성도와 구현 품질을 분리해서 판단하기 위한 근거다. 많이 사용되었다는 이유만으로 Jabin에 그대로 채택하지 않는다.

## 2. 디자인 명제

DESIGN NAVY의 핵심은 다음 다섯 문장으로 요약한다.

1. 첫 화면은 네이비 미디어와 흰색 문장으로 브랜드 존재감을 즉시 만든다.
2. 페이지는 White, Soft Gray, Navy의 큰 면을 번갈아 사용해 긴 스크롤의 장면을 나눈다.
3. 콘텐츠는 1,164px 안에 정렬하고, 바깥 1,440px 영역은 안정적인 여백으로 사용한다.
4. 모션은 히어로 진입, 스크롤 reveal, 헤더 변형의 세 계층으로 읽는 순서를 만든다.
5. 정보 입력 화면은 장식을 줄이고 선, 라벨, 상태 중심의 업무형 UI로 전환한다.

### 시각적 인상

- 정돈된 기술 기업
- 신뢰를 강조하는 B2B 서비스
- 어두운 첫 화면과 밝은 본문의 강한 대비
- 중앙 정렬된 선언형 문장
- 서비스와 성과를 순차적으로 증명하는 긴 내러티브

### 적용 원칙

- 브랜드명, 로고, 문구, 사람, 사례, 이미지 자산은 가져오지 않는다.
- 구조와 리듬은 참고하되 Jabin의 실제 콘텐츠 양에 맞춰 길이를 다시 계산한다.
- 소스에서 반복된 임의 값은 디자인 토큰으로 정규화한다.
- 애니메이션은 접근성 설정과 성능 예산을 만족할 때만 채택한다.
- 카드와 글래스 효과는 정보 구조상 프레임이 필요한 경우에만 사용한다.

## 3. 색상 시스템

### 관찰 팔레트

| 역할 | 값 | 용도 |
| --- | --- | --- |
| Primary Navy Blue | #184BBA | CTA, 링크, 활성 상태, 강조 |
| Action Blue | #1A4FD6 | 버튼 변형, 그래픽 |
| Deep Navy | #07276C | 네이비 섹션과 그래픽 |
| Night | #0A0F1E | 모바일 메뉴, 가장 어두운 배경 |
| Dark Surface | #1A1F2E | 어두운 카드, 보조 배경 |
| Ink | #111111 | 기본 본문 |
| White | #FFFFFF | 기본 배경, 반전 텍스트 |
| Soft Gray | #F6F6F6 | 섹션 전환 배경, Footer |
| Blue Tint | #EFF1FF | 선택, 약한 정보 강조 |
| Line | #DDDDDD | 입력과 목록 구분선 |
| Text Sub 1 | #505050 | 본문 보조 |
| Text Sub 2 | #767676 | 설명, 메타 정보 |
| Text Sub 3 | #999999 | 비활성, 캡션 |
| Signal Lime | #B6FF4E | 제한적인 상태 강조 |
| Success | #22C55E | 온라인, 완료 상태 |
| Danger | #EF4444 | 오류 상태 |

### 정규화 토큰

관찰된 일회성 파란색을 모두 유지하지 않는다. 구현에서는 아래 역할 토큰만 허용한다.

~~~css
@theme inline {
  --color-navy-primary: #184bba;
  --color-navy-action: #1a4fd6;
  --color-navy-deep: #07276c;
  --color-navy-night: #0a0f1e;
  --color-navy-surface-dark: #1a1f2e;
  --color-navy-ink: #111111;
  --color-navy-paper: #ffffff;
  --color-navy-surface: #f6f6f6;
  --color-navy-tint: #eff1ff;
  --color-navy-line: #dddddd;
  --color-navy-muted: #767676;
  --color-navy-signal: #b6ff4e;
}
~~~

### 색상 사용 규칙

- 한 화면의 지배색은 Navy, White, Gray 중 하나만 선택한다.
- Primary와 Action Blue는 같은 컴포넌트 안에서 경쟁시키지 않는다.
- Signal Lime은 실시간 상태, 중요한 수치 등 작은 면적에만 사용한다.
- 본문 위계는 먼저 크기와 굵기로 만들고, 회색 단계는 보조 수단으로 쓴다.
- 어두운 섹션에서 긴 본문은 순백보다 white/75에서 white/85 범위를 권장한다.
- 그라디언트는 실제 미디어의 텍스트 가독성을 위한 오버레이에만 허용한다.
- 배경 장식용 radial gradient, orb, bokeh는 사용하지 않는다.

## 4. 타이포그래피

### 서체와 굵기

기본 서체는 Freesentation이다. 관찰된 굵기는 500, 600, 700, 800, 900이다.

| 역할 | Desktop | Mobile | 굵기 | 권장 행간 |
| --- | ---: | ---: | ---: | ---: |
| Hero Display | 64px | 34px | 800 | 1.08 |
| Page Hero | 40–48px | 30–32px | 700–800 | 1.15 |
| Section Display | 40–52px | 28–34px | 700–800 | 1.18 |
| H1 | 48px | 32px | 700 | 1.2 |
| H2 | 36px | 28px | 700 | 1.25 |
| H3 | 24px | 20–22px | 600 | 1.35 |
| H4 | 20px | 18px | 500–600 | 1.4 |
| Lead | 18px | 16px | 500 | 1.6 |
| Body | 16px | 14–15px | 500 | 1.65 |
| Body Small | 14px | 13px | 500 | 1.55 |
| Caption | 12px | 11–12px | 500–600 | 1.45 |

### 관찰과 교정

소스에는 10px부터 64px까지 매우 많은 임의 크기가 존재한다. 특히 13px, 14px가 가장 자주 사용되며 9–11px 텍스트도 일부 존재한다. DESIGN NAVY에서는 아래 기준으로 줄인다.

- 본문 최소 크기는 Mobile 14px, Desktop 15px다.
- 법적 고지와 보조 메타만 12px을 허용한다.
- 11px 이하는 시각 장식 라벨에도 사용하지 않는다.
- 글자 간격은 0을 기본으로 한다.
- 영문 대문자 라벨만 0.04em까지 허용한다.
- 한글 제목은 의미 단위로 직접 줄바꿈하고 orphan을 확인한다.
- vw 기반 연속 스케일은 사용하지 않고 브레이크포인트별 고정 크기를 쓴다.

## 5. 레이아웃 시스템

### 컨테이너

| 레벨 | 최대 폭 | 역할 |
| --- | ---: | --- |
| Page Outer | 1,440px | 헤더, Footer, 전체 페이지 정렬 |
| Content | 1,163–1,164px | 본문, 카드, 폼, 목록 |
| Reading | 680–760px | 긴 문장, 정책, 설명 |

### 좌우 여백

| 구간 | 여백 |
| --- | ---: |
| Mobile | 16px |
| Small Tablet | 24px |
| Desktop | 40px |
| Wide Desktop | 60px |

Jabin에 적용할 때는 기존 DESIGN.md의 Mobile 20px, Desktop 48px 기준을 우선한다. 이 문서의 수치는 레퍼런스 재현 값이며 운영 토큰으로 자동 승격되지 않는다.

### 브레이크포인트

| 이름 | 시작 | 변화 |
| --- | ---: | --- |
| sm | 640px | 패딩, 타입, 일부 2열 |
| md | 768px | 콘텐츠 정렬과 카드 열 전환 |
| lg | 1,024px | 데스크톱 내비게이션, 가로 레이아웃 |
| xl | 1,280px | 넓은 간격 |
| desktop | 1,440px | 외부 컨테이너 고정 |

### 섹션 리듬

- Mobile 일반 섹션: 상하 64–88px
- Desktop 일반 섹션: 상하 96–120px
- 선언형 섹션: 상하 140–180px
- 제목과 설명: 20–32px
- 설명과 콘텐츠: 40–64px
- 반복 항목: Mobile 16px, Desktop 24px
- 배경이 바뀌는 구간은 별도 카드 없이 full-width band로 만든다.

### 히어로 높이

- Home: 100svh
- Secondary Desktop: 약 420px
- Secondary Mobile 관찰값: 최소 726px
- Diagnosis Mobile: 약 240px

Secondary Mobile의 726px 고정값은 정보량에 비해 지나치게 크다. Jabin에서는 520–620px 범위 또는 콘텐츠 기반 min-height를 사용하고 다음 섹션의 시작이 보이는지 확인한다.

## 6. 면, 선, 모서리

### 관찰된 표면 언어

소스는 rounded-full, rounded-lg, rounded-xl, rounded-2xl을 광범위하게 사용하며 30–36px 사용자 정의 반경도 존재한다. 글래스 배경, blur, 겹친 그림자도 Review와 Floating CTA에 집중되어 있다.

### DESIGN NAVY 규칙

| 요소 | 반경 |
| --- | ---: |
| 일반 콘텐츠 블록 | 0–8px |
| 이미지 | 6–8px |
| 반복 카드 | 8px |
| 큰 사례 미디어 | 12px |
| 입력 필드 | 0–4px |
| 플로팅 헤더 | 999px |
| 주 CTA | 999px 허용 |
| 모달 | 8px |

- 카드 안에 다시 장식 카드를 넣지 않는다.
- 페이지 섹션 전체를 떠 있는 카드로 만들지 않는다.
- 그림자는 플로팅 헤더, 모달, 실제 겹침을 표현하는 레이어에만 쓴다.
- 구분은 우선 배경 면과 1px 선으로 해결한다.
- backdrop blur는 헤더와 모바일 오버레이 외에는 사용하지 않는다.

## 7. 공통 컴포넌트

### Header

초기에는 히어로 위 전체 폭의 투명 헤더다. 스크롤 50px 이후 중앙의 흰색 반투명 pill로 변형된다.

- 초기 높이: 52–56px
- 스크롤 높이: 44–46px
- Mobile pill 너비: 92%
- Small pill 너비: 88%
- Desktop pill 너비: 75%, 최대 900px
- 외부 변형: 600ms, cubic-bezier(.22,1,.36,1)
- 내부 크기 변형: 500ms, cubic-bezier(.34,1.56,.64,1)
- 로고 진입: 800ms, 왼쪽에서 이동
- 내비게이션 진입: 100–250ms stagger

Mobile 메뉴는 우측 drawer이며 최대 300–340px, 배경은 Navy Night다. 열릴 때 body 스크롤을 잠그고 Escape, 닫기 버튼, 바깥 영역으로 닫혀야 한다.

### Footer

- 배경: Soft Gray
- Outer: 1,440px
- Content: 1,164px
- Desktop: 회사 정보와 링크의 2열
- Mobile: 브랜드, 회사 정보, 고지, 링크의 세로 흐름
- 상하 여백: 40–70px
- 회사 정보: 12–13px, 법적 고지: 12px

### Floating CTA

관찰 구현은 우측 하단 원형 버튼이며 열릴 때 여러 액션이 세로로 확장된다. pulse, glow, shine이 동시에 적용되어 시선 점유가 크고 Mobile 탭과 폼을 가리는 사례가 확인됐다.

Jabin 적용 규칙:

- Mobile에서는 하단 고정 바 또는 단일 아이콘 버튼 중 하나만 사용한다.
- 주요 탭, 폼 제출 버튼, 개인정보 동의 영역과 겹치지 않아야 한다.
- safe-area-inset-bottom을 포함한다.
- 열린 상태에서도 화면 폭의 35% 이상을 가리지 않는다.
- 반복 모션은 하나만 허용하고 reduced motion에서 정지한다.

## 8. 페이지 아키타입

### Home: Narrative

권장 순서:

1. Full-bleed Hero
2. 회사 관점과 핵심 수치
3. 플랫폼 또는 기술 신뢰
4. 후기, 인증, 성과
5. 실행 프로세스
6. 진단 또는 문의 CTA
7. Footer

White, Soft Gray, Navy를 교대로 사용한다. 모든 섹션을 중앙 정렬하지 않고, 선언은 중앙 정렬, 실제 사례와 서비스는 좌측 정렬로 분리한다.

### Service: Catalogue

권장 순서:

1. 짧은 Page Hero
2. 서비스 정의
3. CTA band
4. 카테고리 목록
5. 성과와 기준
6. 실행 원칙
7. Dark statement
8. Case study
9. 문의 CTA

Desktop은 3–4열, Mobile은 1–2열을 사용한다. Mobile 전체 길이가 7,000px을 넘기면 탭, 아코디언, 핵심/상세 분리를 검토한다.

### About: Story

회사 연혁 나열보다 문제 인식, 방법론, 사람 순서로 구성한다. 조직도는 실제 책임 관계가 중요한 경우에만 사용하고, SI 회사 홈페이지는 구성원별 역할과 외부 프로필을 우선한다.

### Column: Editorial

- 1,164px 내부 콘텐츠
- breadcrumb
- 가로 탭 또는 segmented navigation
- featured article
- 3열 카드 목록
- 검색 결과 없음과 API 오류를 구분한 empty state

Mobile 가로 탭은 스크롤 가능하되 Floating CTA와 겹치지 않아야 한다.

### Diagnosis: Utility

진단과 문의 폼은 마케팅 카드가 아니라 업무 화면처럼 구성한다.

- 섹션 번호와 질문
- 항상 보이는 label
- 실제 input, select, checkbox, radio
- 1px 구분선
- 다음 단계 CTA
- 필드별 오류와 전체 제출 상태

Mobile 터치 영역은 최소 44×44px이며 작은 radio와 checkbox에도 충분한 label 영역을 연결한다.

## 9. 모션 시스템

### 모션 계층

| 이름 | 시간 | 시작 상태 | 사용 |
| --- | ---: | --- | --- |
| Fast | 180–240ms | 색상 또는 2px 이동 | 아이콘, hover, press |
| Page Enter | 400ms | opacity 0, scale .98 | 라우트 진입 |
| Reveal | 600–800ms | opacity 0, translateY 30–50px | 섹션 진입 |
| Hero Line | 800ms | opacity 0, translateY 30px | 히어로 문장 |
| Header Morph | 500–600ms | 폭, 높이, 배경 변화 | 스크롤 헤더 |
| Media Ready | 700ms | opacity 0 | 영상 로드 완료 |
| Scroll Hint | 1.5s infinite | translateY | 히어로 화살표 |
| Platform Marquee | 12s linear infinite | translateX | 로고 흐름 |
| Review Marquee | 25s linear infinite | translateX | 후기 흐름 |

### Hero 시퀀스

1. 페이지가 opacity 0, scale .98에서 400ms 동안 진입한다.
2. 미디어가 준비되면 700ms 동안 나타난다.
3. 헤드라인은 200ms, 400ms, 600ms 지연으로 줄별 진입한다.
4. 스크롤 힌트는 본문 진입 이후 시작한다.
5. Mobile 미디어는 IntersectionObserver로 필요 시점을 늦춘다.

### Scroll Reveal

직접 observer를 섹션마다 만들지 않고 하나의 Reveal primitive를 사용한다.

- threshold: 0.1–0.15
- rootMargin: 0px 0px -8% 0px
- 기본 거리: 36px
- 기본 시간: 720ms
- 그룹 stagger: 80–120ms
- 한 번만 실행
- JavaScript 실패 시 콘텐츠는 기본적으로 보여야 함

### 반복 모션 제한

- 한 뷰포트 안의 infinite animation은 최대 1개다.
- 마키에 pause 버튼 또는 사용자 제어를 제공한다.
- hover 가능한 환경에서 마키 일시 정지를 지원한다.
- 브라우저 탭이 비활성일 때 불필요한 JavaScript loop를 실행하지 않는다.
- pulse, glow, shine, float를 같은 요소에 중첩하지 않는다.

### Reduced Motion

~~~css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
~~~

마키는 정지된 목록으로, reveal은 최종 상태로, 패럴랙스는 0으로 표시한다. 상태 이해에 필요한 색상 변화는 유지한다.

## 10. 미디어 시스템

### Hero

- 실제 서비스, 작업 화면, 팀 또는 제작 과정을 보여주는 미디어를 우선한다.
- Desktop과 Mobile은 별도 crop 또는 별도 파일을 허용한다.
- 100svh 영역에서 핵심 피사체가 헤드라인과 충돌하지 않아야 한다.
- 영상은 muted, playsInline, loop 조건을 명시한다.
- poster를 제공해 첫 프레임 공백을 방지한다.
- 장식 목적 영상은 reduced motion에서 poster로 대체한다.

### 이미지

- next/image와 정확한 sizes를 사용한다.
- 고정 형식 UI는 aspect-ratio를 선언해 레이아웃 이동을 막는다.
- 화면 캡처는 실제 제품을 읽을 수 있는 밝기와 해상도를 유지한다.
- 텍스트가 필요한 정보는 이미지에 굽지 않고 HTML로 제공한다.
- 서로 다른 출처의 스톡 이미지를 혼합해 브랜드 톤이 깨지지 않게 한다.

### 성능 예산

- 첫 화면 영상은 Desktop과 Mobile 각각 3MB 이하를 목표로 한다.
- LCP 미디어 외에는 lazy loading한다.
- Hero posterior 또는 poster는 AVIF/WebP를 우선한다.
- 영상 준비 전에도 제목과 CTA는 즉시 읽을 수 있어야 한다.
- Mobile 4G 기준으로 첫 화면 텍스트가 영상 다운로드에 종속되지 않아야 한다.

## 11. 접근성 및 인터랙션

- 본문 대비는 WCAG AA 이상을 목표로 한다.
- 포커스 링은 배경에 따라 명확한 2px 외곽선을 사용한다.
- 모든 아이콘 버튼은 accessible name을 가진다.
- 메뉴 drawer는 focus trap과 focus return을 지원한다.
- 키보드 사용자가 가로 slider와 탭을 조작할 수 있어야 한다.
- 폼 label을 placeholder로 대체하지 않는다.
- 오류는 색상, 아이콘, 텍스트 중 두 가지 이상으로 표현한다.
- live count와 상태 점은 의미가 있을 때만 aria-live를 사용한다.
- 장식 이미지는 빈 alt, 정보 이미지는 목적 중심 alt를 작성한다.
- safe area와 200% text zoom에서 고정 UI 겹침을 확인한다.

## 12. 채택, 변환, 제외

### 그대로 채택할 시스템

- 스크롤에 따라 full-width에서 pill로 변하는 헤더
- White, Soft Gray, Navy의 큰 면 전환
- 1,440px outer와 약 1,164px content의 이중 컨테이너
- Desktop과 Mobile의 별도 Hero 미디어
- 줄별 Hero 진입과 그룹 단위 reveal
- 실제 화면, 수치, 사례를 이용한 신뢰 증명
- 장식이 줄어든 업무형 폼 레이아웃

### Jabin에 맞게 변환할 시스템

- 중앙 선언형 구성을 프로젝트와 사람 중심의 좌측 정렬 구조와 혼합
- 긴 서비스 페이지를 핵심 범위와 상세 범위로 압축
- 조직도 대신 CEO, CTO, 구성원의 책임과 LinkedIn, GitHub, Portfolio를 통일된 순서로 표시
- 플랫폼 로고 마키를 기술 흐름 또는 실제 구축 범위로 전환
- 진단 CTA를 실제 프로젝트 문의 흐름으로 연결
- 네이비 팔레트를 적용하더라도 Jabin 로고와 기존 브랜드 대비가 유지되는지 별도 승인

### 제외할 구현

- 일회성 색상과 크기를 계속 추가하는 방식
- 30px 이상 반경의 중첩 글래스 카드
- 배경용 gradient orb와 blur blob
- 섹션별로 복제된 IntersectionObserver
- 한 요소의 pulse, glow, shine, float 중첩
- reduced motion 처리가 없는 지속 애니메이션
- Mobile 726px 고정 Secondary Hero
- 9–11px 본문
- 콘텐츠를 가리는 Floating CTA
- 조직도 렌더링 실패 시 남는 큰 빈 공간

## 13. Tailwind 구현 계약

### 컴포넌트 경계

- NavySection: 배경과 텍스트 대비만 책임진다.
- PageShell: 최대 폭과 반응형 좌우 패딩만 책임진다.
- Reveal: observer, delay, reduced motion을 중앙 관리한다.
- MorphHeader: 스크롤 상태와 내비게이션 접근성을 관리한다.
- MediaHero: Desktop/Mobile source, poster, ready state를 관리한다.
- FloatingAction: safe area와 겹침 검사를 포함한다.

### 금지

- style prop에 새 브랜드 색상 직접 입력
- 임의 픽셀 글자 크기 추가
- 동일한 keyframes를 페이지 파일마다 재선언
- peer 또는 group 상태 없이 시각만 바뀌는 가짜 control
- CSS Module과 Tailwind utility를 같은 역할에 중복 사용
- 장식용 수동 SVG 아이콘

### 허용

- Tailwind v4 @theme의 역할 토큰
- 구체적인 미디어 비율을 위한 arbitrary value
- 복잡한 배경 이미지의 위치 조정을 위한 제한적 arbitrary value
- Lucide 아이콘
- 공통 motion primitive 내부의 CSS keyframes

## 14. 확인된 결함

1. Mobile Column 화면에서 Floating CTA가 가로 탭을 가린다.
2. Mobile About의 Team 이후 지나치게 큰 빈 영역이 남는다.
3. Service Mobile은 7,843px로 정보 탐색 비용이 높다.
4. 화면별 observer와 keyframes가 중복돼 모션 변경 비용이 크다.
5. 전역 CSS가 페이지별 규칙까지 포함해 책임 범위가 넓다.
6. 작은 텍스트와 음수 letter-spacing이 여러 곳에 존재한다.
7. 네이비와 파란색의 일회성 변형이 많아 토큰 일관성이 약하다.
8. 동시에 실행되는 반복 애니메이션이 시선과 배터리를 과도하게 사용한다.
9. reduced motion 대응이 충분하지 않다.
10. 넓은 Desktop에서 콘텐츠가 지나치게 작고 중앙에 고립되는 구간이 있다.

이 결함은 레퍼런스의 시각 스타일과 분리해 취급한다. DESIGN NAVY를 구현할 때 재현 대상이 아니다.

## 15. 화면별 QA

### 공통

- [ ] 390, 768, 1024, 1440px에서 가로 스크롤이 없다.
- [ ] 200% 확대에서도 헤더, CTA, 본문이 겹치지 않는다.
- [ ] 키보드만으로 메뉴, 탭, slider, 폼을 사용할 수 있다.
- [ ] reduced motion에서 모든 콘텐츠가 즉시 보인다.
- [ ] 첫 화면 LCP 요소와 다운로드 크기를 측정했다.
- [ ] 모든 고정 UI가 safe area를 지킨다.
- [ ] 제목의 한글 줄바꿈이 의미 단위로 유지된다.

### Home

- [ ] 첫 화면에서 브랜드명, 핵심 문장, 서비스 범위를 확인할 수 있다.
- [ ] 다음 섹션의 시작이 첫 뷰포트에 암시된다.
- [ ] Hero 영상이 없어도 poster와 문장만으로 화면이 완성된다.
- [ ] reveal 순서가 실제 읽기 순서와 같다.

### Service와 About

- [ ] Mobile에서 한 섹션이 1.5뷰포트 이상 비어 있지 않다.
- [ ] 카드 열 전환 시 텍스트와 이미지가 재배치돼도 높이가 튀지 않는다.
- [ ] 실제 근거가 없는 수치와 인증을 노출하지 않는다.
- [ ] 구성원 외부 링크는 동일한 순서와 상태 표현을 쓴다.

### Column과 Form

- [ ] 탭과 Floating CTA가 겹치지 않는다.
- [ ] 로딩, 빈 결과, 오류 상태가 서로 다르다.
- [ ] 모든 필드가 label과 오류 설명에 연결된다.
- [ ] 제출 중 중복 요청을 막고 성공·실패 상태를 텍스트로 알린다.

## 16. 운영 규칙

- DESIGN NAVY 변경은 Docs 역할의 독립 커밋으로 관리한다.
- 구현 전에 이 문서의 해당 항목과 DESIGN.md 중 어느 쪽을 적용하는지 작업 설명에 명시한다.
- 새로운 색상, 타입 크기, 반경, 모션 시간은 사용 전에 토큰 표를 수정한다.
- 스크린샷에서 발견한 결함은 시각 취향이 아니라 재현 조건과 뷰포트를 함께 기록한다.
- 레퍼런스 자산을 제품 코드에 복사하지 않는다.
- 문서 승인 후에도 전체 이식보다 Header, Hero, Reveal처럼 역할 단위로 구현하고 검증한다.
- 커밋과 푸시는 AGENTS.md의 사용자 사전 승인 규칙을 따른다.

## 17. 현재 결정 상태

| 항목 | 상태 |
| --- | --- |
| 역추적 완료 | Yes |
| DESIGN NAVY 토큰 정규화 | Draft |
| Jabin 운영 팔레트 교체 | Pilot on feat/3-design-navy-home |
| Header motion 이식 | Implemented on feature branch |
| Hero media 방향 | Existing concept asset applied; final asset required |
| Floating CTA 이식 | Rejected as-is |
| 공통 Reveal primitive | Implemented |
| DESIGN.md 병합 | Not approved |

현재 기능 브랜치에서는 Header morph, 공통 Reveal, Navy 역할 토큰, Hero 미디어와 전체 페이지 밴드 구성을 적용했다. 다음 단계는 실제 프로젝트 이미지와 세 번째 구성원 정보를 확보하고, 화면 비교 검토 후 이 방향을 DESIGN.md의 운영 기준으로 승격할지 결정하는 것이다.
