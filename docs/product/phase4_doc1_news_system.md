# Phase 4.1: News System Foundation

## Overview
Set up the core news system with type definitions, data structures, and API integration for dynamic news content.

---

## 4.1.1 Type Definitions

**Create news types:**
```typescript
// types/news.ts
export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: NewsCategory;
  author: Author;
  publishedAt: Date;
  updatedAt?: Date;
  featuredImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  tags: string[];
  readTime: number; // in minutes
  views?: number;
  likes?: number;
  slug: string;
  featured?: boolean;
  status: 'draft' | 'published' | 'archived';
}

export type NewsCategory = 
  | 'product-launch'
  | 'company-news'
  | 'technology'
  | 'industry'
  | 'events'
  | 'research';

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  bio?: string;
}

export interface NewsFilter {
  category?: NewsCategory;
  tag?: string;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
  featured?: boolean;
  limit?: number;
  offset?: number;
}

export interface NewsPagination {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface NewsResponse {
  articles: NewsArticle[];
  pagination: NewsPagination;
}
```

---

## 4.1.2 Mock Data Structure

**Create sample news data:**
```typescript
// data/news-mock.ts
import { NewsArticle } from '@/types/news';

export const mockNewsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Introducing KTL Vision Pro: Next-Generation Quality Control',
    excerpt: 'Revolutionary AI-powered inspection system achieves 99.9% accuracy in real-time quality assessment.',
    content: `
      We're excited to announce the launch of KTL Vision Pro, our latest breakthrough 
      in automated quality control technology. This advanced system combines artificial 
      intelligence with precision optics to deliver unprecedented accuracy...
    `,
    category: 'product-launch',
    author: {
      id: 'auth-1',
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah.jpg',
      role: 'Product Manager',
    },
    publishedAt: new Date('2025-10-15'),
    featuredImage: {
      url: '/news/vision-pro.jpg',
      alt: 'KTL Vision Pro system in action',
      width: 1200,
      height: 630,
    },
    tags: ['AI', 'Quality Control', 'Innovation', 'Product Launch'],
    readTime: 5,
    views: 1245,
    likes: 89,
    slug: 'introducing-ktl-vision-pro',
    featured: true,
    status: 'published',
  },
  {
    id: '2',
    title: 'KTL Expands Global Operations with New European Facility',
    excerpt: 'State-of-the-art manufacturing center opens in Frankfurt, supporting growing demand across Europe.',
    content: `
      Today marks a significant milestone in KTL's global expansion strategy. 
      Our new 50,000 square foot facility in Frankfurt represents a $25 million 
      investment in European operations...
    `,
    category: 'company-news',
    author: {
      id: 'auth-2',
      name: 'Michael Chen',
      avatar: '/avatars/michael.jpg',
      role: 'CEO',
    },
    publishedAt: new Date('2025-10-10'),
    featuredImage: {
      url: '/news/facility.jpg',
      alt: 'New Frankfurt facility exterior',
      width: 1200,
      height: 630,
    },
    tags: ['Expansion', 'Europe', 'Manufacturing'],
    readTime: 4,
    views: 892,
    likes: 67,
    slug: 'ktl-expands-european-operations',
    featured: true,
    status: 'published',
  },
  {
    id: '3',
    title: 'Breakthrough in Kosher Certification Technology',
    excerpt: 'New blockchain-based system ensures complete transparency in kosher certification process.',
    content: `
      KTL announces a groundbreaking advancement in kosher certification technology. 
      Our new blockchain-based tracking system provides unprecedented transparency 
      and security throughout the certification process...
    `,
    category: 'technology',
    author: {
      id: 'auth-3',
      name: 'Rabbi David Goldstein',
      avatar: '/avatars/david.jpg',
      role: 'Chief Compliance Officer',
    },
    publishedAt: new Date('2025-10-05'),
    featuredImage: {
      url: '/news/blockchain.jpg',
      alt: 'Blockchain technology visualization',
      width: 1200,
      height: 630,
    },
    tags: ['Blockchain', 'Certification', 'Technology', 'Innovation'],
    readTime: 6,
    views: 1567,
    likes: 134,
    slug: 'breakthrough-kosher-certification-technology',
    featured: false,
    status: 'published',
  },
  {
    id: '4',
    title: 'Industry Report: Kosher Food Market Growth Trends 2025',
    excerpt: 'Comprehensive analysis reveals 15% year-over-year growth in global kosher food market.',
    content: `
      Our latest industry research reveals significant growth trends in the global 
      kosher food market. With a 15% increase in demand year-over-year, the market 
      is projected to reach $24 billion by 2026...
    `,
    category: 'research',
    author: {
      id: 'auth-4',
      name: 'Dr. Emily Roberts',
      avatar: '/avatars/emily.jpg',
      role: 'Research Director',
    },
    publishedAt: new Date('2025-09-28'),
    featuredImage: {
      url: '/news/market-trends.jpg',
      alt: 'Market growth chart',
      width: 1200,
      height: 630,
    },
    tags: ['Market Research', 'Industry Trends', 'Analysis'],
    readTime: 8,
    views: 2341,
    likes: 198,
    slug: 'kosher-food-market-growth-trends-2025',
    featured: false,
    status: 'published',
  },
];

export const newsCategories = [
  { value: 'product-launch', label: 'Product Launches', color: '#3B82F6' },
  { value: 'company-news', label: 'Company News', color: '#10B981' },
  { value: 'technology', label: 'Technology', color: '#8B5CF6' },
  { value: 'industry', label: 'Industry News', color: '#F59E0B' },
  { value: 'events', label: 'Events', color: '#EF4444' },
  { value: 'research', label: 'Research', color: '#06B6D4' },
] as const;
```

---

## 4.1.3 API Service Layer

**Create news service:**
```typescript
// lib/services/news.service.ts
import { NewsArticle, NewsFilter, NewsResponse } from '@/types/news';
import { mockNewsArticles } from '@/data/news-mock';

class NewsService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

  /**
   * Fetch news articles with optional filters
   */
  async getArticles(filter?: NewsFilter): Promise<NewsResponse> {
    try {
      // In production, replace with actual API call
      // const response = await fetch(`${this.baseUrl}/news?${params}`);
      // return response.json();

      // Mock implementation
      let filtered = [...mockNewsArticles];

      // Apply filters
      if (filter?.category) {
        filtered = filtered.filter(article => article.category === filter.category);
      }

      if (filter?.tag) {
        filtered = filtered.filter(article => 
          article.tags.some(tag => tag.toLowerCase().includes(filter.tag!.toLowerCase()))
        );
      }

      if (filter?.search) {
        const searchLower = filter.search.toLowerCase();
        filtered = filtered.filter(article =>
          article.title.toLowerCase().includes(searchLower) ||
          article.excerpt.toLowerCase().includes(searchLower)
        );
      }

      if (filter?.featured !== undefined) {
        filtered = filtered.filter(article => article.featured === filter.featured);
      }

      if (filter?.dateFrom) {
        filtered = filtered.filter(
          article => new Date(article.publishedAt) >= filter.dateFrom!
        );
      }

      if (filter?.dateTo) {
        filtered = filtered.filter(
          article => new Date(article.publishedAt) <= filter.dateTo!
        );
      }

      // Sort by date (newest first)
      filtered.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

      // Apply pagination
      const page = filter?.offset ? Math.floor(filter.offset / (filter.limit || 10)) + 1 : 1;
      const pageSize = filter?.limit || 10;
      const offset = filter?.offset || 0;
      const total = filtered.length;
      const totalPages = Math.ceil(total / pageSize);

      const paginated = filtered.slice(offset, offset + pageSize);

      return {
        articles: paginated,
        pagination: {
          total,
          page,
          pageSize,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      console.error('Error fetching news articles:', error);
      throw new Error('Failed to fetch news articles');
    }
  }

  /**
   * Get single article by slug
   */
  async getArticleBySlug(slug: string): Promise<NewsArticle | null> {
    try {
      // In production, replace with actual API call
      // const response = await fetch(`${this.baseUrl}/news/${slug}`);
      // return response.json();

      // Mock implementation
      const article = mockNewsArticles.find(a => a.slug === slug);
      return article || null;
    } catch (error) {
      console.error('Error fetching article:', error);
      return null;
    }
  }

  /**
   * Get featured articles
   */
  async getFeaturedArticles(limit: number = 3): Promise<NewsArticle[]> {
    const response = await this.getArticles({ featured: true, limit });
    return response.articles;
  }

  /**
   * Get related articles based on tags
   */
  async getRelatedArticles(
    articleId: string,
    limit: number = 3
  ): Promise<NewsArticle[]> {
    try {
      const currentArticle = mockNewsArticles.find(a => a.id === articleId);
      if (!currentArticle) return [];

      // Find articles with matching tags
      const related = mockNewsArticles
        .filter(article => 
          article.id !== articleId &&
          article.tags.some(tag => currentArticle.tags.includes(tag))
        )
        .slice(0, limit);

      return related;
    } catch (error) {
      console.error('Error fetching related articles:', error);
      return [];
    }
  }

  /**
   * Increment article views
   */
  async incrementViews(articleId: string): Promise<void> {
    try {
      // In production, make API call
      // await fetch(`${this.baseUrl}/news/${articleId}/view`, { method: 'POST' });
      
      // Mock implementation
      const article = mockNewsArticles.find(a => a.id === articleId);
      if (article && article.views !== undefined) {
        article.views++;
      }
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  }

  /**
   * Like/unlike article
   */
  async toggleLike(articleId: string): Promise<number> {
    try {
      // In production, make API call
      // const response = await fetch(`${this.baseUrl}/news/${articleId}/like`, { 
      //   method: 'POST' 
      // });
      // return response.json();

      // Mock implementation
      const article = mockNewsArticles.find(a => a.id === articleId);
      if (article && article.likes !== undefined) {
        article.likes++;
        return article.likes;
      }
      return 0;
    } catch (error) {
      console.error('Error toggling like:', error);
      return 0;
    }
  }
}

export const newsService = new NewsService();
```

---

## 4.1.4 React Hooks for News

**Create custom hooks:**
```typescript
// lib/hooks/useNews.ts
'use client';

import { useState, useEffect } from 'react';
import { NewsArticle, NewsFilter, NewsResponse } from '@/types/news';
import { newsService } from '@/lib/services/news.service';

export function useNews(filter?: NewsFilter) {
  const [data, setData] = useState<NewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchNews() {
      try {
        setLoading(true);
        setError(null);
        const response = await newsService.getArticles(filter);
        if (mounted) {
          setData(response);
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchNews();

    return () => {
      mounted = false;
    };
  }, [JSON.stringify(filter)]);

  return { data, loading, error };
}

export function useArticle(slug: string) {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchArticle() {
      try {
        setLoading(true);
        setError(null);
        const data = await newsService.getArticleBySlug(slug);
        if (mounted) {
          setArticle(data);
          if (data) {
            // Increment view count
            await newsService.incrementViews(data.id);
          }
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchArticle();

    return () => {
      mounted = false;
    };
  }, [slug]);

  return { article, loading, error };
}

export function useFeaturedArticles(limit: number = 3) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchFeatured() {
      try {
        const data = await newsService.getFeaturedArticles(limit);
        if (mounted) {
          setArticles(data);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchFeatured();

    return () => {
      mounted = false;
    };
  }, [limit]);

  return { articles, loading };
}
```

---

## 4.1.5 Utility Functions

**Create helper utilities:**
```typescript
// lib/utils/news.utils.ts
import { NewsArticle } from '@/types/news';

/**
 * Format date for display
 */
export function formatNewsDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Calculate reading time
 */
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Get category color
 */
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'product-launch': '#3B82F6',
    'company-news': '#10B981',
    'technology': '#8B5CF6',
    'industry': '#F59E0B',
    'events': '#EF4444',
    'research': '#06B6D4',
  };
  return colors[category] || '#6B7280';
}

/**
 * Format number with K/M suffixes
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Extract first paragraph from content
 */
export function extractFirstParagraph(content: string): string {
  const paragraphs = content.trim().split('\n\n');
  return paragraphs[0] || '';
}

/**
 * Generate article URL
 */
export function getArticleUrl(article: NewsArticle): string {
  return `/news/${article.slug}`;
}

/**
 * Check if article is new (published within last 7 days)
 */
export function isNewArticle(publishedAt: Date | string): boolean {
  const date = typeof publishedAt === 'string' ? new Date(publishedAt) : publishedAt;
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return days <= 7;
}
```

---

## 4.1.6 Testing Setup

**Create test utilities:**
```typescript
// __tests__/utils/news.test.ts
import { describe, it, expect } from '@jest/globals';
import {
  formatNewsDate,
  calculateReadTime,
  truncateText,
  formatNumber,
  isNewArticle,
} from '@/lib/utils/news.utils';

describe('News Utilities', () => {
  describe('formatNewsDate', () => {
    it('should return "Today" for today\'s date', () => {
      const today = new Date();
      expect(formatNewsDate(today)).toBe('Today');
    });

    it('should return "Yesterday" for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(formatNewsDate(yesterday)).toBe('Yesterday');
    });

    it('should return days ago for recent dates', () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      expect(formatNewsDate(threeDaysAgo)).toBe('3 days ago');
    });
  });

  describe('calculateReadTime', () => {
    it('should calculate correct read time', () => {
      const text = 'word '.repeat(400); // 400 words
      expect(calculateReadTime(text)).toBe(2); // 2 minutes at 200 wpm
    });
  });

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const text = 'This is a very long text that needs to be truncated';
      expect(truncateText(text, 20)).toBe('This is a very long...');
    });

    it('should not truncate short text', () => {
      const text = 'Short text';
      expect(truncateText(text, 20)).toBe('Short text');
    });
  });

  describe('formatNumber', () => {
    it('should format thousands with K', () => {
      expect(formatNumber(1500)).toBe('1.5K');
    });

    it('should format millions with M', () => {
      expect(formatNumber(1500000)).toBe('1.5M');
    });

    it('should not format small numbers', () => {
      expect(formatNumber(500)).toBe('500');
    });
  });

  describe('isNewArticle', () => {
    it('should return true for recent articles', () => {
      const recent = new Date();
      recent.setDate(recent.getDate() - 3);
      expect(isNewArticle(recent)).toBe(true);
    });

    it('should return false for old articles', () => {
      const old = new Date();
      old.setDate(old.getDate() - 30);
      expect(isNewArticle(old)).toBe(false);
    });
  });
});
```

---

## ✅ Phase 4.1 Checklist

- [ ] Type definitions created
- [ ] Mock data structured
- [ ] API service layer implemented
- [ ] Custom hooks created
- [ ] Utility functions added
- [ ] Tests written
- [ ] Documentation complete

---

## 🎯 Next Steps

Move to **Phase 4.2: News Card Components** to create the UI components for displaying news articles.

**Estimated Time**: 2-3 hours