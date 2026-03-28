import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLazyIcon } from '@/lib/lucide-icons';
import { flattenNavLinks, NAVIGATION_ITEMS } from '@/modules/navigation/data/navigation';

const Search = createLazyIcon('Search');
const X = createLazyIcon('X');

const HeaderSearch: React.FC = () => {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const suggestions = useMemo(() => flattenNavLinks(NAVIGATION_ITEMS), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return suggestions.slice(0, 6);
    return suggestions.filter(
      (l) =>
        l.label.toLowerCase().includes(q) || l.href.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query, suggestions]);

  const submit = () => {
    const q = query.trim();
    if (!q) return;
    navigate(`/newsroom/stories?q=${encodeURIComponent(q)}`);
    setOpen(false);
    setQuery('');
  };

  return (
    <div ref={rootRef} className="relative flex shrink-0 items-center">
      <div
        id="navDesktopSearch"
        className={`nav--desktop--search_container ${open ? '' : 'closed'}`}
        aria-describedby="search-tip"
      >
        <label
          id="navDesktopSearchText"
          className="nav--desktop--search_container--text module-search_text sr-only"
          htmlFor={open ? 'header-search-input' : undefined}
        >
          Search query
        </label>
        <button
          id="navDesktopSearchBtn"
          type="button"
          aria-expanded={open}
          aria-controls="header-search-panel"
          aria-haspopup="true"
          aria-label={open ? 'Close search' : 'Click to open search'}
          onClick={() => setOpen((v) => !v)}
          className="nav--desktop--search_container--btn flex h-[56.9px] w-[52.8px] items-center justify-center rounded-full border-0 bg-transparent text-neutral-900 transition hover:bg-neutral-100/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
        >
          <span className="button_text inline-flex" aria-hidden>
            <React.Suspense fallback={<span className="h-[22px] w-[22px]" />}>
              {open ? <X className="h-[22px] w-[22px]" strokeWidth={1.75} /> : <Search className="h-[22px] w-[22px]" strokeWidth={1.75} />}
            </React.Suspense>
          </span>
        </button>

        {open && (
          <fieldset className="m-0 min-w-0 border-0 p-0">
            <legend className="sr-only">search</legend>
            <div
              id="header-search-panel"
              className="absolute right-0 top-full z-[10001] mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-lg border border-neutral-200 bg-white p-3 shadow-2"
              role="search"
            >
              <form
                id="navDesktopSearchForm"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
                className="flex gap-2"
              >
                <input
                  id="header-search-input"
                  name="SearchTerm"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  maxLength={256}
                  title="Search query"
                  className="nav--desktop--search_container--input min-w-0 flex-1 rounded-md border border-neutral-200 px-3 py-2 text-body text-neutral-900 placeholder:text-neutral-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30"
                  autoFocus
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-md bg-neutral-900 px-4 py-2 text-caption font-medium text-white hover:bg-neutral-800"
                >
                  Go
                </button>
              </form>
              {filtered.length > 0 && (
                <ul className="mt-3 max-h-48 overflow-y-auto border-t border-neutral-100 pt-2 text-caption">
                  {filtered.map((item) => (
                    <li key={`${item.href}-${item.label}`}>
                      <button
                        type="button"
                        className="w-full rounded px-2 py-1.5 text-left text-neutral-700 hover:bg-neutral-50"
                        onClick={() => {
                          navigate(item.href);
                          setOpen(false);
                          setQuery('');
                        }}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </fieldset>
        )}
      </div>
      <span
        id="search-tip"
        className="tooltip sr-only"
        role="tooltip"
        aria-hidden="true"
        aria-label="Search"
      >
        Search
      </span>
    </div>
  );
};

export default HeaderSearch;
