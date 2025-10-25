# KTL Website - Vercel Deployment Guide

## Pre-Deployment Checklist

### ✅ Completed Items
- [x] Git repository connected to GitHub
- [x] All local changes committed and pushed
- [x] Build tested successfully (1.39s build time)
- [x] Vercel configuration created (`vercel.json`)
- [x] Environment variables documented (`.env.example`)

### 📊 Build Statistics
- **Total Build Time:** 1.39s
- **Main Bundle Size:** 215.49 kB (68.36 kB gzipped)
- **Home Page Bundle:** 135.41 kB (44.34 kB gzipped)
- **CSS Bundle:** 55.52 kB (9.62 kB gzipped)
- **Total Assets:** 58 files generated

## Vercel Deployment Commands

### Option 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI globally
npm i -g vercel

# Navigate to project directory
cd "/Users/mac.alvi/Desktop/KTL Website/Version01/project"

# Deploy to Vercel
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? [Your account]
# - Link to existing project? N
# - Project name: ktlbd-website
# - Directory: ./
# - Override settings? N
```

### Option 2: GitHub Integration
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import from GitHub: `fatalmonk/ktlbdnew`
5. Vercel will auto-detect Vite configuration
6. Click "Deploy"

## Environment Variables

### Required Variables (if any)
Based on `.env.example`, you may need to set:
- `VITE_APP_TITLE` (default: "KTL Vite App")
- `VITE_API_BASE` (default: "https://api.example.com")

### Setting Environment Variables in Vercel
1. Go to your project dashboard on Vercel
2. Navigate to Settings → Environment Variables
3. Add any required variables

## Post-Deployment Verification

### 1. Check Deployment Status
- Visit your Vercel dashboard
- Verify deployment shows "Ready" status
- Check build logs for any errors

### 2. Test Live Website
- [ ] Homepage loads correctly
- [ ] Navigation works (all menu items)
- [ ] Contact form functions
- [ ] All pages load without 404s
- [ ] Images and assets load properly
- [ ] Mobile responsiveness works
- [ ] Animations (CountUp, StaggeredReveal) work

### 3. Performance Checks
- [ ] Lighthouse score > 90
- [ ] Page load time < 3 seconds
- [ ] All images optimized (WebP format)
- [ ] No console errors

### 4. SEO Verification
- [ ] Meta tags present
- [ ] Structured data working
- [ ] Sitemap accessible: `yoursite.vercel.app/sitemap.xml`
- [ ] Robots.txt accessible: `yoursite.vercel.app/robots.txt`

## Troubleshooting Common Issues

### Build Failures
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variable Issues
- Ensure all `VITE_` prefixed variables are set in Vercel dashboard
- Check that variables don't contain spaces or special characters

### Routing Issues
- Verify `vercel.json` rewrites are configured correctly
- Check that all routes return `index.html` for SPA routing

### Performance Issues
- Check bundle size in Vercel dashboard
- Consider code splitting for large components
- Optimize images (already done with WebP)

## Rollback Procedure

If deployment fails:
1. Check Vercel dashboard for error logs
2. Fix issues locally and commit
3. Push to GitHub (auto-deploys)
4. Or manually redeploy from Vercel dashboard

## Monitoring and Analytics

### Recommended Setup
1. **Vercel Analytics** (built-in)
   - Enable in project settings
   - Monitor Core Web Vitals

2. **Google Analytics** (optional)
   - Add tracking code to `index.html`
   - Set up conversion tracking

## Next Steps After Deployment

1. **Domain Setup** (if custom domain needed)
   - Add domain in Vercel dashboard
   - Update DNS records
   - Enable SSL (automatic)

2. **Performance Optimization**
   - Monitor Core Web Vitals
   - Set up performance budgets
   - Regular Lighthouse audits

3. **Content Updates**
   - Use GitHub workflow for content updates
   - All changes auto-deploy via Vercel

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Support](https://vercel.com/support)

---

**Last Updated:** October 26, 2024
**Project:** KTL Corporate Website
**Repository:** https://github.com/fatalmonk/ktlbdnew
