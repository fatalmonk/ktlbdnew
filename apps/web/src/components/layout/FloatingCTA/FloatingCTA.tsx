import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { createLazyIcon } from '@/lib/lucide-icons';

const MessageCircle = createLazyIcon('MessageCircle');

const FloatingCTA = () => {
  return (
    <Link
      to="/contact"
      className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-accent transition-colors duration-200 z-40 group"
    >
      <Suspense fallback={<div className="w-6 h-6" />}>
        <MessageCircle className="w-6 h-6" />
      </Suspense>
      <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-neutral-900 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Get a Quote
      </span>
    </Link>
  );
};

export default FloatingCTA;
