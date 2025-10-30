# Vibe Commerce - Design Guidelines

## Design Approach

**Reference-Based E-Commerce Design**  
Drawing inspiration from: Shopify (clean product grids), Stripe (minimal checkout flows), Vercel (modern aesthetics), and contemporary DTC brands. Focus on conversion-optimized layouts with generous whitespace and clear hierarchy.

---

## Typography System

**Font Stack:**
- Primary: Inter (Google Fonts) - Clean, modern sans-serif for UI elements
- Accent: Space Grotesk (Google Fonts) - Distinctive headings and brand elements

**Hierarchy:**
- Hero/H1: Space Grotesk, 4xl-6xl, font-bold, tracking-tight
- Section Headers/H2: Space Grotesk, 3xl-4xl, font-semibold
- Product Names/H3: Inter, xl-2xl, font-semibold
- Body Text: Inter, base-lg, font-normal, leading-relaxed
- Price Display: Inter, 2xl-3xl, font-bold, tabular-nums
- Labels/Small: Inter, sm, font-medium, uppercase tracking-wide
- Cart Quantities: Inter, base, font-medium

---

## Layout & Spacing System

**Tailwind Spacing Primitives:** 4, 6, 8, 12, 16, 24, 32  
Use consistently across padding (p-), margin (m-), gap (gap-), and height (h-) utilities.

**Container Strategy:**
- Page wrapper: max-w-7xl mx-auto px-6 lg:px-8
- Product grid: max-w-6xl mx-auto
- Checkout forms: max-w-2xl mx-auto
- Cart sidebar: Fixed width 400-480px

**Responsive Grid:**
- Products: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8
- Featured products: grid-cols-1 lg:grid-cols-2 gap-8

---

## Component Library

### Navigation Header
Sticky top-0 with backdrop blur effect, height h-16 lg:h-20, horizontal flex layout with logo (left), cart icon with badge (right), and optional category links (center). Badge uses absolute positioning with -top-2 -right-2 for count display. Add subtle border-b for definition.

### Hero Section
Full-width banner (h-96 lg:h-[500px]) with gradient overlay, centered content using flex items-center justify-center. Include compelling headline, short value proposition (max-w-2xl), and primary CTA button. Overlay uses bg-gradient-to-r with opacity-90 for text readability.

### Product Cards
Aspect-ratio-square image container with object-cover, hover scale transform (hover:scale-105 transition-transform duration-300). Below image: product name (truncate), price display, "Add to Cart" button (w-full mt-4). Card uses rounded-lg, overflow-hidden, and subtle shadow hover state.

### Shopping Cart (Sidebar or Modal)
Slide-in panel from right side, full height with fixed positioning. Header with "Your Cart" title and close button, scrollable middle section for items (space-y-4), sticky footer showing subtotal and checkout button. Each cart item: flex layout with thumbnail (w-20 h-20 rounded), product details (flex-1), quantity controls (flex gap-2 with +/- buttons), and remove icon.

### Checkout Form
Two-column layout on desktop (grid-cols-2 gap-6), single column mobile. Group related fields (Contact Info, Shipping Address). Input fields use p-3, rounded-md, border focus states. Submit button spans full width with bold "Complete Order" text.

### Receipt Modal
Centered modal (max-w-md) with backdrop-blur, success icon at top, order summary list (space-y-2), total with emphasis (text-2xl font-bold), timestamp, and "Continue Shopping" button. Modal uses fixed z-50 positioning with bg-black/50 backdrop.

### Empty States
Cart empty: centered icon (w-32 h-32 mx-auto), heading, description text, "Start Shopping" CTA. Uses py-24 for vertical spacing.

### Toast Notifications
Fixed top-4 right-4 positioning, flex items-center gap-3, rounded-lg px-6 py-4, slide-in animation from right. Include icon, message text, auto-dismiss after 3s.

---

## Icons & Assets

**Icon Library:** Heroicons (outline and solid variants via CDN)
- Cart: shopping-cart
- Plus/Minus: plus, minus
- Remove: x-mark, trash
- Success: check-circle
- Close: x-mark

**Images:**

**Hero Image:** Large banner showcasing lifestyle product photography with shopping/commerce theme. Dimensions 1920x500px minimum. Position: Cover full hero section with object-cover and centered focal point.

**Product Images:** Square format (1:1 aspect ratio), minimum 600x600px. Professional product photography on white/neutral backgrounds. Each product requires high-quality image showcasing item clearly.

**Empty State Graphics:** Illustrated shopping bag icon or minimal graphic, 200x200px, centered in empty cart view.

---

## Interaction Patterns

**Add to Cart:** Immediate visual feedback - button transforms to checkmark briefly (200ms), cart badge animates with scale bounce effect, toast notification slides in confirming addition.

**Quantity Updates:** Direct manipulation with +/- buttons, debounced updates (300ms), total recalculates smoothly without jarring reloads.

**Checkout Flow:** Progressive disclosure - show form validation inline as user types, disable submit until valid, loading spinner replaces button text during processing.

**Hover States:** Subtle elevation on product cards (shadow-lg), pointer cursor on interactive elements, slight opacity change (hover:opacity-80) on buttons.

---

## Accessibility

- All interactive elements have visible focus rings (focus:ring-2 focus:ring-offset-2)
- Form inputs include associated labels with htmlFor attributes
- Cart badge includes sr-only text: "items in cart"
- Modal traps focus and closes on Escape key
- Maintain 4.5:1 contrast minimum for all text
- All images include descriptive alt text