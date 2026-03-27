import { Link } from 'react-router-dom';

const InvestorMetricsContent = () => (
  <section className="metrics-section">
    {/* Top Accent Bar */}
    <div className="metrics-accent-bar" />

    <div className="py-6 md:py-12 lg:py-18 xl:py-24">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="md:col-span-7 lg:col-span-7 space-y-2 md:space-y-3 lg:space-y-4">
            <h2 className="font-heading text-xl md:text-2xl lg:text-[36px] font-bold leading-[1.15] text-[#0B0B0B]">
              Investor Snapshot
            </h2>

            <div className="space-y-1 md:space-y-1.5">
              <p className="text-xs md:text-sm lg:text-[16px] leading-[1.5] md:leading-[1.6] text-[#3C3C3C]">
                DSE: M | as of September 19, 2025 4:00 PM EST
              </p>
              <p className="text-xs md:text-sm lg:text-[16px] leading-[1.5] md:leading-[1.6] text-[#3C3C3C]">
                Volume: 10,508,014. Change: -0.06 (-0.34%)
              </p>
            </div>

            <div className="pt-2 md:pt-2">
              <Link
                to="/investors"
                className="text-xs md:text-sm lg:text-[16px] text-[#0B0B0B] underline hover:opacity-75 transition-opacity duration-200 min-h-[44px] inline-flex items-center py-1"
                aria-label="View investor relations"
              >
                Investor Relations
              </Link>
            </div>
          </div>

          {/* Right Column - Metric Display */}
          <div className="md:col-span-5 lg:col-span-5 relative">
            <div className="bg-wave-pattern absolute inset-0 opacity-15 md:opacity-100" />
            <div className="relative z-10 flex justify-center md:justify-end items-center h-full min-h-[100px] md:min-h-[200px] lg:min-h-[300px]">
              <div className="text-center md:text-right">
                <div className="metric-display text-[32px] md:text-[64px] lg:text-[120px] text-[#0B0B0B]">
                  <span className="metric-prefix">৳</span>45.50
                </div>
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

