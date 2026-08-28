import { expect, test } from "@playwright/test";

test("로컬 환경에서는 GTM을 로드하거나 운영 이벤트를 전송하지 않는다", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await expect(page.locator("#jabin-gtm")).toHaveCount(0);
  expect(requests.some((url) => url.includes("googletagmanager.com"))).toBe(false);
});
