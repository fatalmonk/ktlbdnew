import { Link } from "react-router-dom";
import { Suspense } from "react";
import { createLazyIcon } from "@/lib/lucide-icons";

const Calendar = createLazyIcon("Calendar");
const Clock = createLazyIcon("Clock");
const ArrowRight = createLazyIcon("ArrowRight");

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: number;
  category: string;
  image?: string;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({
  slug,
  title,
  excerpt,
  publishedAt,
  readingTime,
  category,
  image,
  featured = false,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article
      className={`group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ${featured ? "border-2 border-primary-500" : ""}`}
    >
      {/* Image */}
      <Link
        to={`/newsroom/stories/${slug}`}
        className="block relative overflow-hidden"
      >
        <div className="aspect-[16/9] bg-neutral-200 relative">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              width={800}
              height={450}
              decoding="async"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-500">
              <span className="text-white text-4xl font-bold">KTL</span>
            </div>
          )}
          {featured && (
            <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Category & Meta */}
        <div className="flex items-center gap-6 text-lg text-neutral-500 mb-4">
          <span className="inline-flex items-center gap-2 text-primary-600 font-bold capitalize">
            {category}
          </span>
          <span className="flex items-center gap-2">
            <Suspense fallback={<div className="w-4 h-4" />}>
              <Calendar className="w-4 h-4" />
            </Suspense>
            {formatDate(publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Suspense fallback={<div className="w-4 h-4" />}>
              <Clock className="w-4 h-4" />
            </Suspense>
            {readingTime} min read
          </span>
        </div>

        {/* Title */}
        <Link to={`/newsroom/stories/${slug}`}>
          <h3 className="font-heading font-bold text-3xl text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2 leading-tight">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-neutral-600 text-xl mb-6 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>

        {/* Read More Link */}
        <Link
          to={`/newsroom/stories/${slug}`}
          className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors duration-200 group/link"
        >
          Read More
          <Suspense fallback={<div className="w-4 h-4" />}>
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
          </Suspense>
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
