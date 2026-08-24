import { expect, test, type Page } from "@playwright/test";

async function expectNoPageOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));

  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
}

async function scrollStageTo(page: Page, progress: number) {
  await page.locator('[data-testid="comparison-stage"]').evaluate((element, targetProgress) => {
    const rect = element.getBoundingClientRect();
    const start = rect.top + window.scrollY;
    const distance = element.scrollHeight - window.innerHeight;
    window.scrollTo({ top: start + distance * targetProgress, behavior: "auto" });
  }, progress);
  await page.waitForTimeout(250);
}

async function scrollBusinessStageTo(page: Page, progress: number) {
  await page
    .locator('[data-testid="business-compression-stage"]')
    .evaluate((element, targetProgress) => {
      document.documentElement.style.scrollBehavior = "auto";
      const rect = element.getBoundingClientRect();
      const start = rect.top + window.scrollY;
      const distance = element.scrollHeight - window.innerHeight;
      window.scrollTo({ top: start + distance * targetProgress, behavior: "auto" });
    }, progress);
  await page.waitForTimeout(250);
}

test("데스크톱에서 세 홈페이지가 같은 자리에서 원본에서 구조 보기로 전환된다", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/why-our-service");

  await expect(page.getByRole("heading", { name: /Jabin Studio의 웹사이트는/ })).toBeVisible();
  await expect(
    page.getByText(/아래 세 가지는,\s*양산형 웹사이트에서 반복되는 문제입니다/),
  ).toBeAttached();
  await expect(page.getByText(/템플릿이 아니라,\s*브랜드에서부터 시작합니다/)).toBeAttached();
  await expectNoPageOverflow(page);
  await page.screenshot({ path: "test-results/why-service-desktop-hero.png" });

  await expect(page.locator('[data-testid^="website-"]')).toHaveCount(3);
  await scrollStageTo(page, 0);
  await page.screenshot({ path: "test-results/why-service-desktop-start.png" });

  await scrollStageTo(page, 0.3);
  const originalOpacity = Number(
    await page
      .locator('[data-testid="original-호텔"]')
      .evaluate((element) => getComputedStyle(element).opacity),
  );
  const boneOpacity = Number(
    await page
      .locator('[data-testid="bone-호텔"]')
      .evaluate((element) => getComputedStyle(element).opacity),
  );
  expect(originalOpacity).toBeGreaterThan(0);
  expect(originalOpacity).toBeLessThan(1);
  expect(boneOpacity).toBeGreaterThan(0);
  expect(boneOpacity).toBeLessThan(1);
  await page.screenshot({ path: "test-results/why-service-desktop-crossfade.png" });

  await scrollStageTo(page, 0.72);
  await expect(page.locator('[data-testid="bone-호텔"]')).toHaveCSS("opacity", "1");
  const restartButton = page.getByRole("button", { name: "원본 다시 보기" });
  await expect(restartButton).toBeVisible();
  await page.screenshot({ path: "test-results/why-service-desktop-summary.png" });

  await scrollStageTo(page, 0.3);
  await expect(page.locator('[data-testid="bone-호텔"]')).toHaveCSS("opacity", "1");

  await restartButton.click();
  await expect
    .poll(() => page.evaluate(() => window.scrollY), { timeout: 3000 })
    .toBeLessThan(
      await page.locator('[data-testid="comparison-stage"]').evaluate((element) => {
        return element.getBoundingClientRect().top + window.scrollY + 20;
      }),
    );
  await expect(page.locator('[data-testid="original-호텔"]')).toHaveCSS("opacity", "1");
});

test("모바일에서는 비교 화면을 가로로 탐색하고 페이지 폭을 넘기지 않는다", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/why-our-service");

  await expectNoPageOverflow(page);
  await page.locator('[data-testid="comparison-stage"]').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-testid="website-호텔"]')).toBeVisible();
  await expect(page.locator('[data-testid="website-카페"]')).toBeAttached();
  await expect(page.locator('[data-testid="website-업무 도구"]')).toBeAttached();
  await page.screenshot({ path: "test-results/why-service-mobile.png" });

  await scrollBusinessStageTo(page, 0.05);
  await expect(page.locator('[data-testid^="business-card-"]')).toHaveCount(3);
  await page.screenshot({ path: "test-results/why-service-problem-two-mobile-start.png" });

  await scrollBusinessStageTo(page, 0.95);
  await expect(page.locator('[data-testid="generic-restaurant-card"]')).toHaveCSS("opacity", "1");
  await page.screenshot({ path: "test-results/why-service-problem-two-mobile-end.png" });
  await expectNoPageOverflow(page);
});

test("태블릿에서도 세 식당 카드가 중앙으로 수렴한다", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/why-our-service");

  await scrollBusinessStageTo(page, 0.48);
  await expect(page.locator('[data-testid^="business-card-"]')).toHaveCount(3);
  await expect(page.locator('[data-testid="business-card-reservation"]')).not.toHaveCSS(
    "opacity",
    "0",
  );
  await expectNoPageOverflow(page);
});

test("Problem 02에서 서로 다른 식당 카드가 개성을 잃고 하나의 업종 카드로 합쳐진다", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/why-our-service");

  await expect(
    page.getByRole("heading", { name: /같은 업종이라고, 같은 비즈니스는 아닙니다/ }),
  ).toBeAttached();
  await expect(
    page
      .locator('[data-testid="problem-two-conclusion"]')
      .getByText(/우리는 업종이 아니라,\s*비즈니스를 이해한 뒤 디자인합니다/),
  ).toBeAttached();

  await scrollBusinessStageTo(page, 0.05);
  const cards = page.locator('[data-testid^="business-card-"]');
  await expect(cards).toHaveCount(3);
  const initialBoxes = await cards.evaluateAll((elements) =>
    elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return { x: Math.round(rect.x), y: Math.round(rect.y) };
    }),
  );
  expect(new Set(initialBoxes.map(({ x }) => x)).size).toBe(3);
  expect(new Set(initialBoxes.map(({ y }) => y)).size).toBe(3);
  await page.screenshot({ path: "test-results/why-service-problem-two-start.png" });

  await scrollBusinessStageTo(page, 0.3);
  const maskOpacity = Number(
    await page
      .locator('[data-testid="business-detail-mask-reservation"]')
      .evaluate((element) => getComputedStyle(element).opacity),
  );
  expect(maskOpacity).toBeGreaterThan(0);
  expect(maskOpacity).toBeLessThan(1);
  await page.screenshot({ path: "test-results/why-service-problem-two-mid.png" });

  await scrollBusinessStageTo(page, 0.72);
  await expect(page.locator('[data-testid="generic-restaurant-card"]')).toHaveCSS("opacity", "1");
  await expect(page.locator('[data-testid="business-card-reservation"]')).toHaveCSS("opacity", "0");
  await expect(page.locator('[data-testid="problem-two-conclusion"]')).toHaveCSS("opacity", "1");
  const genericCardBox = await page
    .locator('[data-testid="generic-restaurant-card"]')
    .boundingBox();
  const conclusionBox = await page.locator('[data-testid="problem-two-conclusion"]').boundingBox();
  expect(genericCardBox).not.toBeNull();
  expect(conclusionBox).not.toBeNull();
  expect(conclusionBox!.y - (genericCardBox!.y + genericCardBox!.height)).toBeGreaterThanOrEqual(
    24,
  );
  await page.screenshot({ path: "test-results/why-service-problem-two-end.png" });

  await scrollBusinessStageTo(page, 0.1);
  await expect(page.locator('[data-testid="generic-restaurant-card"]')).toHaveCSS("opacity", "0");
  await expect(page.locator('[data-testid="business-card-reservation"]')).toHaveCSS("opacity", "1");
  await expectNoPageOverflow(page);
});

test("움직임 감소 환경에서는 전체 구조 비교를 정적으로 제공한다", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto("/why-our-service");
  await page.locator('[data-testid="comparison-stage"]').scrollIntoViewIfNeeded();

  await expect(page.getByAltText("호텔 홈페이지 전체 구조 정적 비교")).toBeVisible();
  await expect(page.locator('[data-testid="original-호텔"]')).toBeHidden();
  await page.getByAltText("세 비즈니스가 일반화된 전형적인 레스토랑 카드").scrollIntoViewIfNeeded();
  await expect(page.getByAltText("세 비즈니스가 일반화된 전형적인 레스토랑 카드")).toBeVisible();
  await expectNoPageOverflow(page);
});

test("Problem 03에서 실제 iframe viewport를 프리셋과 슬라이더로 변경한다", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/why-our-service");

  const playground = page.locator('[data-testid="responsive-playground"]');
  await playground.scrollIntoViewIfNeeded();
  const iframe = page.locator('[data-testid="taskwise-iframe"]');
  const frame = page.locator('[data-testid="taskwise-browser-frame"]');
  const slider = page.getByRole("slider", { name: "미리보기 화면 너비" });

  await expect(slider).toHaveValue("1440");
  await expect(page.locator('[data-testid="responsive-issue-callout"]')).toHaveCSS("opacity", "0");
  await expect
    .poll(() => iframe.evaluate((element: HTMLIFrameElement) => element.contentWindow?.innerWidth))
    .toBe(1440);
  const desktopFrame = await frame.boundingBox();
  expect(desktopFrame).not.toBeNull();
  await page.screenshot({ path: "test-results/why-service-problem-three-1440.png" });

  for (const preset of [1200, 1024, 768, 390]) {
    await page.getByRole("button", { name: String(preset), exact: true }).click();
    await expect(slider).toHaveValue(String(preset));
    await expect
      .poll(() =>
        iframe.evaluate((element: HTMLIFrameElement) => element.contentWindow?.innerWidth),
      )
      .toBe(preset);

    if (preset === 1024) {
      await expect(page.locator('[data-testid="responsive-issue-callout"]')).toHaveCSS(
        "opacity",
        "1",
      );
      await expect(page.getByText(/레이아웃은 무너지고,\s*글자는 겹칩니다/).first()).toBeVisible();
    }
  }

  await expect
    .poll(async () => (await frame.boundingBox())?.width ?? Number.POSITIVE_INFINITY)
    .toBeLessThan(desktopFrame!.width / 3);
  const mobileFrame = await frame.boundingBox();
  expect(mobileFrame).not.toBeNull();
  const playgroundBox = await playground.boundingBox();
  expect(playgroundBox).not.toBeNull();
  expect(
    Math.abs(
      mobileFrame!.x + mobileFrame!.width / 2 - (playgroundBox!.x + playgroundBox!.width / 2),
    ),
  ).toBeLessThan(2);
  await page.screenshot({ path: "test-results/why-service-problem-three-390.png" });

  await page.getByRole("button", { name: "1440", exact: true }).click();
  await iframe.evaluate((element: HTMLIFrameElement) => element.contentWindow?.scrollTo(0, 600));
  await expect
    .poll(() => iframe.evaluate((element: HTMLIFrameElement) => element.contentWindow?.scrollY))
    .toBeGreaterThan(0);

  await iframe.contentFrame().getByRole("link", { name: "Start free trial" }).click();
  await expect(page).toHaveURL(/\/why-our-service$/);
  await expectNoPageOverflow(page);
});

test("분할된 실제 제작 이미지를 세 장씩 순환하며 보여준다", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/why-our-service");

  const showcase = page.getByRole("heading", { name: "우리는 다르게 만듭니다." });
  await showcase.scrollIntoViewIfNeeded();
  await expect(showcase).toBeVisible();

  const images = page.locator('[data-testid^="project-image-part-"]');
  await expect(images).toHaveCount(6);
  await expect(page.locator('[data-testid="project-image-part-2"]')).toHaveAttribute(
    "data-active",
    "true",
  );
  await expect(page.locator('[data-testid="project-image-part-3"]')).toHaveAttribute(
    "data-active",
    "true",
    { timeout: 6000 },
  );
  await page.getByRole("button", { name: "이전 이미지" }).last().click();
  await expect(page.locator('[data-testid="project-image-part-2"]')).toHaveAttribute(
    "data-active",
    "true",
  );
  await page.waitForTimeout(700);

  const [leftBox, centerBox, rightBox] = await Promise.all([
    page.locator('[data-testid="project-image-part-1"]').boundingBox(),
    page.locator('[data-testid="project-image-part-2"]').boundingBox(),
    page.locator('[data-testid="project-image-part-3"]').boundingBox(),
  ]);
  expect(leftBox).not.toBeNull();
  expect(centerBox).not.toBeNull();
  expect(rightBox).not.toBeNull();
  expect(centerBox!.width).toBeGreaterThan(leftBox!.width);
  expect(centerBox!.height).toBeGreaterThan(leftBox!.height);
  expect(rightBox!.y).toBeGreaterThan(centerBox!.y);

  await page.getByRole("button", { name: "다음 이미지" }).last().click();
  await expect(page.locator('[data-testid="project-image-part-3"]')).toHaveAttribute(
    "data-active",
    "true",
  );
  for (let index = 0; index < 5; index += 1) {
    await page.getByRole("button", { name: "다음 이미지" }).last().click();
  }
  await expect(page.locator('[data-testid="project-image-part-2"]')).toHaveAttribute(
    "data-active",
    "true",
  );
  await page.waitForTimeout(700);
  await expectNoPageOverflow(page);
  await page.locator('section[aria-labelledby="our-difference-title"]').screenshot({
    path: "test-results/why-service-our-difference-section.png",
  });
});

test("작은 화면에서는 실제 결과물 한 장과 양옆 화살표만 보여준다", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/why-our-service");
  await page.getByRole("heading", { name: "우리는 다르게 만듭니다." }).scrollIntoViewIfNeeded();

  await expect(page.locator('[data-testid^="mobile-project-image-"]')).toHaveCount(1);
  await expect(page.locator('[data-testid="mobile-project-image-part-2"]')).toBeVisible();
  await expect(page.getByRole("button", { name: "이전 이미지" }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: "다음 이미지" }).first()).toBeVisible();
  await page.getByRole("button", { name: "다음 이미지" }).first().click();
  await expect(page.locator('[data-testid="mobile-project-image-part-3"]')).toBeVisible();
  await expectNoPageOverflow(page);
});

test("Infrastructure 섹션이 Problem 03과 결론 사이에서 서비스 범위와 비용을 비교한다", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/why-our-service");

  const section = page.locator("#why-infrastructure");
  const comparison = page.getByAltText(
    "AWS 직접 구축과 Jabin 인프라 서비스의 리소스 제공, 운영·관리, 보안, 책임 구조 비교",
  );
  const graph = page.locator('[data-testid="infrastructure-cost-graph-svg"]');

  await expect(page.locator("#why-problem-3 + #why-infrastructure")).toHaveCount(1);
  await expect(page.locator("#why-infrastructure + #why-conclusion")).toHaveCount(1);
  await expect(
    section.getByRole("heading", { name: "인프라도, 더 효율적으로 설계합니다." }),
  ).toBeAttached();
  await expect(
    section.getByText(
      /웹사이트 제작에 그치지 않고,\s*실제 사용자가 접근할 수 있는 환경까지 전문 인력이 직접 배포하고 운영합니다/,
    ),
  ).toBeAttached();
  await expect(
    section.getByRole("heading", {
      name: /운영까지 포함하면,\s*비용과 책임 구조는 더 크게 달라집니다/,
    }),
  ).toBeAttached();
  await expect(
    section.getByText(
      /동일·유사 사양 기준 예상 비용이며, 실제 비용은 사용량과 운영 환경에 따라 달라질 수 있습니다/,
    ),
  ).toBeAttached();

  await section.scrollIntoViewIfNeeded();
  await expect(comparison).toBeVisible();
  await expect(graph).toBeVisible();
  await expect(comparison).toHaveAttribute("src", "/images/why-our-service/text_comparison.svg");
  await expect(graph).toHaveAttribute("src", "/images/why-our-service/graph_comparison.svg");
  await expect(graph).toHaveAttribute("scrolling", "no");
  await expect(graph).toHaveAttribute(
    "aria-label",
    "Jabin 연간 예상 컴퓨팅 비용 15~30만원과 AWS/GCP 120만원 비교 그래프",
  );

  const [comparisonBox, graphBox, sectionBox, numberBox] = await Promise.all([
    comparison.boundingBox(),
    graph.boundingBox(),
    section.boundingBox(),
    section.getByText("04", { exact: true }).boundingBox(),
  ]);
  expect(comparisonBox).not.toBeNull();
  expect(graphBox).not.toBeNull();
  expect(sectionBox).not.toBeNull();
  expect(numberBox).not.toBeNull();
  expect(comparisonBox!.width).toBeCloseTo(690, 0);
  expect(graphBox!.width).toBeCloseTo(400, 0);
  expect(graphBox!.x - (comparisonBox!.x + comparisonBox!.width)).toBeCloseTo(32, 0);
  expect(
    Math.abs(comparisonBox!.y + comparisonBox!.height / 2 - (graphBox!.y + graphBox!.height / 2)),
  ).toBeLessThan(2);
  expect(comparisonBox!.width / comparisonBox!.height).toBeCloseTo(698 / 392, 2);
  expect(graphBox!.height - comparisonBox!.height).toBeGreaterThan(28);
  expect(graphBox!.height - comparisonBox!.height).toBeLessThan(36);
  const graphOverflow = await graph.evaluate((element: HTMLIFrameElement) => {
    const root = element.contentDocument?.documentElement;
    if (!root) return null;

    return {
      horizontal: root.scrollWidth - root.clientWidth,
      vertical: root.scrollHeight - root.clientHeight,
    };
  });
  expect(graphOverflow).toEqual({ horizontal: 0, vertical: 0 });
  expect(numberBox!.y - sectionBox!.y).toBeGreaterThanOrEqual(96);
  expect(numberBox!.y - sectionBox!.y).toBeLessThanOrEqual(161);
  await expectNoPageOverflow(page);
  await section.screenshot({
    path: "test-results/why-service-infrastructure-desktop.png",
    animations: "disabled",
  });
});

test("Infrastructure 섹션이 지정된 뷰포트에서 자산 비율과 모바일 가독성을 유지한다", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const viewport of [
    { width: 1440, height: 900, name: "1440" },
    { width: 1280, height: 900, name: "1280" },
    { width: 1200, height: 900, name: "1200" },
    { width: 1024, height: 900, name: "1024" },
    { width: 768, height: 1024, name: "768" },
    { width: 430, height: 932, name: "430" },
    { width: 390, height: 844, name: "390" },
    { width: 375, height: 812, name: "375" },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/why-our-service");

    const section = page.locator("#why-infrastructure");
    const desktopComparison = page.getByAltText(
      "AWS 직접 구축과 Jabin 인프라 서비스의 리소스 제공, 운영·관리, 보안, 책임 구조 비교",
    );
    const mobileComparison = page.locator('[data-testid="infrastructure-comparison-mobile"]');
    const graph = page.locator('[data-testid="infrastructure-cost-graph"]');
    const graphSvg = page.locator('[data-testid="infrastructure-cost-graph-svg"]');
    const mobileGraph = page.locator('[data-testid="infrastructure-cost-graph-mobile"]');

    await section.scrollIntoViewIfNeeded();
    await expect(graph).toBeVisible();

    if (viewport.width < 768) {
      await expect(desktopComparison).toBeHidden();
      await expect(mobileComparison).toBeVisible();
      await expect(mobileComparison.getByText("AWS 직접 구축", { exact: true })).toBeVisible();
      await expect(mobileComparison.getByText("Jabin 구축", { exact: true })).toBeVisible();
      await expect(mobileComparison.getByText("전문인력 직접 담당", { exact: true })).toHaveCount(
        2,
      );
      await expect(mobileComparison.getByText("책임 분산", { exact: true })).toBeVisible();
      await expect(mobileComparison.getByText("통합 책임", { exact: true })).toBeVisible();
    } else {
      await expect(desktopComparison).toBeVisible();
      await expect(mobileComparison).toBeHidden();
    }

    if (viewport.width < 640) {
      await expect(graphSvg).toBeHidden();
      await expect(mobileGraph).toBeVisible();
      await expect(mobileGraph.getByText("15~30만원", { exact: true })).toBeVisible();
      await expect(mobileGraph.getByText("120만원", { exact: true })).toBeVisible();
      await expect(page.locator('[data-testid="infrastructure-bar-jabin"]')).toHaveCSS(
        "transform",
        "none",
      );
      await expect(page.locator('[data-testid="infrastructure-price-jabin"]')).toHaveCSS(
        "opacity",
        "1",
      );
    } else {
      await expect(graphSvg).toBeVisible();
      await expect(mobileGraph).toBeHidden();
    }

    const comparisonVisual = viewport.width < 768 ? mobileComparison : desktopComparison;
    const [comparisonBox, graphBox] = await Promise.all([
      comparisonVisual.boundingBox(),
      graph.boundingBox(),
    ]);
    expect(comparisonBox).not.toBeNull();
    expect(graphBox).not.toBeNull();

    if (viewport.width >= 1120) {
      expect(comparisonBox!.x).toBeLessThan(graphBox!.x);
      expect(graphBox!.x - (comparisonBox!.x + comparisonBox!.width)).toBeCloseTo(32, 0);
      expect(
        Math.abs(
          comparisonBox!.y + comparisonBox!.height / 2 - (graphBox!.y + graphBox!.height / 2),
        ),
      ).toBeLessThan(2);
    } else {
      expect(graphBox!.y - (comparisonBox!.y + comparisonBox!.height)).toBeGreaterThanOrEqual(32);
      expect(graphBox!.y - (comparisonBox!.y + comparisonBox!.height)).toBeLessThanOrEqual(48);
      expect(
        Math.abs(comparisonBox!.x + comparisonBox!.width / 2 - (graphBox!.x + graphBox!.width / 2)),
      ).toBeLessThan(2);
    }

    await expectNoPageOverflow(page);
    await section.screenshot({
      path: `test-results/why-service-infrastructure-${viewport.name}.png`,
      animations: "disabled",
    });

    if (["1440", "768", "390"].includes(viewport.name)) {
      await page.locator("#why-infrastructure").evaluate((element) => {
        const rect = element.getBoundingClientRect();
        window.scrollTo({
          top: rect.top + window.scrollY - window.innerHeight * 0.15,
          behavior: "auto",
        });
      });
      await expect(page.locator('[data-testid="section-index-value"]')).toHaveAttribute(
        "data-active-index",
        "4",
      );
      await page.screenshot({
        path: `test-results/why-service-infrastructure-boundary-entry-${viewport.name}.png`,
        animations: "disabled",
      });

      await page.locator("#why-conclusion").evaluate((element) => {
        const rect = element.getBoundingClientRect();
        window.scrollTo({
          top: rect.top + window.scrollY - window.innerHeight * 0.7,
          behavior: "auto",
        });
      });
      await expect(page.locator('[data-testid="section-index-value"]')).toHaveAttribute(
        "data-active-index",
        "4",
      );
      await page.screenshot({
        path: `test-results/why-service-infrastructure-boundary-exit-${viewport.name}.png`,
        animations: "disabled",
      });
    }
  }
});

test("Infrastructure 비용 그래프가 첫 진입에서 한 번만 성장한 뒤 가격을 표시한다", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/why-our-service");

  const graph = page.locator('[data-testid="infrastructure-cost-graph"]');
  const graphSvg = page.locator('[data-testid="infrastructure-cost-graph-svg"]');

  await expect
    .poll(
      () =>
        graphSvg.evaluate((element: HTMLIFrameElement) => {
          return element.contentDocument?.documentElement.dataset.animationState ?? "loading";
        }),
      { timeout: 5_000 },
    )
    .toBe("idle");

  await graph.scrollIntoViewIfNeeded();
  await expect(graph).toHaveAttribute("data-animation-runs", "1");
  await expect
    .poll(() =>
      graphSvg.evaluate((element: HTMLIFrameElement) => {
        return element.contentDocument?.documentElement.dataset.animationState ?? "loading";
      }),
    )
    .toBe("bars");

  const runningGraph = await graphSvg.evaluate((element: HTMLIFrameElement) => {
    const root = element.contentDocument?.documentElement;
    const plot = root?.querySelector("g[clip-path]");
    const children = plot ? Array.from(plot.children) : [];
    const bars = children.filter(
      (child) => child.tagName.toLowerCase() === "rect" && child.getAttribute("width") === "42",
    );
    const prices = children.filter(
      (child) =>
        child.tagName.toLowerCase() === "path" &&
        child.getAttribute("fill")?.toLowerCase() === "#303641",
    );

    return {
      barCount: bars.length,
      animatedBarCount: bars.filter((bar) => bar.getAnimations().length === 1).length,
      priceOpacities: prices.map((price) => getComputedStyle(price).opacity),
    };
  });
  expect(runningGraph.barCount).toBe(2);
  expect(runningGraph.animatedBarCount).toBe(2);
  expect(runningGraph.priceOpacities).toEqual(["0", "0"]);

  await expect
    .poll(
      () =>
        graphSvg.evaluate((element: HTMLIFrameElement) => {
          return element.contentDocument?.documentElement.dataset.animationState ?? "loading";
        }),
      { timeout: 3_000 },
    )
    .toBe("complete");

  const completedPrices = await graphSvg.evaluate((element: HTMLIFrameElement) => {
    const plot = element.contentDocument?.documentElement.querySelector("g[clip-path]");
    return Array.from(plot?.children ?? [])
      .filter(
        (child) =>
          child.tagName.toLowerCase() === "path" &&
          child.getAttribute("fill")?.toLowerCase() === "#303641",
      )
      .map((price) => getComputedStyle(price).opacity);
  });
  expect(completedPrices).toEqual(["1", "1"]);

  await page.locator("#why-problem-3").scrollIntoViewIfNeeded();
  await graph.scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  await expect(graph).toHaveAttribute("data-animation-runs", "1");
  await expect
    .poll(() =>
      graphSvg.evaluate((element: HTMLIFrameElement) => {
        return element.contentDocument?.documentElement.dataset.animationState ?? "loading";
      }),
    )
    .toBe("complete");
});

test("단일 원형 인덱스가 현재 문제와 Infrastructure 및 결론 번호를 표시한다", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/why-our-service");

  const index = page.locator('[data-testid="section-index"]');
  const value = page.locator('[data-testid="section-index-value"]');
  const label = page.locator('[data-testid="section-index-label"]');

  await expect(index).toHaveCount(1);
  await expect(value).toHaveText("1");
  await value.focus();
  await expect(label).toHaveText("PROBLEM 1");
  await expect(label).toBeVisible();

  for (const section of [
    { id: "why-problem-2", index: "2", label: "PROBLEM 2" },
    { id: "why-problem-3", index: "3", label: "PROBLEM 3" },
    { id: "why-infrastructure", index: "4", label: "INFRASTRUCTURE" },
    { id: "why-conclusion", index: "5", label: "CONCLUSION" },
  ]) {
    await page.locator(`#${section.id}`).evaluate((element) => {
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - window.innerHeight * 0.28, behavior: "auto" });
    });

    await expect(value).toHaveAttribute("data-active-index", section.index);
    await expect(value).toHaveText(section.index);
    await expect(label).toHaveText(section.label);
  }

  await expect(page.locator("#why-infrastructure")).toHaveCount(1);
  await page.waitForTimeout(220);
  await page.screenshot({ path: "test-results/why-service-section-index-conclusion-desktop.png" });
});

test("원형 인덱스가 반응형 화면과 safe area 안에 머문다", async ({ page }) => {
  for (const viewport of [
    { width: 390, height: 844, name: "mobile" },
    { width: 768, height: 1024, name: "tablet" },
    { width: 1440, height: 900, name: "desktop" },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/why-our-service");
    await page.locator("#why-problem-2").evaluate((element) => {
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - window.innerHeight * 0.28, behavior: "auto" });
    });

    const value = page.locator('[data-testid="section-index-value"]');
    await expect(value).toHaveText("2");
    await value.hover();
    const label = page.locator('[data-testid="section-index-label"]');
    await expect(label).toBeVisible();
    await page.waitForTimeout(220);

    const box = await page.locator('[data-testid="section-index"]').boundingBox();
    const valueBox = await value.boundingBox();
    const labelBox = await label.boundingBox();
    expect(box).not.toBeNull();
    expect(valueBox).not.toBeNull();
    expect(labelBox).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.y).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width);
    expect(box!.y + box!.height).toBeLessThanOrEqual(viewport.height);
    expect(labelBox!.y + labelBox!.height).toBeLessThan(valueBox!.y);
    expect(
      Math.abs(labelBox!.x + labelBox!.width / 2 - (valueBox!.x + valueBox!.width / 2)),
    ).toBeLessThan(2);
    expect(labelBox!.x).toBeGreaterThanOrEqual(0);
    expect(labelBox!.x + labelBox!.width).toBeLessThanOrEqual(viewport.width);
    await expectNoPageOverflow(page);
    await page.screenshot({
      path: `test-results/why-service-section-index-${viewport.name}.png`,
    });
  }
});
