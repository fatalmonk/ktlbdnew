import React from 'react';
import { Link } from 'react-router-dom';
import {
  NAVIGATION_ITEMS,
  type NavDropdownItem,
  type NavItem,
} from '@/modules/navigation/data/navigation';

function isDropdown(item: NavItem): item is NavDropdownItem {
  return item.type === 'dropdown';
}

/**
 * Visually hidden hierarchical nav (Macy’s-style “Web Menu”) for assistive tech —
 * mirrors primary routes without affecting layout.
 */
const WebMenuHidden: React.FC = () => {
  return (
    <nav aria-label="Web Menu" className="nav-data sr-only">
      <ul className="level1">
        <li className="has-children home">
          <Link to="/" aria-label="Home">
            Home
          </Link>
          <ul className="level2">
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.name} className={isDropdown(item) ? 'has-children' : undefined}>
                {isDropdown(item) ? (
                  <>
                    <Link to={item.href} aria-label={`${item.name} within the site section`}>
                      {item.name}
                    </Link>
                    <ul className="level3">
                      {item.columns.map((col) => (
                        <li key={col.title ?? col.links[0]?.href}>
                          {col.title ? <span>{col.title}</span> : null}
                          <ul className="level4">
                            {col.links.map((link) => (
                              <li key={`${link.href}-${link.label}`}>
                                {link.external ? (
                                  <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={`${link.label} within the ${item.name} section`}
                                  >
                                    {link.label}
                                  </a>
                                ) : (
                                  <Link
                                    to={link.href}
                                    aria-label={`${link.label} within the ${item.name} section`}
                                  >
                                    {link.label}
                                  </Link>
                                )}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link to={item.href} aria-label={`${item.name} within the site section`}>
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default WebMenuHidden;
