import React, { useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { MotionConfig } from "framer-motion";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import FloatingCTA from "./components/layout/FloatingCTA";
import ChatbotWidget from "./components/Chatbot/ChatbotWidget";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import Loading from "./components/ui/Loading";
import StructuredData from "./components/seo/StructuredData";
import {
  createOrganizationSchema,
  createWebsiteSchema,
} from "./modules/seo/templates";
import { DebugPanel } from "./components/ui/DebugPanel";
import ViewportHeightInit from "./components/ViewportHeightInit";
import { measureLoadTime } from "./utils/performance";

// Lazy load pages for better performance
const Home = React.lazy(() => import("./pages/Home"));
const Products = React.lazy(() => import("./pages/Products"));
const Contact = React.lazy(() => import("./pages/Contact"));

// Blog pages
const Blog = React.lazy(() => import("./pages/Blog"));
const BlogPost = React.lazy(() => import("./pages/BlogPost"));

// Product pages
const ProductDenims = React.lazy(() => import("./pages/products/denims"));
const ProductKnitwear = React.lazy(() => import("./pages/products/knitwear"));
const ProductSwimwear = React.lazy(() => import("./pages/products/swimwear"));
const ProductKids = React.lazy(() => import("./pages/products/kids"));

// Company pages
const CompanyOurStory = React.lazy(() => import("./pages/company/our-story"));
const CompanyLeadership = React.lazy(
  () => import("./pages/company/leadership"),
);
const CompanyGovernance = React.lazy(
  () => import("./pages/company/governance"),
);

// Facilities pages
const FacilitiesRMG = React.lazy(() => import("./pages/facilities/rmg"));
const FacilitiesWashing = React.lazy(
  () => import("./pages/facilities/washing"),
);
const FacilitiesTech = React.lazy(() => import("./pages/facilities/tech"));
const FacilitiesAgro = React.lazy(() => import("./pages/facilities/agro"));
const FacilitiesShipping = React.lazy(
  () => import("./pages/facilities/shipping"),
);

// Investor pages
const InvestorsOverview = React.lazy(
  () => import("./pages/investors/overview"),
);

// Work With Us pages
const WorkWithUsBuyers = React.lazy(
  () => import("./pages/work-with-us/buyers"),
);
const WorkWithUsVendors = React.lazy(
  () => import("./pages/work-with-us/vendors"),
);
const WorkWithUsCareers = React.lazy(
  () => import("./pages/work-with-us/careers"),
);

// Newsroom pages
const NewsroomPress = React.lazy(() => import("./pages/newsroom/press"));
const NewsroomPSI = React.lazy(() => import("./pages/newsroom/psi"));
const NewsroomMediaKit = React.lazy(() => import("./pages/newsroom/media-kit"));

// Case Studies pages
const CaseStudiesIndex = React.lazy(
  () => import("./pages/case-studies/CaseStudiesIndex"),
);
const CaseStudyDetail = React.lazy(
  () => import("./pages/case-studies/CaseStudyDetail"),
);

// Certifications pages
const CertificationsHub = React.lazy(
  () => import("./pages/certifications/CertificationsHub"),
);

// Sustainability pages
const SustainabilityDashboard = React.lazy(
  () => import("./pages/sustainability/SustainabilityDashboard"),
);

// RFQ pages
const RequestQuote = React.lazy(() => import("./pages/rfq/RequestQuote"));

// Investor pages
const InvestorsStock = React.lazy(() => import("./pages/investors/stock"));
const InvestorsQuarterly = React.lazy(
  () => import("./pages/investors/reports/quarterly"),
);
const InvestorsAnnual = React.lazy(
  () => import("./pages/investors/reports/annual"),
);
const InvestorsPSI = React.lazy(() => import("./pages/investors/reports/psi"));
const InvestorsContacts = React.lazy(
  () => import("./pages/investors/contacts"),
);

// Test pages
const AnimationTest = React.lazy(() => import("./pages/test/AnimationTest"));
const ResponsiveHooksTest = React.lazy(
  () => import("./components/test/ResponsiveHooksTest"),
);
const MetricsTest = React.lazy(() => import("./pages/test/MetricsTest"));

/** Reset scroll after client-side navigation (BrowserRouter does not by default). */
function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    console.log("App component mounted successfully");
    console.log("Current location:", window.location.href);

    // Measure React app load time after mount
    measureLoadTime();
  }, []);

  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <Router basename={import.meta.env.BASE_URL}>
          <ScrollToTopOnRouteChange />
          <StructuredData
            data={[createOrganizationSchema(), createWebsiteSchema()]}
          />
          <ViewportHeightInit />
          <div className="min-h-screen bg-white font-body">
            <Header />
            <main>
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  {isDev && (
                    <Route path="/test/animation" element={<AnimationTest />} />
                  )}
                  {isDev && (
                    <Route
                      path="/test/responsive-hooks"
                      element={<ResponsiveHooksTest />}
                    />
                  )}
                  {isDev && (
                    <Route path="/test/metrics" element={<MetricsTest />} />
                  )}
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/denims" element={<ProductDenims />} />
                  <Route
                    path="/products/knitwear"
                    element={<ProductKnitwear />}
                  />
                  <Route
                    path="/products/swimwear"
                    element={<ProductSwimwear />}
                  />
                  <Route path="/products/kids" element={<ProductKids />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* Company routes */}
                  <Route
                    path="/company/who-we-are"
                    element={<Navigate to="/company/our-story" replace />}
                  />
                  <Route
                    path="/company/our-story"
                    element={<CompanyOurStory />}
                  />
                  <Route
                    path="/company/leadership"
                    element={<CompanyLeadership />}
                  />
                  <Route
                    path="/company/governance"
                    element={<CompanyGovernance />}
                  />
                  <Route
                    path="/company/sustainability"
                    element={<Navigate to="/sustainability" replace />}
                  />

                  {/* Facilities routes */}
                  <Route path="/facilities/rmg" element={<FacilitiesRMG />} />
                  <Route
                    path="/facilities/washing"
                    element={<FacilitiesWashing />}
                  />
                  <Route path="/facilities/tech" element={<FacilitiesTech />} />
                  <Route path="/facilities/agro" element={<FacilitiesAgro />} />
                  <Route
                    path="/facilities/shipping"
                    element={<FacilitiesShipping />}
                  />

                  {/* Work With Us routes */}
                  <Route
                    path="/work-with-us/buyers"
                    element={<WorkWithUsBuyers />}
                  />
                  <Route
                    path="/work-with-us/vendors"
                    element={<WorkWithUsVendors />}
                  />
                  <Route
                    path="/work-with-us/careers"
                    element={<WorkWithUsCareers />}
                  />

                  {/* Newsroom routes */}
                  <Route path="/newsroom/press" element={<NewsroomPress />} />
                  <Route path="/newsroom/stories" element={<Blog />} />
                  <Route
                    path="/newsroom/stories/:slug"
                    element={<BlogPost />}
                  />
                  <Route path="/newsroom/psi" element={<NewsroomPSI />} />
                  <Route
                    path="/newsroom/media-kit"
                    element={<NewsroomMediaKit />}
                  />

                  {/* Investor routes */}
                  <Route path="/investors" element={<InvestorsOverview />} />
                  <Route
                    path="/investors/overview"
                    element={<InvestorsOverview />}
                  />
                  <Route path="/investors/stock" element={<InvestorsStock />} />
                  <Route
                    path="/investors/reports/quarterly"
                    element={<InvestorsQuarterly />}
                  />
                  <Route
                    path="/investors/reports/annual"
                    element={<InvestorsAnnual />}
                  />
                  <Route
                    path="/investors/reports/psi"
                    element={<InvestorsPSI />}
                  />
                  <Route
                    path="/investors/contacts"
                    element={<InvestorsContacts />}
                  />

                  {/* Case Studies routes */}
                  <Route path="/case-studies" element={<CaseStudiesIndex />} />
                  <Route
                    path="/case-studies/:slug"
                    element={<CaseStudyDetail />}
                  />

                  {/* Certifications routes */}
                  <Route
                    path="/certifications"
                    element={<CertificationsHub />}
                  />

                  {/* Sustainability routes */}
                  <Route
                    path="/sustainability"
                    element={<SustainabilityDashboard />}
                  />

                  {/* RFQ routes */}
                  <Route path="/rfq" element={<RequestQuote />} />
                </Routes>
              </Suspense>
            </main>
            <FloatingCTA />
            <ChatbotWidget />
            <Footer />
            {isDev && <DebugPanel />}
          </div>
        </Router>
      </MotionConfig>
    </ErrorBoundary>
  );
}

export default App;
