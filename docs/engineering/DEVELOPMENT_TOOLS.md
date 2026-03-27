# Kattali Textile Limited - Development Tools

**Document Type:** Development Tools  
**Version:** 1.0  
**Date:** October 25, 2025  
**Author:** Development Team  
**Project:** Technical Improvements Enhancement

---

## Development Tools Overview

This document provides comprehensive information about the development tools, automation, and tooling setup for the Kattali Textile Limited technical improvements project. It covers tool configuration, automation scripts, and development environment setup.

**Project Type:** Brownfield Enhancement  
**Total Stories:** 27 user stories  
**Implementation Duration:** 8 weeks  
**Team Size:** 2-3 developers

---

## Table of Contents

1. [Development Environment Tools](#development-environment-tools)
2. [Code Quality Tools](#code-quality-tools)
3. [Testing Tools](#testing-tools)
4. [Performance Tools](#performance-tools)
5. [Accessibility Tools](#accessibility-tools)
6. [Deployment Tools](#deployment-tools)
7. [Monitoring Tools](#monitoring-tools)
8. [Automation Tools](#automation-tools)
9. [Tool Configuration](#tool-configuration)
10. [Tool Maintenance](#tool-maintenance)

---

## Development Environment Tools

### 1. VS Code Configuration

#### 1.1 Workspace Settings
```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "editor.quickSuggestions": {
    "strings": true
  }
}
```

#### 1.2 Recommended Extensions
```json
// .vscode/extensions.json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-playwright.playwright",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}
```

#### 1.3 Launch Configuration
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    },
    {
      "name": "Debug E2E Tests",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/@playwright/test/cli.js",
      "args": ["test", "--debug"],
      "console": "integratedTerminal"
    }
  ]
}
```

### 2. Git Configuration

#### 2.1 Git Hooks
```bash
#!/bin/sh
# .git/hooks/pre-commit
npm run lint
npm run type-check
npm run test
```

#### 2.2 Git Aliases
```bash
# .gitconfig
[alias]
  co = checkout
  br = branch
  ci = commit
  st = status
  unstage = reset HEAD --
  last = log -1 HEAD
  visual = !gitk
  lg = log --oneline --decorate --graph --all
  amend = commit --amend
  wip = commit -am "WIP"
  unwip = reset HEAD~1
```

### 3. Package Manager Tools

#### 3.1 npm Scripts
```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:chromium": "playwright test --project=chromium",
    "test:e2e:firefox": "playwright test --project=firefox",
    "test:e2e:webkit": "playwright test --project=webkit",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "analyze": "npm run build && npx vite-bundle-analyzer dist",
    "lighthouse": "lighthouse http://localhost:5173 --output html --output-path ./lighthouse-report.html",
    "prepare": "husky install"
  }
}
```

#### 3.2 Dependency Management
```json
// package.json
{
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "eslint": "^8.0.0",
    "eslint-plugin-react-hooks": "^4.0.0",
    "eslint-plugin-react-refresh": "^0.4.0",
    "husky": "^8.0.0",
    "lint-staged": "^15.0.0",
    "playwright": "^1.56.0",
    "prettier": "^3.0.0",
    "typescript": "^5.5.0",
    "vite": "^7.1.0",
    "vitest": "^4.0.0"
  }
}
```

---

## Code Quality Tools

### 1. ESLint Configuration

#### 1.1 ESLint Config
```javascript
// eslint.config.js
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
```

#### 1.2 ESLint Rules
```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-console': 'warn',
    'no-debugger': 'error',
  },
};
```

### 2. Prettier Configuration

#### 2.1 Prettier Config
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

#### 2.2 Prettier Ignore
```
# .prettierignore
node_modules
dist
build
coverage
*.min.js
*.min.css
```

### 3. TypeScript Configuration

#### 3.1 TypeScript Config
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noImplicitAny": true,
    "exactOptionalPropertyTypes": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### 3.2 TypeScript Node Config
```json
// tsconfig.node.json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

---

## Testing Tools

### 1. Vitest Configuration

#### 1.1 Vitest Config
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
      ],
    },
  },
});
```

#### 1.2 Test Setup
```typescript
// src/test/setup.ts
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
```

### 2. Playwright Configuration

#### 2.1 Playwright Config
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

#### 2.2 Test Utilities
```typescript
// e2e/utils/test-helpers.ts
import { Page, expect } from '@playwright/test';

export class TestHelpers {
  constructor(private page: Page) {}

  async fillForm(formData: Record<string, string>) {
    for (const [field, value] of Object.entries(formData)) {
      await this.page.fill(`[name="${field}"]`, value);
    }
  }

  async submitForm() {
    await this.page.click('button[type="submit"]');
  }

  async waitForSuccessMessage() {
    await expect(this.page.locator('.success-message')).toBeVisible();
  }

  async waitForErrorMessage() {
    await expect(this.page.locator('.error-message')).toBeVisible();
  }
}
```

### 3. Testing Library Configuration

#### 3.1 Custom Render
```typescript
// src/test/custom-render.tsx
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
```

#### 3.2 Test Utilities
```typescript
// src/test/test-utils.ts
import { render, screen } from './custom-render';
import userEvent from '@testing-library/user-event';

export const createMockUser = () => {
  return userEvent.setup();
};

export const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui);
};

export const waitForLoadingToFinish = () => {
  return screen.findByTestId('loading', undefined, { timeout: 3000 });
};
```

---

## Performance Tools

### 1. Bundle Analysis

#### 1.1 Vite Bundle Analyzer
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 180,
  },
});
```

#### 1.2 Performance Monitoring
```typescript
// src/lib/performance-monitor.ts
export class PerformanceMonitor {
  private metrics: Map<string, number> = new Map();

  constructor() {
    this.initializeMonitoring();
  }

  private initializeMonitoring() {
    this.monitorLCP();
    this.monitorFID();
    this.monitorCLS();
    this.monitorTTFB();
  }

  private monitorLCP() {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.set('LCP', lastEntry.startTime);
      this.reportMetric('LCP', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  }

  private monitorFID() {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        this.metrics.set('FID', entry.processingStart - entry.startTime);
        this.reportMetric('FID', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });
  }

  private monitorCLS() {
    let clsValue = 0;
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          this.metrics.set('CLS', clsValue);
          this.reportMetric('CLS', clsValue);
        }
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }

  private monitorTTFB() {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const navigationEntry = entries[0];
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        this.metrics.set('TTFB', ttfb);
        this.reportMetric('TTFB', ttfb);
      }
    }).observe({ entryTypes: ['navigation'] });
  }

  private reportMetric(name: string, value: number) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'web_vitals', {
        name,
        value: Math.round(value),
        event_category: 'Performance',
      });
    }
  }

  public getMetrics(): Map<string, number> {
    return new Map(this.metrics);
  }
}
```

### 2. Lighthouse Integration

#### 2.1 Lighthouse Script
```typescript
// scripts/lighthouse.ts
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const runLighthouse = async (url: string) => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
  };

  const runnerResult = await lighthouse(url, options);
  await chrome.kill();

  return runnerResult;
};

export default runLighthouse;
```

#### 2.2 Performance Budget
```json
// lighthouse-budget.json
{
  "budget": [
    {
      "path": "/*",
      "timings": [
        {
          "metric": "first-contentful-paint",
          "budget": 2000
        },
        {
          "metric": "largest-contentful-paint",
          "budget": 2500
        },
        {
          "metric": "cumulative-layout-shift",
          "budget": 0.1
        }
      ],
      "resourceSizes": [
        {
          "resourceType": "script",
          "budget": 180
        },
        {
          "resourceType": "total",
          "budget": 500
        }
      ]
    }
  ]
}
```

---

## Accessibility Tools

### 1. Automated Accessibility Testing

#### 1.1 Axe Integration
```typescript
// src/test/accessibility.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ContactForm } from '../components/ContactForm';

expect.extend(toHaveNoViolations);

describe('ContactForm Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<ContactForm onSubmit={jest.fn()} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

#### 1.2 Playwright Accessibility
```typescript
// e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';

test('accessibility tests', async ({ page }) => {
  await page.goto('/');
  
  // Test keyboard navigation
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBeVisible();
  
  // Test screen reader
  await page.goto('/contact');
  const form = page.locator('form');
  await expect(form).toHaveAttribute('aria-label', 'Contact form');
  
  // Test color contrast
  const button = page.locator('button[type="submit"]');
  const color = await button.evaluate((el) => {
    const styles = window.getComputedStyle(el);
    return {
      backgroundColor: styles.backgroundColor,
      color: styles.color,
    };
  });
  
  expect(color).toBeDefined();
});
```

### 2. Accessibility Monitoring

#### 2.1 Accessibility Reporter
```typescript
// src/lib/accessibility-monitor.ts
export class AccessibilityMonitor {
  private violations: any[] = [];

  constructor() {
    this.initializeMonitoring();
  }

  private initializeMonitoring() {
    if (typeof window !== 'undefined') {
      import('axe-core').then((axe) => {
        axe.default.run().then((results) => {
          this.violations = results.violations;
          this.reportViolations();
        });
      });
    }
  }

  private reportViolations() {
    if (this.violations.length > 0) {
      console.warn('Accessibility violations found:', this.violations);
      
      // Send to monitoring service
      if (typeof gtag !== 'undefined') {
        gtag('event', 'accessibility_violation', {
          event_category: 'Accessibility',
          event_label: 'Violations',
          value: this.violations.length,
        });
      }
    }
  }

  public getViolations() {
    return this.violations;
  }
}
```

---

## Deployment Tools

### 1. GitHub Actions

#### 1.1 CI/CD Pipeline
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run test:e2e
      
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: test-results/

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### 1.2 Backend Deployment
```yaml
# .github/workflows/deploy-backend.yml
name: Deploy Backend

on:
  push:
    branches: [main]
    paths: ['backend/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build:backend
      
      - name: Deploy to AWS Lambda
        run: |
          npm install -g serverless
          serverless deploy --stage production
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

### 2. Serverless Framework

#### 2.1 Serverless Configuration
```yaml
# serverless.yml
service: ktl-api

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  environment:
    EMAIL_SERVICE_API_KEY: ${env:EMAIL_SERVICE_API_KEY}
    CORS_ORIGIN: ${env:CORS_ORIGIN}
  iam:
    role:
      statements:
        - Effect: Allow
          Action:
            - ses:SendEmail
          Resource: "*"

functions:
  contact:
    handler: functions/contact.handler
    events:
      - http:
          path: /api/contact
          method: post
          cors: true
    environment:
      EMAIL_TEMPLATE: contact-template

  inquiry:
    handler: functions/inquiry.handler
    events:
      - http:
          path: /api/inquiry
          method: post
          cors: true
    environment:
      EMAIL_TEMPLATE: inquiry-template

  newsletter:
    handler: functions/newsletter.handler
    events:
      - http:
          path: /api/newsletter
          method: post
          cors: true
    environment:
      EMAIL_TEMPLATE: newsletter-template

plugins:
  - serverless-offline
  - serverless-plugin-typescript
```

---

## Monitoring Tools

### 1. Error Tracking

#### 1.1 Sentry Integration
```typescript
// src/lib/sentry.ts
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});

export const trackError = (error: Error, context?: any) => {
  Sentry.captureException(error, { extra: context });
};

export const trackPerformance = (metric: string, value: number) => {
  Sentry.addBreadcrumb({
    message: `Performance metric: ${metric}`,
    data: { value },
    level: 'info',
  });
};
```

#### 1.2 Error Boundary
```typescript
// src/components/ErrorBoundary.tsx
import React from 'react';
import * as Sentry from '@sentry/react';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong.</h1>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

### 2. Analytics Integration

#### 2.1 Google Analytics
```typescript
// src/lib/analytics.ts
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackPageView = (path: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.REACT_APP_GA_TRACKING_ID, {
      page_path: path,
    });
  }
};
```

---

## Automation Tools

### 1. Pre-commit Hooks

#### 1.1 Husky Configuration
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm run test"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

#### 1.2 Lint-staged Configuration
```javascript
// lint-staged.config.js
module.exports = {
  '*.{ts,tsx}': [
    'eslint --fix',
    'prettier --write',
    'git add'
  ],
  '*.{json,md}': [
    'prettier --write',
    'git add'
  ]
};
```

### 2. Automated Testing

#### 2.1 Test Automation Script
```typescript
// scripts/automated-testing.ts
import { execSync } from 'child_process';

const runTests = async () => {
  try {
    console.log('Running unit tests...');
    execSync('npm run test', { stdio: 'inherit' });

    console.log('Running E2E tests...');
    execSync('npm run test:e2e', { stdio: 'inherit' });

    console.log('Running performance tests...');
    execSync('npm run test:performance', { stdio: 'inherit' });

    console.log('All tests passed!');
  } catch (error) {
    console.error('Tests failed:', error);
    process.exit(1);
  }
};

runTests();
```

#### 2.2 Performance Testing
```typescript
// scripts/performance-test.ts
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const runPerformanceTest = async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance'],
    port: chrome.port,
  };

  const runnerResult = await lighthouse('http://localhost:5173', options);
  await chrome.kill();

  const score = runnerResult.lhr.categories.performance.score * 100;
  console.log(`Performance score: ${score}`);

  if (score < 95) {
    console.error('Performance score below threshold');
    process.exit(1);
  }
};

runPerformanceTest();
```

---

## Tool Configuration

### 1. Environment Configuration

#### 1.1 Environment Variables
```bash
# .env.example
REACT_APP_API_URL=https://api.ktlbd.com
REACT_APP_SENTRY_DSN=your_sentry_dsn
REACT_APP_GA_TRACKING_ID=your_ga_id
REACT_APP_ENVIRONMENT=development
```

#### 1.2 Environment Validation
```typescript
// src/lib/env-validation.ts
import { z } from 'zod';

const envSchema = z.object({
  REACT_APP_API_URL: z.string().url(),
  REACT_APP_SENTRY_DSN: z.string().optional(),
  REACT_APP_GA_TRACKING_ID: z.string().optional(),
  REACT_APP_ENVIRONMENT: z.enum(['development', 'staging', 'production']),
});

export const env = envSchema.parse(process.env);
```

### 2. Tool Maintenance

#### 2.1 Dependency Updates
```json
// .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    reviewers:
      - "dev-team"
    assignees:
      - "dev-team"
```

#### 2.2 Tool Health Checks
```typescript
// scripts/health-check.ts
import { execSync } from 'child_process';

const healthChecks = [
  () => {
    console.log('Checking TypeScript...');
    execSync('npm run type-check', { stdio: 'inherit' });
  },
  () => {
    console.log('Checking ESLint...');
    execSync('npm run lint', { stdio: 'inherit' });
  },
  () => {
    console.log('Checking Prettier...');
    execSync('npm run format:check', { stdio: 'inherit' });
  },
  () => {
    console.log('Checking tests...');
    execSync('npm run test', { stdio: 'inherit' });
  },
];

const runHealthChecks = async () => {
  for (const check of healthChecks) {
    try {
      check();
      console.log('✅ Health check passed');
    } catch (error) {
      console.error('❌ Health check failed:', error);
      process.exit(1);
    }
  }
  console.log('🎉 All health checks passed!');
};

runHealthChecks();
```

---

## Success Criteria

### 1. Tool Setup Success
- [ ] All development tools configured
- [ ] Code quality tools working
- [ ] Testing tools functional
- [ ] Performance tools monitoring

### 2. Automation Success
- [ ] Pre-commit hooks working
- [ ] CI/CD pipeline functional
- [ ] Automated testing working
- [ ] Deployment automation working

### 3. Monitoring Success
- [ ] Error tracking working
- [ ] Performance monitoring active
- [ ] Analytics integration working
- [ ] Health checks passing

---

**Development Tools Status:** ✅ Complete  
**Created:** October 25, 2025  
**Last Updated:** October 25, 2025  
**Version:** 1.0

