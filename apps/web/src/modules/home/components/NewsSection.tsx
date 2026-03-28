import { Suspense } from 'react';
import { NewsSkeleton } from '../../../components/skeletons';

interface NewsItem {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  slug: string;
}

interface NewsSectionProps {
  newsItems: NewsItem[];
}

import BlogCard from '../../../components/features/BlogCard';

const NewsSection = ({ newsItems }: NewsSectionProps) => (
  <section className="py-24 bg-white" id="news">
    <div className="container mx-auto px-4">
      <div className="text-center mb-20">
        <h2 className="text-6xl font-bold text-neutral-900 mb-6">
          Latest <span className="text-primary-600">News</span>
        </h2>
        <p className="text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
          Stay updated with the latest developments, achievements, and stories from Kattali Textile Limited.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Suspense fallback={<NewsSkeleton />}>
          {newsItems.map((item, index) => (
            <BlogCard
              key={item.slug}
              slug={item.slug}
              title={item.title}
              excerpt={item.excerpt}
              publishedAt={item.date}
              readingTime={5} // Mock value
              category="Company News" // Mock value
              image={item.image}
              featured={index === 0}
            />
          ))}
        </Suspense>
      </div>
    </div>
  </section>
);

export default NewsSection;
