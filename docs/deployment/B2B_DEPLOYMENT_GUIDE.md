# B2B Website Deployment Guide

This guide covers the deployment process for the B2B-enhanced KTL website.

## Pre-Deployment Checklist

### ✅ Features Completed

- [x] Case Studies system with filtering and detail views
- [x] Certifications hub with interactive badges
- [x] Sustainability metrics dashboard
- [x] Multi-step RFQ form with validation
- [x] AI-ready chatbot widget
- [x] Updated navigation with Investor Relations
- [x] Homepage trust signals and CTAs
- [x] SEO structured data for new pages
- [x] Analytics event tracking
- [x] Sample content for all sections

### 🔍 Pre-Deployment Testing

#### 1. **Build Test**
```bash
npm run build
```
Ensure the build completes without errors.

#### 2. **Type Check**
```bash
npm run typecheck
```
Verify no TypeScript errors.

#### 3. **Lint Check**
```bash
npm run lint
```
Fix any linting issues.

#### 4. **Local Preview**
```bash
npm run preview
```
Test the production build locally at `http://localhost:4173`

#### 5. **E2E Tests** (if available)
```bash
npm run test:e2e
```

### 📊 New Routes to Test

Test each route manually:

- `/case-studies` - Case studies index
- `/case-studies/[slug]` - Individual case study
- `/certifications` - Certifications hub
- `/sustainability` - Sustainability dashboard
- `/rfq` - Request for quote form

### 🔗 Navigation Updates

Verify the updated navigation structure:
- Company → includes Case Studies
- Investor Relations → includes ESG & Sustainability
- Trust & Compliance → new section
- Work With Us → includes Request a Quote

### 🎯 Analytics Setup

#### Google Analytics 4 (GA4) Setup

1. **Create GA4 Property**
   - Go to Google Analytics
   - Create new GA4 property for ktlbd.com
   - Get Measurement ID (G-XXXXXXXXXX)

2. **Add GA4 to Website**

In `apps/web/index.html`, add:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

3. **Verify Events**

The following events are tracked:
- RFQ form interactions
- Case study views and downloads
- Certification clicks and verifications
- Sustainability report downloads
- Chatbot interactions
- Navigation clicks

### 🚀 Deployment Steps

#### Option 1: Vercel (Recommended)

1. **Deploy from Git**
   ```bash
   # Ensure vercel.json is configured
   # Push to main branch
   git push origin main
   ```

2. **Vercel will automatically**:
   - Build the project
   - Deploy to production
   - Provide deployment URL

3. **Environment Variables** (if needed):
   - Add in Vercel dashboard
   - `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`

#### Option 2: Hostinger

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy using script**
   ```bash
   cd ops/deployment/hostinger
   ./deploy-hostinger.sh
   ```

3. **Or manual upload**:
   - Upload `apps/web/dist/*` to web root
   - Ensure `.htaccess` for SPA routing

### 🔧 Post-Deployment Tasks

#### 1. **Verify All Pages Load**
- Homepage with new sections
- All case studies
- Certifications hub
- Sustainability dashboard
- RFQ form (all steps)

#### 2. **Test Chatbot**
- Opens/closes correctly
- Responds to messages
- Quick actions work
- Navigates properly

#### 3. **Test Forms**
- RFQ multi-step form
- Form validation
- Auto-save functionality
- Submission (check console for now)

#### 4. **Mobile Testing**
- Test on actual devices
- Check responsive layouts
- Test chatbot on mobile
- Test RFQ form on mobile

#### 5. **SEO Verification**

Test each new page:
```bash
# Check meta tags
curl -s https://ktlbd.com/case-studies | grep -i "meta"

# Check structured data
# Use Google's Rich Results Test
# https://search.google.com/test/rich-results
```

#### 6. **Analytics Verification**

1. Visit Google Analytics Real-Time
2. Navigate through site
3. Verify events appearing:
   - Page views
   - Case study views
   - RFQ form starts
   - Chatbot opens

#### 7. **Update Sitemap**

```bash
npm run generate-sitemap
```

Upload new `sitemap.xml` to production.

Submit to Google Search Console:
```
https://search.google.com/search-console
```

### 📈 Performance Monitoring

#### Initial Metrics to Track

**Week 1:**
- Page load times
- Core Web Vitals
- RFQ form completion rate
- Chatbot engagement rate

**Week 2-4:**
- Organic traffic to new pages
- Case study page views
- Certification hub visits
- RFQ submissions

**Month 1-3:**
- Lead conversion rate
- Time on site increase
- Bounce rate on new pages
- Top performing case studies

### 🐛 Troubleshooting

#### Build Fails
- Check Node version (should be 20+)
- Clear `node_modules` and reinstall
- Check for TypeScript errors

#### Routes Not Working
- Verify `vercel.json` or `.htaccess` for SPA routing
- Check if lazy loading is working

#### Analytics Not Tracking
- Verify GA4 Measurement ID
- Check browser console for errors
- Ensure gtag script is loading

#### Chatbot Not Appearing
- Check if component is imported in App.tsx
- Verify z-index conflicts
- Check console for errors

### 📝 Rollback Plan

If critical issues arise:

1. **Vercel**: Use deployment rollback in dashboard
2. **Hostinger**: Restore from backup
3. **Git**: Revert to previous commit

```bash
git revert HEAD
git push origin main
```

### 🎉 Launch Checklist

Final verification before announcing:

- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Forms submit successfully
- [ ] Chatbot responds properly
- [ ] Mobile experience is good
- [ ] Analytics is tracking
- [ ] SEO meta tags are correct
- [ ] Performance is acceptable (Lighthouse > 85)
- [ ] No console errors
- [ ] Sitemap is updated
- [ ] Google Search Console updated

### 📧 Post-Launch Communications

1. **Internal Team**
   - Announce new features
   - Provide training on RFQ management
   - Share analytics dashboard access

2. **Existing Clients**
   - Email about new RFQ system
   - Highlight case studies
   - Showcase certifications

3. **Marketing**
   - Social media posts
   - LinkedIn announcement
   - Press release (optional)

### 📞 Support Contacts

- **Technical Issues**: dev-team@ktlbd.com
- **Content Updates**: marketing@ktlbd.com
- **Analytics**: analytics@ktlbd.com

---

## Success Metrics (30/60/90 Days)

### 30 Days
- [ ] 50+ RFQ submissions
- [ ] 500+ case study views
- [ ] 200+ certification hub visits
- [ ] 1,000+ chatbot interactions

### 60 Days
- [ ] 150+ RFQ submissions
- [ ] 25+ qualified leads
- [ ] 10+ sustainability report downloads

### 90 Days
- [ ] 300+ total RFQs
- [ ] 50+ active sales conversations
- [ ] 10+ new clients from leads

---

**Deployment Date**: _________________
**Deployed By**: _________________
**Version**: 2.0.0-b2b
**Status**: ✅ Ready for Production

