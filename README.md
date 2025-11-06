# Kreator Landing Page

A professional landing page for **Kreator**, the platform that connects professionals across industries and regions to generate referrals and grow their businesses.

## 🚀 Features

- **Next.js 14.2.16**  
- **React 18** and **React DOM 18**  
- **TypeScript 5**  
- **Tailwind CSS 4.1.9**  
- **Clean component structure** (UI, Layout, Sections, Registration)  
- **Full accessibility best practices** (WAI-ARIA, keyboard navigation)  
- **Responsive design** (optimized for screens starting at 300px wide)  
- **Unit tests** with Vitest + React Testing Library  
- **End-to-end tests (E2E)** with Playwright  

## 🛠️ Installation and Development

```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm dev

# Build for production
pnpm build

# Run in production
pnpm start

```

## 🧪 Testing

```bash
# Unit tests
pnpm test

# Unit tests in watch mode
pnpm test:watch

# End-to-end tests
pnpm test:e2e

# E2E tests with visual UI
pnpm test:e2e:ui
```

## 📁 Project Structure

```bash
src/
├── app/                  # Next.js App Router entry (root layout + pages)
│   ├── layout.tsx        # Root layout (metadata, fonts, providers, GTM)
│   └── page.tsx          # Home / landing page
│
├── components/           # Reusable React components
│   ├── layout/           # Shell elements: Header, Navbar, Footer, wrappers
│   ├── legal/            # Legal-related components and layouts
│   ├── login/            # Login components (forms, views, helpers)
│   ├── registration/     # Registration form, map and registration UI
│   └── ui/               # Small reusable UI atoms (Button, Input, Badge…)
│
├── sections/             # Page-level sections
│   └── home/
│       ├── hero/         # Hero section with main CTA
│       ├── about/        # “What is Kreator” section
│       ├── benefits/     # Benefits and value proposition
│       ├── how-it-works/ # Step-by-step “How it works”
│       ├── profiles/     # Profiles: Professional / Team Leader
│       ├── testimonial/  # Testimonials / social proof
│       └── final-cta/    # Final call-to-action block
│
├── data/                 # Typed static content (FAQs, copy, feature lists)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and helpers
├── providers/            # Global React context providers
├── services/             # External services and integrations (e.g. Stripe)
├── styles/               # Global styles and design tokens
│   └── globals.css       # Main global stylesheet for the whole app
└── types/                # Shared TypeScript types and interfaces

```

Other relevant folders:

```bash
e2e/          # Tests end-to-end
__tests__/    # Unit tests
public/       # Static assets (images, favicons, etc.)
```

## 🎯 Accessibility

The landing page complies with best practices for accessibility:

- ✅ 100% keyboard navigation  
- ✅ Visible focus on all interactive elements  
- ✅ ARIA labels and appropriate roles  
- ✅ Semantic HTML5 structure  
- ✅ WCAG AA colour contrast

## 🎨 Branding

Brand colors and typography variables are defined in src/styles/globals.css.

## 📱 Responsive Design

- **Mobile First**: Optimised design from 300px  
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)  
- **Fluid components**: Automatically adapt to different screen sizes    

## 👥 Colaboradores

Project created and maintained by:

- [Mónica](https://github.com/grinxy)  
- [Aless](https://github.com/AlessHub)  
- [Jess](https://github.com/jess-ar)

## 📄 Licence

© 2025 Kreator. All rights reserved.
