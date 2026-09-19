const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
if (menu && nav) {
  menu.hidden = false;
  document.documentElement.classList.add('js');
  const close = () => { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); };
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { close(); menu.focus(); } });
  nav.addEventListener('click', e => { if (e.target.closest('a')) close(); });
}

const toc = document.querySelector('.toc-details');
if (toc) {
  const narrow = window.matchMedia('(max-width: 900px)');
  const updateToc = () => { toc.open = !narrow.matches; };
  updateToc();
  narrow.addEventListener('change', updateToc);
}

// Content is visible by default, including when JavaScript or the observer is unavailable.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const reveal = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('is-revealed');
      reveal.unobserve(entry.target);
    }
  }, { threshold: 0.12 });
  document.querySelectorAll('.product-card, .variant-grid article, .journal-card, .reading-link').forEach(item => reveal.observe(item));
}
