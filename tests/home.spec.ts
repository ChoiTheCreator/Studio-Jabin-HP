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

test("데스크톱 홈페이지의 핵심 섹션과 반응형 폭이 정상이다", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await disableIntro(page);
  await page.goto("/");

  await expect(page.getByRole("link", { name: "Jabin 홈" }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "JABIN", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "문제에서 시작한 설계." })).toBeVisible();
  await expect(page.getByRole("heading", { name: /출시가 끝이 되지 않도록, 운영까지 설계합니다/ })).toBeAttached();
  await expect(page.getByRole("heading", { name: /역할은 나누고, 책임은 함께 집니다/ })).toBeAttached();
  await expect(page.getByRole("link", { name: "최원빈 GitHub 새 창에서 열기" })).toBeAttached();
  await expect(page.getByRole("heading", { name: /진단부터 운영까지, 같은 기준으로 이어갑니다/ })).toBeAttached();
  await expect(page.getByRole("heading", { name: /필요한 시스템을, 함께 정의합시다/ })).toBeVisible();
  await expect(page.getByLabel("프로젝트 유형 *")).toBeAttached();
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

test("개인정보 안내 페이지가 주요 처리 기준을 제공한다", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/privacy");

  await expect(page.getByRole("heading", { name: "개인정보 처리 안내" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "3. 보유 기간과 파기" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Jabin 홈" }).first()).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("문의 API가 잘못된 요청을 거절하고 유효한 요청을 접수한다", async ({ request }) => {
  const clientAddress = `test-${crypto.randomUUID()}`;
  const headers = { "x-forwarded-for": clientAddress };

  const invalidResponse = await request.post("/api/inquiries", {
    headers,
    data: { name: "A" },
  });
  expect(invalidResponse.status()).toBe(422);

  const validResponse = await request.post("/api/inquiries", {
    headers,
    data: {
      name: "테스트 담당자",
      email: "test@example.com",
      company: "Jabin Test",
      phone: "",
      projectType: "신규 구축",
      services: ["기획", "백엔드 API"],
      schedule: "협의 필요",
      budget: "협의 필요",
      project: "신규 서비스의 기획과 API 구축 범위를 함께 검토하고 싶습니다.",
      privacyConsent: true,
      website: "",
    },
  });
  expect(validResponse.status()).toBe(201);
  await expect(validResponse.json()).resolves.toMatchObject({ ok: true });
});

test("문의 폼이 선택 항목과 동의를 포함해 접수된다", async ({ page }) => {
  await page.setExtraHTTPHeaders({ "x-forwarded-for": `form-${crypto.randomUUID()}` });
  await disableIntro(page);
  await page.goto("/#contact");

  await page.getByLabel("이름 *").fill("테스트 담당자");
  await page.getByLabel("회사 / 브랜드").fill("Jabin Test");
  await page.getByLabel("이메일 *").fill("form@example.com");
  await page.getByLabel("프로젝트 유형 *").selectOption("신규 구축");
  await page.getByLabel("기획", { exact: true }).check();
  await page.getByLabel("백엔드 API", { exact: true }).check();
  await page.getByLabel("예상 일정").selectOption("협의 필요");
  await page.getByLabel("예산 구간").selectOption("협의 필요");
  await page
    .getByLabel("프로젝트에 대해 알려주세요 *")
    .fill("신규 서비스의 기획과 API 구축 범위를 함께 검토하고 싶습니다.");
  await page.getByLabel(/개인정보 수집 및 이용에 동의합니다/).check();
  await page.getByRole("button", { name: "문의 보내기" }).click();

  await expect(page.getByText("문의가 접수되었습니다.", { exact: false })).toBeVisible();
  await expect(page.getByRole("button", { name: "접수 완료" })).toBeVisible();
});
