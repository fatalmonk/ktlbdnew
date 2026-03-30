import { Link } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import type { HomeNewsItem } from '../../../data/home/newsItems';

interface NewsSectionProps {
  newsItems: HomeNewsItem[];
}

function formatNewsDate(dateString: string): string {
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const cellBorder = (index: number) =>
  cn(
    'border-neutral-200',
    index < 3 && 'border-b',
    index % 2 === 0 && 'md:border-r',
    index < 2 && 'md:border-b',
  );

const NewsSection = ({ newsItems }: NewsSectionProps) => {
  const items = newsItems.slice(0, 4);
  if (items.length === 0) return null;

  return (
    <section className="bg-neutral-50 py-20 md:py-28 lg:py-32" id="news">
      <div className="mx-auto w-full max-w-[1920px] px-4 md:px-6 lg:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-neutral-300 pb-5 md:pb-8">
          <h2 className="font-heading text-6xl font-normal text-neutral-900 md:text-7xl lg:text-8xl">
            In The News
          </h2>
          <Link
            to="/newsroom/stories"
            className="shrink-0 text-xl font-medium text-neutral-900 underline underline-offset-[3px] md:text-2xl"
          >
            View All
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 border border-neutral-200 bg-white md:grid-cols-2 md:mt-10">
          {items.map((item, index) => (
            <article
              key={item.slug}
              className={cn(
                'min-h-0 p-0 sm:min-h-[220px]',
                cellBorder(index),
              )}
            >
              <Link
                to={`/newsroom/stories/${item.slug}`}
                className="group flex h-full flex-col gap-4 p-6 transition-colors hover:bg-neutral-50/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-500 sm:flex-row sm:items-stretch sm:gap-6 sm:p-8 md:p-10"
              >
                <div className="relative shrink-0 overflow-hidden bg-neutral-100 sm:w-[min(48%,280px)] sm:max-w-[280px] md:w-[min(44%,300px)]">
                  <div className="aspect-[5/3] w-full sm:aspect-auto sm:h-full sm:min-h-[192px] md:min-h-[220px]">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                      decoding="async"
                      width={520}
                      height={312}
                    />
                  </div>
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block rounded border border-neutral-300 bg-white px-3 py-1.5 text-lg font-medium text-neutral-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-3 font-heading text-3xl font-normal leading-snug text-neutral-900 group-hover:text-primary-600 md:text-4xl lg:text-5xl">
                    <span className="line-clamp-4">{item.title}</span>
                  </h3>
                  <p className="mt-auto text-lg text-neutral-500 md:text-xl">
                    {formatNewsDate(item.date)}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
