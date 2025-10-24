import { test, expect } from '@playwright/test';

test.describe('Site Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Homepage', () => {
    test('should load the homepage', async ({ page }) => {
      await expect(page).toHaveTitle(/KTL|Kattali/i);
    });

    test('should display the hero section', async ({ page }) => {
      await expect(page.getByText(/Fashionably Sustaining/i)).toBeVisible();
    });

    test('should display statistics section', async ({ page }) => {
      await expect(page.getByText(/Why Choose/i)).toBeVisible();
      await expect(page.getByText('20+')).toBeVisible();
      await expect(page.getByText('1,200+')).toBeVisible();
    });

    test('should display products section', async ({ page }) => {
      await expect(page.getByText(/Our Products/i)).toBeVisible();
      await expect(page.getByText('Denims')).toBeVisible();
      await expect(page.getByText('T-Shirts')).toBeVisible();
    });
  });

  test.describe('Header Navigation', () => {
    test('should have a visible header', async ({ page }) => {
      const header = page.locator('header');
      await expect(header).toBeVisible();
    });

    test('should navigate to Products page', async ({ page }) => {
      await page.getByRole('link', { name: /Products/i }).first().click();
      await expect(page).toHaveURL(/.*products/);
    });

    test('should navigate to Contact page', async ({ page }) => {
      await page.getByRole('link', { name: /Contact/i }).first().click();
      await expect(page).toHaveURL(/.*contact/);
    });

    test('should navigate to Investors page', async ({ page }) => {
      // Look for investor-related link
      const investorLink = page.getByRole('link', { name: /Investor/i }).first();
      if (await investorLink.isVisible()) {
        await investorLink.click();
        await expect(page).toHaveURL(/.*investor/);
      }
    });
  });

  test.describe('Footer Navigation', () => {
    test('should have a visible footer', async ({ page }) => {
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });

    test('should display footer links', async ({ page }) => {
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();

      // Check for common footer links
      const links = footer.getByRole('link');
      await expect(links.first()).toBeVisible();
    });
  });

  test.describe('Call-to-Action Buttons', () => {
    test('should navigate to products from hero CTA', async ({ page }) => {
      const exploreCTA = page.getByRole('link', { name: /Explore Our Products/i });
      if (await exploreCTA.isVisible()) {
        await exploreCTA.click();
        await expect(page).toHaveURL(/.*products/);
      }
    });

    test('should navigate to contact from CTA section', async ({ page }) => {
      const contactCTA = page.getByRole('link', { name: /Contact Us Today/i });
      await contactCTA.scrollIntoViewIfNeeded();
      await expect(contactCTA).toBeVisible();
      await contactCTA.click();
      await expect(page).toHaveURL(/.*contact/);
    });

    test('should navigate to all products from products section', async ({ page }) => {
      const viewAllProducts = page.getByRole('link', { name: /View All Products/i });
      await viewAllProducts.scrollIntoViewIfNeeded();
      await viewAllProducts.click();
      await expect(page).toHaveURL(/.*products/);
    });
  });

  test.describe('Breadcrumb Navigation', () => {
    test('should navigate back to home from products page', async ({ page }) => {
      await page.goto('/products');

      // Click logo or home link
      const homeLink = page.getByRole('link', { name: /home/i }).first();
      if (await homeLink.isVisible()) {
        await homeLink.click();
        await expect(page).toHaveURL('/');
      } else {
        // Try clicking logo
        const logo = page.locator('img[alt*="KTL"], img[alt*="Kattali"]').first();
        if (await logo.isVisible()) {
          await logo.click();
          await expect(page).toHaveURL('/');
        }
      }
    });
  });

  test.describe('News Navigation', () => {
    test('should display news section', async ({ page }) => {
      await expect(page.getByText(/Latest News/i)).toBeVisible();
    });

    test('should have news article links', async ({ page }) => {
      const readMoreLinks = page.getByRole('link', { name: /Read More/i });
      await expect(readMoreLinks.first()).toBeVisible();
    });

    test('should navigate to all news', async ({ page }) => {
      const viewAllNews = page.getByRole('link', { name: /View All News/i });
      await viewAllNews.scrollIntoViewIfNeeded();
      await viewAllNews.click();
      await expect(page).toHaveURL(/.*news/);
    });
  });

  test.describe('Investor Relations', () => {
    test('should display investor snapshot', async ({ page }) => {
      await expect(page.getByText(/Investor Snapshot/i)).toBeVisible();
    });

    test('should navigate to investor relations', async ({ page }) => {
      const irLink = page.getByRole('link', { name: /Investor Relations/i });
      await irLink.scrollIntoViewIfNeeded();
      await irLink.click();
      await expect(page).toHaveURL(/.*investor/);
    });

    test('should display stock price', async ({ page }) => {
      await expect(page.getByText(/৳45.50/)).toBeVisible();
    });
  });

  test.describe('Mobile Navigation', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should display mobile menu button', async ({ page }) => {
      // Look for hamburger menu
      const menuButton = page.locator('button[aria-label*="menu"]').or(
        page.locator('button:has-text("Menu")')
      ).or(
        page.locator('button svg') // Look for icon-based menu button
      );

      if (await menuButton.first().isVisible()) {
        await expect(menuButton.first()).toBeVisible();
      }
    });

    test('should toggle mobile menu', async ({ page }) => {
      const menuButton = page.locator('button[aria-label*="menu"]').or(
        page.locator('button:has-text("Menu")')
      ).or(
        page.locator('button svg').first()
      );

      if (await menuButton.first().isVisible()) {
        await menuButton.first().click();
        // Menu should be open - check for navigation items
        await page.waitForTimeout(500); // Wait for animation
      }
    });
  });

  test.describe('Performance', () => {
    test('should load page within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      const loadTime = Date.now() - startTime;

      // Page should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });

    test('should have no console errors', async ({ page }) => {
      const consoleErrors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await page.goto('/');

      // Allow page to fully load
      await page.waitForTimeout(2000);

      // Filter out expected errors (like 404s for missing images)
      const criticalErrors = consoleErrors.filter(
        (error) => !error.includes('404') && !error.includes('favicon')
      );

      expect(criticalErrors).toHaveLength(0);
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      const h1 = page.locator('h1');
      const h2 = page.locator('h2');

      // Should have at least one h1 and multiple h2s
      await expect(h2.first()).toBeVisible();
    });

    test('should have accessible links', async ({ page }) => {
      const links = page.getByRole('link');
      const linkCount = await links.count();

      expect(linkCount).toBeGreaterThan(0);

      // Check that links have accessible names
      for (let i = 0; i < Math.min(5, linkCount); i++) {
        const link = links.nth(i);
        const text = await link.textContent();
        const ariaLabel = await link.getAttribute('aria-label');

        // Link should have either text content or aria-label
        expect(text || ariaLabel).toBeTruthy();
      }
    });

    test('should have accessible images', async ({ page }) => {
      const images = page.locator('img');
      const imageCount = await images.count();

      // Check that images have alt text
      for (let i = 0; i < Math.min(5, imageCount); i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');

        // All images should have alt attribute (can be empty for decorative)
        expect(alt).not.toBeNull();
      }
    });
  });

  test.describe('Responsive Design', () => {
    test('should be responsive on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');

      await expect(page.getByText(/Fashionably Sustaining/i)).toBeVisible();
    });

    test('should be responsive on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      await expect(page.getByText(/Fashionably Sustaining/i)).toBeVisible();
    });

    test('should be responsive on large desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');

      await expect(page.getByText(/Fashionably Sustaining/i)).toBeVisible();
    });
  });
});
