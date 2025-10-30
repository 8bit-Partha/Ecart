# Vibe Commerce - E-Commerce Platform

## Overview

Vibe Commerce is a modern e-commerce web application built with a full-stack TypeScript architecture. The platform provides a streamlined shopping experience with product browsing, cart management, and checkout functionality. It follows a clean, conversion-optimized design inspired by contemporary DTC brands and platforms like Shopify, Stripe, and Vercel.

The application implements a monorepo structure with shared schema validation, a React-based frontend using shadcn/ui components, and an Express.js backend with flexible storage abstraction.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**
- **Framework**: React 18 with TypeScript
- **Bundler**: Vite for fast development and optimized production builds
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system

**Design System**
- Typography: Inter (primary UI) and Space Grotesk (headings) from Google Fonts
- Color scheme: HSL-based CSS variables for light/dark mode support
- Component theming: "new-york" style variant from shadcn/ui
- Custom Tailwind configuration with extended border radius, colors, and elevation utilities

**Key Frontend Components**
- `Header`: Sticky navigation with cart badge
- `Hero`: Full-width banner with gradient overlay and CTA
- `ProductCard`: Reusable product display with image, details, and add-to-cart action
- `CartSidebar`: Slide-in panel for cart management with quantity controls
- `CheckoutModal`: Form-based checkout flow with validation
- `ReceiptModal`: Order confirmation display

**State Management Pattern**
- Server state cached and synchronized via React Query
- Query invalidation triggers on mutations (add to cart, update quantity, etc.)
- Toast notifications for user feedback on actions
- Local component state for UI interactions (modals, sidebars)

### Backend Architecture

**Technology Stack**
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Validation**: Zod for runtime type checking
- **Session Management**: connect-pg-simple (PostgreSQL session store)

**Storage Abstraction**
The application uses an `IStorage` interface pattern for data access, allowing flexibility between storage implementations:
- Interface defines methods for products, cart items, and orders
- `MemStorage` class provides in-memory implementation with mock data
- Ready for database implementation swap (Drizzle ORM configured)

**API Endpoints**
- `GET /api/products` - Retrieve all products
- `GET /api/cart` - Get cart items with populated product details
- `POST /api/cart` - Add item to cart with validation
- `PATCH /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart
- `POST /api/orders` - Create order from cart contents

**Error Handling**
- Zod schema validation for request payloads
- Structured error responses with appropriate HTTP status codes
- Request/response logging middleware for API debugging

### Database Schema

**Drizzle ORM Configuration**
- Configured for PostgreSQL via `@neondatabase/serverless`
- Schema defined in `shared/schema.ts` for type sharing
- Migration directory: `./migrations`

**Tables**
1. **products**
   - id (UUID, primary key)
   - name, description (text)
   - price (decimal 10,2)
   - image (text URL)
   - category (text)
   - stock (integer, default 100)

2. **cart_items**
   - id (UUID, primary key)
   - productId (foreign key to products)
   - quantity (integer, default 1)

3. **orders**
   - id (UUID, primary key)
   - customerName, customerEmail (text)
   - total (decimal 10,2)
   - items (JSON text - serialized cart items)
   - createdAt (timestamp)

**Type Safety**
- Drizzle schema generates TypeScript types
- `createInsertSchema` from drizzle-zod creates Zod validators
- Shared types exported for use across client and server

### Build and Deployment

**Development Mode**
- Vite dev server with HMR for client code
- tsx for TypeScript execution on server with watch mode
- Middleware mode allows Express to serve Vite during development

**Production Build**
- Client: Vite bundles React app to `dist/public`
- Server: esbuild bundles Express app to `dist` with ESM format
- Static file serving from build output

**Environment Variables**
- `DATABASE_URL` - PostgreSQL connection string (required for Drizzle)
- `NODE_ENV` - Environment flag (development/production)

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query** (^5.60.5) - Server state management
- **express** - Backend web framework
- **react** & **react-dom** - UI framework
- **vite** - Build tool and dev server
- **drizzle-orm** (^0.39.1) - Database ORM
- **wouter** - Client-side routing

### Database and Storage
- **@neondatabase/serverless** (^0.10.4) - Neon PostgreSQL driver
- **connect-pg-simple** (^10.0.0) - PostgreSQL session store for Express
- **drizzle-kit** - Database migration toolkit

### UI Component Libraries
- **@radix-ui/** packages - Unstyled, accessible component primitives (accordion, dialog, dropdown, select, tabs, toast, etc.)
- **tailwindcss** - Utility-first CSS framework
- **class-variance-authority** - CVA for component variants
- **lucide-react** - Icon library
- **embla-carousel-react** (^8.6.0) - Carousel component

### Form Management and Validation
- **react-hook-form** - Form state management
- **@hookform/resolvers** (^3.10.0) - Validation resolver integration
- **zod** - Schema validation library
- **drizzle-zod** (^0.7.0) - Zod schema generation from Drizzle

### Development Tools
- **@replit/vite-plugin-** packages - Replit-specific development utilities
- **typescript** - Type system
- **esbuild** - Server bundler for production
- **tsx** - TypeScript execution for development

### Utility Libraries
- **clsx** & **tailwind-merge** - Class name utilities
- **date-fns** (^3.6.0) - Date formatting
- **cmdk** (^1.1.1) - Command palette component
- **nanoid** - ID generation

### Font Integration
- Google Fonts (Inter, Space Grotesk) loaded via CDN in HTML head