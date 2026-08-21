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

  await expect(page.getByRole("heading", { name: /JB Studio의 웹사이트는/ })).toBeVisible();
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
