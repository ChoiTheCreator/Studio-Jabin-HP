import { expect, test, type Page } from "@playwright/test";

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));

  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
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

test("데스크톱 홈페이지의 핵심 섹션과 반응형 폭이 정상이다", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  await expect(page.getByRole("link", { name: "Jabin 홈" }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /생각을 작동하게 만듭니다/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Ideas in motion." })).toBeVisible();
  await expect(page.getByRole("heading", { name: /다음 장면을 같이 만듭시다/ })).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await revealFullPage(page);
  await page.screenshot({ path: "test-results/home-desktop.png", fullPage: true });
});

test("모바일 홈페이지와 메뉴가 화면 안에 들어온다", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(page.getByRole("link", { name: "Jabin 홈" }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /생각을 작동하게 만듭니다/ })).toBeVisible();
  await expectNoHorizontalOverflow(page);

  await page.getByRole("button", { name: "메뉴 열기" }).click();
  await expect(page.getByRole("navigation", { name: "모바일 메뉴" })).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await page.getByRole("button", { name: "메뉴 닫기", exact: true }).first().click();
  await expect(page.locator("#mobile-menu")).toBeHidden();

  await revealFullPage(page);
  await page.screenshot({ path: "test-results/home-mobile.png", fullPage: true });
});
