const metrics = [
  {
    value: "750K",
    label: "Units produced yearly",
    description: "Consistent, high-capacity output",
  },
  {
    value: "1.2M",
    label: "Fabric processed monthly",
    description: "Streamlined, large-scale workflow",
  },
  {
    value: "95%",
    label: "On-time shipments",
    description: "Dependable global fulfillment",
  },
] as const;

const KeyPerformanceMetricsSection = () => (
  <section
    className="bg-[#FAF8F5]"
    aria-labelledby="key-performance-metrics-heading"
  >
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 md:py-20 md:px-10 lg:max-w-6xl lg:py-24 lg:px-12">
      <p className="font-heading text-sm font-semibold uppercase tracking-[0.28em] text-[#8a8a8a] sm:text-[0.9375rem] md:text-base">
        Key performance metrics
      </p>
      <h2
        id="key-performance-metrics-heading"
        className="mt-5 max-w-[min(100%,42rem)] font-heading text-[2.65rem] font-bold leading-[1.08] tracking-[-0.025em] text-[#1a1a1a] sm:mt-6 sm:text-[3.35rem] md:text-[4rem] md:leading-[1.06] lg:mt-7 lg:text-[4.65rem] xl:text-[5.125rem]"
      >
        Precision. Scale.
        <br />
        Reliability. Proven.
      </h2>

      <div className="mt-14 md:mt-16 lg:mt-20">
        <ul className="divide-y divide-[#e5e2dc] border-t border-[#e5e2dc]">
          {metrics.map((row) => (
            <li key={row.label}>
              <div className="grid grid-cols-1 gap-5 py-10 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.65fr)] sm:items-center sm:gap-10 md:gap-14 md:py-12 lg:gap-16 lg:py-14">
                <p className="font-heading text-[4rem] font-bold leading-[0.95] tracking-[-0.035em] text-[#1a1a1a] sm:text-[4.75rem] md:text-[5.35rem] lg:text-[5.85rem] xl:text-[6.25rem]">
                  {row.value}
                </p>
                <div className="space-y-2 sm:space-y-2.5">
                  <p className="font-heading text-xl font-semibold leading-snug text-[#1a1a1a] sm:text-2xl md:text-3xl lg:text-[2rem]">
                    {row.label}
                  </p>
                  <p className="text-base leading-relaxed text-[#6b6b6b] sm:text-lg md:text-xl">
                    {row.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default KeyPerformanceMetricsSection;
