import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

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
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className={`group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ${featured ? 'border-2 border-primary-500' : ''}`}>
      {/* Image */}
      <Link to={`/newsroom/stories/${slug}`} className="block relative overflow-hidden">
        <div className="aspect-[16/9] bg-gray-200 relative">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
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
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="inline-flex items-center gap-1 text-primary-600 font-semibold capitalize">
            {category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {readingTime} min read
          </span>
        </div>

        {/* Title */}
        <Link to={`/newsroom/stories/${slug}`}>
          <h3 className="font-heading font-bold text-xl text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* Read More Link */}
        <Link
          to={`/newsroom/stories/${slug}`}
          className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors duration-200 group/link"
        >
          Read More
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
