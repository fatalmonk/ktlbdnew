/** Strip `KTL … — ` prefix from portfolio alt text (quick-view caption). */
export function stripPortfolioAltPrefix(alt: string): string {
  return alt.replace(/^KTL .+? —\s*/u, "").trim();
}
