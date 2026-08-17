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
    page.getByRole("heading", { name: /필요한 시스템을, 함께 정의합시다/ }),
  ).toBeVisible();
  await expect(page.getByLabel("프로젝트에 대해 알려주세요 *")).toBeAttached();
  await expect(page.getByRole("link", { name: "내용 보기" })).toBeAttached();
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
  const overview = infrastructure.getByTestId("infrastructure-overview");
  const intro = infrastructure.getByTestId("infrastructure-intro");
  const locations = infrastructure.getByRole("img", {
    name: "서울 AI 컴퓨팅과 광주 코어 컴퓨팅을 연결한 자체 인프라",
  });
  const gwangjuHeading = infrastructure
    .getByRole("heading", { name: "Seoul to Gwangju" })
    .getByText("Gwangju");
  const infrastructureSummary = infrastructure.getByText(
    /서울의 AI 컴퓨팅 인프라와 광주의 서비스 운영 인프라를 기반으로/,
  );
  const infrastructureMessage = infrastructure
    .getByText("자체 인프라", { exact: true })
    .locator("..");
  const infrastructureMap = infrastructure.getByRole("img", {
    name: "서울과 광주의 자체 인프라 거점을 연결한 대한민국 네트워크 지도",
  });
  const [
    overviewBox,
    introBox,
    locationsBox,
    gwangjuHeadingBox,
    infrastructureSummaryBox,
    infrastructureMessageBox,
    infrastructureMapBox,
  ] = await Promise.all([
    overview.boundingBox(),
    intro.boundingBox(),
    locations.boundingBox(),
    gwangjuHeading.boundingBox(),
    infrastructureSummary.boundingBox(),
    infrastructureMessage.boundingBox(),
    infrastructureMap.boundingBox(),
  ]);
  expect(overviewBox).not.toBeNull();
  expect(introBox).not.toBeNull();
  expect(locationsBox).not.toBeNull();
  expect(gwangjuHeadingBox).not.toBeNull();
  expect(infrastructureSummaryBox).not.toBeNull();
  expect(infrastructureMessageBox).not.toBeNull();
  expect(infrastructureMapBox).not.toBeNull();
  expect(overviewBox!.x).toBeLessThan(1);
  expect(overviewBox!.width).toBeGreaterThanOrEqual(1439);
  expect(Math.abs(introBox!.x - locationsBox!.x)).toBeLessThan(1);
  expect(introBox!.width).toBeLessThan(locationsBox!.width * 0.7);
  expect(Math.abs(gwangjuHeadingBox!.x - infrastructureSummaryBox!.x)).toBeLessThan(2);
  expect(Math.abs(infrastructureMessageBox!.y - infrastructureSummaryBox!.y)).toBeLessThan(1);
  expect(infrastructureMapBox!.x).toBeGreaterThanOrEqual(introBox!.x + introBox!.width);
  await expect(infrastructureMap).toBeVisible();
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

test("인프라 지도가 화면 폭에 맞춰 안정적으로 재배치된다", async ({ page }) => {
  await disableIntro(page);

  for (const viewport of [
    { width: 390, height: 844, maxMapWidth: 240, sideBySide: false },
    { width: 640, height: 900, maxMapWidth: 288, sideBySide: false },
    { width: 768, height: 1024, maxMapWidth: 240, sideBySide: true },
    { width: 1024, height: 768, maxMapWidth: 280, sideBySide: true },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");

    const infrastructure = page.locator("#infrastructure");
    const intro = infrastructure.getByTestId("infrastructure-intro");
    const infrastructureMap = infrastructure.getByRole("img", {
      name: "서울과 광주의 자체 인프라 거점을 연결한 대한민국 네트워크 지도",
    });
    const [introBox, infrastructureMapBox] = await Promise.all([
      intro.boundingBox(),
      infrastructureMap.boundingBox(),
    ]);

    expect(introBox).not.toBeNull();
    expect(infrastructureMapBox).not.toBeNull();
    expect(infrastructureMapBox!.width).toBeLessThanOrEqual(viewport.maxMapWidth + 1);

    if (viewport.sideBySide) {
      expect(infrastructureMapBox!.x).toBeGreaterThan(introBox!.x + introBox!.width);
    } else {
      expect(infrastructureMapBox!.y).toBeGreaterThanOrEqual(introBox!.y + introBox!.height);
      expect(
        Math.abs(
          infrastructureMapBox!.x + infrastructureMapBox!.width - (introBox!.x + introBox!.width),
        ),
      ).toBeLessThan(1);
    }

    await expect(infrastructureMap).toBeVisible();
    await expectNoHorizontalOverflow(page);
  }
});

test("개인정보 안내 페이지가 주요 처리 기준을 제공한다", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/privacy");

  await expect(page.getByRole("heading", { name: "개인정보 처리 안내" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "3. 보유 기간과 파기" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Jabin 홈" }).first()).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("문의 폼이 선택 항목과 동의를 포함해 접수된다", async ({ page }) => {
  await disableIntro(page);
  await page.goto("/#contact");

  await page.getByLabel("이름 *").fill("테스트 담당자");
  await page.getByLabel("회사 / 브랜드").fill("Jabin Test");
  await page.getByLabel("이메일 *").fill("form@example.com");
  await page.getByLabel("기획", { exact: true }).check();
  await page.getByLabel("웹 개발", { exact: true }).check();
  await page
    .getByLabel("프로젝트에 대해 알려주세요 *")
    .fill("신규 서비스의 기획과 API 구축 범위를 함께 검토하고 싶습니다.");
  await page.getByLabel(/개인정보 수집 및 이용에 동의합니다/).check();
  await page.getByRole("button", { name: "문의 보내기" }).click();

  await expect(page.getByText("문의가 접수되었습니다.", { exact: false })).toBeVisible();
  await expect(page.getByRole("button", { name: "접수 완료" })).toBeVisible();
});

test("문의 폼이 서버 검증에 걸린 항목을 알려준다", async ({ page }) => {
  await disableIntro(page);
  await page.goto("/#contact");

  // 브라우저 기본 검증을 건너뛰고 서버 액션의 응답만 확인한다.
  await page.locator("#contact form").evaluate((form) => form.setAttribute("novalidate", ""));
  await page.getByLabel("이름 *").fill("김");
  await page.getByLabel("이메일 *").fill("form@example.com");
  await page.getByLabel("기획", { exact: true }).check();
  await page
    .getByLabel("프로젝트에 대해 알려주세요 *")
    .fill("신규 서비스의 기획과 API 구축 범위를 함께 검토하고 싶습니다.");
  await page.getByLabel(/개인정보 수집 및 이용에 동의합니다/).check();
  await page.getByRole("button", { name: "문의 보내기" }).click();

  await expect(page.getByText("이름을 2~40자로 입력해 주세요.")).toBeVisible();
  await expect(page.getByRole("button", { name: "문의 보내기" })).toBeEnabled();
});
