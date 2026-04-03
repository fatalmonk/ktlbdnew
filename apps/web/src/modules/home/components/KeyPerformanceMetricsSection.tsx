const metrics = [
  {
    value: "1.5M",
    label: "Units produced yearly",
    description: "Consistent, high-capacity output",
  },
  {
    value: "1.8M",
    label: "Fabric processed monthly",
    description: "Streamlined, large-scale workflow",
  },
  {
    value: "500pcs",
    label: "Low MOQ",
    description: "Flexible minimums for growing brands",
  },
] as const;

function MetricCell({ row }: { row: (typeof metrics)[number] }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 sm:gap-x-10 sm:gap-y-4 md:gap-x-16 lg:items-start lg:gap-x-12 lg:gap-y-0 xl:gap-x-20 2xl:gap-x-24">
      <div className="min-w-0 space-y-1.5 sm:space-y-2.5 lg:pt-2">
        <p className="font-heading text-lg font-semibold leading-snug text-[#1a1a1a] transition-opacity duration-300 ease-out group-hover:opacity-[0.88] sm:text-2xl md:text-3xl lg:text-[1.75rem] xl:text-[2rem]">
          {row.label}
        </p>
        <p className="text-sm leading-relaxed text-[#6b6b6b] transition-opacity duration-300 ease-out group-hover:opacity-70 sm:text-lg md:text-xl">
          {row.description}
        </p>
      </div>
      <p className="w-max max-w-full shrink-0 text-right font-heading text-[2.75rem] font-bold leading-[0.95] tracking-[-0.035em] text-[#1a1a1a] transition-[color,filter,opacity] duration-300 ease-out group-hover:text-primary-500 group-hover:opacity-95 group-hover:[filter:drop-shadow(0_0_24px_rgba(243,212,90,0.35))] xs:text-[3.25rem] sm:text-[4.75rem] md:text-[5.35rem] lg:whitespace-nowrap lg:tabular-nums lg:text-[4.5rem] xl:text-[5.25rem] 2xl:text-[5.85rem]">
        {row.value}
      </p>
    </div>
  );
}

const KeyPerformanceMetricsSection = () => (
  <section
    className="bg-[#FAF8F5]"
    aria-labelledby="key-performance-metrics-heading"
  >
    <div className="mx-auto w-full max-w-[1920px] px-16 py-28 sm:px-[4.5rem] sm:py-32 md:px-20 md:py-36 lg:px-24 lg:py-44 xl:px-32 xl:py-48 2xl:px-40 2xl:py-52">
      <div className="grid grid-cols-1 gap-14 md:gap-16 lg:grid-cols-[minmax(0,min(100%,48rem))_minmax(0,min(100%,38rem))] lg:items-start lg:justify-end lg:gap-x-12 lg:gap-y-0 xl:grid-cols-[minmax(0,min(100%,58rem))_minmax(0,min(100%,42rem))] xl:gap-x-16 2xl:grid-cols-[minmax(0,min(100%,64rem))_minmax(0,min(100%,46rem))] 2xl:gap-x-20">
        {/* Left column — section label + headline */}
        <div className="min-w-0 lg:pt-12 lg:text-right xl:pt-16 2xl:pt-20">
          <p className="font-heading text-base font-semibold uppercase tracking-[0.28em] text-[#8a8a8a] sm:text-lg md:text-xl lg:text-xl xl:text-[1.3125rem]">
            Key performance metrics
          </p>
          <h2
            id="key-performance-metrics-heading"
            className="mt-5 font-heading text-[calc(3rem_+_1rem)] font-bold leading-[1.06] tracking-[-0.025em] text-[#1a1a1a] sm:mt-6 sm:text-[calc(3.75rem_+_1rem)] sm:leading-[1.05] md:text-[calc(4.5rem_+_1rem)] md:leading-[1.05] lg:mt-7 lg:text-[calc(5.25rem_+_1rem)] lg:leading-[1.04] xl:text-[calc(5.85rem_+_1rem)] 2xl:text-[calc(6.35rem_+_1rem)] 2xl:leading-[1.03]"
          >
            Precision. Scale.
            <br />
            <span className="text-[var(--announcement-ticker-badge-red)]">
              Reliability
            </span>
            {". Proven."}
          </h2>
        </div>

        {/* Right column — three full-width rows */}
        <div className="min-w-0 lg:border-l lg:border-[#e5e2dc] lg:pl-10 xl:pl-14 2xl:pl-16">
          <ul
            className="divide-y divide-[#e5e2dc] border-t border-[#e5e2dc]"
            role="list"
          >
            {metrics.map((row) => (
              <li
                key={row.label}
                className="group relative py-10 md:py-12 lg:py-12 xl:py-14"
              >
                <div
                  className="pointer-events-none absolute inset-y-2 -inset-x-3 rounded-xl bg-white/45 opacity-0 backdrop-blur-md transition-opacity duration-300 ease-out group-hover:opacity-100 sm:-inset-x-4 md:inset-y-1"
                  aria-hidden
                />
                <div className="relative z-10">
                  <MetricCell row={row} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default KeyPerformanceMetricsSection;
