import { expect, test, type Locator, type Page } from "@playwright/test";

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

async function sectionOpeningGap(section: Locator, firstContent: Locator) {
  const [sectionBox, contentBox] = await Promise.all([
    section.boundingBox(),
    firstContent.boundingBox(),
  ]);

  expect(sectionBox).not.toBeNull();
  expect(contentBox).not.toBeNull();

  return contentBox!.y - sectionBox!.y;
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

test("챗봇 헤더가 Jabin 로고와 어시스턴트 정보를 보여준다", async ({ page }) => {
  await disableIntro(page);
  await page.goto("/");

  await page.getByRole("button", { name: "채팅 열기" }).click();

  const dialog = page.getByRole("dialog", { name: "Jabin 어시스턴트" });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("header img")).toHaveAttribute("src", /jabin-logo-mark\.png/);
  await expect(dialog.getByText("보통 몇 초 안에 답해요")).toBeVisible();
});

test("데스크톱 홈페이지의 핵심 섹션과 반응형 폭이 정상이다", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await disableIntro(page);
  await page.goto("/");

  await expect(page.getByRole("link", { name: "Jabin 홈" }).first()).toBeVisible();
  const nav = page.getByRole("navigation", { name: "주요 메뉴" });
  await expect(nav.getByRole("link", { name: "HOME" })).toHaveAttribute("href", "/");
  await expect(nav.getByRole("link", { name: "HOW JABIN" })).toHaveAttribute(
    "href",
    "/how-jabin",
  );
  await expect(nav.getByRole("link", { name: "WHY JABIN" })).toHaveAttribute(
    "href",
    "/why-our-service",
  );
  const believeText = page.getByText("WHAT WE BELIEVE", { exact: true });
  await believeText.scrollIntoViewIfNeeded();
  await expect(believeText).toBeInViewport();
  await expect(page.getByRole("heading", { name: "JABIN", exact: true })).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: /당신의 웹사이트도, 어딘가에서 본 것 같지 않나요/,
    }),
  ).toBeAttached();
  await expect(
    page.getByRole("heading", { name: /왜 다른지, 직접 보여드리겠습니다/ }),
  ).toBeAttached();
  await expect(
    page.getByRole("link", { name: /세 가지 원칙이 실제 결과로 이어지는 방식을 확인해보세요/ }),
  ).toHaveAttribute("href", "/why-our-service");
  await expect(
    page.getByRole("heading", { name: /지금 가진 것부터, 함께 시작합니다/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /아이디어를 구체화하고 싶으신가요/ }),
  ).toBeAttached();
  const footer = page.locator("footer");
  await expect(footer.getByRole("link", { name: "hello@jabinstudio.com" })).toBeAttached();
  await expect(footer.getByText("최원빈 · 박재욱", { exact: true })).toBeAttached();
  await expect(footer.getByText("471-07-03625", { exact: true })).toBeVisible();
  await expect(footer.getByText("발급 전", { exact: true })).toHaveCount(0);
  await expect(footer.getByRole("link", { name: "hello@jabinstudio.com" })).toHaveAttribute(
    "href",
    "mailto:hello@jabinstudio.com",
  );
  await expect(
    footer.getByText("서울특별시 양천구 목동중앙북로 16길 56", { exact: true }),
  ).toBeAttached();
  await expect(footer.getByRole("link", { name: "자주 묻는 질문" })).toHaveAttribute(
    "href",
    "/?chat=faq",
  );
  await footer.getByRole("link", { name: "자주 묻는 질문" }).click();
  await expect(page.getByRole("dialog", { name: /Jabin 어시스턴트/ })).toBeVisible();
  await page.getByRole("button", { name: "채팅 닫기" }).click();
  await expect(footer.getByRole("link", { name: "이용약관" })).toHaveAttribute(
    "href",
    "/terms",
  );
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
  await expect(page.getByRole("link", { name: "01 HOME" })).toHaveAttribute("href", "/");
  await expect(page.getByRole("link", { name: "02 HOW JABIN" })).toHaveAttribute(
    "href",
    "/how-jabin",
  );
  await expect(page.getByRole("link", { name: /WHY JABIN$/ })).toHaveAttribute(
    "href",
    "/why-our-service",
  );
  await expectNoHorizontalOverflow(page);
  await page.getByRole("button", { name: "메뉴 닫기", exact: true }).first().click();
  await expect(page.locator("#mobile-menu")).toBeHidden();

  await page.setViewportSize({ width: 320, height: 568 });
  await expectNoHorizontalOverflow(page);

  await revealFullPage(page);
  await page.screenshot({ path: "test-results/home-mobile.png", fullPage: true });
});

test("인접 섹션의 시작 여백이 같은 시각 리듬을 유지한다", async ({ page }) => {
  await disableIntro(page);

  for (const viewport of [
    { width: 390, height: 844, maxGap: 112 },
    { width: 768, height: 1024, maxGap: 128 },
    { width: 1440, height: 900, maxGap: 160 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");

    const statementGap = await sectionOpeningGap(
      page.locator("#approach"),
      page.getByText("WHAT WE BELIEVE", { exact: true }),
    );
    const inquiryGap = await sectionOpeningGap(
      page.locator("#contact"),
      page.getByText("START A PROJECT", { exact: true }),
    );

    expect(statementGap).toBeLessThanOrEqual(viewport.maxGap);
    expect(inquiryGap).toBeLessThanOrEqual(viewport.maxGap);
    expect(Math.abs(statementGap - inquiryGap)).toBeLessThanOrEqual(32);
  }
});

test("WHY JABIN 소개가 상세 페이지로 연결되고 제작 원칙보다 먼저 보인다", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.getByTestId("jabin-intro").dispatchEvent("pointerdown");

  await page
    .getByRole("heading", { name: /왜 다른지, 직접 보여드리겠습니다/ })
    .scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("link", { name: /세 가지 원칙이 실제 결과로 이어지는 방식을 확인해보세요/ }),
  ).toHaveAttribute("href", "/why-our-service");

  const sectionOrder = await page.locator("#approach").evaluate((section) => {
    const teaser = section.querySelector("#jabin-system");
    const howWeBuild = Array.from(section.querySelectorAll("p")).find(
      (element) => element.textContent === "HOW WE BUILD",
    );

    return Boolean(
      teaser &&
      howWeBuild &&
      teaser.compareDocumentPosition(howWeBuild) & Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });
  expect(sectionOrder).toBe(true);

  const ctaFollowsHowWeBuild = await page.locator("#approach").evaluate((section) => {
    const cta = section.querySelector("#why-our-service-cta");
    const howWeBuild = Array.from(section.querySelectorAll("p")).find(
      (element) => element.textContent === "HOW WE BUILD",
    );

    return Boolean(
      cta &&
      howWeBuild &&
      howWeBuild.compareDocumentPosition(cta) & Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });
  expect(ctaFollowsHowWeBuild).toBe(true);
});

test("제작 원칙 상세 레이어를 열고 키보드로 닫을 수 있다", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.getByTestId("jabin-intro").dispatchEvent("pointerdown");
  await expect(page.getByTestId("jabin-intro")).toBeHidden();
  await page.evaluate(() => document.fonts.ready);

  const designTrigger = page.getByRole("button", { name: /똑같은 디자인을 만들지 않습니다/ });
  await designTrigger.scrollIntoViewIfNeeded();
  await expect(designTrigger.locator("..")).toHaveCSS("transform", "none");
  await expect
    .poll(async () => {
      await designTrigger.hover({ position: { x: 100, y: 80 } });
      const [scale, background] = await Promise.all([
        designTrigger
          .locator(".principle-title")
          .evaluate((element) => getComputedStyle(element).scale),
        designTrigger.evaluate((element) => getComputedStyle(element).backgroundColor),
      ]);
      return `${scale}|${background}`;
    })
    .toBe("1.035|rgb(246, 246, 246)");
  await designTrigger.screenshot({ path: "test-results/principle-entry-hover-desktop.png" });
  await designTrigger.click();

  const designDialog = page.getByRole("dialog", { name: /좋은 디자인은/ });
  await expect(designDialog).toBeVisible();
  await expect(designDialog).toHaveCSS("transform", "none");
  await expect(designDialog).toHaveCSS("width", "1040px");
  await expectNoHorizontalOverflow(page);
  await expect(designDialog.getByText("어떤 서비스인가", { exact: true })).toBeVisible();
  const contentGap = await designDialog.evaluate((dialog) => {
    const panel = dialog.querySelector<HTMLElement>("[data-testid='design-stage-panel']");
    const closing = dialog.querySelector<HTMLElement>("[data-testid='design-closing']");

    return panel && closing
      ? closing.getBoundingClientRect().top - panel.getBoundingClientRect().bottom
      : Number.POSITIVE_INFINITY;
  });
  expect(contentGap).toBeLessThanOrEqual(96);
  await page.screenshot({ path: "test-results/principle-design-talk-desktop.png" });
  await designDialog.getByTestId("design-closing").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "test-results/principle-design-closing-desktop.png" });
  await designDialog.locator(".overflow-y-auto").evaluate((content) => content.scrollTo(0, 0));
  await expect(designDialog.locator(".design-stage-progress")).toHaveCSS(
    "animation-duration",
    "4s",
  );
  await page.mouse.move(10, 10);
  await expect(designDialog.getByRole("tab", { name: /EXPLORE/ })).toHaveAttribute(
    "aria-selected",
    "true",
    { timeout: 5_000 },
  );
  await designDialog.getByRole("button", { name: "단계 자동 재생 멈춤" }).click();
  await expect(designDialog.getByRole("button", { name: "단계 자동 재생 시작" })).toBeVisible();
  await designDialog.getByRole("tab", { name: /EXPLORE/ }).click();
  await expect(designDialog.getByText("좋은 건 전부 찾아봅니다.")).toBeVisible();
  await expect(designDialog.getByText("KEEP / CONTENT RHYTHM")).toBeVisible();
  await designDialog
    .getByTestId("design-stage-artifact")
    .screenshot({ path: "test-results/principle-design-reference-desktop.png" });
  await designDialog.getByRole("tab", { name: /DIRECTION/ }).click();
  await expect(designDialog.getByText("# THIS SHOULD FEEL LIKE", { exact: false })).toBeVisible();
  await expect(designDialog.getByText("v0.5 / REFINED", { exact: true })).toBeVisible();
  await designDialog
    .getByTestId("design-stage-artifact")
    .screenshot({ path: "test-results/principle-design-md-desktop.png" });
  await designDialog.getByRole("tab", { name: /REVIEW/ }).click();
  await expect(designDialog.getByText("CLIENT REVIEW", { exact: true })).toBeVisible();
  await expect(designDialog.getByText(/방향은 맞지만 조금 더 우리답게/)).toBeVisible();
  await designDialog.getByRole("tab", { name: /SYSTEM/ }).click();
  await expect(designDialog.getByText("PAGE OUTPUT → REUSABLE DESIGN SYSTEM")).toBeVisible();
  await designDialog
    .getByTestId("design-stage-artifact")
    .screenshot({ path: "test-results/principle-design-loop-desktop.png" });
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe("hidden");
  await page.screenshot({ path: "test-results/principle-detail-desktop.png" });

  await page.setViewportSize({ width: 768, height: 900 });
  await expect(designDialog).toHaveCSS("width", "768px");
  await designDialog.locator(".overflow-y-auto").evaluate((content) => content.scrollTo(0, 0));
  await page.screenshot({ path: "test-results/principle-design-tablet.png" });

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(designDialog).toHaveCSS("width", "390px");
  await designDialog.locator(".overflow-y-auto").evaluate((content) => content.scrollTo(0, 0));
  await page.screenshot({ path: "test-results/principle-design-mobile.png" });
  await designDialog
    .getByTestId("design-stage-artifact")
    .screenshot({ path: "test-results/principle-design-loop-mobile.png" });
  await designDialog.getByRole("tab", { name: /DIRECTION/ }).click();
  await designDialog
    .getByTestId("design-stage-artifact")
    .screenshot({ path: "test-results/principle-design-md-mobile.png" });
  await designDialog.getByRole("tab", { name: /EXPLORE/ }).click();
  await designDialog
    .getByTestId("design-stage-artifact")
    .screenshot({ path: "test-results/principle-design-reference-mobile.png" });

  await page.keyboard.press("Escape");
  await expect(designDialog).toBeHidden();
  await expect(designTrigger).toBeFocused();

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.getByRole("button", { name: /어정쩡한 프로젝트를 만들지 않습니다/ }).click();
  const buildDialog = page.getByRole("dialog", { name: /우리는 화면이 아니라/ });
  await expect(buildDialog).toBeVisible();
  await expect(buildDialog).toHaveCSS("transform", "none");
  await expect(buildDialog.getByText("PRODUCT BUILD / AUTO", { exact: true })).toBeVisible();
  await expect(buildDialog.getByText("만들기 전에 구조부터 잡습니다.")).toBeVisible();
  await buildDialog.getByRole("button", { name: "단계 자동 재생 멈춤" }).click();
  await buildDialog
    .getByTestId("build-stage-artifact")
    .screenshot({ path: "test-results/principle-build-architecture-desktop.png" });
  const developmentTab = buildDialog.getByRole("tab", { name: /DEVELOPMENT/ });
  const architectureTab = buildDialog.getByRole("tab", { name: /ARCHITECTURE/ });
  await developmentTab.click();
  await expect(
    buildDialog.getByText("버튼이 있는 것과, 버튼이 작동하는 것은 다릅니다."),
  ).toBeVisible();
  await expect(developmentTab).toHaveCSS("background-color", "rgb(24, 75, 186)");
  await expect(architectureTab).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await buildDialog
    .getByTestId("build-stage-artifact")
    .screenshot({ path: "test-results/principle-build-development-desktop.png" });
  await buildDialog.getByRole("tab", { name: /QUALITY/ }).click();
  await expect(buildDialog.getByText("‘돌아갑니다’에서 끝내지 않습니다.")).toBeVisible();
  await buildDialog.getByRole("tab", { name: /SECURITY/ }).click();
  await expect(buildDialog.getByText("보안은 마지막에 붙이지 않습니다.")).toBeVisible();
  const deployTab = buildDialog.getByRole("tab", { name: /DEPLOY/ });
  await deployTab.click();
  await expect(buildDialog.getByText("READY FOR PRODUCTION / READY FOR REAL USERS")).toBeVisible();
  await expect(deployTab).toHaveCSS("background-color", "rgb(24, 75, 186)");
  await buildDialog
    .getByTestId("build-stage-artifact")
    .screenshot({ path: "test-results/principle-build-deploy-desktop.png" });
  await buildDialog.locator(".overflow-y-auto").evaluate((content) => content.scrollTo(0, 0));
  await page.screenshot({ path: "test-results/principle-build-desktop.png" });

  await page.setViewportSize({ width: 390, height: 844 });
  await buildDialog.locator(".overflow-y-auto").evaluate((content) => content.scrollTo(0, 0));
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: "test-results/principle-build-mobile.png" });
  await buildDialog
    .getByTestId("build-stage-artifact")
    .screenshot({ path: "test-results/principle-build-deploy-mobile.png" });
  await page.getByRole("button", { name: "상세 내용 닫기" }).last().click();

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.getByRole("button", { name: /만들고, 운영까지 책임집니다/ }).click();
  const operateDialog = page.getByRole("dialog", { name: /서비스마다 정답인/ });
  await expect(operateDialog).toBeVisible();
  await expect(operateDialog).toHaveCSS("transform", "none");
  await expect(operateDialog.getByText("SERVICE OPERATION / AUTO", { exact: true })).toBeVisible();
  await expect(operateDialog.getByText("서비스에 맞는 인프라를 고릅니다.")).toBeVisible();
  await operateDialog.getByRole("button", { name: "단계 자동 재생 멈춤" }).click();
  const chooseTab = operateDialog.getByRole("tab", { name: /CHOOSE/ });
  const monitorTab = operateDialog.getByRole("tab", { name: /MONITOR/ });
  await expect(
    operateDialog.getByText("우리가 가진 서버를 파는 것이 아니라, 서비스에 맞는 서버를 고릅니다."),
  ).toBeVisible();
  await expect(chooseTab).toHaveCSS("background-color", "rgb(24, 75, 186)");
  await operateDialog
    .getByTestId("operate-decision-artifact")
    .screenshot({ path: "test-results/principle-operate-artifact-desktop.png" });
  await operateDialog.getByRole("tab", { name: /DEPLOY/ }).click();
  await expect(operateDialog.getByText("운영할 수 있는 환경을 만듭니다.")).toBeVisible();
  await monitorTab.click();
  await expect(operateDialog.getByText("문제가 생길 때까지 기다리지 않습니다.")).toBeVisible();
  await expect(monitorTab).toHaveCSS("background-color", "rgb(24, 75, 186)");
  await expect(chooseTab).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await operateDialog
    .getByTestId("operate-stage-artifact")
    .screenshot({ path: "test-results/principle-operate-monitor-desktop.png" });
  await operateDialog.getByRole("tab", { name: /PROTECT/ }).click();
  await expect(operateDialog.getByText("데이터와 서비스를 보호합니다.")).toBeVisible();
  await operateDialog.getByRole("tab", { name: /OPTIMIZE/ }).click();
  await expect(operateDialog.getByText("비용도 운영의 일부입니다.")).toBeVisible();
  await operateDialog
    .getByTestId("operate-stage-artifact")
    .screenshot({ path: "test-results/principle-operate-optimize-desktop.png" });
  await monitorTab.click();
  await expect(monitorTab).toHaveCSS("background-color", "rgb(24, 75, 186)");
  await page.screenshot({ path: "test-results/principle-operate-monitor-panel-desktop.png" });
  await operateDialog.locator(".overflow-y-auto").evaluate((content) => content.scrollTo(0, 0));
  await page.screenshot({ path: "test-results/principle-operate-desktop.png" });

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(operateDialog).toHaveCSS("width", "390px");
  await operateDialog
    .getByTestId("operate-stage-artifact")
    .screenshot({ path: "test-results/principle-operate-monitor-mobile.png" });
  await page.screenshot({ path: "test-results/principle-operate-monitor-panel-mobile.png" });
  await operateDialog.locator(".overflow-y-auto").evaluate((content) => content.scrollTo(0, 0));
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: "test-results/principle-operate-mobile.png" });
  await page.getByRole("button", { name: "상세 내용 닫기" }).last().click();

  await page.emulateMedia({ reducedMotion: "reduce" });
  await designTrigger.click();
  await expect(page.getByRole("dialog", { name: /좋은 디자인은/ })).toBeVisible();
  await expect(page.locator(".design-stage-progress")).toHaveCount(0);
  await expect(page.getByRole("button", { name: /단계 자동 재생/ })).toHaveCount(0);
});

test("첫 방문에서 JABIN 인트로가 재생되고 자동 종료된다", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const intro = page.getByTestId("jabin-intro");
  await expect(intro).toBeVisible();
  await expect(page.getByRole("heading", { name: "JABIN", exact: true })).toBeAttached();
  await expect(intro.locator(".jabin-intro__letter")).toHaveCount(5);
  await expect(intro.locator(".jabin-intro__signature")).toHaveCount(0);
  await expect(intro.getByRole("button", { name: /준비/ }).locator("img")).toHaveAttribute(
    "src",
    /jabin-logo-word/,
  );
  await expect(intro.getByRole("button", { name: /준비/ })).toBeAttached();
  await expect
    .poll(async () => Number(await intro.getAttribute("data-progress")))
    .toBeGreaterThanOrEqual(92);
  await expect(intro).toBeHidden({ timeout: 6_000 });
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await expect(page.getByRole("heading", { name: "JABIN", exact: true })).toBeVisible();
});

test("JABIN 인트로는 키보드로 건너뛸 수 있다", async ({ page }) => {
  await page.goto("/");

  const intro = page.getByTestId("jabin-intro");
  await expect(intro).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await page.keyboard.press("Enter");
  await expect(intro).toHaveCount(0);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
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

test("문의 유형에 따라 질문이 바뀌고 작성한 내용을 유지한다", async ({ page }) => {
  await page.goto("/#contact");
  await page.getByTestId("jabin-intro").dispatchEvent("pointerdown");

  const inquiry = page.locator("#contact");
  const formReveal = inquiry.locator("form").locator("..");
  await expect(formReveal).toHaveCSS("transform", "none");
  await expect(formReveal).toHaveCSS("opacity", "1");
  await expect(page.locator("#approach + #contact")).toHaveCount(1);
  await expect(inquiry.getByText("지금 어떤 단계에 있으신가요?", { exact: true })).toHaveCount(0);
  await expect(inquiry.getByRole("button", { name: "프로젝트 문의" })).toHaveCount(0);
  await expect(inquiry.getByRole("link", { name: "hello@jabinstudio.com" })).toHaveCount(0);

  const conceptChoice = inquiry.getByRole("button", {
    name: /아이디어를 구체화하고 싶으신가요/,
  });
  const sectionLabel = inquiry.getByText("START A PROJECT", { exact: true });
  const headerBottom = await page
    .getByRole("banner")
    .evaluate((element) => element.getBoundingClientRect().bottom);
  const conceptTop = await conceptChoice.evaluate((element) => element.getBoundingClientRect().top);
  expect(headerBottom).toBeLessThan(conceptTop);
  const sectionLabelBottom = await sectionLabel.evaluate(
    (element) => element.getBoundingClientRect().bottom,
  );
  expect(sectionLabelBottom).toBeLessThan(conceptTop);

  const improvementChoice = inquiry.getByRole("button", {
    name: /운영 중인 서비스를 개선하고 싶으신가요/,
  });
  const inquiryHeading = inquiry.getByRole("heading", {
    name: /지금 가진 것부터, 함께 시작합니다/,
  });
  const improvementBottom = await improvementChoice.evaluate(
    (element) => element.getBoundingClientRect().bottom,
  );
  const inquiryHeadingTop = await inquiryHeading.evaluate(
    (element) => element.getBoundingClientRect().top,
  );
  expect(improvementBottom).toBeLessThan(inquiryHeadingTop);

  await conceptChoice.click();
  const idea = inquiry.getByLabel("어떤 서비스를 구상하고 계신가요? *");
  await expect(idea).toBeVisible();
  const continuationChoice = inquiry.getByRole("button", {
    name: /진행 중인 프로젝트가 있으신가요/,
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
    inquiry.getByRole("button", { name: /진행 중인 프로젝트가 있으신가요/ }),
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
