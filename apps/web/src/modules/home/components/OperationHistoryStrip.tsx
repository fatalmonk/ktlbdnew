import { Link } from "react-router-dom";
import AnimatedCounter from "../../../components/animation/AnimatedCounter";

const metrics = [
  { value: 24, text: "years of operation", align: "start" as const },
  { value: 79, text: "years of history", align: "end" as const },
];

/** Large display numerals — responsive scale */
const counterClassName =
  "inline-flex shrink-0 items-center font-glacial text-[12.5rem] font-bold leading-[0.85] tracking-[-0.04em] text-primary-500 md:text-[16rem] lg:text-[18.25rem]";

const OperationHistoryStrip = () => (
  <section
    className="relative overflow-hidden bg-[#05060b] py-20 md:py-24 lg:py-28"
    aria-label="Company operation and history highlights"
  >
    <div
      className="pointer-events-none absolute inset-0 opacity-90"
      aria-hidden
      style={{
        background:
          "radial-gradient(130% 85% at 30% -10%, rgba(22,27,46,0.95) 0%, rgba(8,10,18,0.95) 45%, rgba(4,5,10,1) 100%)",
      }}
    />

    <div className="relative mx-auto flex min-h-[32rem] w-full max-w-[1440px] flex-col justify-center px-6 md:min-h-[40rem] md:px-10 lg:min-h-[46rem] lg:px-16">
      <div className="grid w-full grid-cols-1 items-center justify-items-center gap-[0.9375rem] lg:grid-cols-[auto_auto_auto] lg:justify-center lg:gap-x-1 lg:gap-y-0 xl:gap-x-2">
        {metrics.map((metric, index) => {
          const isStart = metric.align === "start";
          return (
            <div
              key={metric.value}
              className={`flex flex-col gap-[0.28125rem] md:gap-[0.375rem] ${
                isStart
                  ? "items-center text-center lg:items-start lg:text-left"
                  : "items-center text-center lg:items-end lg:text-right"
              } ${index === 0 ? "order-1" : "order-3"}`}
            >
              <span className={counterClassName}>
                <AnimatedCounter
                  from={0}
                  to={metric.value}
                  duration={1.7}
                  delay={0.12 + index * 0.12}
                />
              </span>
              <p
                className={`max-w-[15rem] font-heading text-lg font-medium leading-snug tracking-[-0.015em] text-white/85 md:max-w-[17rem] md:text-xl lg:max-w-[20rem] ${
                  isStart ? "lg:pl-1" : "lg:pr-1"
                }`}
              >
                {metric.text}
              </p>
            </div>
          );
        })}

        <div className="order-2 flex flex-col items-center justify-center gap-1.5 px-10 py-2 lg:shrink-0 lg:px-16 lg:py-0 xl:px-20">
          <span
            className="hidden text-[0.75rem] font-semibold uppercase tracking-[0.32em] text-white/35 lg:block"
            aria-hidden
          >
            since
          </span>
          <Link
            to="/company/our-story"
            className="inline-flex min-h-[48px] items-center border border-white/20 bg-white/5 px-7 py-3 font-heading text-base font-semibold leading-none tracking-tight text-white backdrop-blur-sm transition-colors duration-200 hover:border-white/40 hover:bg-white hover:text-black md:min-h-[52px] md:px-8 md:py-3.5 md:text-lg"
          >
            more about us
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default OperationHistoryStrip;
