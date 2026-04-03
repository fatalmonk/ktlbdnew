# Kattali Textile Limited - Technical Improvements PRD

**Product Requirements Document**  
**Version:** 1.0  
**Date:** October 25, 2025  
**Author:** John (Product Manager)  
**Project Type:** Brownfield Enhancement - Technical Improvements

---

## Change Log

| Date             | Version | Description                            | Author    |
| ---------------- | ------- | -------------------------------------- | --------- |
| October 25, 2025 | 1.0     | Initial PRD for technical improvements | John (PM) |

---

## Table of Contents

1. [Project Analysis and Context](#project-analysis-and-context)
2. [Goals and Background Context](#goals-and-background-context)
3. [Requirements](#requirements)
4. [User Interface Enhancement Goals](#user-interface-enhancement-goals)
5. [Technical Constraints and Integration Requirements](#technical-constraints-and-integration-requirements)
6. [Risk Assessment and Mitigation](#risk-assessment-and-mitigation)
7. [Epic and Story Structure](#epic-and-story-structure)
8. [Technical Assumptions](#technical-assumptions)
9. [Next Steps](#next-steps)

---

## Project Analysis and Context

### Enhancement Scope Assessment

This PRD addresses **significant technical improvements** to the existing Kattali Textile Limited corporate website. The enhancements require comprehensive planning across multiple stories covering test stabilization, backend integration, performance optimization, and accessibility compliance.

**Complexity Level:** Major Enhancement - requires architectural planning and multiple coordinated stories

### Existing Project Overview

**Analysis Source:** Technical Analysis Document created by Winston (Architect) on October 25, 2025

**Current Project State:**  
The Kattali Textile Limited website is a production-ready React 18 SPA with 30+ pages, comprehensive SEO implementation, and strong testing infrastructure. The application serves as the primary digital presence for a Bangladesh-based RMG factory, showcasing products (Denims, Knitwear, Swimwear, Kids apparel), company information, facilities, and investor relations.

**Key Current Capabilities:**

- 30+ lazy-loaded pages with React Router
- Blog system with 9,200+ words of content
- Complete product catalog and investor relations section
- SEO-optimized with OpenGraph, Twitter Cards, JSON-LD, and sitemap
- Responsive design with custom Tailwind "KTL" theme
- 64 passing unit tests (100% success)
- 126 passing E2E tests (84% success rate)

### Available Documentation Analysis

**Document-Project Analysis Available:** Yes - comprehensive technical analysis completed

**Existing Documentation:**

- ✅ Tech Stack Documentation - Complete (React 18.3.1, TypeScript 5.5.4, Vite 7.1.6, etc.)
- ✅ Source Tree/Architecture - Complete project structure documented
- ✅ Coding Standards - Partial (ESLint, Prettier, TypeScript configured)
- ✅ Technical Debt Documentation - Complete inventory with prioritization
- ✅ Performance Metrics - Bundle sizes and optimization opportunities documented
- ⚠️ API Documentation - Not applicable (currently static site)
- ⚠️ UX/UI Guidelines - Design system exists (KTL theme) but not formally documented
- ❌ Accessibility Audit - Not yet completed

### Enhancement Type

**Primary Enhancement Categories:**

- ✅ **Bug Fix and Stability Improvements** - Fix 24 failing E2E tests
- ✅ **Performance/Scalability Improvements** - Optimize bundle size and Core Web Vitals
- ✅ **Integration with New Systems** - Backend API for forms, CMS for blog
- ✅ **Technology Stack Upgrade** - Enhanced developer tooling and CI/CD

### Enhancement Description

Systematically improve the technical quality, reliability, and functionality of the Kattali Textile Limited website by fixing all failing E2E tests, integrating backend services for form submission and content management, optimizing performance for better SEO and user experience, ensuring WCAG 2.1 AA accessibility compliance, and enhancing developer experience with improved tooling and automation.

### Impact Assessment

**Significant Impact** - substantial existing code changes required

**Areas of Impact:**

- Test suite modifications across 5 browser configurations
- Build configuration updates for optimization
- New backend integration requiring API endpoints
- Component updates for accessibility compliance
- CI/CD pipeline enhancements
- Developer workflow improvements

---

## Goals and Background Context

### Goals

**Primary Objectives:**

1. Achieve 100% E2E test pass rate across all 5 browsers (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari) for deployment confidence
2. Enable lead capture through functional contact/inquiry forms with backend submission handling
3. Improve Core Web Vitals scores (LCP < 2.5s, FID < 100ms, CLS < 0.1) for better SEO rankings and user experience
4. Achieve WCAG 2.1 AA accessibility compliance to expand audience reach and meet international standards
5. Enhance developer experience with automated quality checks, improved CI/CD, and better documentation
6. Implement headless CMS for blog management to enable non-technical content updates

### Background Context

The Kattali Textile Limited website successfully launched with strong foundational architecture but has several technical improvements identified through testing and analysis. Currently, 16% of E2E tests fail across different browsers, indicating potential production issues that could affect user experience. The static nature of the site prevents lead capture through forms, resulting in lost business opportunities. Performance optimization opportunities exist to improve search engine rankings and mobile user experience, critical for B2B textile buyers researching manufacturers.

These technical improvements will transform the website from a functional MVP to a production-grade, enterprise-quality digital asset that supports Kattali Textile's business development goals while maintaining the existing brand presence and content.

---

## Requirements

### Functional Requirements

**FR1:** All 150 E2E tests must pass consistently across Chromium, Firefox, WebKit, Mobile Chrome, and Mobile Safari browsers with zero flaky tests

**FR2:** Contact and inquiry forms must submit data to a backend API endpoint that sends email notifications to the sales team

**FR3:** Newsletter subscription form must integrate with email service provider (SendGrid, AWS SES, or Mailgun) for subscriber management

**FR4:** Blog content must be manageable through a headless CMS interface without requiring code deployment

**FR5:** All existing pages and functionality must remain intact and operational after technical improvements

**FR6:** Form submissions must include validation, error handling, success messaging, and protection against spam/abuse

**FR7:** CMS integration must preserve existing blog content, URL structure, and SEO metadata

**FR8:** All interactive elements must be fully keyboard accessible for accessibility compliance

**FR9:** Color contrast must meet WCAG 2.1 AA standards throughout the application

**FR10:** Screen readers must be able to navigate and understand all content and functionality

### Non-Functional Requirements

**NFR1:** Main JavaScript bundle size must be reduced to < 180 KB (currently 211 KB) through optimization

**NFR2:** Lighthouse Performance score must be 95+ across all pages

**NFR3:** Largest Contentful Paint (LCP) must be < 2.5 seconds on 3G network conditions

**NFR4:** First Input Delay (FID) must be < 100ms for all user interactions

**NFR5:** Cumulative Layout Shift (CLS) must be < 0.1 to prevent layout jumping

**NFR6:** E2E test suite execution time must be < 10 minutes for rapid feedback

**NFR7:** Backend API response time must be < 500ms for form submissions

**NFR8:** Lighthouse Accessibility score must be 100 with zero critical WCAG violations

**NFR9:** All code changes must maintain TypeScript type safety with no `any` types

**NFR10:** CI/CD pipeline must run all tests automatically on every pull request

### Compatibility Requirements

**CR1:** **Existing API Compatibility** - Not applicable (currently no backend APIs); new backend must follow RESTful standards

**CR2:** **Database Schema Compatibility** - Not applicable (currently no database); new backend should use industry-standard schema design

**CR3:** **UI/UX Consistency** - All improvements must maintain existing KTL theme design system, color palette, typography, spacing, and component patterns without visual regression

**CR4:** **Integration Compatibility** - Existing integrations (Google Business, social sharing) must remain functional; new backend must not interfere with current static asset serving

**CR5:** **Browser Compatibility** - Must maintain support for all currently tested browsers (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari) without introducing new incompatibilities

**CR6:** **SEO Compatibility** - All URL structures, metadata, and structured data must remain unchanged; CMS integration must preserve or enhance SEO capabilities

**CR7:** **Deployment Compatibility** - GitHub Pages deployment must continue working; backend services must be deployable separately (serverless or containerized)

---

## User Interface Enhancement Goals

### Integration with Existing UI

All UI changes will maintain strict adherence to the existing KTL theme design system. Form validation states, loading indicators, and error messages will use consistent color tokens, typography, and spacing patterns already established in the codebase. Accessibility improvements (focus indicators, ARIA labels) will be visually subtle and consistent with current design language.

### Modified/New Screens and Views

**Modified Pages:**

- Contact page - Enhanced form with validation, loading states, success/error messaging
- All pages with inquiry forms - Backend integration and validation
- Blog listing and individual post pages - CMS integration (visual appearance unchanged)

**New Components:**

- Form validation feedback components (inline errors, success messages)
- Loading spinners for async operations
- Toast notifications for form submissions

**No New Pages:** All improvements are enhancements to existing pages

### UI Consistency Requirements

**UC1:** All new UI elements (validation messages, loading states, notifications) must use color tokens from the KTL theme

**UC2:** Typography for error messages and feedback must match existing font families, sizes, and weights

**UC3:** Spacing and layout of form elements must maintain current grid and spacing system

**UC4:** Animation timing and easing functions must match existing scroll animations and transitions

**UC5:** Focus indicators for accessibility must use theme colors with sufficient contrast

**UC6:** Mobile responsive behavior must maintain existing breakpoints and layout patterns

---

## Technical Constraints and Integration Requirements

### Existing Technology Stack

| Category               | Technology            | Version | Constraints                           |
| ---------------------- | --------------------- | ------- | ------------------------------------- |
| **Languages**          | TypeScript            | 5.5.4   | Maintain strict type safety           |
| **Languages**          | JavaScript            | ES2022+ | Continue using modern syntax          |
| **Frontend Framework** | React                 | 18.3.1  | Use concurrent features               |
| **Build Tool**         | Vite                  | 7.1.6   | Optimize build configuration          |
| **Routing**            | React Router          | 7.7.1   | Maintain existing routing structure   |
| **Styling**            | Tailwind CSS          | 3.4.1   | Continue using KTL custom theme       |
| **Icons**              | Lucide React          | 0.344.0 | Use for any new icons needed          |
| **Image Processing**   | Sharp                 | 0.34.4  | Continue WebP optimization            |
| **Unit Testing**       | Vitest                | 4.0.1   | Maintain test patterns                |
| **E2E Testing**        | Playwright            | 1.56.1  | Fix existing tests, maintain coverage |
| **Component Testing**  | React Testing Library | 16.3.0  | Continue using for new components     |
| **Code Quality**       | ESLint + Prettier     | Latest  | Enhance with stricter rules           |
| **Package Manager**    | npm                   | 10+     | Continue using npm                    |
| **Hosting**            | GitHub Pages          | N/A     | Continue for frontend                 |

**New Technologies to Add:**

| Category                  | Recommended Technology                                  | Purpose                      | Rationale                                         |
| ------------------------- | ------------------------------------------------------- | ---------------------------- | ------------------------------------------------- |
| **Backend**               | AWS Lambda + API Gateway OR Vercel Serverless Functions | Form handling, API endpoints | Cost-effective, auto-scaling, minimal maintenance |
| **Email Service**         | SendGrid OR AWS SES                                     | Transactional emails         | Reliable delivery, good free tier                 |
| **Headless CMS**          | Contentful OR Sanity                                    | Blog management              | Modern API, good DX, generous free tier           |
| **Pre-commit Hooks**      | Husky + lint-staged                                     | Automated quality checks     | Industry standard                                 |
| **Dependency Management** | Dependabot                                              | Security updates             | GitHub native, automatic PRs                      |

### Integration Approach

**Database Integration Strategy:**

- Initial implementation: No database required
- Form submissions sent directly to email service
- CMS provides content storage (no custom database needed)
- Future consideration: DynamoDB or PostgreSQL if analytics/storage needed

**API Integration Strategy:**

- RESTful API endpoints using serverless functions
- Endpoints: `/api/contact`, `/api/inquiry`, `/api/newsletter`
- CORS configuration to allow requests from ktlbd.com domain
- Rate limiting to prevent abuse (10 requests/minute per IP)
- Input validation using Zod or Joi schemas
- Error handling with appropriate HTTP status codes

**Frontend Integration Strategy:**

- Axios or Fetch API for backend communication
- Loading states during API calls
- Error handling with user-friendly messages
- Success feedback with toast notifications
- Form state management using React hooks
- CMS data fetched at build time (static generation) or runtime (ISR)

**Testing Integration Strategy:**

- Unit tests for form validation logic
- Integration tests for API communication
- E2E tests for complete form submission flow
- Mock API responses in test environment
- Visual regression testing for UI consistency

### Code Organization and Standards

**File Structure Approach:**  
Continue using existing structure with additions:

src/
├── components/
│ ├── forms/ # NEW: Form components
│ │ ├── ContactForm.tsx
│ │ ├── FormField.tsx
│ │ ├── ValidationMessage.tsx
│ │ └── LoadingButton.tsx
│ ├── notifications/ # NEW: Toast notifications
│ └── [existing components]
├── lib/
│ ├── api/ # NEW: API client utilities
│ │ ├── client.ts
│ │ ├── endpoints.ts
│ │ └── validation.ts
│ ├── cms/ # NEW: CMS integration
│ │ ├── contentful.ts
│ │ └── transforms.ts
│ └── [existing utilities]
├── hooks/
│ ├── useFormSubmit.ts # NEW: Form submission hook
│ └── [existing hooks]
└── types/
├── api.ts # NEW: API types
└── cms.ts # NEW: CMS types

backend/ # NEW: Serverless functions
├── functions/
│ ├── contact.ts
│ ├── inquiry.ts
│ └── newsletter.ts
├── lib/
│ ├── email.ts
│ ├── validation.ts
│ └── spam-protection.ts
└── tests/

**Naming Conventions:**

- Maintain PascalCase for React components
- camelCase for functions, variables, and hooks
- UPPER_SNAKE_CASE for environment variables
- kebab-case for file names of utilities
- Prefix custom hooks with `use`
- Suffix test files with `.test.ts` or `.test.tsx`

**Coding Standards:**

- TypeScript strict mode enabled
- No `any` types (use `unknown` if truly dynamic)
- ESLint rules enforced via pre-commit hooks
- Prettier formatting automated
- Maximum function length: 50 lines
- Comprehensive JSDoc comments for complex functions

**Documentation Standards:**

- README updates for new features
- API endpoint documentation with request/response examples
- Environment variable documentation
- Architecture decision records (ADRs) for major changes
- Inline code comments for complex logic

### Deployment and Operations

**Build Process Integration:**

- Vite build continues for frontend static assets
- Separate build process for serverless functions
- Environment-specific builds (dev, staging, production)
- Pre-build optimization scripts (image optimization, sitemap generation)

**Deployment Strategy:**

- **Frontend:** Continue GitHub Pages deployment via GitHub Actions
- **Backend:** Deploy serverless functions to AWS Lambda or Vercel
- **CMS:** Cloud-hosted (Contentful/Sanity) - no deployment needed
- **Staging Environment:** Separate deployment for testing before production
- **Rollback Plan:** Git tags for quick reversion, serverless versions for backend

**Monitoring and Logging:**

- **Frontend:** Google Analytics 4 for user behavior
- **Backend:** CloudWatch Logs (AWS) or Vercel Logs for function execution
- **Error Tracking:** Sentry or similar for production error monitoring
- **Performance:** Real User Monitoring (RUM) for Core Web Vitals
- **Uptime:** UptimeRobot or Pingdom for availability monitoring

**Configuration Management:**

- Environment variables for API keys, endpoints
- Separate `.env.development`, `.env.production` files
- Secrets stored in GitHub Secrets or AWS Secrets Manager
- Configuration validation on application startup

---

## Risk Assessment and Mitigation

### Technical Risks

**TR1:** E2E test fixes may introduce new regressions in other browsers  
**Mitigation:** Incremental fixes with full regression testing after each browser; automated cross-browser CI testing

**TR2:** Backend integration may expose security vulnerabilities (XSS, CSRF, SQL injection)  
**Mitigation:** Input validation, CORS restrictions, rate limiting, security headers, regular security audits

**TR3:** Performance optimizations may cause layout shifts or visual regressions  
**Mitigation:** Visual regression testing with Percy or similar; manual QA across devices

**TR4:** CMS integration may break existing blog content or URLs  
**Mitigation:** Content migration validation; URL preservation testing; staging environment verification

**TR5:** Third-party service downtime (CMS, email service) may impact functionality  
**Mitigation:** Graceful degradation; fallback mechanisms; status monitoring; SLA review

### Integration Risks

**IR1:** Frontend-backend communication may fail due to CORS issues  
**Mitigation:** Proper CORS configuration; thorough integration testing

**IR2:** CMS API changes may break content fetching  
**Mitigation:** Version locking; automated tests for CMS integration; monitoring

**IR3:** Email delivery may be unreliable or blocked by spam filters  
**Mitigation:** Use reputable email service; SPF/DKIM configuration; delivery monitoring

### Deployment Risks

**DR1:** GitHub Pages deployment may fail with new build configuration  
**Mitigation:** Test deployment in staging; rollback procedure documented

**DR2:** Serverless cold starts may cause slow initial form submissions  
**Mitigation:** Keep functions warm with scheduled pings; optimize bundle size

**DR3:** Environment variable misconfiguration may cause production failures  
**Mitigation:** Configuration validation; staging environment testing; deployment checklist

### Mitigation Strategies Summary

- Comprehensive staging environment for all testing before production
- Incremental rollout with feature flags where applicable
- Automated monitoring and alerting for critical functions
- Documented rollback procedures for each component
- Regular security audits and dependency updates

---

## Epic and Story Structure

### Epic Structure Decision

**Decision:** Single comprehensive epic for technical improvements

**Rationale:** All improvements are interconnected technical enhancements to the same system. Separating into multiple epics would create unnecessary overhead and potential integration conflicts. A single epic with sequenced stories ensures systematic, incremental improvements while maintaining system integrity throughout.

---

## Epic 1: Technical Quality & Capability Enhancements

**Epic Goal:**  
Transform the Kattali Textile Limited website from a functional MVP to a production-grade, enterprise-quality digital asset by achieving 100% test stability, enabling lead capture through backend integration, optimizing performance for SEO competitiveness, ensuring accessibility compliance, and enhancing developer productivity.

**Business Value:**

- Increased lead generation through functional contact forms
- Improved search engine rankings via performance optimization
- Broader audience reach through accessibility compliance
- Reduced deployment risk through test stability
- Faster feature delivery through improved developer experience

**Integration Requirements:**

- All changes must preserve existing functionality and visual design
- Backend integration must not interfere with static asset serving
- Performance optimizations must not break lazy loading or code splitting
- Accessibility improvements must maintain brand visual identity

---

### User Stories

[Complete list of 27 stories from Story 1.1 through Story 1.27 as detailed in previous PRD]

---

## Technical Assumptions

- **Repository Structure:** Monorepo - Keep frontend and backend serverless functions in single repository for easier coordination
- **Service Architecture:** Monolith (Frontend) + Serverless (Backend) - Frontend remains static SPA; backend uses serverless functions for cost-effectiveness and scalability
- **Testing Requirements:** Full Testing Pyramid - Unit tests for logic, integration tests for API, E2E tests for user flows
- **Backend Technology:** AWS Lambda + API Gateway OR Vercel Serverless Functions
- **Email Service:** SendGrid OR AWS SES
- **CMS:** Contentful OR Sanity
- **Error Tracking:** Sentry
- **Analytics:** Google Analytics 4
- **Monitoring:** UptimeRobot

---

## Next Steps

### UX Expert Prompt

"Based on the Technical Improvements PRD for Kattali Textile Limited, please review the UI Enhancement Goals section and provide feedback on maintaining design consistency while adding form validation states, loading indicators, and accessibility improvements. Specifically, advise on focus indicator styling, error message design, and loading spinner integration that aligns with the existing KTL theme."

### Architect Prompt

"Based on the Technical Improvements PRD for Kattali Textile Limited, please create a brownfield architecture document detailing the integration strategy for backend serverless functions, CMS integration, and frontend API communication. Address deployment architecture, security considerations (CORS, rate limiting, input validation), and monitoring/logging approach. Ensure all recommendations preserve the existing GitHub Pages frontend deployment while adding backend capabilities."

---

**PRD Status:** ✅ Ready for Implementation  
**Created:** October 25, 2025  
**Last Updated:** October 25, 2025  
**Version:** 1.0

---
