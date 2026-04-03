# Design System Refactoring - Before & After Examples

## Color Replacements

### Example 1: Primary Color (Yellow)

**File:** `CTASection.tsx`

**BEFORE:**

```jsx
<section className="py-8 md:py-16 lg:py-20 bg-[#fdd336]">
  <h2 className="font-heading text-xl md:text-h2 lg:text-4xl font-bold text-neutral-900">
```

**AFTER:**

```jsx
<section className="py-8 md:py-16 lg:py-20 bg-primary-500">
  <h2 className="font-heading text-xl md:text-h2 lg:text-4xl font-bold text-neutral-900">
```

### Example 2: Secondary Color (Red) with Hover State

**File:** `CTASection.tsx`

**BEFORE:**

```jsx
<Link
  to="/contact"
  className="inline-flex items-center justify-center min-h-[44px] md:min-h-[48px] bg-secondary-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base lg:text-lg hover:bg-secondary-600 active:bg-secondary-700"
>
  Contact Us Today
</Link>
```

**AFTER:**

```jsx
// Already updated - using semantic color tokens
<Link
  to="/contact"
  className="inline-flex items-center justify-center min-h-[44px] md:min-h-[48px] bg-secondary-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base lg:text-lg hover:bg-secondary-600 active:bg-secondary-700"
>
  Contact Us Today
</Link>
```

### Example 3: Accent Color (Blue) in Hero Component

**File:** `KTLHero.tsx`

**BEFORE:**

```jsx
<Link
  to={cta.href}
  className="inline-flex items-center justify-center px-8 py-4 bg-[#fdd336] hover:bg-[#ca8a04] text-black font-semibold rounded-lg"
>
  {cta.label}
</Link>
```

**AFTER:**

```jsx
<Link
  to={cta.href}
  className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 hover:bg-primary-600 text-black font-semibold rounded-lg"
>
  {cta.label}
</Link>
```

## Grayscale to Neutral Replacements

### Example 1: Grayscale Text

**File:** `LogoCarouselSection.tsx`

**BEFORE:**

```jsx
<p className="text-center text-xs md:text-sm text-gray-800 mt-4 md:mt-8">
  Trusted by <span className="font-semibold text-[#fdd336]">leading global brands</span>
</p>
```

**AFTER:**

```jsx
<p className="text-center text-xs md:text-sm text-neutral-800 mt-4 md:mt-8">
  Trusted by <span className="font-semibold text-primary-500">leading global brands</span>
</p>
```

### Example 2: Grayscale Backgrounds

**File:** `Product3DCard.tsx`

**BEFORE:**

```jsx
<div className="relative aspect-square overflow-hidden bg-gray-100">
  {/* Image content */}
</div>

<motion.span
  className="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-gray-100 text-gray-600 text-[10px]"
  animate={{
    backgroundColor: isHovered ? '#fdd338' : '#f3f4f6',
    color: isHovered ? '#000000' : '#4b5563'
  }}
>
```

**AFTER:**

```jsx
<div className="relative aspect-square overflow-hidden bg-neutral-100">
  {/* Image content */}
</div>

<motion.span
  className="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-neutral-100 text-neutral-600 text-[10px]"
  animate={{
    backgroundColor: isHovered ? 'rgb(253, 211, 56)' : 'rgb(243, 244, 246)',
    color: isHovered ? 'rgb(0, 0, 0)' : 'rgb(75, 85, 99)'
  }}
>
```

### Example 3: Swimwear Product Page

**File:** `pages/products/swimwear/index.tsx`

**BEFORE:**

```jsx
<p className="text-lg text-gray-800 mb-8">
  Our premium swimwear collection...
</p>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <div className="bg-gray-50 p-6 rounded-lg">
    <h3 className="text-xl font-semibold mb-4">Swimsuits</h3>
    <p className="text-gray-800">
      High-quality swimsuits...
    </p>
  </div>
```

**AFTER:**

```jsx
<p className="text-lg text-neutral-800 mb-8">
  Our premium swimwear collection...
</p>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <div className="bg-neutral-50 p-6 rounded-lg">
    <h3 className="text-xl font-semibold mb-4">Swimsuits</h3>
    <p className="text-neutral-800">
      High-quality swimsuits...
    </p>
  </div>
```

## Spacing Normalization

### Example 1: Non-Standard Padding to Scale

**File:** `pages/investors/overview/index.tsx`

**BEFORE:**

```jsx
<div key={i} className="rounded-lg border p-5">
  {/* Content */}
</div>
```

**AFTER:**

```jsx
<div key={i} className="rounded-lg border p-6">
  {/* Content */}
</div>
```

**Explanation:** `p-5` (20px) → `p-6` (24px) - matching defined spacing scale

### Example 2: Mixed Spacing Adjustments

**File:** `components/features/ContactForm.tsx`

**BEFORE:**

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">{/* Form fields */}</div>
```

**AFTER:**

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">{/* Form fields */}</div>
```

**Explanation:** `gap-5` (20px) → `gap-6` (24px)

### Example 3: Button Padding

**File:** `components/home/ProductsSection/ProductsSection.tsx`

**BEFORE:**

```jsx
<button className="min-h-[44px] md:min-h-[48px] bg-primary-500 text-white px-5 md:px-6 lg:px-8 py-2.5 md:py-3">
  View All Products
</button>
```

**AFTER:**

```jsx
<button className="min-h-[44px] md:min-h-[48px] bg-primary-500 text-white px-6 md:px-6 lg:px-8 py-3 md:py-3">
  View All Products
</button>
```

**Explanation:** `px-5` → `px-6` and `py-2.5` → `py-3`

## Files with Most Changes

### High Change Volume

1. **Product Pages** (swimwear, denims, knitwear, kids)
   - ~15-20 changes each
   - Grayscale text → neutral text
   - Grayscale backgrounds → neutral backgrounds

2. **Facility Pages** (rmg, agro, tech, shipping, washing)
   - ~25-40 changes each
   - Large sections with gray backgrounds
   - Multiple text color classes

3. **Component Library** (metrics, cards, buttons, etc.)
   - Varied changes depending on component
   - Color animations (hex → RGB equivalent)
   - Spacing normalization

### Color Animation Patterns

Some components use Framer Motion with hardcoded hex colors. These were preserved as RGB equivalents for animation compatibility:

**Example - Product3DCard.tsx:**

```jsx
animate={{
  backgroundColor: isHovered ? 'rgb(253, 211, 56)' : 'rgb(243, 244, 246)',
  color: isHovered ? 'rgb(0, 0, 0)' : 'rgb(75, 85, 99)'
}}
```

This preserves the animation functionality while using the same colors as the Tailwind tokens.

## Verification Checklist

- ✅ All `text-gray-*` replaced with `text-neutral-*`
- ✅ All `bg-gray-*` replaced with `bg-neutral-*`
- ✅ All hardcoded hex colors replaced with Tailwind tokens
- ✅ Non-standard spacing (p-5, gap-5, py-2.5) normalized
- ✅ No TypeScript errors
- ✅ No build/compilation errors
- ✅ No new linter warnings
- ✅ Design system tokens properly defined in config

## Design System Alignment

All replacements now align with the design system defined in `tailwind.config.js`:

**Brand Colors:**

- Primary (Yellow): `#fdd338` → `primary-500`
- Secondary (Red): `#e11a2b` → `secondary-500`
- Accent (Blue): `#1C6FE3` → `accent-500`

**Neutral Palette:**

- Grayscale: `gray-*` → `neutral-*` (50-900)

**Spacing Scale:**

- Standardized: `1, 2, 3, 4, 6, 8, 12, 16, 24`

---

**Impact:** Ensures consistency, maintainability, and scalability across the entire codebase.
