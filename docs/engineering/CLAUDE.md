# CLAUDE.md

This file provides comprehensive guidance to Claude Code (claude.ai/code) when working with this repository.
**Last Updated:** October 23, 2025

---

## 📋 Project Overview

### What This Is

The **Kattali Textile Ltd (KTL) Corporate Website** - A modern, performance-optimized single-page application showcasing Bangladesh's leading textile manufacturer and exporter.

### Monorepo layout

The git repository is an **npm workspace**: the Vite + React app lives in **`apps/web/`**. Install dependencies and run scripts from the **repository root** (`npm install`, `npm run dev`, `npm run test:run`, …) so they delegate to `apps/web` via the root `package.json`. Paths like `src/` in this document are relative to **`apps/web/`** unless noted.

### Purpose

- Showcase KTL's products, facilities, and capabilities to global buyers
- Provide comprehensive investor relations information
- Enable business inquiries through contact forms
- Demonstrate sustainability and corporate governance
- Attract talent and partners

### Key Features

- **30+ Pages**: Product catalog, company info, facilities, investor relations, newsroom
- **Company Stories Blog**: SEO-optimized blog system integrated into Newsroom section
- **Optimized Performance**: WebP images, lazy loading, code splitting
- **SEO Ready**: OpenGraph, Twitter Cards, JSON-LD structured data, sitemap
- **Responsive Design**: Mobile-first approach with custom Tailwind theme
- **Investor Relations**: Financial data, stock info, reports, events
- **Contact Forms**: Professional inquiry forms with validation
- **Scroll Animations**: Intersection Observer-based reveal animations
- **Google Integration**: Google Business Profile widgets and Maps locator
- **Comprehensive Testing**: Unit tests (Vitest) and E2E tests (Playwright)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 20+ (check with `node --version`)
- **npm**: 10+ (check with `npm --version`)
- **Git**: For version control

### Installation

```bash
# Clone the repository (use your remote URL and checkout folder name)
git clone <YOUR_REPO_URL>
cd <YOUR_REPO_CHECKOUT_DIR>

# Install dependencies (from monorepo root)
npm install

# Optional: env for maps, Datadog, API proxy — see apps/web/.env.example
cp apps/web/.env.example apps/web/.env.local

# Start development server (from repo root)
npm run dev
```

The site will be available at:

- **Local**: http://localhost:5173/
- **Network**: http://[YOUR_IP]:5173/ (for mobile testing)

---

## 📁 Project Structure

Paths below are under **`apps/web/`** (the Vite application package).

```
apps/web/
├── src/                          # Source code
│   ├── App.tsx                   # Main app with React Router setup
│   ├── main.tsx                  # Application entry point
│   ├── index.css                 # Global styles + Tailwind directives
│   │
│   ├── components/               # Shared UI components
│   │   ├── Header.tsx            # Site header with navigation
│   │   ├── Footer.tsx            # ✨ Site footer with Google Business & social links
│   │   ├── DesktopMegaMenu.tsx   # Desktop dropdown navigation
│   │   ├── MobileNavigation.tsx  # Mobile hamburger menu
│   │   ├── FloatingCTA.tsx       # Floating call-to-action button
│   │   ├── ContactForm.tsx       # ✨ Professional contact form with validation
│   │   ├── BlogCard.tsx          # ✨ Blog post preview card
│   │   ├── OptimizedImage.tsx    # ✨ WebP images with lazy loading
│   │   ├── ScrollReveal.tsx      # ✨ Scroll-triggered animations
│   │   ├── StructuredData.tsx    # ✨ JSON-LD schema generator
│   │   ├── SEO.tsx               # SEO meta tags (OpenGraph, Twitter)
│   │   ├── KTLHero.tsx           # Hero section with slideshow
│   │   ├── HeroVideo.tsx         # Video hero component
│   │   ├── LogoLoop.tsx          # Animated logo carousel
│   │   ├── Button.tsx            # Reusable button component
│   │   ├── Loading.tsx           # Loading spinner
│   │   ├── ErrorBoundary.tsx     # Error boundary wrapper
│   │   ├── Search.tsx            # Navigation search
│   │   ├── ResponsiveImage.tsx   # Responsive image handler
│   │   ├── ImageX.tsx            # Enhanced image component
│   │   ├── GoogleMapsLocator.tsx # ✨ Google Maps integration
│   │   └── GoogleBusinessWidget.tsx # ✨ Google Business integration
│   │
│   ├── hooks/                    # Custom React hooks
│   │   └── useScrollAnimation.ts # ✨ Scroll animation hook
│   │
│   ├── pages/                    # Page components (lazy-loaded)
│   │   ├── Home.tsx              # Homepage with hero + stats
│   │   ├── Products.tsx          # Product catalog overview
│   │   ├── Contact.tsx           # Contact page with form
│   │   ├── Investors.tsx         # Investor relations hub
│   │   ├── Blog.tsx              # ✨ Blog listing page (Company Stories)
│   │   ├── BlogPost.tsx          # ✨ Individual blog post page
│   │   │
│   │   ├── products/             # Product category pages
│   │   │   ├── denims/           # Denim products
│   │   │   ├── knitwear/         # Knitwear products
│   │   │   ├── swimwear/         # Swimwear products
│   │   │   └── kids/             # Children's apparel
│   │   │
│   │   ├── company/              # Company information
│   │   │   ├── our-story/        # Company history
│   │   │   ├── leadership/       # Leadership team
│   │   │   ├── governance/       # Corporate governance
│   │   │   └── sustainability/   # Sustainability initiatives
│   │   │
│   │   ├── facilities/           # Manufacturing facilities
│   │   │   ├── rmg/              # Ready-made garments facility
│   │   │   ├── washing/          # Washing facility
│   │   │   ├── tech/             # Technology center
│   │   │   ├── agro/             # Agro facility
│   │   │   └── shipping/         # Shipping & logistics
│   │   │
│   │   ├── work-with-us/         # Partnership & careers
│   │   │   ├── buyers/           # For buyers/clients
│   │   │   ├── vendors/          # For vendors/suppliers
│   │   │   └── careers/          # Job opportunities
│   │   │
│   │   ├── newsroom/             # News & media
│   │   │   ├── press/            # Press releases
│   │   │   ├── stories/          # Company stories
│   │   │   ├── psi/              # Price-sensitive info
│   │   │   └── media-kit/        # Media resources
│   │   │
│   │   └── investors/            # Investor relations pages
│   │       ├── overview/         # IR overview
│   │       ├── stock/            # Stock information
│   │       ├── reports/          # Financial reports
│   │       │   ├── quarterly/    # Quarterly reports
│   │       │   ├── annual/       # Annual reports
│   │       │   └── psi/          # Price-sensitive info
│   │       └── contacts/         # IR contacts
│   │
│   ├── ir/                       # Investor Relations module
│   │   ├── types.ts              # TypeScript types for IR data
│   │   ├── __tests__/            # IR component tests
│   │   └── components/           # IR-specific components
│   │       ├── EmailAlertsCTA.tsx
│   │       ├── FilesList.tsx     # Display IR files (PDFs, webcasts)
│   │       ├── ItemsList.tsx     # Display IR items (events, press)
│   │       ├── KPIGrid.tsx       # Key performance indicators
│   │       └── MetricBand.tsx    # Financial metrics banner
│   │
│   ├── lib/                      # Utilities and configuration
│   │   ├── navigation.ts         # Navigation menu structure
│   │   ├── constants.ts          # App-wide constants
│   │   └── utils.ts              # Helper functions (cn, etc.)
│   │
│   └── styles/
│       └── ir.css                # IR-specific styles
│
├── public/                       # Static assets
│   ├── assets/                   # Original images
│   ├── assets-optimized/         # ✨ Optimized WebP images
│   ├── data/
│   │   ├── blog/                 # ✨ Blog/Company Stories data
│   │   │   ├── index.json        # Blog posts metadata and categories
│   │   │   ├── inside-kattali-textile-legacy-full.md
│   │   │   ├── woven-garment-export-powerhouse-full.md
│   │   │   └── global-textile-sourcing-partnerships-full.md
│   │   └── ir/                   # IR JSON data
│   │       ├── events.json       # IR events
│   │       ├── filings.json      # Regulatory filings
│   │       ├── kpis.json         # Key performance indicators
│   │       ├── press.json        # Press releases
│   │       ├── price.json        # Stock price data
│   │       └── results.json      # Financial results
│   ├── logos/                    # Brand logos
│   ├── sitemap.xml               # ✨ SEO sitemap
│   └── robots.txt                # ✨ Search engine instructions
│
├── optimize-images.js            # ✨ Image optimization script
├── generate-sitemap.js           # ✨ Sitemap generation script
├── package.json                  # Dependencies and scripts
├── vite.config.ts                # Vite configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── eslint.config.js              # ESLint configuration
└── README.md                     # App readme; repo docs: ../../docs/engineering/

✨ = Recently added/enhanced
```

---

## 🛠️ Technology Stack

### Core Technologies

- **React 18.3.1**: UI library with hooks and concurrent features
- **TypeScript 5.5.4**: Type-safe JavaScript
- **Vite 7.1.6**: Fast build tool and dev server
- **React Router 7.7.1**: Client-side routing with lazy loading

### Styling & UI

- **Tailwind CSS 3.4.1**: Utility-first CSS framework
- **Custom "KTL" Theme**: Brand-specific design system
- **PostCSS + Autoprefixer**: CSS processing
- **Lucide React 0.344.0**: Icon library

### Development Tools

- **ESLint 9.9.1**: Code linting with TypeScript support
- **TypeScript ESLint**: TypeScript-specific linting rules
- **React Hooks ESLint**: Hook usage validation
- **Prettier**: Code formatting (via npm run format)

### Testing

- **Vitest 4.0.1**: Fast unit testing framework with jsdom
- **Playwright 1.56.1**: Cross-browser E2E testing (Chromium, Firefox, WebKit)
- **React Testing Library 16.3.0**: Component testing with user-centric queries
- **@vitest/coverage-v8**: Code coverage reporting
- **@vitest/ui**: Interactive test UI

### Performance & Optimization

- **Sharp 0.34.4**: Image processing and optimization
- **Code Splitting**: Automatic via React.lazy()
- **Tree Shaking**: Dead code elimination via Vite

### Utilities

- **clsx 2.1.1**: Conditional className utility
- **tailwind-merge 3.3.1**: Merge Tailwind classes intelligently

---

## 🎯 Development Workflow

### Essential Commands

```bash
# Development
npm run dev          # Start dev server on localhost:5173
npm run build        # Production build to ./dist
npm run preview      # Preview production build on localhost:4173

# Code Quality
npm run typecheck    # TypeScript type checking (no emit)
npm run lint         # ESLint checking
npm run format       # Prettier formatting

# Testing
npm run test         # Run unit tests with Vitest
npm run test:ui      # Open Vitest UI for interactive testing
npm run test:run     # Run tests once without watch mode
npm run test:coverage # Run tests with coverage report
npm run test:e2e     # Run Playwright E2E tests
npm run test:all     # Run all tests (unit + E2E)

# Utilities
npm run clean        # Remove build artifacts
npm run optimize-images    # ✨ Optimize images to WebP
npm run generate-sitemap   # ✨ Generate sitemap.xml
```

### Special Commands

```bash
# WSL-specific builds (for WSL development environment)
npm run build:wsl    # Build to $HOME/WEB20_project_dist
npm run preview:wsl  # Preview WSL build on port 4173
```

### Development Server Details

- **Port**: 5173 (configurable via `--port` flag)
- **Host**: Exposed on all network interfaces (`0.0.0.0`)
- **Hot Module Replacement**: Enabled for instant updates
- **Allowed Hosts**: localhost, .repl.co, .id.repl.co

### Build Process

```bash
npm run build
```

**What Happens:**

1. TypeScript compilation and type checking
2. Code splitting and tree shaking
3. Asset optimization and hashing
4. CSS extraction and minification
5. Output to `./dist` directory

**Bundle Analysis:**

- Main bundle: ~211 KB (67 KB gzipped)
- CSS bundle: ~48 KB (8.6 KB gzipped)
- Individual route chunks: 1-17 KB each
- Total: Highly optimized with lazy loading

---

## 🏗️ Architecture & Design Patterns

### Routing & Code Splitting

**Pattern**: Lazy-loaded routes with Suspense boundaries

```tsx
// App.tsx
const Home = React.lazy(() => import('./pages/Home'));
const Products = React.lazy(() => import('./pages/Products'));

<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products" element={<Products />} />
  </Routes>
</Suspense>;
```

**Benefits:**

- Smaller initial bundle size
- Faster time-to-interactive
- Better user experience on slow connections

### Navigation System

**Central Source of Truth**: `src/lib/navigation.ts`

```typescript
export const NAVIGATION_ITEMS = [
  { name: 'Products', type: 'dropdown', children: [...] },
  { name: 'Contact', type: 'link', href: '/contact' }
];
```

This single array drives:

- Desktop mega menu (`DesktopMegaMenu.tsx`)
- Mobile navigation (`MobileNavigation.tsx`)
- Search functionality (`Search.tsx`)
- Breadcrumbs (future)

### Investor Relations Data Flow

**Pattern**: JSON-based data with TypeScript types

```
public/data/ir/*.json → fetch() → Type validation → IR Components
```

**Data Types** (`src/ir/types.ts`):

- `IRFile`: PDF reports, webcasts, presentations
- `IRItem`: Events, press releases, announcements
- `KPI`: Financial metrics and KPIs
- `Price`: Stock price and market data

**Components** (`src/ir/components/`):

- `FilesList`: Render downloadable files
- `ItemsList`: Render events/news items
- `KPIGrid`: Display metrics in grid
- `MetricBand`: Golden wave financial banner

### Design System: "KTL" Theme

**Location**: `tailwind.config.js`

**Brand Colors:**

```javascript
primary: {
  500: '#fdd338',  // KTL Yellow
  600: '#ca8a04'   // Darker yellow
}
secondary: {
  500: '#e11a2b'   // KTL Red
}
tertiary: {
  500: '#1C6FE3'   // KTL Blue
}
```

**Typography Scale:**

- Desktop: `h1` (96px) → `body` (16px)
- Mobile: `h1-mobile` (48px) → `body-mobile` (14px)
- Font: System font stack for performance

**Spacing**: 4px increment scale (0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128)

**Animations:**

- `fade-in`: Opacity transition
- `slide-up`: Transform + opacity
- `scale-in`: Scale + opacity
- `zoom-hover`: Image zoom effect
- Custom durations: 200ms, 300ms, 500ms, 700ms

**Shadows:**

- `soft`: Subtle shadow for cards
- `medium`: Medium elevation
- `hard`: Strong shadow for modals

**Border Radius:**

- `sm`: 6px
- `md`: 10px (default)
- `lg`: 16px
- `xl`: 24px

### Component Patterns

#### SEO Component

```tsx
import SEO from '../components/SEO';

<SEO
  title="Page Title"
  description="Page description for search engines"
  canonical="/page-path"
  keywords={['textile', 'manufacturing']}
/>;
```

#### Optimized Images

```tsx
import OptimizedImage from '../components/OptimizedImage';

<OptimizedImage
  src="/assets/image.jpg"
  alt="Description"
  priority={false} // true for above-fold images
  sizes="(max-width: 768px) 100vw, 50vw"
/>;
```

#### Scroll Animations

```tsx
import ScrollReveal from '../components/ScrollReveal';

<ScrollReveal animation="slide-up" delay={100}>
  <div>Your content</div>
</ScrollReveal>;
```

#### Structured Data

```tsx
import StructuredData, { organizationSchema } from '../components/StructuredData';

<StructuredData data={organizationSchema} />;
```

### State Management

**Current**: Local component state with React hooks

**When to Use:**

- `useState`: Local component state
- `useEffect`: Side effects, data fetching
- `useRef`: DOM references, mutable values
- `useCallback`: Memoized callbacks
- `useMemo`: Memoized computations

**Future Consideration**: If global state is needed, consider:

- Zustand (lightweight)
- Jotai (atomic)
- Redux Toolkit (if complex)

---

## 🔑 Key Files & Their Purpose

### Configuration Files

| File                 | Purpose                                                |
| -------------------- | ------------------------------------------------------ |
| `vite.config.ts`     | Vite build settings, dev server config, asset handling |
| `tailwind.config.js` | Complete design system (colors, typography, spacing)   |
| `tsconfig.json`      | TypeScript project configuration                       |
| `tsconfig.app.json`  | App-specific TypeScript settings                       |
| `tsconfig.node.json` | Node scripts TypeScript settings                       |
| `eslint.config.js`   | ESLint rules (TypeScript, React Hooks, React Refresh)  |
| `postcss.config.js`  | PostCSS plugins (Tailwind, Autoprefixer)               |
| `package.json`       | Dependencies and npm scripts                           |

### Core Application Files

| File                    | Purpose                                        |
| ----------------------- | ---------------------------------------------- |
| `src/main.tsx`          | Application entry point, renders `<App />`     |
| `src/App.tsx`           | Router setup, routes, global providers         |
| `src/index.css`         | Global styles, Tailwind directives, custom CSS |
| `src/lib/navigation.ts` | Central navigation menu structure              |
| `src/lib/constants.ts`  | App-wide constants (company name, URLs)        |
| `src/lib/utils.ts`      | Utility functions (cn for className merging)   |

### Important Components

| Component              | Purpose                                         |
| ---------------------- | ----------------------------------------------- |
| `Header.tsx`           | Site header with logo, navigation, search       |
| `Footer.tsx`           | Site footer with links, social media, copyright |
| `DesktopMegaMenu.tsx`  | Desktop dropdown navigation menu                |
| `MobileNavigation.tsx` | Mobile hamburger menu with panels               |
| `SEO.tsx`              | Meta tags, OpenGraph, Twitter Cards             |
| `StructuredData.tsx`   | JSON-LD schema for search engines               |
| `ContactForm.tsx`      | Professional contact form with validation       |
| `OptimizedImage.tsx`   | WebP images with lazy loading                   |
| `ScrollReveal.tsx`     | Scroll-triggered reveal animations              |
| `KTLHero.tsx`          | Homepage hero with image slideshow              |
| `ErrorBoundary.tsx`    | Error catching and fallback UI                  |
| `Loading.tsx`          | Loading spinner for Suspense                    |

### Scripts

| Script                | Purpose                                       |
| --------------------- | --------------------------------------------- |
| `optimize-images.js`  | Converts images to WebP with responsive sizes |
| `generate-sitemap.js` | Generates sitemap.xml with all routes         |

### Static Files

| File                 | Purpose                             |
| -------------------- | ----------------------------------- |
| `public/sitemap.xml` | SEO sitemap for search engines      |
| `public/robots.txt`  | Search engine crawling instructions |
| `public/.htaccess`   | Apache SPA routing configuration    |
| `public/_redirects`  | Netlify SPA routing configuration   |

---

## ✅ Current Status

### What's Working ✅

**Core Functionality:**

- ✅ All 30+ pages rendering correctly
- ✅ Desktop and mobile navigation
- ✅ React Router with lazy loading
- ✅ Error boundaries and loading states
- ✅ Responsive design on all screen sizes

**Performance Optimizations:**

- ✅ Code splitting (30+ lazy-loaded routes)
- ✅ Image optimization (8 images → WebP + responsive variants)
- ✅ Bundle size optimized (211 KB main, 48 KB CSS)
- ✅ Lazy loading images with Intersection Observer
- ✅ Tree shaking and dead code elimination

**SEO & Discoverability:**

- ✅ SEO component with OpenGraph and Twitter Cards
- ✅ JSON-LD structured data (Organization, Website)
- ✅ Dynamic sitemap.xml (30 URLs)
- ✅ robots.txt for search engines
- ✅ Canonical URLs and meta descriptions

**Features:**

- ✅ Professional contact form with validation
- ✅ Scroll-triggered animations
- ✅ Investor Relations section with JSON data
- ✅ Search functionality
- ✅ Floating CTA button

**Development:**

- ✅ TypeScript: No errors
- ✅ ESLint: No errors (6 benign warnings)
- ✅ Hot Module Replacement working
- ✅ Dev server on port 5173
- ✅ Production builds successful

### What's In Progress 🔄

**Content:**

- 🔄 Placeholder content needs real company data
- 🔄 IR JSON files need real financial data
- 🔄 Images need final versions from design team

**Backend Integration:**

- 🔄 Contact form needs email service integration
- 🔄 Form submissions need backend endpoint

**Testing:**

- ✅ Automated testing infrastructure setup complete (Vitest + Playwright)
- ✅ 64 unit tests implemented (100% passing)
- ✅ 150 E2E tests implemented (126 passing, 24 failing)
- 🔄 24 E2E test failures need fixing (hero section, navigation timeouts)
- 🔄 Accessibility testing needed

### Known Issues 🐛

**Testing:**

- ⚠️ 24 E2E tests failing (16% of total):
  - 5 tests: Hero section text not found ("Fashionably Sustaining")
  - 5 tests: Products section strict mode violations
  - 9 tests: Desktop navigation timeouts (loading overlay issue)
  - 15 tests: Responsive design tests (dependent on hero text)
- ℹ️ Mobile navigation tests pass at 90% (desktop navigation has issues)

**Minor:**

- ⚠️ 6 ESLint warnings in `StructuredData.tsx` (react-refresh export warnings, non-blocking)
- ⚠️ Some image alt text could be more descriptive
- ⚠️ Contact form submits to mock API (needs real endpoint)

**Limitations:**

- No CMS integration (content is hardcoded)
- No analytics tracking setup
- No A/B testing framework
- No internationalization (i18n)

---

## 🎉 Recently Completed

### October 23, 2025

**Blog System Integration:**

- ✅ Complete blog system with 3 SEO-optimized articles (9,200+ words total)
- ✅ BlogCard component with featured badge, category labels, reading time
- ✅ Blog listing page with search and category filtering
- ✅ Individual blog post pages with social sharing
- ✅ Integrated as "Company Stories" under Newsroom section
- ✅ Routes: `/newsroom/stories` and `/newsroom/stories/:slug`
- ✅ Related articles feature based on category
- ✅ Social sharing (Facebook, Twitter, LinkedIn)

**Google Business Integration:**

- ✅ Google Business Profile widgets for both locations (Head Office + Production)
- ✅ Google Maps locator integration
- ✅ Social media links in Footer (LinkedIn, Facebook)
- ✅ Stock exchange links in Footer (DSE, CSE)
- ✅ BGMEA association integration
- ✅ Complete Schema.org structured data

**Testing Infrastructure:**

- ✅ Vitest 4.0.1 setup for unit testing
- ✅ Playwright 1.56.1 setup for E2E testing
- ✅ React Testing Library 16.3.0 integration
- ✅ 64 unit tests implemented (100% passing)
- ✅ 150 E2E tests implemented across 5 browsers (84% passing)
- ✅ Browser binaries installed for cross-browser testing
- ✅ Test coverage thresholds configured (70%)

**Data Cleanup:**

- ✅ Removed mock data from Contact page
- ✅ Integrated real company data from constants
- ✅ Updated phone numbers, emails, addresses with actual values
- ✅ Added business hours information

**Blog Content Created:**

- ✅ "Inside Kattali Textile Ltd: Building a Legacy" (2,500+ words)
- ✅ "Bangladesh's Woven Garment Export Powerhouse" (3,200+ words)
- ✅ "Global Textile Sourcing Partnerships" (3,500+ words)
- ✅ 4 blog categories: Company, Manufacturing, Partnerships, Sustainability

---

## 🗺️ Future Plans & Roadmap

### Phase 1: Content & Polish (Immediate)

- [ ] Replace all placeholder text with real content
- [ ] Add real company photos and product images
- [ ] Update IR data with actual financial information
- [ ] Add real phone numbers and contact details
- [ ] Professional photography for hero sections

### Phase 2: Backend Integration (Short-term)

- [ ] Set up backend API for contact forms
- [ ] Integrate email service (SendGrid/AWS SES)
- [ ] Add form spam protection (reCAPTCHA)
- [ ] Set up analytics (Google Analytics 4)
- [ ] Add error logging (Sentry)

### Phase 3: Advanced Features (Medium-term)

- [ ] Add CMS integration (Strapi/Contentful)
- [x] Implement blog/news section (✅ Completed Oct 23, 2025)
- [ ] Add newsletter subscription
- [ ] Create admin dashboard for IR updates
- [ ] Add live chat support
- [ ] Implement product inquiry forms

### Phase 4: Optimization & Testing (Medium-term)

- [x] Set up automated testing (Vitest, Playwright) (✅ Completed Oct 23, 2025)
- [x] Add E2E test coverage (✅ Completed Oct 23, 2025 - 150 tests, 84% passing)
- [ ] Fix failing E2E tests (24 tests remaining)
- [ ] Perform lighthouse audits
- [ ] Add performance monitoring
- [ ] Accessibility audit and fixes (WCAG AA compliance)
- [ ] Load testing

### Phase 5: Advanced Enhancements (Long-term)

- [ ] Add internationalization (English, Bengali, Chinese)
- [ ] Implement A/B testing framework
- [ ] Add progressive web app (PWA) features
- [ ] Create mobile apps (React Native)
- [ ] Add 3D product viewers
- [ ] Implement virtual factory tours

### Technical Debt

- [ ] Add unit tests for components
- [ ] Add integration tests for pages
- [ ] Document all component APIs
- [ ] Create Storybook for component library
- [ ] Set up CI/CD pipeline
- [ ] Add pre-commit hooks for linting

---

## 📚 Useful Commands Reference

### Daily Development

```bash
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview production build
npm run typecheck        # Check TypeScript errors
npm run lint             # Check ESLint errors
npm run test             # Run unit tests
npm run test:e2e         # Run E2E tests
```

### Image Management

```bash
npm run optimize-images  # Optimize all images to WebP
                        # Creates /public/assets-optimized/
                        # Generates mobile, tablet, desktop variants
```

### SEO & Deployment

```bash
npm run generate-sitemap # Generate sitemap.xml
                        # Updates /public/sitemap.xml
                        # Run before deployment
```

### Code Quality

```bash
npm run format          # Format code with Prettier
npm run clean           # Remove build artifacts
npm run typecheck       # Type checking without build
```

### Testing

```bash
npm run test            # Run unit tests with Vitest
npm run test:ui         # Open Vitest UI for interactive testing
npm run test:run        # Run tests once without watch mode
npm run test:coverage   # Run tests with coverage report
npm run test:e2e        # Run Playwright E2E tests (150 tests)
npm run test:all        # Run all tests (unit + E2E)
npx playwright install  # Install Playwright browser binaries (if needed)
```

### Git Workflow

```bash
git status              # Check current status
git add .               # Stage all changes
git commit -m "message" # Commit with message
git push                # Push to remote
```

---

## 🤖 Context for Claude

### Code Style & Conventions

**TypeScript:**

- Use explicit types for function parameters and returns
- Avoid `any` type (use `unknown` if necessary)
- Use interfaces for object shapes
- Use type aliases for unions and intersections

**React:**

- Use functional components with hooks
- Destructure props in function parameters
- Use `React.FC` for component types
- Export default at the end of file

**Naming Conventions:**

- Components: PascalCase (e.g., `ContactForm.tsx`)
- Hooks: camelCase with 'use' prefix (e.g., `useScrollAnimation`)
- Files: Match component name
- CSS classes: Tailwind utilities (avoid custom CSS)

**File Organization:**

```tsx
// 1. Imports
import React from 'react';
import { useEffect, useState } from 'react';

// 2. Types/Interfaces
interface Props {
  title: string;
}

// 3. Component
const MyComponent: React.FC<Props> = ({ title }) => {
  // 4. State and hooks
  const [state, setState] = useState(false);

  // 5. Effects
  useEffect(() => {}, []);

  // 6. Event handlers
  const handleClick = () => {};

  // 7. Render
  return <div>{title}</div>;
};

// 8. Export
export default MyComponent;
```

### Tailwind Usage

**Prefer Tailwind over Custom CSS:**

```tsx
// ✅ Good
<div className="flex items-center gap-4 px-6 py-4 bg-primary-500 rounded-lg">

// ❌ Avoid
<div style={{ display: 'flex', padding: '16px 24px' }}>
```

**Use Design Tokens:**

```tsx
// ✅ Good - Uses theme colors
<div className="bg-primary-500 text-secondary-500">

// ❌ Avoid - Arbitrary values
<div className="bg-[#fdd338] text-[#e11a2b]">
```

**Use cn() for Conditional Classes:**

```tsx
import { cn } from '../lib/utils';

<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  'more-classes'
)}>
```

### Component Creation Guidelines

**When Creating New Components:**

1. **Create in appropriate directory:**
   - Shared components → `src/components/`
   - Page components → `src/pages/`
   - IR components → `src/ir/components/`

2. **Add TypeScript types:**

   ```tsx
   interface ComponentProps {
     required: string;
     optional?: number;
   }
   ```

3. **Use SEO component for pages:**

   ```tsx
   <SEO title="Page Title" description="..." />
   ```

4. **Implement lazy loading for pages:**

   ```tsx
   const NewPage = React.lazy(() => import('./pages/NewPage'));
   ```

5. **Add to navigation if needed:**
   - Update `src/lib/navigation.ts`
   - Add route in `App.tsx`

### Image Handling

**Always Use Optimized Images:**

```tsx
// ✅ Good - Lazy loading + WebP
import OptimizedImage from '../components/OptimizedImage';
<OptimizedImage src="/assets/image.jpg" alt="Description" />

// ❌ Avoid - Regular img tag
<img src="/assets/image.jpg" alt="Description" />
```

**After Adding New Images:**

1. Place in `public/assets/`
2. Run `npm run optimize-images`
3. Use OptimizedImage component
4. Commit both original and optimized versions

### SEO Best Practices

**Every Page Should Have:**

1. SEO component with unique title and description
2. Proper heading hierarchy (h1 → h2 → h3)
3. Alt text for all images
4. Semantic HTML5 elements

**Example:**

```tsx
<SEO
  title="Products | Kattali Textile Ltd"
  description="Explore our premium textile products..."
  canonical="/products"
  keywords={['textiles', 'manufacturing', 'Bangladesh']}
/>
```

### Performance Considerations

**Always Consider:**

- Use React.lazy() for route-based code splitting
- Implement lazy loading for images
- Minimize bundle size (check with `npm run build`)
- Avoid large dependencies
- Use scroll animations sparingly

**Image Optimization:**

- Run optimization script before deployment
- Use WebP format for all images
- Provide responsive variants
- Set priority=true for above-fold images

### Common Patterns

**Data Fetching:**

```tsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetch('/data/ir/events.json')
    .then((res) => res.json())
    .then((data) => setData(data))
    .catch((err) => setError(err))
    .finally(() => setLoading(false));
}, []);
```

**Form Handling:**

```tsx
const [formData, setFormData] = useState({ name: '', email: '' });

const handleChange = (e) => {
  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  // Validate, then submit
};
```

### Error Handling

**Always Wrap with ErrorBoundary:**

```tsx
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

**Handle Loading States:**

```tsx
{
  loading && <Loading />;
}
{
  error && <ErrorMessage error={error} />;
}
{
  data && <DataDisplay data={data} />;
}
```

### Deployment Checklist

Before deploying:

1. [ ] Run `npm run test` - All unit tests passing
2. [ ] Run `npm run test:e2e` - All E2E tests passing
3. [ ] Run `npm run typecheck` - No errors
4. [ ] Run `npm run lint` - No errors
5. [ ] Run `npm run build` - Successful build
6. [ ] Run `npm run optimize-images` - If images changed
7. [ ] Run `npm run generate-sitemap` - Update sitemap
8. [ ] Test all pages in preview mode
9. [ ] Check mobile responsiveness
10. [ ] Verify SEO tags in browser devtools
11. [ ] Test forms and interactions
12. [ ] Check console for errors

### Git Commit Conventions

```bash
# Format: <type>: <description>

# Types:
feat: New feature
fix: Bug fix
docs: Documentation changes
style: Code style changes (formatting)
refactor: Code refactoring
perf: Performance improvements
test: Adding tests
chore: Build process or auxiliary tool changes

# Examples:
git commit -m "feat: add contact form validation"
git commit -m "fix: resolve mobile navigation scroll issue"
git commit -m "perf: optimize image loading with WebP"
git commit -m "docs: update CLAUDE.md with new components"
```

---

## 📞 Support & Resources

### Documentation

- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/docs
- **Vite**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Router**: https://reactrouter.com

### Project-Specific

- **Design System**: See `tailwind.config.js`
- **Navigation Structure**: See `src/lib/navigation.ts`
- **IR Data Schema**: See `src/ir/types.ts`

### Getting Help

- **Issues**: Create GitHub issue with bug report or feature request
- **Questions**: Ask in team chat or create discussion
- **Urgent**: Contact tech lead directly

---

**Last Updated:** October 23, 2025
**Version:** 1.0.0
**Maintainer:** Development Team

---

## 🎯 Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│  QUICK COMMANDS                                             │
├─────────────────────────────────────────────────────────────┤
│  npm run dev              Start development server          │
│  npm run build            Production build                  │
│  npm run typecheck        TypeScript checking               │
│  npm run lint             ESLint checking                   │
│  npm run optimize-images  Optimize images to WebP           │
│  npm run generate-sitemap Generate sitemap.xml              │
├─────────────────────────────────────────────────────────────┤
│  PORTS                                                      │
├─────────────────────────────────────────────────────────────┤
│  5173                     Development server                │
│  4173                     Preview server                    │
├─────────────────────────────────────────────────────────────┤
│  KEY PATHS                                                  │
├─────────────────────────────────────────────────────────────┤
│  src/components/          Shared components                 │
│  src/pages/               Page components                   │
│  src/lib/navigation.ts    Navigation structure              │
│  public/assets-optimized/ Optimized images                  │
│  tailwind.config.js       Design system                     │
└─────────────────────────────────────────────────────────────┘
```
