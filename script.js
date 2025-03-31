// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved user preference
if (localStorage.getItem('darkMode')) {
  body.classList.add('dark-mode');
  darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Toggle Function
darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDarkMode = body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  darkModeToggle.innerHTML = isDarkMode 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';
});

// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Animate project cards on scroll
const projectCards = document.querySelectorAll('.project-card');

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



// Bulletproof Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) { // Only run if element exists
      // Show/hide button
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
          backToTop.style.display = 'flex';
          setTimeout(() => backToTop.classList.add('visible'), 10);
        } else {
          backToTop.classList.remove('visible');
          setTimeout(() => {
            if (!backToTop.classList.contains('visible')) {
              backToTop.style.display = 'none';
            }
          }, 300);
        }
      });
  
      // Initialize
      backToTop.style.display = 'flex';
      backToTop.classList.add('visible');
      setTimeout(() => {
        backToTop.classList.remove('visible');
        backToTop.style.display = 'none';
      }, 2000);
    } else {
      console.warn('Back-to-top button element not found');
    }
  

    // Fix for copyright year error
    const yearElement = document.getElementById('year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    } 
  
  });