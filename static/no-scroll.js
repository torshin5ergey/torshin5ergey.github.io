// no-scroll.js

const swipeArea = document.querySelector('.no-scroll-area');

swipeArea.addEventListener('touchmove', function(event) {
  event.preventDefault();
});
