import { Link } from 'react-router-dom';

const InvestorMetricsContent = () => (
  <section className="metrics-section">
    {/* Top Accent Bar */}
    <div className="metrics-accent-bar" />

    <div className="py-10 md:py-14 lg:py-20">
      <div className="mx-auto max-w-[1920px] px-0">
        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          {/* Left Column - Text Content */}
          <div className="md:col-span-7 lg:col-span-7 flex items-center">
            <div className="w-full space-y-6 md:space-y-7 lg:space-y-8 px-8 md:px-14 lg:px-20 xl:px-28 py-8 md:py-10 lg:py-12">
              <h2 className="font-heading text-[34px] md:text-[42px] lg:text-[52px] font-bold leading-[1.08] tracking-tight text-[#0B0B0B]">
                Investor Snapshot
              </h2>

              <div className="space-y-2 md:space-y-3">
                <p className="text-sm md:text-base lg:text-[18px] leading-[1.5] text-[#3C3C3C]">
                  DSE: M | as of March 29, 2026 3:10 PM BST
                </p>
                <p className="text-sm md:text-base lg:text-[18px] leading-[1.5] text-[#3C3C3C]">
                  Volume: 873,009. Change: +0.20 (+2.06%)
                </p>
              </div>

              <div className="pt-2 md:pt-4">
                <Link
                  to="/investors"
                  className="text-sm md:text-base lg:text-[18px] text-[#0B0B0B] underline hover:opacity-75 transition-opacity duration-200 min-h-[44px] inline-flex items-center py-1"
                  aria-label="View investor relations"
                >
                  Investor Relations
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Metric Display */}
          <div className="md:col-span-5 lg:col-span-5 relative min-h-[220px] md:min-h-[320px] lg:min-h-[420px]">
            <div className="bg-wave-pattern absolute inset-0 opacity-95" />
            <div className="relative z-10 h-full flex items-center justify-center lg:justify-start lg:pl-10 xl:pl-16">
              <div className="metric-display text-[58px] md:text-[96px] lg:text-[150px] xl:text-[170px] text-[#0B0B0B] text-center lg:text-left">
                <span className="metric-prefix">৳</span>9.90
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Rule */}
    <div className="metrics-bottom-rule" />
  </section>
);

export default InvestorMetricsContent;

