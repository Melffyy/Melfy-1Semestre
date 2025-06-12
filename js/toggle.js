window.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('toggle-dark-mode');

  if (!btn) return; 

  const darkModeEnabled = localStorage.getItem('darkMode') === 'true';

  btn.classList.toggle('active', darkModeEnabled);
  document.body.classList.toggle('dark-mode', darkModeEnabled);
  btn.setAttribute('aria-pressed', darkModeEnabled);

  btn.addEventListener('click', () => {
    const isActive = btn.classList.toggle('active');
    document.body.classList.toggle('dark-mode', isActive);
    btn.setAttribute('aria-pressed', isActive);
    localStorage.setItem('darkMode', isActive);
  });
});
