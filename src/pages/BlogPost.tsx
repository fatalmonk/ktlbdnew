import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Linkedin, Twitter } from 'lucide-react';
import SEO from '../components/seo/SEO';
import BlogCard from '../components/features/BlogCard';

interface BlogPostMeta {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  category: string;
  tags: string[];
  featured: boolean;
  image?: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

interface BlogData {
  categories: Array<{ id: string; name: string; slug: string; description: string }>;
  posts: BlogPostMeta[];
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [postMeta, setPostMeta] = useState<BlogPostMeta | null>(null);
  const [content, setContent] = useState<string>('');
  const [relatedPosts, setRelatedPosts] = useState<BlogPostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch blog index to get post metadata
        const indexResponse = await fetch('/data/blog/index.json');
        const blogData: BlogData = await indexResponse.json();

        // Find the post metadata
        const post = blogData.posts.find((p) => p.slug === slug);
        if (!post) {
          setError('Blog post not found');
          setLoading(false);
          return;
        }

        setPostMeta(post);

        // Fetch the full content
        const contentResponse = await fetch(`/data/blog/${slug}-full.md`);
        const contentText = await contentResponse.text();
        setContent(contentText);

        // Get related posts (same category, exclude current)
        const related = blogData.posts
          .filter((p) => p.category === post.category && p.slug !== slug)
          .slice(0, 3);
        setRelatedPosts(related);
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = postMeta?.title || '';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !postMeta) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Story Not Found</h1>
          <p className="text-gray-600 mb-8">The story you're looking for doesn't exist.</p>
          <Link to="/newsroom/stories" className="text-primary-600 hover:text-primary-700 font-semibold">
            ← Back to Company Stories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={postMeta.seo.metaTitle}
        description={postMeta.seo.metaDescription}
        canonical={`/newsroom/stories/${slug}`}
        keywords={postMeta.seo.keywords}
        ogType="article"
        image={postMeta.image}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <article className="relative">
          {/* Featured Image */}
          {postMeta.image && (
            <div className="w-full h-[400px] bg-gray-200 relative">
              <img
                src={postMeta.image}
                alt={postMeta.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          )}

          {/* Content Container */}
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Back Link */}
              <Link
                to="/newsroom/stories"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-8 mt-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Company Stories
              </Link>

              {/* Article Header */}
              <header className={postMeta.image ? '-mt-32 relative z-10 mb-8' : 'mb-8'}>
                <div className={postMeta.image ? 'bg-white p-8 rounded-lg shadow-xl' : ''}>
                  {/* Category */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-block px-3 py-1 bg-primary-500 text-white text-sm font-semibold rounded-full capitalize">
                      {postMeta.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6">
                    {postMeta.title}
                  </h1>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(postMeta.publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{postMeta.readingTime} min read</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">By {postMeta.author.name}</span>
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div className="flex items-center gap-3 mt-6 pt-6 border-t">
                    <span className="text-gray-600 text-sm font-semibold flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share:
                    </span>
                    <a
                      href={shareLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href={shareLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 hover:bg-blue-400 hover:text-white transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href={shareLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 hover:bg-blue-700 hover:text-white transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none mb-12">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {content}
                </div>
              </div>

              {/* Tags */}
              {postMeta.tags && postMeta.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b">
                  <span className="text-gray-600 font-semibold">Tags:</span>
                  {postMeta.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="font-heading font-bold text-3xl mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedPosts.map((post) => (
                    <BlogCard key={post.id} {...post} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading font-bold text-3xl mb-4">
              Ready to Partner with Us?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Let's discuss how Kattali Textile Ltd can meet your manufacturing needs
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us Today
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPost;
