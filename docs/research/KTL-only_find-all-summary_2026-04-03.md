# KTL-only summary — Find All results (2026-04-03T06-53-36)

Source: `Find_All_high-quality_conversion-focused_website_results_2026-04-03T06-53-36.csv`

Rows included: **`url` host is `ktlbd.com`** (homepage + sustainability page). LinkedIn, BGMEA, and other domains are excluded.

## Update (post-fix)

**Compliance highlight:** The homepage now includes an explicit **Compliance highlights** section (body copy + meta description + Organization `knowsAbout`) naming **Sedex, OEKO-TEX Standard 100, BSCI, WRAP, GOTS, and ISO 9001:2015**, with a link to `/certifications`. Data lives in `apps/web/src/data/home/compliance-highlights.ts`. Re-run any external “compliance highlight” audit against the current deploy to refresh scores.

---

| Page (title)                  | URL                                      | compliance (historical CSV)          | conversion | export (USA/EU/CA named)             | garment/RMG | ktlbd.com / “platform”          | no generic AI wording | professional tone | sourcing intelligence platform | trustworthy |
| ----------------------------- | ---------------------------------------- | ------------------------------------ | ---------- | ------------------------------------ | ----------- | ------------------------------- | --------------------- | ----------------- | ------------------------------ | ----------- |
| Kattali Textile Limited (KTL) | https://ktlbd.com/                       | Was “No” — only Sedex in crawl       | Yes        | No — NA for USA, EU, Canada in crawl | Yes         | Yes — B2B framing               | Yes                   | Yes               | No                             | Yes         |
| Sustainability page           | https://ktlbd.com/company/sustainability | Was “No” — Sedex + OEKO-TEX in basis | Yes        | No — NA per region                   | Yes         | No — manufacturer, not platform | Yes                   | Yes               | No                             | Yes         |

## Short column values (verbatim-style, from CSV)

### https://ktlbd.com/

| Field                                                | Value (export snapshot)                                              |
| ---------------------------------------------------- | -------------------------------------------------------------------- |
| compliance_highlight_check                           | Was `No. ["Sedex"]` — rubric wanted multiple named standards on page |
| conversion_focused_check                             | Yes — partner / contact sourcing CTA                                 |
| export_capability_check                              | No — global delivery; no explicit USA, EU, Canada in cited excerpts  |
| garment_rmg_specific_check                           | Yes — woven & knit garments                                          |
| ktlbd_com_check                                      | Yes — B2B supplier / “sourcing platform” (loose)                     |
| sourcing_intelligence_platform_check                 | No — not “verified sourcing intelligence platform”                   |
| button_labels / filter_labels / tooltip_explanations | skipped                                                              |

**Note:** The row’s long **description** in the CSV mentioned USA, EU, Canada and extra certs (Nirapon, Better Work, Walmart Green); automated checks did not match all of those to homepage excerpts. Homepage **logos** already included Nirapon, Better Work, Sedex, etc.; named **text** highlights are now added for the programs listed in `compliance-highlights.ts`.

### https://ktlbd.com/company/sustainability

| Field                                                | Value                                                     |
| ---------------------------------------------------- | --------------------------------------------------------- |
| compliance_highlight_check                           | Was No — basis listed Sedex (page) + OEKO-TEX on products |
| conversion_focused_check                             | Yes — CTAs / buyer language                               |
| export_capability_check                              | No — global only; no per-region names                     |
| garment_rmg_specific_check                           | Yes                                                       |
| ktlbd_com_check                                      | No — manufacturer/exporter, not marketplace/platform      |
| sourcing_intelligence_platform_check                 | No                                                        |
| button_labels / filter_labels / tooltip_explanations | skipped                                                   |

## How to use this

- Use this file for **on-domain** scoring only; the full CSV still mixes **LinkedIn rows** evaluated against **ktlbd.com** citations (not valid for those LinkedIn entities).
- Align marketing claims with **what each URL actually states** before publishing.
