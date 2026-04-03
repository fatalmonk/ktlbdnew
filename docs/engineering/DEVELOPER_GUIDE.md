# Kattali Textile Limited - Developer Guide

**Document Type:** Developer Guide  
**Version:** 1.0  
**Date:** October 25, 2025  
**Author:** Development Team  
**Project:** Technical Improvements Enhancement

---

## Developer Guide Overview

This comprehensive developer guide provides everything needed to contribute to the Kattali Textile Limited technical improvements project. It covers setup, development processes, coding standards, testing, deployment, and best practices.

**Project Type:** Brownfield Enhancement  
**Total Stories:** 27 user stories  
**Implementation Duration:** 8 weeks  
**Team Size:** 2-3 developers

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Development Environment Setup](#development-environment-setup)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Coding Standards](#coding-standards)
6. [Testing Guidelines](#testing-guidelines)
7. [Performance Guidelines](#performance-guidelines)
8. [Accessibility Guidelines](#accessibility-guidelines)
9. [Deployment Process](#deployment-process)
10. [Troubleshooting](#troubleshooting)
11. [Best Practices](#best-practices)
12. [Resources](#resources)

---

## Project Overview

### Technology Stack

```
Technology Stack
├── Frontend
│   ├── React 18.3.1
│   ├── TypeScript 5.5.4
│   ├── Vite 7.1.6
│   ├── Tailwind CSS 3.4.1
│   └── React Router 7.7.1
├── Backend
│   ├── AWS Lambda
│   ├── API Gateway
│   ├── SendGrid/AWS SES
│   └── Serverless Framework
├── Testing
│   ├── Vitest 4.0.1
│   ├── Playwright 1.56.1
│   └── React Testing Library 16.3.0
├── Tools
│   ├── ESLint + Prettier
│   ├── Husky + lint-staged
│   └── GitHub Actions
└── Hosting
    ├── GitHub Pages (Frontend)
    └── AWS Lambda (Backend)
```

### Project Goals

- **Test Stability:** Achieve 100% E2E test pass rate across all browsers
- **Backend Integration:** Implement serverless APIs for form submissions
- **Performance:** Optimize bundle size and Core Web Vitals
- **Accessibility:** Achieve WCAG 2.1 AA compliance
- **Developer Experience:** Enhance tooling and automation

---

## Development Environment Setup

### Prerequisites

```bash
# Required software versions (align with CI and root README)
Node.js: 20.x (LTS)
npm: >= 10.0.0
Git: >= 2.30.0
VS Code: >= 1.80.0 (recommended)
```

### Initial Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-org/ktl-website.git
cd ktl-website

# 2. Install dependencies (npm workspaces — root installs apps/web)
npm install

# 3. Install Playwright browsers (for E2E)
npm exec --workspace=apps/web -- playwright install

# 4. Set up environment variables (Vite uses VITE_* — see apps/web/.env.example)
cp apps/web/.env.example apps/web/.env.local
# Edit apps/web/.env.local with your configuration

# 5. Start development server (from repo root)
npm run dev
```

### Environment Variables

See `apps/web/.env.example` for the authoritative list. The Vite app uses **`VITE_*`** for client-exposed variables (for example `VITE_API_URL`, optional `VITE_GOOGLE_MAPS_API_KEY`, optional Datadog RUM keys). Do not use legacy `REACT_APP_*` names in this codebase.

```bash
# Examples — match names in apps/web/.env.example
# VITE_API_URL=/api
# VITE_GOOGLE_MAPS_API_KEY=
# VITE_GOOGLE_MAPS_MAP_ID=

# Backend / serverless (when applicable — not all are used in every deployment)
# SENDGRID_API_KEY=your_sendgrid_key
# CORS_ORIGIN=https://ktlbd.com
```

### VS Code Setup

```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

### Recommended Extensions

```json
// .vscode/extensions.json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-playwright.playwright",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

---

## Project Structure

### Frontend Structure

```
project/
├── src/
│   ├── components/
│   │   ├── forms/           # NEW: Form components
│   │   │   ├── ContactForm.tsx
│   │   │   ├── FormField.tsx
│   │   │   ├── ValidationMessage.tsx
│   │   │   └── LoadingButton.tsx
│   │   ├── notifications/   # NEW: Toast notifications
│   │   │   ├── Toast.tsx
│   │   │   └── ToastProvider.tsx
│   │   └── [existing components]
│   ├── lib/
│   │   ├── api/            # NEW: API client utilities
│   │   │   ├── client.ts
│   │   │   ├── endpoints.ts
│   │   │   └── validation.ts
│   │   ├── cms/            # NEW: CMS integration
│   │   │   ├── contentful.ts
│   │   │   └── transforms.ts
│   │   └── [existing utilities]
│   ├── hooks/
│   │   ├── useFormSubmit.ts # NEW: Form submission hook
│   │   └── [existing hooks]
│   ├── types/
│   │   ├── api.ts          # NEW: API types
│   │   └── cms.ts          # NEW: CMS types
│   └── [existing structure]
├── backend/                # NEW: Serverless functions
│   ├── functions/
│   │   ├── contact.ts
│   │   ├── inquiry.ts
│   │   └── newsletter.ts
│   ├── lib/
│   │   ├── email.ts
│   │   ├── validation.ts
│   │   └── security.ts
│   └── tests/
├── e2e/                    # E2E tests
├── public/                 # Static assets
└── docs/                   # Documentation
```

### Backend Structure

```
backend/
├── functions/
│   ├── contact.ts          # Contact form handler
│   ├── inquiry.ts         # Inquiry form handler
│   └── newsletter.ts       # Newsletter handler
├── lib/
│   ├── email.ts           # Email service
│   ├── validation.ts      # Input validation
│   ├── security.ts        # Security utilities
│   └── error-handling.ts  # Error handling
├── tests/
│   ├── unit/              # Unit tests
│   ├── integration/       # Integration tests
│   └── e2e/               # E2E tests
├── serverless.yml         # Serverless configuration
└── package.json           # Backend dependencies
```

---

## Development Workflow

### Story Development Process

```bash
# 1. Create feature branch
git checkout -b feature/story-1.1-fix-chromium-tests

# 2. Pull latest changes
git pull origin main

# 3. Start development
npm run dev

# 4. Make changes and commit regularly
git add .
git commit -m "feat: implement story 1.1 - fix chromium tests"

# 5. Push changes
git push origin feature/story-1.1-fix-chromium-tests

# 6. Create pull request
# Use GitHub UI to create PR with proper description
```

### Code Review Process

```bash
# 1. Ensure all tests pass
npm run test
npm run test:e2e

# 2. Check code quality
npm run lint
npm run type-check

# 3. Update documentation if needed
# Update README, code comments, etc.

# 4. Request review
# Assign reviewers, add labels, link to story
```

### Testing Workflow

```bash
# Unit tests
npm run test

# E2E tests (all browsers)
npm run test:e2e

# E2E tests (specific browser)
npm run test:e2e:chromium
npm run test:e2e:firefox
npm run test:e2e:webkit

# Performance tests
npm run test:performance

# Accessibility tests
npm run test:a11y
```

---

## Coding Standards

### TypeScript Standards

```typescript
// Use strict TypeScript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}

// Example component
interface ContactFormProps {
  onSubmit: (data: ContactSubmission) => Promise<void>;
  isLoading?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  // Component implementation
};
```

### React Standards

```typescript
// Use functional components with hooks
import { useState, useEffect } from 'react';

// Use proper prop types
interface ComponentProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

// Use custom hooks for logic
const useFormSubmit = (endpoint: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Submit logic
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submit, isSubmitting, error };
};
```

### CSS/Tailwind Standards

```typescript
// Use Tailwind classes consistently
const buttonClasses = `
  px-4 py-2 rounded-lg font-medium
  bg-blue-600 text-white
  hover:bg-blue-700 focus:ring-2 focus:ring-blue-500
  disabled:opacity-50 disabled:cursor-not-allowed
`;

// Use design system tokens
const theme = {
  colors: {
    primary: 'blue-600',
    secondary: 'gray-600',
    success: 'green-600',
    error: 'red-600',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
  },
};
```

### File Naming Conventions

```
# Components
ContactForm.tsx          # PascalCase for components
contact-form.tsx         # kebab-case for utilities

# Hooks
useFormSubmit.ts         # camelCase with 'use' prefix
useApiClient.ts

# Types
api.ts                   # camelCase for type files
cms.ts

# Utilities
validation.ts            # camelCase for utilities
email-service.ts

# Tests
ContactForm.test.tsx     # .test.tsx for component tests
contact-form.e2e.ts      # .e2e.ts for E2E tests
```

---

## Testing Guidelines

### Unit Testing

```typescript
// ContactForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from './ContactForm';

describe('ContactForm', () => {
  it('should submit form with valid data', async () => {
    const mockSubmit = jest.fn();
    render(<ContactForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
      });
    });
  });
});
```

### Integration Testing

```typescript
// api-client.test.ts
import { ApiClient } from './api-client';

describe('ApiClient', () => {
  it('should submit contact form successfully', async () => {
    const client = new ApiClient();
    const mockResponse = { success: true, message: 'Success' };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await client.post('/api/contact', {
      name: 'John Doe',
      email: 'john@example.com',
    });

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/contact'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });
});
```

### E2E Testing

```typescript
// contact-form.e2e.ts
import { test, expect } from '@playwright/test';

test('contact form submission', async ({ page }) => {
  await page.goto('/contact');

  await page.fill('[name="name"]', 'John Doe');
  await page.fill('[name="email"]', 'john@example.com');
  await page.fill('[name="subject"]', 'Test Subject');
  await page.fill('[name="message"]', 'Test message');

  await page.click('button[type="submit"]');

  await expect(page.locator('.success-message')).toBeVisible();
  await expect(page.locator('.success-message')).toContainText('Thank you for your message');
});
```

### Test Coverage Requirements

```bash
# Unit tests: > 80% coverage
# Integration tests: > 70% coverage
# E2E tests: > 60% coverage

# Run coverage report
npm run test:coverage
```

---

## Performance Guidelines

### Bundle Optimization

```typescript
// vite.config.ts
export default defineConfig({
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

### Code Splitting

```typescript
// Lazy load components
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));

// Use Suspense for loading states
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/products" element={<ProductsPage />} />
  </Routes>
</Suspense>
```

### Image Optimization

```typescript
// OptimizedImage component
export const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  width?: number;
  height?: number;
}> = ({ src, alt, width, height }) => {
  return (
    <picture>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img
        src={`${src}.jpg`}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
      />
    </picture>
  );
};
```

### Performance Monitoring

```typescript
// Performance monitoring
const trackPerformance = (metric: string, value: number) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'web_vitals', {
      name: metric,
      value: Math.round(value),
      event_category: 'Performance',
    });
  }
};

// Monitor Core Web Vitals
new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1];
  trackPerformance('LCP', lastEntry.startTime);
}).observe({ entryTypes: ['largest-contentful-paint'] });
```

---

## Accessibility Guidelines

### ARIA Implementation

```typescript
// Accessible form component
export const AccessibleForm: React.FC<{
  onSubmit: (data: any) => void;
  errors: Record<string, string>;
}> = ({ onSubmit, errors }) => {
  return (
    <form onSubmit={onSubmit} role="form" aria-label="Contact form">
      <div className="form-group">
        <label htmlFor="name" className="required">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <div id="name-error" role="alert" className="error-message">
            {errors.name}
          </div>
        )}
      </div>
    </form>
  );
};
```

### Keyboard Navigation

```typescript
// Keyboard navigation hook
const useKeyboardNavigation = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-navigation');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
};
```

### Focus Management

```typescript
// Focus management for modals
const useFocusManagement = () => {
  const focusableElements =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  const trapFocus = (element: HTMLElement) => {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0] as HTMLElement;
    const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement;

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  };

  return { trapFocus };
};
```

### Color Contrast

```css
/* Ensure proper color contrast */
.text-primary {
  color: #1e40af; /* Blue-800 - 4.5:1 contrast ratio */
}

.text-secondary {
  color: #374151; /* Gray-700 - 4.5:1 contrast ratio */
}

.error-message {
  color: #dc2626; /* Red-600 - 4.5:1 contrast ratio */
}

/* Focus indicators */
.focus\:ring-2:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
```

---

## Deployment Process

### Frontend Deployment

```bash
# 1. Build the project
npm run build

# 2. Test the build
npm run test:build

# 3. Deploy to GitHub Pages
npm run deploy

# 4. Verify deployment
npm run verify:deployment
```

### Backend Deployment

```bash
# 1. Install serverless framework
npm install -g serverless

# 2. Configure AWS credentials
serverless config credentials --provider aws --key YOUR_KEY --secret YOUR_SECRET

# 3. Deploy to staging
serverless deploy --stage staging

# 4. Test staging deployment
npm run test:staging

# 5. Deploy to production
serverless deploy --stage production
```

### Environment Configuration

```bash
# Staging environment
REACT_APP_API_URL=https://staging-api.ktlbd.com
REACT_APP_SENTRY_DSN=staging_sentry_dsn

# Production environment
REACT_APP_API_URL=https://api.ktlbd.com
REACT_APP_SENTRY_DSN=production_sentry_dsn
```

---

## Troubleshooting

### Common Issues

#### 1. E2E Test Failures

```bash
# Debug E2E tests
npx playwright test --debug

# Run tests in headed mode
npx playwright test --headed

# Generate test report
npx playwright show-report
```

#### 2. Build Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run type-check

# Check ESLint errors
npm run lint
```

#### 3. Performance Issues

```bash
# Analyze bundle size
npm run analyze

# Check Core Web Vitals
npm run lighthouse

# Profile performance
npm run profile
```

#### 4. API Issues

```bash
# Test API endpoints
curl -X POST https://api.ktlbd.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}'

# Check API logs
serverless logs -f contact --stage production
```

### Debug Tools

```typescript
// Development debugging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', { data, state, props });
}

// Error boundary for React
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

---

## Best Practices

### Code Organization

```typescript
// 1. Use barrel exports
// components/index.ts
export { ContactForm } from './ContactForm';
export { FormField } from './FormField';
export { ValidationMessage } from './ValidationMessage';

// 2. Use custom hooks for logic
const useContactForm = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Submit logic
    } catch (error) {
      setErrors(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, errors, isSubmitting, handleSubmit };
};

// 3. Use TypeScript interfaces
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}
```

### Error Handling

```typescript
// API error handling
const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with error
    return error.response.data.message;
  } else if (error.request) {
    // Network error
    return 'Network error. Please try again.';
  } else {
    // Other error
    return 'An unexpected error occurred.';
  }
};

// Form error handling
const validateForm = (data: FormData) => {
  const errors: Record<string, string> = {};

  if (!data.name) {
    errors.name = 'Name is required';
  }

  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email';
  }

  return errors;
};
```

### Security Best Practices

```typescript
// Input sanitization
const sanitizeInput = (input: string) => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .substring(0, 1000); // Limit length
};

// CSRF protection
const getCsrfToken = () => {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
};

// Secure API calls
const secureApiCall = async (endpoint: string, data: any) => {
  const csrfToken = getCsrfToken();

  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken || '',
    },
    body: JSON.stringify(data),
  });
};
```

### Performance Best Practices

```typescript
// 1. Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Expensive rendering */}</div>;
});

// 2. Use useMemo for expensive calculations
const ExpensiveCalculation = ({ items }) => {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  return <div>{expensiveValue}</div>;
};

// 3. Use useCallback for event handlers
const ParentComponent = () => {
  const handleClick = useCallback((id: string) => {
    // Handle click
  }, []);

  return <ChildComponent onClick={handleClick} />;
};
```

---

## Resources

### Documentation

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Vite Documentation](https://vitejs.dev/guide/)

### Tools

- [VS Code](https://code.visualstudio.com/)
- [GitHub](https://github.com/)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [SendGrid](https://sendgrid.com/)

### Testing

- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright](https://playwright.dev/)

### Performance

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Web Vitals](https://web.dev/vitals/)
- [Bundle Analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)

### Accessibility

- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Documentation](https://www.w3.org/TR/wai-aria-1.1/)
- [Accessibility Testing](https://www.deque.com/axe/)

---

## Support

### Getting Help

- **Team Slack:** #ktl-dev-team
- **GitHub Issues:** Create issues for bugs and feature requests
- **Documentation:** Check this guide first
- **Code Review:** Ask for reviews on pull requests

### Escalation Process

1. **Level 1:** Check documentation and troubleshooting guide
2. **Level 2:** Ask team members in Slack
3. **Level 3:** Create GitHub issue
4. **Level 4:** Escalate to project lead

---

**Developer Guide Status:** ✅ Complete  
**Created:** October 25, 2025  
**Last Updated:** October 25, 2025  
**Version:** 1.0
