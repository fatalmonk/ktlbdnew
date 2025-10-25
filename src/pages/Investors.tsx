import { useEffect, useState } from 'react';
import type { KPI, IRFile, IRItem, Price } from '../ir/types';

const Investors = () => {
  const [price, setPrice] = useState<Price | null>(null);
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [results, setResults] = useState<IRFile[]>([]);
  const [filings, setFilings] = useState<IRItem[]>([]);
  const [press, setPress] = useState<IRItem[]>([]);
  const [events, setEvents] = useState<IRItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [priceRes, kpisRes, resultsRes, filingsRes, pressRes, eventsRes] = await Promise.all([
          fetch('/data/ir/price.json'),
          fetch('/data/ir/kpis.json'),
          fetch('/data/ir/results.json'),
          fetch('/data/ir/filings.json'),
          fetch('/data/ir/press.json'),
          fetch('/data/ir/events.json')
        ]);

        if (priceRes.ok) setPrice(await priceRes.json());
        if (kpisRes.ok) setKpis(await kpisRes.json());
        if (resultsRes.ok) setResults(await resultsRes.json());
        if (filingsRes.ok) setFilings(await filingsRes.json());
        if (pressRes.ok) setPress(await pressRes.json());
        if (eventsRes.ok) setEvents(await eventsRes.json());
      } catch (error) {
        console.error('Error fetching IR data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-[var(--ir-bg)] text-[var(--ir-text)] pt-20 min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading Investor Relations...</div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--ir-bg)] text-[var(--ir-text)]">
      {/* Hero Section with Professional Background */}
      <section className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-investor-hero">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Investor Relations
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed opacity-90 max-w-3xl mx-auto">
            Your gateway to KTL's financial performance, strategic insights, and investment opportunities
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#metric-band" className="btn-ktl-primary">
              View Key Metrics
            </a>
            <a href="#latest-results" className="btn-ktl-secondary">
              Latest Results
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white opacity-70">
          <div className="animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Metric Band */}
      <section id="metric-band" className="relative bg-[var(--ir-bg)]">
        <div className="ir-topbar" />
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 md:grid-cols-[.58fr_.42fr] items-center gap-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--ir-text)]">Investor Snapshot</h2>
            <p className="mt-4 text-[16px] leading-7 text-[var(--ir-muted)]">
              Key figures (placeholder). Replace with live feed.
            </p>
            <a className="mt-6 inline-block underline text-[var(--ir-text)]" href="#investor-relations">
              Investor Relations
            </a>
          </div>
          <div className="relative ir-pattern rounded-md">
            <div className="relative z-10 text-right p-6 md:p-8">
              <div className="text-[64px] md:text-[120px] leading-[0.95] font-extrabold tracking-[-0.01em] text-[var(--ir-text)]">
                {price ? (
                  <>
                    <span className="align-top text-3xl mr-1">{price.currency === "BDT" ? "৳" : price.currency === "USD" ? "$" : ""}</span>
                    {price.value.toFixed(2)}
                  </>
                ) : (
                  "—"
                )}
              </div>
              <div className="mt-2 text-sm text-[var(--ir-muted)]">
                {price?.symbol ?? "—"} · {price?.asOf ?? ""}
              </div>
            </div>
          </div>
        </div>
        <div className="ir-botrule" />
      </section>

      {/* KPIs */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-semibold">Key KPIs</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {kpis.map((k, i) => (
            <div key={i} className="rounded-lg border p-5">
              <div className="text-sm text-neutral-600">{k.label}</div>
              <div className="mt-2 text-2xl font-semibold">{k.value}</div>
              {k.footnote && <div className="mt-1 text-xs text-neutral-500">{k.footnote}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Latest Results */}
      <section id="latest-results" className="mx-auto max-w-[1280px] px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-semibold">Latest Results</h3>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {results.map((f, i) => (
            <li key={i} className="border rounded-lg p-4 hover:shadow-sm">
              <div className="text-base font-medium">{f.title}</div>
              <div className="text-sm text-neutral-600 mt-1">{new Date(f.date).toLocaleDateString()}</div>
              <a className="mt-3 inline-flex underline" href={f.href}>Download</a>
            </li>
          ))}
        </ul>
      </section>

      {/* SEC Filings */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-8 py-12">
        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl font-semibold">SEC Filings</h3>
          <a className="underline" href="#">See all</a>
        </div>
        <ul className="mt-6 space-y-3">
          {filings.map((it, i) => (
            <li key={i} className="flex justify-between gap-4 border-b py-3">
              <a className="underline" href={it.href}>{it.title}</a>
              <time className="text-sm text-neutral-600">{new Date(it.date).toLocaleDateString()}</time>
            </li>
          ))}
        </ul>
      </section>

      {/* Press Releases */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-8 py-12">
        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl font-semibold">Press Releases</h3>
          <a className="underline" href="#">See all</a>
        </div>
        <ul className="mt-6 space-y-3">
          {press.map((it, i) => (
            <li key={i} className="flex justify-between gap-4 border-b py-3">
              <a className="underline" href={it.href}>{it.title}</a>
              <time className="text-sm text-neutral-600">{new Date(it.date).toLocaleDateString()}</time>
            </li>
          ))}
        </ul>
      </section>

      {/* Events & Presentations */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-8 py-12">
        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl font-semibold">Events & Presentations</h3>
          <a className="underline" href="#">See all</a>
        </div>
        <ul className="mt-6 space-y-3">
          {events.map((it, i) => (
            <li key={i} className="flex justify-between gap-4 border-b py-3">
              <a className="underline" href={it.href}>{it.title}</a>
              <time className="text-sm text-neutral-600">{new Date(it.date).toLocaleDateString()}</time>
            </li>
          ))}
        </ul>
      </section>

      {/* Email Alerts CTA */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-8 py-16 bg-neutral-50 rounded-xl my-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-semibold">Email Alerts</h3>
            <p className="text-neutral-600 mt-2">Subscribe to updates (placeholder form).</p>
          </div>
          <form className="flex gap-3 w-full md:w-auto">
            <input
              className="border rounded-md px-3 h-11 w-full md:w-80"
              placeholder="you@example.com"
              aria-label="Email"
            />
            <button className="h-11 px-5 rounded-md bg-black text-white">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Contact/Resources */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-8 py-16 border-t">
        <h3 className="text-2xl font-semibold">IR Contacts & Resources</h3>
        <ul className="mt-6 list-disc pl-5 space-y-2 text-neutral-700">
          <li>IR inbox (placeholder)</li>
          <li>Download center (placeholder)</li>
          <li>Corporate governance links (placeholder)</li>
        </ul>
      </section>
    </div>
  );
};

export default Investors;
