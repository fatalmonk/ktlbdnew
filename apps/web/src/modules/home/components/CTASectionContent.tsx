import { Link } from 'react-router-dom';

const CTASectionContent = () => (
  <section className="relative overflow-hidden bg-primary-500">
    <div className="mx-auto flex max-w-[1920px] flex-col lg:flex-row lg:items-stretch">
      {/* Left column — text content */}
      <div className="relative z-10 flex flex-1 flex-col justify-center pl-14 pr-6 py-16 md:pl-24 md:pr-12 md:py-20 lg:max-w-[55%] lg:pl-32 lg:pr-10 lg:py-24 xl:pl-40 xl:pr-12 xl:py-32">
        <h2 className="font-heading text-5xl font-bold leading-[1.08] tracking-tight text-neutral-900 md:text-6xl lg:text-7xl xl:text-8xl">
          Be part of an
          <br />
          <span className="italic">extraordinary</span>
          <br />
          story
        </h2>

        <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-800 md:mt-8 md:text-xl lg:text-2xl">
          Whether you're looking to advance your career, or are just getting started, we're looking
          for amazing talent like you.
        </p>

        <Link
          to="/work-with-us/careers"
          className="mt-6 inline-block w-fit text-lg font-semibold text-neutral-900 underline underline-offset-4 transition-colors hover:text-neutral-700 md:mt-8 md:text-xl"
        >
          Apply Now
        </Link>
      </div>

      {/* Right column — image */}
      <div className="relative hidden min-h-[400px] flex-1 lg:block lg:min-h-[480px]">
        <img
          src="/assets-optimized/designer-1-desktop.webp"
          alt="Professional joining the KTL team"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>

      {/* Decorative wave accent (bottom-right) */}
      <svg
        className="pointer-events-none absolute bottom-0 right-0 h-32 w-48 text-primary-400/40 md:h-40 md:w-64 lg:h-56 lg:w-80"
        viewBox="0 0 200 120"
        fill="none"
        aria-hidden="true"
      >
        <path d="M200 120 C 160 120, 120 80, 80 80 S 0 40, 0 0 L 200 0 Z" fill="currentColor" />
      </svg>
    </div>
  </section>
);

export default CTASectionContent;
