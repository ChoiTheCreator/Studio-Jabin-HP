import { expect, test, type Page } from "@playwright/test";

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));

  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
}

async function disableIntro(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
}

async function revealFullPage(page: Page) {
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    const step = Math.max(window.innerHeight * 0.72, 480);
    for (let position = 0; position < document.documentElement.scrollHeight; position += step) {
      window.scrollTo({ top: position, behavior: "auto" });
      await new Promise((resolve) => window.setTimeout(resolve, 120));
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  });
  await page.waitForTimeout(250);
}

test("링크 공유 메타데이터가 Jabin 로고 대표 이미지를 사용한다", async ({ page }) => {
  await page.goto("/");

  const socialPreview = "https://jabinstudio.com/images/brand/jabin-social-preview.png";

  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", socialPreview);
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "630");
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    "content",
    socialPreview,
  );
});

test("데스크톱 홈페이지의 핵심 섹션과 반응형 폭이 정상이다", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await disableIntro(page);
  await page.goto("/");

  await expect(page.getByRole("link", { name: "Jabin 홈" }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "JABIN", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "문제에서 시작한 설계." })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /코드만 넘기고 끝내지 않습니다\. 운영까지 설계합니다/ }),
  ).toBeAttached();
  await expect(page.getByRole("heading", { name: "Seoul to Gwangju" })).toBeAttached();
  await expect(
    page.getByRole("heading", { name: /역할은 나누고, 책임은 함께 집니다/ }),
  ).toBeAttached();
  await expect(page.getByRole("link", { name: "최원빈 GitHub 새 창에서 열기" })).toBeAttached();
  await expect(
    page.getByRole("heading", { name: /진단부터 운영까지, 같은 기준으로 이어갑니다/ }),
  ).toBeAttached();
  await expect(
    page.getByRole("heading", { name: /지금 가진 것부터, 함께 시작합니다/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /아이디어를 구체화하고 싶으신가요/ }),
  ).toBeAttached();
  await expectNoHorizontalOverflow(page);
  await revealFullPage(page);
  await page.screenshot({ path: "test-results/home-desktop.png", fullPage: true });
});

test("모바일 홈페이지와 메뉴가 화면 안에 들어온다", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await disableIntro(page);
  await page.goto("/");

  await expect(page.getByRole("link", { name: "Jabin 홈" }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "JABIN", exact: true })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.getByRole("button", { name: "메뉴 열기" }).click();
  await expect(page.getByRole("navigation", { name: "모바일 메뉴" })).toBeVisible();
  await expect(page.getByRole("link", { name: "03 INFRA" })).toBeVisible();
  await expect(page.getByRole("link", { name: /TEAM$/ })).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await page.getByRole("button", { name: "메뉴 닫기", exact: true }).first().click();
  await expect(page.locator("#mobile-menu")).toBeHidden();

  await page.setViewportSize({ width: 320, height: 568 });
  await expectNoHorizontalOverflow(page);

  await revealFullPage(page);
  await page.screenshot({ path: "test-results/home-mobile.png", fullPage: true });
});

test("첫 방문에서 JABIN 인트로가 재생되고 자동 종료된다", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const intro = page.getByTestId("jabin-intro");
  await expect(intro).toBeVisible();
  await expect(intro.getByText("Just Ask.")).toBeVisible();
  await expect(intro.getByText("Build It Now.")).toBeVisible();
  await expect(intro).toBeHidden({ timeout: 4_000 });
  await expect(page.getByRole("heading", { name: "JABIN", exact: true })).toBeVisible();
});

test("서비스 띠가 세 언어 문구를 빈 구간 없이 반복한다", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.getByTestId("jabin-intro").dispatchEvent("pointerdown");

  const marquee = page.getByTestId("service-marquee");
  await expect(marquee).toBeVisible();
  await expect(marquee.locator("ul li")).toHaveCount(3);

  const trackMetrics = await marquee.locator(".service-marquee-track").evaluate((track) => {
    const groups = Array.from(track.children) as HTMLElement[];
    const style = window.getComputedStyle(track);

    return {
      animationName: style.animationName,
      animationDuration: style.animationDuration,
      viewportWidth: track.parentElement?.getBoundingClientRect().width ?? 0,
      firstGroupWidth: groups[0]?.getBoundingClientRect().width ?? 0,
      secondGroupWidth: groups[1]?.getBoundingClientRect().width ?? 0,
    };
  });

  expect(trackMetrics.animationName).toBe("marquee");
  expect(trackMetrics.animationDuration).toBe("32s");
  expect(trackMetrics.firstGroupWidth).toBeGreaterThanOrEqual(trackMetrics.viewportWidth);
  expect(Math.abs(trackMetrics.firstGroupWidth - trackMetrics.secondGroupWidth)).toBeLessThan(1);
  await expectNoHorizontalOverflow(page);
});

test("자체 인프라 섹션이 두 거점과 선택형 기술 사양을 제공한다", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.getByTestId("jabin-intro").dispatchEvent("pointerdown");

  const infrastructure = page.locator("#infrastructure");
  await expect(infrastructure.getByRole("heading", { name: "Seoul to Gwangju" })).toBeAttached();
  await expect(infrastructure.getByText("02 REGIONS")).toBeAttached();
  await expect(infrastructure.getByText("SEOUL", { exact: true })).toBeAttached();
  await expect(infrastructure.getByText("GWANGJU", { exact: true })).toBeAttached();
  await expect(infrastructure.getByText("자체 인프라", { exact: true })).toHaveCSS(
    "background-color",
    "rgb(201, 255, 61)",
  );
  await expect(
    infrastructure.getByText(/서울 AI Compute와 광주 Core Compute의 서비스 범위/),
  ).toBeVisible();
  await expect(infrastructure.getByText("RTX A4500 × 2")).toBeHidden();

  const details = infrastructure.getByTestId("infrastructure-details");
  const detailsContent = details.locator(".infrastructure-details__content");
  const detailsIndicator = infrastructure.getByTestId("infrastructure-details-indicator");
  const detailsIndicatorVertical = infrastructure.getByTestId(
    "infrastructure-details-indicator-vertical",
  );
  await expect(details).not.toHaveAttribute("open", "");
  await expect(detailsIndicator).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(detailsIndicatorVertical).toHaveCSS("scale", "none");
  await infrastructure.getByText("기술 사양 자세히 보기").click();
  await expect(details).toHaveAttribute("open", "");
  await expect(detailsIndicator).toHaveCSS("background-color", "rgb(24, 75, 186)");
  await expect(detailsIndicatorVertical).toHaveCSS("scale", "1 0");
  await expect(detailsContent).toHaveCSS("animation-name", "infrastructure-details-enter");
  await expect(
    infrastructure.getByText(/사내 데이터 기반 RAG 및 문서 검색, OCR, 이미지·언어 처리/),
  ).toBeVisible();
  for (const keyword of [
    "챗봇",
    "업무 자동화",
    "AI API 연동",
    "데이터베이스 운영",
    "CI/CD 배포",
    "일일 백업 환경",
  ]) {
    const highlight = infrastructure.getByText(keyword, { exact: true });
    await expect(highlight).toBeVisible();
    await expect(highlight).toHaveCSS("background-color", "rgb(201, 255, 61)");
  }
  await expect(infrastructure.getByText("RTX A4500 × 2")).toBeVisible();
  await expect(infrastructure.getByText("Tenstorrent p150a")).toBeVisible();
  await expect(infrastructure.getByText("Dedicated Compute")).toBeVisible();
  await expect(
    infrastructure.getByRole("heading", { name: /서버를 계속 빌리는 대신/ }),
  ).toBeAttached();
  await expect(infrastructure.getByText("Cloud for the peaks.")).toBeAttached();
  await expect(infrastructure.getByRole("link", { name: "프로젝트 문의" })).toHaveAttribute(
    "href",
    "#contact",
  );

  const signal = infrastructure.locator(".infrastructure-region__signal");
  await expect(signal).toHaveCSS("animation-name", "infrastructure-region-signal");
  await expect(signal).toHaveCSS("animation-duration", "8s");
  await expectNoHorizontalOverflow(page);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(signal).toHaveCSS("display", "none");
  await expect(detailsContent).toHaveCSS("animation-name", "none");
});

test("개인정보 안내 페이지가 주요 처리 기준을 제공한다", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/privacy");

  await expect(page.getByRole("heading", { name: "개인정보 처리 안내" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "3. 보유 기간과 파기" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Jabin 홈" }).first()).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("문의 유형에 따라 질문이 바뀌고 작성한 내용을 유지한다", async ({ page }) => {
  await page.goto("/#contact");
  await page.getByTestId("jabin-intro").dispatchEvent("pointerdown");

  const inquiry = page.locator("#contact");
  await expect(page.locator("#approach + #contact")).toHaveCount(1);
  await expect(inquiry.getByRole("button", { name: "프로젝트 문의" })).toHaveCount(0);

  await inquiry.getByRole("button", { name: /아이디어를 구체화하고 싶으신가요/ }).click();
  const idea = inquiry.getByLabel("어떤 서비스를 구상하고 계신가요? *");
  await expect(idea).toBeVisible();
  const continuationChoice = inquiry.getByRole("button", {
    name: /진행 중인 작업을 이어가고 싶으신가요/,
  });
  const ideaTop = await idea.evaluate((element) => element.getBoundingClientRect().top);
  const continuationTop = await continuationChoice.evaluate(
    (element) => element.closest("button")?.getBoundingClientRect().top ?? 0,
  );
  expect(ideaTop).toBeLessThan(continuationTop);
  await inquiry.getByRole("button", { name: /아이디어를 구체화하고 싶으신가요/ }).click();
  await expect(idea).toBeHidden();
  await expect(inquiry.getByRole("button", { name: "프로젝트 문의" })).toHaveCount(0);
  await inquiry.getByRole("button", { name: /아이디어를 구체화하고 싶으신가요/ }).click();
  await expect(idea).toBeVisible();
  await idea.fill("현장 업무를 모바일에서 관리하는 서비스를 구상하고 있습니다.");
  await inquiry
    .getByLabel("누구의 어떤 문제를 해결하려 하나요? *")
    .fill("현장 담당자의 반복 보고와 누락 문제를 해결하려고 합니다.");
  await inquiry.getByLabel("이름 *").fill("테스트 담당자");
  await inquiry.getByLabel("이메일 *").fill("form@example.com");
  await expect(
    inquiry.getByRole("button", { name: /아이디어를 구체화하고 싶으신가요/ }),
  ).toHaveAttribute("aria-expanded", "true");

  await continuationChoice.click();
  const currentState = inquiry.getByLabel("현재 어디까지 준비되어 있나요? *");
  const improvementChoice = inquiry.getByRole("button", {
    name: /운영 중인 서비스를 개선하고 싶으신가요/,
  });
  const currentStateTop = await currentState.evaluate(
    (element) => element.getBoundingClientRect().top,
  );
  const improvementTop = await improvementChoice.evaluate(
    (element) => element.closest("button")?.getBoundingClientRect().top ?? 0,
  );
  expect(currentStateTop).toBeLessThan(improvementTop);
  await currentState.fill("Figma 디자인과 프론트엔드 코드가 준비되어 있습니다.");
  await inquiry
    .getByLabel("어느 부분부터 이어서 맡기고 싶으신가요? *")
    .fill("백엔드 API 연동과 배포 환경부터 이어서 맡기고 싶습니다.");
  await expect(
    inquiry.getByRole("button", { name: /진행 중인 작업을 이어가고 싶으신가요/ }),
  ).toHaveAttribute("aria-expanded", "true");
  await expect(idea).toBeHidden();

  await inquiry.getByRole("button", { name: /운영 중인 서비스를 개선하고 싶으신가요/ }).click();
  await inquiry.getByLabel("가장 먼저 해결하고 싶은 문제는 무엇인가요? *").selectOption({
    label: "서버 안정성과 트래픽",
  });
  await inquiry
    .getByLabel("현재 문제와 발생 상황을 알려주세요. *")
    .fill("사용자가 몰리는 시간에 API 응답이 느려지고 간헐적으로 요청이 실패합니다.");
  await expect(
    inquiry.getByRole("button", { name: /운영 중인 서비스를 개선하고 싶으신가요/ }),
  ).toHaveAttribute("aria-expanded", "true");

  await inquiry.getByRole("button", { name: /아이디어를 구체화하고 싶으신가요/ }).click();
  await expect(idea).toHaveValue("현장 업무를 모바일에서 관리하는 서비스를 구상하고 있습니다.");
  await expect(inquiry.getByLabel("이름 *")).toHaveValue("테스트 담당자");
  await expect(inquiry.getByLabel("이메일 *")).toHaveValue("form@example.com");
  await expect(inquiry.locator(".inquiry-fields-enter")).toHaveCSS(
    "animation-name",
    "inquiry-fields-enter",
  );
  await expectNoHorizontalOverflow(page);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(inquiry.locator(".inquiry-fields-enter")).toHaveCSS("animation-name", "none");
});

test("문의 폼이 프로젝트 상태와 동의를 포함해 접수된다", async ({ page }) => {
  await disableIntro(page);
  await page.goto("/#contact");

  const inquiry = page.locator("#contact");
  await inquiry.getByRole("button", { name: /아이디어를 구체화하고 싶으신가요/ }).click();
  await inquiry
    .getByLabel("어떤 서비스를 구상하고 계신가요? *")
    .fill("신규 현장 관리 서비스를 만들고 싶습니다.");
  await inquiry
    .getByLabel("누구의 어떤 문제를 해결하려 하나요? *")
    .fill("현장 담당자의 반복 보고와 누락 문제를 해결하려고 합니다.");
  await inquiry.getByLabel("이름 *").fill("테스트 담당자");
  await inquiry.getByLabel("회사 / 브랜드").fill("Jabin Test");
  await inquiry.getByLabel("이메일 *").fill("form@example.com");
  await inquiry.getByLabel("기획", { exact: true }).check();
  await inquiry.getByLabel("웹 개발", { exact: true }).check();
  await inquiry.getByLabel(/개인정보 수집 및 이용에 동의합니다/).check();
  await inquiry.getByRole("button", { name: "프로젝트 문의" }).click();

  await expect(page.getByText("문의가 접수되었습니다.", { exact: false })).toBeVisible();
  await expect(inquiry.getByRole("button", { name: "접수 완료" })).toBeVisible();
});

test("문의 폼이 서버 검증에 걸린 항목을 알려준다", async ({ page }) => {
  await disableIntro(page);
  await page.goto("/#contact");

  const inquiry = page.locator("#contact");
  // 브라우저 기본 검증을 건너뛰고 서버 액션의 응답만 확인한다.
  await inquiry.locator("form").evaluate((form) => form.setAttribute("novalidate", ""));
  await inquiry.getByRole("button", { name: /아이디어를 구체화하고 싶으신가요/ }).click();
  await inquiry
    .getByLabel("어떤 서비스를 구상하고 계신가요? *")
    .fill("신규 현장 관리 서비스를 만들고 싶습니다.");
  await inquiry
    .getByLabel("누구의 어떤 문제를 해결하려 하나요? *")
    .fill("현장 담당자의 반복 보고와 누락 문제를 해결하려고 합니다.");
  await inquiry.getByLabel("이름 *").fill("김");
  await inquiry.getByLabel("이메일 *").fill("form@example.com");
  await inquiry.getByLabel("기획", { exact: true }).check();
  await inquiry.getByLabel(/개인정보 수집 및 이용에 동의합니다/).check();
  await inquiry.getByRole("button", { name: "프로젝트 문의" }).click();

  await expect(page.getByText("이름을 2~40자로 입력해 주세요.")).toBeVisible();
  await expect(inquiry.getByRole("button", { name: "프로젝트 문의" })).toBeEnabled();
});

test("문의 폼이 조작된 프로젝트 상태를 서버에서 거부한다", async ({ page }) => {
  await disableIntro(page);
  await page.goto("/#contact");

  const inquiry = page.locator("#contact");
  await inquiry.locator("form").evaluate((form) => form.setAttribute("novalidate", ""));
  await inquiry.getByRole("button", { name: /아이디어를 구체화하고 싶으신가요/ }).click();
  await inquiry.getByLabel("이름 *").fill("테스트 담당자");
  await inquiry.getByLabel("이메일 *").fill("form@example.com");
  await inquiry.getByLabel("기획", { exact: true }).check();
  await inquiry.getByLabel(/개인정보 수집 및 이용에 동의합니다/).check();
  await inquiry
    .locator('input[name="inquiryType"]')
    .evaluate((input: HTMLInputElement) => (input.value = "tampered"));
  await inquiry.getByRole("button", { name: "프로젝트 문의" }).click();

  await expect(page.getByText("현재 프로젝트 상태를 선택해 주세요.")).toBeVisible();
});

test("문의 폼이 짧은 시간의 반복 접수를 제한한다", async ({ page }) => {
  test.setTimeout(60_000);
  await disableIntro(page);
  await page.setExtraHTTPHeaders({ "x-forwarded-for": `rate-limit-test-${Date.now()}` });

  for (let attempt = 0; attempt < 6; attempt += 1) {
    await page.goto(`/?attempt=${attempt}#contact`);
    const inquiry = page.locator("#contact");

    await inquiry.getByRole("button", { name: /아이디어를 구체화하고 싶으신가요/ }).click();
    await inquiry
      .getByLabel("어떤 서비스를 구상하고 계신가요? *")
      .fill("신규 현장 관리 서비스를 만들고 싶습니다.");
    await inquiry
      .getByLabel("누구의 어떤 문제를 해결하려 하나요? *")
      .fill("현장 담당자의 반복 보고와 누락 문제를 해결하려고 합니다.");
    await inquiry.getByLabel("이름 *").fill("요청 제한 테스트");
    await inquiry.getByLabel("이메일 *").fill("rate-limit@example.com");
    await inquiry.getByLabel("기획", { exact: true }).check();
    await inquiry.getByLabel(/개인정보 수집 및 이용에 동의합니다/).check();
    await inquiry.getByRole("button", { name: "프로젝트 문의" }).click();

    if (attempt < 5) {
      await expect(page.getByText("문의가 접수되었습니다.", { exact: false })).toBeVisible();
    } else {
      await expect(
        page.getByText("문의 요청이 많습니다. 10분 후 다시 시도해 주세요."),
      ).toBeVisible();
    }
  }
});
