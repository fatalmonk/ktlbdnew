# Testing Guide - KTL Website

This document provides comprehensive guidance for testing the KTL website using Vitest and Playwright.

**Last Updated:** October 23, 2025

---

## 📋 Table of Contents

- [Overview](#overview)
- [Testing Stack](#testing-stack)
- [Quick Start](#quick-start)
- [Unit & Component Testing (Vitest)](#unit--component-testing-vitest)
- [End-to-End Testing (Playwright)](#end-to-end-testing-playwright)
- [Writing Tests](#writing-tests)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [CI/CD Integration](#cicd-integration)

---

## Overview

The KTL website uses a comprehensive testing strategy with two main testing frameworks:

1. **Vitest** - Fast unit and component testing for React components
2. **Playwright** - End-to-end testing across multiple browsers

### Testing Philosophy

- **Test user behavior, not implementation details**
- **Write tests that give you confidence**
- **Keep tests fast and focused**
- **Maintain high test coverage (70%+ target)**

---

## Testing Stack

### Core Dependencies

```json
{
  "vitest": "^4.0.1",
  "@vitest/ui": "^4.0.1",
  "@playwright/test": "^1.56.1",
  "@testing-library/react": "^16.3.0",
  "@testing-library/jest-dom": "^6.9.1",
  "@testing-library/user-event": "^14.6.1",
  "jsdom": "^27.0.1"
}
```

### Test Environment

- **Unit/Component Tests**: jsdom (browser-like environment)
- **E2E Tests**: Real browsers (Chromium, Firefox, WebKit)

---

## Quick Start

### Running All Tests

```bash
# Run all unit tests
npm test

# Run all tests (unit + E2E)
npm run test:all
```

### Running Specific Test Types

```bash
# Unit/Component Tests
npm run test              # Watch mode
npm run test:ui           # Interactive UI
npm run test:run          # Run once
npm run test:coverage     # With coverage report

# E2E Tests
npm run test:e2e          # Headless mode
npm run test:e2e:ui       # Interactive UI
npm run test:e2e:headed   # See browser
npm run test:e2e:debug    # Debug mode
npm run test:e2e:report   # View HTML report
```

### Running Specific Test Files

```bash
# Unit tests
npm run test Button.test.tsx
npm run test src/components/

# E2E tests
npx playwright test navigation.spec.ts
npx playwright test --grep "Homepage"
```

---

## Unit & Component Testing (Vitest)

### Configuration

Located in `vitest.config.ts`:

- **Environment**: jsdom
- **Setup File**: `src/test/vitest-setup.ts`
- **Coverage**: v8 provider, 70% thresholds
- **Globals**: Enabled (no need to import `describe`, `it`, `expect`)

### Test Structure

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen, userEvent } from '../test/test-utils';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const user = userEvent.setup();
    render(<MyComponent />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Clicked')).toBeInTheDocument();
  });
});
```

### Custom Render Function

Use `renderWithRouter` from `test-utils.tsx` for components that use React Router:

```typescript
import { render } from '../test/test-utils';

test('component with routing', () => {
  render(<MyComponent />, { initialRoute: '/products' });
  // Test your component
});
```

### Testing Components

#### 1. Button Component Example

```typescript
import { render, screen, userEvent } from '../test/test-utils';
import Button from './Button';

describe('Button', () => {
  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders different variants', () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary');
  });
});
```

#### 2. Form Component Example

```typescript
import { render, screen, userEvent } from '../test/test-utils';
import ContactForm from './ContactForm';

describe('ContactForm', () => {
  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  });

  it('submits valid form', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<ContactForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(handleSubmit).toHaveBeenCalled();
  });
});
```

### Testing Pages

```typescript
import { render, screen } from '../test/test-utils';
import Home from './Home';

describe('Home Page', () => {
  it('renders hero section', () => {
    render(<Home />);
    expect(screen.getByText(/Fashionably Sustaining/i)).toBeInTheDocument();
  });

  it('displays all product categories', () => {
    render(<Home />);
    expect(screen.getByText('Denims')).toBeInTheDocument();
    expect(screen.getByText('T-Shirts')).toBeInTheDocument();
  });
});
```

### Mocking

#### Mock Components

```typescript
import { vi } from 'vitest';

vi.mock('../components/KTLHero', () => ({
  default: ({ title, subtitle }: any) => (
    <div data-testid="ktl-hero">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  ),
}));
```

#### Mock API Calls

```typescript
import { vi } from 'vitest';

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'mocked' }),
  })
);
```

### Coverage Reports

```bash
npm run test:coverage
```

Coverage reports are generated in:
- **Terminal**: Text summary
- **HTML**: `coverage/index.html`
- **LCOV**: `coverage/lcov.info`

**Coverage Thresholds:**
- Lines: 70%
- Functions: 70%
- Branches: 70%
- Statements: 70%

---

## End-to-End Testing (Playwright)

### Configuration

Located in `playwright.config.ts`:

- **Test Directory**: `./e2e`
- **Base URL**: `http://localhost:5173`
- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Auto-start**: Dev server automatically starts before tests

### Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should perform action', async ({ page }) => {
    await page.getByRole('button', { name: /click me/i }).click();
    await expect(page.getByText('Success')).toBeVisible();
  });
});
```

### Navigation Testing

```typescript
test('should navigate to products page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /products/i }).click();
  await expect(page).toHaveURL(/.*products/);
});
```

### Form Testing

```typescript
test('should submit contact form', async ({ page }) => {
  await page.goto('/contact');

  await page.getByLabel(/name/i).fill('John Doe');
  await page.getByLabel(/email/i).fill('john@example.com');
  await page.getByLabel(/message/i).fill('Test message');

  await page.getByRole('button', { name: /submit/i }).click();

  await expect(page.getByText(/thank you/i)).toBeVisible();
});
```

### Mobile Testing

```typescript
test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should open mobile menu', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /menu/i }).click();
    await expect(page.getByRole('navigation')).toBeVisible();
  });
});
```

### Accessibility Testing

```typescript
test('should have accessible navigation', async ({ page }) => {
  await page.goto('/');

  const links = page.getByRole('link');
  const linkCount = await links.count();

  expect(linkCount).toBeGreaterThan(0);

  // Check that links have accessible names
  for (let i = 0; i < linkCount; i++) {
    const link = links.nth(i);
    const text = await link.textContent();
    const ariaLabel = await link.getAttribute('aria-label');
    expect(text || ariaLabel).toBeTruthy();
  }
});
```

### Screenshot Testing

```typescript
test('should match homepage screenshot', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png');
});
```

### Performance Testing

```typescript
test('should load within acceptable time', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('/');
  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(5000);
});
```

---

## Writing Tests

### Test Naming Conventions

**Good Test Names:**
```typescript
✅ 'should display error when email is invalid'
✅ 'should navigate to products page when clicking link'
✅ 'should submit form with valid data'
```

**Poor Test Names:**
```typescript
❌ 'test 1'
❌ 'it works'
❌ 'form test'
```

### Test Organization

```typescript
describe('ComponentName', () => {
  describe('Rendering', () => {
    // Tests for basic rendering
  });

  describe('User Interactions', () => {
    // Tests for clicks, typing, etc.
  });

  describe('Edge Cases', () => {
    // Tests for error states, empty states, etc.
  });

  describe('Accessibility', () => {
    // Tests for a11y concerns
  });
});
```

### What to Test

**✅ DO Test:**
- User interactions (clicks, typing, form submissions)
- Visual feedback (error messages, success states)
- Navigation and routing
- Accessibility (ARIA labels, keyboard navigation)
- Edge cases and error states
- Critical user flows

**❌ DON'T Test:**
- Implementation details (internal state, private methods)
- Third-party libraries
- CSS styles (unless critical to functionality)
- Exact HTML structure (unless it affects accessibility)

### Queries Priority

Use queries in this order (as recommended by Testing Library):

1. **getByRole** (preferred) - Most accessible
   ```typescript
   screen.getByRole('button', { name: /submit/i })
   ```

2. **getByLabelText** - Form elements
   ```typescript
   screen.getByLabelText(/email address/i)
   ```

3. **getByPlaceholderText** - Forms without labels
   ```typescript
   screen.getByPlaceholderText(/enter email/i)
   ```

4. **getByText** - Non-interactive elements
   ```typescript
   screen.getByText(/welcome/i)
   ```

5. **getByTestId** - Last resort
   ```typescript
   screen.getByTestId('custom-element')
   ```

---

## Best Practices

### 1. Keep Tests Independent

```typescript
// ❌ Bad - Tests depend on each other
let user;
test('creates user', () => {
  user = createUser();
});
test('updates user', () => {
  updateUser(user); // Depends on previous test
});

// ✅ Good - Each test is independent
test('creates user', () => {
  const user = createUser();
  expect(user).toBeDefined();
});
test('updates user', () => {
  const user = createUser();
  updateUser(user);
  expect(user.updated).toBe(true);
});
```

### 2. Use Proper Async/Await

```typescript
// ❌ Bad - Missing await
test('async action', () => {
  user.click(button); // Should be awaited
  expect(result).toBeInTheDocument();
});

// ✅ Good - Proper async/await
test('async action', async () => {
  await user.click(button);
  expect(result).toBeInTheDocument();
});
```

### 3. Test Accessibility

```typescript
test('form is accessible', () => {
  render(<ContactForm />);

  // Check for labels
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

  // Check for ARIA attributes
  const submitButton = screen.getByRole('button', { name: /submit/i });
  expect(submitButton).toHaveAttribute('type', 'submit');
});
```

### 4. Use beforeEach for Common Setup

```typescript
describe('MyComponent', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  test('test 1', async () => {
    render(<MyComponent />);
    await user.click(screen.getByRole('button'));
  });

  test('test 2', async () => {
    render(<MyComponent />);
    await user.type(screen.getByRole('textbox'), 'test');
  });
});
```

### 5. Mock External Dependencies

```typescript
// Mock external API calls
vi.mock('../api/client', () => ({
  fetchData: vi.fn(() => Promise.resolve({ data: 'mocked' })),
}));

// Mock window methods
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});
```

### 6. Test Error States

```typescript
test('displays error when API fails', async () => {
  // Mock API failure
  global.fetch = vi.fn(() => Promise.reject(new Error('API Error')));

  render(<MyComponent />);

  await waitFor(() => {
    expect(screen.getByText(/error occurred/i)).toBeInTheDocument();
  });
});
```

### 7. Use Testing Library Utilities

```typescript
import { waitFor, within } from '@testing-library/react';

// Wait for async updates
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});

// Query within specific element
const sidebar = screen.getByRole('complementary');
within(sidebar).getByText('Menu Item');
```

---

## Troubleshooting

### Common Issues

#### 1. "Not wrapped in act(...)" Warning

**Problem:** State updates happening outside of React's act()

**Solution:**
```typescript
// Use waitFor for async updates
await waitFor(() => {
  expect(screen.getByText('Updated')).toBeInTheDocument();
});
```

#### 2. "Element is not visible" in Playwright

**Problem:** Element not yet rendered or hidden

**Solution:**
```typescript
// Wait for element to be visible
await page.getByText('Content').waitFor({ state: 'visible' });

// Or scroll into view
await element.scrollIntoViewIfNeeded();
```

#### 3. Tests Fail in CI but Pass Locally

**Problem:** Different environments, timing issues

**Solution:**
```typescript
// Increase timeouts in CI
test.setTimeout(process.env.CI ? 60000 : 30000);

// Use retries in Playwright config
retries: process.env.CI ? 2 : 0
```

#### 4. Mock Not Working

**Problem:** Mock defined after import

**Solution:**
```typescript
// ❌ Bad - Mock after import
import { getData } from './api';
vi.mock('./api');

// ✅ Good - Mock before import
vi.mock('./api');
import { getData } from './api';
```

#### 5. Coverage Not Meeting Threshold

**Problem:** Insufficient test coverage

**Solution:**
```bash
# Generate coverage report to see what's missing
npm run test:coverage

# Open HTML report
open coverage/index.html

# Add tests for uncovered code
```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run test:run
      - run: npm run test:coverage

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

### Pre-commit Hook

Add to `.husky/pre-commit`:

```bash
#!/bin/sh
npm run test:run
npm run typecheck
npm run lint
```

---

## Additional Resources

### Documentation
- **Vitest**: https://vitest.dev
- **Playwright**: https://playwright.dev
- **React Testing Library**: https://testing-library.com/react
- **Jest DOM Matchers**: https://github.com/testing-library/jest-dom

### Project Files
- **Vitest Config**: `vitest.config.ts`
- **Playwright Config**: `playwright.config.ts`
- **Test Setup**: `src/test/vitest-setup.ts`
- **Test Utils**: `src/test/test-utils.tsx`

### Example Tests
- **Component Test**: `src/components/Button.test.tsx`
- **Page Test**: `src/pages/Home.test.tsx`
- **E2E Test**: `e2e/navigation.spec.ts`

---

## Quick Reference

### Vitest Commands

```bash
npm test                 # Watch mode
npm run test:ui          # UI mode
npm run test:run         # Run once
npm run test:coverage    # Coverage
npm run test:watch       # Watch specific files
```

### Playwright Commands

```bash
npm run test:e2e         # Run all E2E tests
npm run test:e2e:ui      # Interactive UI
npm run test:e2e:headed  # Show browser
npm run test:e2e:debug   # Debug mode
npm run test:e2e:report  # View report
npx playwright codegen   # Generate tests
```

### Common Matchers

```typescript
// Vitest/Jest DOM
expect(element).toBeInTheDocument()
expect(element).toBeVisible()
expect(element).toHaveTextContent('text')
expect(element).toHaveClass('class-name')
expect(element).toHaveAttribute('attr', 'value')

// Playwright
await expect(page).toHaveURL(/pattern/)
await expect(element).toBeVisible()
await expect(element).toHaveText('text')
await expect(element).toHaveAttribute('attr', 'value')
```

---

**Last Updated:** October 23, 2025
**Version:** 1.0.0
**Maintainer:** Development Team

For questions or issues, please refer to the main [CLAUDE.md](./CLAUDE.md) documentation.
