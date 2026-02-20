// ----- PAGE TEMPLATES -----
const contentDiv = document.getElementById('page-content');
const templates = {
  home: document.getElementById('home-template').innerHTML,
  about: document.getElementById('about-template').innerHTML,
  vision: document.getElementById('vision-template').innerHTML,
  news: document.getElementById('news-template').innerHTML,
  indicators: document.getElementById('indicators-template').innerHTML,
  blog: document.getElementById('blog-template').innerHTML,
  resources: document.getElementById('resources-template').innerHTML,
  contact: document.getElementById('contact-template').innerHTML,
  terms: document.getElementById('terms-template').innerHTML,
  disclaimer: document.getElementById('disclaimer-template').innerHTML,
  team: document.getElementById('team-template').innerHTML
};

// Load page content
function loadPage(page) {
  contentDiv.innerHTML = templates[page] || templates.home;
  attachPageSpecificListeners(page);
  updateActiveNavLink(page);
  
  // Scroll to top when changing pages
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update active state in navigation
function updateActiveNavLink(page) {
  document.querySelectorAll('[data-page]').forEach(link => {
    const linkPage = link.getAttribute('data-page');
    if (linkPage === page) {
      link.style.fontWeight = '700';
      link.style.color = 'var(--trust-blue)';
    } else {
      link.style.fontWeight = '500';
      link.style.color = '';
    }
  });
}

// Navigation click handlers (header and footer)
document.querySelectorAll('[data-page]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = e.target.closest('[data-page]').getAttribute('data-page');
    loadPage(page);
    history.pushState({ page }, '', `#${page}`);
  });
});

// Handle browser back/forward
window.addEventListener('popstate', (e) => {
  const page = location.hash.replace('#', '') || 'home';
  loadPage(page);
});

// Initialize with home page
const initialPage = location.hash.replace('#', '') || 'home';
loadPage(initialPage);

// ----- PAGE-SPECIFIC INTERACTIONS -----
function attachPageSpecificListeners(page) {
  
  // FAQ accordion (contact page)
  if (page === 'contact') {
    // Make sure toggleFaq is available globally
    window.toggleFaq = function(element) {
      const item = element.closest('.faq-item');
      if (item) item.classList.toggle('open');
    };
  }

  // Candle pattern filters (indicators page)
  if (page === 'indicators') {
    const filterBtns = document.querySelectorAll('#candle-filters .filter-btn');
    const candles = document.querySelectorAll('#candle-grid .card');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        candles.forEach(candle => {
          if (filter === 'all' || candle.classList.contains(filter)) {
            candle.style.display = 'block';
          } else {
            candle.style.display = 'none';
          }
        });
      });
    });
  }

  // Blog category filters
  if (page === 'blog') {
    const blogFilters = document.querySelectorAll('#blog-filters .filter-btn');
    const posts = document.querySelectorAll('#blog-masonry .masonry-item');
    
    blogFilters.forEach(btn => {
      btn.addEventListener('click', (e) => {
        blogFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.dataset.cat;
        posts.forEach(post => {
          if (category === 'all' || post.classList.contains(category)) {
            post.style.display = 'block';
          } else {
            post.style.display = 'none';
          }
        });
      });
    });
  }
}

// Global FAQ toggle function (used by inline onclick)
window.toggleFaq = function(element) {
  const item = element.closest('.faq-item');
  if (item) item.classList.toggle('open');
};

// Console greeting
console.log('TradeMentorship – All pages loaded successfully');