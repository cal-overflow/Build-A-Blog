const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  if (currentTheme ===  'dark') {
    document.querySelector('body').classList.add('dark');
  }
}
else if (window.matchMedia) {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector('body').classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
  else {
    localStorage.setItem('theme', 'light');
  }
}
else {
  localStorage.setItem('theme', 'light');
}
