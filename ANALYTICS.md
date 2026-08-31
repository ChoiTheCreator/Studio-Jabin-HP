# Analytics

Jabin 홈페이지는 Google Tag Manager를 통해 GA4 이벤트를 전송한다. 애플리케이션은 `jabinstudio.com`과 `www.jabinstudio.com`에서만 GTM을 로드하므로 localhost, 테스트, Preview 배포 데이터는 운영 지표에 섞이지 않는다.

## 환경 변수

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_ANALYTICS_DEBUG=false
```

`NEXT_PUBLIC_GTM_ID`가 빌드 시 설정되지 않으면 운영 기본값 `GTM-KPW4GPCG`를 사용한다.

GA4 Measurement ID는 소스 코드가 아니라 GTM의 Google Tag에 설정한다. `NEXT_PUBLIC_ANALYTICS_DEBUG=true`는 전송 여부와 무관하게 이벤트 payload를 브라우저 콘솔에 출력한다.

## GTM 설정

1. Google Tag에 GA4 Measurement ID를 입력하고 `All Pages` 트리거를 연결한다. 이 태그가 최초 `page_view`를 담당한다.
2. 아래 이벤트 이름별 Custom Event 트리거와 GA4 Event 태그를 만든다. SPA 경로 전환의 `page_view`도 Custom Event로 연결한다.
3. 이벤트 매개변수와 같은 이름의 Data Layer Variable을 만들고 GA4 Event 태그에 연결한다.
4. GA4 Enhanced Measurement의 outbound click을 사용한다. 동일한 `outbound_click` 이벤트를 코드나 GTM에서 추가로 만들지 않는다.

## 이벤트

| Event                   | Parameters                                             |
| ----------------------- | ------------------------------------------------------ |
| `page_view`             | `page_path`, `site_language`                           |
| `section_view`          | `section_name`, `site_language`                        |
| `cta_click`             | `cta_name`, `section_name`, `destination`              |
| `service_view`          | `service_name`, `section_name`                         |
| `project_view`          | `project_name`, `project_category`, `project_position` |
| `contact_start`         | `entry_point`                                          |
| `project_status_select` | `project_status`                                       |
| `service_select`        | `service_type`                                         |
| `form_start`            | `project_status`, `entry_point`                        |
| `generate_lead`         | `project_status`, `service_type`, `entry_point`        |

`section_view`는 섹션이 화면의 중앙 읽기 영역에 진입할 때 경로별 한 번만 기록한다. `generate_lead`는 문의 서버 액션이 성공한 뒤에만 기록한다.

## 개인정보

이벤트에는 이름, 이메일, 회사명, 문의 본문, URL, 검색어 등 사용자가 입력한 값을 포함하지 않는다. 프로젝트 상태와 서비스 범위는 코드에 정의된 영문 식별자로만 전송한다.

## 확인

1. 로컬에서 `NEXT_PUBLIC_ANALYTICS_DEBUG=true npm run dev`로 실행하고 콘솔 payload를 확인한다. 로컬에서는 GTM 네트워크 요청이 없어야 한다.
2. GTM Preview로 운영 도메인에 접속해 태그 실행과 Data Layer 값을 확인한다.
3. GA4 DebugView와 Realtime에서 이벤트를 확인한다.
4. 문의 실패 시 `generate_lead`가 없고, 성공 시 한 번만 발생하는지 확인한다.

새 이벤트는 `src/lib/analytics.ts`의 `AnalyticsEventMap`에 이름과 허용 매개변수를 먼저 정의한 뒤 `trackEvent`로 호출한다. 자유 입력값을 helper에 전달하지 않는다.
