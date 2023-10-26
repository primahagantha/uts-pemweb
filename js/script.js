const parallax = document.querySelector('.parallax');

window.addEventListener('scroll', () => {
  let scrollPosition = window.scrollY;
  parallax.style.backgroundPositionY = scrollPosition * 0.7 + 'px';
});
