# Kattali Textile Ltd - Corporate Website

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1.6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4.0.1-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-1.56.1-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)

**Modern, performance-optimized corporate website for Bangladesh's leading textile manufacturer**

[Live Demo](#) • [Documentation](../../docs/engineering/CLAUDE.md) • [Testing Guide](../../docs/engineering/TESTING.md)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

The Kattali Textile Ltd (KTL) corporate website is a comprehensive, production-ready single-page application built with modern web technologies. It showcases KTL's products, facilities, capabilities, and investor relations information to a global audience.

### Key Highlights

- **30+ Pages**: Comprehensive coverage of products, company info, facilities, and investor relations
- **Blog System**: SEO-optimized "Company Stories" with 9,200+ words of content
- **Testing**: 64 unit tests + 150 E2E tests across 5 browsers (84% passing)
- **Performance**: Optimized bundle size (211 KB main, 48 KB CSS) with lazy loading
- **SEO Ready**: OpenGraph, Twitter Cards, JSON-LD structured data, sitemap
- **Responsive**: Mobile-first design with custom Tailwind theme

---

## ✨ Features

### Core Functionality

- ✅ **30+ Pages** with React Router and lazy loading
- ✅ **Desktop & Mobile Navigation** with mega menu
- ✅ **Error Boundaries** and loading states
- ✅ **Responsive Design** on all screen sizes

### Content

- ✅ **Product Catalog**: Denims, Knitwear, Swimwear, Kids apparel
- ✅ **Company Stories Blog**: Search, filtering, social sharing
- ✅ **Investor Relations**: Financial data, stock info, reports
- ✅ **Contact Forms**: Professional inquiry forms with validation
- ✅ **Google Business Integration**: Maps and business profiles

### Performance & SEO

- ✅ **Code Splitting**: 30+ lazy-loaded routes
- ✅ **Image Optimization**: WebP format with responsive variants
- ✅ **SEO Components**: Meta tags, OpenGraph, structured data
- ✅ **Scroll Animations**: Intersection Observer-based reveals
- ✅ **Bundle Optimization**: Tree shaking and dead code elimination

### Development

- ✅ **TypeScript**: Full type safety
- ✅ **ESLint & Prettier**: Code quality and formatting
- ✅ **Hot Module Replacement**: Instant updates during development
- ✅ **Comprehensive Testing**: Unit tests (Vitest) and E2E tests (Playwright)

---

## 🛠 Tech Stack

### Frontend

- **React 18.3.1** - UI library with concurrent features
- **TypeScript 5.5.4** - Type-safe JavaScript
- **Vite 7.1.6** - Fast build tool and dev server
- **React Router 7.7.1** - Client-side routing

### Styling

- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Custom "KTL" Theme** - Brand-specific design system
- **PostCSS + Autoprefixer** - CSS processing
- **Lucide React 0.344.0** - Icon library

### Testing

- **Vitest 4.0.1** - Fast unit testing framework
- **Playwright 1.56.1** - Cross-browser E2E testing
- **React Testing Library 16.3.0** - Component testing
- **@vitest/coverage-v8** - Code coverage reporting

### Build & Optimization

- **Sharp 0.34.4** - Image processing and optimization
- **Code Splitting** - Automatic via React.lazy()
- **Tree Shaking** - Dead code elimination

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ ([Download](https://nodejs.org/))
- **npm** 10+ (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### Installation

1. **Clone the repository** (use your fork or organization remote)

   ```bash
   git clone <YOUR_REPO_URL>
   cd <YOUR_REPO_CHECKOUT_DIR>
   ```

2. **Install dependencies** from the **monorepo root** (parent of `apps/web/`)

   ```bash
   npm install
   ```

3. **Start the development server** from the repo root

   ```bash
   npm run dev
   ```

   To run Vite directly inside the app package: `cd apps/web && npm run dev`.

4. **Open your browser**
   - Local: http://localhost:5173/
   - Network: http://[YOUR_IP]:5173/ (for mobile testing)

### Quick Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview production build

# Code Quality
npm run typecheck        # TypeScript checking
npm run lint             # ESLint checking
npm run format           # Prettier formatting

# Testing
npm run test             # Run unit tests
npm run test:ui          # Open Vitest UI
npm run test:e2e         # Run E2E tests
npm run test:all         # Run all tests
npm run test:coverage    # Coverage report

# Utilities
npm run optimize-images  # Optimize images to WebP
npm run generate-sitemap # Generate sitemap.xml
```

---

## 📁 Project Structure

```
apps/web/
├── src/
│   ├── components/          # Shared UI components
│   │   ├── Header.tsx       # Site header with navigation
│   │   ├── Footer.tsx       # Site footer with links
│   │   ├── BlogCard.tsx     # Blog post preview card
│   │   ├── SEO.tsx          # SEO meta tags
│   │   └── ...
│   ├── pages/               # Page components (lazy-loaded)
│   │   ├── Home.tsx
│   │   ├── Blog.tsx         # Company Stories listing
│   │   ├── BlogPost.tsx     # Individual blog post
│   │   ├── products/        # Product pages
│   │   ├── company/         # Company pages
│   │   ├── facilities/      # Facility pages
│   │   ├── investors/       # Investor relations pages
│   │   └── ...
│   ├── ir/                  # Investor Relations module
│   ├── lib/                 # Utilities and configuration
│   │   ├── constants.ts     # App-wide constants
│   │   ├── navigation.ts    # Navigation structure
│   │   └── utils.ts         # Helper functions
│   └── hooks/               # Custom React hooks
├── public/
│   ├── assets-optimized/    # Optimized WebP images
│   ├── data/
│   │   ├── blog/            # Blog posts (JSON + Markdown)
│   │   └── ir/              # Investor relations data
│   ├── sitemap.xml          # SEO sitemap
│   └── robots.txt           # Search engine instructions
├── e2e/                     # Playwright E2E tests
└── package.json             # Dependencies and scripts
```

---

## 💻 Development

### Development Server

The development server runs on port 5173 with Hot Module Replacement (HMR) enabled:

```bash
npm run dev
```

Features:

- Instant page updates on file changes
- Detailed error messages in browser
- Network access for mobile testing
- TypeScript checking on-the-fly

### Building for Production

Create an optimized production build:

```bash
npm run build
```

Output is generated in the `dist/` directory. Preview the build:

```bash
npm run preview
```

### Code Quality

Run TypeScript and ESLint checks:

```bash
npm run typecheck    # Check TypeScript errors
npm run lint         # Check ESLint rules
npm run format       # Format code with Prettier
```

### Image Optimization

Optimize images to WebP format with responsive variants:

```bash
npm run optimize-images
```

This generates mobile (640px), tablet (1024px), and desktop (1920px) versions.

---

## 🧪 Testing

### Unit Tests

Run unit tests with Vitest:

```bash
npm run test          # Watch mode
npm run test:run      # Run once
npm run test:ui       # Interactive UI
npm run test:coverage # With coverage report
```

**Current Status**: 64/64 tests passing (100%)

### E2E Tests

Run end-to-end tests with Playwright:

```bash
npm run test:e2e      # Run E2E tests
npm run test:all      # Run unit + E2E tests
```

**Current Status**: 126/150 tests passing (84%)

E2E tests cover:

- 5 browsers (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari)
- Navigation and routing
- Performance metrics
- Accessibility
- Responsive design

### Installing Playwright Browsers

If Playwright browsers are not installed:

```bash
npx playwright install
```

For more details, see [TESTING.md](../../docs/engineering/TESTING.md).

---

## 🚀 Deployment

### GitHub Pages

The project includes a GitHub Actions workflow for automatic deployment to GitHub Pages.

**Setup**:

1. Go to repository Settings → Pages
2. Source: "GitHub Actions"
3. Push to `main` branch triggers automatic deployment

### Other Platforms

The project can be deployed to:

- **Vercel**: Connect GitHub repository
- **Netlify**: Connect GitHub repository
- **AWS S3 + CloudFront**: Upload `dist/` folder
- **Docker**: Build container with `dist/` files

### Build Configuration

For deployment, ensure:

1. Environment variables are set (if any)
2. Base URL is configured in `vite.config.ts`
3. Redirects are configured (`.htaccess` or `_redirects`)

---

## 📚 Documentation

- **[../../docs/engineering/CLAUDE.md](../../docs/engineering/CLAUDE.md)** - Comprehensive development guide
  - Project overview and architecture
  - Technology stack details
  - Development workflow
  - Component patterns
  - Code style conventions
  - Deployment checklist

- **[../../docs/engineering/TESTING.md](../../docs/engineering/TESTING.md)** - Testing documentation
  - Testing infrastructure setup
  - Unit testing guide
  - E2E testing guide
  - Test coverage and thresholds

- **[../../docs/engineering/assets.md](../../docs/engineering/assets.md)** - Image guidelines
  - Hero image specifications
  - Image optimization process
  - Responsive image handling

- **[../../docs/prd-technical-improvements.md](../../docs/prd-technical-improvements.md)** - Technical improvements product requirements

- **[../../docs/architecture.md](../../docs/architecture.md)** - Brownfield enhancement architecture

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Write clean, typed code
   - Add tests for new features
   - Update documentation as needed
4. **Run tests and checks** (from monorepo root, recommended)
   ```bash
   npm run test:run
   npm run test:e2e
   npm run typecheck
   npm run lint
   ```
5. **Commit your changes**
   ```bash
   git commit -m "feat: add new feature"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Commit Message Convention

Follow conventional commits format:

```
type: subject

Examples:
feat: add newsletter subscription
fix: resolve navigation scroll issue
docs: update README with deployment guide
test: add unit tests for BlogCard component
perf: optimize image loading
refactor: simplify navigation code
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

---

## 📄 License

This project is proprietary and confidential. All rights reserved by Kattali Textile Ltd.

**Copyright © 2025 Kattali Textile Ltd**

---

## 📞 Contact

- **Website**: https://www.ktlbd.com
- **Email**: info@ktlbd.com
- **LinkedIn**: [Kattali Textile Ltd](http://linkedin.com/company/ktlbd)
- **Facebook**: [KTL Manufacturing](https://www.facebook.com/KTLManufacturing)

---

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Tested with [Vitest](https://vitest.dev/) and [Playwright](https://playwright.dev/)
- Icons from [Lucide](https://lucide.dev/)
- Images from [Unsplash](https://unsplash.com/)

---

<div align="center">

**Made with ❤️ for Kattali Textile Ltd**

⭐ Star this repository if you found it helpful!

</div>
