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
document.querySelectorAll('[data-layers]').forEach(button => {
  button.hidden = false;
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(expanded));
    button.closest('.drawing').classList.toggle('exploded', expanded);
    button.textContent = expanded ? 'Собрать комплект ↙' : 'Рассмотреть по слоям ↗';
  });
});
