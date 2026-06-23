# Smart Product Listing Website
### Task-4 Web Development Internship Project

> A fully responsive, multi-feature web application showcasing advanced HTML, CSS, and JavaScript skills — built for internship submission, GitHub portfolio, and LinkedIn showcase.

---

## 🚀 Live Demo
Open `index.html` in any modern browser — no build step, no dependencies.

---

## 📁 Folder Structure

```
smart-product-listing/
├── index.html      ← Semantic HTML5 structure
├── style.css       ← Design system + responsive layout
├── script.js       ← All JS logic (filtering, sorting, LocalStorage)
├── assets/
│   └── images/     ← (products use emoji icons; swap for real images)
└── README.md       ← This file
```

---

## ✨ Features

### 1 · Personal Portfolio
| Section | What's inside |
|---|---|
| **Hero** | Animated name, CTA buttons, stats counter |
| **About Me** | Bio, badges, fact cards |
| **Skills** | Animated progress bars + tag cloud |
| **Projects** | Featured cards with mini browser preview |
| **Contact** | Working form (simulated submit) + social links |

### 2 · Product Listing Page
- **12 products** across 4 categories (Electronics, Wearables, Audio, Accessories)
- Each card shows: emoji image, name, category badge, price, star rating, description
- **Filter by Category** — tab pills (All / Electronics / Wearables / Audio / Accessories)
- **Filter by Price Range** — live range slider up to $1 500
- **Sort** — Default / Price Low→High / Price High→Low / Highest Rated
- Results count updates in real time

### 3 · Notes (LocalStorage)
- Add notes with a title and body (max 300 characters, live counter)
- Delete individual notes or clear all at once
- Data **persists after page refresh** via `localStorage`
- Press `Ctrl + Enter` to save quickly

### 4 · Responsive Design
| Breakpoint | Layout |
|---|---|
| `< 640 px` (Mobile) | Single column, hamburger nav |
| `640 – 960 px` (Tablet) | 2-column grids |
| `> 960 px` (Laptop / Desktop) | Full multi-column layouts |

---

## 🛠️ Technical Details

### HTML
- Semantic elements: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- ARIA roles and labels for accessibility
- Proper `<meta>` viewport and description tags

### CSS
- **Design tokens** via CSS Custom Properties (`--clr-*`, `--radius-*`, etc.)
- **Flexbox** — nav bar, hero stats, button groups, note cards
- **CSS Grid** — about, skills, projects, products, notes, contact
- **Media queries** at 960 px and 640 px breakpoints
- Hover effects, smooth transitions, sticky navbar with `backdrop-filter`
- Dot-grid hero background, animated avatar ring
- Respects `prefers-reduced-motion`

### JavaScript
| Feature | API / Pattern |
|---|---|
| DOM Manipulation | `getElementById`, `querySelector`, `createElement` |
| Event Handling | `addEventListener`, event delegation |
| Filtering Logic | `Array.filter()` with category + price checks |
| Sorting Logic | `Array.sort()` on price and rating |
| LocalStorage | `getItem`, `setItem`, JSON serialise/parse |
| Scroll Animations | `IntersectionObserver` |
| Skill Bars | `IntersectionObserver` + CSS transition |

---

## 📖 Step-by-Step Explanation

### Step 1 — HTML Structure
All seven sections are laid out in `index.html` inside a single `<main>` tag. Navigation links use `#anchor` hrefs that match section `id` attributes, enabling smooth scrolling via `scroll-behavior: smooth` in CSS.

### Step 2 — Design System (CSS)
`:root` at the top of `style.css` defines every colour, radius, shadow, and font as a custom property. All components reference these variables so the entire look can be changed in one place.

### Step 3 — Product Data
`PRODUCTS` in `script.js` is a plain JavaScript array of objects. Each object holds `id`, `name`, `category`, `price`, `rating`, `emoji`, and `description`. To connect a real backend, replace this array with a `fetch()` call.

### Step 4 — Rendering Products (`renderProducts`)
1. Clone the `PRODUCTS` array into `filtered`.
2. Apply category filter: skip products whose `category !== state.activeCategory` (unless 'all').
3. Apply price filter: skip products where `price > state.maxPrice`.
4. Apply sort: mutate `filtered` with `Array.sort()` based on `state.sortOrder`.
5. Clear `#productsGrid` and append a new card for each result.

### Step 5 — LocalStorage Notes
`loadNotes()` reads the JSON string at key `'am_portfolio_notes'` and parses it (or returns `[]` on error). `saveNotes(arr)` serialises the array back. Adding a note pushes a new object `{id, title, body, createdAt}` and calls `saveNotes`. Deleting filters it out and saves again. The list is re-rendered from storage on every change, guaranteeing the UI always reflects the saved state — even after refresh.

### Step 6 — Navigation
A `scroll` event listener toggles `.scrolled` on `<header>` for the frosted-glass effect and calls `highlightActiveSection()` to update active nav links. The hamburger menu toggles `.open` classes on itself and the `<nav>` block, which uses `max-height` transition for a smooth open/close.

### Step 7 — Skill Bars
Each `.skill-item` element has `data-skill` and `data-pct` attributes. `initSkillBars()` builds a `<div class="skill-track"><div class="skill-fill"></div></div>` inside each item and attaches an `IntersectionObserver`. When the element scrolls into view the fill's `width` is set to the percentage value, triggering the CSS transition.

---

## 🎨 Design Decisions
- **Colour palette** — near-black `#0d0b14` bg, violet accent `#a78bfa`, chalk text. Chosen for tech/developer context; avoids the generic white/blue SaaS look.
- **Fonts** — *Syne* (display, geometric, bold personality) paired with *Inter* (body, highly legible at small sizes).
- **Signature element** — animated dot-grid hero background + rotating avatar ring that rotates in opposite directions, acting as a distinctive, memorable opener.

---

## 📦 Dependencies
**None.** Zero npm packages, zero frameworks. Google Fonts loaded via CDN `<link>` — works offline if you download and self-host them.

---

## 👤 Author
**Alex Mercer** — Front-End Developer & UI Designer
`alex@example.com` · GitHub · LinkedIn

---

*Submitted as Task-4 of the Web Development Internship Programme.*
