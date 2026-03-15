# CLAUDE.md — barlow.app Project Guide

This file provides comprehensive guidance to Claude Code when working on the barlow.app personal website. It includes embedded skills, patterns, architecture documentation, and quick-reference guides.

**Last Updated:** 2026-03-14
**Project Root:** `C:\Users\Lydia\Desktop\barlow-app`
**Production URL:** https://barlow.app
**GitHub:** https://github.com/Barlow365/barlow-app.git

---

## CRITICAL: Rules of Engagement

**READ THIS EVERY SESSION. These rules override default behavior.**

### 1. No Overengineering

- **DO:** Make the minimal change needed to accomplish the task
- **DON'T:** Add features, abstractions, or "improvements" beyond what was asked
- **DON'T:** Refactor surrounding code unless explicitly requested
- **DON'T:** Add extra configurability, feature flags, or "future-proofing"
- **DON'T:** Create helpers/utilities for one-time operations

**Example:**
```
User asks: "Change the hero title to 'Building Tomorrow'"
WRONG: Refactor hero section, add CMS integration, create title component
RIGHT: Edit the single <h1> text in index.html
```

### 2. Use What's Already Here

This is a **static HTML/CSS/JS site**. There are NO frameworks.

| DO NOT ADD | USE INSTEAD |
|------------|-------------|
| React, Vue, Svelte | Vanilla HTML/JS |
| Tailwind, Bootstrap | Existing `styles.css` with CSS variables |
| npm packages | Native browser APIs |
| Build tools (webpack, vite) | Direct file editing |
| TypeScript | Plain JavaScript |
| Pydantic, FastAPI | Existing Vercel serverless (Node.js) |
| Any database | HubSpot via existing API |
| Any CSS framework | Existing design system in `styles.css` |

**The only dependencies allowed:**
- Google Fonts (already included)
- Plausible/GA4 analytics (already included)
- Vercel serverless for API routes (already set up)

### 3. Before Making ANY Change

**ALWAYS check these first:**

1. **Read the file** - Never edit blind. Use `Read` tool first.
2. **Check existing patterns** - Look at how similar things are done elsewhere
3. **Check the design system** - Use existing CSS variables, classes, components
4. **Check all pages** - Navigation, footer, and shared elements exist in ALL HTML files
5. **Consider mobile** - Every change must work at all breakpoints

### 4. Thoroughness Requirements

**Every task must include:**

- [ ] Read all relevant files before editing
- [ ] Use existing CSS classes/variables when possible
- [ ] Test changes work with existing JavaScript
- [ ] Update ALL HTML files if changing shared elements (nav, footer)
- [ ] Verify responsive behavior at 1200/992/768/480px
- [ ] Check that forms still submit correctly
- [ ] Ensure no console errors

### 5. Decision-Making Hierarchy

When uncertain about approach, follow this priority:

1. **Match existing patterns** - How is it done elsewhere in this project?
2. **Keep it simple** - Fewer lines, fewer dependencies, less abstraction
3. **Use platform features** - Browser APIs, CSS features, Vercel built-ins
4. **Ask if unclear** - Use AskUserQuestion tool rather than guessing

### 6. Forbidden Actions

**NEVER do these without explicit user request:**

- Add npm/package dependencies
- Install frameworks or libraries
- Create build processes
- Add TypeScript
- Restructure the project
- Create new API endpoints
- Add database connections
- "Modernize" or "refactor" existing code
- Add comments/documentation to unchanged code
- Create abstraction layers

### 7. File Reading Requirements

**Before editing, ALWAYS read:**

| For this change... | Read these files first... |
|-------------------|---------------------------|
| Any HTML page | That page + `styles.css` + `script.js` |
| CSS changes | `styles.css` (check existing variables/classes) |
| JavaScript changes | `script.js` (understand existing patterns) |
| Navigation changes | ALL HTML files (nav is duplicated) |
| API changes | `api/contact.js` + `api/newsletter.js` |
| New images | Check `public/images/` structure |

### 8. Quality Gates

**Before marking any task complete:**

```
[ ] Changes are minimal and focused
[ ] No new dependencies added
[ ] Existing patterns followed
[ ] All affected files updated
[ ] Responsive design preserved
[ ] No JavaScript errors
[ ] Forms still work
[ ] Navigation works on all pages
```

---

## Table of Contents

1. [Claude Code Built-in Skills](#claude-code-built-in-skills)
2. [Project Overview](#project-overview)
3. [Architecture & Stack](#architecture--stack)
4. [File Structure](#file-structure)
5. [Development Commands](#development-commands)
6. [Design System](#design-system)
7. [Page Templates](#page-templates)
8. [API Endpoints](#api-endpoints)
9. [Integrations](#integrations)
10. [Embedded Skills](#embedded-skills)
11. [Content Management](#content-management)
12. [Deployment](#deployment)
13. [Debugging & Troubleshooting](#debugging--troubleshooting)
14. [SEO & Analytics](#seo--analytics)
15. [Security Checklist](#security-checklist)

---

## Claude Code Built-in Skills

These are slash commands built into Claude Code that are always available. Use them by typing the command or asking Claude to use them.

### /frontend-design

**Purpose:** Create distinctive, production-grade frontend interfaces with high design quality.

**When to use for barlow-app:**
- Creating new page sections with polished design
- Building new components that need visual distinction
- Redesigning existing sections for better aesthetics
- Adding interactive elements with refined styling
- Creating landing pages or promotional sections

**Example prompts:**
```
/frontend-design Create a testimonials carousel section for the speaker page

/frontend-design Build a press mentions grid with hover effects and logos

/frontend-design Design a newsletter signup section with modern styling

/frontend-design Create an animated statistics counter section
```

**Best practices:**
- Provide context about barlow-app's design system (blue palette, Syne/DM Sans fonts)
- Reference existing sections for style consistency
- Specify responsive requirements upfront
- Mention any specific animations or interactions needed

---

### Built-in Agent Types

Claude Code can spawn specialized agents for complex tasks:

#### Explore Agent
**Use:** Research codebase, find files, understand structure
```
"Use the explore agent to find all places where venture cards are defined"
"Explore how the contact form submission flow works"
```

#### Plan Agent
**Use:** Design implementation strategy before coding
```
"Plan how to add a podcast section to the site"
"Plan the implementation of a dark mode toggle"
```

#### Bash Agent
**Use:** Complex terminal operations, git workflows
```
"Run git operations to create a feature branch and set up PR"
```

#### General-Purpose Agent
**Use:** Multi-step research, complex searches
```
"Search for all CSS classes related to animations"
"Find and document all external links on the site"
```

---

### Built-in Tools Reference

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `Read` | Read file contents | Before editing any file |
| `Edit` | Modify existing files | Change specific content |
| `Write` | Create new files | New pages, components |
| `Glob` | Find files by pattern | Locate files by name |
| `Grep` | Search file contents | Find text across codebase |
| `Bash` | Run terminal commands | Git, npm, server commands |
| `WebFetch` | Fetch web content | Check live site, fetch resources |
| `WebSearch` | Search the web | Research, find documentation |

---

### Workflow Shortcuts

**Quick Git Commit:**
```
"Commit these changes with a good message"
```

**Quick Deploy:**
```
"Deploy to production"
```

**Quick Debug:**
```
"Why is the contact form not working?"
```

**Quick Style Update:**
```
"Make the hero section more visually impactful"
```

---

### Design-Specific Commands

For barlow-app frontend work, combine skills:

```
# New section with design skill
/frontend-design Create a client logos marquee section

# Then integrate with project patterns
"Add this to the homepage after the media section, using the existing CSS variable system"
```

**Design Constraints to Mention:**
- Color palette: Blue (#1e40af) primary, page-specific accents
- Fonts: Syne for headings, DM Sans for body
- Animations: Use `--ease-out-expo` easing
- Responsive: Desktop-first, breakpoints at 1200/992/768/480px
- Components: Follow existing card patterns (`.strength-card`, `.venture-card`)

---

## Project Overview

**barlow.app** is Jonathan Barlow's personal brand website showcasing his work as:
- Life Engineer & Serial Innovator
- Advisor & Investor
- Author & Speaker
- Founder of 40+ ventures

### Key Pages

| Page | File | Purpose |
|------|------|---------|
| Home | `public/index.html` | Main landing page with hero, about, ventures overview |
| Advisor | `public/advisor.html` | Advisory & investment services, key partnerships, media appearances |
| Speaker | `public/speaker.html` | Speaking engagements, author info, coaching, video reel |
| Ventures | `public/ventures.html` | Full venture portfolio by category |
| Press | `public/press.html` | Press coverage section + "The Fix by JB" blog |
| Blog Post | `public/posts/*.html` | Individual blog articles |

### Site Tagline
> "Innovator Inspiring Impact" — "Always Fixing the Future"

---

## Architecture & Stack

### Technology Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Frontend | Static HTML/CSS/JS | No build step required |
| Styling | Custom CSS | CSS variables, modern features |
| JavaScript | Vanilla ES6+ | No framework dependencies |
| Hosting | Vercel | Auto-deploys from GitHub |
| Serverless | Vercel Functions | Node.js API routes |
| CRM | HubSpot | Contact/newsletter management |
| Analytics | Google Analytics 4 + Plausible | Dual tracking |
| Fonts | Google Fonts | Syne (display), DM Sans (body) |

### Why Static HTML?

- **Performance:** Zero JS framework overhead, instant load
- **SEO:** Full HTML available to crawlers immediately
- **Simplicity:** Easy to edit, no build complexity
- **Reliability:** No dependencies to break

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## File Structure

```
barlow-app/
├── .git/                     # Git repository
├── .vercel/                  # Vercel deployment config
├── api/                      # Vercel serverless functions
│   ├── contact.js            # Contact form → HubSpot
│   └── newsletter.js         # Newsletter signup → HubSpot
├── assets/                   # Source assets (not deployed)
├── content/                  # Content files (not deployed)
├── public/                   # DEPLOYED FILES (Vercel serves this)
│   ├── index.html            # Homepage
│   ├── advisor.html          # Advisor & Investor page
│   ├── speaker.html          # Author & Speaker page
│   ├── ventures.html         # Ventures portfolio page
│   ├── press.html            # Press & media page
│   ├── article.html          # Blog article template
│   ├── styles.css            # Main stylesheet (~2100 lines)
│   ├── pages.css             # Page-specific styles
│   ├── article.css           # Blog article styles
│   ├── blog.css              # Blog listing styles
│   ├── script.js             # Main JavaScript (~620 lines)
│   ├── favicon.png           # Site favicon
│   ├── apple-touch-icon.png  # iOS icon
│   ├── og-image.png          # Open Graph image (1200x630)
│   ├── manifest.json         # PWA manifest
│   ├── robots.txt            # Crawler rules
│   ├── sitemap.xml           # XML sitemap
│   ├── images/               # Image assets
│   │   ├── hero-jb.webp      # Hero section image
│   │   ├── jb-speaking.jpeg  # Speaking photo
│   │   ├── jb-mic.webp       # Event photo
│   │   ├── jb-blacktech1.jpg # Black Tech Saturdays
│   │   ├── jb-blacktech2.jpg # Black Tech Saturdays
│   │   ├── jb-pulpit.jpg     # Ministry photo
│   │   ├── logos/            # Venture/partner logos
│   │   ├── 2023/             # Legacy images by year
│   │   ├── 2024/             # Legacy images by year
│   │   └── 2025/             # Legacy images by year
│   ├── downloads/            # Downloadable files
│   │   ├── Barlow-Speaker-Profile.pdf
│   │   └── Jonathan-Barlow.vcf
│   └── posts/                # Blog posts
│       └── why-every-crisis-is-an-innovation-opportunity.html
├── src/                      # (Empty - reserved for future)
├── .env.local                # Local environment variables
├── .gitignore                # Git ignore rules
├── vercel.json               # Vercel configuration
└── CLAUDE.md                 # This file
```

### Critical Paths

| Purpose | Path |
|---------|------|
| Main CSS | `public/styles.css` |
| Main JS | `public/script.js` |
| Homepage | `public/index.html` |
| Contact API | `api/contact.js` |
| Hero Image | `public/images/hero-jb.webp` |
| OG Image | `public/og-image.png` |

---

## Development Commands

### Local Development

```bash
# Navigate to project
cd C:\Users\Lydia\Desktop\barlow-app

# Start local server (any of these work)
npx serve public                    # Simple static server
python -m http.server 8000 --directory public  # Python server
npx vercel dev                      # Full Vercel dev (includes API functions)
```

### Vercel CLI

```bash
# Login to Vercel
npx vercel login

# Deploy to preview
npx vercel

# Deploy to production
npx vercel --prod

# Pull environment variables
npx vercel env pull .env.local

# View deployment logs
npx vercel logs barlow-app
```

### Git Operations

```bash
# Check status
git status

# View changes
git diff

# Commit changes
git add . && git commit -m "Description of changes"

# Push to GitHub (auto-deploys to Vercel)
git push origin master

# View recent commits
git log --oneline -10
```

---

## Design System

### Color Palette

```css
/* Primary Colors - Executive Blue */
--pink: #1e40af;           /* Primary blue (named 'pink' for legacy) */
--pink-light: #3b82f6;     /* Lighter blue */
--pink-dark: #1e3a8a;      /* Darker blue */
--coral: #2563eb;          /* Accent blue */
--coral-light: #60a5fa;    /* Light accent */

/* Page Accent Colors */
--accent-home: #1e40af;    /* Blue - Home page */
--accent-advisor: #059669; /* Green - Advisor page */
--accent-speaker: #d97706; /* Amber - Speaker page */
--accent-ventures: #7c3aed;/* Purple - Ventures page */
--accent-press: #475569;   /* Slate - Press page */

/* Neutrals */
--dark: #0f172a;           /* Near black */
--dark-soft: #1e293b;      /* Soft dark */
--text: #334155;           /* Body text */
--text-muted: #475569;     /* Secondary text */
--white: #ffffff;          /* White */
--purple-bg: #f8fafc;      /* Page background */
--purple-light: #f1f5f9;   /* Light background */
```

### Typography

```css
/* Display Font - Headlines */
font-family: 'Syne', sans-serif;
font-weight: 400 | 500 | 600 | 700 | 800;

/* Body Font - Text */
font-family: 'DM Sans', sans-serif;
font-weight: 400 | 500 | 600 | 700;
```

### Spacing System

```css
--section-padding: clamp(4rem, 10vh, 8rem);
--container-width: 1280px;
--container-padding: clamp(1.5rem, 5vw, 3rem);
```

### Breakpoints

```css
/* Desktop-first responsive design */
@media (max-width: 1200px) { /* Large tablets, small desktops */ }
@media (max-width: 992px)  { /* Tablets, mobile nav triggers */ }
@media (max-width: 768px)  { /* Mobile devices */ }
@media (max-width: 480px)  { /* Small phones */ }
```

### Component Classes

| Component | Class | Notes |
|-----------|-------|-------|
| Section Container | `.section-container` | Max-width centered container |
| Section Label | `.section-label` | Small uppercase label above title |
| Section Title | `.section-title` | Large heading |
| Section Subtitle | `.section-subtitle` | Muted description text |
| Primary Button | `.btn.btn-primary` | Gradient background |
| Secondary Button | `.btn.btn-secondary` | White with border |
| Outline Button | `.btn.btn-outline` | Transparent with border |
| Card | `.strength-card`, `.investment-card`, `.venture-card` | Various card styles |
| Reveal Animation | `[data-reveal]` | Intersection Observer animation |

### Animation Easings

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Logo System

Logos support automatic light/dark mode switching:

```html
<!-- Single logo (uses CSS filter fallback in dark mode) -->
<img src="images/logos/company-logo.png" alt="Company" class="entity-img">

<!-- Dual logo with light/dark versions -->
<img src="images/logos/company-logo-light.webp" alt="Company" class="entity-img logo-light">
<img src="images/logos/company-logo-dark.webp" alt="Company" class="entity-img logo-dark">
```

**Logo File Naming:**
- `{company}-logo-light.webp` — Colorful version for light backgrounds
- `{company}-logo-dark.webp` — White/light version for dark backgrounds

**Current Logos with Light/Dark Versions:**
- QSE Sports: `qse-logo-light.webp`, `qse-logo-dark.webp`

**Logo Locations:**
- Entity cards (advisor.html): Use `.entity-img` class
- Venture cards (index.html): Use inside `.venture-logo` div
- Venture list (ventures.html): Use `.venture-logo-img` class

---

## Site Features

### Dark Mode Toggle
- Toggle button in navigation (sun/moon icon)
- Persists preference in localStorage
- Respects `prefers-color-scheme` system setting
- Uses `[data-theme="dark"]` CSS attribute on `:root`

### Scroll-to-Top Button
- Appears after scrolling 300px
- Fixed position, bottom-right corner
- Present on all pages
- Smooth scroll animation

### Newsletter Signup
- Located on homepage before contact section
- Submits to `/api/newsletter` endpoint
- Integrates with HubSpot

### "As Seen In" Media Section
- Located on advisor.html
- Features 8 media outlets: 7 News Detroit, CBS Detroit, FOX 2, Michigan Chronicle, Axios, BridgeDetroit, WDET, WJR
- Links to actual interview/article URLs

### Mobile Hero Name
- Jonathan Barlow name displayed above hero image on mobile only
- Uses `.hero-name-mobile` class
- Hidden on desktop via CSS

### Reduced Motion Support
- `@media (prefers-reduced-motion: reduce)` disables animations
- Respects user accessibility preferences

---

## Page Templates

### Standard Page Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title | Jonathan Barlow</title>
    <meta name="description" content="Page description for SEO">

    <!-- Favicon -->
    <link rel="icon" type="image/png" sizes="32x32" href="favicon.png">
    <link rel="apple-touch-icon" sizes="180x180" href="favicon.png">

    <!-- Open Graph -->
    <meta property="og:title" content="Page Title | Jonathan Barlow">
    <meta property="og:description" content="Page description">
    <meta property="og:image" content="https://barlow.app/og-image.png">
    <meta property="og:url" content="https://barlow.app/page">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Page Title | Jonathan Barlow">

    <!-- Canonical -->
    <link rel="canonical" href="https://barlow.app/page">

    <!-- Analytics -->
    <script defer data-domain="barlow.app" src="https://plausible.io/js/script.js"></script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-YXWM7CDZK2"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-YXWM7CDZK2');
    </script>

    <!-- Fonts & Styles -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="pages.css">
</head>
<body class="page-{pagename}">
    <!-- Custom Cursor (hidden on mobile) -->
    <div class="cursor-dot"></div>
    <div class="cursor-ring"></div>

    <!-- Floating Orbs Background -->
    <div class="orbs-container" aria-hidden="true">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
        <div class="orb orb-4"></div>
        <div class="orb orb-5"></div>
    </div>

    <!-- Navigation (copy from index.html) -->
    <header class="nav-header">...</header>
    <div class="mobile-nav">...</div>

    <main>
        <!-- Page content sections here -->
    </main>

    <!-- Footer (copy from index.html) -->
    <footer class="footer">...</footer>

    <script src="script.js"></script>
</body>
</html>
```

### Section Template

```html
<section id="section-id" class="section-name-section">
    <div class="section-container">
        <div class="section-header centered" data-reveal>
            <span class="section-label">Section Label</span>
            <h2 class="section-title">Section Title</h2>
            <p class="section-subtitle">Section description text.</p>
        </div>

        <!-- Section content -->
        <div class="content-grid" data-reveal data-delay="100">
            <!-- Grid items -->
        </div>
    </div>
</section>
```

---

## API Endpoints

### POST /api/contact

Creates or updates a contact in HubSpot CRM.

**Request Body:**
```json
{
    "email": "user@example.com",       // Required
    "firstname": "John",               // Optional
    "lastname": "Doe",                 // Optional
    "message": "Contact message",      // Optional - creates HubSpot note
    "phone": "+1234567890",            // Optional
    "source": "barlow.app contact"     // Optional - tracking
}
```

**Response:**
```json
{
    "success": true,
    "action": "created" | "updated",
    "contactId": "123456",
    "message": "Contact created successfully"
}
```

### POST /api/newsletter

Subscribes email to newsletter list in HubSpot.

**Request Body:**
```json
{
    "email": "user@example.com",       // Required
    "source": "barlow.app newsletter"  // Optional
}
```

**Response:**
```json
{
    "success": true,
    "action": "created" | "updated",
    "message": "Successfully subscribed to newsletter"
}
```

---

## Integrations

### HubSpot CRM

**Purpose:** Contact management, lead tracking, engagement notes

**Environment Variable:** `HUBSPOT_ACCESS_TOKEN`

**Features Used:**
- Contact creation/update via CRM API
- Note attachments for messages
- Lead status tracking
- Lifecycle stage management

**API Endpoints Used:**
- `POST /crm/v3/objects/contacts` - Create contact
- `PATCH /crm/v3/objects/contacts/{id}` - Update contact
- `POST /crm/v3/objects/contacts/search` - Search by email
- `POST /crm/v3/objects/notes` - Create engagement note

### Google Analytics 4

**Measurement ID:** `G-YXWM7CDZK2`

**Events Tracked:**
- Page views (automatic)
- Form submissions (`form_submission` event)
- Outbound link clicks

### Plausible Analytics

**Domain:** `barlow.app`

**Benefits:**
- Privacy-friendly (no cookies)
- Simple dashboard
- Lightweight script

### Google Calendar

**Booking Link:** `https://calendar.app.google/ZxWuc1hhmCivsG269`

**Usage:** "Request to Book" / "Book a Consultation" CTAs

---

## Embedded Skills

### Skill: Edit Page Content

**When to use:** Updating text, images, or sections on any page.

**Pattern:**
```bash
# 1. Read the target file first
Read public/{page}.html

# 2. Find the section to edit using specific text
# 3. Use Edit tool with exact old_string match
# 4. Verify change by reading file again

# IMPORTANT: Preserve exact indentation and HTML structure
```

**Common Edits:**
- Change hero text: Look for `.hero-title` or `.hero-subtitle`
- Update stats: Look for `.stat-number` and `.stat-label`
- Edit venture cards: Look for `.venture-card` elements
- Update contact info: Look for `.contact-item` elements

---

### Skill: Add New Venture Card

**When to use:** Adding a company to the ventures section.

**Pattern:**
```html
<!-- Add to appropriate category in ventures section -->
<a href="https://venture-url.com" target="_blank" class="venture-card">
    <div class="venture-logo">
        <img src="images/logos/{logo-name}.png" alt="Venture Name"
             onerror="this.parentElement.innerHTML='ABC'">
    </div>
    <div class="venture-info">
        <h4>Venture Name</h4>
        <p>Brief description</p>
    </div>
</a>
```

**Logo Requirements:**
- Format: PNG or WebP with transparency
- Size: 200x200px recommended
- Location: `public/images/logos/`
- Naming: lowercase-with-dashes.png

---

### Skill: Add New Blog Post

**When to use:** Creating a new blog article.

**Pattern:**

1. Create HTML file in `public/posts/`:
```html
<!-- public/posts/article-slug.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Article Title | Jonathan Barlow</title>
    <meta name="description" content="Article summary for SEO (150-160 chars)">

    <!-- Include all standard head elements -->
    <meta property="og:type" content="article">
    <meta property="article:author" content="Jonathan Barlow">
    <meta property="article:published_time" content="2026-03-14">

    <link rel="stylesheet" href="../styles.css">
    <link rel="stylesheet" href="../article.css">
</head>
<body>
    <!-- Include nav header -->

    <article class="article-content">
        <header class="article-header">
            <span class="article-category">Category</span>
            <h1>Article Title</h1>
            <div class="article-meta">
                <time datetime="2026-03-14">March 14, 2026</time>
                <span class="reading-time">5 min read</span>
            </div>
        </header>

        <div class="article-body">
            <p>Article content...</p>
        </div>
    </article>

    <!-- Include footer -->
    <script src="../script.js"></script>
</body>
</html>
```

2. Update sitemap.xml with new URL
3. Consider adding to homepage if featured

---

### Skill: Update CSS Styles

**When to use:** Changing colors, spacing, typography, or responsive behavior.

**Pattern:**
```bash
# 1. Always read the CSS file first
Read public/styles.css

# 2. Search for relevant section
# CSS is organized with section headers like:
# /* ========== SECTION NAME ========== */

# 3. Find the exact selector and property
# 4. Use Edit tool with precise old_string

# IMPORTANT: Test at multiple breakpoints after changes
```

**CSS Organization:**
- Lines 1-100: CSS Variables (`:root`)
- Lines 100-250: Reset & Navigation
- Lines 250-500: Hero Section
- Lines 500-800: About & Strengths
- Lines 800-1100: Advisor & Speaker
- Lines 1100-1400: Ventures
- Lines 1400-1700: Contact & Footer
- Lines 1700-2000: Animations & Responsive

---

### Skill: Add New Image

**When to use:** Adding photos, logos, or graphics to the site.

**Pattern:**
```bash
# 1. Optimize image first
# - Max width: 1920px for hero, 800px for content
# - Format: WebP preferred, PNG for logos with transparency
# - Compress with tools like squoosh.app

# 2. Copy to appropriate folder
cp "source-image.webp" "C:\Users\Lydia\Desktop\barlow-app\public\images\{folder}\image-name.webp"

# 3. Reference in HTML
<img src="images/{folder}/image-name.webp" alt="Descriptive alt text" loading="lazy">

# 4. Commit the image
cd C:\Users\Lydia\Desktop\barlow-app
git add public/images/
git commit -m "Add {description} image"
```

**Image Locations:**
- Hero/feature images: `public/images/`
- Logos: `public/images/logos/`
- Blog images: `public/images/posts/` (create if needed)
- Legacy: `public/images/2023/`, `public/images/2024/`, etc.

---

### Skill: Update Navigation

**When to use:** Adding or modifying navigation links.

**Pattern:**
```html
<!-- Desktop nav in .nav-links -->
<ul class="nav-links">
    <li><a href="index.html" class="nav-link active">Home</a></li>
    <li><a href="advisor.html" class="nav-link">Advisor & Investor</a></li>
    <li><a href="speaker.html" class="nav-link">Author & Speaker</a></li>
    <li><a href="ventures.html" class="nav-link">Founder & Companies</a></li>
    <li><a href="press.html" class="nav-link">Press</a></li>
</ul>

<!-- Mobile nav in .mobile-nav-links (must match!) -->
<ul class="mobile-nav-links">
    <li><a href="index.html">Home</a></li>
    <!-- ... same links ... -->
</ul>
```

**CRITICAL:** Update navigation in ALL HTML files when changing nav structure:
- index.html
- advisor.html
- speaker.html
- ventures.html
- press.html
- Any blog post files

---

### Skill: Git Commit for barlow-app

**When to use:** After completing changes that should be saved.

**Pattern:**
```bash
cd C:\Users\Lydia\Desktop\barlow-app

# 1. Check what changed
git status
git diff

# 2. Stage changes
git add public/           # For content changes
git add api/              # For API changes
git add .                 # For all changes

# 3. Commit with descriptive message
git commit -m "$(cat <<'EOF'
Brief description of change

- Detail 1
- Detail 2

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"

# 4. Push to deploy
git push origin master
```

**Commit Message Examples:**
- `Update speaker page with new coaching section`
- `Add Power Tour logo to ventures grid`
- `Fix mobile nav not closing on link click`
- `Optimize hero image for faster loading`

---

### Skill: Deploy to Vercel

**When to use:** Publishing changes to production.

**Pattern:**
```bash
cd C:\Users\Lydia\Desktop\barlow-app

# Method 1: Push to GitHub (auto-deploys)
git add .
git commit -m "Description"
git push origin master
# Vercel auto-deploys in ~30 seconds

# Method 2: Direct Vercel deploy
npx vercel --prod

# Verify deployment
curl -I https://barlow.app
```

**Post-Deploy Checks:**
- [ ] Homepage loads correctly
- [ ] Navigation works on all pages
- [ ] Contact form submits successfully
- [ ] Mobile layout looks correct
- [ ] Images load properly

---

### Skill: Debug Contact Form

**When to use:** Form submissions not working.

**Pattern:**
```bash
# 1. Check browser console for errors
# Open DevTools → Console tab

# 2. Check network request
# DevTools → Network tab → Submit form → Check /api/contact request

# 3. Common issues:

# CORS error:
# - Check origin in api/contact.js matches domain

# 500 error:
# - Check HUBSPOT_ACCESS_TOKEN is set in Vercel
# - Verify token hasn't expired

# 400 error:
# - Check required fields (email) are filled

# 4. Test locally
npx vercel dev
# Submit form at localhost:3000

# 5. Check Vercel logs
npx vercel logs barlow-app --follow
```

---

### Skill: Add Open Graph Image

**When to use:** Creating share images for new pages.

**Pattern:**
```bash
# 1. Create image
# Size: 1200 x 630 pixels
# Format: PNG or JPG
# Include: Title, branding, visual

# 2. Save to public folder
cp og-image-page.png C:\Users\Lydia\Desktop\barlow-app\public\images\og\

# 3. Add to page HTML <head>
<meta property="og:image" content="https://barlow.app/images/og/og-image-page.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

# 4. Test with Facebook Debugger
# https://developers.facebook.com/tools/debug/
```

---

### Skill: Performance Optimization

**When to use:** Site loading slowly.

**Pattern:**
```bash
# 1. Audit with Lighthouse
# Chrome DevTools → Lighthouse → Generate report

# 2. Image optimization
# Convert to WebP:
# Use squoosh.app or similar

# Add lazy loading:
<img src="image.webp" loading="lazy" alt="Description">

# 3. CSS optimization
# - Remove unused styles
# - Minimize critical CSS

# 4. JavaScript optimization
# - Defer non-critical scripts
# - Use async for analytics

# 5. Enable compression
# Vercel handles gzip automatically

# 6. Check Core Web Vitals
# https://pagespeed.web.dev/
```

---

### Skill: Update Footer Year

**When to use:** Annually, or when copyright year needs updating.

**Pattern:**
```bash
# Search and replace in all HTML files
# Footer contains: &copy; 2024 Jonathan Barlow

# Update to current year in:
# - public/index.html
# - public/advisor.html
# - public/speaker.html
# - public/ventures.html
# - public/press.html
# - public/posts/*.html
```

---

### Skill: Add Analytics Event

**When to use:** Tracking specific user interactions.

**Pattern:**
```javascript
// In script.js or inline

// Track button click
document.querySelector('.cta-button').addEventListener('click', () => {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
            'event_category': 'engagement',
            'event_label': 'Book Consultation'
        });
    }
});

// Track form submission
gtag('event', 'form_submission', {
    'event_category': 'Contact',
    'event_label': 'Speaker Inquiry'
});

// Track outbound link
gtag('event', 'click', {
    'event_category': 'outbound',
    'event_label': 'LinkedIn Profile'
});
```

---

### Skill: Mobile Responsiveness Fix

**When to use:** Layout broken on mobile devices.

**Pattern:**
```bash
# 1. Test in browser DevTools
# Chrome → DevTools → Toggle device toolbar (Ctrl+Shift+M)

# 2. Check breakpoints in styles.css
# @media (max-width: 992px)  - Tablet
# @media (max-width: 768px)  - Mobile
# @media (max-width: 480px)  - Small phone

# 3. Common mobile fixes:

# Grid to single column:
@media (max-width: 768px) {
    .grid-class {
        grid-template-columns: 1fr;
    }
}

# Reduce font size:
@media (max-width: 480px) {
    .hero-title {
        font-size: 2.5rem;
    }
}

# Full-width buttons:
@media (max-width: 480px) {
    .btn {
        width: 100%;
    }
}

# 4. Test on actual devices if possible
```

---

### Skill: SEO Audit

**When to use:** Checking and improving search visibility.

**Checklist:**

```bash
# For each page, verify:

# 1. Meta tags
<title>Unique Title | Jonathan Barlow</title>  # 50-60 chars
<meta name="description" content="...">        # 150-160 chars

# 2. Open Graph
<meta property="og:title">
<meta property="og:description">
<meta property="og:image">
<meta property="og:url">

# 3. Canonical URL
<link rel="canonical" href="https://barlow.app/page">

# 4. Heading hierarchy
<h1> - One per page, main topic
<h2> - Section headings
<h3> - Subsection headings

# 5. Image alt text
<img alt="Descriptive text for accessibility and SEO">

# 6. Internal linking
- Link between related pages
- Use descriptive anchor text

# 7. Sitemap
- public/sitemap.xml includes all pages
- Submit to Google Search Console

# 8. robots.txt
- Allow all important pages
- Block admin/utility paths if any
```

---

### Skill: Create Pull Request for barlow-app

**When to use:** When working on feature branch before merging.

**Pattern:**
```bash
cd C:\Users\Lydia\Desktop\barlow-app

# 1. Create feature branch
git checkout -b feature/description

# 2. Make changes and commit
git add .
git commit -m "Description"

# 3. Push branch
git push -u origin feature/description

# 4. Create PR
gh pr create --title "Feature: Description" --body "$(cat <<'EOF'
## Summary
- What this PR does

## Changes
- File 1: change description
- File 2: change description

## Testing
- [ ] Tested locally
- [ ] Checked mobile view
- [ ] Forms work correctly

Generated with [Claude Code](https://claude.ai/code)
EOF
)"
```

---

## Content Management

### Social Media Links

| Platform | URL | Location in HTML |
|----------|-----|------------------|
| LinkedIn | https://www.linkedin.com/in/barlowdetroit/ | Footer, Contact section |
| Instagram | https://www.instagram.com/miamibarlow/ | Footer, Contact section |
| Facebook | https://www.facebook.com/JONATHAN.EDWARD.BARLOW/ | Contact section |
| X/Twitter | https://twitter.com/Barlow365 | Footer, Contact section |

### Contact Information

| Type | Value | Location |
|------|-------|----------|
| Email | j@barlow.app | Contact section, footer |
| Phone | 313-728-2398 | Contact section |
| Calendar | calendar.app.google/ZxWuc1hhmCivsG269 | CTAs throughout |

### Downloadable Files

| File | Path | Purpose |
|------|------|---------|
| Speaker Profile | downloads/Barlow-Speaker-Profile.pdf | Speaking engagement info |
| Contact Card | downloads/Jonathan-Barlow.vcf | vCard for contacts |

### Venture Links

Update these if venture URLs change:

| Venture | URL |
|---------|-----|
| One Vibe | http://1vibe.org |
| Power Tour | http://powertour.org |
| Project Let's Build | http://projectletsbuild.org |
| X Big Tech | http://xbigtech.com |
| Builders Cohort | http://builderscohort.com |
| Innovation Labs | http://innovationlabs.ventures |
| WKND Company | http://miamiwknd.com |
| Press Media Haus | http://pressmedia.haus |
| Radical Sunday | http://radicalsunday.com |
| Let's Talk Roundtable | http://letstalkroundtable.com |
| QSE Sports | https://qse-sports.com |
| SushiRitas | https://sushiritas.com |
| 1st of the Day | https://1st-oftheday.com |

---

## Deployment

### Automatic Deployment (Recommended)

```bash
# Push to master triggers Vercel deploy
git push origin master

# Vercel builds and deploys in ~30-60 seconds
# Preview at: https://barlow-app-{hash}.vercel.app
# Production at: https://barlow.app
```

### Manual Deployment

```bash
# Deploy to preview
npx vercel

# Deploy to production
npx vercel --prod
```

### Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Purpose | Required |
|----------|---------|----------|
| `HUBSPOT_ACCESS_TOKEN` | HubSpot API access | Yes |

### Domain Configuration

- Primary: barlow.app (configured in Vercel)
- Redirects: www.barlow.app → barlow.app

---

## Debugging & Troubleshooting

### Common Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| Styles not updating | Browser cache | Hard refresh (Ctrl+Shift+R) |
| API 500 error | Missing env var | Check Vercel env vars |
| Images not loading | Wrong path | Use relative paths from public/ |
| Mobile nav stuck | JS error | Check console for errors |
| Form not submitting | CORS or API error | Check network tab |
| Deploy failed | Build error | Check Vercel deploy logs |

### Debug Checklist

```bash
# 1. Check browser console
# DevTools → Console tab

# 2. Check network requests
# DevTools → Network tab

# 3. Validate HTML
# https://validator.w3.org/

# 4. Check Vercel logs
npx vercel logs barlow-app

# 5. Test API locally
npx vercel dev
curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"email":"test@test.com"}'

# 6. Check git status
git status
git log --oneline -5
```

### Contact Form Debug

```bash
# Test HubSpot connection
curl -X GET "https://api.hubapi.com/crm/v3/objects/contacts?limit=1" \
  -H "Authorization: Bearer {HUBSPOT_TOKEN}"

# Should return contact data if token is valid
```

---

## SEO & Analytics

### Google Analytics 4

**Measurement ID:** G-YXWM7CDZK2

**Dashboard:** https://analytics.google.com/

**Key Metrics:**
- Users, Sessions, Pageviews
- Bounce Rate
- Time on Page
- Event tracking (form submissions)

### Plausible Analytics

**Dashboard:** https://plausible.io/barlow.app

**Key Metrics:**
- Unique Visitors
- Page Views
- Top Pages
- Referral Sources

### Google Search Console

**URL:** https://search.google.com/search-console

**Submit sitemap:** https://barlow.app/sitemap.xml

### Schema.org Structured Data

The homepage includes Person schema in JSON-LD format:

```json
{
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Jonathan Barlow",
    "alternateName": "JB",
    "jobTitle": "Life Engineer",
    "url": "https://barlow.app",
    "sameAs": [
        "https://www.linkedin.com/in/barlowdetroit/",
        "https://twitter.com/Barlow365",
        "https://www.instagram.com/miamibarlow/"
    ]
}
```

---

## Security Checklist

### Before Deployment

- [ ] No API keys in client-side code
- [ ] Environment variables set in Vercel (not committed)
- [ ] CORS configured for production domain only
- [ ] Input validation on API endpoints
- [ ] No sensitive data in HTML comments

### API Security

- [ ] Rate limiting (handled by Vercel)
- [ ] Input sanitization
- [ ] Error messages don't expose internals
- [ ] HTTPS enforced (Vercel automatic)

### Content Security

- [ ] External links use `target="_blank" rel="noopener"`
- [ ] No inline scripts where possible
- [ ] Form inputs have proper validation

---

## Quick Reference

### File Locations

```
Homepage:           public/index.html
Main CSS:           public/styles.css
Main JS:            public/script.js
Contact API:        api/contact.js
Hero Image:         public/images/hero-jb.webp
Logos:              public/images/logos/
Downloads:          public/downloads/
```

### Key URLs

```
Production:         https://barlow.app
GitHub:             https://github.com/Barlow365/barlow-app
Vercel Dashboard:   https://vercel.com/john-barlows-projects/barlow-app
HubSpot:            https://app.hubspot.com/
Analytics:          https://analytics.google.com/
Plausible:          https://plausible.io/barlow.app
```

### Contact

```
Email:              j@barlow.app
Phone:              313-728-2398
LinkedIn:           /in/barlowdetroit/
Twitter/X:          @Barlow365
Instagram:          @miamibarlow
```

---

*CLAUDE.md — barlow.app Project Guide*
*Last Updated: 2026-03-14*
