/**
 * ══════════════════════════════════════════
 *  SMART PRODUCT LISTING — script.js
 *  Features: Filtering · Sorting · LocalStorage
 *            Nav · Skill Bars · Contact Form · Toast
 *  Author  : Alex Mercer (portfolio project)
 * ══════════════════════════════════════════
 */

'use strict';

/* ════════════════════════════════
   1. PRODUCT DATA
════════════════════════════════ */
const PRODUCTS = [
  {
    id: 1,
    name: 'UltraBook Pro 15',
    category: 'Electronics',
    price: 1299,
    rating: 4.8,
    emoji: '💻',
    description: 'Slim powerhouse laptop with 12-core CPU, 32 GB RAM, and a 4K OLED display for professionals.'
  },
  {
    id: 2,
    name: 'AirPods Max 3',
    category: 'Audio',
    price: 549,
    rating: 4.7,
    emoji: '🎧',
    description: 'Premium over-ear headphones with spatial audio, adaptive noise cancellation, and 40-hour battery.'
  },
  {
    id: 3,
    name: 'SmartWatch Ultra X',
    category: 'Wearables',
    price: 399,
    rating: 4.6,
    emoji: '⌚',
    description: 'Always-on retina display, blood oxygen monitoring, GPS, and 18-day battery life.'
  },
  {
    id: 4,
    name: 'Mechanical Keyboard TKL',
    category: 'Accessories',
    price: 139,
    rating: 4.5,
    emoji: '⌨️',
    description: 'Tenkeyless mechanical keyboard with RGB lighting, hot-swappable switches, and aluminium frame.'
  },
  {
    id: 5,
    name: 'Portable SSD 2TB',
    category: 'Electronics',
    price: 179,
    rating: 4.7,
    emoji: '💾',
    description: 'NVMe portable SSD delivering 2000 MB/s read speeds in a rugged, pocket-sized enclosure.'
  },
  {
    id: 6,
    name: 'FitBand Pro 5',
    category: 'Wearables',
    price: 129,
    rating: 4.3,
    emoji: '📿',
    description: 'Lightweight fitness tracker with sleep analysis, heart rate zones, and 7-day battery life.'
  },
  {
    id: 7,
    name: 'Studio Monitor Speakers',
    category: 'Audio',
    price: 699,
    rating: 4.9,
    emoji: '🔊',
    description: 'Reference-class studio monitors with bi-amp design, flat frequency response, and USB-C audio.'
  },
  {
    id: 8,
    name: 'Ergonomic Mouse MX',
    category: 'Accessories',
    price: 99,
    rating: 4.6,
    emoji: '🖱️',
    description: 'Vertical ergonomic design reduces wrist strain. 7-button customisable, 70-day battery.'
  },
  {
    id: 9,
    name: 'VR Headset Vision',
    category: 'Electronics',
    price: 899,
    rating: 4.4,
    emoji: '🥽',
    description: 'Standalone VR with 4K per-eye display, hand tracking, and a vast app ecosystem.'
  },
  {
    id: 10,
    name: 'True Wireless Buds Z',
    category: 'Audio',
    price: 249,
    rating: 4.5,
    emoji: '🎵',
    description: 'IPX5-rated earbuds with hybrid ANC, 8-hour playback, and multipoint Bluetooth 5.3.'
  },
  {
    id: 11,
    name: 'Smart Ring Health',
    category: 'Wearables',
    price: 299,
    rating: 4.2,
    emoji: '💍',
    description: 'Discreet titanium ring tracking HRV, SpO₂, stress, and sleep cycles. 7-day battery.'
  },
  {
    id: 12,
    name: 'USB-C Hub 12-in-1',
    category: 'Accessories',
    price: 79,
    rating: 4.4,
    emoji: '🔌',
    description: 'Expand your laptop with 4K HDMI, 100W PD, SD card, 4×USB-A, and Ethernet in one hub.'
  }
];

/* ════════════════════════════════
   2. STATE
════════════════════════════════ */
let state = {
  activeCategory: 'all',
  maxPrice:       1500,
  sortOrder:      'default'
};

/* ════════════════════════════════
   3. DOM CACHE
════════════════════════════════ */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

const DOM = {
  productsGrid:  $('productsGrid'),
  resultsCount:  $('resultsCount'),
  emptyState:    $('emptyState'),
  priceRange:    $('priceRange'),
  priceDisplay:  $('priceDisplay'),
  sortSelect:    $('sortSelect'),
  categoryTabs:  $('categoryTabs'),
  // Notes
  noteTitle:     $('noteTitle'),
  noteBody:      $('noteBody'),
  charCount:     $('charCount'),
  addNoteBtn:    $('addNoteBtn'),
  notesList:     $('notesList'),
  noteCountBadge:$('noteCountBadge'),
  notesEmpty:    $('notesEmpty'),
  clearAllBtn:   $('clearAllBtn'),
  // Contact
  contactForm:   $('contactForm'),
  formSuccess:   $('formSuccess'),
  // Nav
  navbar:        $('navbar'),
  hamburger:     $('hamburger'),
  navLinks:      $('navLinks'),
  // Toast
  toast:         $('toast')
};

/* ════════════════════════════════
   4. TOAST NOTIFICATION
════════════════════════════════ */
let toastTimer;

/**
 * Show a brief toast message.
 * @param {string} msg  - text to display
 * @param {'success'|'error'|'info'} type
 */
function showToast(msg, type = 'info') {
  clearTimeout(toastTimer);
  const icons = { success: '✅', error: '❌', info: '💡' };
  DOM.toast.textContent = `${icons[type]} ${msg}`;
  DOM.toast.classList.add('show');
  toastTimer = setTimeout(() => DOM.toast.classList.remove('show'), 3000);
}

/* ════════════════════════════════
   5. NAVIGATION
════════════════════════════════ */
// Scroll-based navbar shadow
window.addEventListener('scroll', () => {
  DOM.navbar.classList.toggle('scrolled', window.scrollY > 30);
  highlightActiveSection();
});

// Mobile hamburger toggle
DOM.hamburger.addEventListener('click', () => {
  const open = DOM.hamburger.classList.toggle('open');
  DOM.navLinks.classList.toggle('open', open);
  DOM.hamburger.setAttribute('aria-expanded', open);
});

// Close mobile menu on link click
DOM.navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    DOM.hamburger.classList.remove('open');
    DOM.navLinks.classList.remove('open');
  });
});

// Highlight nav link for the visible section
function highlightActiveSection() {
  const sections = $$('section[id], .section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  $$('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

/* ════════════════════════════════
   6. SKILL BARS (Intersection Observer)
════════════════════════════════ */

/**
 * Build DOM structure for skill bars and animate them
 * when they scroll into view.
 */
function initSkillBars() {
  $$('.skill-item').forEach(item => {
    // Build track + fill inside each .skill-item
    const pct = item.dataset.pct;
    const track = document.createElement('div');
    track.className = 'skill-track';
    const fill = document.createElement('div');
    fill.className = 'skill-fill';
    track.appendChild(fill);
    item.appendChild(track);

    // Animate fill width when visible
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fill.style.width = pct + '%';
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(item);
  });
}

/* ════════════════════════════════
   7. PRODUCT RENDERING
════════════════════════════════ */

/**
 * Generate star symbols for a rating value.
 * @param {number} rating
 * @returns {string} star HTML
 */
function starsHTML(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

/**
 * Build a single product card DOM element.
 * @param {Object} product
 * @returns {HTMLElement}
 */
function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.setAttribute('role', 'listitem');
  card.innerHTML = `
    <div class="product-img-wrap">
      <span role="img" aria-label="${product.name}">${product.emoji}</span>
      <span class="product-category-badge">${product.category}</span>
    </div>
    <div class="product-body">
      <h3 class="product-name">${product.name}</h3>
      <p class="product-desc">${product.description}</p>
      <div class="product-footer">
        <span class="product-price">$${product.price.toLocaleString()}</span>
        <div class="product-rating" aria-label="Rating: ${product.rating} out of 5">
          ${starsHTML(product.rating)}
          <span>${product.rating}</span>
        </div>
      </div>
    </div>
  `;
  return card;
}

/**
 * Filter, sort, and render the product grid.
 * Called whenever state changes.
 */
function renderProducts() {
  // 1. Filter by category
  let filtered = state.activeCategory === 'all'
    ? [...PRODUCTS]
    : PRODUCTS.filter(p => p.category === state.activeCategory);

  // 2. Filter by price range
  filtered = filtered.filter(p => p.price <= state.maxPrice);

  // 3. Sort
  switch (state.sortOrder) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating-desc':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    // 'default' — no sorting
  }

  // 4. Render
  DOM.productsGrid.innerHTML = '';

  if (filtered.length === 0) {
    DOM.emptyState.classList.remove('hidden');
    DOM.productsGrid.classList.add('hidden');
    DOM.resultsCount.textContent = 'No products found';
  } else {
    DOM.emptyState.classList.add('hidden');
    DOM.productsGrid.classList.remove('hidden');
    const count = filtered.length;
    DOM.resultsCount.textContent = `Showing ${count} product${count !== 1 ? 's' : ''}`;
    filtered.forEach(p => DOM.productsGrid.appendChild(createProductCard(p)));
  }
}

/* ════════════════════════════════
   8. FILTER & SORT CONTROLS
════════════════════════════════ */

// Category tab clicks
DOM.categoryTabs.addEventListener('click', e => {
  const tab = e.target.closest('.filter-tab');
  if (!tab) return;
  $$('.filter-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  state.activeCategory = tab.dataset.cat;
  renderProducts();
});

// Price range slider
DOM.priceRange.addEventListener('input', () => {
  state.maxPrice = parseInt(DOM.priceRange.value);
  DOM.priceDisplay.textContent = `$${state.maxPrice.toLocaleString()}`;
  renderProducts();
});

// Sort select
DOM.sortSelect.addEventListener('change', () => {
  state.sortOrder = DOM.sortSelect.value;
  renderProducts();
});

/** Reset all filters to defaults (called by empty-state button). */
function resetFilters() {
  state = { activeCategory: 'all', maxPrice: 1500, sortOrder: 'default' };
  // Reset UI
  $$('.filter-tab').forEach(t => t.classList.toggle('active', t.dataset.cat === 'all'));
  DOM.priceRange.value    = 1500;
  DOM.priceDisplay.textContent = '$1500';
  DOM.sortSelect.value    = 'default';
  renderProducts();
}

// Expose for inline onclick in HTML
window.resetFilters = resetFilters;

/* ════════════════════════════════
   9. LOCAL STORAGE — NOTES
════════════════════════════════ */
const STORAGE_KEY = 'am_portfolio_notes';

/**
 * Load notes array from localStorage.
 * @returns {Array}
 */
function loadNotes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

/**
 * Save notes array to localStorage.
 * @param {Array} notes
 */
function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

/**
 * Format a Date object into a readable string.
 * @param {string} isoString
 * @returns {string}
 */
function formatDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

/**
 * Create and return a note card DOM element.
 * @param {Object} note  - {id, title, body, createdAt}
 * @returns {HTMLElement}
 */
function createNoteCard(note) {
  const card = document.createElement('div');
  card.className = 'note-card';
  card.dataset.id = note.id;
  // Escape HTML to prevent XSS
  const safe = str => str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  card.innerHTML = `
    <div class="note-card-header">
      <span class="note-card-title">${safe(note.title || 'Untitled')}</span>
      <button class="delete-note-btn" aria-label="Delete note" title="Delete">✕</button>
    </div>
    <p class="note-card-body">${safe(note.body)}</p>
    <span class="note-card-date">${formatDate(note.createdAt)}</span>
  `;
  // Delete button
  card.querySelector('.delete-note-btn').addEventListener('click', () => deleteNote(note.id));
  return card;
}

/**
 * Re-render the notes list from localStorage.
 */
function renderNotes() {
  const notes = loadNotes();
  DOM.notesList.innerHTML = '';

  if (notes.length === 0) {
    DOM.notesEmpty.classList.remove('hidden');
    DOM.noteCountBadge.textContent = '0 notes';
  } else {
    DOM.notesEmpty.classList.add('hidden');
    DOM.noteCountBadge.textContent = `${notes.length} note${notes.length !== 1 ? 's' : ''}`;
    // Show newest first
    [...notes].reverse().forEach(n => DOM.notesList.appendChild(createNoteCard(n)));
  }
}

/**
 * Add a new note to localStorage and re-render.
 */
function addNote() {
  const title = DOM.noteTitle.value.trim();
  const body  = DOM.noteBody.value.trim();

  if (!body) {
    showToast('Note content cannot be empty.', 'error');
    DOM.noteBody.focus();
    return;
  }

  const note = {
    id:        Date.now(),
    title:     title || 'Untitled',
    body,
    createdAt: new Date().toISOString()
  };

  const notes = loadNotes();
  notes.push(note);
  saveNotes(notes);

  // Reset form
  DOM.noteTitle.value = '';
  DOM.noteBody.value  = '';
  DOM.charCount.textContent = '0 / 300';

  renderNotes();
  showToast('Note saved!', 'success');
}

/**
 * Remove a note by id from localStorage and re-render.
 * @param {number} id
 */
function deleteNote(id) {
  const notes = loadNotes().filter(n => n.id !== id);
  saveNotes(notes);
  renderNotes();
  showToast('Note deleted.', 'info');
}

/**
 * Clear all notes from localStorage.
 */
function clearAllNotes() {
  if (loadNotes().length === 0) return;
  if (!confirm('Delete all notes? This cannot be undone.')) return;
  saveNotes([]);
  renderNotes();
  showToast('All notes cleared.', 'info');
}

// Event bindings for notes
DOM.addNoteBtn.addEventListener('click', addNote);

DOM.noteBody.addEventListener('input', () => {
  const len = DOM.noteBody.value.length;
  DOM.charCount.textContent = `${len} / 300`;
});

DOM.clearAllBtn.addEventListener('click', clearAllNotes);

// Allow Ctrl+Enter to save note
DOM.noteBody.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') addNote();
});

/* ════════════════════════════════
   10. CONTACT FORM
════════════════════════════════ */
DOM.contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const name  = $('cf-name').value.trim();
  const email = $('cf-email').value.trim();
  const msg   = $('cf-msg').value.trim();

  if (!name || !email || !msg) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }

  // Simulate submission (no real backend)
  const btn = DOM.contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    DOM.formSuccess.classList.remove('hidden');
    DOM.contactForm.reset();
    btn.textContent = 'Send Message →';
    btn.disabled = false;
    showToast('Message sent! I'll respond within 24 hours.', 'success');
    setTimeout(() => DOM.formSuccess.classList.add('hidden'), 5000);
  }, 1200);
});

/* ════════════════════════════════
   11. SCROLL ANIMATIONS
   Fade-in sections as they enter viewport
════════════════════════════════ */
function initScrollReveal() {
  const targets = $$('.project-card, .fact-card, .product-card, .note-card, .skill-group');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => {
    // Set initial hidden state via JS (not CSS) so non-JS users still see content
    el.style.opacity   = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    obs.observe(el);
  });
}

/* ════════════════════════════════
   12. INIT
════════════════════════════════ */

/**
 * Bootstrap all features once DOM is ready.
 */
function init() {
  renderProducts();   // Build product grid
  renderNotes();      // Load saved notes from localStorage
  initSkillBars();    // Animate skill progress bars
  initScrollReveal(); // Fade-in elements on scroll
}

// Run after DOM is fully parsed
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
