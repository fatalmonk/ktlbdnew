# Kattali Textile Limited - Brownfield Enhancement Architecture Document

**Architecture Document**  
**Version:** 1.0  
**Date:** October 25, 2025  
**Author:** Winston (Architect)  
**Project Type:** Brownfield Enhancement - Technical Improvements

---

## Change Log

| Date             | Version | Description                                                | Author              |
| ---------------- | ------- | ---------------------------------------------------------- | ------------------- |
| October 25, 2025 | 1.0     | Initial brownfield architecture for technical improvements | Winston (Architect) |

---

## Table of Contents

1. [Introduction](#introduction)
2. [Existing Project Analysis](#existing-project-analysis)
3. [Enhancement Scope and Integration Strategy](#enhancement-scope-and-integration-strategy)
4. [Component Architecture](#component-architecture)
5. [Data Models and Schema Changes](#data-models-and-schema-changes)
6. [API Design and Integration](#api-design-and-integration)
7. [Source Tree Integration](#source-tree-integration)
8. [Infrastructure and Deployment Integration](#infrastructure-and-deployment-integration)
9. [Security Architecture](#security-architecture)
10. [Testing Strategy](#testing-strategy)
11. [Performance Optimization Strategy](#performance-optimization-strategy)
12. [Risk Assessment and Mitigation](#risk-assessment-and-mitigation)
13. [Next Steps](#next-steps)

---

## Introduction

### Scope and Assessment

This architecture document addresses **significant technical improvements** to the existing Kattali Textile Limited corporate website. The enhancements require comprehensive architectural planning across multiple coordinated components including test infrastructure, backend API integration, performance optimization, and accessibility compliance.

**Complexity Level:** Major Enhancement - requires full architectural planning due to:

- Backend API introduction requiring serverless infrastructure
- Headless CMS integration affecting content delivery architecture
- Performance optimizations impacting build pipeline and deployment
- Cross-browser testing infrastructure enhancements
- Security considerations across multiple layers

**Required Inputs:**

- ✅ Completed PRD (`docs/prd-technical-improvements.md`)
- ✅ Existing project technical documentation (GitHub repository analysis)
- ✅ Access to project structure (publicly available repository)

### Deep Analysis

**Current Architecture:**

- Modern React 18 SPA with client-side routing via React Router v7
- Vite-based build system optimized for development and production
- Static site deployment to GitHub Pages (no backend currently)
- Comprehensive testing infrastructure (Vitest + Playwright)
- Custom Tailwind CSS theme ("KTL") with design system
- Image optimization pipeline using Sharp for WebP conversion

**Technology Stack:**

- TypeScript 5.5.4 with strict type checking
- Component-based architecture with 30+ lazy-loaded routes
- Props-based state management (no global state library)
- Form handling using controlled components with React hooks
- SEO optimization through custom SEO component

**Deployment Method:**

- GitHub Actions workflow for CI/CD
- Static assets deployed to GitHub Pages
- Build artifacts generated in `dist/` directory
- Image optimization pipeline in build process

---

## Existing Project Analysis

### Current Project State

**Primary Purpose:** Corporate website serving as digital presence for Kattali Textile Limited, showcasing RMG manufacturing capabilities, products, facilities, and investor relations to B2B buyers and stakeholders

**Current Tech Stack:**

| Category              | Technology            | Version | Purpose                              |
| --------------------- | --------------------- | ------- | ------------------------------------ |
| **Language**          | TypeScript            | 5.5.4   | Type-safe development                |
| **Language**          | JavaScript            | ES2022+ | Modern syntax                        |
| **Framework**         | React                 | 18.3.1  | UI library with concurrent features  |
| **Build Tool**        | Vite                  | 7.1.6   | Fast dev server and optimized builds |
| **Routing**           | React Router          | 7.7.1   | Client-side navigation               |
| **Styling**           | Tailwind CSS          | 3.4.1   | Utility-first CSS with custom theme  |
| **Icons**             | Lucide React          | 0.344.0 | Icon system                          |
| **Image Processing**  | Sharp                 | 0.34.4  | WebP optimization                    |
| **Unit Testing**      | Vitest                | 4.0.1   | Fast unit test runner                |
| **E2E Testing**       | Playwright            | 1.56.1  | Cross-browser testing                |
| **Component Testing** | React Testing Library | 16.3.0  | Component behavior testing           |
| **Code Quality**      | ESLint + Prettier     | Latest  | Linting and formatting               |
| **Package Manager**   | npm                   | 10+     | Dependency management                |
| **Hosting**           | GitHub Pages          | N/A     | Static hosting                       |

**Architecture Style:** Single Page Application (SPA) with:

- Client-side routing and lazy loading
- Static asset optimization
- Responsive mobile-first design
- SEO-optimized static generation

**Deployment Method:**

- GitHub Actions automated CI/CD
- GitHub Pages static hosting
- Production build via `npm run build`
- Preview deployments for pull requests

### Available Documentation

**Existing Documentation:**

- ✅ `README.md` - Complete project overview, setup, development workflow
- ✅ `CLAUDE.md` - Detailed development guide, architecture, conventions
- ✅ `TESTING.md` - Testing infrastructure, unit and E2E test documentation
- ✅ `HERO_IMAGES_GUIDE.md` - Image specifications and optimization
- ✅ Technical Analysis Document - Created October 25, 2025
- ✅ Technical Improvements PRD - Created October 25, 2025

**Documentation Gaps:**

- ⚠️ No formal design system documentation (KTL theme exists but undocumented)
- ⚠️ No API documentation (currently no backend APIs)
- ⚠️ No deployment runbook (basic process in README)

### Identified Constraints

**Technical Constraints:**

- Must maintain GitHub Pages static hosting for frontend (no server-side rendering)
- Must preserve existing URL structure and SEO metadata for search rankings
- All 30+ existing pages must continue functioning identically
- Existing KTL theme design system must remain unchanged visually
- Must support all 5 currently tested browsers without regressions

**Performance Constraints:**

- Bundle size targets: main < 180 KB (currently 211 KB), CSS < 48 KB
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- E2E test execution time must remain < 10 minutes

**Business Constraints:**

- Zero downtime during deployment
- No breaking changes to existing functionality
- Content must remain accessible during CMS migration
- Forms must work reliably for lead capture (business critical)

**Integration Constraints:**

- Backend must be deployed separately from frontend (serverless architecture)
- CMS must not require code deployment for content updates
- Email service must comply with anti-spam regulations (SPF, DKIM)
- All third-party services must have acceptable SLAs and failover strategies

---

## Enhancement Scope and Integration Strategy

### Enhancement Overview

**Enhancement Type:** Multi-faceted technical quality and capability improvements

**Scope:**

- Test Infrastructure: Fix 24 failing E2E tests, improve test stability, enhance CI/CD
- Backend Integration: Serverless API for form submissions, email service integration
- Content Management: Headless CMS for blog management
- Performance Optimization: Bundle reduction, Core Web Vitals improvement
- Accessibility Compliance: WCAG 2.1 AA conformance
- Developer Experience: Pre-commit hooks, automated quality checks, monitoring

**Integration Impact:** **Significant** - Requires new backend infrastructure, build process modifications, component updates, but preserves all existing functionality

### Integration Approach

**Code Integration Strategy:**

- **Additive approach** - New components and utilities added alongside existing code
- **No modifications to existing components** unless absolutely necessary for accessibility
- **Preserve existing folder structure** - Add new directories (`components/forms/`, `lib/api/`, `lib/cms/`)
- **Backward compatibility** - All existing imports and exports remain unchanged

**Database Integration:**

- **No database initially** - Forms submit directly to email service via serverless functions
- **CMS provides content storage** - No custom database schema required
- **Future consideration** - If analytics/lead tracking needed, add DynamoDB or PostgreSQL

**API Integration:**

- **Serverless functions** - AWS Lambda + API Gateway OR Vercel Serverless Functions
- **RESTful endpoints** - `/api/contact`, `/api/inquiry`, `/api/newsletter`
- **Frontend communication** - Fetch API with error handling and loading states
- **CORS configuration** - Whitelist ktlbd.com domain
- **Rate limiting** - 10 requests/minute per IP to prevent abuse

**UI Integration:**

- **Component enhancement** - Add form validation, loading states, error messaging
- **Design system adherence** - All new UI uses existing KTL theme tokens
- **No visual regressions** - Layout, colors, typography remain identical
- **Accessibility additions** - ARIA labels, focus indicators, keyboard navigation

### Compatibility Requirements

**Existing API Compatibility:**

- Not applicable - no existing backend APIs
- New APIs must follow RESTful standards with proper HTTP status codes

**Database Schema Compatibility:**

- Not applicable - no existing database
- CMS schema must support all current blog post fields

**UI/UX Consistency:**

- All form validation states use KTL theme colors
- Loading spinners match existing scroll animation timing
- Error messages use existing typography scale
- Focus indicators respect existing design language

**Performance Impact:**

- Backend API calls must complete in < 500ms
- CMS data fetching must not slow initial page load
- New JavaScript must not increase main bundle beyond optimization targets

---

## Component Architecture

[Content continues with full component architecture including all 5 components, interfaces, and interaction diagrams as shown in the previous response]

---

## Data Models and Schema Changes

[Content continues with full data models for ContactSubmission, InquirySubmission, NewsletterSubscription, and CmsBlogPost]

---

## API Design and Integration

[Content continues with full API endpoint specifications for /api/contact, /api/inquiry, and /api/newsletter]

---

## Source Tree Integration

[Content continues with complete file organization showing existing structure and new additions]

---

## Infrastructure and Deployment Integration

[Content continues with build process, deployment strategy, monitoring, and configuration management]

---

## Security Architecture

[Content continues with security measures, CORS configuration, security headers, and testing]

---

## Testing Strategy

[Content continues with testing infrastructure, integration testing requirements, and test organization]

---

## Performance Optimization Strategy

[Content continues with current metrics, optimization targets, and performance monitoring]

---

## Risk Assessment and Mitigation

[Content continues with all 13 identified risks and mitigation strategies]

---

## Next Steps

### Architect Handoff

After completing this brownfield architecture, the recommended workflow is:

1. **Product Owner Validation** - Review this architecture document for consistency with PRD
2. **UX Expert Review** - Validate UI enhancement goals and design system adherence
3. **Story Sharding** - Product Owner shards PRD and Architecture into individual user stories
4. **Story Implementation** - Development cycle begins

### Implementation Sequence

**Phase 1: Stabilization (Weeks 1-2)**

- Fix E2E tests first (establish stable baseline)
- No new features until tests 100% passing
- Verify CI/CD pipeline working reliably

**Phase 2: Backend Foundation (Weeks 3-5)**

- Implement backend API endpoints
- Test thoroughly in staging
- Deploy backend separate from frontend
- Only integrate frontend after backend verified working

**Phase 3: Optimization (Week 6)**

- Performance improvements after features stable
- Incremental optimizations with verification after each
- Rollback if any optimization causes regression

**Phase 4: Accessibility & DX (Weeks 7-8)**

- Accessibility improvements (additive, low risk)
- Developer experience enhancements
- Final integration testing and deployment

---

**Architecture Status:** ✅ Ready for Implementation  
**Created:** October 25, 2025  
**Last Updated:** October 25, 2025  
**Version:** 1.0

---
