import { Link } from 'react-router-dom';
import AnimatedCounter from '../../../components/animation/AnimatedCounter';

const metrics = [
  { value: 24, text: 'years of operation' },
  { value: 79, text: 'years of history' },
];

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
          'radial-gradient(130% 85% at 30% -10%, rgba(22,27,46,0.95) 0%, rgba(8,10,18,0.95) 45%, rgba(4,5,10,1) 100%)',
      }}
    />
    <div className="relative mx-auto flex min-h-[26rem] w-full max-w-[1440px] flex-col items-center justify-center gap-14 px-6 md:min-h-[32rem] md:px-10 lg:min-h-[36rem] lg:px-16">
      <div className="flex w-full max-w-[62rem] flex-col items-center gap-4 text-center md:gap-5">
        {metrics.map((metric, index) => (
          <p
            key={metric.value}
            className="flex flex-wrap items-center justify-center gap-x-3 font-heading text-[2.2rem] font-medium leading-tight tracking-[-0.015em] text-white md:gap-x-4 md:text-[2.9rem] lg:text-[3.3rem]"
          >
            <span className="inline-flex shrink-0 items-center font-glacial text-primary-500 text-[5.5rem] font-bold leading-none md:text-[7rem] lg:text-[8rem]">
              <AnimatedCounter
                from={0}
                to={metric.value}
                duration={1.7}
                delay={0.12 + index * 0.12}
              />
            </span>
            <span>{metric.text}</span>
          </p>
        ))}
      </div>

      <Link
        to="/company/our-story"
        className="inline-flex min-h-[44px] items-center bg-white px-5 py-2 font-heading text-sm font-semibold leading-none tracking-tight text-black transition-colors duration-200 hover:bg-neutral-200 md:px-6 md:py-2.5 md:text-base"
      >
        more about us
      </Link>
    </div>
  </section>
);

export default OperationHistoryStrip;
