import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingCTA from './components/layout/FloatingCTA';
import ErrorBoundary from './components/shared/ErrorBoundary';
import Loading from './components/ui/Loading';
import StructuredData, { organizationSchema, websiteSchema } from './components/seo/StructuredData';
import { DebugPanel } from './components/ui/DebugPanel';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Products = React.lazy(() => import('./pages/Products'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Investors = React.lazy(() => import('./pages/Investors'));

// Blog pages
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));

// Product pages
const ProductDenims = React.lazy(() => import('./pages/products/denims'));
const ProductKnitwear = React.lazy(() => import('./pages/products/knitwear'));
const ProductSwimwear = React.lazy(() => import('./pages/products/swimwear'));
const ProductKids = React.lazy(() => import('./pages/products/kids'));

// Company pages
const CompanyOurStory = React.lazy(() => import('./pages/company/our-story'));
const CompanyLeadership = React.lazy(() => import('./pages/company/leadership'));
const CompanyGovernance = React.lazy(() => import('./pages/company/governance'));
const CompanySustainability = React.lazy(() => import('./pages/company/sustainability'));

// Facilities pages
const FacilitiesRMG = React.lazy(() => import('./pages/facilities/rmg'));
const FacilitiesWashing = React.lazy(() => import('./pages/facilities/washing'));
const FacilitiesTech = React.lazy(() => import('./pages/facilities/tech'));
const FacilitiesAgro = React.lazy(() => import('./pages/facilities/agro'));
const FacilitiesShipping = React.lazy(() => import('./pages/facilities/shipping'));

// Investor pages
const InvestorsOverview = React.lazy(() => import('./pages/investors/overview'));

// Work With Us pages
const WorkWithUsBuyers = React.lazy(() => import('./pages/work-with-us/buyers'));
const WorkWithUsVendors = React.lazy(() => import('./pages/work-with-us/vendors'));
const WorkWithUsCareers = React.lazy(() => import('./pages/work-with-us/careers'));

// Newsroom pages
const NewsroomPress = React.lazy(() => import('./pages/newsroom/press'));
const NewsroomStories = React.lazy(() => import('./pages/newsroom/stories'));
const NewsroomPSI = React.lazy(() => import('./pages/newsroom/psi'));
const NewsroomMediaKit = React.lazy(() => import('./pages/newsroom/media-kit'));

// Investor pages
const InvestorsStock = React.lazy(() => import('./pages/investors/stock'));
const InvestorsQuarterly = React.lazy(() => import('./pages/investors/reports/quarterly'));
const InvestorsAnnual = React.lazy(() => import('./pages/investors/reports/annual'));
const InvestorsPSI = React.lazy(() => import('./pages/investors/reports/psi'));
const InvestorsContacts = React.lazy(() => import('./pages/investors/contacts'));

// Test pages
const AnimationTest = React.lazy(() => import('./pages/test/AnimationTest'));

function App() {
  useEffect(() => {
    console.log('App component mounted successfully');
    console.log('Current location:', window.location.href);
  }, []);

  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <Router basename={import.meta.env.BASE_URL}>
          <StructuredData data={[organizationSchema, websiteSchema]} />
          <div className="min-h-screen bg-white font-body">
            <Header />
            <main>
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/test/animation" element={<AnimationTest />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/denims" element={<ProductDenims />} />
                <Route path="/products/knitwear" element={<ProductKnitwear />} />
                <Route path="/products/swimwear" element={<ProductSwimwear />} />
                <Route path="/products/kids" element={<ProductKids />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/investors" element={<Investors />} />

                {/* Company routes */}
                      <Route path="/company/our-story" element={<CompanyOurStory />} />
                <Route path="/company/leadership" element={<CompanyLeadership />} />
                <Route path="/company/governance" element={<CompanyGovernance />} />
                <Route path="/company/sustainability" element={<CompanySustainability />} />

                {/* Facilities routes */}
                <Route path="/facilities/rmg" element={<FacilitiesRMG />} />
                <Route path="/facilities/washing" element={<FacilitiesWashing />} />
                <Route path="/facilities/tech" element={<FacilitiesTech />} />
                <Route path="/facilities/agro" element={<FacilitiesAgro />} />
                <Route path="/facilities/shipping" element={<FacilitiesShipping />} />


                {/* Work With Us routes */}
                <Route path="/work-with-us/buyers" element={<WorkWithUsBuyers />} />
                <Route path="/work-with-us/vendors" element={<WorkWithUsVendors />} />
                <Route path="/work-with-us/careers" element={<WorkWithUsCareers />} />

                {/* Newsroom routes */}
                <Route path="/newsroom/press" element={<NewsroomPress />} />
                <Route path="/newsroom/stories" element={<Blog />} />
                <Route path="/newsroom/stories/:slug" element={<BlogPost />} />
                <Route path="/newsroom/psi" element={<NewsroomPSI />} />
                <Route path="/newsroom/media-kit" element={<NewsroomMediaKit />} />

                {/* Investor routes */}
                <Route path="/investors/overview" element={<InvestorsOverview />} />
                <Route path="/investors/stock" element={<InvestorsStock />} />
                <Route path="/investors/reports/quarterly" element={<InvestorsQuarterly />} />
                <Route path="/investors/reports/annual" element={<InvestorsAnnual />} />
                <Route path="/investors/reports/psi" element={<InvestorsPSI />} />
                <Route path="/investors/contacts" element={<InvestorsContacts />} />
                </Routes>
              </Suspense>
            </main>
            <FloatingCTA />
            <Footer />
            {process.env.NODE_ENV === 'development' && <DebugPanel />}
          </div>
        </Router>
      </MotionConfig>
    </ErrorBoundary>
  );
}

export default App;
