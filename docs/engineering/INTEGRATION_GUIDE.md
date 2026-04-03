# Kattali Textile Limited - Architecture Integration Guide

**Document Type:** Integration Guide  
**Version:** 1.0  
**Date:** October 25, 2025  
**Author:** Architect  
**Source:** Architecture Sharding Plan

---

## Integration Overview

This guide provides comprehensive integration instructions for implementing the 12 architectural components of the Kattali Textile Limited website enhancement. The integration follows a layered approach with clear dependencies and implementation phases.

**Total Components:** 12  
**Integration Phases:** 4 phases over 8 weeks  
**Architecture Type:** Brownfield Enhancement

---

## Integration Architecture

### System Architecture Overview

```
Kattali Textile Limited - Enhanced Architecture
├── Frontend Layer (GitHub Pages)
│   ├── React 18 SPA
│   ├── Vite Build System
│   ├── Tailwind CSS (KTL Theme)
│   └── Static Asset Optimization
├── Backend Layer (Serverless)
│   ├── AWS Lambda Functions
│   ├── API Gateway
│   ├── Email Service Integration
│   └── Security Layer
├── Content Layer (Headless CMS)
│   ├── Contentful/Sanity Integration
│   ├── Content API
│   └── Content Management
├── Monitoring Layer
│   ├── Performance Monitoring
│   ├── Error Tracking
│   └── Analytics
└── Development Layer
    ├── CI/CD Pipeline
    ├── Testing Infrastructure
    └── Developer Tools
```

### Component Integration Matrix

| Component                | Layer      | Phase | Dependencies | Blocks       |
| ------------------------ | ---------- | ----- | ------------ | ------------ |
| 1.1 Test Infrastructure  | Foundation | 1     | None         | 1.2, 2.1-2.4 |
| 1.2 Build Pipeline       | Foundation | 1     | 1.1          | 2.1-2.4      |
| 2.1 Serverless API       | Backend    | 2     | 1.2          | 2.2-2.4      |
| 2.2 Data Models          | Backend    | 2     | 2.1          | 2.3-2.4      |
| 2.3 Email Service        | Backend    | 2     | 2.2          | 2.4          |
| 2.4 Security             | Backend    | 2     | 2.3          | 3.1          |
| 3.1 Frontend API         | Frontend   | 3     | 2.4          | 3.2          |
| 3.2 Performance          | Frontend   | 3     | 3.1          | 4.1          |
| 4.1 CMS Integration      | Content    | 4     | 3.2          | 4.2          |
| 4.2 Accessibility        | Content    | 4     | 4.1          | 5.1          |
| 5.1 Monitoring           | Operations | 4     | 4.2          | 5.2          |
| 5.2 Developer Experience | Operations | 4     | 5.1          | None         |

---

## Phase 1: Foundation Architecture Integration

### Component 1.1: Test Infrastructure Architecture

**Integration Steps:**

1. **Playwright Setup**

   ```bash
   npm install -D @playwright/test
   npx playwright install
   ```

2. **Test Configuration**

   ```typescript
   // playwright.config.ts
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
       { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
       { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
       { name: 'webkit', use: { ...devices['Desktop Safari'] } },
       { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
       { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
     ],
   });
   ```

3. **CI/CD Integration**
   ```yaml
   # .github/workflows/test.yml
   name: E2E Tests
   on: [push, pull_request]
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm ci
         - run: npx playwright install
         - run: npx playwright test
   ```

### Component 1.2: Build Pipeline Architecture

**Integration Steps:**

1. **Vite Configuration**

   ```typescript
   // vite.config.ts
   export default defineConfig({
     plugins: [react()],
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom'],
             router: ['react-router-dom'],
           },
         },
       },
     },
   });
   ```

2. **Asset Optimization**

   ```typescript
   // optimize-images.js
   import sharp from 'sharp';
   import fs from 'fs';
   import path from 'path';

   const optimizeImage = async (inputPath: string, outputPath: string) => {
     await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
   };
   ```

---

## Phase 2: Backend Architecture Integration

### Component 2.1: Serverless API Architecture

**Integration Steps:**

1. **Serverless Framework Setup**

   ```bash
   npm install -g serverless
   serverless create --template aws-nodejs-typescript
   ```

2. **Lambda Function Implementation**

   ```typescript
   // functions/contact.ts
   import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
   import { validateContactSubmission } from '../lib/validation-schemas';
   import { sendContactEmail } from '../lib/email-service';

   export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
     try {
       const body = JSON.parse(event.body || '{}');
       const validatedData = validateContactSubmission(body);
       await sendContactEmail(validatedData);

       return {
         statusCode: 200,
         headers: {
           'Access-Control-Allow-Origin': 'https://ktlbd.com',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           success: true,
           message: 'Contact form submitted successfully',
         }),
       };
     } catch (error) {
       return {
         statusCode: 500,
         headers: {
           'Access-Control-Allow-Origin': 'https://ktlbd.com',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           success: false,
           message: 'Internal server error',
         }),
       };
     }
   };
   ```

3. **API Gateway Configuration**
   ```yaml
   # serverless.yml
   service: ktl-api
   provider:
     name: aws
     runtime: nodejs18.x
     region: us-east-1
   functions:
     contact:
       handler: functions/contact.handler
       events:
         - http:
             path: /api/contact
             method: post
             cors: true
   ```

### Component 2.2: Data Models Architecture

**Integration Steps:**

1. **TypeScript Interfaces**

   ```typescript
   // types/api.ts
   export interface ContactSubmission {
     name: string;
     email: string;
     company?: string;
     phone?: string;
     subject: string;
     message: string;
     source: 'contact-page' | 'inquiry-form';
   }

   export interface InquirySubmission {
     name: string;
     email: string;
     company: string;
     phone?: string;
     product: string;
     quantity: number;
     message: string;
     timeline: string;
   }

   export interface NewsletterSubscription {
     email: string;
     source: string;
     consent: boolean;
   }
   ```

2. **Validation Schemas**

   ```typescript
   // lib/validation-schemas.ts
   import { z } from 'zod';

   export const contactSubmissionSchema = z.object({
     name: z.string().min(1).max(100),
     email: z.string().email(),
     company: z.string().max(100).optional(),
     phone: z.string().max(20).optional(),
     subject: z.string().min(1).max(200),
     message: z.string().min(1).max(2000),
     source: z.enum(['contact-page', 'inquiry-form']),
   });

   export const validateContactSubmission = (data: unknown) => {
     return contactSubmissionSchema.parse(data);
   };
   ```

### Component 2.3: Email Service Architecture

**Integration Steps:**

1. **Email Service Setup**

   ```typescript
   // lib/email-service.ts
   import sgMail from '@sendgrid/mail';

   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

   export const sendContactEmail = async (data: ContactSubmission) => {
     const msg = {
       to: 'sales@ktlbd.com',
       from: 'noreply@ktlbd.com',
       subject: `New Contact Form Submission - ${data.subject}`,
       html: `
         <h2>New Contact Form Submission</h2>
         <p><strong>Name:</strong> ${data.name}</p>
         <p><strong>Email:</strong> ${data.email}</p>
         <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
         <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
         <p><strong>Subject:</strong> ${data.subject}</p>
         <p><strong>Message:</strong></p>
         <p>${data.message}</p>
       `,
     };

     await sgMail.send(msg);
   };
   ```

### Component 2.4: Security Architecture

**Integration Steps:**

1. **CORS Configuration**

   ```typescript
   // lib/cors.ts
   export const corsHeaders = {
     'Access-Control-Allow-Origin': 'https://ktlbd.com',
     'Access-Control-Allow-Methods': 'POST, OPTIONS',
     'Access-Control-Allow-Headers': 'Content-Type',
     'Access-Control-Max-Age': '86400',
   };
   ```

2. **Rate Limiting**

   ```typescript
   // lib/rate-limiting.ts
   const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

   export const checkRateLimit = (ip: string): boolean => {
     const now = Date.now();
     const windowMs = 60 * 1000; // 1 minute
     const maxRequests = 10;

     const current = rateLimitMap.get(ip);

     if (!current || now > current.resetTime) {
       rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
       return true;
     }

     if (current.count >= maxRequests) {
       return false;
     }

     current.count++;
     return true;
   };
   ```

---

## Phase 3: Frontend Architecture Integration

### Component 3.1: Frontend API Integration

**Integration Steps:**

1. **API Client Setup**

   ```typescript
   // lib/api-client.ts
   const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.ktlbd.com';

   export class ApiClient {
     private baseURL: string;

     constructor(baseURL: string = API_BASE_URL) {
       this.baseURL = baseURL;
     }

     async post<T>(endpoint: string, data: any): Promise<T> {
       const response = await fetch(`${this.baseURL}${endpoint}`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
       });

       if (!response.ok) {
         throw new Error(`API Error: ${response.status}`);
       }

       return response.json();
     }
   }
   ```

2. **Form Integration**

   ```typescript
   // components/ContactForm.tsx
   import { useState } from 'react';
   import { ApiClient } from '../lib/api-client';

   const apiClient = new ApiClient();

   export const ContactForm: React.FC = () => {
     const [formData, setFormData] = useState({
       name: '',
       email: '',
       company: '',
       phone: '',
       subject: '',
       message: '',
     });
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

     const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();
       setIsSubmitting(true);

       try {
         await apiClient.post('/api/contact', {
           ...formData,
           source: 'contact-page',
         });
         setSubmitStatus('success');
       } catch (error) {
         setSubmitStatus('error');
       } finally {
         setIsSubmitting(false);
       }
     };

     return (
       <form onSubmit={handleSubmit}>
         {/* Form fields */}
         <button type="submit" disabled={isSubmitting}>
           {isSubmitting ? 'Submitting...' : 'Submit'}
         </button>
       </form>
     );
   };
   ```

### Component 3.2: Performance Architecture

**Integration Steps:**

1. **Bundle Optimization**

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

2. **Image Optimization**
   ```typescript
   // components/OptimizedImage.tsx
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

---

## Phase 4: Content & Operations Architecture

### Component 4.1: CMS Integration Architecture

**Integration Steps:**

1. **CMS Client Setup**

   ```typescript
   // lib/cms-client.ts
   import { createClient } from 'contentful';

   const client = createClient({
     space: process.env.CONTENTFUL_SPACE_ID!,
     accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
   });

   export const getBlogPosts = async () => {
     const response = await client.getEntries({
       content_type: 'blogPost',
       order: '-sys.createdAt',
     });
     return response.items;
   };
   ```

2. **Content Integration**

   ```typescript
   // pages/BlogPage.tsx
   import { useEffect, useState } from 'react';
   import { getBlogPosts } from '../lib/cms-client';

   export const BlogPage: React.FC = () => {
     const [posts, setPosts] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       const fetchPosts = async () => {
         try {
           const blogPosts = await getBlogPosts();
           setPosts(blogPosts);
         } catch (error) {
           console.error('Error fetching blog posts:', error);
         } finally {
           setLoading(false);
         }
       };

       fetchPosts();
     }, []);

     if (loading) return <div>Loading...</div>;

     return (
       <div>
         {posts.map((post) => (
           <article key={post.sys.id}>
             <h2>{post.fields.title}</h2>
             <p>{post.fields.excerpt}</p>
           </article>
         ))}
       </div>
     );
   };
   ```

### Component 4.2: Accessibility Architecture

**Integration Steps:**

1. **ARIA Implementation**

   ```typescript
   // components/AccessibleButton.tsx
   export const AccessibleButton: React.FC<{
     onClick: () => void;
     children: React.ReactNode;
     ariaLabel?: string;
   }> = ({ onClick, children, ariaLabel }) => {
     return (
       <button
         onClick={onClick}
         aria-label={ariaLabel}
         className="focus:outline-none focus:ring-2 focus:ring-blue-500"
       >
         {children}
       </button>
     );
   };
   ```

2. **Keyboard Navigation**

   ```typescript
   // hooks/useKeyboardNavigation.ts
   export const useKeyboardNavigation = () => {
     useEffect(() => {
       const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === 'Tab') {
           // Ensure focus is visible
           document.body.classList.add('keyboard-navigation');
         }
       };

       document.addEventListener('keydown', handleKeyDown);
       return () => document.removeEventListener('keydown', handleKeyDown);
     }, []);
   };
   ```

### Component 5.1: Monitoring Architecture

**Integration Steps:**

1. **Error Tracking**

   ```typescript
   // lib/error-tracking.ts
   import * as Sentry from '@sentry/react';

   Sentry.init({
     dsn: process.env.REACT_APP_SENTRY_DSN,
     environment: process.env.NODE_ENV,
   });

   export const trackError = (error: Error, context?: any) => {
     Sentry.captureException(error, { extra: context });
   };
   ```

2. **Performance Monitoring**
   ```typescript
   // lib/performance-monitoring.ts
   export const trackPerformance = (metric: string, value: number) => {
     if (typeof gtag !== 'undefined') {
       gtag('event', 'web_vitals', {
         name: metric,
         value: Math.round(value),
         event_category: 'Performance',
       });
     }
   };
   ```

### Component 5.2: Developer Experience Architecture

**Integration Steps:**

1. **Pre-commit Hooks**

   ```json
   // package.json
   {
     "husky": {
       "hooks": {
         "pre-commit": "lint-staged"
       }
     },
     "lint-staged": {
       "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
     }
   }
   ```

2. **Dependency Management**
   ```yaml
   # .github/dependabot.yml
   version: 2
   updates:
     - package-ecosystem: 'npm'
       directory: '/'
       schedule:
         interval: 'weekly'
   ```

---

## Integration Testing

### Component Integration Testing

```typescript
// tests/integration/api-integration.test.ts
import { ApiClient } from '../../lib/api-client';

describe('API Integration', () => {
  test('contact form submission', async () => {
    const apiClient = new ApiClient();
    const response = await apiClient.post('/api/contact', {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Test message',
      source: 'contact-page',
    });

    expect(response.success).toBe(true);
  });
});
```

### End-to-End Integration Testing

```typescript
// e2e/integration.spec.ts
import { test, expect } from '@playwright/test';

test('complete contact form flow', async ({ page }) => {
  await page.goto('/contact');

  await page.fill('[name="name"]', 'Test User');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="subject"]', 'Test Subject');
  await page.fill('[name="message"]', 'Test message');

  await page.click('button[type="submit"]');

  await expect(page.locator('.success-message')).toBeVisible();
});
```

---

## Deployment Integration

### Frontend Deployment

```yaml
# .github/workflows/deploy-frontend.yml
name: Deploy Frontend
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Backend Deployment

```bash
# Deploy serverless functions
serverless deploy --stage production
```

---

## Success Criteria

### Phase 1 Success

- [ ] Test infrastructure stable and reliable
- [ ] Build pipeline optimized and automated
- [ ] CI/CD pipeline working consistently

### Phase 2 Success

- [ ] Backend APIs functional and secure
- [ ] Email service integration working
- [ ] Security measures implemented

### Phase 3 Success

- [ ] Frontend-backend integration complete
- [ ] Performance targets achieved
- [ ] Core Web Vitals optimized

### Phase 4 Success

- [ ] CMS integration functional
- [ ] Accessibility compliance achieved
- [ ] Monitoring and operations established

---

## Risk Mitigation

### Integration Risks

- **Component Dependencies:** Ensure proper dependency management
- **API Compatibility:** Maintain backward compatibility
- **Performance Impact:** Monitor performance throughout integration

### Mitigation Strategies

- **Incremental Integration:** Integrate components incrementally
- **Comprehensive Testing:** Test each integration step
- **Rollback Procedures:** Document rollback procedures
- **Monitoring:** Continuous monitoring during integration

---

**Integration Guide Status:** ✅ Complete  
**Total Components:** 12  
**Implementation Duration:** 8 weeks  
**Next Step:** Begin Phase 1 implementation

---

**Created:** October 25, 2025  
**Last Updated:** October 25, 2025  
**Version:** 1.0
