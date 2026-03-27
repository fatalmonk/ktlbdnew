# KTL Website - Kattali Textile Ltd

Official website for Kattali Textile Limited, Bangladesh's leading textile manufacturer and exporter since 2004.

## 📁 Repository Structure

```
KTL Website/
├── apps/
│   └── web/                 # Main Vite application
│       ├── src/            # Source files
│       ├── public/         # Static assets
│       └── dist/           # Build output (gitignored)
├── docs/                   # Documentation
│   ├── engineering/        # Technical documentation
│   ├── product/           # Product requirements
│   ├── seo/               # SEO strategy and guides
│   ├── research/         # Research and content planning
│   └── deployment/       # Deployment guides
├── scripts/               # Utility scripts
│   └── data-ingest/      # Data scraping utilities
├── ops/                   # Operations and deployment
│   └── deployment/       # Deployment scripts
├── data/                  # Data files
│   └── raw/              # Raw scraped data
├── archive/              # Archived assets and deployments
│   ├── assets/          # Legacy assets
│   └── deployments/     # Historical deployments
├── package.json         # Root package.json (workspace)
├── vercel.json          # Vercel deployment config
└── README.md            # This file
```

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

**Note:** All npm scripts are managed through npm workspaces. The main application is in `apps/web/`.

### Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview production build

# Code Quality
npm run lint             # ESLint checking
npm run typecheck        # TypeScript checking
npm run format           # Prettier formatting

# Testing
npm run test             # Run unit tests
npm run test:e2e         # Run E2E tests
npm run test:all         # Run all tests
```

## 📚 Documentation

- **Main Documentation**: See `docs/README.md` for comprehensive documentation index
- **Developer Guide**: `docs/engineering/DEVELOPER_GUIDE.md`
- **Deployment**: `docs/deployment/`
- **Architecture**: `docs/engineering/`
- **Project README**: `apps/web/README.md`

## 🏗️ Project Organization

### Main Application
The primary application code is located in `apps/web/`. This is a React + TypeScript + Vite application.

### Workspace Structure
This repository uses npm workspaces to manage the monorepo structure:
- `apps/web/` - Main Vite application
- Root-level scripts delegate to workspace packages

### Configuration Files
- **Root `vercel.json`**: Used for Vercel deployments from repository root
- **Root `package.json`**: Workspace configuration and root-level scripts
- **`apps/web/vercel.json`**: Application-specific Vercel config
- **`tsconfig.base.json`**: Shared TypeScript configuration

### Build Outputs
The following directories are gitignored as they contain build artifacts:
- `apps/web/dist/` - Production build output
- `archive/deployments/` - Historical deployment packages
- `node_modules/` - Dependencies

## 📦 Deployment

### Vercel
The repository includes Vercel configuration at the root level. See `docs/deployment/` for detailed deployment guides.

### Hostinger
Deployment scripts and guides are available in `docs/deployment/HOSTINGER_DEPLOYMENT.md` and `ops/deployment/hostinger/`.

## 🗂️ Archived Content

- **`archive/assets/`**: Legacy assets from external sources (for reference only)
- **`archive/deployments/`**: Historical deployment artifacts
- **`scripts/data-ingest/`**: One-off scraping scripts (not part of main project)

## 🔧 Technologies

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Testing**: Vitest, Playwright
- **Deployment**: Vercel, Hostinger

## 📖 Additional Resources

- [Project README](apps/web/README.md) - Detailed project information
- [Documentation Index](docs/README.md) - Complete documentation guide
- [Developer Guide](docs/engineering/DEVELOPER_GUIDE.md) - Development setup and guidelines

---

**Kattali Textile Ltd** - Bangladesh's Leading Textile Manufacturer Since 2004
