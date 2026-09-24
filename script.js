/* ==========================================================
   MD SHAKIL - Portfolio
   Navbar behaviour: highlight the link of the section in view.
   ========================================================== */
(function () {
  'use strict';

  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));

  // Map each nav link to its target section (only sections that exist on the page)
  var items = links
    .map(function (link) {
      var id = link.getAttribute('href').replace('#', '');
      var section = document.getElementById(id);
      return section ? { link: link, section: section } : null;
    })
    .filter(Boolean);

  function setActive(activeLink) {
    links.forEach(function (l) {
      l.classList.toggle('is-active', l === activeLink);
      if (l === activeLink) l.setAttribute('aria-current', 'page');
      else l.removeAttribute('aria-current');
    });
  }

  function onScroll() {
    var y = window.scrollY + 120;
    var current = items[0];

    items.forEach(function (item) {
      if (item.section.offsetTop <= y) current = item;
    });

    // Bottom of the page: activate the last section
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = items[items.length - 1];
    }

    if (current) setActive(current.link);
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', onScroll);
  onScroll();
})();
