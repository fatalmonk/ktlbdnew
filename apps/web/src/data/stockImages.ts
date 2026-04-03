/**
 * Stock photography (Unsplash) — suitable for hero and news previews.
 * https://unsplash.com/license
 */
const q = "auto=format&fit=crop&q=80";

/** Full-width hero (~1920w) */
export const stockHero = {
  manufacturing: `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?${q}&w=1920`,
  fabric: `https://images.unsplash.com/photo-1582735689369-4fe89db7114c?${q}&w=1920`,
  logistics: `https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?${q}&w=1920`,
} as const;

/** News card thumbnails (~900w) */
export const stockNews = {
  factory: `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?${q}&w=900`,
  fabricDetail: `https://images.unsplash.com/photo-1582735689369-4fe89db7114c?${q}&w=900`,
  retail: `https://images.unsplash.com/photo-1441986300917-64674bd600d8?${q}&w=900`,
  warehouse: `https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?${q}&w=900`,
} as const;
