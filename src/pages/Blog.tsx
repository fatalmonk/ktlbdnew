import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import BlogCard from '../components/features/BlogCard';
import SEO from '../components/seo/SEO';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
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

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

interface BlogData {
  categories: Category[];
  posts: BlogPost[];
}

const Blog = () => {
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch('/data/blog/index.json');
        const data: BlogData = await response.json();
        setBlogData(data);
      } catch (error) {
        console.error('Error loading blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  const filteredPosts = blogData?.posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts?.filter((post) => post.featured).slice(0, 2);
  const regularPosts = filteredPosts?.filter((post) => !post.featured);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Company Stories | Kattali Textile Ltd"
        description="Insights, stories, and updates from Kattali Textile Ltd. Learn about our manufacturing processes, partnerships, and commitment to quality."
        canonical="/newsroom/stories"
        keywords={['textile blog', 'garment manufacturing blog', 'Bangladesh RMG', 'textile industry insights', 'company stories']}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
                Company Stories
              </h1>
              <p className="text-xl text-white/90">
                Insights, stories, and updates from Bangladesh's leading textile manufacturer
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="bg-white border-b sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-5 h-5 text-gray-500" />
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All
                </button>
                {blogData?.categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="container mx-auto px-4 py-12">
          {filteredPosts && filteredPosts.length > 0 ? (
            <div className="space-y-12">
              {/* Featured Posts */}
              {featuredPosts && featuredPosts.length > 0 && (
                <div>
                  <h2 className="font-heading font-bold text-2xl mb-6">Featured Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featuredPosts.map((post) => (
                      <BlogCard key={post.id} {...post} />
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Posts */}
              {regularPosts && regularPosts.length > 0 && (
                <div>
                  <h2 className="font-heading font-bold text-2xl mb-6">
                    {featuredPosts && featuredPosts.length > 0 ? 'More Articles' : 'Articles'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularPosts.map((post) => (
                      <BlogCard key={post.id} {...post} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Blog;
