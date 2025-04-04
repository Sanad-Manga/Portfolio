document.addEventListener('DOMContentLoaded', function() {
  // ======================
  // 1. Cookie Optimization
  // ======================
  
  // Block third-party cookies from being set
  Object.defineProperty(document, 'cookie', {
    get: function() {},
    set: function() {
      if (!this.match(/^\s*([^=]+)=([^;]+)/)) return;
      if (RegExp.$1.includes('__cf') || RegExp.$1.includes('_ga')) {
        return; // Block Cloudflare and Google Analytics cookies
      }
      return Reflect.apply(...arguments);
    },
    configurable: true
  });

  // ======================
  // 2. Dark Mode Toggle
  // ======================
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  if (darkModeToggle && body) {
    // Check for saved user preference
    if (localStorage.getItem('darkMode')) {
      body.classList.add('dark-mode');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    darkModeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDarkMode = body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDarkMode);
      darkModeToggle.innerHTML = isDarkMode 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
    });
  }

  // ======================
  // 3. Smooth Scrolling
  // ======================
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      }
      // External links will follow normally
    });
  });

  // ======================
  // 4. Project Card Animations
  // ======================
  const projectCards = document.querySelectorAll('.project-card');
  if (projectCards.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(card);
    });
  }

  // ======================
  // 5. Back to Top Button
  // ======================
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    let scrollTimeout;
    
    const checkScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      
      if (scrollPos > 300) {
        backToTop.style.display = 'flex';
        setTimeout(() => backToTop.classList.add('visible'), 10);
      } else {
        backToTop.classList.remove('visible');
        setTimeout(() => {
          if ((window.scrollY || document.documentElement.scrollTop) < 5) {
            backToTop.style.display = 'none';
          }
        }, 300);
      }
    };

    // Throttled scroll listener
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(checkScroll, 100);
    }, { passive: true });

    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ======================
  // 6. Copyright Year
  // ======================
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ======================
  // 7. Mobile Menu Toggle
  // ======================
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.querySelector('nav ul');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // ======================
  // 8. Performance Optimizations
  // ======================
  
  // Remove Vercel analytics if not needed
  if (typeof window.va === 'function') {
    window.va('config', { disableAutoTracking: true });
  }

  // Clean scroll handlers
  let lastScrollPosition = 0;
  const handleScroll = () => {
    const currentPosition = window.scrollY;
    if (Math.abs(currentPosition - lastScrollPosition) > 100) {
      lastScrollPosition = currentPosition;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
});

