import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export type SubpageBreadcrumbItem = {
  label: string;
  to?: string;
};

export type SubpageHeaderProps = {
  breadcrumbItems: SubpageBreadcrumbItem[];
  /** Used for a single screen-reader `h1` only; no large visible title (breadcrumbs carry the label). */
  pageTitle: string;
  className?: string;
  /** When false, parent must apply header offset (e.g. `header-spacing`) */
  withHeaderOffset?: boolean;
};

/**
 * Shared top-of-page header: breadcrumb trail + visually hidden `h1` for accessibility.
 */
export function SubpageHeaderAccent({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute right-4 top-1/2 z-0 hidden -translate-y-1/2 lg:block xl:right-8',
        className,
      )}
      aria-hidden
    >
      <svg width="200" height="72" viewBox="0 0 200 72" fill="none" className="text-primary-300">
        <path
          d="M10 36 Q30 16 50 36 T90 36 T130 36 T170 36"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M10 46 Q30 26 50 46 T90 46 T130 46 T170 46"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M10 56 Q30 36 50 56 T90 56 T130 56 T170 56"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}

/** Drop leading "Home" so breadcrumbs read as section / subpage only (no site root in the trail). */
function withoutLeadingHome(items: SubpageBreadcrumbItem[]): SubpageBreadcrumbItem[] {
  if (items.length === 0) return items;
  const [first, ...rest] = items;
  if (first.label === 'Home' && first.to === '/') {
    return rest;
  }
  return items;
}

export function SubpageHeader({
  breadcrumbItems,
  pageTitle,
  className,
  withHeaderOffset = true,
}: SubpageHeaderProps) {
  const crumbs = withoutLeadingHome(breadcrumbItems);

  return (
    <header
      className={cn(
        'relative bg-white font-body',
        withHeaderOffset &&
          'pt-[var(--site-header-height-mobile)] lg:pt-[var(--site-header-height-desktop)]',
        className,
      )}
    >
      {pageTitle ? <h1 className="sr-only">{pageTitle}</h1> : null}
      {crumbs.length > 0 && (
        <nav
          className="relative z-[1] border-b border-transparent px-4 pt-20 pb-6 sm:px-6 sm:pt-24 sm:pb-8 md:pt-28 md:pb-8 lg:px-8 lg:pt-32 lg:pb-10 xl:pt-40 xl:pb-12"
          aria-label="Breadcrumb"
        >
          <ol className="mx-auto flex max-w-ktl flex-wrap items-center gap-x-2 gap-y-1 text-body-lg text-neutral-600">
            {crumbs.map((item, i) => {
              const isLast = i === crumbs.length - 1;
              return (
                <li key={`${item.label}-${i}`} className="flex items-center gap-x-2">
                  {i > 0 && <span className="text-neutral-400">/</span>}
                  {isLast ? (
                    <span className="font-semibold text-neutral-900">{item.label}</span>
                  ) : item.to ? (
                    <Link to={item.to} className="hover:text-neutral-900">
                      {item.label}
                    </Link>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </header>
  );
}

export default SubpageHeader;
