import { useId } from "react";
import { Link } from "react-router-dom";

import { STOCKNOW_KTL_URL, STOCK_EXCHANGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { BoardCommunicationLeftColumn } from "@/pages/company/governance/BoardCommunicationLeftColumn";

/** Decorative area chart (illustrative, not live market data). */
function InvestorSnapshotChart() {
  const gradId = useId().replace(/:/g, "");
  const w = 640;
  const h = 140;
  const padY = 8;
  const innerH = h - padY * 2;
  const xs = [
    0, 0.08, 0.16, 0.24, 0.32, 0.4, 0.48, 0.56, 0.64, 0.72, 0.8, 0.88, 1,
  ];
  const ys = [
    0.82, 0.78, 0.72, 0.68, 0.62, 0.55, 0.48, 0.42, 0.38, 0.32, 0.28, 0.34, 0.4,
  ];
  const pts = xs.map((x, i) => [x * w, padY + ys[i]! * innerH] as const);
  const lineD = pts
    .map(([px, py], i) => (i === 0 ? `M ${px} ${py}` : `L ${px} ${py}`))
    .join(" ");
  const [x0] = pts[0]!;
  const [xn] = pts[pts.length - 1]!;
  const areaD = `${lineD} L ${xn} ${h} L ${x0} ${h} Z`;

  return (
    <div className="relative mt-5 aspect-[4/1] w-full overflow-hidden rounded-lg border border-neutral-100 bg-gradient-to-b from-neutral-50/60 to-white sm:mt-6">
      <svg
        className="h-full w-full"
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(28 111 227)" stopOpacity="0.22" />
            <stop
              offset="100%"
              stopColor="rgb(28 111 227)"
              stopOpacity="0.02"
            />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1="0"
            x2={w}
            y1={padY + t * innerH}
            y2={padY + t * innerH}
            stroke="rgb(229 229 229)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path d={areaD} fill={`url(#${gradId})`} />
        <path
          d={lineD}
          fill="none"
          stroke="rgb(28 111 227)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <p className="sr-only">
        Illustrative trend graphic for layout only; not live or historical
        market data.
      </p>
    </div>
  );
}

function MetricCell({
  label,
  value,
  truncateValue = true,
  valueClassName,
}: {
  label: string;
  value: string;
  /** Set false when the value may need to wrap (e.g. 52-week range, change). */
  truncateValue?: boolean;
  valueClassName?: string;
}) {
  return (
    <div className="flex h-full min-h-[5.25rem] min-w-0 flex-col justify-start gap-2 bg-white px-4 py-4 sm:min-h-[5.75rem] sm:px-5 sm:py-5 md:min-h-[6rem] md:px-5 md:py-6 lg:px-5">
      <span className="text-balance text-sm font-medium uppercase leading-snug tracking-wide text-neutral-500 sm:text-base">
        {label}
      </span>
      <div className="min-w-0">
        <span
          className={cn(
            "block text-lg font-semibold tabular-nums sm:text-xl md:text-2xl lg:text-xl xl:text-2xl",
            truncateValue ? "truncate" : "text-pretty leading-snug",
            "text-[#0B0B0B]",
            valueClassName,
          )}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

const InvestorMetricsContent = () => (
  <section className="metrics-section" aria-label="Investor snapshot">
    <div className="py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[min(100%,1280px)] px-4 sm:px-6 lg:pl-0 lg:pr-8">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:grid-rows-[minmax(44rem,1fr)] lg:items-stretch lg:gap-8 xl:gap-10 lg:min-h-[44rem] lg:content-stretch">
          <aside
            className="investor-board-aside-bg order-2 grid min-h-0 min-w-0 grid-rows-[minmax(0,1fr)_auto] self-stretch max-lg:min-h-[32rem] max-lg:-mx-4 max-lg:w-[calc(100%+2rem)] sm:max-lg:-mx-6 sm:max-lg:w-[calc(100%+3rem)] lg:order-none lg:mx-0 lg:w-auto lg:col-span-8 lg:h-full lg:min-h-full"
            aria-label="Board communication, governance links, and investor relations"
          >
            <div className="min-h-0 px-5 pt-6 sm:px-8 sm:pt-8 lg:min-h-0 lg:px-10 lg:pt-10">
              <BoardCommunicationLeftColumn variant="compact" compactOnBlue />
            </div>
            <ul className="grid grid-cols-3 gap-2 border-t border-white/25 px-5 pb-5 pt-5 text-2xl font-semibold leading-snug text-white sm:gap-3 sm:px-8 sm:pb-6 sm:pt-6 md:px-10 md:pb-7 md:pt-6 md:text-[1.5625rem] lg:text-[1.6875rem]">
              <li className="min-w-0">
                <Link
                  to="/investors"
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-0.5 text-balance text-center font-bold text-white underline-offset-2 transition-colors hover:text-white/90 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 sm:min-h-[52px]"
                >
                  Investor relations
                  <span aria-hidden>→</span>
                </Link>
              </li>
              <li className="min-w-0">
                <Link
                  to="/company/governance"
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-0.5 text-balance text-center font-bold text-white underline-offset-2 transition-colors hover:text-white/90 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 sm:min-h-[52px]"
                >
                  Corporate governance
                  <span aria-hidden>→</span>
                </Link>
              </li>
              <li className="min-w-0">
                <Link
                  to="/contact"
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-0.5 text-balance text-center font-bold text-white underline-offset-2 transition-colors hover:text-white/90 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 sm:min-h-[52px]"
                >
                  Contact IR
                  <span aria-hidden>→</span>
                </Link>
              </li>
            </ul>
          </aside>

          <div className="order-1 flex min-h-0 min-w-0 flex-col self-stretch lg:order-none lg:col-span-4 lg:h-full lg:min-h-full">
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.06)]">
              <div className="flex min-h-0 flex-1 flex-col border-b border-neutral-100 px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6 md:px-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8 md:gap-10">
                  <div className="min-w-0 space-y-1.5 sm:space-y-2">
                    <p className="font-heading text-[clamp(1rem,3.1vw,1.375rem)] font-normal leading-tight tracking-tight text-neutral-700 sm:tracking-normal">
                      DSE: Z
                    </p>
                    <p className="text-3xl font-bold leading-tight tracking-tight text-neutral-800 sm:text-4xl md:text-5xl">
                      KTL
                    </p>
                    <p className="text-xs leading-normal text-neutral-400 sm:text-sm">
                      Dhaka Stock Exchange · BDT
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-1.5 sm:items-end sm:gap-2 sm:text-right">
                    <p className="metric-display text-[clamp(1.375rem,4.8vw,2.5rem)] font-extrabold leading-tight tabular-nums tracking-tight text-[#0B0B0B]">
                      <span className="metric-prefix">৳</span>9.60
                    </p>
                    <p className="text-sm font-semibold text-status-danger tabular-nums sm:text-base md:text-lg">
                      −0.20 (−2.04%)
                    </p>
                    <p className="text-xs leading-normal text-neutral-400 sm:text-sm">
                      As of April 2, 2026 · 3:10 PM BST
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 border-t border-neutral-100 pt-4 sm:mt-5">
                  <p className="text-xs leading-relaxed text-neutral-500 sm:text-sm md:text-base">
                    Illustrative snapshot only—not real-time market data. Do not
                    use for trading decisions.
                  </p>
                  <p className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium sm:text-base">
                    <a
                      href={STOCK_EXCHANGES.dse.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-600 underline-offset-2 transition-colors hover:text-accent-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/35"
                      aria-label={`Official ${STOCK_EXCHANGES.dse.name} listing for KTL (opens in new tab)`}
                    >
                      {STOCK_EXCHANGES.dse.shortName} listing
                      <span aria-hidden className="ml-0.5">
                        ↗
                      </span>
                    </a>
                    <a
                      href={STOCKNOW_KTL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-600 underline-offset-2 transition-colors hover:text-accent-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/35"
                      aria-label="Live quote and charts for KTL on StockNow, third-party site (opens in new tab)"
                    >
                      Live quote · StockNow
                      <span aria-hidden className="ml-0.5">
                        ↗
                      </span>
                    </a>
                  </p>
                </div>

                <InvestorSnapshotChart />
              </div>

              <div className="shrink-0 px-5 pb-5 sm:px-6 sm:pb-6 md:px-8 md:pb-8">
                <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-neutral-200/90 bg-neutral-200/90 sm:grid-cols-2 md:grid-cols-4 md:items-stretch lg:grid-cols-2">
                  <MetricCell label="Volume" value="283,798" />
                  <MetricCell
                    label="Change"
                    value="−৳0.20 (−2.04%)"
                    truncateValue={false}
                    valueClassName="text-status-danger"
                  />
                  <MetricCell
                    label="52 Week Range"
                    value="৳8.50 – ৳14.70"
                    truncateValue={false}
                  />
                  <div className="flex h-full min-h-[5.25rem] min-w-0 flex-col justify-start gap-2 bg-white px-4 py-4 sm:min-h-[5.75rem] sm:px-5 sm:py-5 md:min-h-[6rem] md:px-5 md:py-6 lg:px-5">
                    <span className="text-balance text-sm font-medium uppercase leading-snug tracking-wide text-neutral-500 sm:text-base">
                      Overview
                    </span>
                    <div className="flex min-w-0 flex-col gap-1">
                      <Link
                        to="/investors"
                        className="inline-flex min-h-[44px] min-w-0 items-center text-balance text-base font-semibold leading-snug text-accent-600 underline-offset-4 transition-colors hover:text-accent-700 hover:underline sm:text-lg lg:text-base xl:text-lg"
                        aria-label="View Investor Relations"
                      >
                        Investor Relations
                        <span aria-hidden className="ml-0.5 shrink-0">
                          →
                        </span>
                      </Link>
                      <span className="text-sm leading-snug text-neutral-400 sm:text-base">
                        Filings, news, and overview
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="metrics-bottom-rule" />
  </section>
);

export default InvestorMetricsContent;
