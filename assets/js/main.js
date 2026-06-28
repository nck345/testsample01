function init() {
  console.log('Main JS Initialized');

  // ==========================================================================
  // DISABLE DEFAULT JUMP ON DUMMY LINKS & BUTTONS
  // ==========================================================================
  document.querySelectorAll('a').forEach(anchor => {
    const href = anchor.getAttribute('href');
    if (href === '#' || href === '#properties' || (href === '#contact' && !anchor.closest('.nav-menu'))) {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
      });
    }
  });

  // ==========================================================================
  // MOBILE MENU TOGGLE
  // ==========================================================================
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    console.log('Mobile menu elements found');
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      console.log('Menu toggled. Active status:', navMenu.classList.contains('active'));
      
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-bars';
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && e.target !== menuToggle) {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-bars';
        }
      }
    });
  }

  // ==========================================================================
  // PROPERTIES FILTER TABS (Featured Property, Section 7)
  // ==========================================================================
  const propertyTabs = document.querySelectorAll('.properties-tab');
  const propertyCards = document.querySelectorAll('.property-card');

  if (propertyTabs.length > 0 && propertyCards.length > 0) {
    propertyTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        propertyTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filterValue = tab.getAttribute('data-filter');
        console.log('Filtering properties by:', filterValue);

        propertyCards.forEach(card => {
          if (filterValue === 'all') {
            card.style.display = 'block';
          } else {
            const cardCategory = card.getAttribute('data-category');
            if (cardCategory === filterValue) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  }

  // ==========================================================================
  // CONTACT FORM SUBMISSION
  // ==========================================================================
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your contact request has been sent successfully. We will reply within 24 hours.');
      contactForm.reset();
    });
  }
}

// Initialize JS
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
