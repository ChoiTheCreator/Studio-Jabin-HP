import { expect, test, type Page } from "@playwright/test";

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));

  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
}

test("Method 페이지의 핵심 섹션이 정상 노출된다", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/method");

  await expect(page.getByRole("heading", { name: "Jabin Studio가 프로젝트를" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /코드만 넘기고 끝내지 않습니다\. 운영까지 설계합니다/ }),
  ).toBeAttached();
  await expect(page.getByRole("heading", { name: "Seoul to Gwangju" })).toBeAttached();
  await expect(
    page.getByRole("heading", { name: /하나의 관점으로 처음부터 끝까지/ }),
  ).toBeAttached();
  await expect(page.getByRole("link", { name: "최원빈 GitHub 새 창에서 열기" })).toBeAttached();
  await expect(page.getByText("유효석", { exact: true })).toBeAttached();
  await expect(page.getByText("임시우", { exact: true })).toBeAttached();
  await expect(
    page.getByRole("heading", { name: /진단부터 운영까지, 같은 기준으로 이어갑니다/ }),
  ).toBeAttached();
  await expectNoHorizontalOverflow(page);
});

test("헤더의 HOME/METHOD/WHY JABIN 메뉴가 각 페이지로 연결된다", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const nav = page.getByRole("navigation", { name: "주요 메뉴" });
  await expect(nav.getByRole("link", { name: "HOME" })).toHaveAttribute("href", "/");
  await expect(nav.getByRole("link", { name: "METHOD" })).toHaveAttribute("href", "/method");
  await expect(nav.getByRole("link", { name: "WHY JABIN" })).toHaveAttribute(
    "href",
    "/why-our-service",
  );

  await nav.getByRole("link", { name: "METHOD" }).click();
  await expect(page).toHaveURL(/\/method$/);
  await expect(page.getByRole("heading", { name: "Seoul to Gwangju" })).toBeAttached();
});

test("자체 인프라 섹션이 두 거점과 선택형 기술 사양을 제공한다", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/method");

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
  const signal = infrastructure.locator(".infrastructure-region__signal");
  await expect(signal).toHaveCSS("animation-name", "infrastructure-region-signal");
  await expect(signal).toHaveCSS("animation-duration", "8s");
  await expectNoHorizontalOverflow(page);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(signal).toHaveCSS("display", "none");
  await expect(detailsContent).toHaveCSS("animation-name", "none");
});

test("인프라 지도가 화면 폭에 맞춰 안정적으로 재배치된다", async ({ page }) => {
  for (const viewport of [
    { width: 390, height: 844, maxMapWidth: 240, sideBySide: false },
    { width: 640, height: 900, maxMapWidth: 288, sideBySide: false },
    { width: 768, height: 1024, maxMapWidth: 240, sideBySide: true },
    { width: 1024, height: 768, maxMapWidth: 280, sideBySide: true },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/method");

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
