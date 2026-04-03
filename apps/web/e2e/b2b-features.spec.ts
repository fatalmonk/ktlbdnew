import { test, expect } from "@playwright/test";

/**
 * E2E Tests for B2B Features
 * Tests for new case studies, certifications, sustainability, RFQ, and chatbot features
 */

test.describe("B2B Features E2E Tests", () => {
  test.describe("Case Studies", () => {
    test("should load case studies index page", async ({ page }) => {
      await page.goto("/case-studies");
      await expect(page).toHaveTitle(/Success Stories.*Case Studies/i);
      await expect(page.locator("h1")).toContainText(/Success Stories/i);
    });

    test("should filter case studies by industry", async ({ page }) => {
      await page.goto("/case-studies");

      // Wait for page to load
      await page.waitForSelector("select");

      // Filter by industry
      const industryFilter = page.locator("select").first();
      await industryFilter.selectOption({ label: /Fashion/i });

      // Verify filtered results
      await expect(page.locator('[class*="case"]')).toHaveCount({ min: 1 });
    });

    test("should navigate to case study detail", async ({ page }) => {
      await page.goto("/case-studies");

      // Click first case study
      await page.locator('a[href*="/case-studies/"]').first().click();

      // Verify detail page loaded
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("text=/challenge/i")).toBeVisible();
    });
  });

  test.describe("Certifications", () => {
    test("should load certifications hub", async ({ page }) => {
      await page.goto("/certifications");
      await expect(page).toHaveTitle(/Certifications.*Compliance/i);
      await expect(page.locator("h1")).toContainText(/Certifications/i);
    });

    test("should display certification badges", async ({ page }) => {
      await page.goto("/certifications");

      // Verify certification cards are displayed
      const certificationCards = page
        .locator('[class*="certification"]')
        .or(page.locator('[class*="badge"]'));
      await expect(certificationCards.first()).toBeVisible();
    });

    test("should filter certifications by category", async ({ page }) => {
      await page.goto("/certifications");

      // Select category filter
      await page
        .locator("select")
        .first()
        .selectOption({ label: /Quality/i });

      // Verify results are filtered
      await expect(page.locator("body")).toContainText(/ISO/i);
    });
  });

  test.describe("Sustainability Dashboard", () => {
    test("should load sustainability dashboard", async ({ page }) => {
      await page.goto("/sustainability");
      await expect(page).toHaveTitle(/Sustainability.*ESG/i);
      await expect(page.locator("h1")).toContainText(/Sustainability/i);
    });

    test("should display sustainability metrics", async ({ page }) => {
      await page.goto("/sustainability");

      // Verify metrics are visible
      await expect(page.locator("text=/45%/i")).toBeVisible(); // Renewable energy
      await expect(page.locator("text=/78%/i")).toBeVisible(); // Waste recycling
    });

    test("should filter metrics by category", async ({ page }) => {
      await page.goto("/sustainability");

      // Click category filter
      await page.locator('button:has-text("Environmental")').click();

      // Verify environmental metrics are shown
      await expect(page.locator("text=/water/i")).toBeVisible();
    });
  });

  test.describe("RFQ Form", () => {
    test("should load RFQ form", async ({ page }) => {
      await page.goto("/rfq");
      await expect(page).toHaveTitle(/Request.*Quote/i);
      await expect(page.locator("h1")).toContainText(/Request.*Quote/i);
    });

    test("should navigate through RFQ steps", async ({ page }) => {
      await page.goto("/rfq");

      // Step 1: Select a product
      await page.locator('input[type="checkbox"]').first().check();
      await page.locator('button:has-text("Next")').click();

      // Step 2: Should show specifications
      await expect(page.locator("text=/Specify Quantities/i")).toBeVisible();

      // Enter quantity
      await page.locator('input[type="number"]').first().fill("1000");
      await page.locator('button:has-text("Next")').click();

      // Step 3: Should show requirements
      await expect(page.locator("text=/Requirements/i")).toBeVisible();
    });

    test("should validate required fields", async ({ page }) => {
      await page.goto("/rfq");

      // Try to proceed without selection
      const nextButton = page.locator('button:has-text("Next")');
      await expect(nextButton).toBeDisabled();

      // Select a product
      await page.locator('input[type="checkbox"]').first().check();

      // Next button should now be enabled
      await expect(nextButton).toBeEnabled();
    });
  });

  test.describe("Chatbot Widget", () => {
    test("should display chatbot button", async ({ page }) => {
      await page.goto("/");

      // Chatbot button should be visible
      const chatbotButton = page
        .locator('button:has([class*="MessageCircle"])')
        .or(page.locator('[class*="chatbot"]').first());
      await expect(chatbotButton).toBeVisible();
    });

    test("should open chatbot on click", async ({ page }) => {
      await page.goto("/");

      // Click chatbot button
      await page.locator('button:has([class*="MessageCircle"])').click();

      // Chat window should appear
      await expect(page.locator("text=/KTL Support/i")).toBeVisible();
    });

    test("should send message in chatbot", async ({ page }) => {
      await page.goto("/");

      // Open chatbot
      await page.locator('button:has([class*="MessageCircle"])').click();

      // Type and send message
      const input = page.locator('input[placeholder*="message"]');
      await input.fill("Hello");
      await input.press("Enter");

      // Should see user message
      await expect(page.locator("text=/Hello/i")).toBeVisible();
    });
  });

  test.describe("Navigation", () => {
    test("should have updated navigation with new sections", async ({
      page,
    }) => {
      await page.goto("/");

      // Verify Investor Relations exists
      await expect(
        page.locator("nav").locator("text=/Investor Relations/i"),
      ).toBeVisible();

      // Verify Trust & Compliance exists
      await expect(
        page.locator("nav").locator("text=/Trust.*Compliance/i"),
      ).toBeVisible();
    });

    test("should navigate to certifications from menu", async ({ page }) => {
      await page.goto("/");

      // Open Trust & Compliance menu
      await page.locator("text=/Trust.*Compliance/i").click();

      // Click certifications link
      await page.locator('a[href="/certifications"]').click();

      // Should be on certifications page
      await expect(page).toHaveURL(/.*certifications/);
    });

    test("should navigate to RFQ from Work With Us menu", async ({ page }) => {
      await page.goto("/");

      // Open Work With Us menu
      await page.locator("text=/Work With Us/i").click();

      // Click RFQ link
      await page.locator('a[href="/rfq"]').click();

      // Should be on RFQ page
      await expect(page).toHaveURL(/.*rfq/);
    });
  });

  test.describe("Homepage Enhancements", () => {
    test("should display trust bar with stats", async ({ page }) => {
      await page.goto("/");

      // Verify trust stats are visible
      await expect(page.locator("text=/20\\+/i")).toBeVisible(); // Years in business
      await expect(page.locator("text=/500\\+/i")).toBeVisible(); // Global clients
    });

    test("should display featured case study section", async ({ page }) => {
      await page.goto("/");

      // Scroll to case studies section
      await page.locator("text=/Success Stories/i").scrollIntoViewIfNeeded();

      // Verify featured case study is visible
      await expect(page.locator("text=/Featured Case Study/i")).toBeVisible();
    });

    test("should display certification showcase", async ({ page }) => {
      await page.goto("/");

      // Scroll to certifications
      await page.locator("text=/Certified.*Quality/i").scrollIntoViewIfNeeded();

      // Verify certifications are shown
      await expect(page.locator("text=/ISO 9001/i")).toBeVisible();
    });

    test("should display sustainability snapshot", async ({ page }) => {
      await page.goto("/");

      // Scroll to sustainability section
      await page
        .locator("text=/Committed to.*Sustainability/i")
        .scrollIntoViewIfNeeded();

      // Verify metrics are shown
      await expect(page.locator("text=/Renewable Energy/i")).toBeVisible();
    });

    test("should have CTA buttons linking to RFQ and contact", async ({
      page,
    }) => {
      await page.goto("/");

      // Scroll to bottom CTA
      await page
        .locator("text=/Ready to Start Your Next Project/i")
        .scrollIntoViewIfNeeded();

      // Verify CTA buttons exist
      await expect(page.locator('a[href="/rfq"]')).toBeVisible();
      await expect(page.locator('a[href="/contact"]')).toBeVisible();
    });
  });
});
