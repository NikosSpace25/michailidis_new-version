// 1. CUSTOM CURSOR MOVEMENT
const products = document.querySelectorAll('.product');
products.forEach(product => {
  const cursor = product.querySelector('.custom-cursor');
  if (!cursor) return;

  let targetX = 0,
    targetY = 0;
  let currentX = 0,
    currentY = 0;

  product.addEventListener('mouseenter', e => {
    const rect = product.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
    currentX = targetX;
    currentY = targetY;
  });

  product.addEventListener('mousemove', e => {
    const rect = product.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
  });

  function animateCursor() {
    currentX += (targetX - currentX) * 0.15;
    currentY += (targetY - currentY) * 0.15;
    cursor.style.left = `${currentX}px`;
    cursor.style.top = `${currentY}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
});

// NAVBAR TOGGLE MENU
// NAVBAR ARIA STATE CHANGE
const navToggle = document.querySelector('.nav-toggle');
const navWrapper = document.querySelector('.nav-wrapper');
const navLinks = document.querySelectorAll('.nav-link a');

function toggleMenu() {
  const isOpen = navWrapper.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);

  document.body.style.overflow = isOpen ? 'hidden' : 'auto';

  if (isOpen && navLinks.length > 0) {
    setTimeout(() => navLinks[0].focus(), 400);
  }
}

navToggle.addEventListener('click', toggleMenu);

window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navWrapper.classList.contains('is-open')) {
    toggleMenu();
    navToggle.focus();
  }
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navWrapper.classList.contains('is-open')) {
      toggleMenu();
    }
  });
});

// NAVBAR DESKTOP ON SCROLL & LOGO CURSOR

window.addEventListener('scroll', () => {
  const wrapper = document.querySelector('.nav-wrapper');
  if (window.scrollY > 50) {
    wrapper.classList.add('scrolled');
  } else {
    wrapper.classList.remove('scrolled');
  }
});

const brand = document.querySelector('.nav-brand');
const hoverIcon = document.querySelector('.logo-hover-icon');

brand.addEventListener('mousemove', e => {
  hoverIcon.style.left = e.clientX + 'px';
  hoverIcon.style.top = e.clientY + 'px';
});

// 2. INGREDIENTS SECTION
const allIngredients = document.querySelectorAll('.ingredient');

if (allIngredients.length > 0) {
  allIngredients.forEach(card => {
    card.addEventListener('mouseenter', () => {
      allIngredients.forEach(c => {
        c.classList.remove('ingredient--is-active');
        c.setAttribute('aria-expanded', 'false');
      });
      card.classList.add('ingredient--is-active');
      card.setAttribute('aria-expanded', 'true');
    });
  });
}

// 3. IDEAL CLIENTS TOGGLE
(function () {
  const phrases = document.querySelectorAll('.phrase');
  if (phrases.length < 2) return;

  let currentIndex = 0;

  setInterval(() => {
    phrases[currentIndex].classList.remove('active');

    currentIndex = (currentIndex + 1) % phrases.length;

    phrases[currentIndex].classList.add('active');
  }, 3000);
})();

// ACCORDITION CUSTOM EASINGS

const faqItems = document.querySelectorAll('.faq-content');

faqItems.forEach(details => {
  const summary = details.querySelector('.faq-content__title');

  summary.addEventListener('click', event => {
    event.preventDefault();

    if (details.open) {
      closeDetails(details);
    } else {
      openDetails(details);
    }
  });
});

function openDetails(details) {
  details.setAttribute('open', '');
  details.classList.add('is-opening');

  setTimeout(() => {
    details.classList.remove('is-opening');
  }, 450);
}

function closeDetails(details) {
  details.classList.add('is-closing');

  setTimeout(() => {
    details.classList.remove('is-closing');
    details.removeAttribute('open');
  }, 280);
}

// SCROLL PROGRESS BAR COMPONENT
document.addEventListener('DOMContentLoaded', () => {
  const timeline = document.querySelector('.timeline');
  const progressBar = document.querySelector('.timeline__progress');
  const items = document.querySelectorAll('.timeline__item');

  function updateTimeline() {
    if (!timeline || !progressBar) return;

    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight / 2;

    let scrolled = triggerPoint - rect.top;
    let percentage = (scrolled / timeline.offsetHeight) * 100;
    percentage = Math.max(0, Math.min(percentage, 100));

    progressBar.style.height = `${percentage}%`;

    items.forEach(item => {
      const itemRect = item.getBoundingClientRect();

      if (itemRect.top < triggerPoint) {
        item.classList.add('is-active');
      } else {
        item.classList.remove('is-active');
      }
    });
  }

  window.addEventListener('scroll', updateTimeline);

  updateTimeline();
});
