import 'react';

/** React 18 warns on `fetchPriority`; HTML uses lowercase `fetchpriority`. */
declare module 'react' {
  interface ImgHTMLAttributes {
    fetchpriority?: 'high' | 'low' | 'auto';
  }
}
